"use client"

import type React from "react"
import type { FC } from "react"
import BottomNavigator from "@/components/admin-pages/create-course-page/bottom-navigator"
import ContainNextImage from "@/components/contain-next-image"
import type { TestInfoValues, TestSettingsValues } from "./create-final-test"

interface Props {
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  testData: any
  testInfo: TestInfoValues
  testSettings: TestSettingsValues
  submitTestHandler: () => void
  createTestHandler: () => void
}

const FinalTestOverview: FC<Props> = ({
  active,
  setActive,
  testData,
  testInfo,
  testSettings,
  submitTestHandler,
  createTestHandler,
}): JSX.Element => {
  const backHandler = () => {
    setActive(active - 1)
  }

  const handleSubmit = () => {
    submitTestHandler()
    createTestHandler()
  }

  return (
    <div className="w-full">
      <div className="rounded-sm border dark:border-gray-600 shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Test Overview</h2>
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-sm border dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3 border-b dark:border-gray-700 pb-2">Test Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Name:</h4>
                <p className="text-gray-900 dark:text-gray-100">{testInfo.name || "Not specified"}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">With Sections:</h4>
                <p className="text-gray-900 dark:text-gray-100">{testInfo.withSections ? "Yes" : "No"}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Description:</h4>
                <p className="text-gray-900 dark:text-gray-100">{testInfo.description || "Not specified"}</p>
              </div>
              {/* {testInfo.logo && (
                <div className="md:col-span-2">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Logo:</h4>
                  <div className="w-40 h-40 mt-2">
                    <ContainNextImage src={testInfo.logo} alt="Test Logo" />
                  </div>
                </div>
              )} */}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-sm border dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3 border-b dark:border-gray-700 pb-2">Test Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Duration:</h4>
                <p className="text-gray-900 dark:text-gray-100">
                  {testSettings.duration.days > 0 ? `${testSettings.duration.days} days, ` : ""}
                  {testSettings.duration.hours > 0 ? `${testSettings.duration.hours} hours, ` : ""}
                  {testSettings.duration.minutes > 0 ? `${testSettings.duration.minutes} minutes, ` : ""}
                  {testSettings.duration.seconds > 0 ? `${testSettings.duration.seconds} seconds` : ""}
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
            </div>
          </div>

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

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-sm border dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3 border-b dark:border-gray-700 pb-2">Test Instructions</h3>
            <div className="prose dark:prose-invert max-w-none">
              {testSettings.instructions ? (
                <div className="bg-white dark:bg-gray-900 p-3 rounded border dark:border-gray-700">
                  {testSettings.instructions}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No instructions provided</p>
              )}
            </div>
          </div>

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

      <BottomNavigator backHandler={backHandler} nextHandler={handleSubmit} isCreate />
    </div>
  )
}

export default FinalTestOverview

