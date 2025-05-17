"use client"

import type { FC } from "react"
import type { ITitleFinalTest, TestSettings } from "@/types"
import { CheckCircle, CheckSquare, FileText, ImageIcon } from "lucide-react"
import BottomNavigator from "../admin-pages/create-course-page/bottom-navigator"

interface TestOverviewProps {
  finalTests: ITitleFinalTest[]
  testSettings: TestSettings
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
  courseId: string
}

const TestOverview: FC<TestOverviewProps> = ({
  finalTests,
  testSettings,
  onBack,
  onSubmit,
  isSubmitting,
  courseId
}): JSX.Element => {
  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "single":
        return <CheckCircle size={16} className="text-blue-500" />;
      case "multiple":
        return <CheckSquare size={16} className="text-purple-500" />;
      case "fillBlank":
        return <FileText size={16} className="text-green-500" />;
      case "image":
        return <ImageIcon size={16} className="text-amber-500" />;
      default:
        return <CheckCircle size={16} />;
    }
  }

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "single":
        return "Single Choice";
      case "multiple":
        return "Multiple Choice";
      case "fillBlank":
        return "Fill in the Blank";
      case "image":
        return "Image Question";
      default:
        return type;
    }
  }

  return (
    <div className="w-full">
      <div className="rounded-sm border dark:border-gray-600 shadow-sm p-6">
        <div className="space-y-6">
          {/* Test Information */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-sm border dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3 border-b dark:border-gray-700 pb-2">Test Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Title:</h4>
                <p className="text-gray-900 dark:text-gray-100">{finalTests[0]?.title || "Not specified"}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Description:</h4>
                <p className="text-gray-900 dark:text-gray-100">{finalTests[0]?.description || "Not specified"}</p>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-sm border dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3 border-b dark:border-gray-700 pb-2">Questions ({finalTests.length})</h3>

            {finalTests.length > 0 ? (
              <div className="space-y-4">
                {finalTests.map((question, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 p-3 rounded-sm border dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                        Question {index + 1}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                        {getQuestionTypeIcon(question.type)}
                        <span>{getQuestionTypeLabel(question.type)}</span>
                      </span>
                    </div>

                    <div className="mb-2">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">{question.title}</h4>
                    </div>

                    {/* Display image for image questions */}
                    {question.type === "image" && question.imageUrl && (
                      <div className="mb-3 border rounded-sm dark:border-gray-700 overflow-hidden">
                        <img
                          src={question.imageUrl}
                          alt={question.title}
                          className="max-h-32 mx-auto object-contain my-2"
                        />
                      </div>
                    )}

                    {/* Options */}
                    <div className="mb-2">
                      <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Options:</h5>
                      <div className="ml-2 space-y-1">
                        {question.type === "fillBlank" ? (
                          <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                            Fill in the blank answer
                          </div>
                        ) : (
                          question.mockAnswer.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-start gap-2">
                              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <span className={`text-sm ${question.correctAnswer.includes(option) ? "font-semibold text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}>
                                {option}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Correct Answers */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Correct Answer:</h5>
                      <div className="ml-2">
                        {question.type === "fillBlank" ? (
                          <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                            {question.correctAnswer[0] || "Not specified"}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {question.correctAnswer.map((answer, ansIndex) => (
                              <span key={ansIndex} className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-0.5 rounded-full">
                                {answer}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">No questions added yet</p>
            )}
          </div>

          {/* Test Settings */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-sm border dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3 border-b dark:border-gray-700 pb-2">Test Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Duration:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.testDuration.days > 0 ? `${testSettings.testDuration.days} days, ` : ""}
                  {testSettings.testDuration.hours > 0 ? `${testSettings.testDuration.hours} hours, ` : ""}
                  {testSettings.testDuration.minutes > 0 ? `${testSettings.testDuration.minutes} minutes, ` : ""}
                  {testSettings.testDuration.seconds > 0 ? `${testSettings.testDuration.seconds} seconds` : ""}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Page Layout:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.pageLayout === "one" ? "One question per page" : "All questions"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Grading Display:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.gradingDisplay === "score" ? "Score and details" : "Score only"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Proctoring:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.enableProctoring ? "Enabled" : "Disabled"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Passing Grade:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.passingGrade ? `${testSettings.passingGrade}%` : "Not set"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Number of Questions:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.numberOfQuestions}
                </p>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-sm border dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3 border-b dark:border-gray-700 pb-2">Display Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Require Instructions Acknowledgement:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.displaySettings.requireInstructions ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Show Instructions:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.displaySettings.showInstructions ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Show Duration:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.displaySettings.showDuration ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Show Passing Mark:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.displaySettings.showPassingMark ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Show Question Count:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.displaySettings.showQuestionCount ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>


          {/* Test Instructions */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-sm border dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3 border-b dark:border-gray-700 pb-2">Test Instructions</h3>
            <div className="prose dark:prose-invert max-w-none">
              {testSettings.instructionsMessage ? (
                <div className="bg-white dark:bg-gray-900 p-3 rounded border dark:border-gray-700">
                  {testSettings.instructionsMessage}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No instructions provided</p>
              )}
            </div>
          </div>

          {/* Completion Message */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-sm border dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3 border-b dark:border-gray-700 pb-2">Completion Message</h3>
            <div className="prose dark:prose-invert max-w-none">
              {testSettings.completionMessage ? (
                <div className="bg-white dark:bg-gray-900 p-3 rounded border dark:border-gray-700">
                  {testSettings.completionMessage}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No completion message provided</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8">
        <BottomNavigator
          backHandler={onBack}
          nextHandler={onSubmit}
          isCreate
        />
      </div>
    </div>
  )
}

export default TestOverview