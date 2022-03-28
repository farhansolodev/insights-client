import { MdExitToApp as Exit } from "react-icons/md";
import { AiOutlinePlus as Create } from "react-icons/ai";
import { GrUserAdmin as Admin } from "react-icons/gr";

export const AppBarButtons = {
    join: {
      text: "Join community",
      value: "join-community",
      icon: Create,
    },
    leave: {
      text: "Leave community",
      value: "leave-community",
      icon: Exit,
    },
    admin: {
      text: "Admin dashboard",
      value: "admin-dashboard",
      icon: Admin,
    },
};