import React, { Fragment, useContext } from "react";
import ModalContext from "../contexts/ModalContext";
import AuthModal from "./AuthModal";
import CreateResumeModal from "./CreateResumeModal";

const ModalRegistrar = () => {
  const { createResumeModal } = useContext(ModalContext);

  return (
    <Fragment>
      <AuthModal />
      <CreateResumeModal data={createResumeModal.data} />
    </Fragment>
  );
};

export default ModalRegistrar;
