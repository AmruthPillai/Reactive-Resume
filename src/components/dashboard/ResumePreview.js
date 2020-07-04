import React, { useState } from "react";
import { MdMoreHoriz, MdOpenInNew } from "react-icons/md";
import { Menu, MenuItem } from "@material-ui/core";
import styles from "./ResumePreview.module.css";

const ResumePreview = ({ title, subtitle }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    console.log("Hello, World!");
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.resume}>
      <div className={styles.backdrop}>
        <img
          src="https://source.unsplash.com/random/210x297"
          alt="Resume Preview"
        />
      </div>
      <div className={styles.page}>
        <MdOpenInNew
          color="#fff"
          size="48"
          className="cursor-pointer"
          onClick={handleClick}
        />
        <MdMoreHoriz
          color="#fff"
          size="48"
          className="cursor-pointer"
          aria-haspopup="true"
          onClick={handleMenuClick}
        />
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Duplicate</MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <span className="text-red-600">Delete</span>
          </MenuItem>
        </Menu>
      </div>
      <div className={styles.meta}>
        <p>{title}</p>
        <span>{subtitle}</span>
      </div>
    </div>
  );
};

export default ResumePreview;
