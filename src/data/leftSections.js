import { AiFillSafetyCertificate, AiOutlineTwitter } from 'react-icons/ai';
import { BsTools } from 'react-icons/bs';
import { FaAward, FaProjectDiagram, FaUserFriends } from 'react-icons/fa';
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
    icon: MdPerson,
    fixed: true,
  },
  {
    id: 'social',
    icon: AiOutlineTwitter,
    event: ModalEvents.SOCIAL_MODAL,
    fixed: true,
  },
  {
    id: 'objective',
    icon: IoMdDocument,
  },
  {
    id: 'work',
    icon: IoMdBriefcase,
    event: ModalEvents.WORK_MODAL,
  },
  {
    id: 'education',
    icon: MdSchool,
    event: ModalEvents.EDUCATION_MODAL,
  },
  {
    id: 'projects',
    icon: FaProjectDiagram,
    event: ModalEvents.PROJECT_MODAL,
  },
  {
    id: 'awards',
    icon: FaAward,
    event: ModalEvents.AWARD_MODAL,
  },
  {
    id: 'certifications',
    icon: AiFillSafetyCertificate,
    event: ModalEvents.CERTIFICATION_MODAL,
  },
  {
    id: 'skills',
    icon: BsTools,
    event: ModalEvents.SKILL_MODAL,
  },
  {
    id: 'hobbies',
    icon: IoLogoGameControllerB,
    event: ModalEvents.HOBBY_MODAL,
  },
  {
    id: 'languages',
    icon: MdTranslate,
    event: ModalEvents.LANGUAGE_MODAL,
  },
  {
    id: 'references',
    icon: FaUserFriends,
    event: ModalEvents.REFERENCE_MODAL,
  },
];
