import { Check, Delete, DriveFileRenameOutline, Grade, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField, Tooltip } from '@mui/material';
import clsx from 'clsx';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import React, { useMemo, useState } from 'react';

import sections from '@/config/sections';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteSection, setResumeState } from '@/store/resume/resumeSlice';

import styles from './Heading.module.scss';

type Props = {
  path: string;
  name?: string;
  isEditable?: boolean;
  isHideable?: boolean;
  isDeletable?: boolean;
  action?: React.ReactNode;
};

const Heading: React.FC<Props> = ({
  path,
  name,
  isEditable = false,
  isHideable = false,
  isDeletable = false,
  action,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const heading = useAppSelector((state) => get(state.resume.present, `${path}.name`, name));
  const visibility = useAppSelector((state) => get(state.resume.present, `${path}.visible`, true));

  const [editMode, setEditMode] = useState(false);

  const id = useMemo(() => path.split('.')[1], [path]);

  const icon = sections.find((x) => x.id === id)?.icon || <Grade />;

  const toggleVisibility = () => {
    dispatch(setResumeState({ path: `${path}.visible`, value: !visibility }));
  };

  const toggleEditMode = () => setEditMode(!editMode);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setResumeState({ path: `${path}.name`, value: event.target.value }));
  };

  const handleDelete = () => {
    dispatch(deleteSection({ path }));
  };

  return (
    <div className={styles.container}>
      <div className="flex w-full items-center gap-3">
        <div className="opacity-50">{icon}</div>
        {editMode ? (
          <TextField size="small" value={heading} className="w-3/4" onChange={handleChange} />
        ) : (
          <h1>{t(`builder.leftSidebar.${path}.heading`, { defaultValue: heading })}</h1>
        )}
      </div>

      <div
        className={clsx(styles.actions, {
          '!opacity-75': editMode,
        })}
      >
        {isEditable && (
          <Tooltip title={t('builder.common.tooltip.rename-section')}>
            <IconButton onClick={toggleEditMode}>{editMode ? <Check /> : <DriveFileRenameOutline />}</IconButton>
          </Tooltip>
        )}

        {isHideable && (
          <Tooltip title={t('builder.common.tooltip.toggle-visibility')}>
            <IconButton onClick={toggleVisibility}>{visibility ? <Visibility /> : <VisibilityOff />}</IconButton>
          </Tooltip>
        )}

        {isDeletable && (
          <Tooltip title={t('builder.common.tooltip.delete-section')}>
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
        )}

        {action}
      </div>
    </div>
  );
};

export default Heading;
