import React, { forwardRef, useImperativeHandle } from "react";
import { isFunction } from "lodash";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { MdClose } from "react-icons/md";
import styles from "./BaseModal.module.css";
import Button from "../components/shared/Button";

const BaseModal = forwardRef(
  ({ title, state, children, action, onDestroy }, ref) => {
    const { isOpen, setOpen, setData } = state;

    const handleClose = () => {
      setOpen(false);

      setTimeout(() => {
        isFunction(setData) && setData(null);
        isFunction(onDestroy) && onDestroy();
      }, 250);
    };

    useImperativeHandle(ref, () => ({ handleClose }));

    return (
      <Modal
        open={isOpen}
        closeAfterTransition
        onClose={handleClose}
        className={styles.root}
        BackdropComponent={Backdrop}
      >
        <Fade in={isOpen}>
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
