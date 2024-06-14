import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import BtnWithIcon from "./btn-with-icon";
import { addAnswerQuiz } from "@/lib/mutation-data";

interface QuizQuestion {
  id: string;
  title: string;
  mockAnswer: string[];
  correctAnswer: string[];
  maxScore: number;
}

interface Props {
  courseId: string;
  contentId: string;
  questions: QuizQuestion[];
  onClose: () => void;
  onQuizSubmit: () => void; 
}

const CourseQuiz: FC<Props> = ({ courseId, contentId, questions, onClose, onQuizSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string[] }>({});
  const [score, setScore] = useState<number | null>(null);
  const [questionScores, setQuestionScores] = useState<{ [key: string]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isResubmitEnabled, setIsResubmitEnabled] = useState<boolean>(false);
  const [canEnableResubmit, setCanEnableResubmit] = useState<boolean>(false);
  const [resubmitTimeout, setResubmitTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`quizAnswers_${courseId}_${contentId}`);
    const savedScore = localStorage.getItem(`quizScore_${courseId}_${contentId}`);
    const savedQuestionScores = localStorage.getItem(`questionScores_${courseId}_${contentId}`);
    const savedHasSubmitted = localStorage.getItem(`hasSubmitted_${courseId}_${contentId}`);

    if (isFirstLoad) {
      setIsFirstLoad(false);
    } else {
      setSelectedAnswers(savedAnswers ? JSON.parse(savedAnswers) : {});
      setScore(savedScore ? JSON.parse(savedScore) : null);
      setQuestionScores(savedQuestionScores ? JSON.parse(savedQuestionScores) : {});
      setHasSubmitted(savedHasSubmitted ? JSON.parse(savedHasSubmitted) : false);
    }
  }, [courseId, contentId, setSelectedAnswers, setScore, setQuestionScores, setHasSubmitted, isFirstLoad]);

  useEffect(() => {
    if (!isFirstLoad) {
      localStorage.setItem(`quizAnswers_${courseId}_${contentId}`, JSON.stringify(selectedAnswers));
    }
  }, [selectedAnswers, courseId, contentId]);

  useEffect(() => {
    if (!isFirstLoad) {
      localStorage.setItem(`quizScore_${courseId}_${contentId}`, JSON.stringify(score));
    }
  }, [score, courseId, contentId]);

  useEffect(() => {
    if (!isFirstLoad) {
      localStorage.setItem(`questionScores_${courseId}_${contentId}`, JSON.stringify(questionScores));
    }
  }, [questionScores, courseId, contentId]);

  useEffect(() => {
    if (!isFirstLoad) {
      localStorage.setItem(`hasSubmitted_${courseId}_${contentId}`, JSON.stringify(hasSubmitted));
    }
  }, [hasSubmitted, courseId, contentId]);

  useEffect(() => {
    if (!isFirstLoad) {
      if (hasSubmitted) {
        const timeout = setTimeout(() => setCanEnableResubmit(true), 40000);
        setResubmitTimeout(timeout);
      } else {
        setCanEnableResubmit(false);
        setIsResubmitEnabled(false);
        if (resubmitTimeout) clearTimeout(resubmitTimeout);
      }
    }
  }, [hasSubmitted]);

  const handleAnswerChange = (questionId: string, correctAnswerLength: number, answer: string, isChecked: boolean) => {
    if (hasSubmitted && !isResubmitEnabled) return;
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };
      if (isChecked) {
        if (newAnswers[questionId]?.includes(answer)) return newAnswers;
        newAnswers[questionId] = correctAnswerLength === 1 ? [answer] : [...(newAnswers[questionId] || []), answer];
      } else {
        newAnswers[questionId] = newAnswers[questionId]?.filter((ans) => ans !== answer) || [];
      }
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    if (hasSubmitted && isResubmitEnabled) {
      handleResubmit();
      return;
    }
    const isAllQuestionsAnswered = questions.every(question => selectedAnswers[question.id]?.length > 0);
    if (!isAllQuestionsAnswered) {
      toast.error("Please answer all questions before submitting");
      return;
    }
    setIsSubmitting(true);
    try {
      const submissionData = questions.map((question) => ({
        questionId: question.id,
        answer: selectedAnswers[question.id] || []
      }));
      const response = await addAnswerQuiz(courseId, contentId, submissionData);
      if (response) {
        const { totalScore, detailedScores } = response;
        setScore(totalScore);
        setQuestionScores(detailedScores);
        toast.success("Quiz answers submitted successfully!");
        setHasSubmitted(true);
        onQuizSubmit(); 
        const timeout = setTimeout(() => setCanEnableResubmit(true), 40000);
        setResubmitTimeout(timeout);
      }
    } catch (error) {
      toast.error("An error occurred while submitting your answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnableResubmit = () => {
    setIsResubmitEnabled(true);
  };

  const handleCancelResubmit = () => {
    setIsResubmitEnabled(false);
  };

  const handleResubmit = () => {
    setHasSubmitted(false);
    setIsResubmitEnabled(false);
    setCanEnableResubmit(false);
    setScore(null);
    setQuestionScores({});
    setSelectedAnswers({});
    localStorage.removeItem(`quizAnswers_${courseId}_${contentId}`);
    localStorage.removeItem(`quizScore_${courseId}_${contentId}`);
    localStorage.removeItem(`questionScores_${courseId}_${contentId}`);
    localStorage.removeItem(`hasSubmitted_${courseId}_${contentId}`);
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 dark:border-slate-100 ">
      <h2 className="text-3xl font-semibold mb-4">Quiz</h2>
      <div className="grid gap-4 mb-5">
        {questions.map((question, index) => {
          const tickType = question.correctAnswer.length > 1 ? 'checkbox' : 'radio';
          return (
            <div key={question.id} className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg">
              <p className="text-lg font-semibold mb-2">
                Question {index + 1}: {question.title}
                {score !== null && (
                  <span className="ml-2 text-sm text-red-500 dark:text-red-400">
                    ({questionScores?.[question.id] || 0}/{question.maxScore} points)
                  </span>
                )}
              </p>
              {question.mockAnswer.map((answer, ansIndex) => (
                <label key={ansIndex} className="flex items-center mt-2 text-gray-600 dark:text-white cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-900 duration-300 transition">
                  <input
                    type={tickType}
                    name={`question-${index}`}
                    className={`mr-2 ${tickType === 'radio' ? 'rounded-full' : 'rounded-md'}`}
                    value={answer}
                    onChange={(e) => handleAnswerChange(question.id, question.correctAnswer.length, answer, e.target.checked)}
                    checked={selectedAnswers[question.id]?.includes(answer) || false}
                    disabled={hasSubmitted && !isResubmitEnabled}
                  />
                  {answer}
                </label>
              ))}
            </div>
          );
        })}
      </div>
      <div className="flex space-x-4">
        <BtnWithIcon
          content={hasSubmitted && isResubmitEnabled ? "RESUBMIT" : hasSubmitted ? "ENABLE RESUBMIT" : "SUBMIT"}
          type="submit"
          onClick={hasSubmitted && !isResubmitEnabled ? handleEnableResubmit : handleSubmit}
          iconSize={25}
          iconCustomClasses="-mt-1"
          disabled={isSubmitting || (hasSubmitted && !canEnableResubmit && !isResubmitEnabled)}
        />
        {hasSubmitted && isResubmitEnabled && (
          <BtnWithIcon
            content="CANCEL"
            type="button"
            iconSize={25}
            onClick={handleCancelResubmit}
          />
        )}
      </div>
      {score !== null && (
        <div className="mt-4 text-2xl font-semibold">
          Your total score: {score}/{questions.reduce((acc, question) => acc + question.maxScore, 0)}
        </div>
      )}
    </div>
  );
};

export default CourseQuiz;
