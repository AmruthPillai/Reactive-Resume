import { Menu, MenuItem } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import ResumeContext from "../../../../contexts/ResumeContext";
import styles from "./DoubleFieldListItem.module.css";

const DoubleFieldListItem = ({
  title,
  subtitle,
  path,
  data,
  isFirst,
  isLast,
  onEdit,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { dispatch } = useContext(ResumeContext);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    onEdit();
    handleClose();
  };

  const handleMoveUp = () => {
    dispatch({
      type: "on_move_item_up",
      payload: {
        path,
        value: data,
      },
    });

    handleClose();
  };

  const handleMoveDown = () => {
    dispatch({
      type: "on_move_item_down",
      payload: {
        path,
        value: data,
      },
    });

    handleClose();
  };

  const handleDelete = () => {
    dispatch({
      type: "on_delete_item",
      payload: {
        path,
        value: data,
      },
    });

    handleClose();
  };

  return (
    <div className={styles.container}>
      <div className="flex flex-col">
        <span className="font-medium">{title}</span>
        <span className="mt-1 text-sm opacity-75">{subtitle}</span>
      </div>

      <div className={styles.menu}>
        <MdMoreVert
          size="18px"
          aria-haspopup="true"
          onClick={handleClick}
          className="cursor-pointer"
        />
        <Menu
          keepMounted
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
        >
          <div className="flex items-center space-around">
            <MenuItem disabled={isFirst} onClick={handleMoveUp}>
              <IoIosArrowUp size="18px" />
            </MenuItem>
            <MenuItem disabled={isLast} onClick={handleMoveDown}>
              <IoIosArrowDown size="18px" />
            </MenuItem>
          </div>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>
            <span className="text-red-600 font-medium">Delete</span>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default DoubleFieldListItem;
