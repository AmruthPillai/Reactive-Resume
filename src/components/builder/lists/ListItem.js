import { Draggable } from 'react-beautiful-dnd';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdMoreVert } from 'react-icons/md';
import { Menu, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import React, { memo, useState } from 'react';
import Switch from '@material-ui/core/Switch';
import { useDispatch } from '../../../contexts/ResumeContext';
import * as styles from './ListItem.module.css';

const dataTestIdPrefix = 'list-item-';

const ListItem = ({
  title,
  subtitle,
  text,
  path,
  data,
  isFirst,
  isLast,
  onEdit,
  index,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteClickCount, setDeleteClickCount] = useState(0);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const toggleSwitchState = 'isVisible' in data ? data.isVisible : true;

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

  const handleToggleUse = () => {
    dispatch({
      type: 'on_toggle_use_item',
      payload: {
        path,
        value: data,
      },
    });
  };

  const checkConfirmationAndDelte = () => {
    if (deleteClickCount === 1) {
      handleDelete();
    } else if (deleteClickCount < 1) {
      setDeleteClickCount(deleteClickCount + 1);
    }
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(dragProvided) => (
        <div
          ref={dragProvided.innerRef}
          className={styles.listItem}
          data-testid={`${dataTestIdPrefix}${path}`}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
        >
          <div className="grid">
            <span className="font-medium truncate">{title}</span>

            {subtitle && (
              <span className="mt-1 text-sm opacity-75 truncate">
                {subtitle}
              </span>
            )}

            {text && (
              <span className="w-4/5 mt-5 text-sm opacity-75 truncate">
                {text}
              </span>
            )}
          </div>
          <div className={styles.toggleButton}>
            <Switch
              checked={toggleSwitchState}
              onChange={handleToggleUse}
              color="primary"
              name="toggleSwitch"
              className="toggle-button"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />

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
                onClose={() => {
                  setDeleteClickCount(0);
                  handleClose();
                }}
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
                <MenuItem onClick={handleEdit}>
                  {t('shared.buttons.edit')}
                </MenuItem>
                <MenuItem onClick={checkConfirmationAndDelte}>
                  <span className="text-red-600 font-medium">
                    {deleteClickCount
                      ? t('shared.buttons.confirmation')
                      : t('shared.buttons.delete')}
                  </span>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default memo(ListItem);

export { dataTestIdPrefix };
