"use client";

import AdminProtectedPage from "@/components/admin-protected-page";
import PromotionList from "@/components/promotion/promotion-list";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const Promotion: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <AdminProtectedPage>
      <PromotionList />
    </AdminProtectedPage>
  );
};

export default Promotion;
