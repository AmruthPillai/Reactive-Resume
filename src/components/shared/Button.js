import React from "react";
import classNames from "classnames";
import Loader from "react-loader-spinner";
import styles from "./Button.module.css";

const Button = ({ text, isLoading, outline, className }) => {
  const getClasses = classNames(styles.container, className, {
    [styles.outline]: outline,
  });

  return (
    <div className={getClasses}>
      {isLoading ? (
        <Loader type="ThreeDots" color="#FFF" height={18} width={28} />
      ) : (
        text
      )}
    </div>
  );
};

export default Button;
