"use client";

import EditCourseForms from "@/components/instructor-page/edit-course-page/course-overview-forms";
import ProtectedPage from "@/components/protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const EditCoursePage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <ProtectedPage>
      <EditCourseForms />
    </ProtectedPage>
  );
};

export default EditCoursePage;
