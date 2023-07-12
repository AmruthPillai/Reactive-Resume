import clsx from 'clsx';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ListItem as ListItemType } from 'schema';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteItem, setResumeState } from '@/store/resume/resumeSlice';

import styles from './List.module.scss';
import ListItem from './ListItem';

type Props = {
  path: string;
  titleKey?: string;
  subtitleKey?: string;
  onEdit?: (item: ListItemType) => void;
  onDuplicate?: (item: ListItemType) => void;
  className?: string;
};

const List: React.FC<Props> = ({
  path,
  titleKey = 'title',
  subtitleKey = 'subtitle',
  onEdit,
  onDuplicate,
  className,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const list: Array<ListItemType> = useAppSelector((state) => get(state.resume.present, path, []));

  const handleEdit = (item: ListItemType) => {
    isFunction(onEdit) && onEdit(item);
  };

  const handleDuplicate = (item: ListItemType) => {
    isFunction(onDuplicate) && onDuplicate(item);
  };

  const handleDelete = (item: ListItemType) => {
    dispatch(deleteItem({ path, value: item }));
  };

  const handleMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = list[dragIndex];
      const newList = [...list];

      newList.splice(dragIndex, 1);
      newList.splice(hoverIndex, 0, dragItem);

      dispatch(setResumeState({ path, value: newList }));
    },
    [list, dispatch, path],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={clsx(styles.container, className)}>
        {isEmpty(list) && <div className={styles.empty}>{t('builder.common.list.empty-text')}</div>}

        {list.map((item, index) => {
          const title = get(item, titleKey, '');
          const subtitleObj = get(item, subtitleKey);
          const subtitle: string = isArray(subtitleObj) ? subtitleObj.join(', ') : subtitleObj;

          return (
            <ListItem
              key={item.id}
              path={path}
              item={item}
              index={index}
              title={title}
              subtitle={subtitle}
              onMove={handleMove}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          );
        })}
      </div>
    </DndProvider>
  );
};

export default List;
