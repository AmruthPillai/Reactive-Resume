import React from "react";
import classNames from "classnames";
import Loader from "react-loader-spinner";
import styles from "./Button.module.css";

const Button = ({ icon, title, isLoading, onClick, outline, className }) => {
  const Icon = icon;
  const classes = classNames(styles.container, className, {
    [styles.outline]: outline,
  });

  const handleKeyDown = () => {};

  return (
    <div
      tabIndex="0"
      role="button"
      className={classes}
      onKeyDown={handleKeyDown}
      onClick={isLoading ? undefined : onClick}
    >
      {icon && <Icon size="14" className="mr-2" />}
      {isLoading ? (
        <Loader type="ThreeDots" color="#FFF" height={18} width={28} />
      ) : (
        title
      )}
    </div>
  );
};

export default Button;
