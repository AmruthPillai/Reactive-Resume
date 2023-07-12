import { Circle, Square, SquareRounded } from '@mui/icons-material';
import { Checkbox, Divider, FormControlLabel, Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import { Photo, PhotoShape } from 'schema';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';

const PhotoFilters = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const photo: Photo = useAppSelector((state) => get(state.resume.present, 'basics.photo'));
  const size: number = get(photo, 'filters.size', 128);
  const shape: PhotoShape = get(photo, 'filters.shape', 'square');
  const grayscale: boolean = get(photo, 'filters.grayscale', false);
  const border: boolean = get(photo, 'filters.border', false);

  const handleChangeSize = (size: number | number[]) =>
    dispatch(setResumeState({ path: 'basics.photo.filters.size', value: size }));

  const handleChangeShape = (shape: PhotoShape) =>
    dispatch(setResumeState({ path: 'basics.photo.filters.shape', value: shape }));

  const handleSetGrayscale = (value: boolean) =>
    dispatch(setResumeState({ path: 'basics.photo.filters.grayscale', value }));

  const handleSetBorder = (value: boolean) => dispatch(setResumeState({ path: 'basics.photo.filters.border', value }));

  return (
    <div className="flex flex-col gap-2 p-5 dark:bg-zinc-900">
      <div>
        <h4 className="font-medium">{t('builder.leftSidebar.sections.basics.photo-filters.size.heading')}</h4>

        <div className="mx-2">
          <Slider
            min={32}
            max={512}
            step={2}
            marks={[
              { value: 32, label: '32' },
              { value: 128, label: '128' },
              { value: 256, label: '256' },
              { value: 512, label: '512' },
            ]}
            value={size}
            onChange={(_, value: number | number[]) => handleChangeSize(value)}
          />
        </div>
      </div>

      <Divider />

      <div>
        <h4 className="font-medium">{t('builder.leftSidebar.sections.basics.photo-filters.effects.heading')}</h4>

        <div className="flex items-center">
          <FormControlLabel
            label={t('builder.leftSidebar.sections.basics.photo-filters.effects.grayscale.label')}
            control={
              <Checkbox color="secondary" checked={grayscale} onChange={(_, value) => handleSetGrayscale(value)} />
            }
          />

          <FormControlLabel
            label={t('builder.leftSidebar.sections.basics.photo-filters.effects.border.label')}
            control={<Checkbox color="secondary" checked={border} onChange={(_, value) => handleSetBorder(value)} />}
          />
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">{t('builder.leftSidebar.sections.basics.photo-filters.shape.heading')}</h4>

        <ToggleButtonGroup exclusive value={shape} onChange={(_, value) => handleChangeShape(value)}>
          <ToggleButton size="small" value="square" className="w-14">
            <Square fontSize="small" />
          </ToggleButton>

          <ToggleButton size="small" value="rounded-square" className="w-14">
            <SquareRounded fontSize="small" />
          </ToggleButton>

          <ToggleButton size="small" value="circle" className="w-14">
            <Circle fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default PhotoFilters;
