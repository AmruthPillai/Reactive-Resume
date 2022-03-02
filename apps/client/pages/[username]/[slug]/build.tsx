import { Resume } from '@reactive-resume/schema';
import isEmpty from 'lodash/isEmpty';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import i18nConfig from 'next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { fetchResumeByIdentifier } from '@/services/resume';
import { useAppDispatch } from '@/store/hooks';
import { setResume } from '@/store/resume/resumeSlice';
import styles from '@/styles/pages/Build.module.scss';

const Center = dynamic(() => import('@/components/build/Center/Center'));
const LeftSidebar = dynamic(() => import('@/components/build/LeftSidebar/LeftSidebar'));
const RightSidebar = dynamic(() => import('@/components/build/RightSidebar/RightSidebar'));

type QueryParams = {
  username: string;
  slug: string;
};

type Props = {
  username: string;
  slug: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, locale }) => {
  const { username, slug } = query as QueryParams;

  return {
    props: { username, slug, ...(await serverSideTranslations(locale, ['common', 'modals', 'builder'], i18nConfig)) },
  };
};

const Build: NextPage<Props> = ({ username, slug }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { data: resume } = useQuery<Resume>(
    `resume/${username}/${slug}`,
    () => fetchResumeByIdentifier({ username, slug }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: (resume) => {
        dispatch(setResume(resume));
      },
    }
  );

  useEffect(() => {
    if (resume) dispatch(setResume(resume));
  }, [resume, dispatch]);

  if (isEmpty(resume)) return null;

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {resume.name} | {t('common.title')}
        </title>
      </Head>

      <LeftSidebar />
      <Center />
      <RightSidebar />
    </div>
  );
};

export default Build;
