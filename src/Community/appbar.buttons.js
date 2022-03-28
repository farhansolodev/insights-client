import { MdExitToApp as Exit } from "react-icons/md";
import { AiOutlinePlus as Create } from "react-icons/ai";

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
};