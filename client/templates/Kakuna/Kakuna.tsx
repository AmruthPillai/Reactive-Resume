import { useMemo } from 'react';

import Markdown from '@/components/shared/Markdown';
import { useAppSelector } from '@/store/hooks';
import { PageProps } from '@/utils/template';

import { getSectionById } from '../sectionMap';
import styles from './Kakuna.module.scss';
import Masthead from './widgets/Masthead';
import Section from './widgets/Section';

const Kakuna: React.FC<PageProps> = ({ page }) => {
  const isFirstPage = useMemo(() => page === 0, [page]);

  const { summary } = useAppSelector((state) => state.resume.present.basics);
  const layout: string[][] = useAppSelector((state) => state.resume.present.metadata.layout[page]);

  return (
    <div className={styles.page}>
      {isFirstPage && (
        <>
          <Masthead />
          <Markdown className="mb-2 text-center">{summary}</Markdown>
        </>
      )}

      <div className={styles.container}>
        <div className={styles.main}>{layout[0].map((key) => getSectionById(key, Section))}</div>
        <div className={styles.sidebar}>{layout[1].map((key) => getSectionById(key, Section))}</div>
      </div>
    </div>
  );
};

export default Kakuna;
