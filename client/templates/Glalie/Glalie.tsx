import { alpha } from '@mui/material';
import get from 'lodash/get';
import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { PageProps } from '@/utils/template';

import { getSectionById } from '../sectionMap';
import styles from './Glalie.module.scss';
import { MastheadMain, MastheadSidebar } from './widgets/Masthead';
import Section from './widgets/Section';

const Glalie: React.FC<PageProps> = ({ page }) => {
  const isFirstPage = useMemo(() => page === 0, [page]);

  const layout: string[][] = useAppSelector((state) => state.resume.present.metadata.layout[page]);
  const primaryColor: string = useAppSelector((state) => get(state.resume.present, 'metadata.theme.primary'));

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.sidebar} style={{ backgroundColor: alpha(primaryColor, 0.15) }}>
          {isFirstPage && <MastheadSidebar />}

          {layout[1].map((key) => getSectionById(key, Section))}
        </div>
        <div className={styles.main}>
          {isFirstPage && <MastheadMain />}

          {layout[0].map((key) => getSectionById(key, Section))}
        </div>
      </div>
    </div>
  );
};

export default Glalie;
