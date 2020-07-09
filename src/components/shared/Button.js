import cx from 'classnames';
import React, { memo } from 'react';
import { handleKeyUp } from '../../utils';
import styles from './Button.module.css';

const Button = ({ icon, title, onClick, outline, className, isLoading }) => {
  const Icon = icon;

  return (
    <button
      onKeyUp={(e) => handleKeyUp(e, onClick)}
      onClick={isLoading ? undefined : onClick}
      className={cx(styles.container, className, {
        [styles.outline]: outline,
      })}
    >
      {icon && <Icon size="14" className="mr-3" />}
      {isLoading ? 'Loading...' : title}
    </button>
  );
};

export default memo(Button);
