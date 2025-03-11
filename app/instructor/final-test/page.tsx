"use client";

import CreateFinalTest from "@/components/instructor-page/final-test/create-final-test";
import InstructorProtectedPage from "@/components/instructor-protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props { }

const UsersPage: NextPage<Props> = () => {
    const hasMounted = useMount();

    if (!hasMounted) return null;

    return (
        <InstructorProtectedPage>
            <CreateFinalTest />
        </InstructorProtectedPage>
    );
};

export default UsersPage;
