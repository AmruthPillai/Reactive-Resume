import { ArrowForward, DarkMode, LightMode } from '@mui/icons-material';
import { Button, IconButton, NoSsr } from '@mui/material';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import HomeTemplates from '@/components/build/RightSidebar/sections/HomeTemplates';
import { loginMain } from '@/services/auth';
import { fetchResumeByShortIdMain } from '@/services/resume';
import { logout } from '@/store/auth/authSlice';
import { setTheme } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import { setResume } from '@/store/resume/resumeSlice';
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
  const [slug, setSlug] = useState('');
  const [templateId, setTemplate] = useState('');
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

  const handleSucceess = ({ identifier, slug, shortId }: any) => {
    if (identifier && slug && shortId) {
      setSlug(slug);
      console.log(shortId);
      dispatch(fetchResumeByShortIdMain({ shortId: shortId }, handleResumeSuccess));
      // router.push({
      //   pathname: '/[username]/[slug]/build',
      //   query: { username: identifier, slug: slug },
      // });
    }
  };

  const handleResumeSuccess = (data: any) => {
    dispatch(setResume(data));
    setTemplate(data.metadata.template);
  };

  useEffect(() => {
    if (creds_base64 !== undefined) {
      const creds = JSON.parse(atob(creds_base64));
      console.log(creds);
      const id = creds.username;
      const password = creds.passkey;
      const sl = creds.slug;
      const short = creds.shortId;

      dispatch(loginMain({ password: password, identifier: id, slug: sl, shortId: short }, handleSucceess));
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
      <div className={styles.header} style={{ width: '100%', margin: '0 auto' }}>
        {/* <div className={styles.logo}>
          <Logo size={256} />
        </div> */}
        {isLoggedIn ? (
          <div className={styles.main}>
            <h1>{t('common.title')}</h1>

            <h2>Welcome to CVpap and thank you for trying our services. Before proceeding to edit your resume:-</h2>

            <h5>Kindly, select Resume Design from the list below that you would like to use in your resume</h5>
            <NoSsr>
              <div className={styles.buttonWrapper}>
                <>
                  <div style={{ width: '100%' }}>
                    <HomeTemplates setTemplate={setTemplate} currentTemplate={templateId} creds={{ slug: slug }} />
                  </div>
                </>
              </div>
            </NoSsr>
            <br />

            {templateId && (
              <Button variant="outlined" startIcon={<ArrowForward />} onClick={() => {}}>
                Edit Resume
              </Button>
            )}
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            {/* <HomeTemplates setTemplate={setTemplate} currentTemplate={templateId} creds={{ slug: slug }} /> */}
          </div>
        )}
      </div>

      <footer>
        <div className={styles.actions}>
          <IconButton onClick={handleToggle}>{theme === 'dark' ? <DarkMode /> : <LightMode />}</IconButton>
        </div>
      </footer>
    </main>
  );
};

export default Home;
