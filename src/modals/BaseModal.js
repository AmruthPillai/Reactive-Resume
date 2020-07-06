import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { isFunction } from "lodash";
import React, { forwardRef, useImperativeHandle } from "react";
import { MdClose } from "react-icons/md";
import Button from "../components/shared/Button";
import styles from "./BaseModal.module.css";

const BaseModal = forwardRef(
  ({ title, state, children, action, onDestroy }, ref) => {
    const [open, setOpen] = state;

    const handleClose = () => {
      setOpen(false);

      setTimeout(() => {
        isFunction(onDestroy) && onDestroy();
      }, 250);
    };

    useImperativeHandle(ref, () => ({ handleClose }));

    return (
      <Modal
        open={open}
        closeAfterTransition
        onClose={handleClose}
        className={styles.root}
        BackdropComponent={Backdrop}
      >
        <Fade in={open}>
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
        </Fade>
      </Modal>
    );
  }
);

export default BaseModal;
