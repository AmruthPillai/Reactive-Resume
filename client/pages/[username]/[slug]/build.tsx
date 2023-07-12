import isEmpty from 'lodash/isEmpty';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Resume } from 'schema';

import Center from '@/components/build/Center/Center';
import LeftSidebar from '@/components/build/LeftSidebar/LeftSidebar';
import RightSidebar from '@/components/build/RightSidebar/RightSidebar';
import { fetchResumeByIdentifier } from '@/services/resume';
import { useAppDispatch } from '@/store/hooks';
import { setResume } from '@/store/resume/resumeSlice';
import styles from '@/styles/pages/Build.module.scss';

type QueryParams = {
  username: string;
  slug: string;
};

type Props = {
  username: string;
  slug: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, locale = 'en' }) => {
  const { username, slug } = query as QueryParams;

  return {
    props: { username, slug, ...(await serverSideTranslations(locale, ['common', 'modals', 'builder'])) },
  };
};

const Build: NextPage<Props> = ({ username, slug }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { data: resume } = useQuery<Resume>(
    `resume/${username}/${slug}`,
    () => fetchResumeByIdentifier({ username, slug }),
    {
      onSuccess: (resume) => {
        dispatch(setResume(resume));
      },
    },
  );

  useEffect(() => {
    if (resume) dispatch(setResume(resume));
  }, [resume, dispatch]);

  if (!resume || isEmpty(resume)) return null;

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
