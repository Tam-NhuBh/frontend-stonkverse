"use client";

import React, { FC, Dispatch, SetStateAction } from "react";
import { AccordionWrapper } from "../accordion-materials";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import { formatVideoLength } from "@/lib/format-data";
import { MdOutlineOndemandVideo, MdQuiz, MdCheckCircle } from "react-icons/md";
import { BiSolidChevronDown } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { GiTrophy } from "react-icons/gi";
import { ICourseData } from "@/types";
import toast from "react-hot-toast";

interface Props {
  courseId: string;
  courseData: ICourseData[];
  finalTest?: any[]; // Thêm prop finalTest
  setOpenSidebar?: Dispatch<SetStateAction<boolean>>;
  setIconHover?: Dispatch<SetStateAction<boolean>>;
  activeVideo: number;
  setActiveVideo: Dispatch<SetStateAction<number>>;
  setActiveContentType: Dispatch<SetStateAction<string>>;
  quizCompleted: boolean[];
  completedVideos: string[];
  setCompletedVideos: Dispatch<SetStateAction<string[]>>;
}

const CourseLectureList: FC<Props> = ({
  courseId,
  courseData,
  finalTest,
  setOpenSidebar,
  setIconHover,
  activeVideo,
  setActiveVideo,
  setActiveContentType,
  quizCompleted,
  completedVideos,
  setCompletedVideos,
}): JSX.Element => {
  const rawSections = new Set<string>(
    courseData?.map((item) => item.videoSection)
  );

  const hasOrderCourseData = courseData?.map((course, index) => ({
    ...course,
    order: index,
  }));

  const uniqueSections: string[] = [...rawSections];

  const videosBySection = uniqueSections?.map((section) => ({
    section,
    videos: hasOrderCourseData.filter(
      (video) => video.videoSection === section
    ),
  }));

  const handleVideoClick = (videoIndex: number) => {
    const allPreviousQuizzesCompleted = courseData.slice(0, videoIndex).every((video, index) => {
      return !video.quiz?.length || quizCompleted[index];
    });

    if (allPreviousQuizzesCompleted) {
      setActiveVideo(videoIndex);
      setActiveContentType("video");
    } else {
      toast.error("Please complete the current quiz before moving to another video.");
    }
  };

  // Kiểm tra xem người dùng đã hoàn thành tất cả video và quiz chưa
  const allContentCompleted = completedVideos.length === courseData?.length && 
                             courseData?.every((video, index) => !video.quiz?.length || quizCompleted[index]);
  
  // Xử lý khi click vào Final Test
  const handleFinalTestClick = () => {
    if (allContentCompleted) {
      setActiveContentType("finalTest");
    } else {
      toast.error("Please complete all videos and quizzes before taking the final test");
    }
  };

  // Kiểm tra xem có finalTest không và chuẩn bị dữ liệu
  const hasFinalTest = finalTest && finalTest.length > 0;
  
  // Lấy thông tin từ finalTest nếu có
  const finalTestTitle = hasFinalTest ? (finalTest[0]?.title || "Final Assessment") : "";
  const finalTestDescription = hasFinalTest ? (finalTest[0]?.description || "Test your knowledge with this comprehensive final assessment") : "";
  
  // Lấy thông tin về số lượng câu hỏi và thời gian làm bài
  const questionCount = hasFinalTest ? finalTest.length : 0;
  const duration = hasFinalTest && finalTest[0]?.settings?.testDuration 
    ? (finalTest[0].settings.testDuration.minutes || 0) + 
      (finalTest[0].settings.testDuration.hours || 0) * 60 +
      (finalTest[0].settings.testDuration.days || 0) * 24 * 60
    : 30; // Mặc định 30 phút

  return (
    <div className="overflow-y-scroll max-h-[calc(100%-62px)] no-scrollbar">
      <div className="flex items-center justify-between max-[1100px]:hidden">
        <h2 className="font-bold text-xl p-4 pb-2">Course Content</h2>
        <IoClose
          size={25}
          className="cursor-pointer mr-[13px] mt-1"
          onClick={() => {
            setOpenSidebar && setOpenSidebar(false);
            setIconHover && setIconHover(false);
          }}
        />
      </div>
      <div className="lecture-list-accordion">
        {videosBySection.map((section, index) => (
          <AccordionWrapper
            key={index}
            aria-controls={`panel${index + 1}a-content`}
            id={`panel${index + 1}a-header`}
          >
            <AccordionSummary
              expandIcon={<BiSolidChevronDown className="mt-1" />}
              aria-controls={`panel${index + 1}d-content`}
              id={`panel${index + 1}d-header`}
            >
              <div className="relative w-full h-full">
                <div className="flex items-start justify-between">
                  <span className="font-semibold">
                    Section {index + 1} : {section.section}
                  </span>
                </div>
                <span className="text-xs text-tertiary dark:text-dark_text">
                  {section.videos.length} Lectures | {formatVideoLength(
                    section.videos.reduce((acc, cur) => acc + cur.videoLength, 0)
                  )}
                </span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {section.videos.map((video, videoIndex: number) => (
                <div key={videoIndex}>
                  <div
                    className={`cursor-pointer py-2 px-4 hover:bg-slate-200 dark:hover:bg-slate-900 transition flex items-center justify-between gap-2 ${video.order === activeVideo
                      ? "bg-slate-200 dark:bg-slate-900"
                      : "bg-white dark:bg-slate-600"
                      }`}
                    onClick={() => handleVideoClick(video.order)}
                  >
                    <div>
                      <p className="flex items-center">
                        <span className="font-semibold">{video?.title}</span>
                      </p>
                      <span className="text-xs flex items-center gap-1 mt-2">
                        {completedVideos?.includes(video._id.toString()) ? (
                          <MdCheckCircle className="-mt-[2px] text-green-500" />
                        ) : (
                          <MdOutlineOndemandVideo className="-mt-[2px]" />
                        )}
                        {formatVideoLength(video.videoLength)}
                      </span>
                    </div>
                    {video.quiz && video.quiz.length > 0 && (
                      <div className="flex items-center gap-1">
                        <MdQuiz className={`text-blue-500`} />
                        <span className="text-xs text-blue-500">
                          {video.quiz.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </AccordionDetails>
          </AccordionWrapper>
        ))}

        {/* Final Test Accordion */}
        {hasFinalTest && (
          <AccordionWrapper
            aria-controls="panel-final-test-content"
            id="panel-final-test-header"
            className="mt-2 border-t border-gray-200 dark:border-gray-700"
          >
            <AccordionSummary
              expandIcon={<BiSolidChevronDown className="mt-1" />}
              aria-controls="panel-final-test-content"
              id="panel-final-test-header"
              className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20"
            >
              <div className="relative w-full h-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <GiTrophy className="text-[#0da5b5] text-xl" />
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      Final Assessment
                    </span>
                  </div>
                </div>
                <span className="text-xs text-tertiary dark:text-dark_text flex items-center gap-1">
                  <MdQuiz className="text-[#0da5b5]" />
                  {questionCount} Questions • {duration} minutes
                </span>
              </div>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-slate-800">
              <div
                className={`cursor-pointer py-4 px-4 rounded-lg transition
                  ${allContentCompleted 
                    ? "bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/10 dark:to-teal-900/10 hover:from-blue-100 hover:to-teal-100" 
                    : "bg-gray-100 dark:bg-gray-700 opacity-75 cursor-not-allowed"
                  }`}
                onClick={handleFinalTestClick}
              >
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{finalTestTitle}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{finalTestDescription}</p>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs bg-[#0da5b5]/10 text-[#0da5b5] py-1 px-2 rounded-full">
                      {duration} minutes
                    </span>
                    
                    {allContentCompleted ? (
                      <span className="text-xs bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 py-1 px-2 rounded-full">
                        Ready to take
                      </span>
                    ) : (
                      <span className="text-xs bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 py-1 px-2 rounded-full">
                        Complete all content first
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </AccordionWrapper>
        )}
      </div>
    </div>
  );
};

export default CourseLectureList;