import React, { Fragment, useContext } from "react";
import AuthModal from "./AuthModal";
import CreateResumeModal from "./CreateResumeModal";
import ModalContext from "../contexts/ModalContext";

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
