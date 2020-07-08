import React, { Fragment } from "react";
import AuthModal from "./AuthModal";
import ResumeModal from "./ResumeModal";
import AwardModal from "./sections/AwardModal";
import CertificateModal from "./sections/CertificateModal";
import EducationModal from "./sections/EducationModal";
import SkillModal from "./sections/SkillModal";
import SocialModal from "./sections/SocialModal";
import WorkModal from "./sections/WorkModal";

const ModalRegistrar = () => {
  return (
    <Fragment>
      <AuthModal />
      <ResumeModal />
      <SocialModal />
      <WorkModal />
      <EducationModal />
      <AwardModal />
      <CertificateModal />
      <SkillModal />
    </Fragment>
  );
};

export default ModalRegistrar;
