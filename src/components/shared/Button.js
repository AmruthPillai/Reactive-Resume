import classNames from "classnames";
import React from "react";
import styles from "./Button.module.css";

const Button = ({
  icon,
  title,
  onClick,
  outline,
  className,
  isLoading,
  type = "button",
}) => {
  const Icon = icon;
  const classes = classNames(styles.container, className, {
    [styles.outline]: outline,
  });

  const handleKeyDown = () => {};

  return (
    <button
      type={type}
      className={classes}
      onKeyDown={handleKeyDown}
      onClick={isLoading ? undefined : onClick}
    >
      {icon && <Icon size="14" className="mr-2" />}
      {isLoading ? "Loading..." : title}
    </button>
  );
};

export default Button;
