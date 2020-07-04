import React, { Fragment, useEffect } from "react";
import { Slide, toast } from "react-toastify";
import ModalRegistrar from "../../modals/ModalRegistrar";

const Wrapper = ({ children }) => {
  useEffect(() => {
    toast.configure({
      role: "alert",
      hideProgressBar: true,
      transition: Slide,
      closeButton: false,
      position: "bottom-right",
      pauseOnFocusLoss: false,
    });
  }, []);

  return (
    <Fragment>
      {children}

      <ModalRegistrar />
    </Fragment>
  );
};

export default Wrapper;
