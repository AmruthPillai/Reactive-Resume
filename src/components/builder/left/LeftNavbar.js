import { Link } from 'gatsby';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import Avatar from '../../shared/Avatar';
import Logo from '../../shared/Logo';
import * as styles from './LeftNavbar.module.css';
import SectionIcon from '../../shared/SectionIcon';
import sections from '../../../data/leftSections';

const LeftNavbar = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Tooltip title={t('builder.tooltips.backToDashboard')} placement="right">
        <div>
          <Link to="/app/dashboard">
            <Logo size="40px" />
          </Link>
        </div>
      </Tooltip>

      <hr className="my-6" />

      <div className="grid grid-cols-1 gap-4 text-primary-500">
        {sections.map((x) => (
          <SectionIcon
            key={x.id}
            section={x}
            containerId="LeftSidebar"
            tooltipPlacement="right"
          />
        ))}
      </div>

      <hr className="mt-auto my-6" />

      <Avatar />
    </div>
  );
};

export default memo(LeftNavbar);
