import { Autocomplete, Skeleton, Slider, TextField } from '@mui/material';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { Font, TypeCategory, TypeProperty, Typography as TypographyType } from 'schema';

import Heading from '@/components/shared/Heading';
import { FONTS_QUERY } from '@/constants/index';
import { fetchFonts } from '@/services/fonts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';

import styles from './Typography.module.scss';

const TypographySkeleton: React.FC = () => (
  <>
    <Skeleton variant="text" />
    <div className={styles.container}>
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="rectangular" height={60} />
    </div>
  </>
);

type WidgetProps = {
  label: string;
  category: TypeCategory;
};

const Widgets: React.FC<WidgetProps> = ({ label, category }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { family, size } = useAppSelector<TypographyType>((state) => get(state.resume.present, 'metadata.typography'));

  const { data: fonts } = useQuery(FONTS_QUERY, fetchFonts, {
    select: (fonts) => fonts.sort((a, b) => a.category.localeCompare(b.category)),
  });

  const handleChange = (property: TypeProperty, value: number | number[] | Font | null) => {
    if (!value) return;

    dispatch(
      setResumeState({
        path: `metadata.typography.${property}.${category}`,
        value: property === 'family' ? (value as Font).family : value,
      }),
    );
  };

  if (!fonts || isEmpty(fonts)) return <TypographySkeleton />;

  return (
    <>
      <h5 className={styles.subheading}>{label}</h5>

      <div className={styles.container}>
        <div className={styles.slider}>
          <Slider
            min={12}
            max={36}
            step={1}
            marks={[
              { value: 12, label: '12px' },
              { value: 24, label: t('builder.rightSidebar.sections.typography.form.font-size.label') },
              { value: 36, label: '36px' },
            ]}
            valueLabelDisplay="auto"
            value={size[category]}
            onChange={(_, size: number | number[]) => handleChange('size', size)}
          />
        </div>

        <Autocomplete<Font, false, boolean, false>
          options={fonts}
          disableClearable={true}
          groupBy={(font) => font.category}
          getOptionLabel={(font) => font.family}
          isOptionEqualToValue={(a, b) => a.family === b.family}
          value={fonts.find((font) => font.family === family[category])}
          onChange={(_, font: Font | null) => handleChange('family', font)}
          renderInput={(params) => (
            <TextField {...params} label={t('builder.rightSidebar.sections.typography.form.font-family.label')} />
          )}
        />
      </div>
    </>
  );
};

const Typography = () => {
  const { t } = useTranslation();

  return (
    <>
      <Heading path="metadata.typography" name={t('builder.rightSidebar.sections.typography.heading')} />

      <Widgets label={t('builder.rightSidebar.sections.typography.widgets.headings.label')} category="heading" />
      <Widgets label={t('builder.rightSidebar.sections.typography.widgets.body.label')} category="body" />
    </>
  );
};

export default Typography;
