"use client"

import { type FC, useEffect, useState } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"
import { AiOutlineWarning } from "react-icons/ai"
import type { JSX } from "react/jsx-runtime"

interface Props {
  id: string
  label: string
  register?: UseFormRegisterReturn<string>
  errorMsg?: string | undefined
  options: string[]
  defaultValue?: string
}

const FormSelect: FC<Props> = ({ id, label, register, errorMsg, options, defaultValue }): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<string>("")

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue)
    }
  }, [defaultValue])

  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-input-label">
        {label}
      </label>
      <select
        id={id}
        {...register}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        className="w-full outline-none border dark:border-slate-700 bg-[#f5f5f5] dark:bg-slate-900 rounded-sm py-[13px] px-4 capitalize"
      >
        <option value="">Choose one</option>
        {options?.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errorMsg && (
        <p className="text-xs text-red-700 mt-1 flex items-center gap-[2px]">
          <AiOutlineWarning />
          {errorMsg}
        </p>
      )}
    </div>
  )
}

export default FormSelect

