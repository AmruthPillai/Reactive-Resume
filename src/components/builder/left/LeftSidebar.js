import React, { Fragment } from "react";
import sections from "../../../data/leftSections";
import LeftNavbar from "./LeftNavbar";
import styles from "./LeftSidebar.module.css";

const LeftSidebar = () => {
  return (
    <div className="flex">
      <LeftNavbar />

      <div className={styles.container}>
        {sections.map(({ id, component: Component }) => (
          <Fragment key={id}>
            <Component />
            <hr />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
