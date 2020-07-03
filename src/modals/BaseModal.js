import React from "react";
import Modal from "@material-ui/core/Modal";
import { MdClose } from "react-icons/md";
import styles from "./BaseModal.module.css";
import Button from "../components/shared/Button";

const BaseModal = ({ title, state, children, action }) => {
  const [isOpen, setOpen] = state;

  const handleClose = () => setOpen(false);

  return (
    <Modal open={isOpen} onClose={handleClose} className={styles.root}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <h2>{title}</h2>
          <MdClose size="18" onClick={handleClose} />
        </div>

        <div className={styles.body}>{children}</div>

        <div className={styles.actions}>
          <Button
            outline
            title="Cancel"
            className="mr-8"
            onClick={handleClose}
          />

          {action}
        </div>
      </div>
    </Modal>
  );
};

export default BaseModal;
