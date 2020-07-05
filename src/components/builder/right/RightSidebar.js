import React from "react";
import Profile from "../sections/Profile";
import RightNavbar from "./RightNavbar";
import styles from "./RightSidebar.module.css";

const RightSidebar = () => {
  return (
    <div className="flex">
      <div className={styles.container}>
        <Profile />
      </div>

      <RightNavbar />
    </div>
  );
};

export default RightSidebar;
