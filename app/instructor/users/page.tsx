"use client";

import AllUsers from "@/components/instructor-page/users-page/all-users";
import InstructorProtectedPage from "@/components/instructor-protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const UsersPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <InstructorProtectedPage>
      <AllUsers />
    </InstructorProtectedPage>
  );
};

export default UsersPage;
