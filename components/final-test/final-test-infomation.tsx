"use client"

import { FC} from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import FormInput from "@/components/form-input"
import BottomNavigator from "@/components/admin-pages/create-course-page/bottom-navigator"
import type { TestInfoValues } from "./create-final-test"

interface Props {
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  testInfo: TestInfoValues
  setTestInfo: React.Dispatch<React.SetStateAction<TestInfoValues>>
}

const schema = Yup.object({
  name: Yup.string().required("Please enter test's name"),
  description: Yup.string().required("Please enter test's description"),
  logo: Yup.string(),
  withSections: Yup.boolean().default(false),
})

const FinalTestInfomation: FC<Props> = ({ active, setActive, testInfo, setTestInfo }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestInfoValues>({
    defaultValues: testInfo,
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: TestInfoValues) => {
    setTestInfo(data)
    setActive(active + 1)
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
      </div>

      <BottomNavigator onlyNext />
    </form>
  )
}

export default FinalTestInfomation

