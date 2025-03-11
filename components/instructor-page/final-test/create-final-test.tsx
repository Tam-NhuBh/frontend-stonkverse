"use client"

import { useState } from "react"
import { InfoIcon as InfoCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Check } from "lucide-react"

// Định nghĩa kiểu dữ liệu cho TestData
interface Duration {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface DisplaySettings {
  requireInstructions: boolean
  showInstructions: boolean
  showDuration: boolean
  showPassingMark: boolean
  showQuestionCount: boolean
}

interface AdditionalOptions {
  enableIDontKnow: boolean
  enableAnswerFeedback: boolean
  showAnswerFeedbackInPortal: boolean
  showQuestionAttachments: boolean
  showQuestionMetadata: boolean
  enableNotes: boolean
  enableCandidateFeedback: boolean
  enableCommentedQuestions: boolean
  hideFinishButton: boolean
  calculator: string
}

interface Limitations {
  requireAnsweringAll: boolean
  disableGoingBackwards: boolean
  disableScreenLockout: boolean
}

interface Security {
  automaticLogOut: boolean
  browserLockdown: boolean
  hideAssignmentMetadata: boolean
  configureReportPrivacy: boolean
  configureReportAccess: boolean
  requireUpdatingProfile: boolean
}

interface NetworkAccess {
  allNetworks: boolean
  internalNetwork: boolean
  customNetworks: string
}

interface TestData {
  name: string
  description: string
  withSections: boolean
  duration: Duration
  pageLayout: string
  gradingDisplay: string
  enableProctoring: boolean
  displaySettings: DisplaySettings
  instructions: string
  completionMessage: string
  acknowledgement: string
  allowContinuation: boolean
  allowRetaking: boolean
  retakeInterval: Duration
  relatedIntervalToDays: boolean
  enableRetakesForFailedOnly: boolean
  enableLimitedRetakes: boolean
  additionalOptions: AdditionalOptions
  limitations: Limitations
  security: Security
  networkAccess: NetworkAccess
}

export default function CreateFinaTest() {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [testData, setTestData] = useState<TestData>({
    name: "",
    description: "",
    withSections: false,
    duration: {
      days: 0,
      hours: 1,
      minutes: 0,
      seconds: 0,
    },
    pageLayout: "one",
    gradingDisplay: "score",
    enableProctoring: false,
    displaySettings: {
      requireInstructions: true,
      showInstructions: true,
      showDuration: true,
      showPassingMark: true,
      showQuestionCount: true,
    },
    instructions: "",
    completionMessage: "",
    acknowledgement: "I understand and agree with the instructions and rules of this assignment.",
    allowContinuation: true,
    allowRetaking: true,
    retakeInterval: {
      days: 0,
      hours: 0,
      minutes: 30,
      seconds: 0,
    },
    relatedIntervalToDays: false,
    enableRetakesForFailedOnly: false,
    enableLimitedRetakes: false,
    additionalOptions: {
      enableIDontKnow: false,
      enableAnswerFeedback: false,
      showAnswerFeedbackInPortal: false,
      showQuestionAttachments: false,
      showQuestionMetadata: false,
      enableNotes: false,
      enableCandidateFeedback: false,
      enableCommentedQuestions: false,
      hideFinishButton: false,
      calculator: "none",
    },
    limitations: {
      requireAnsweringAll: true,
      disableGoingBackwards: false,
      disableScreenLockout: false,
    },
    security: {
      automaticLogOut: false,
      browserLockdown: false,
      hideAssignmentMetadata: false,
      configureReportPrivacy: false,
      configureReportAccess: false,
      requireUpdatingProfile: true,
    },
    networkAccess: {
      allNetworks: true,
      internalNetwork: false,
      customNetworks: "global",
    },
  })

  // Steps data
  const steps = [
    { number: 1, name: "Test Information" },
    { number: 2, name: "Test Settings" },
    { number: 3, name: "Overview" },
  ]

  const handleInputChange = (field: string, value: any) => {
    setTestData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedInputChange = (parent: keyof TestData, field: string, value: any) => {
    setTestData((prev) => {
      const parentObj = prev[parent] as Record<string, any>
      return {
        ...prev,
        [parent]: {
          ...parentObj,
          [field]: value,
        },
      }
    })
  }

  const handleSubmit = () => {
    console.log("Test data submitted:", testData)
    // Here you would typically send the data to your backend
    alert("Test created successfully!")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6">
        {/* Fixed Steps Component */}
        <div className="sticky top-0 z-50 bg-white rounded-sm border shadow-sm p-4 mb-6">
          <div className="relative">
            <div className="flex justify-between">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex flex-col items-center relative z-10 ${
                    activeStep === step.number ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      activeStep === step.number
                        ? "bg-blue-500 text-white"
                        : activeStep > step.number
                          ? "bg-blue-200 text-blue-700"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {activeStep > step.number ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  <div className="text-xs font-medium text-center">{step.name}</div>
                </div>
              ))}
            </div>
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-8 w-auto">
          {activeStep === 1 && (
            <div className="bg-white rounded-sm border shadow-sm mb-6">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Test information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name *
                  </label>
                  <input
                    id="name"
                    className="w-full px-3 py-2 border rounded-sm"
                    placeholder="Enter test name"
                    value={testData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="w-full px-3 py-2 border rounded-sm min-h-[100px]"
                    placeholder="Enter test description"
                    value={testData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="test-with-sections"
                    className="rounded border-gray-300"
                    checked={testData.withSections}
                    onChange={(e) => handleInputChange("withSections", e.target.checked)}
                  />
                  <label htmlFor="test-with-sections" className="text-sm">
                    Test with sections
                  </label>
                  <InfoCircle className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="test-logo" className="block text-sm font-medium">
                    Test logo
                  </label>
                  <div>
                    <button className="px-4 py-2 border rounded-sm hover:bg-gray-50">Upload</button>
                  </div>
                </div>
                
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-sm border shadow-sm">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Test settings</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="block text-sm font-medium">Select one (optional)</label>
                      <ChevronUp className="h-4 w-4" />
                    </div>
                    <div className="border border-red-500 rounded-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          1
                        </div>
                        <label className="font-medium">Time to answer all questions</label>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mt-2">
                        <div>
                          <label className="text-sm text-gray-500">Days</label>
                          <input
                            type="number"
                            min="0"
                            className="w-full px-3 py-2 border rounded-sm"
                            value={testData.duration.days}
                            onChange={(e) =>
                              handleNestedInputChange("duration", "days", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Hours</label>
                          <input
                            type="number"
                            min="0"
                            className="w-full px-3 py-2 border rounded-sm"
                            value={testData.duration.hours}
                            onChange={(e) =>
                              handleNestedInputChange("duration", "hours", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Minutes</label>
                          <input
                            type="number"
                            min="0"
                            className="w-full px-3 py-2 border rounded-sm"
                            value={testData.duration.minutes}
                            onChange={(e) =>
                              handleNestedInputChange("duration", "minutes", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Seconds</label>
                          <input
                            type="number"
                            min="0"
                            className="w-full px-3 py-2 border rounded-sm"
                            value={testData.duration.seconds}
                            onChange={(e) =>
                              handleNestedInputChange("duration", "seconds", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="block text-sm font-medium">Page layout</label>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <label>One question per page</label>
                      </div>
                      <select
                        className="px-3 py-2 border rounded-sm w-[180px]"
                        value={testData.pageLayout}
                        onChange={(e) => handleInputChange("pageLayout", e.target.value)}
                      >
                        <option value="one">One question</option>
                        <option value="all">All questions</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <label>Immediately after grading</label>
                      </div>
                      <select
                        className="px-3 py-2 border rounded-sm w-[180px]"
                        value={testData.gradingDisplay}
                        onChange={(e) => handleInputChange("gradingDisplay", e.target.value)}
                      >
                        <option value="score">Score and details</option>
                        <option value="score-only">Score only</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="block text-sm font-medium">Proctoring settings</label>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="enable-proctoring"
                          className="rounded border-gray-300"
                          checked={testData.enableProctoring}
                          onChange={(e) => handleInputChange("enableProctoring", e.target.checked)}
                        />
                        <label htmlFor="enable-proctoring">Enable proctoring</label>
                        <InfoCircle className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="block text-sm font-medium">Test instructions display settings</label>
                      <InfoCircle className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="require-instructions"
                          className="rounded border-gray-300"
                          checked={testData.displaySettings.requireInstructions}
                          onChange={(e) =>
                            handleNestedInputChange("displaySettings", "requireInstructions", e.target.checked)
                          }
                        />
                        <label htmlFor="require-instructions">Require instructions acknowledgement</label>
                        <InfoCircle className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="show-test-instructions"
                          className="rounded border-gray-300"
                          checked={testData.displaySettings.showInstructions}
                          onChange={(e) =>
                            handleNestedInputChange("displaySettings", "showInstructions", e.target.checked)
                          }
                        />
                        <label htmlFor="show-test-instructions">Show test instructions</label>
                        <InfoCircle className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="show-test-duration"
                          className="rounded border-gray-300"
                          checked={testData.displaySettings.showDuration}
                          onChange={(e) => handleNestedInputChange("displaySettings", "showDuration", e.target.checked)}
                        />
                        <label htmlFor="show-test-duration">Show test duration</label>
                        <InfoCircle className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="show-passing-mark"
                          className="rounded border-gray-300"
                          checked={testData.displaySettings.showPassingMark}
                          onChange={(e) =>
                            handleNestedInputChange("displaySettings", "showPassingMark", e.target.checked)
                          }
                        />
                        <label htmlFor="show-passing-mark">Show passing mark</label>
                        <InfoCircle className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="show-number-of-questions"
                          className="rounded border-gray-300"
                          checked={testData.displaySettings.showQuestionCount}
                          onChange={(e) =>
                            handleNestedInputChange("displaySettings", "showQuestionCount", e.target.checked)
                          }
                        />
                        <label htmlFor="show-number-of-questions">Show the number of questions</label>
                        <InfoCircle className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-sm border shadow-sm">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Test instructions</h2>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-4">
                    Write specific test-taking instructions for candidates to acknowledge in a pop-up dialog before
                    starting the test. Instructions should be concise and easy to understand.
                  </p>
                  <div className="border p-4 rounded-sm">
                    <div className="flex gap-2 mb-4 border-b pb-2">
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">B</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">I</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">U</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">S</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">A</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">{"<>"}</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">{"{}"}</button>
                    </div>
                    <textarea
                      className="w-full min-h-[150px] border-none focus:outline-none"
                      placeholder="Enter test instructions"
                      value={testData.instructions}
                      onChange={(e) => handleInputChange("instructions", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-sm border shadow-sm">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Test completion message</h2>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-4">
                    Write a message that candidates will see after completing the test. Provide details about result
                    availability or additional steps.
                  </p>
                  <div className="border p-4 rounded-sm">
                    <div className="flex gap-2 mb-4 border-b pb-2">
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">B</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">I</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">U</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">S</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">A</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">{"<>"}</button>
                      <button className="px-2 py-1 hover:bg-gray-100 rounded">{"{}"}</button>
                    </div>
                    <textarea
                      className="w-full min-h-[150px] border-none focus:outline-none"
                      placeholder="Enter completion message"
                      value={testData.completionMessage}
                      onChange={(e) => handleInputChange("completionMessage", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="bg-white rounded-sm border shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Test Overview</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-sm border">
                  <h3 className="font-semibold text-lg mb-3 border-b pb-2">Test Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700">Name:</h4>
                      <p className="text-gray-900">{testData.name || "Not specified"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">With Sections:</h4>
                      <p className="text-gray-900">{testData.withSections ? "Yes" : "No"}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-medium text-gray-700">Description:</h4>
                      <p className="text-gray-900">{testData.description || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-sm border">
                  <h3 className="font-semibold text-lg mb-3 border-b pb-2">Test Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700">Duration:</h4>
                      <p className="text-gray-900">
                        {testData.duration.days > 0 ? `${testData.duration.days} days, ` : ""}
                        {testData.duration.hours > 0 ? `${testData.duration.hours} hours, ` : ""}
                        {testData.duration.minutes > 0 ? `${testData.duration.minutes} minutes, ` : ""}
                        {testData.duration.seconds > 0 ? `${testData.duration.seconds} seconds` : ""}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Page Layout:</h4>
                      <p className="text-gray-900">
                        {testData.pageLayout === "one" ? "One question per page" : "All questions"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Grading Display:</h4>
                      <p className="text-gray-900">
                        {testData.gradingDisplay === "score" ? "Score and details" : "Score only"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Proctoring:</h4>
                      <p className="text-gray-900">{testData.enableProctoring ? "Enabled" : "Disabled"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-sm border">
                  <h3 className="font-semibold text-lg mb-3 border-b pb-2">Display Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700">Require Instructions Acknowledgement:</h4>
                      <p className="text-gray-900">{testData.displaySettings.requireInstructions ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Show Instructions:</h4>
                      <p className="text-gray-900">{testData.displaySettings.showInstructions ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Show Duration:</h4>
                      <p className="text-gray-900">{testData.displaySettings.showDuration ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Show Passing Mark:</h4>
                      <p className="text-gray-900">{testData.displaySettings.showPassingMark ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Show Question Count:</h4>
                      <p className="text-gray-900">{testData.displaySettings.showQuestionCount ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-sm border">
                  <h3 className="font-semibold text-lg mb-3 border-b pb-2">Test Instructions</h3>
                  <div className="prose max-w-none">
                    {testData.instructions ? (
                      <div className="bg-white p-3 rounded border">{testData.instructions}</div>
                    ) : (
                      <p className="text-gray-500 italic">No instructions provided</p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-sm border">
                  <h3 className="font-semibold text-lg mb-3 border-b pb-2">Completion Message</h3>
                  <div className="prose max-w-none">
                    {testData.completionMessage ? (
                      <div className="bg-white p-3 rounded border">{testData.completionMessage}</div>
                    ) : (
                      <p className="text-gray-500 italic">No completion message provided</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {activeStep > 1 && (
              <button
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-sm flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </button>
            )}
            {activeStep < 3 ? (
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-sm flex items-center ml-auto"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-sm flex items-center ml-auto"
              >
                <Check className="h-4 w-4 mr-2" />
                Confirm Test
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

