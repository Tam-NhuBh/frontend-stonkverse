"use client";

import InstructorHeader from "@/components/instructor-page/layout/instructor-header";
import InstructorSidebar from "@/components/instructor-page/layout/instructor-sidebar";
import NoContentYet from "@/components/no-content-yet";
import useIsInstructor from "@/hooks/useIsInstructor";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

const InstructorLayout: FC<Props> = ({ children }): JSX.Element | null => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isInstructor = useIsInstructor();
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    if (isInstructor !== undefined) {
      if (!isInstructor) {
        router.replace("/"); 
      }
      setLoading(false); 
    }
  }, [isInstructor]);

  if (loading) return <NoContentYet description="" />  ; 
  return (
    <div className="flex min-h-screen">
    <div className={`${!isCollapsed ? "w-[20%]" : "w-[5%]"}`}>
      <InstructorSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    </div>

    <div className="flex-1 flex flex-col">
      <InstructorHeader />
      <hr className=" w-30% center"></hr>
      <div className="flex-1">{children}</div>
    </div>
  </div>
  );
};

export default InstructorLayout;

