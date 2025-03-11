import { IconType } from "react-icons";
import { AiOutlineLogout } from "react-icons/ai";
import { GiBookmark, GiPadlock } from "react-icons/gi";
import { RiAccountBoxFill, RiAdminLine } from "react-icons/ri";
import { BiCalendarPlus } from "react-icons/bi";
import { UserX } from "lucide-react";

export const profileItemsData: {
  icon: IconType;
  title: string;
  isLogout?: boolean;
}[] = [
  {
    icon: GiPadlock,
    title: "Change Password",
  },
  {
    icon: GiBookmark,
    title: "Enrolled Courses",
  },
  {
    icon: BiCalendarPlus,
    title: "My Learning Progress",
  },
  {
    icon: RiAdminLine,
    title: "Admin Dashboard",
  },

  {
    icon: RiAccountBoxFill,
    title: "Instructor Dashboard",
  },

  {
    icon: AiOutlineLogout,
    title: "Log Out",
    isLogout: true,
  },
];
