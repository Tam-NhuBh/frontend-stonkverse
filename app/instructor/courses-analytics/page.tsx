"use client";

import CoursesAnalytics from "@/components/admin-pages/courses-analytics-page/courses-analytics";
import InstructorProtectedPage from "@/components/instructor-protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const CourseAnalyticsPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;
  return (
    <InstructorProtectedPage title="Courses Analytics">
      <CoursesAnalytics />
    </InstructorProtectedPage>
  );
};

export default CourseAnalyticsPage;
