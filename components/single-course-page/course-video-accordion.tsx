"use client";

import { FC, useState, useEffect } from "react";
import {
  AccordionDetails,
  AccordionSummary,
  AccordionWrapper,
} from "../accordion-materials";
import { formatVideoLength } from "@/lib/format-data";
import { MdOutlineOndemandVideo, MdQuiz } from "react-icons/md";
import { ICourseData } from "@/types";
import { GiTrophy } from "react-icons/gi";

interface IVideosBySection {
  section: string;
  videos: ICourseData[];
}

export interface ITitleFinalTest {
  id?: string;
  title: string;
  description?: string;
  settings?: {
    testDuration?: {
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
    };
    numberOfQuestions?: number;
  };
}

interface Props {
  videosBySection: IVideosBySection[];
  countLectures: number;
  courseLength: number;
  finalTest?: ITitleFinalTest[];
}

const CourseVideosAccordion: FC<Props> = ({
  videosBySection,
  countLectures,
  courseLength,
  finalTest,


}): JSX.Element => {
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const hasFinalTest = finalTest && finalTest.length > 0;
  const testTitle = hasFinalTest && finalTest[0]?.title 
    ? finalTest[0].title 
    : "Final Assessment";
    
  const testDescription = hasFinalTest && finalTest[0]?.description 
    ? finalTest[0].description
    : "Comprehensive test covering all course materials";

  const duration = hasFinalTest && finalTest[0]?.settings?.testDuration
    ? (finalTest[0].settings.testDuration.minutes || 0) + 
      (finalTest[0].settings.testDuration.hours || 0) * 60 +
      (finalTest[0].settings.testDuration.days || 0) * 24 * 60
    : 60;

  const questionsCount = hasFinalTest && finalTest[0]?.settings?.numberOfQuestions
    ? finalTest[0].settings.numberOfQuestions
    : finalTest?.length || 0;

  return (
    <section className="mt-6 mb-14">
      <h2 className="font-bold text-xl mb-3">Course Content</h2>
      <div className="flex items-center gap-2 text-[15px] mb-2">
        <p>
          {videosBySection.length}{" "}
          <span className="text-slate-500">Sections</span>
        </p>
        •
        <p>
          {countLectures} <span className="text-slate-500">Lectures</span>
        </p>
        •
        <p>
          <span className="text-slate-500 max-[389px]:hidden">
            Total length :{" "}
          </span>
          {formatVideoLength(courseLength)}{" "}
        </p>
        {hasFinalTest && (
          <>
            •
            <p>
              <span className="text-[#0da5b5]">1 Final Test</span>
            </p>
          </>
        )}
      </div>
      <div className="custom-shadow">
        {videosBySection.map((section, index) => (
          <AccordionWrapper
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              aria-controls={`panel${{ index }}d-content`}
              id={`panel${{ index }}d-header`}
            >
              <div className="relative w-full">
                <div className="flex items-center justify-between max-[400px]:block">
                  <span className="font-semibold text-[17px]">
                    {section.section}
                  </span>
                  <p className="flex items-center gap-1 text-sm">
                    <span>{section.videos.length} Lectures</span>•
                    <span>
                      {formatVideoLength(
                        section.videos.reduce(
                          (acc, cur) => acc + cur.videoLength,
                          0
                        )
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {section.videos.map((video, videoIndex) => (
                <div
                  key={videoIndex}
                  className="flex items-center justify-between py-2"
                >
                  <span className="flex items-center gap-2">
                    <MdOutlineOndemandVideo className="-mt-[2px] truncate" />
                    {video.title}
                  </span>
                  <span className="text-sm">
                    {formatVideoLength(video.videoLength)}
                  </span>
                </div>
              ))}
            </AccordionDetails>
          </AccordionWrapper>
        ))}

        {/* Final Test Accordion */}
        {hasFinalTest && (
          <AccordionWrapper
            expanded={expanded === "panelFinalTest"}
            onChange={handleChange("panelFinalTest")}
            className="border-t"
          >
            <AccordionSummary
              aria-controls="panelFinalTestd-content"
              id="panelFinalTestd-header"
              className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20"
            >
              <div className="relative w-full">
                <div className="flex items-center justify-between max-[400px]:block">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[17px] text-gray-800 dark:text-gray-100">
                      Final Assessment
                    </span>

                  </div>
                  <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center">
                      <MdQuiz className="mr-1 text-[#0da5b5]" />
                      {questionsCount} Questions
                    </span>
                  </p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-slate-800 px-6 py-5">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start">
                      <div className="bg-[#0da5b5]/10 p-2 rounded-full mr-3">
                        <MdQuiz className="h-5 w-5 text-[#0da5b5]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Questions</p>
                        <p className="font-bold text-lg text-gray-800 dark:text-white">{questionsCount} sentences</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start">
                      <div className="bg-[#0da5b5]/10 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0da5b5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                        <p className="font-bold text-lg text-gray-800 dark:text-white">{duration} minutes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </AccordionWrapper>
        )}
      </div>
    </section>
  );
};

export default CourseVideosAccordion;