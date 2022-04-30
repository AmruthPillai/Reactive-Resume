import { Close as CloseIcon } from '@mui/icons-material';
import { Fade, IconButton, Modal } from '@mui/material';
import { useRouter } from 'next/router';

import styles from './BaseModal.module.scss';

type Props = {
  isOpen: boolean;
  heading: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  footerChildren?: React.ReactNode;
  handleClose: () => void;
};

const BaseModal: React.FC<Props> = ({ icon, isOpen, heading, children, handleClose, footerChildren }) => {
  const router = useRouter();
  const { pathname, query } = router;

  const onClose = () => {
    router.push({ pathname, query }, '');

    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby={heading}
      classes={{ root: 'flex items-center justify-center' }}
    >
      <Fade in={isOpen}>
        <div className={styles.content}>
          <header className={styles.header}>
            <div>
              {icon}
              {icon && <span className="mx-1 opacity-25">/</span>}
              <h1>{heading}</h1>
            </div>

            <IconButton size="small" onClick={onClose}>
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </header>

          <div className={styles.body}>{children}</div>

          {footerChildren ? <footer className={styles.footer}>{footerChildren}</footer> : null}
        </div>
      </Fade>
    </Modal>
  );
};

export default BaseModal;
