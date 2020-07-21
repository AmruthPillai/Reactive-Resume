import { Link } from '@reach/router';
import { navigate } from 'gatsby';
import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ModalContext from '../../contexts/ModalContext';
import UserContext from '../../contexts/UserContext';
import Button from '../shared/Button';
import Logo from '../shared/Logo';

const Hero = () => {
  const { t } = useTranslation();
  const { emitter, events } = useContext(ModalContext);
  const { user, loading } = useContext(UserContext);

  const handleLogin = () => emitter.emit(events.AUTH_MODAL);

  const handleGotoApp = () => navigate('/app/dashboard');

  return (
    <div className="flex flex-col md:flex-row items-center">
      <Link to="/">
        <span className="sr-only">Reactive Resume</span>
        <Logo className="shadow-lg" size="256px" />
      </Link>

      <div className="mt-12 md:mt-0 md:ml-12">
        <h1 className="text-5xl font-bold">{t('shared.appName')}</h1>
        <h2 className="mt-1 text-3xl text-primary-500">
          {t('shared.shortDescription')}
        </h2>

        <div className="mt-12">
          {user ? (
            <Button
              onClick={handleGotoApp}
              isLoading={loading}
              className="mx-auto md:mx-0"
            >
              {t('landing.hero.goToApp')}
            </Button>
          ) : (
            <Button
              onClick={handleLogin}
              isLoading={loading}
              className="mx-auto md:mx-0"
            >
              {t('shared.buttons.login')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
