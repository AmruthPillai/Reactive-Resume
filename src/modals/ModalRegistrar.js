import React, { Fragment } from "react";
import AuthModal from "./AuthModal";
import CreateResumeModal from "./CreateResumeModal";

const ModalRegistrar = () => {
  return (
    <Fragment>
      <AuthModal />
      <CreateResumeModal />
    </Fragment>
  );
};

export default ModalRegistrar;
