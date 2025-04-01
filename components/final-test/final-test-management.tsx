"use client"

import { type FC, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Modal, Box } from "@mui/material"
import { useGetAllCoursesQuery } from "@/store/course/course-api"
import BtnWithIcon from "@/components/btn-with-icon"
import BtnWithLoading from "@/components/btn-with-loading"
import CreateFinalTest from "./create-final-test"
import FinalTestCard from "../final-test-card"
import Selector from "../layout/selector"
import SearchBox from "../layout/search-box"

interface ICourse {
  _id: string
  name: string
  ratings: number
  purchased: number
  createdAt: string
}

interface ITest {
  id?: string
  name: string
  description: string
  course: string
  duration: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
  withSections: boolean
  createdAt: string
  questionsCount?: number
}

const FinalTestManagement: FC = () => {
  const {
    isLoading: isCoursesLoading,
    data: coursesData,
    refetch: refetchCourses,
  } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true })

  const [createTestModal, setCreateTestModal] = useState(false)
  const [editTestModal, setEditTestModal] = useState(false)
  const [deleteTestModal, setDeleteTestModal] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState("")
  const [selectedTestId, setSelectedTestId] = useState("")
  const [testsData, setTestsData] = useState<ITest[]>([])
  const [isLoadingTests, setIsLoadingTests] = useState(false)
  const [isDeletingTest, setIsDeletingTest] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock function to fetch tests - replace with actual API call
  const fetchTests = async (courseID: string) => {
    if (!courseID) return

    setIsLoadingTests(true)
    try {
      // Replace with actual API call
      // const result = await getTestsByCourse(courseID)
      const mockTests = [
        {
          id: "test1",
          name: "Midterm Examxzzzzzzzzzzzzzzzzzzzxzxsx",
          description: "Comprehensive midterm assessment covering all topics from weeks 1-5.",
          course: courseID,
          duration: { days: 0, hours: 1, minutes: 30, seconds: 0 },
          withSections: true,
          createdAt: new Date().toISOString(),
          questionsCount: 25,
        },
        {
          id: "test2",
          name: "Final Test",
          description: "End of course evaluation to test understanding of all course materials.",
          course: courseID,
          duration: { days: 0, hours: 2, minutes: 0, seconds: 0 },
          withSections: false,
          createdAt: new Date().toISOString(),
          questionsCount: 40,
        },
        {
          id: "test3",
          name: "Weekly Assessment #1",
          description: "Quick assessment of week 1 materials.",
          course: courseID,
          duration: { days: 0, hours: 0, minutes: 45, seconds: 0 },
          withSections: false,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          questionsCount: 15,
        },
      ]

      setTestsData(mockTests)
    } catch (error) {
      toast.error("Failed to fetch tests")
    } finally {
      setIsLoadingTests(false)
    }
  }

  useEffect(() => {
    if (selectedCourseId) {
      fetchTests(selectedCourseId)
    }
  }, [selectedCourseId])

  useEffect(() => {
    if (coursesData?.courses?.length > 0 && !selectedCourseId) {
      setSelectedCourseId(coursesData.courses[0]._id)
    }
  }, [coursesData, selectedCourseId])

  const handleCreateTest = () => {
    if (!selectedCourseId) {
      toast.error("Please select a course first")
      return
    }
    setCreateTestModal(true)
  }

  const handleEditTest = (testId: string) => {
    setSelectedTestId(testId)
    setEditTestModal(true)
  }

  const handleDeleteTestConfirm = async () => {
    if (!selectedTestId) return

    setIsDeletingTest(true)
    try {
      // Replace with actual API call
      // await deleteTestById(selectedTestId)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Test deleted successfully!")
      setDeleteTestModal(false)

      if (selectedCourseId) {
        fetchTests(selectedCourseId)
      }
    } catch (error) {
      toast.error("Failed to delete test")
    } finally {
      setIsDeletingTest(false)
    }
  }

  const handleDeleteTest = (testId: string) => {
    setSelectedTestId(testId)
    setDeleteTestModal(true)
  }

  const getSelectedCourseName = () => {
    if (!selectedCourseId || !coursesData?.courses) return "Select a course"
    const course = coursesData.courses.find((c: ICourse) => c._id === selectedCourseId)
    return course ? course.name : "Select a course"
  }

  const filteredTests = testsData.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="mt-8 w-full max-w-[1400px] px-4 mx-auto">
      {/* <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Test Management</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Create and manage Testzes for your courses</p>
      </div> */}

      {/* Course Selector and Controls */}
      <div className="mb-6 bg-[#475569] dark:bg-[#3E4396] rounded-sm border dark:border-gray-700 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          {/* Course Selector Component */}
          {coursesData?.courses && (
            <div className="w-full md:w-1/2">
              <Selector
                courses={coursesData.courses}
                selectedCourseId={selectedCourseId}
                onCourseChange={setSelectedCourseId}
                isLoading={isCoursesLoading}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-1/2">
            <div className="flex-grow">
              <SearchBox value={searchTerm} onChange={setSearchTerm} placeholder="Searching..." />
            </div>

            <div className="flex-shrink-0">
              <BtnWithIcon content="Create" onClick={handleCreateTest} customClasses="w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Final Test Cards */}
      {isLoadingTests ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredTests.length === 0 ? (
        <div className="rounded-sm dark:border-none dark:bg-slate-500 bg-[#F5F5F5] dark:bg-opacity-20 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-500 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-tertiary dark:text-dark_text">No final tests found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Create your first final test for this course"}
          </p>
          {!searchTerm && (
            <BtnWithIcon
              content="Create Final Test"
              onClick={handleCreateTest}
            />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredTests.map((test) => (
            <FinalTestCard
              key={test.id}
              id={test.id!}
              name={test.name}
              description={test.description}
              duration={test.duration}
              withSections={test.withSections}
              createdAt={test.createdAt}
              questionsCount={test.questionsCount}
              onEdit={handleEditTest}
              onDelete={handleDeleteTest}
            />
          ))}
        </div>
      )}

      {/* Create Test Modal */}
      <Modal
        open={createTestModal}
        onClose={() => setCreateTestModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          className="modal-content-wrapper bg-[#F5F5F5] dark:bg-slate-900 rounded-sm shadow-xl"
          sx={{
            maxWidth: 1200,
            width: "95%",
            maxHeight: "95vh",
            overflowY: "auto",
          }}
        >
          <div className="p-2">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Create Final Test for: {getSelectedCourseName()}
              </h4>
              <button onClick={() => setCreateTestModal(false)} className="text-gray-500 hover:text-red-600 hover:scale-110 transition-transform duration-200">
                ✕
              </button>
            </div>

            <CreateFinalTest />
          </div>
        </Box>
      </Modal>

      {/* Edit Test Modal */}
      <Modal
        open={editTestModal}
        onClose={() => setEditTestModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          className="modal-content-wrapper"
          sx={{
            maxWidth: 1200,
            width: "95%",
            maxHeight: "95vh",
            overflowY: "auto",
          }}
        >
          <div className="p-2">

            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Edit Final Test</h4>
            </div>

            <div className="text-center p-8">
              <p className="mb-4">Edit functionality to be implemented</p>
              <BtnWithIcon content="Close"
                onClick={() => setEditTestModal(false)} />
            </div>
          </div>
        </Box>
      </Modal>

      {/* Delete Test Confirmation Modal */}
      <Modal open={deleteTestModal} onClose={() => setDeleteTestModal(false)}>
        <Box className="modal-content-wrapper">
          <h4 className="form-title">Are you sure you want to delete this final test?</h4>
          <div className="mt-4 w-[70%] flex justify-between mx-auto pb-4">
            <BtnWithIcon content="Cancel"
              onClick={() => setDeleteTestModal(false)} />
            <BtnWithLoading
              content="Delete"
              isLoading={isDeletingTest}
              customClasses="!bg-red-700 !w-fit"
              type="button"
              onClick={handleDeleteTestConfirm}
            />
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default FinalTestManagement
