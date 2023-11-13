'use client';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import Page from '@/components/build/Center/Page';
import { useAppSelector } from '@/store/hooks';

import styles from './Preview.module.scss';

const Preview = () => {
  const resume = useAppSelector((state) => state.resume.present);

  if (isEmpty(resume)) return null;

  const layout: string[][][] = get(resume, 'metadata.layout', []);

  return (
    <div className={styles.container}>
      {layout.map((_, pageIndex) => (
        <Page key={pageIndex} page={pageIndex} />
      ))}
    </div>
  );
};

export default Preview;
