import React, { useContext } from "react";
import { MdAdd } from "react-icons/md";
import ModalContext from "../../contexts/ModalContext";
import styles from "./CreateResume.module.css";

const CreateResume = () => {
  const { createResumeModal } = useContext(ModalContext);

  const handleClick = () => {
    createResumeModal.setOpen(true);
  };

  return (
    <div className={styles.resume}>
      <div className={styles.backdrop}>
        <MdAdd size="48" />
      </div>
      <div
        tabIndex="0"
        role="button"
        className={styles.page}
        onClick={handleClick}
        onKeyDown={() => {}}
      >
        <MdAdd size="48" />
      </div>
      <div className={styles.meta}>
        <p>Create New Resume</p>
      </div>
    </div>
  );
};

export default CreateResume;
