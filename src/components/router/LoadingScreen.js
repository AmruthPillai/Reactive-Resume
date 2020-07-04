import React from "react";
import Modal from "@material-ui/core/Modal";
import Loader from "react-loader-spinner";
import Logo from "../shared/Logo";

const LoadingScreen = () => {
  return (
    <Modal open hideBackdrop>
      <div className="w-screen h-screen flex justify-center items-center outline-none">
        <div className="flex flex-col items-center">
          <Logo size="48px" className="mb-4" />
          <Loader type="ThreeDots" color="#AAA" height={32} width={48} />
        </div>
      </div>
    </Modal>
  );
};

export default LoadingScreen;
