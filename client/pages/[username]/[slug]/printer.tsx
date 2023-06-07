import clsx from 'clsx';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { Resume } from 'schema';

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
  locale: string;
  redirect?: any;
};

export const getServerSideProps: GetServerSideProps<Props | Promise<Props>, QueryParams> = async ({
  query,
  locale = 'en',
}) => {
  const { username, slug, secretKey } = query as QueryParams;

  try {
    if (isEmpty(secretKey)) throw new Error('There is no secret key!');

    const resume = await fetchResumeByIdentifier({ username, slug, options: { secretKey } });
    const displayLocale = get(resume, 'metadata.locale') ?? locale;

    return {
      props: {
        resume,
        locale: displayLocale,
        ...(await serverSideTranslations(displayLocale, ['common'])),
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};

const Printer: NextPage<Props> = ({ resume: initialData, locale }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const resume = useAppSelector((state) => state.resume.present);

  useEffect(() => {
    if (router.locale !== locale) {
      const { pathname, asPath, query } = router;

      router.push({ pathname, query }, asPath, { locale });
    }
  }, [router, locale]);

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
