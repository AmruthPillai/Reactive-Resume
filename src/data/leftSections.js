import { AiFillSafetyCertificate, AiOutlineTwitter } from "react-icons/ai";
import { FaAward } from "react-icons/fa";
import { IoMdBriefcase, IoMdDocument } from "react-icons/io";
import { MdPerson, MdSchool } from "react-icons/md";
import Awards from "../components/builder/sections/Awards";
import Certifications from "../components/builder/sections/Certifications";
import Education from "../components/builder/sections/Education";
import Objective from "../components/builder/sections/Objective";
import Profile from "../components/builder/sections/Profile";
import Social from "../components/builder/sections/Social";
import Work from "../components/builder/sections/Work";
import ModalEvents from "../constants/ModalEvents";

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
    event: ModalEvents.SOCIAL_MODAL,
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
    event: ModalEvents.WORK_MODAL,
  },
  {
    id: "education",
    name: "Education",
    icon: MdSchool,
    component: Education,
    event: ModalEvents.EDUCATION_MODAL,
  },
  {
    id: "awards",
    name: "Awards",
    icon: FaAward,
    component: Awards,
    event: ModalEvents.AWARD_MODAL,
  },
  {
    id: "certifications",
    name: "Certifications",
    icon: AiFillSafetyCertificate,
    component: Certifications,
    event: ModalEvents.CERTIFICATION_MODAL,
  },
];
