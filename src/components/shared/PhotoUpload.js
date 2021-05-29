import { MdFileUpload } from 'react-icons/md';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import React, { memo, useContext, useRef } from 'react';
import { handleKeyUp } from '../../utils';
import Input from './Input';
import * as styles from './PhotoUpload.module.css';
import StorageContext from '../../contexts/StorageContext';

const PhotoUpload = () => {
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const { uploadPhotograph } = useContext(StorageContext);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    uploadPhotograph(file);
  };

  return (
    <div className="flex items-center">
      <Tooltip
        title={t('builder.tooltips.uploadPhotograph')}
        placement="right-start"
      >
        <div
          role="button"
          tabIndex="0"
          className={styles.circle}
          onClick={handleIconClick}
          onKeyUp={(e) => handleKeyUp(e, handleIconClick)}
        >
          <MdFileUpload size="22px" />
          <input
            name="file"
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </Tooltip>

      <Input
        name="photograph"
        label={t('builder.profile.photograph')}
        className="pl-6 w-full"
        path="profile.photograph"
      />
    </div>
  );
};

export default memo(PhotoUpload);
