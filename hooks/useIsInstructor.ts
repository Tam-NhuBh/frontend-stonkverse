import { useSelector } from "react-redux";

export default function useIsInstructor() {
  const { user } = useSelector((state: any) => state.auth);

  return user.role === "instructor";
}
