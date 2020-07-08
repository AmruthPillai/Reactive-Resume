import React from 'react';
import { MdPerson } from 'react-icons/md';
import styles from './RightNavbar.module.css';
import SyncIndicator from './SyncIndicator';

const RightNavbar = () => {
  return (
    <div className={styles.container}>
      <div className="grid grid-cols-1 gap-6">
        <MdPerson
          className="text-secondary-dark hover:text-primary"
          size="20px"
        />
      </div>

      <hr className="mt-auto my-6" />

      <SyncIndicator />
    </div>
  );
};

export default RightNavbar;
