import React, { memo } from 'react';
import * as styles from './RightNavbar.module.css';
import SectionIcon from '../../shared/SectionIcon';
import SyncIndicator from './SyncIndicator';
import sections from '../../../data/rightSections';

const RightNavbar = () => (
  <div className={styles.container}>
    <div className="grid grid-cols-1 gap-4 text-primary-500">
      {sections.map((x) => (
        <SectionIcon
          key={x.id}
          section={x}
          containerId="RightSidebar"
          tooltipPlacement="left"
        />
      ))}
    </div>

    <hr className="mt-auto my-6" />

    <SyncIndicator />
  </div>
);

export default memo(RightNavbar);
