"use client";

import InstructorHeader from "@/components/instructor-page/layout/instructor-header";
import InstructorSidebar from "@/components/instructor-page/layout/instructor-sidebar";
import BreadCrumbsComp from "@/components/layout/breadcrumbs";
import { FC, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const InstructorLayout: FC<Props> = ({ children }): JSX.Element | null => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className={`${!isCollapsed ? "w-[20%]" : "w-[5%]"}`}>
        <InstructorSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <InstructorHeader />
        <hr className=" w-30% center" ></hr>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default InstructorLayout;
