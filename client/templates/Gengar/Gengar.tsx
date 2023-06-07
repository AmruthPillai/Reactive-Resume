import { css } from '@emotion/css';
import { alpha } from '@mui/material';
import { ThemeConfig } from 'schema';
import clsx from 'clsx';
import get from 'lodash/get';
import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { getContrastColor } from '@/utils/styles';
import { PageProps } from '@/utils/template';

import { getSectionById } from '../sectionMap';
import styles from './Gengar.module.scss';
import { MastheadMain, MastheadSidebar } from './widgets/Masthead';
import Section from './widgets/Section';

const Gengar: React.FC<PageProps> = ({ page }) => {
  const isFirstPage = useMemo(() => page === 0, [page]);

  const layout: string[][] = useAppSelector((state) => state.resume.present.metadata.layout[page]);
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {} as ThemeConfig));
  const contrast = useMemo(() => getContrastColor(theme.primary), [theme.primary]);
  const backgroundColor: string = useMemo(() => alpha(theme.primary, 0.15), [theme.primary]);
  const color = useMemo(() => (contrast === 'dark' ? theme.text : theme.background), [theme, contrast]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div
            className={clsx(css(`svg { color: ${color} } --primary-color: ${color}`))}
            style={{ color: contrast === 'dark' ? theme.text : theme.background, backgroundColor: theme.primary }}
          >
            {isFirstPage && <MastheadSidebar />}
          </div>

          <div className={styles.inner} style={{ backgroundColor }}>
            {layout[1].map((key) => getSectionById(key, Section))}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.firstPage}>{isFirstPage && <MastheadMain />}</div>

          <div className={styles.inner}>{layout[0].map((key) => getSectionById(key, Section))}</div>
        </div>
      </div>
    </div>
  );
};

export default Gengar;
