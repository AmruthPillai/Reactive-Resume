import React, { Fragment } from "react";
import AuthModal from "./AuthModal";
import ResumeModal from "./ResumeModal";
import EducationModal from "./sections/EducationModal";
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
    </Fragment>
  );
};

export default ModalRegistrar;
