import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { ModalName, setModalState } from '@/store/modal/modalSlice';

import ForgotPasswordModal from './auth/ForgotPasswordModal';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import ResetPasswordModal from './auth/ResetPasswordModal';
import UserProfileModal from './auth/UserProfileModal';
import AwardModal from './builder/sections/AwardModal';
import CertificateModal from './builder/sections/CertificateModal';
import CustomModal from './builder/sections/CustomModal';
import EducationModal from './builder/sections/EducationModal';
import InterestModal from './builder/sections/InterestModal';
import LanguageModal from './builder/sections/LanguageModal';
import ProfileModal from './builder/sections/ProfileModal';
import ProjectModal from './builder/sections/ProjectModal';
import PublicationModal from './builder/sections/PublicationModal';
import ReferenceModal from './builder/sections/ReferenceModal';
import SkillModal from './builder/sections/SkillModal';
import VolunteerModal from './builder/sections/VolunteerModal';
import WorkModal from './builder/sections/WorkModal';
import CreateResumeModal from './dashboard/CreateResumeModal';
import ImportExternalModal from './dashboard/ImportExternalModal';
import RenameResumeModal from './dashboard/RenameResumeModal';

type QueryParams = {
  modal?: ModalName;
};

const ModalWrapper: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const { modal, ...rest } = router.query as QueryParams;

    if (!modal) return;

    dispatch(setModalState({ modal, state: { open: true, payload: { item: rest } } }));
  }, [router.query, dispatch]);

  return (
    <>
      {/* Authentication */}
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <ResetPasswordModal />
      <UserProfileModal />

      {/* Dashboard */}
      <CreateResumeModal />
      <ImportExternalModal />
      <RenameResumeModal />

      {/* Builder */}

      {/* Sections */}
      <ProfileModal />
      <WorkModal />
      <EducationModal />
      <AwardModal />
      <CertificateModal />
      <PublicationModal />
      <SkillModal />
      <LanguageModal />
      <InterestModal />
      <VolunteerModal />
      <ProjectModal />
      <ReferenceModal />

      {/* Custom Sections */}
      <CustomModal />
    </>
  );
};

export default ModalWrapper;
