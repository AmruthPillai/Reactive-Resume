import { AiFillSafetyCertificate, AiOutlineTwitter } from 'react-icons/ai';
import { BsTools } from 'react-icons/bs';
import { FaAward, FaUserFriends } from 'react-icons/fa';
import {
  IoLogoGameControllerB,
  IoMdBriefcase,
  IoMdDocument,
} from 'react-icons/io';
import { MdPerson, MdSchool, MdTranslate } from 'react-icons/md';
import ModalEvents from '../constants/ModalEvents';

export default [
  {
    id: 'profile',
    name: 'Profile',
    icon: MdPerson,
    fixed: true,
  },
  {
    id: 'social',
    name: 'Social Network',
    icon: AiOutlineTwitter,
    event: ModalEvents.SOCIAL_MODAL,
    fixed: true,
  },
  {
    id: 'objective',
    name: 'Objective',
    icon: IoMdDocument,
  },
  {
    id: 'work',
    name: 'Work Experience',
    icon: IoMdBriefcase,
    event: ModalEvents.WORK_MODAL,
  },
  {
    id: 'education',
    name: 'Education',
    icon: MdSchool,
    event: ModalEvents.EDUCATION_MODAL,
  },
  {
    id: 'awards',
    name: 'Awards',
    icon: FaAward,
    event: ModalEvents.AWARD_MODAL,
  },
  {
    id: 'certifications',
    name: 'Certifications',
    icon: AiFillSafetyCertificate,
    event: ModalEvents.CERTIFICATION_MODAL,
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: BsTools,
    event: ModalEvents.SKILL_MODAL,
  },
  {
    id: 'hobbies',
    name: 'Hobbies',
    icon: IoLogoGameControllerB,
    event: ModalEvents.HOBBY_MODAL,
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: MdTranslate,
    event: ModalEvents.LANGUAGE_MODAL,
  },
  {
    id: 'references',
    name: 'References',
    icon: FaUserFriends,
    event: ModalEvents.REFERENCE_MODAL,
  },
];
