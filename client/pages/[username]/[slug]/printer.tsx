import { Resume } from '@reactive-resume/schema';
import clsx from 'clsx';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';

import Page from '@/components/build/Center/Page';
import { fetchResumeByIdentifier } from '@/services/resume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResume } from '@/store/resume/resumeSlice';
import styles from '@/styles/pages/Printer.module.scss';

type QueryParams = {
  slug: string;
  username: string;
  secretKey?: string;
};

type Props = {
  resume?: Resume;
  redirect?: any;
};

export const getServerSideProps: GetServerSideProps<Props | Promise<Props>, QueryParams> = async ({ query }) => {
  const { username, slug, secretKey } = query as QueryParams;

  try {
    if (isEmpty(secretKey)) throw new Error('There is no secret key!');

    const resume = await fetchResumeByIdentifier({ username, slug, options: { secretKey } });

    return { props: { resume } };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};

const Printer: NextPage<Props> = ({ resume: initialData }) => {
  const dispatch = useAppDispatch();

  const resume = useAppSelector((state) => state.resume);

  useEffect(() => {
    if (initialData) dispatch(setResume(initialData));
  }, [dispatch, initialData]);

  if (!resume || isEmpty(resume)) return null;

  const layout: string[][][] = get(resume, 'metadata.layout', []);

  return (
    <div className={clsx('printer-mode', styles.container)}>
      {layout.map((_, pageIndex) => (
        <Page key={pageIndex} page={pageIndex} />
      ))}
    </div>
  );
};

export default Printer;
