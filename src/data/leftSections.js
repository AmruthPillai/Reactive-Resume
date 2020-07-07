import { AiOutlineTwitter } from "react-icons/ai";
import { MdPerson } from "react-icons/md";
import Profile from "../components/builder/sections/Profile";
import Social from "../components/builder/sections/Social";

export default [
  {
    id: "profile",
    name: "Profile",
    icon: MdPerson,
    component: Profile,
  },
  {
    id: "social",
    name: "Social Network",
    icon: AiOutlineTwitter,
    component: Social,
  },
];
