import React from "react";
import { MdPerson } from "react-icons/md";
import styles from "./RightNavbar.module.css";

const RightNavbar = () => {
  return (
    <div className={styles.container}>
      <div className="grid grid-cols-1 gap-6">
        <MdPerson
          className="text-secondary-dark hover:text-primary"
          size="20px"
        />
      </div>
    </div>
  );
};

export default RightNavbar;
