import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { PageProps } from '@/utils/template';

import { getSectionById } from '../sectionMap';
import styles from './Leafish.module.scss';
import Masthead from './widgets/Masthead';
import Section from './widgets/Section';

const Leafish: React.FC<PageProps> = ({ page }) => {
  const isFirstPage = useMemo(() => page === 0, [page]);

  const layout: string[][] = useAppSelector((state) => state.resume.present.metadata.layout[page]);

  return (
    <div className={styles.page}>
      {isFirstPage && <Masthead />}

      <div className={styles.container}>
        <div className={styles.main}>{layout[0].map((key) => getSectionById(key, Section))}</div>
        <div className={styles.sidebar}>{layout[1].map((key) => getSectionById(key, Section))}</div>
      </div>
    </div>
  );
};

export default Leafish;
