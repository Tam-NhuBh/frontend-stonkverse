"use client";

import DashboardHero from "@/components/admin-pages/dashboard-page/dashboard-hero";
import Heading from "@/components/heading";
import { NextPage } from "next";
import { useMount } from "@/hooks/useMount";
import InstructorProtectedPage from "@/components/instructor-protected-page";

interface Props {}

const InstructorPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <InstructorProtectedPage>
      <Heading
        title="Instructor Dashboard"
      />
      <DashboardHero isDashboard />
    </InstructorProtectedPage>
  );
};

export default InstructorPage;
