import { Menu, MenuItem } from '@material-ui/core';
import { navigate } from 'gatsby';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdMoreHoriz, MdOpenInNew } from 'react-icons/md';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import DatabaseContext from '../../contexts/DatabaseContext';
import ModalContext from '../../contexts/ModalContext';
import styles from './ResumePreview.module.css';

const ResumePreview = ({ resume }) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { emitter, events } = useContext(ModalContext);
  const { duplicateResume, deleteResume } = useContext(DatabaseContext);

  const handleOpen = () => navigate(`/app/builder/${resume.id}`);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDuplicate = () => {
    duplicateResume(resume);
    setAnchorEl(null);
  };

  const handleRename = () => {
    emitter.emit(events.CREATE_RESUME_MODAL, resume);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteResume(resume.id);
    toast(t('dashboard.toasts.deleted', { name: resume.name }));
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.resume}>
      <div className={styles.backdrop}>
        <img src={resume.preview} alt={resume.name} />
      </div>
      <div className={styles.page}>
        <MdOpenInNew
          color="#fff"
          size="48"
          className="cursor-pointer"
          onClick={handleOpen}
        />
        <MdMoreHoriz
          color="#fff"
          size="48"
          className="cursor-pointer"
          aria-haspopup="true"
          onClick={handleMenuClick}
        />
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDuplicate}>
            {t('dashboard.buttons.duplicate')}
          </MenuItem>
          <MenuItem onClick={handleRename}>
            {t('dashboard.buttons.rename')}
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <span className="text-red-600 font-medium">
              {t('shared.buttons.delete')}
            </span>
          </MenuItem>
        </Menu>
      </div>
      <div className={styles.meta}>
        <span>{resume.name}</span>
        {resume.updatedAt && (
          <span>
            {t('dashboard.lastUpdated', {
              timestamp: dayjs(resume.updatedAt)
                .locale(i18n.language.substr(0, 2))
                .fromNow(),
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
