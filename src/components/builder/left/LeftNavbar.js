import { Link } from "gatsby";
import React from "react";
import { MdPerson } from "react-icons/md";
import Avatar from "../../shared/Avatar";
import Logo from "../../shared/Logo";
import styles from "./LeftNavbar.module.css";

const LeftNavbar = () => {
  return (
    <div className={styles.container}>
      <Link to="/app/dashboard">
        <Logo size="40px" />
      </Link>

      <hr className="my-6" />

      <div className="grid grid-cols-1 gap-6">
        <MdPerson
          className="text-secondary-dark hover:text-primary"
          size="20px"
        />
      </div>

      <hr className="mt-auto my-6" />

      <Avatar />
    </div>
  );
};

export default LeftNavbar;
