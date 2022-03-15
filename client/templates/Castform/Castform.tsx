import { css } from '@emotion/css';
import { Theme } from '@reactive-resume/schema';
import clsx from 'clsx';
import get from 'lodash/get';
import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { getContrastColor } from '@/utils/styles';
import { PageProps } from '@/utils/template';

import { getSectionById } from '../sectionMap';
import styles from './Castform.module.scss';
import { MastheadMain, MastheadSidebar } from './widgets/Masthead';
import Section from './widgets/Section';

const Castform: React.FC<PageProps> = ({ page }) => {
  const isFirstPage = useMemo(() => page === 0, [page]);

  const layout: string[][] = useAppSelector((state) => state.resume.metadata.layout[page]);
  const theme: Theme = useAppSelector((state) => get(state.resume, 'metadata.theme', {}));

  const contrast = useMemo(() => getContrastColor(theme.primary), [theme.primary]);
  const color = useMemo(() => (contrast === 'dark' ? theme.text : theme.background), [theme, contrast]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div
          className={clsx(styles.sidebar, css(`svg { color: ${color} } --primary-color: ${color}`))}
          style={{ color, backgroundColor: theme.primary, wordBreak: 'break-word' }}
        >
          {isFirstPage && <MastheadSidebar />}

          <div className={styles.inner}>{layout[1].map((key) => getSectionById(key, Section))}</div>
        </div>
        <div className={styles.main}>
          <div className={styles.firstPage}>{isFirstPage && <MastheadMain />}</div>

          <div className={styles.inner}>{layout[0].map((key) => getSectionById(key, Section))}</div>
        </div>
      </div>
    </div>
  );
};

export default Castform;
