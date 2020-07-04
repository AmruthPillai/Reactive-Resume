import { Link } from "gatsby";
import React from "react";
import Avatar from "../../shared/Avatar";
import Logo from "../../shared/Logo";
import styles from "./LeftNavbar.module.css";

const LeftNavbar = () => {
  return (
    <div className={styles.container}>
      <Link to="/app/dashboard">
        <Logo size="40px" />
      </Link>

      <hr className="my-4" />

      <hr className="mt-auto my-4" />

      <Avatar />
    </div>
  );
};

export default LeftNavbar;
