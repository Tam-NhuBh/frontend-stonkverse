"use client";

import InstructorProtectedPage from "@/components/instructor-protected-page";
import PromotionList from "@/components/promotion/promotion-list";
import PromotionPage from "@/components/promotion/promotion-list";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const Promotion: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <InstructorProtectedPage>
      <PromotionList />
    </InstructorProtectedPage>
  );
};

export default Promotion;
