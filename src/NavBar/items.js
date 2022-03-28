import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { AiFillHome as Home } from "react-icons/ai";
import { GiHamburgerMenu as Hamburger } from "react-icons/gi";
import { HiUserGroup as Community } from "react-icons/hi";
import { MdPhoneInTalk as Call, MdSettings as Settings } from "react-icons/md";

export const NavBarItems = [
  {
    title: "Menu",
    url: '#',
    cName: "side-links-hamburger",
    fontClass: Hamburger,
  },
  // {
  //   title: "Home",
  //   url: '#',
  //   cName: "side-links-home",
  //   fontClass: Home,
  // },
  {
    title: "Communities",
    url: '/communities',
    cName: "side-links-communities",
    fontClass: Community,
  },
  {
    title: "Rooms",
    url: '/rooms',
    cName: "side-links-virtual-space",
    fontClass: Call,
  },
  // {
  //   title: "Settings",
  //   url: '#',
  //   cName: "side-links-settings",
  //   fontClass: Settings,
  // },
  {
    title: "Profile",
    url: '/profile',
    cName: "side-links-profile-page",
    fontClass: faUserCircle,
  },
];
