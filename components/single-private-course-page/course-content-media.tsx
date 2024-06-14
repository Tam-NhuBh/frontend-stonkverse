import React, { FC, useState, useEffect, SetStateAction, Dispatch } from "react";
import CoursePlayer from "../course-player";
import CourseQuiz from "../course-quiz";
import CourseLectureList from "./course-lecture-list";
import CourseLectureNavigator from "./course-lecture-navigator";
import { BiSolidChevronsLeft } from "react-icons/bi";
import LectureTabContent from "./lecture-tab-content";
import { ICourseData, IQuestionQuiz } from "@/types";
import toast from "react-hot-toast";
interface Props {
  courseId: string;
  courseData: ICourseData[];
  activeVideo: number;
  setActiveVideo: Dispatch<SetStateAction<number>>;
  refetch: any;
}

const CourseContentMedia: FC<Props> = ({
  courseId,
  courseData,
  activeVideo,
  setActiveVideo,
  refetch,
}): JSX.Element => {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean[]>(Array(courseData.length).fill(false));
  const [openSidebar, setOpenSidebar] = useState(true);
  const [iconHover, setIconHover] = useState(false);
  const [activeContentType, setActiveContentType] = useState("video");
  const [currentVideoHasQuiz, setCurrentVideoHasQuiz] = useState(false);
  const [nextVideoTriggered, setNextVideoTriggered] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeVideo]);

  useEffect(() => {
    setCurrentVideoHasQuiz(courseData[activeVideo]?.quiz?.length > 0);
  }, [activeVideo, courseData]);



  const filteredQuestions = (courseData?.[activeVideo]?.quiz ?? [])
    .filter((question: IQuestionQuiz) => question.title !== undefined)
    .map((question: IQuestionQuiz) => ({
      id: question._id.toString(),
      title: question.title as string,
      mockAnswer: question.mockAnswer,
      correctAnswer: question.correctAnswer ?? [],
      maxScore: question.maxScore,
    }));

  const handleCloseQuizModal = () => {
    setShowQuizModal(false);
  };

  const handleNextVideo = () => {
    if (currentVideoHasQuiz && !quizCompleted[activeVideo]) {
      setShowQuizModal(true);
      setNextVideoTriggered(true);
    } else {
      setActiveVideo((prevIndex) => Math.min(prevIndex + 1, courseData.length - 1));
    }
  };

  const handleBackVideo = () => {
    if (activeVideo > 0) {
      setActiveVideo((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleQuizSubmit = () => {
    setQuizCompleted((prevCompleted) => {
      const updatedCompleted = [...prevCompleted];
      updatedCompleted[activeVideo] = true;
      return updatedCompleted;
    });
    setQuizSubmitted(true);
    setShowQuizModal(false);
    if (nextVideoTriggered) {
      setActiveVideo((prevIndex) => Math.min(prevIndex + 1, courseData.length - 1));
      setNextVideoTriggered(false);
    }
  };

  const handleVideoClick = (videoIndex: number | ((prevIndex: number) => number)) => {
    if (typeof videoIndex === 'number') {
      if (quizCompleted[videoIndex] || videoIndex === activeVideo) {
        setActiveVideo(videoIndex);
      } else {
        toast.error("Please complete the current quiz before moving to another video.");
      }
    } else {
      setActiveVideo(videoIndex);
    }
  };



  return (
    <div className="mt-[1px]">
      {!showQuizModal && (
        <>
          <div className={`${openSidebar ? "w-[75%]" : "w-full"} transition-width max-[1100px]:w-full`}>
            {activeContentType === "video" && (
              <CoursePlayer
                title={courseData?.[activeVideo]?.title}
                videoUrl={courseData?.[activeVideo]?.videoUrl}
              />
            )}
          </div>
          <div className="container">
            <div className={`${openSidebar ? "w-[75%]" : "w-full"} transition-width max-[1100px]:w-full`}>
              <CourseLectureNavigator
                onlyNext={activeVideo === 0}
                onlyPrev={activeVideo === courseData.length - 1}
                backHandler={handleBackVideo}
                nextHandler={handleNextVideo}
              />

              <h1 className="text-2xl font-semibold dark:text-dark_text mb-4">
                {courseData?.[activeVideo]?.title}
              </h1>

              <LectureTabContent
                courseId={courseId}
                refetch={refetch}
                courseData={courseData}
                activeVideo={activeVideo}
                setActiveVideo={handleVideoClick}
                setActiveContentType={setActiveContentType}
              />
            </div>
            
          </div>
          
        </>
      )}

      {showQuizModal && currentVideoHasQuiz && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-1 rounded-lg w-full max-w-2xl">
            <button className="absolute top-2 right-2" onClick={handleCloseQuizModal}>
              Close
            </button>
            <CourseQuiz
              courseId={courseId}
              contentId={courseData?.[activeVideo]?._id.toString()}
              questions={filteredQuestions}
              onClose={handleCloseQuizModal}
              onQuizSubmit={handleQuizSubmit}
            />
          </div>
        </div>
      )}

      {!showQuizModal && !showConfirmationModal && (
        <div className={`w-[25%] fixed top-[62px] right-0 h-full z-50 bg-white dark:bg-slate-900 border-l dark:border-slate-700 transition ${openSidebar ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} max-[1100px]:hidden`}>
          <CourseLectureList
            courseData={courseData}
            setOpenSidebar={setOpenSidebar}
            setIconHover={setIconHover}
            activeVideo={activeVideo}
            setActiveVideo={handleVideoClick}
            setActiveContentType={setActiveContentType}
          />
        </div>
      )}

      {!openSidebar && !showQuizModal && !showConfirmationModal && (
        <div className="fixed right-0 top-[30%] bg-slate-900 z-[60] text-white cursor-pointer py-1.5 rounded-l-full pl-1 pr-2 flex items-center space-x-2 max-[1100px]:hidden"
          onClick={() => setOpenSidebar(true)}
          onMouseEnter={() => setIconHover(true)}
          onMouseLeave={() => setIconHover(false)}
        >
          <BiSolidChevronsLeft size={20} className={`${iconHover && "translate-x-2"} transition`} />
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
