import { Link, navigate } from "gatsby";
import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Avatar from "../shared/Avatar";
import Logo from "../shared/Logo";
import styles from "./TopNavbar.module.css";

const TopNavbar = () => {
  const { logout } = useContext(UserContext);

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

          <Avatar className="ml-8" />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
