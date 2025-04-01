"use client"

import type React from "react"

import type { FC } from "react"
import { Form, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import BottomNavigator from "@/components/admin-pages/create-course-page/bottom-navigator"
import { ChevronDown, ChevronUp, InfoIcon } from "lucide-react"
import type { TestSettingsValues } from "./create-final-test"
import FormSelect from "../form-select"

const Tooltip = ({ content }: { content: string }) => {
  return (
    <div className="group relative flex">
      <InfoIcon className="h-4 w-4 text-gray-400 cursor-help" />
      <span className="absolute z-10 invisible group-hover:visible bg-black text-white p-2 rounded text-xs w-64 md:w-72 lg:w-80 top-0 left-0 md:left-auto md:right-0 lg:left-auto lg:right-0 mt-6 md:mt-0 md:-mr-2">
        {content}
      </span>
    </div>
  )
}

interface Props {
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  testSettings: TestSettingsValues
  setTestSettings: React.Dispatch<React.SetStateAction<TestSettingsValues>>
}

// Define schema for form validation
const schema = Yup.object({
  duration: Yup.object({
    days: Yup.number().min(0).required("Days is required"),
    hours: Yup.number().min(0).required("Hours is required"),
    minutes: Yup.number().min(0).required("Minutes is required"),
    seconds: Yup.number().min(0).required("Seconds is required"),
  }),
  totalQuestions: Yup.number().min(1, "At least 1 question is required").required("Number of questions is required"),
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
    setValue,
  } = useForm<TestSettingsValues>({
    defaultValues: {
      ...testSettings,
      pageLayout: testSettings.pageLayout || "all",
      gradingDisplay: testSettings.gradingDisplay || "score-only",
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: TestSettingsValues) => {
    // Check if at least one time field has a value greater than 0
    const { days, hours, minutes, seconds } = data.duration
    if (
      (days === 0 || days === undefined) &&
      (hours === 0 || hours === undefined) &&
      (minutes === 0 || minutes === undefined) &&
      (seconds === 0 || seconds === undefined)
    ) {
      alert("Please set a time for the test. At least one time field must be greater than 0.")
      return
    }

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
              <div className="border border-red-500 rounded-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    1
                  </div>
                  <label className="font-medium">Time to answer all questions</label>
                  <Tooltip content="Set the total time allowed for students to complete all questions in the test. At least one field must be filled." />
                </div>
                <div className="grid grid-cols-4 gap-4 mt-2">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Days</label>
                    <input
                      type="number"
                      min="0"
                      className={`w-full px-3 py-2 border rounded-sm dark:bg-gray-800 dark:border-gray-700 ${errors.duration?.days ? "border-red-500" : ""
                        }`}
                      {...register("duration.days", { valueAsNumber: true })}
                    />
                    {errors.duration?.days && (
                      <p className="text-red-500 text-xs mt-1">{errors.duration.days.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Hours</label>
                    <input
                      type="number"
                      min="0"
                      className={`w-full px-3 py-2 border rounded-sm dark:bg-gray-800 dark:border-gray-700 ${errors.duration?.hours ? "border-red-500" : ""
                        }`}
                      {...register("duration.hours", { valueAsNumber: true })}
                    />
                    {errors.duration?.hours && (
                      <p className="text-red-500 text-xs mt-1">{errors.duration.hours.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Minutes</label>
                    <input
                      type="number"
                      min="0"
                      className={`w-full px-3 py-2 border rounded-sm dark:bg-gray-800 dark:border-gray-700 ${errors.duration?.minutes ? "border-red-500" : ""
                        }`}
                      {...register("duration.minutes", { valueAsNumber: true })}
                    />
                    {errors.duration?.minutes && (
                      <p className="text-red-500 text-xs mt-1">{errors.duration.minutes.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Seconds</label>
                    <input
                      type="number"
                      min="0"
                      className={`w-full px-3 py-2 border rounded-sm dark:bg-gray-800 dark:border-gray-700 ${errors.duration?.seconds ? "border-red-500" : ""
                        }`}
                      {...register("duration.seconds", { valueAsNumber: true })}
                    />
                    {errors.duration?.seconds && (
                      <p className="text-red-500 text-xs mt-1">{errors.duration.seconds.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <label className="block text-sm font-medium">Number of questions</label>
                <Tooltip content="Set the total number of questions that will appear in the test." />
              </div>
              <FormSelect
                id="totalQuestions"
                label="" options={[]}   
                // register={register("totalQuestions")}
                // errorMsg={errors.totalQuestions?.message}
                // options={totalQuestions}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="block text-sm font-medium">Page layout</label>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <label>One question per page</label>
                  <Tooltip content="Determines how questions are displayed to students. 'All questions' shows all questions on a single page." />
                </div>
                <div className="px-3 py-2 rounded-sm w-full md:w-[180px] bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 opacity-70 cursor-not-allowed">
                  All questions
                </div>
                <input type="hidden" value="all" {...register("pageLayout")} />
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <label>Immediately after grading</label>
                  <Tooltip content="Controls what information is shown to students after they complete the test." />
                </div>
                <div className="px-3 py-2 rounded-sm w-full md:w-[180px] bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 opacity-70 cursor-not-allowed">
                  Score only
                </div>
                <input type="hidden" value="score-only" {...register("gradingDisplay")} />
              </div>
            </div>

            {/* <div className="space-y-2">
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
            </div> */}

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="block text-sm font-medium">Test instructions display settings</label>
                <Tooltip content="Configure how test instructions are displayed to students before they begin the test." />
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <input
                    type="checkbox"
                    id="require-instructions"
                    className="rounded border-gray-300"
                    {...register("displaySettings.requireInstructions")}
                  />
                  <label htmlFor="require-instructions">Require instructions acknowledgement</label>
                  <Tooltip content="Students must acknowledge they have read the instructions before starting the test." />
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
                  <Tooltip content="Display test instructions to students before they begin the test." />
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
                  <Tooltip content="Display the total time allowed for the test to students." />
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
            <p className="text-sm text-gray-400 mb-4">
              Write specific test-taking instructions for candidates to acknowledge in a pop-up dialog before starting
              the test. Instructions should be concise and easy to understand.
            </p>
            <div className="rounded-sm">
              <textarea
                id="test-instructions"
                className="w-full p-3 min-h-[150px] border bg-[#f5f5f5] dark:bg-transparent resize-y"
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
            <p className="text-sm text-gray-400 mb-4">
              Write a message that candidates will see after completing the test. Provide details about result
              availability or additional steps.
            </p>
            <div className="rounded-sm">
              <textarea
                id="completion-message"
                className="w-full p-3 min-h-[150px] border bg-[#f5f5f5] dark:bg-transparent resize-y"
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

