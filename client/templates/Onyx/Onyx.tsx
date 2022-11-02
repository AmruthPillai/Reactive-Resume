import { useMemo } from 'react';

import Markdown from '@/components/shared/Markdown';
import { useAppSelector } from '@/store/hooks';
import { PageProps } from '@/utils/template';

import { getSectionById } from '../sectionMap';
import styles from './Onyx.module.scss';
import Masthead from './widgets/Masthead';
import Section from './widgets/Section';

const Onyx: React.FC<PageProps> = ({ page }) => {
  const isFirstPage = useMemo(() => page === 0, [page]);

  const { summary } = useAppSelector((state) => state.resume.present.basics);
  const layout: string[][] = useAppSelector((state) => state.resume.present.metadata.layout[page]);

  return (
    <div className={styles.page}>
      {isFirstPage && (
        <div className="mb-4 grid gap-4 border-b pb-4">
          <Masthead />
          <Markdown>{summary}</Markdown>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.main}>{layout[0].map((key) => getSectionById(key, Section))}</div>
        <div className={styles.sidebar}>{layout[1].map((key) => getSectionById(key, Section))}</div>
      </div>
    </div>
  );
};

export default Onyx;
