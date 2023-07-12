import { Add, ImportExport } from '@mui/icons-material';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { ActionCreators } from 'redux-undo';

import ResumeCard from '@/components/dashboard/ResumeCard';
import ResumePreview from '@/components/dashboard/ResumePreview';
import Avatar from '@/components/shared/Avatar';
import Logo from '@/components/shared/Logo';
import { RESUMES_QUERY } from '@/constants/index';
import { fetchResumes } from '@/services/resume';
import { useAppDispatch } from '@/store/hooks';
import styles from '@/styles/pages/Dashboard.module.scss';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'modals', 'dashboard'])),
  },
});

const Dashboard: NextPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { data } = useQuery(RESUMES_QUERY, fetchResumes);

  useEffect(() => {
    dispatch(ActionCreators.clearHistory());
  }, []);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {t('dashboard.title')} | {t('common.title')}
        </title>
      </Head>

      <header>
        <Link href="/">
          <Logo size={40} />
        </Link>

        <Avatar size={40} />
      </header>

      <main className={styles.resumes}>
        <ResumeCard
          icon={Add}
          modal="dashboard.create-resume"
          title={t('dashboard.create-resume.title')}
          subtitle={t('dashboard.create-resume.subtitle')}
        />

        <ResumeCard
          icon={ImportExport}
          modal="dashboard.import-external"
          title={t('dashboard.import-external.title')}
          subtitle={t('dashboard.import-external.subtitle')}
        />

        {data.map((resume) => (
          <ResumePreview key={resume.id} resume={resume} />
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
