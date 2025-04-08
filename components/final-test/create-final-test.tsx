"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import FinalTestOverview from "./final-test-overview"
import FinalTestInfomation from "./final-test-infomation"
import Settings from "./final-test-settings"

export interface TestInfoValues {
  name: string
  description: string
  logo?: string
  withSections?: boolean
  questions?: {
    title: string
    type: "single" | "multiple" | "fillBlank" | "image"
    correctAnswer: string[]
    options: string[]
    imageUrl?: string
  }[]
}

export interface TestSettingsValues {
  duration: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
  pageLayout: string
  gradingDisplay: string
  enableProctoring: boolean
  displaySettings: {
    requireInstructions: boolean
    showInstructions: boolean
    showDuration: boolean
    showPassingMark: boolean
    showQuestionCount: boolean
  }
  instructions?: string
  completionMessage?: string
}

export default function CreateFinalTest() {
  const [active, setActive] = useState(0)
  const [testInfo, setTestInfo] = useState<TestInfoValues>({
    name: "",
    description: "",
    withSections: false,

  })
  const [testSettings, setTestSettings] = useState<TestSettingsValues>({
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
      requireInstructions: false,
      showInstructions: true,
      showDuration: true,
      showPassingMark: true,
      showQuestionCount: true,
    },
  })
  const [testData, setTestData] = useState({})

  const steps = [
    { number: 1, name: "Test Information" },
    { number: 2, name: "Test Settings" },
    { number: 3, name: "Test Overview" },
  ]

  const submitHandler = () => {
    console.log("Test submitted")
  }

  const createTestHandler = () => {
    console.log("Test created")
  }

  return (
    <div className="flex min-h-screen mt-5">
      <div className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="sticky top-1 bg-white dark:bg-gray-900 rounded-sm border dark:border-gray-600 shadow-sm p-4 mb-6">
            <div className="relative">
              <div className="flex justify-between">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`flex flex-col items-center relative z-10 ${
                      active === step.number - 1 ? "text-[#3e4396]" : "text-[#384766]"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        active === step.number - 1
                          ? "bg-[#3e4396] text-dark_text"
                          : active > step.number - 1
                            ? "bg-[#3e4396] text-dark_text"
                            : "bg-[#384766] text-dark_text"
                      }`}
                    >
                      {active > step.number - 1 ? <Check className="h-5 w-5" /> : step.number}
                    </div>
                    <div className="text-xs font-medium text-center">{step.name}</div>
                  </div>
                ))}
              </div>
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                <div
                  className="h-full bg-[#3e4396] transition-all duration-300"
                  style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Content - Same container as progress bar */}
          <div className="mb-12">
            {active === 0 && (
              <FinalTestInfomation
                active={active}
                setActive={setActive}
                testInfo={testInfo}
                setTestInfo={setTestInfo}
              />
            )}

            {active === 1 && (
              <Settings
                active={active}
                setActive={setActive}
                testSettings={testSettings}
                setTestSettings={setTestSettings}
              />
            )}

            {active === 2 && (
              <FinalTestOverview
                active={active}
                setActive={setActive}
                testData={testData}
                testInfo={testInfo}
                testSettings={testSettings}
                submitTestHandler={submitHandler}
                createTestHandler={createTestHandler}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

