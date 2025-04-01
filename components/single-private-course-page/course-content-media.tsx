"use client"

import { type FC, useState, useEffect, type SetStateAction, type Dispatch } from "react"
import CoursePlayer from "../course-player"
import CourseQuiz from "../course-quiz"
import CourseLectureList from "./course-lecture-list"
import CourseLectureNavigator from "./course-lecture-navigator"
import { BiSolidChevronsLeft } from "react-icons/bi"
import LectureTabContent from "./lecture-tab-content"
import type { ICourseData, IQuestionQuiz } from "@/types"
import toast from "react-hot-toast"
import { getAnswersQuiz } from "@/lib/fetch-data"
import { AiOutlineReload, AiOutlinePlayCircle } from "react-icons/ai"
import { useUpdateLessonCompletionMutation, useGetLessonCompletionQuery } from "@/store/course/course-api"
import { IoMdClose } from "react-icons/io"
import { Flame, Recycle, Stars } from "lucide-react"
import { QuestionAnswer, QuestionAnswerOutlined, QuestionAnswerRounded, QuestionMark } from "@mui/icons-material"
import { BsQuestionCircleFill } from "react-icons/bs"

interface Props {
  courseId: string
  courseData: ICourseData[]
  activeVideo: number
  setActiveVideo: Dispatch<SetStateAction<number>>
  refetch: any
}

const CourseContentMedia: FC<Props> = ({ courseId, courseData, activeVideo, setActiveVideo, refetch }): JSX.Element => {
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState<boolean[]>(Array(courseData?.length).fill(false))
  const [openSidebar, setOpenSidebar] = useState(true)
  const [iconHover, setIconHover] = useState(false)
  const [activeContentType, setActiveContentType] = useState("video")
  const [currentVideoHasQuiz, setCurrentVideoHasQuiz] = useState(false)
  const [nextVideoTriggered, setNextVideoTriggered] = useState(false)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [currentQuizId, setCurrentQuizId] = useState<string>("")
  const [completedVideos, setCompletedVideos] = useState<string[]>([])
  const [updateLessonCompletion] = useUpdateLessonCompletionMutation()
  const { data: lessonCompletionData } = useGetLessonCompletionQuery(courseId)

  const filteredQuestions = (courseData?.[activeVideo]?.quiz ?? [])
    .filter((question: IQuestionQuiz) => question.title !== undefined)
    .map((question: IQuestionQuiz) => ({
      id: question._id.toString(),
      title: question.title as string,
      mockAnswer: question.mockAnswer,
      correctAnswer: question.correctAnswer ?? [],
      maxScore: question.maxScore,
    }))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeVideo])

  useEffect(() => {
    if (lessonCompletionData?.learningProgress?.progress) {
      setCompletedVideos(lessonCompletionData?.learningProgress?.progress)
    }
  }, [lessonCompletionData])

  useEffect(() => {
    setCurrentVideoHasQuiz(courseData?.[activeVideo]?.quiz?.length > 0)
  }, [activeVideo, courseData])

  useEffect(() => {
    const fetchQuizCompletionStatus = async () => {
      try {
        if (!courseData || !courseData?.[activeVideo]) return
        const answers = await getAnswersQuiz(courseData?.[activeVideo]?._id.toString())
        if (answers && answers.answers && answers.answers[courseData?.[activeVideo]?._id.toString()]) {
          setQuizCompleted((prevCompleted) => {
            const newCompleted = [...prevCompleted]
            newCompleted[activeVideo] = true
            return newCompleted
          })
        }
      } catch (error) {
        console.error("Error fetching quiz answers:", error)
        toast.error("An error occurred while fetching quiz answers.")
      }
    }

    fetchQuizCompletionStatus()
  }, [activeVideo, courseData])

  const handleVideoClick = (videoIndex: number | ((prevIndex: number) => number)) => {
    if (typeof videoIndex === "number") {
      const allPreviousQuizzesCompleted = courseData.slice(0, videoIndex).every((video, index) => {
        return !video.quiz?.length || quizCompleted[index]
      })

      if (allPreviousQuizzesCompleted) {
        setActiveVideo(videoIndex)
      } else {
        toast.error("Please complete the current quiz before moving to another video.")
      }
    } else {
      setActiveVideo(videoIndex)
    }
  }

  const handleTakeQuiz = () => {
    const quizId = courseData?.[activeVideo]?.quiz[0]?._id.toString()
    if (quizId) {
      setCurrentQuizId(quizId)
      setShowQuizModal(true)
    }
  }

  const handleRetakeQuiz = () => {
    const quizId = courseData?.[activeVideo]?.quiz[0]?._id.toString()
    if (quizId) {
      setCurrentQuizId(quizId)
      setShowQuizModal(true)
    }
  }

  const handleNextVideo = async () => {
    if (currentVideoHasQuiz && !quizCompleted[activeVideo]) {
      const quizId = courseData?.[activeVideo]?.quiz[0]?._id.toString()
      if (quizId) {
        setCurrentQuizId(quizId)
        setShowQuizModal(true)
        setNextVideoTriggered(true)
      }
    } else {
      try {
        await updateLessonCompletion({ courseId, courseDataId: courseData?.[activeVideo]?._id.toString() })
        setCompletedVideos((prev) => [...prev, courseData?.[activeVideo]?._id.toString()])
        setActiveVideo((prevIndex) => Math.min(prevIndex + 1, courseData?.length - 1))
      } catch (error) {
        toast.error("An error occurred while updating lesson completion.")
      }
    }
  }

  const handleBackVideo = () => {
    if (activeVideo > 0) {
      setActiveVideo((prevIndex) => Math.max(prevIndex - 1, 0))
    }
  }

  const handleQuizSubmit = async () => {
    try {
      await updateLessonCompletion({ courseId, courseDataId: courseData?.[activeVideo]?._id.toString() })
      setQuizCompleted((prevCompleted) => {
        const updatedCompleted = [...prevCompleted]
        updatedCompleted[activeVideo] = true
        return updatedCompleted
      })
      setQuizSubmitted(true)
      // Don't close the modal here - it will be closed by the user
      setCompletedVideos((prev) => [...prev, courseData?.[activeVideo]?._id.toString()])
      if (nextVideoTriggered) {
        // Wait for user to close the modal before moving to next video
        setNextVideoTriggered(false)
      }
    } catch (error) {
      toast.error("An error occurred while updating quiz completion.")
    }
  }

  const handleCloseQuizModal = () => {
    setShowQuizModal(false)
    // If next video was triggered, move to next video after closing the modal
    if (nextVideoTriggered) {
      setActiveVideo((prevIndex) => Math.min(prevIndex + 1, courseData.length - 1))
      setNextVideoTriggered(false)
    }
  }

  return (
    <div className="mt-[1px]">
      <>
        <div className={`${openSidebar ? "w-[75%]" : "w-full"} transition-width max-[1100px]:w-full`}>
          {activeContentType === "video" && (
            <CoursePlayer title={courseData?.[activeVideo]?.title} videoUrl={courseData?.[activeVideo]?.videoUrl} />
          )}
        </div>
        <div className="container">
          <div className={`${openSidebar ? "w-[75%]" : "w-full"} transition-width max-[1100px]:w-full`}>
            <CourseLectureNavigator
              onlyNext={activeVideo === 0}
              onlyPrev={activeVideo === courseData?.length - 1}
              backHandler={handleBackVideo}
              nextHandler={handleNextVideo}
            />

            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold dark:text-dark_text mb-0">{courseData?.[activeVideo]?.title}</h1>
              {currentVideoHasQuiz && (
                <>
                  {quizCompleted[activeVideo] ? (
                    <div className="relative group">
                      <button
                        onClick={handleRetakeQuiz}
                        className="relative overflow-hidden px-6 py-2 rounded-full bg-gradient-to-br from-orange-600 to-yellow-500 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:scale-105"
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <span className="relative flex items-center gap-2">
                          <Flame
                            size={20}
                            className="text-yellow-300"
                            strokeWidth={2.5}
                          />
                          <span>Retake Quiz</span>
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={handleTakeQuiz}
                        className="relative overflow-hidden px-6 py-2 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105"
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <span className="relative flex items-center gap-2">
                          <BsQuestionCircleFill
                            size={20}                 
                          />
                          <span>Take Quiz</span>
                        </span>
                      </button>
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-teal-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>

                  )}
                </>
              )}
            </div>

            <LectureTabContent
              courseId={courseId}
              refetch={refetch}
              courseData={courseData}
              activeVideo={activeVideo}
              setActiveVideo={handleVideoClick}
              setActiveContentType={setActiveContentType}
              quizCompleted={quizCompleted}
              completedVideos={completedVideos}
              setCompletedVideos={setCompletedVideos}
            />
          </div>
        </div>
      </>


      {showQuizModal && currentVideoHasQuiz && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[9998] px-2">
          <div className="relative bg-white dark:bg-slate-900 p-1 rounded-lg w-full max-w-2xl pt-12 sm:pt-8">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-500 p-2 hover:text-red-600 dark:hover:text-red-600 hover:scale-110 duration-200 transition-transform z-10"
              onClick={handleCloseQuizModal}
            >
              <IoMdClose size={24} />
            </button>

            {/* CourseQuiz Component */}
            <div className="overflow-y-auto max-h-[calc(100vh-4rem)] px-2">
              <CourseQuiz
                courseId={courseId}
                contentId={courseData?.[activeVideo]?._id.toString()}
                questions={filteredQuestions}
                onClose={handleCloseQuizModal}
                onQuizSubmit={handleQuizSubmit}
                quizId={currentQuizId}
              />
            </div>
          </div>
        </div>

      )}

      <div
        className={`w-[25%] fixed top-[62px] right-0 h-full z-50 bg-white dark:bg-slate-900 border-l dark:border-slate-700 transition ${openSidebar ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} max-[1100px]:hidden`}
      >
        <CourseLectureList
          courseData={courseData}
          setOpenSidebar={setOpenSidebar}
          setIconHover={setIconHover}
          activeVideo={activeVideo}
          setActiveVideo={handleVideoClick}
          setActiveContentType={setActiveContentType}
          quizCompleted={quizCompleted}
          completedVideos={completedVideos}
          courseId={courseId}
          setCompletedVideos={setCompletedVideos}
        />
      </div>


      {!openSidebar && (
        <div
          className="fixed right-0 top-[30%] bg-slate-900 z-[60] text-white cursor-pointer py-1.5 rounded-l-full pl-1 pr-2 flex items-center space-x-2 max-[1100px]:hidden"
          onClick={() => setOpenSidebar(true)}
          onMouseEnter={() => setIconHover(true)}
          onMouseLeave={() => setIconHover(false)}
        >
          <BiSolidChevronsLeft size={20} className={`${iconHover && "translate-x-2"} transition`} />
        </div>
      )}
    </div>
  )
}

export default CourseContentMedia

