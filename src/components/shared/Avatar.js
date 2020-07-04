import cx from "classnames";
import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import styles from "./Avatar.module.css";

const Avatar = ({ className }) => {
  const { user } = useContext(UserContext);

  return (
    <img
      className={cx(styles.container, className)}
      src={user.photoURL}
      alt={user.displayName}
    />
  );
};

export default Avatar;
