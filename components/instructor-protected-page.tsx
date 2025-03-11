import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import Heading from "./heading";
import useIsInstructor from "@/hooks/useIsInstructor";

interface Props {
  children: ReactNode;
  title?: string;
}

const InstructorProtectedPage: FC<Props> = ({ children, title }) => {
  const isInstructor = useIsInstructor();

  return isInstructor ? (
    <>
      <Heading title={title} />
      {children}
    </>
  ) : (
    redirect("/")
  );
};

export default InstructorProtectedPage;
