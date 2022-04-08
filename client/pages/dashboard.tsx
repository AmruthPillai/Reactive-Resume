import { Add, ImportExport } from '@mui/icons-material';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery } from 'react-query';

import ResumeCard from '@/components/dashboard/ResumeCard';
import ResumePreview from '@/components/dashboard/ResumePreview';
import Avatar from '@/components/shared/Avatar';
import Logo from '@/components/shared/Logo';
import { RESUMES_QUERY } from '@/constants/index';
import { fetchResumes } from '@/services/resume';
import styles from '@/styles/pages/Dashboard.module.scss';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'modals', 'dashboard'])),
    },
  };
};

const Dashboard: NextPage = () => {
  const { t } = useTranslation();

  const { data } = useQuery(RESUMES_QUERY, fetchResumes);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {t<string>('dashboard.title')} | {t<string>('common.title')}
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
          title={t<string>('dashboard.create-resume.title')}
          subtitle={t<string>('dashboard.create-resume.subtitle')}
        />

        <ResumeCard
          modal="dashboard.import-external"
          icon={ImportExport}
          title={t<string>('dashboard.import-external.title')}
          subtitle={t<string>('dashboard.import-external.subtitle')}
        />

        {data.map((resume) => (
          <ResumePreview key={resume.id} resume={resume} />
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
