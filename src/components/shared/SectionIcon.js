import { Tooltip } from '@material-ui/core';
import React, { memo, useEffect } from 'react';
import { Link, scrollSpy } from 'react-scroll';
import styles from './SectionIcon.module.css';

const SectionIcon = ({ section, containerId, tooltipPlacement }) => {
  const { id, name, icon: Icon } = section;

  useEffect(() => {
    scrollSpy.update();
  }, []);

  return (
    <Tooltip title={name} placement={tooltipPlacement} arrow>
      <Link
        spy
        smooth
        to={id}
        offset={-18}
        duration={500}
        containerId={containerId}
        activeClass="text-primary-900"
        className={styles.icon}
      >
        <Icon size="18px" />
      </Link>
    </Tooltip>
  );
};

export default memo(SectionIcon);
