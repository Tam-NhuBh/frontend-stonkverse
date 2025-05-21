import { useEffect, useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import LoadingSpinner from "./loading-spinner";
import { getFinalTestsByID } from "@/lib/fetch-data";
import type { IFinalTest, QuestionType } from "@/types";
import BtnWithIcon from "./btn-with-icon";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaLock } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import axiosClient from "@/lib/api-client-v1";
import { MdTimer, MdWarning } from "react-icons/md";
import Confetti from 'react-confetti';

interface FinalTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  finalTestId: string;
  onTestComplete?: (passed: boolean) => void;
}

interface TestResult {
  success: boolean;
  data: {
    courseId: string;
    courseName: string;
    finalScore: number;
    quizScore: number;
    testScore: number;
    correctAnswers: number;
    totalQuestions: number;
    weightedDetails: {
      quizContribution: string;
      testContribution: string;
    };
    passingGrade: number;
    passed: boolean;
    status: string;
    isFirstTimePassing: boolean;
  };
}

const FinalTestModal: React.FC<FinalTestModalProps> = ({
  isOpen,
  onClose,
  courseId,
  finalTestId,
  onTestComplete
}) => {
  // If modal isn't open, don't render content
  if (!isOpen) return null;

  // Basic state
  const [loading, setLoading] = useState(true);
  const [finalTest, setFinalTest] = useState<IFinalTest | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(true);
  const [testResult, setTestResult] = useState<TestResult["data"] | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeWarning, setTimeWarning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // References
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  // Prevent context menu (right click)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (!showCompletionMessage && !isFinished) {
        e.preventDefault();
        return false;
      }
    };

    // Prevent F12, Ctrl+Shift+I
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showCompletionMessage && !isFinished) {
        // F12 key
        if (e.keyCode === 123) {
          e.preventDefault();
          return false;
        }
        
        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
          e.preventDefault();
          return false;
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showCompletionMessage, isFinished]);

  // Fullscreen mode
  const enterFullscreen = () => {
    if (fullscreenRef.current) {
      if (fullscreenRef.current.requestFullscreen) {
        fullscreenRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Fetch test data
  useEffect(() => {
    const fetchTest = async () => {
      if (!finalTestId || finalTestId === "") {
        console.error("No finalTestId provided");
        toast.error("Could not load test. Missing test ID.");
        onClose();
        return;
      }

      setLoading(true);

      try {
        const response = await getFinalTestsByID(finalTestId);
        const testData = response.data || response;

        if (testData) {
          // Convert API data to IFinalTest format
          const processedTest: IFinalTest = {
            id: testData._id,
            title: testData.title,
            description: testData.description || "",
            tests: (testData.tests || []).map((test: any) => ({
              _id: test._id,
              title: test.title,
              description: test.description || "",
              answers: test.answers || [],
              correctAnswer: test.correctAnswer || [],
              mockAnswer: test.mockAnswer || [],
              maxScore: test.maxScore || 10,
              type: test.type as QuestionType,
              imageUrl: test.imageUrl || "",
              createdAt: test.createdAt ? new Date(test.createdAt) : undefined,
            })),
            score: testData.score || 0,
            settings: {
              testDuration: testData.settings?.testDuration
                ? testData.settings.testDuration
                : { hours: 1, minutes: 0 },
              numberOfQuestions: testData.tests?.length || 0,
              instructionsMessage: testData.settings?.instructionsMessage || "Complete all questions within the time limit",
              pageLayout: testData.settings?.pageLayout || "",
              gradingDisplay: testData.settings?.gradingDisplay || "",
              completionMessage: testData.settings?.completionMessage || "Completion message"
            }
          };

          setFinalTest(processedTest);

          // Set up time
          const duration = ((processedTest.settings.testDuration.hours || 0) * 60 +
            (processedTest.settings.testDuration.minutes || 0)) * 60;
          setTimeLeft(duration || 1800); // Default 30 minutes if not set

        } else {
          toast.error("Could not load test. Please try again later.");
          onClose();
        }
      } catch (error) {
        console.error("Error fetching test:", error);
        toast.error("Error loading test. Please try again later.");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && finalTestId) {
      fetchTest();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, finalTestId, onClose]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) &&
        (isFinished || showCompletionMessage)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, isFinished, showCompletionMessage]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Start the test
  const startTest = () => {
    setShowCompletionMessage(false);
    // Reset user answers when starting the test
    setUserAnswers({});
    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        // Show warning when 5 minutes remaining
        if (prevTime === 300) {
          setTimeWarning(true);
          toast.error("5 minutes remaining!");
        }
        
        if (prevTime <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleSubmitTest();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Enter fullscreen when starting test
    enterFullscreen();
  };

  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (answer: string, questionType: QuestionType, questionId: string) => {
    if (!finalTest) return;

    setUserAnswers(prev => {
      const newAnswers = { ...prev };

      if (questionType === "single") {
        newAnswers[questionId] = [answer];
      } else if (questionType === "multiple") {
        const currentAnswers = prev[questionId] || [];
        newAnswers[questionId] = currentAnswers.includes(answer)
          ? currentAnswers.filter(a => a !== answer)
          : [...currentAnswers, answer];
      } else if (questionType === "fillBlank") {
        newAnswers[questionId] = [answer];
      }

      return newAnswers;
    });
  };

  // Show confirmation modal before submitting
  const confirmSubmitTest = () => {
    // Check if all questions are answered
    if (finalTest) {
      const unansweredQuestions = finalTest.tests.filter(question => {
        const questionId = (question as any)._id.toString();
        return !userAnswers[questionId] || userAnswers[questionId].length === 0;
      });

      if (unansweredQuestions.length > 0) {
        toast.error(`You have ${unansweredQuestions.length} unanswered questions. Please complete all questions before submitting.`);
        
        // Scroll to the first unanswered question
        const firstUnansweredQuestion = unansweredQuestions[0];
        const questionElement = document.getElementById(`question-${(firstUnansweredQuestion as any)._id}`);
        if (questionElement) {
          questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          questionElement.classList.add('highlight-question');
          setTimeout(() => {
            questionElement.classList.remove('highlight-question');
          }, 2000);
        }
        
        return;
      }
    }
    
    setShowConfirmation(true);
  };

  // Submit test
  const handleSubmitTest = async () => {
    if (isSubmitting || !finalTest) return;
    setIsSubmitting(true);
    setShowConfirmation(false);

    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Exit fullscreen
    if (isFullscreen) {
      exitFullscreen();
    }

    try {
      // Prepare answers data
      const answers = finalTest.tests.map(question => {
        const questionId = (question as any)._id.toString();
        return {
          questionId,
          answer: userAnswers[questionId] || []
        };
      });

      // Call API
      const response = await axiosClient.put('add-answer-final-test', {
        courseId,
        finalTestId,
        answers
      });

      if (response.data.success) {
        // Set result and display
        setTestResult(response.data.data);
        
        // Show appropriate toast
        if (response.data.data.passed) {
          toast.success("Congratulations! You've passed the final test! 🎉");
        } else {
          toast.error(`You need ${response.data.data.passingGrade}% to pass. Try again!`);
        }

        // Notify parent component
        if (onTestComplete) {
          onTestComplete(response.data.data.passed);
        }
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      toast.error("An error occurred while submitting the test.");
    } finally {
      setIsFinished(true);
      setShowCompletionMessage(true);
      setIsSubmitting(false);
    }
  };

  // Render time warning
  const renderTimeWarning = () => {
    if (!timeWarning) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center"
      >
        <MdTimer className="mr-2" size={24} />
        <span className="font-bold">Time is running out! {formatTime(timeLeft)}</span>
      </motion.div>
    );
  };

  // Render confirmation dialog
  const renderConfirmation = () => {
    if (!showConfirmation) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 bg-black bg-opacity-70 z-[10000] flex items-center justify-center p-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="inline-block p-4 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300 mb-4">
              <FaExclamationTriangle size={36} />
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Submit Your Test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to submit your test? This action cannot be undone.
            </p>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 mb-6 text-left">
            <p className="text-sm text-yellow-700 dark:text-yellow-200">
              {finalTest?.settings.completionMessage || "Once submitted, you won't be able to change your answers."}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitTest}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium order-1 sm:order-2"
            >
              Yes, Submit Test
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Render completion message
  const renderCompletionMessage = () => {
    if (!finalTest) return null;

    if (isFinished && testResult) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-3xl mx-auto relative overflow-hidden"
        >
          {testResult.passed && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />}
          
          <div className={`absolute inset-0 h-2 top-0 ${testResult.passed ? "bg-green-500" : "bg-red-500"}`}></div>
          
          <div className="text-center">
            <div className="mb-8">
              <div className={`inline-block p-5 rounded-full mb-4 ${
                testResult.passed 
                  ? "bg-green-100 text-green-500 dark:bg-green-900/50 dark:text-green-300"
                  : "bg-red-100 text-red-500 dark:bg-red-900/50 dark:text-red-300"
              }`}>
                {testResult.passed ? <FaCheckCircle size={56} /> : <FaTimesCircle size={56} />}
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                {testResult.passed ? "Congratulations!" : "Test Completed"}
              </h2>

              <div className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {testResult.finalScore.toFixed(1)}%
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md p-6 transform transition-transform hover:scale-[1.02]">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Quiz Score</p>
                  <p className="text-2xl font-bold">{testResult.quizScore.toFixed(1)}%</p>
                  <div className="mt-2 inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs">
                    Weight: {testResult.weightedDetails.quizContribution}%
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md p-6 transform transition-transform hover:scale-[1.02]">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Test Score</p>
                  <p className="text-2xl font-bold">{testResult.testScore.toFixed(1)}%</p>
                  <div className="mt-2 inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs">
                    Weight: {testResult.weightedDetails.testContribution}%
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
                  <span className="text-blue-700 dark:text-blue-300">Correct Answers:</span>
                  <span className="font-bold text-blue-800 dark:text-blue-200">{testResult.correctAnswers} / {testResult.totalQuestions}</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 px-4 py-2 rounded-lg">
                  <span className="text-purple-700 dark:text-purple-300">Passing Grade:</span>
                  <span className="font-bold text-purple-800 dark:text-purple-200">{testResult.passingGrade}%</span>
                </div>
              </div>

              <div className={`inline-block px-6 py-3 rounded-lg text-lg ${
                testResult.passed
                  ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100 ring-4 ring-green-500/30"
                  : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100 ring-4 ring-red-500/30"
              } font-bold mb-8 tracking-wide`}>
                {testResult.passed ? "PASSED" : "FAILED"}
              </div>

              {testResult.isFirstTimePassing && testResult.passed && (
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-4 mb-8 text-left">
                  <p className="text-blue-700 dark:text-blue-200">
                    <span className="font-bold">First-time pass! 🎉</span> Congratulations on passing the course for the first time! A confirmation email has been sent to your inbox.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Close
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-3xl mx-auto relative overflow-hidden"
      >
        <div className="absolute inset-0 h-2 top-0 bg-blue-500"></div>
        
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-block p-5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 mb-4">
              <IoMdHelpCircle size={56} />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">{finalTest.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
              {finalTest.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md p-6 transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center justify-center mb-2">
                <MdTimer className="text-blue-500 dark:text-blue-400 mr-2" size={24} />
                <p className="text-sm text-gray-500 dark:text-gray-400">Time Limit</p>
              </div>
              <p className="text-2xl font-bold">
                {finalTest.settings.testDuration.hours}h {finalTest.settings.testDuration.minutes}m
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md p-6 transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center justify-center mb-2">
                <FaLock className="text-blue-500 dark:text-blue-400 mr-2" size={20} />
                <p className="text-sm text-gray-500 dark:text-gray-400">Number of questions</p>
              </div>
              <p className="text-2xl font-bold">{finalTest.settings.numberOfQuestions}</p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-5 mb-8 text-left rounded-r-lg">
            <div className="flex">
              <MdWarning className="text-yellow-500 dark:text-yellow-400 mt-1 mr-3 flex-shrink-0" size={24} />
              <p className="text-yellow-700 dark:text-yellow-200">
                {finalTest.settings.instructionsMessage}
              </p>
            </div>
          </div>

          <BtnWithIcon
          content={"START"}
            onClick={startTest}
            customClasses="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"           >
          </BtnWithIcon>
        </div>
      </motion.div>
    );
  };

  // Render all questions at once
  const renderAllQuestions = () => {
    if (!finalTest || showCompletionMessage || isFinished) return null;

    // Calculate progress
    const totalQuestions = finalTest.tests.length;
    const answeredQuestions = Object.keys(userAnswers).length;
    const progressPercent = (answeredQuestions / totalQuestions) * 100;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Fixed header with timer and progress */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md rounded-lg mb-6 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className={`text-xl font-mono px-5 py-3 rounded-lg flex items-center ${
                timeLeft < 300 ? "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300 animate-pulse" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}>
                <MdTimer className="mr-2" size={20} />
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {answeredQuestions} of {totalQuestions} answered
              </div>
              
              {/* Progress bar */}
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              
              <button
                onClick={confirmSubmitTest}
                disabled={isSubmitting}
                className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center font-medium shadow-md hover:shadow-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Test"}
              </button>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8 pb-20">
          {finalTest.tests.map((question, index) => {
            const questionId = (question as any)._id.toString();
            const selectedAnswers = userAnswers[questionId] || [];
            
            return (
              <motion.div
                key={questionId}
                id={`question-${questionId}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all highlight-animation"
              >
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-medium">{question.title}</h3>
                  </div>

                  {question.imageUrl && (
                    <div className="mb-4">
                      <img
                        src={question.imageUrl}
                        alt={`Question ${index + 1}`}
                        className="max-h-60 object-contain mx-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>

                {/* Answer options */}
                {question.type === "fillBlank" ? (
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-4 text-lg border-2 rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Type your answer here..."
                      value={selectedAnswers[0] || ""}
                      onChange={(e) => handleAnswerSelect(e.target.value, "fillBlank", questionId)}
                    />
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">Fill in the blank with the correct answer</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {question.mockAnswer.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedAnswers.includes(option)
                            ? "bg-blue-50 border-blue-500 dark:bg-blue-900/50 dark:border-blue-400 shadow-md"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 border-gray-200 dark:border-gray-700"
                        }`}
                        onClick={() => handleAnswerSelect(option, question.type, questionId)}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 flex items-center justify-center border-2 rounded-${
                            question.type === "multiple" ? "md" : "full"
                          } mr-3 transition-colors ${
                            selectedAnswers.includes(option)
                              ? "bg-blue-500 border-blue-500 text-white"
                              : "border-gray-300 dark:border-gray-500"
                          }`}>
                            {selectedAnswers.includes(option) && (
                              <FaCheckCircle size={14} />
                            )}
                          </div>
                          <span className="text-lg">{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Question status indicator */}
                <div className="mt-4 flex justify-end">
                  {selectedAnswers.length > 0 ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                      <FaCheckCircle className="mr-1" /> Answered
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                      <FaExclamationTriangle className="mr-1" /> Not answered
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fixed bottom submit button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-4 shadow-lg border-t border-gray-200 dark:border-gray-700 z-10 flex justify-center">
          <button
            onClick={confirmSubmitTest}
            disabled={isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center font-medium shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner /> Submitting...
              </>
            ) : (
              <>
                Submit Test
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div ref={fullscreenRef} className="fixed inset-0 bg-gray-100 dark:bg-gray-900 z-[9999] overflow-y-auto">
          <style jsx global>{`
            .highlight-animation {
              transition: all 0.3s ease;
            }
            .highlight-question {
              box-shadow: 0 0 0 3px #4f46e5, 0 8px 16px -4px rgba(79, 70, 229, 0.3);
              transform: translateY(-2px);
            }
          `}</style>
          
          <div className="min-h-screen px-4 py-8">
            {renderTimeWarning()}
            
            <div ref={modalRef} className="relative">
              {/* Close button */}
              {(isFinished || showCompletionMessage) && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <IoMdClose size={24} className="text-gray-600 dark:text-gray-300" />
                </button>
              )}

              {/* Content */}
              {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <LoadingSpinner/>
                  <p className="text-gray-600 dark:text-gray-300 animate-pulse">Loading test...</p>
                </div>
              ) : showCompletionMessage ? (
                renderCompletionMessage()
              ) : (
                renderAllQuestions()
              )}
            </div>
          </div>
          
          {renderConfirmation()}
        </div>
      )}
    </AnimatePresence>
  );
};

export default FinalTestModal;