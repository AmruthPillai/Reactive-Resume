import { Menu, MenuItem } from "@material-ui/core";
import moment from "moment";
import React, { useContext, useState } from "react";
import { MdMoreHoriz, MdOpenInNew } from "react-icons/md";
import ModalContext from "../../contexts/ModalContext";
import styles from "./ResumePreview.module.css";

const ResumePreview = ({ resume }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { createResumeModal } = useContext(ModalContext);

  const handleOpen = () => {
    console.log("Hello, World!");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRename = () => {
    createResumeModal.setOpen(true);
    createResumeModal.setData(resume);
    setAnchorEl(null);
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
          onClick={handleOpen}
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
          <MenuItem onClick={handleRename}>Rename</MenuItem>
          <MenuItem onClick={handleMenuClose}>Duplicate</MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <span className="text-red-600">Delete</span>
          </MenuItem>
        </Menu>
      </div>
      <div className={styles.meta}>
        <p>{resume.name}</p>
        {resume.updatedAt && (
          <span>
            Last updated {moment(resume.updatedAt.toDate()).fromNow()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
