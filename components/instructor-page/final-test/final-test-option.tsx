"use client"

import type React from "react"

import type { FC } from "react"

interface Props {
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
}

const TestOptions: FC<Props> = ({ active, setActive }): JSX.Element => {
  const options = [
    {
      title: "Test Information",
    },
    {
      title: "Test Settings",
    },
    {
      title: "Test Overview",
    },
  ]

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-md shadow-sm p-4">
      <h5 className="text-lg font-bold text-black dark:text-white">Test Creation Steps</h5>
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-800 my-2"></div>
      {options.map((option, index) => (
        <div
          key={index}
          className={`w-full flex items-center py-3 ${
            active === index ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
          }`}
          onClick={() => setActive(index)}
          style={{ cursor: "pointer" }}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              active === index
                ? "bg-blue-600 dark:bg-blue-400 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            } mr-2`}
          >
            {index + 1}
          </div>
          <h5
            className={`text-lg ${
              active === index ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {option.title}
          </h5>
        </div>
      ))}
    </div>
  )
}

export default TestOptions

