import React, { Fragment } from "react";
import { ToastContainer, Slide } from "react-toastify";
import ModalRegistrar from "../../modals/ModalRegistrar";

const Wrapper = ({ children }) => {
  return (
    <Fragment>
      {children}

      <ModalRegistrar />
      <ToastContainer
        role="alert"
        hideProgressBar
        transition={Slide}
        closeButton={false}
        position="bottom-right"
        pauseOnFocusLoss={false}
      />
    </Fragment>
  );
};

export default Wrapper;
