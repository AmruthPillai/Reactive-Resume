import React, { useContext } from "react";
import Logo from "../shared/Logo";
import UserContext from "../../contexts/UserContext";
import styles from "./TopNavbar.module.css";
import { navigate, Link } from "gatsby";

const TopNavbar = () => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <div className="container">
        <Link to="/">
          <Logo size="40px" />
        </Link>

        <div className="flex items-center">
          <button
            className="text-primary font-semibold focus:outline-none hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>

          <img
            className="ml-8 h-12 rounded-full"
            src={user.photoURL}
            alt={user.displayName}
          />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
