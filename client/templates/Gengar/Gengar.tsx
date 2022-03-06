import { alpha } from '@mui/material';
import { Theme } from '@reactive-resume/schema';
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

  const layout: string[][] = useAppSelector((state) => state.resume.metadata.layout[page]);
  const theme: Theme = useAppSelector((state) => get(state.resume, 'metadata.theme', {}));
  const contrast = useMemo(() => getContrastColor(theme.primary), [theme.primary]);
  const backgroundColor: string = useMemo(() => alpha(theme.primary, 0.15), [theme.primary]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div style={{ color: contrast === 'dark' ? theme.text : theme.background, backgroundColor: theme.primary }}>
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
