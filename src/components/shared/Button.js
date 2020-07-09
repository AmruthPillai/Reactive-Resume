import classNames from 'classnames';
import React from 'react';
import { handleKeyUp } from '../../utils';
import styles from './Button.module.css';

const Button = ({ icon, title, onClick, outline, className, isLoading }) => {
  const Icon = icon;
  const classes = classNames(styles.container, className, {
    [styles.outline]: outline,
  });

  return (
    <button
      className={classes}
      onKeyUp={(e) => handleKeyUp(e, onClick)}
      onClick={isLoading ? undefined : onClick}
    >
      {icon && <Icon size="14" className="mr-2" />}
      {isLoading ? 'Loading...' : title}
    </button>
  );
};

export default Button;
