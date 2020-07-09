import { AiFillSafetyCertificate, AiOutlineTwitter } from 'react-icons/ai';
import { BsTools } from 'react-icons/bs';
import { FaAward, FaUserFriends } from 'react-icons/fa';
import {
  IoLogoGameControllerB,
  IoMdBriefcase,
  IoMdDocument,
} from 'react-icons/io';
import { MdPerson, MdSchool, MdTranslate } from 'react-icons/md';
import Awards from '../components/builder/sections/Awards';
import Certifications from '../components/builder/sections/Certifications';
import Education from '../components/builder/sections/Education';
import Hobbies from '../components/builder/sections/Hobbies';
import Languages from '../components/builder/sections/Languages';
import Objective from '../components/builder/sections/Objective';
import Profile from '../components/builder/sections/Profile';
import References from '../components/builder/sections/References';
import Skills from '../components/builder/sections/Skills';
import Social from '../components/builder/sections/Social';
import Work from '../components/builder/sections/Work';
import ModalEvents from '../constants/ModalEvents';

export default [
  {
    id: 'profile',
    name: 'Profile',
    icon: MdPerson,
    component: Profile,
  },
  {
    id: 'social',
    name: 'Social Network',
    icon: AiOutlineTwitter,
    component: Social,
    event: ModalEvents.SOCIAL_MODAL,
  },
  {
    id: 'objective',
    name: 'Objective',
    icon: IoMdDocument,
    component: Objective,
  },
  {
    id: 'work',
    name: 'Work Experience',
    icon: IoMdBriefcase,
    component: Work,
    event: ModalEvents.WORK_MODAL,
  },
  {
    id: 'education',
    name: 'Education',
    icon: MdSchool,
    component: Education,
    event: ModalEvents.EDUCATION_MODAL,
  },
  {
    id: 'awards',
    name: 'Awards',
    icon: FaAward,
    component: Awards,
    event: ModalEvents.AWARD_MODAL,
  },
  {
    id: 'certifications',
    name: 'Certifications',
    icon: AiFillSafetyCertificate,
    component: Certifications,
    event: ModalEvents.CERTIFICATION_MODAL,
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: BsTools,
    component: Skills,
    event: ModalEvents.SKILL_MODAL,
  },
  {
    id: 'hobbies',
    name: 'Hobbies',
    icon: IoLogoGameControllerB,
    component: Hobbies,
    event: ModalEvents.HOBBY_MODAL,
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: MdTranslate,
    component: Languages,
    event: ModalEvents.LANGUAGE_MODAL,
  },
  {
    id: 'references',
    name: 'References',
    icon: FaUserFriends,
    component: References,
    event: ModalEvents.REFERENCE_MODAL,
  },
];
