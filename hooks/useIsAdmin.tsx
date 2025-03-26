import { useSelector } from "react-redux";

export default function useIsAdmin() {
  const { user } = useSelector((state: any) => state.auth);

  if (!user || !user.role) return undefined; // Tránh trả về false ngay lập tức
  return user.role === "ADMIN";
}