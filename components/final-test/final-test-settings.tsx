"use client"

import type React from "react"

import type { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import BottomNavigator from "@/components/admin-pages/create-course-page/bottom-navigator"
import { ChevronDown, ChevronUp, InfoIcon } from "lucide-react"
import type { TestSettingsValues } from "./create-final-test"

interface Props {
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  testSettings: TestSettingsValues
  setTestSettings: React.Dispatch<React.SetStateAction<TestSettingsValues>>
}

// Define schema for form validation
const schema = Yup.object({
  duration: Yup.object({
    days: Yup.number().min(0),
    hours: Yup.number().min(0),
    minutes: Yup.number().min(0),
    seconds: Yup.number().min(0),
  }),
  pageLayout: Yup.string().required(),
  gradingDisplay: Yup.string().required(),
  enableProctoring: Yup.boolean(),
  displaySettings: Yup.object({
    requireInstructions: Yup.boolean(),
    showInstructions: Yup.boolean(),
    showDuration: Yup.boolean(),
    showPassingMark: Yup.boolean(),
    showQuestionCount: Yup.boolean(),
  }),
  instructions: Yup.string(),
  completionMessage: Yup.string(),
})

const Settings: FC<Props> = ({ active, setActive, testSettings, setTestSettings }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TestSettingsValues>({
    defaultValues: testSettings,
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: TestSettingsValues) => {
    setTestSettings(data)
    setActive(active + 1)
  }

  const backHandler = () => {
    setActive(active - 1)
  }

  return (
    <form className="w-full mx-auto mt-8 my-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="rounded-sm border dark:border-gray-600 shadow-sm">
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
                    <label className="text-sm text-gray-500 dark:text-gray-400">Days</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 border rounded-sm dark:bg-gray-800 dark:border-gray-700"
                      {...register("duration.days", { valueAsNumber: true })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Hours</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 border rounded-sm dark:bg-gray-800 dark:border-gray-700"
                      {...register("duration.hours", { valueAsNumber: true })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Minutes</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 border rounded-sm dark:bg-gray-800 dark:border-gray-700"
                      {...register("duration.minutes", { valueAsNumber: true })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Seconds</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 border rounded-sm dark:bg-gray-800 dark:border-gray-700"
                      {...register("duration.seconds", { valueAsNumber: true })}
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
                <select className="px-3 py-2 border rounded-sm w-[180px]" {...register("pageLayout")}>
                  <option value="one">One question</option>
                  <option value="all">All questions</option>
                </select>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <label>Immediately after grading</label>
                </div>
                <select className="px-3 py-2 border rounded-sm w-[180px]" {...register("gradingDisplay")}>
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
                    {...register("enableProctoring")}
                  />
                  <label htmlFor="enable-proctoring">Enable proctoring</label>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="block text-sm font-medium">Test instructions display settings</label>
                <InfoIcon className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="require-instructions"
                    className="rounded border-gray-300"
                    {...register("displaySettings.requireInstructions")}
                  />
                  <label htmlFor="require-instructions">Require instructions acknowledgement</label>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="show-test-instructions"
                    className="rounded border-gray-300"
                    {...register("displaySettings.showInstructions")}
                  />
                  <label htmlFor="show-test-instructions">Show test instructions</label>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="show-test-duration"
                    className="rounded border-gray-300"
                    {...register("displaySettings.showDuration")}
                  />
                  <label htmlFor="show-test-duration">Show test duration</label>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="show-passing-mark"
                    className="rounded border-gray-300"
                    {...register("displaySettings.showPassingMark")}
                  />
                  <label htmlFor="show-passing-mark">Show passing mark</label>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="show-number-of-questions"
                    className="rounded border-gray-300"
                    {...register("displaySettings.showQuestionCount")}
                  />
                  <label htmlFor="show-number-of-questions">Show the number of questions</label>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-sm border shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Test instructions</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-4">
              Write specific test-taking instructions for candidates to acknowledge in a pop-up dialog before starting
              the test. Instructions should be concise and easy to understand.
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
                {...register("instructions")}
              />
            </div>
          </div>
        </div>

        <div className="rounded-sm border shadow-sm">
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
                {...register("completionMessage")}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomNavigator backHandler={backHandler} />
    </form>
  )
}

export default Settings

