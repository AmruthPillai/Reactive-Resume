import cx from "classnames";
import { toUrl } from "gatsby-source-gravatar";
import React, { useContext, useMemo } from "react";
import UserContext from "../../contexts/UserContext";
import styles from "./Avatar.module.css";

const Avatar = ({ className }) => {
  const { user } = useContext(UserContext);

  const photoURL = useMemo(() => toUrl(user.email, "size=128"), [user.email]);

  return (
    <img
      className={cx(styles.container, className)}
      src={photoURL}
      alt={user.displayName}
    />
  );
};

export default Avatar;
