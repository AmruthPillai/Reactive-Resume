import { Link as LinkIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Footer from '@/components/shared/Footer';
import Logo from '@/components/shared/Logo';
import NoSSR from '@/components/shared/NoSSR';
import { screenshots } from '@/config/screenshots';
import { logout } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import styles from '@/styles/pages/Home.module.scss';

import { DONATION_URL, GITHUB_URL } from '../constants';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'modals', 'landing'])),
    },
  };
};

const Home: NextPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const handleLogin = () => dispatch(setModalState({ modal: 'auth.login', state: { open: true } }));

  const handleRegister = () => dispatch(setModalState({ modal: 'auth.register', state: { open: true } }));

  const handleLogout = () => dispatch(logout());

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo size={256} />
        </div>

        <div className={styles.main}>
          <h1>{t('common.title')}</h1>

          <h2>{t('common.subtitle')}</h2>

          <NoSSR>
            <div className={styles.buttonWrapper}>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" passHref>
                    <Button>{t('landing.actions.app')}</Button>
                  </Link>

                  <Button variant="outlined" onClick={handleLogout}>
                    {t('landing.actions.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleLogin}>{t('landing.actions.login')}</Button>

                  <Button variant="outlined" onClick={handleRegister}>
                    {t('landing.actions.register')}
                  </Button>
                </>
              )}
            </div>
          </NoSSR>
        </div>
      </div>

      <section className={styles.section}>
        <h6>{t('landing.summary.heading')}</h6>

        <p>{t('landing.summary.body')}</p>
      </section>

      <section className={styles.section}>
        <h6>{t('landing.features.heading')}</h6>

        <ul className="list-inside list-disc leading-loose">
          <li>{t('landing.features.list.free')}</li>
          <li>{t('landing.features.list.tracking')}</li>
          <li>{t('landing.features.list.ads')}</li>
          <li>{t('landing.features.list.languages')}</li>
          <li>{t('landing.features.list.import')}</li>
          <li>{t('landing.features.list.export')}</li>
          <li>
            <Trans t={t} i18nKey="landing.features.list.more">
              And a lot of exciting features,
              <a href={`${GITHUB_URL}#features`} target="_blank" rel="noreferrer">
                click here to know more
              </a>
            </Trans>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h6>{t('landing.screenshots.heading')}</h6>

        <div className={styles.screenshots}>
          {screenshots.map(({ src, alt }) => (
            <a key={src} href={src} className={styles.image} target="_blank" rel="noreferrer">
              <Image src={src} alt={alt} layout="fill" objectFit="cover" />
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h6>{t('landing.links.heading')}</h6>

        <div>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            <Button variant="text" startIcon={<LinkIcon />}>
              {t('landing.links.links.github')}
            </Button>
          </a>

          <a href={DONATION_URL} target="_blank" rel="noreferrer">
            <Button variant="text" startIcon={<LinkIcon />}>
              {t('landing.links.links.donate')}
            </Button>
          </a>
        </div>
      </section>

      <footer>
        <Footer className="font-semibold leading-5 opacity-50" />

        <div>v{process.env.appVersion}</div>
      </footer>
    </main>
  );
};

export default Home;
