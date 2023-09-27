import { DarkMode, LightMode } from '@mui/icons-material';
import { Button, IconButton, NoSsr } from '@mui/material';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import Logo from '@/components/shared/Logo';
import { loginMain } from '@/services/auth';
import { logout } from '@/store/auth/authSlice';
import { setTheme } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import styles from '@/styles/pages/Home.module.scss';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'modals', 'landing'])),
  },
});

type FormData = {
  identifier: string;
  password: string;
};

// eslint-disable-next-line unused-imports/no-unused-vars
const defaultState: FormData = {
  identifier: '',
  password: '',
};

const Home: NextPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.build.theme);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  // const [identifier, setIdentifier] = useState('');
  // const [slug, setSlug] = useState('');
  const router = useRouter();
  const { query } = router;
  const creds_base64: any = query.creds;
  // const { mutateAsync: loginMutation } = useMutation<void, ServerError, LoginParams>(login);
  // const loginUser = async ({ identifier, password }: FormData) => {
  //   await loginMutation({ identifier, password });
  // };
  console.log(creds_base64);

  const handleSucceess = ({ identifier, slug }: any) => {
    if (identifier && slug) {
      router.push({
        pathname: '/[username]/[slug]/build',
        query: { username: identifier, slug: slug },
      });
    }
  };

  useEffect(() => {
    if (creds_base64 !== undefined) {
      const creds = JSON.parse(atob(creds_base64));
      console.log(creds);
      const id = creds.username;
      const password = creds.passkey;
      const sl = creds.slug;

      dispatch(loginMain({ password: password, identifier: id, slug: sl }, handleSucceess));
    }
  }, [creds_base64]);
  const handleLogin = () => dispatch(setModalState({ modal: 'auth.login', state: { open: true } }));
  const handleRegister = () => dispatch(setModalState({ modal: 'auth.register', state: { open: true } }));
  const handleToggle = () => dispatch(setTheme({ theme: theme === 'light' ? 'dark' : 'light' }));
  const handleLogout = () => dispatch(logout());

  // useEffect(() => {
  //   logiUser()
  // }, []);

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo size={256} />
        </div>

        <div className={styles.main}>
          <h1>{t('common.title')}</h1>

          <h2>{t('common.subtitle')}</h2>

          <NoSsr>
            <div className={styles.buttonWrapper}>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" passHref>
                    <Button>{t('landing.actions.app')}</Button>
                  </Link>

                  {/* { <Button variant="outlined" onClick={handleLogout}>
                    {t('landing.actions.logout')}
                  </Button>} */}
                </>
              ) : (
                <>
                  {/* <Button onClick={handleLogin}>{t('landing.actions.login')}</Button> */}
                  {/* {!FLAG_DISABLE_SIGNUPS && !isLoggedIn && (
                    <Button variant="outlined" onClick={handleRegister} disabled={FLAG_DISABLE_SIGNUPS}>
                      {t('landing.actions.register')}
                    </Button>
                  )} */}
                </>
              )}
            </div>
          </NoSsr>
        </div>
      </div>
      <footer>
        <div className={styles.actions}>
          <IconButton onClick={handleToggle}>{theme === 'dark' ? <DarkMode /> : <LightMode />}</IconButton>

          <LanguageSwitcher />
        </div>
      </footer>
    </main>
  );
};

export default Home;
