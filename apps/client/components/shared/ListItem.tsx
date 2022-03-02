import { DeleteOutline, DriveFileRenameOutline, FileCopy, MoreVert } from '@mui/icons-material';
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import { ListItem as ListItemType } from '@reactive-resume/schema';
import clsx from 'clsx';
import isFunction from 'lodash/isFunction';
import React, { useRef, useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';

import styles from './ListItem.module.scss';

interface DragItem {
  id: string;
  type: string;
  index: number;
}

type Props = {
  item: ListItemType;
  index: number;
  title: string;
  subtitle?: string;
  onMove?: (dragIndex: number, hoverIndex: number) => void;
  onEdit?: (item: ListItemType) => void;
  onDelete?: (item: ListItemType) => void;
  onDuplicate?: (item: ListItemType) => void;
};

const ListItem: React.FC<Props> = ({ item, index, title, subtitle, onMove, onEdit, onDelete, onDuplicate }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'ListItem',
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      isFunction(onMove) && onMove(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'ListItem',
    item: () => {
      return { id: item.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleOpen = (event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (item: ListItemType) => {
    isFunction(onEdit) && onEdit(item);
    handleClose();
  };

  const handleDelete = (item: ListItemType) => {
    isFunction(onDelete) && onDelete(item);
    handleClose();
  };

  const handleDuplicate = (item: ListItemType) => {
    isFunction(onDuplicate) && onDuplicate(item);
    handleClose();
  };

  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={clsx(styles.item, {
        ['opacity-25']: isDragging,
      })}
    >
      <div className={styles.meta}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
      </div>

      <div>
        <IconButton onClick={handleOpen}>
          <MoreVert />
        </IconButton>

        <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
          <MenuItem onClick={() => handleEdit(item)}>
            <ListItemIcon>
              <DriveFileRenameOutline className="scale-90" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>

          <MenuItem onClick={() => handleDuplicate(item)}>
            <ListItemIcon>
              <FileCopy className="scale-90" />
            </ListItemIcon>
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>

          <Divider />

          <Tooltip
            arrow
            placement="right"
            title="Are you sure you want to delete this item? This is an irreversible action."
          >
            <div>
              <MenuItem onClick={() => handleDelete(item)}>
                <ListItemIcon>
                  <DeleteOutline className="scale-90" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </div>
          </Tooltip>
        </Menu>
      </div>
    </div>
  );
};

export default ListItem;
