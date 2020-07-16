import cx from 'classnames';
import { toUrl } from 'gatsby-source-gravatar';
import React, { memo, useContext, useMemo, useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import UserContext from '../../contexts/UserContext';
import styles from './Avatar.module.css';
import { handleKeyUp } from '../../utils';

const Avatar = ({ className }) => {
  const { t } = useTranslation();
  const { user, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const photoURL = useMemo(() => toUrl(user.email || '', 'size=128&d=retro'), [
    user.email,
  ]);

  return (
    <div>
      <div
        tabIndex="0"
        role="button"
        className="flex focus:outline-none"
        onClick={handleClick}
        onKeyUp={(e) => handleKeyUp(e, handleClick)}
      >
        <img
          src={photoURL}
          alt={user.displayName || 'Anonymous User'}
          className={cx(styles.container, className)}
        />
      </div>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={handleLogout}>{t('shared.buttons.logout')}</MenuItem>
      </Menu>
    </div>
  );
};

export default memo(Avatar);
