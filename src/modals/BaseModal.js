import { Backdrop, Fade, Modal } from '@material-ui/core';
import { isFunction } from 'lodash';
import React, { forwardRef, memo, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { MdClose } from 'react-icons/md';
import Button from '../components/shared/Button';
import { handleKeyUp } from '../utils';
import styles from './BaseModal.module.css';

const BaseModal = forwardRef(
  ({ title, state, children, action, hideActions = false, onDestroy }, ref) => {
    const [open, setOpen] = state;
    const { t } = useTranslation();

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
              <MdClose
                size="18"
                tabIndex="0"
                onClick={handleClose}
                onKeyUp={(e) => handleKeyUp(e, handleClose)}
              />
            </div>

            <div className={styles.body}>{children}</div>

            {!hideActions && (
              <div className={styles.actions}>
                <Button outline className="mr-8" onClick={handleClose}>
                  {t('shared.buttons.cancel')}
                </Button>

                {action}
              </div>
            )}
          </div>
        </Fade>
      </Modal>
    );
  },
);

export default memo(BaseModal);
