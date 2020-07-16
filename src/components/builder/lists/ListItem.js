import { Menu, MenuItem } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdMoreVert } from 'react-icons/md';
import { useDispatch } from '../../../contexts/ResumeContext';
import styles from './ListItem.module.css';

const ListItem = ({
  title,
  subtitle,
  text,
  path,
  data,
  isFirst,
  isLast,
  onEdit,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    onEdit();
    handleClose();
  };

  const handleMoveUp = () => {
    dispatch({
      type: 'on_move_item_up',
      payload: {
        path,
        value: data,
      },
    });

    handleClose();
  };

  const handleMoveDown = () => {
    dispatch({
      type: 'on_move_item_down',
      payload: {
        path,
        value: data,
      },
    });

    handleClose();
  };

  const handleDelete = () => {
    dispatch({
      type: 'on_delete_item',
      payload: {
        path,
        value: data,
      },
    });

    handleClose();
  };

  return (
    <div className={styles.listItem}>
      <div className="grid">
        <span className="font-medium truncate">{title}</span>

        {subtitle && (
          <span className="mt-1 text-sm opacity-75 truncate">{subtitle}</span>
        )}

        {text && (
          <span className="w-4/5 mt-5 text-sm opacity-75 truncate">{text}</span>
        )}
      </div>

      <div className={styles.menu}>
        <MdMoreVert
          size="18px"
          aria-haspopup="true"
          onClick={handleClick}
          className="cursor-context-menu"
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
          <MenuItem onClick={handleEdit}>{t('shared.buttons.edit')}</MenuItem>
          <MenuItem onClick={handleDelete}>
            <span className="text-red-600 font-medium">
              {t('shared.buttons.delete')}
            </span>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default memo(ListItem);
