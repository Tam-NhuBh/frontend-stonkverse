import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import CoursePlayer from "../course-player";
import CourseLectureList from "./course-lecture-list";
import CourseLectureNavigator from "./course-lecture-navigator";
import { BiSolidChevronsLeft } from "react-icons/bi";
import LectureTabContent from "./lecture-tab-content";
import { ICourseData, IQuestionQuiz } from "@/types";
import CourseQuiz from "../course-quiz";

interface Props {
  courseId: string;
  courseData: ICourseData[];
  activeVideo: number;
  setActiveVideo: React.Dispatch<React.SetStateAction<number>>;
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
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [iconHover, setIconHover] = useState(false);
  const [activeContentType, setActiveContentType] = useState("video");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeVideo]);

  const filteredQuestions = (courseData?.[activeVideo]?.quiz ?? [])
    .filter((question: IQuestionQuiz) => question.title !== undefined)
    .map((question: IQuestionQuiz) => ({
      id: question._id.toString(),
      title: question.title as string,
      mockAnswer: question.mockAnswer,
      correctAnswer: question.correctAnswer ?? [],
      maxScore: question.maxScore,
    }));

  const hasQuiz = filteredQuestions.length > 0;

  const handleVideoEnd = () => {
    if (hasQuiz) {
      setShowQuizModal(true);
    } else {
      handleNextLecture();
    }
  };

  const handleQuizClose = () => {
    setShowQuizModal(false);
    setQuizCompleted(true);
  };

  const handleNextLecture = () => {
    setActiveVideo((prevIndex) => Math.min(prevIndex + 1, courseData.length - 1));
    setQuizCompleted(false);
    setShowQuizModal(false);
  };

  const handlePrevLecture = () => {
    setActiveVideo((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleCloseQuizModal = () => {
    setShowQuizModal(false);
  };

  return (
    <div className="mt-[1px]">
      <div className={`${openSidebar ? "w-[75%]" : "w-full"} transition-width max-[1100px]:w-full`}>
        {activeContentType === "video" ? (
          <CoursePlayer
            title={courseData?.[activeVideo]?.title}
            videoUrl={courseData?.[activeVideo]?.videoUrl}
            onVideoEnd={handleVideoEnd}
          />
        ) : (
          <div className="p-4">
            <CourseQuiz
              courseId={courseId}
              contentId={courseData?.[activeVideo]?._id.toString()}
              questions={filteredQuestions}
              onClose={handleQuizClose}
            />
          </div>
        )}
      </div>
      <div className="container">
        <div className={`${openSidebar ? "w-[75%]" : "w-full"} transition-width max-[1100px]:w-full`}>
          <CourseLectureNavigator
            onlyNext={activeVideo === 0}
            onlyPrev={activeVideo === courseData.length - 1}
            backHandler={handlePrevLecture}
            nextHandler={handleNextLecture}
          />

          <h1 className="text-2xl font-semibold dark:text-dark_text mb-4">
            {courseData?.[activeVideo]?.title}
          </h1>

          <LectureTabContent
            courseId={courseId}
            refetch={refetch}
            courseData={courseData}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            setActiveContentType={setActiveContentType}
          />
        </div>
      </div>

      <div className={`w-[25%] fixed top-[62px] right-0 h-full z-50 bg-white dark:bg-slate-900 border-l dark:border-slate-700 transition ${openSidebar ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} max-[1100px]:hidden`}>
        <CourseLectureList
          courseData={courseData}
          setOpenSidebar={setOpenSidebar}
          setIconHover={setIconHover}
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
          setActiveContentType={setActiveContentType}
        />
      </div>

      {!openSidebar && (
        <div className="fixed right-0 top-[30%] bg-slate-900 z-[60] text-white cursor-pointer py-1.5 rounded-l-full pl-1 pr-2 flex items-center space-x-2 max-[1100px]:hidden" onClick={() => setOpenSidebar(true)} onMouseEnter={() => setIconHover(true)} onMouseLeave={() => setIconHover(false)}>
          <BiSolidChevronsLeft size={20} className={`${iconHover && "translate-x-2"} transition`} />
        </div>
      )}

      {showQuizModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg w-full max-w-2xl">
            <button className="absolute top-2 right-2" onClick={handleCloseQuizModal}>
              Close
            </button>
            <CourseQuiz
              courseId={courseId}
              contentId={courseData?.[activeVideo]?._id.toString()}
              questions={filteredQuestions}
              onClose={handleQuizClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
