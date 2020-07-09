import React, { memo } from 'react';
import sections from '../../../data/rightSections';
import SectionIcon from '../../shared/SectionIcon';
import styles from './RightNavbar.module.css';
import SyncIndicator from './SyncIndicator';

const RightNavbar = () => {
  return (
    <div className={styles.container}>
      <div className="grid grid-cols-1 gap-8">
        {sections.map((x) => (
          <SectionIcon key={x.id} section={x} containerId="RightSidebar" />
        ))}
      </div>

      <hr className="mt-auto my-6" />

      <SyncIndicator />
    </div>
  );
};

export default memo(RightNavbar);
