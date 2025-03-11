"use client";

import CreateCourseForm from "@/components/admin-pages/create-course-page/create-course-form";
import Heading from "@/components/heading";
import InstructorProtectedPage from "@/components/instructor-protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const CreateCoursePage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <InstructorProtectedPage>
      <Heading
        title="Create Courses"
     />
      <CreateCourseForm />
    </InstructorProtectedPage>
  );
};

export default CreateCoursePage;
