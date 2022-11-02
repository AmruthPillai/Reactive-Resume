import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { PageProps } from '@/utils/template';

import { getSectionById } from '../sectionMap';
import styles from './Pikachu.module.scss';
import { MastheadMain, MastheadSidebar } from './widgets/Masthead';
import Section from './widgets/Section';

const Pikachu: React.FC<PageProps> = ({ page }) => {
  const isFirstPage = useMemo(() => page === 0, [page]);
  const layout: string[][] = useAppSelector((state) => state.resume.present.metadata.layout[page]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
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

export default Pikachu;
