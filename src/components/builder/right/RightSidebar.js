import React from "react";
import Layout from "../sections/Layout";
import RightNavbar from "./RightNavbar";
import styles from "./RightSidebar.module.css";

const RightSidebar = () => {
  return (
    <div className="flex">
      <div className={styles.container}>
        <Layout />
        <hr />
      </div>

      <RightNavbar />
    </div>
  );
};

export default RightSidebar;
