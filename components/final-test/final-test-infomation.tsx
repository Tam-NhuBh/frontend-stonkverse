"use client"

import type React from "react"

import { type FC, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import FormInput from "@/components/form-input"
import BottomNavigator from "@/components/admin-pages/create-course-page/bottom-navigator"
import type { TestInfoValues } from "./create-final-test"
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai"
import BtnWithIcon from "@/components/btn-with-icon"
import toast from "react-hot-toast"

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
  questions: Yup.array().of(
    Yup.object({
      title: Yup.string().required("Question title is required"),
      type: Yup.string().required("Question type is required"),
      correctAnswer: Yup.array().of(Yup.string()),
      options: Yup.array().of(Yup.string()),
      imageUrl: Yup.string(),
    }),
  ),
})

type QuestionType = "single" | "multiple" | "fillBlank" | "image"

interface Question {
  title: string
  type: QuestionType
  correctAnswer: string[]
  options: string[]
  imageUrl?: string
}

const FinalTestInfomation: FC<Props> = ({ active, setActive, testInfo, setTestInfo }): JSX.Element => {
  const [questions, setQuestions] = useState<Question[]>(testInfo.questions || [])
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestInfoValues>({
    defaultValues: testInfo,
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: TestInfoValues) => {
    // Validate questions
    if (questions.length > 0) {
      const isValid = questions.every((question) => {
        if (question.title === "") {
          toast.error("Please fill all question titles")
          return false
        }

        if (question.type === "single" || question.type === "multiple") {
          if (question.options.length === 0) {
            toast.error("Please add options for multiple choice questions")
            return false
          }

          if (question.correctAnswer.length === 0) {
            toast.error("Please add at least one correct answer")
            return false
          }
        }

        if (question.type === "fillBlank" && question.correctAnswer.length === 0) {
          toast.error("Please add at least one correct answer for fill-in-the-blank questions")
          return false
        }

        return true
      })

      if (!isValid) return
    }

    // Update testInfo with questions
    const updatedData = {
      ...data,
      questions: questions,
    }

    setTestInfo(updatedData)
    setActive(active + 1)
  }

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: "",
        type: "single",
        correctAnswer: [],
        options: [],
      },
    ])
  }

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions.splice(index, 1)
    setQuestions(updatedQuestions)
  }

  const handleQuestionTitleChange = (index: number, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].title = value
    setQuestions(updatedQuestions)
  }

  const handleQuestionTypeChange = (index: number, value: QuestionType) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].type = value
    setQuestions(updatedQuestions)
  }

  const handleAddOption = (index: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].options.push("")
    setQuestions(updatedQuestions)
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options[optionIndex] = value
    setQuestions(updatedQuestions)
  }

  const handleAddCorrectAnswer = (index: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].correctAnswer.push("")
    setQuestions(updatedQuestions)
  }

  const handleCorrectAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].correctAnswer[answerIndex] = value
    setQuestions(updatedQuestions)
  }

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options.splice(optionIndex, 1)
    setQuestions(updatedQuestions)
  }

  const handleRemoveCorrectAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].correctAnswer.splice(answerIndex, 1)
    setQuestions(updatedQuestions)
  }

  const handleImageUpload = (questionIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview the image
    const fileReader = new FileReader()
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setPreviewUrl(fileReader.result as string)

        // In a real app, you would upload the image to your server/storage here
        // For now, we'll just store the preview URL
        const updatedQuestions = [...questions]
        updatedQuestions[questionIndex].imageUrl = fileReader.result as string
        setQuestions(updatedQuestions)
      }
    }
    fileReader.readAsDataURL(file)
    setSelectedImage(file)
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

      {/* Questions Section */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Test Questions</h2>

        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-8 p-4 border rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Question {questionIndex + 1}</h3>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(questionIndex)}
                className="text-red-500 hover:text-red-700"
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>

            <FormInput
              id={`question-title-${questionIndex}`}
              label="Question"
              value={question.title}
              onChange={(e) => handleQuestionTitleChange(questionIndex, e.target.value)}
              placeholder="Enter your question here..."
            />

            <div className="mt-4">
              <label className="form-input-label">Question Type</label>
              <select
                className="w-full p-2 border rounded-md mt-1"
                value={question.type}
                onChange={(e) => handleQuestionTypeChange(questionIndex, e.target.value as QuestionType)}
              >
                <option value="single">Single Choice</option>
                <option value="multiple">Multiple Choice</option>
                <option value="fillBlank">Fill in the Blank</option>
                <option value="image">Image Question</option>
              </select>
            </div>

            {/* Image upload for image questions */}
            {question.type === "image" && (
              <div className="mt-4">
                <label className="form-input-label">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(questionIndex, e)}
                  className="w-full p-2 border rounded-md mt-1"
                />
                {question.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={question.imageUrl || "/placeholder.svg"}
                      alt="Question"
                      className="max-h-40 object-contain"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Options for single/multiple choice questions */}
            {(question.type === "single" || question.type === "multiple") && (
              <div className="mt-4">
                <label className="form-input-label">Options</label>

                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      placeholder={`Option ${optionIndex + 1}`}
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </div>
                ))}

                <BtnWithIcon
                  customClasses="mt-2 text-dark_text !bg-slate-700 w-fit !rounded-sm"
                  onClick={() => handleAddOption(questionIndex)}
                  icon={AiOutlinePlusCircle}
                  content="Add Option"
                />
              </div>
            )}

            {/* Correct answers */}
            <div className="mt-4">
              <label className="form-input-label">
                {question.type === "multiple"
                  ? "Correct Answers"
                  : question.type === "fillBlank"
                    ? "Accepted Answers"
                    : "Correct Answer"}
              </label>

              {question.correctAnswer.map((answer, answerIndex) => (
                <div key={answerIndex} className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => handleCorrectAnswerChange(questionIndex, answerIndex, e.target.value)}
                    placeholder={`Answer ${answerIndex + 1}`}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCorrectAnswer(questionIndex, answerIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <AiOutlineDelete size={18} />
                  </button>
                </div>
              ))}

              <BtnWithIcon
                customClasses="mt-2 text-dark_text !bg-slate-700 w-fit !rounded-sm"
                onClick={() => handleAddCorrectAnswer(questionIndex)}
                icon={AiOutlinePlusCircle}
                content={question.type === "multiple" ? "Add Correct Answer" : "Add Accepted Answer"}
              />
            </div>
          </div>
        ))}

        <BtnWithIcon
          customClasses="mx-auto text-dark_text !bg-slate-700 w-fit !rounded-sm"
          onClick={handleAddQuestion}
          icon={AiOutlinePlusCircle}
          content="Add New Question"
        />
      </div>

      <BottomNavigator onlyNext />
    </form>
  )
}

export default FinalTestInfomation

