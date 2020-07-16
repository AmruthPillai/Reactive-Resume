import { Tooltip } from '@material-ui/core';
import React, { memo, useEffect } from 'react';
import { Link, scrollSpy } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import styles from './SectionIcon.module.css';

const SectionIcon = ({ section, containerId, tooltipPlacement }) => {
  const { t } = useTranslation();
  const { id, icon: Icon } = section;

  useEffect(() => {
    scrollSpy.update();
  }, []);

  return (
    <Tooltip
      title={t(`builder.sections.${id}`)}
      placement={tooltipPlacement}
      arrow
    >
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
