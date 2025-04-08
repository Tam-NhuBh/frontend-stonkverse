"use client"

import { useMount } from "@/hooks/useMount"
import type { NextPage } from "next"

import PendingCourses from "@/components/admin-pages/pending-courses"
import ProtectedPage from "@/components/protected-page"

type Props = {}

const AdminPanel: NextPage<Props> = () => {
  const hasMounted = useMount()

  if (!hasMounted) return null

  return (
    <ProtectedPage>
      <PendingCourses />
    </ProtectedPage>
  )
}

export default AdminPanel

