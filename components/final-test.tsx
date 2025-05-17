"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"

// Mock data for the quiz
const mockQuizData = {
  id: "quiz123",
  title: "Bài kiểm tra cuối kỳ",
  description: "Kiểm tra kiến thức về lập trình web",
  duration: 30 * 60, // 30 minutes in seconds
  questions: [
    {
      id: "q1",
      title: "HTML là viết tắt của?",
      type: "single",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language",
      ],
      correctAnswer: ["Hyper Text Markup Language"],
    },
    {
      id: "q2",
      title: "Đâu là ngôn ngữ lập trình?",
      type: "multiple",
      options: ["HTML", "CSS", "JavaScript", "XML"],
      correctAnswer: ["JavaScript"],
    },
    {
      id: "q3",
      title: "CSS là viết tắt của ___.",
      type: "fillBlank",
      options: [],
      correctAnswer: ["Cascading Style Sheets"],
    },
    {
      id: "q4",
      title: "Hãy nhận diện logo của React:",
      type: "image",
      options: ["Logo Angular", "Logo React", "Logo Vue", "Logo Svelte"],
      optionImages: [
        "https://angular.io/assets/images/logos/angular/angular.svg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
        "https://vuejs.org/images/logo.png",
        "https://svelte.dev/svelte-logo.svg",
      ],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      correctAnswer: ["Logo React"],
    },
    {
      id: "q5",
      title: "JavaScript được phát triển bởi ai?",
      type: "single",
      options: ["Microsoft", "Mozilla", "Netscape", "Google"],
      correctAnswer: ["Netscape"],
    },
  ],
}

const QuizTimer = () => {
  const router = useRouter()
  const [quiz, setQuiz] = useState(mockQuizData)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({})
  const [timeLeft, setTimeLeft] = useState(quiz.duration)
  const [isFinished, setIsFinished] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [devToolsOpen, setDevToolsOpen] = useState(false)
  const [warningCount, setWarningCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const originalConsoleLog = useRef<any>(null)
  const blurCount = useRef(0)
  const lastBlurTime = useRef(0)

  // Anti-cheat: Detect devtools
  useEffect(() => {
    // Store original console methods
    originalConsoleLog.current = window.console.log

    // Override console methods to detect usage
    const detectConsoleUsage = () => {
      setDevToolsOpen(true)
      setWarningCount((prev) => prev + 1)
      return "Sử dụng console bị cấm trong quá trình làm bài!"
    }

    window.console.log = detectConsoleUsage as any
    window.console.warn = detectConsoleUsage as any
    window.console.error = detectConsoleUsage as any
    window.console.info = detectConsoleUsage as any
    window.console.debug = detectConsoleUsage as any

    // Detect F12 key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault()
        setDevToolsOpen(true)
        setWarningCount((prev) => prev + 1)
      }
    }

    // Detect window blur (tab switching)
    const handleBlur = () => {
      const now = Date.now()
      if (now - lastBlurTime.current < 3000) {
        blurCount.current += 1
      } else {
        blurCount.current = 1
      }

      lastBlurTime.current = now

      if (blurCount.current >= 3) {
        setDevToolsOpen(true)
        setWarningCount((prev) => prev + 1)
      }
    }

    // Detect devtools by window size
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold

      if (widthThreshold || heightThreshold) {
        setDevToolsOpen(true)
        setWarningCount((prev) => prev + 1)
      }
    }

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      setDevToolsOpen(true)
      setWarningCount((prev) => prev + 1)
      return false
    }

    // Set up event listeners
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("blur", handleBlur)
    window.addEventListener("resize", detectDevTools)
    window.addEventListener("contextmenu", handleContextMenu)

    // Check periodically
    const checkInterval = setInterval(detectDevTools, 1000)

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("blur", handleBlur)
      window.removeEventListener("resize", detectDevTools)
      window.removeEventListener("contextmenu", handleContextMenu)
      clearInterval(checkInterval)

      // Restore original console methods
      if (originalConsoleLog.current) {
        window.console.log = originalConsoleLog.current
      }
    }
  }, [])

  useEffect(() => {
    const disableShortcuts = (e: KeyboardEvent) => {
      if (
        // Ctrl+P (Print)
        (e.ctrlKey && e.key === "p") ||
        // Ctrl+S (Save)
        (e.ctrlKey && e.key === "s") ||
        // Ctrl+Shift+S (Save as)
        (e.ctrlKey && e.shiftKey && e.key === "s") ||
        // Ctrl+O (Open)
        (e.ctrlKey && e.key === "o") ||
        // Alt+F4 (Close window)
        (e.altKey && e.key === "F4") ||
        // Alt+Tab (Switch window)
        (e.altKey && e.key === "Tab") ||
        // Ctrl+Tab (Switch tab)
        (e.ctrlKey && e.key === "Tab") ||
        // Ctrl+Shift+I (Inspect)
        (e.ctrlKey && e.shiftKey && e.key === "i") ||
        // Ctrl+Shift+C (Inspect element)
        (e.ctrlKey && e.shiftKey && e.key === "c") ||
        // Ctrl+Shift+J (Console)
        (e.ctrlKey && e.shiftKey && e.key === "j") ||
        // Ctrl+Shift+K (Console in Firefox)
        (e.ctrlKey && e.shiftKey && e.key === "k") ||
        // Ctrl+Shift+M (Mobile view)
        (e.ctrlKey && e.shiftKey && e.key === "m") ||
        // Ctrl+Alt+I (Developer tools in some browsers)
        (e.ctrlKey && e.altKey && e.key === "i")
      ) {
        e.preventDefault()
        setDevToolsOpen(true)
        setWarningCount((prev) => prev + 1)
        return false
      }
    }

    window.addEventListener("keydown", disableShortcuts)

    return () => {
      window.removeEventListener("keydown", disableShortcuts)
    }
  }, [])

  // Add this function to disable copy/paste
  useEffect(() => {
    const disableCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault()
      setDevToolsOpen(true)
      setWarningCount((prev) => prev + 1)
      return false
    }

    document.addEventListener("copy", disableCopyPaste)
    document.addEventListener("cut", disableCopyPaste)
    document.addEventListener("paste", disableCopyPaste)

    return () => {
      document.removeEventListener("copy", disableCopyPaste)
      document.removeEventListener("cut", disableCopyPaste)
      document.removeEventListener("paste", disableCopyPaste)
    }
  }, [])

  // Add this function to detect when user tries to leave the page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Cancel the event
      e.preventDefault()
      // Chrome requires returnValue to be set
      e.returnValue = ""

      // This won't actually show in most modern browsers for security reasons,
      // but we're setting it anyway
      return "Bạn có chắc chắn muốn rời khỏi bài kiểm tra? Tiến trình của bạn có thể bị mất."
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (isFinished || isSubmitting) return

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout)
          handleSubmitQuiz()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isFinished, isSubmitting])

  // Effect to handle excessive warnings
  useEffect(() => {
    if (warningCount >= 3) {
      handleSubmitQuiz()
    }
  }, [warningCount])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: string, questionType: string) => {
    const currentQuestion = quiz.questions[currentQuestionIndex]

    if (questionType === "single" || questionType === "image") {
      setUserAnswers({
        ...userAnswers,
        [currentQuestion.id]: [answer],
      })
    } else if (questionType === "multiple") {
      const currentAnswers = userAnswers[currentQuestion.id] || []
      const updatedAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter((a) => a !== answer)
        : [...currentAnswers, answer]

      setUserAnswers({
        ...userAnswers,
        [currentQuestion.id]: updatedAnswers,
      })
    } else if (questionType === "fillBlank") {
      setUserAnswers({
        ...userAnswers,
        [currentQuestion.id]: [answer],
      })
    }
  }

  // Handle text input for fill in the blank questions
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentQuestion = quiz.questions[currentQuestionIndex]
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: [e.target.value],
    })
  }

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // Calculate score and finish quiz
  const handleSubmitQuiz = () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Calculate score
    let correctCount = 0
    quiz.questions.forEach((question) => {
      const userAnswer = userAnswers[question.id] || []

      if (question.type === "multiple") {
        // For multiple choice, all selected answers must match correct answers exactly
        const isCorrect =
          userAnswer.length === question.correctAnswer.length &&
          userAnswer.every((answer) => question.correctAnswer.includes(answer))

        if (isCorrect) correctCount++
      } else {
        // For single choice, fill in blank, and image questions
        const isCorrect = question.correctAnswer.some((correct) => userAnswer.includes(correct))

        if (isCorrect) correctCount++
      }
    })

    const finalScore = Math.round((correctCount / quiz.questions.length) * 100)
    setScore(finalScore)
    setIsFinished(true)
    setIsSubmitting(false)
  }

  // Render current question
  const renderQuestion = () => {
    if (isFinished) return null

    const currentQuestion = quiz.questions[currentQuestionIndex]
    const selectedAnswers = userAnswers[currentQuestion.id] || []

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">
            Câu hỏi {currentQuestionIndex + 1}/{quiz.questions.length}
          </h3>
          <p className="text-lg">{currentQuestion.title}</p>

          {/* Display question image if available */}
          {currentQuestion.type === "image" && currentQuestion.imageUrl && (
            <div className="my-4 flex justify-center">
              <img
                src={currentQuestion.imageUrl || "/placeholder.svg"}
                alt="Question Image"
                className="max-h-60 object-contain"
              />
            </div>
          )}
        </div>

        {/* Render different answer types based on question type */}
        {currentQuestion.type === "fillBlank" ? (
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              placeholder="Nhập câu trả lời của bạn"
              value={selectedAnswers[0] || ""}
              onChange={handleTextInput}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${
                  selectedAnswers.includes(option)
                    ? "bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleAnswerSelect(option, currentQuestion.type)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 flex items-center justify-center border rounded-md mr-3 ${
                      selectedAnswers.includes(option)
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-gray-300 dark:border-gray-500"
                    }`}
                  >
                    {selectedAnswers.includes(option) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <span>{option}</span>

                    {/* Display option image for image type questions */}
                    {currentQuestion.type === "image" &&
                      currentQuestion.optionImages &&
                      currentQuestion.optionImages[index] && (
                        <div className="mt-2">
                          <img
                            src={currentQuestion.optionImages[index] || "/placeholder.svg"}
                            alt={`Option ${index + 1}`}
                            className="h-16 object-contain"
                          />
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Render quiz results
  const renderResults = () => {
    if (!isFinished) return null

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Kết quả bài kiểm tra</h2>

        {devToolsOpen ? (
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-xl font-bold">Phát hiện gian lận!</p>
            <p className="mt-2">Bài kiểm tra đã bị kết thúc do phát hiện hành vi gian lận.</p>
          </div>
        ) : (
          <>
            <div className="text-6xl font-bold mb-4 text-blue-600 dark:text-blue-400">{score}%</div>
            <p className="text-lg mb-6">Bạn đã hoàn thành bài kiểm tra với {score}% câu trả lời đúng.</p>
          </>
        )}

        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => router.push("/")}
        >
          Quay lại trang chủ
        </button>
      </div>
    )
  }

  // Render warning modal
  const renderWarningModal = () => {
    if (!devToolsOpen || isFinished) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">Cảnh báo!</h3>
            <p className="mb-4">
              Phát hiện hành vi không được phép. Đây là cảnh báo {warningCount}/3. Nếu tiếp tục, bài kiểm tra sẽ tự động
              kết thúc.
            </p>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              onClick={() => setDevToolsOpen(false)}
            >
              Tôi hiểu
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4"
      onContextMenu={(e) => {
        e.preventDefault()
        setDevToolsOpen(true)
        setWarningCount((prev) => prev + 1)
        return false
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Quiz header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <div className="text-xl font-mono bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md">
              {formatTime(timeLeft)}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{quiz.description}</p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question content */}
        {renderQuestion()}
        {renderResults()}

        {/* Navigation buttons */}
        {!isFinished && (
          <div className="flex justify-between">
            <button
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Câu trước
            </button>

            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang nộp bài..." : "Nộp bài"}
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleNextQuestion}
              >
                Câu tiếp theo
              </button>
            )}
          </div>
        )}

        {/* Question navigation dots */}
        {!isFinished && (
          <div className="flex justify-center mt-6 flex-wrap gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  index === currentQuestionIndex
                    ? "bg-blue-600 text-white"
                    : userAnswers[quiz.questions[index].id]
                      ? "bg-green-100 text-green-800 border border-green-500 dark:bg-green-900 dark:text-green-200"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Warning modal */}
      {renderWarningModal()}
    </div>
  )
}

export default QuizTimer
