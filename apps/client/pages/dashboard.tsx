import { Add, ImportExport } from '@mui/icons-material';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery } from 'react-query';

import { RESUMES_QUERY } from '@/constants/index';
import i18nConfig from '@/i18n/index';
import { fetchResumes } from '@/services/resume';
import styles from '@/styles/pages/Dashboard.module.scss';

const ResumeCard = dynamic(() => import('@/components/dashboard/ResumeCard'));
const ResumePreview = dynamic(() => import('@/components/dashboard/ResumePreview'));
const Avatar = dynamic(() => import('@/components/shared/Avatar'));
const Logo = dynamic(() => import('@/components/shared/Logo'));

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'modals', 'dashboard'], i18nConfig)),
    },
  };
}

const Dashboard: NextPage = () => {
  const { t } = useTranslation();

  const { data } = useQuery(RESUMES_QUERY, fetchResumes);

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
          <a>
            <Logo size={40} />
          </a>
        </Link>

        <Avatar size={40} />
      </header>

      <main className={styles.resumes}>
        <ResumeCard
          modal="dashboard.create-resume"
          icon={Add}
          title={t('dashboard.create-resume.title')}
          subtitle={t('dashboard.create-resume.subtitle')}
        />

        <ResumeCard
          modal="dashboard.import-external"
          icon={ImportExport}
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
