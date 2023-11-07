'use client';
import isEmpty from 'lodash/isEmpty';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { createContext, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Resume } from 'schema';

import RightSidebar from '@/components/build/RightSidebar/RightSidebar';
import Center from '@/components/resume/Center/Center';
import LeftSidebar from '@/components/resume/LeftSidebar/LeftSidebar';
import { fetchResumeByIdentifier } from '@/services/resume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResume } from '@/store/resume/resumeSlice';
import styles from '@/styles/pages/Build.module.scss';
import BuilderContext from '@/wrappers/BuilderContext';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'modals', 'builder'])),
  },
});

const Builder = () => {
  const { currentResume } = useAppSelector((state) => state.editor);
  const { username, slug } = currentResume;
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
    <BuilderContext>
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
    </BuilderContext>
  );
};

export default Builder;
