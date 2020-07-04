import React, { useContext } from "react";
import { MdAdd } from "react-icons/md";
import styles from "./CreateResume.module.css";
import ModalContext from "../../contexts/ModalContext";

const CreateResume = () => {
  const { createResumeModal } = useContext(ModalContext);

  const handleClick = () => {
    createResumeModal.setOpen(true);
  };

  return (
    <div className={styles.resume}>
      <div className={styles.backdrop}>
        <MdAdd color="#FFF" size="48" />
      </div>
      <div
        tabIndex="0"
        role="button"
        className={styles.page}
        onClick={handleClick}
        onKeyDown={() => {}}
      >
        <MdAdd color="#444" size="48" />
      </div>
      <div className={styles.meta}>
        <p>Create New Resume</p>
      </div>
    </div>
  );
};

export default CreateResume;
