import React, { useContext, useRef } from 'react';
import { MdFileUpload } from 'react-icons/md';
import StorageContext from '../../contexts/StorageContext';
import { handleKeyDown } from '../../utils';
import Input from './Input';
import styles from './PhotoUpload.module.css';

const PhotoUpload = () => {
  const fileInputRef = useRef(null);
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
      <div
        role="button"
        tabIndex="0"
        className={styles.circle}
        onClick={handleIconClick}
        onKeyDown={(e) => handleKeyDown(e, handleIconClick)}
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

      <Input
        name="photograph"
        label="Photograph"
        className="pl-6"
        path="profile.photograph"
      />
    </div>
  );
};

export default PhotoUpload;
