import React from "react";
import classNames from "classnames";
import Loader from "react-loader-spinner";
import styles from "./Button.module.css";

const Button = ({ title, isLoading, onClick, outline, className }) => {
  const classes = classNames(styles.container, className, {
    [styles.outline]: outline,
  });

  const handleKeyDown = (e) => {
    console.log(e.key);
  };

  return (
    <div
      tabIndex="0"
      role="button"
      onClick={onClick}
      className={classes}
      onKeyDown={handleKeyDown}
    >
      {isLoading ? (
        <Loader type="ThreeDots" color="#FFF" height={18} width={28} />
      ) : (
        title
      )}
    </div>
  );
};

export default Button;
