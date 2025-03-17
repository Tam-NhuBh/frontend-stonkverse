import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useIsAdmin from "@/hooks/useIsAdmin";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export default function AdminProtectedPage({ children, title }: Props) {
  const isAdmin = useIsAdmin();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isAdmin !== undefined) {
      setChecked(true);
      if (!isAdmin) {
        router.replace("/"); // Chuyển hướng nếu không phải admin
      }
    }
  }, [isAdmin]);

  if (!checked) return null; // Ngăn giao diện render trước khi kiểm tra quyền

  return <>{children}</>;
}
