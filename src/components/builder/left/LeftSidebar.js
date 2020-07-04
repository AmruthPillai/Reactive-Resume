import React from "react";
import Input from "../../shared/Input";
import LeftNavbar from "./LeftNavbar";
import styles from "./LeftSidebar.module.css";

const LeftSidebar = () => {
  return (
    <div className="flex">
      <LeftNavbar />

      <div className={styles.container}>
        <section>
          <h2 className="text-4xl mb-8">Profile</h2>
          <div className="flex items-center">
            <div className={styles.circle}></div>
            <Input label="Photograph" className="ml-6" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeftSidebar;
