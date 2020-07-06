import { Menu, MenuItem } from "@material-ui/core";
import { navigate } from "gatsby";
import moment from "moment";
import React, { useContext, useState } from "react";
import { MdMoreHoriz, MdOpenInNew } from "react-icons/md";
import { toast } from "react-toastify";
import DatabaseContext from "../../contexts/DatabaseContext";
import ModalContext from "../../contexts/ModalContext";
import styles from "./ResumePreview.module.css";

const ResumePreview = ({ resume }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { emitter, events } = useContext(ModalContext);
  const { deleteResume } = useContext(DatabaseContext);

  const handleOpen = () => navigate(`/app/builder/${resume.id}`);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRename = () => {
    emitter.emit(events.CREATE_RESUME_MODAL, resume);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteResume(resume.id);
    toast(`${resume.name} was deleted successfully`);
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
          <MenuItem onClick={handleDelete}>
            <span className="text-red-600">Delete</span>
          </MenuItem>
        </Menu>
      </div>
      <div className={styles.meta}>
        <span>{resume.name}</span>
        {resume.updatedAt && (
          <span>Last updated {moment(resume.updatedAt).fromNow()}</span>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
