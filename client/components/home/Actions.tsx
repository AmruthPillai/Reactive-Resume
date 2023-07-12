import { Button } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { FLAG_DISABLE_SIGNUPS } from '@/constants/flags';
import { logout } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

const HomeActions = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const handleLogin = () => dispatch(setModalState({ modal: 'auth.login', state: { open: true } }));
  const handleRegister = () => dispatch(setModalState({ modal: 'auth.register', state: { open: true } }));
  const handleLogout = () => dispatch(logout());

  return isLoggedIn ? (
    <>
      <Link href="/dashboard" passHref>
        <Button size="large">{t('landing.actions.app')}</Button>
      </Link>

      <Button size="large" variant="outlined" onClick={handleLogout}>
        {t('landing.actions.logout')}
      </Button>
    </>
  ) : (
    <>
      <Button size="large" onClick={handleLogin}>
        {t('landing.actions.login')}
      </Button>

      <Button size="large" variant="outlined" onClick={handleRegister} disabled={FLAG_DISABLE_SIGNUPS}>
        {t('landing.actions.register')}
      </Button>
    </>
  );
};

export default HomeActions;
