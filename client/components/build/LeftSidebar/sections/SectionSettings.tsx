import { ViewWeek } from '@mui/icons-material';
import { ButtonBase, Popover, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';

type Props = {
  path: string;
};

const SectionSettings: React.FC<Props> = ({ path }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const columns = useAppSelector<number>((state) => get(state.resume.present, `${path}.columns`, 2));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetColumns = (index: number) => dispatch(setResumeState({ path: `${path}.columns`, value: index }));

  return (
    <div>
      <Tooltip title={t('builder.common.columns.tooltip')}>
        <ButtonBase onClick={handleClick} sx={{ padding: 1, borderRadius: 1 }} className="opacity-50 hover:opacity-75">
          <ViewWeek /> <span className="ml-1.5 text-xs">{columns}</span>
        </ButtonBase>
      </Tooltip>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className="p-5 dark:bg-zinc-900">
          <h4 className="mb-2 font-medium">{t('builder.common.columns.heading')}</h4>

          <ToggleButtonGroup exclusive value={columns} onChange={(_, value: number) => handleSetColumns(value)}>
            {[1, 2, 3, 4].map((index) => (
              <ToggleButton key={index} value={index} size="small" className="w-12">
                {index}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      </Popover>
    </div>
  );
};

export default SectionSettings;
