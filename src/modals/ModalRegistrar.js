import React, { Fragment } from "react";
import AuthModal from "./AuthModal";
import ResumeModal from "./ResumeModal";
import SocialModal from "./sections/SocialModal";

const ModalRegistrar = () => {
  return (
    <Fragment>
      <AuthModal />
      <ResumeModal />
      <SocialModal />
    </Fragment>
  );
};

export default ModalRegistrar;
