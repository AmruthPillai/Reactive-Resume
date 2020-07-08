import { AiOutlineTwitter } from "react-icons/ai";
import { IoMdBriefcase, IoMdDocument } from "react-icons/io";
import { MdPerson, MdSchool } from "react-icons/md";
import Education from "../components/builder/sections/Education";
import Objective from "../components/builder/sections/Objective";
import Profile from "../components/builder/sections/Profile";
import Social from "../components/builder/sections/Social";
import Work from "../components/builder/sections/Work";
import { MODAL_EVENTS } from "../contexts/ModalContext";

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
    event: MODAL_EVENTS.SOCIAL_MODAL,
  },
  {
    id: "objective",
    name: "Objective",
    icon: IoMdDocument,
    component: Objective,
  },
  {
    id: "work",
    name: "Work Experience",
    icon: IoMdBriefcase,
    component: Work,
    event: MODAL_EVENTS.WORK_MODAL,
  },
  {
    id: "education",
    name: "Education",
    icon: MdSchool,
    component: Education,
    event: MODAL_EVENTS.EDUCATION_MODAL,
  },
];
