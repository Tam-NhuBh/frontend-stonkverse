"use client"

import type React from "react"

import { type FC, useState, type ChangeEvent, type DragEvent } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import FormInput from "@/components/form-input"
import BottomNavigator from "@/components/admin-pages/create-course-page/bottom-navigator"
import { MdUpload } from "react-icons/md"
import ContainNextImage from "@/components/contain-next-image"
import { InfoIcon } from "lucide-react"
import type { TestInfoValues } from "./create-final-test"

interface Props {
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  testInfo: TestInfoValues
  setTestInfo: React.Dispatch<React.SetStateAction<TestInfoValues>>
}

// Define schema for form validation
const schema = Yup.object({
  name: Yup.string().required("Please enter test's name"),
  description: Yup.string().required("Please enter test's description"),
  logo: Yup.string(),
  withSections: Yup.boolean().default(false),
})

const FinalTestInfomation: FC<Props> = ({ active, setActive, testInfo, setTestInfo }): JSX.Element => {
  const [dragging, setDragging] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TestInfoValues>({
    defaultValues: testInfo,
    resolver: yupResolver(schema),
  })

  const logo = watch("logo")

  const onSubmit = (data: TestInfoValues) => {
    setTestInfo(data)
    setActive(active + 1)
  }

  const dragOverHandler = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDragging(true)
  }

  const dragLeaveHandler = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDragging(false)
  }

  const dropHandler = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.includes("image")) {
        const reader = new FileReader()
        reader.onload = () => {
          if (reader.readyState === 2) {
            setValue("logo", reader.result as string)
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          if (reader.readyState === 2) {
            setValue("logo", reader.result as string)
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <form className="w-full mx-auto mt-8 my-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <FormInput
          id="name"
          label="Name"
          register={register("name")}
          errorMsg={errors.name?.message}
          placeholder="Enter final test name"
        />

        <div className="space-y-2">
          <FormInput
            id="description"
            label="Description"
            register={register("description")}
            errorMsg={errors.description?.message}
            textarea
            rows={10}
            placeholder="Write something..."
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="test-with-sections"
            className="rounded border-gray-300"
            {...register("withSections")}
          />
          <label htmlFor="test-with-sections" className="text-sm">
            Test with sections
          </label>
          <InfoIcon className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-2">
          <label htmlFor="final-test-logo">Logo</label>
          <label
            htmlFor="logo"
            className={`w-full min-h-[350px] relative dark:border-white p-3 rounded-[5px] cursor-pointer border flex flex-col justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
          >
            {logo ? (
              <ContainNextImage src={logo} alt="Logo" className="py-3" />
            ) : (
              <span className="text-center">
                <MdUpload size={40} className="mx-auto mb-2" />
                Drag and drop your logo here or click to browse
              </span>
            )}
          </label>
          <input type="file" accept="image/*" id="logo" hidden onChange={fileChangeHandler} />
        </div>
      </div>

      <BottomNavigator onlyNext />
    </form>
  )
}

export default FinalTestInfomation

