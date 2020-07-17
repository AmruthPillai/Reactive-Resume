import React, { memo, useContext } from 'react';
import { MdAdd } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import ModalContext from '../../contexts/ModalContext';
import { handleKeyUp } from '../../utils';
import styles from './CreateResume.module.css';

const CreateResume = () => {
  const { t } = useTranslation();
  const { emitter, events } = useContext(ModalContext);

  const handleClick = () => emitter.emit(events.CREATE_RESUME_MODAL);

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
        onKeyUp={(e) => handleKeyUp(e, handleClick)}
      >
        <MdAdd size="48" />
      </div>
      <div className={styles.meta}>
        <p>{t('dashboard.createResume')}</p>
      </div>
    </div>
  );
};

export default memo(CreateResume);
