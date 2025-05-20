"use client";

import AllUsers from "@/components/admin-pages/users-page/all-users";
import CourseUsers from "@/components/admin-pages/users-page/course-users";
import ProtectedPage from "@/components/protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const UsersPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <ProtectedPage>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">All Users</h2>
          <AllUsers />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Course Users</h2>
          <CourseUsers />
        </div>
      </div>
    </ProtectedPage>
  );
};

export default UsersPage;
