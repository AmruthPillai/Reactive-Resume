import { navigate } from 'gatsby';
import React, { memo, useContext } from 'react';
import TypeIt from 'typeit-react';
import { Link } from '@reach/router';
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
        <Logo className="shadow-lg" size="256px" />
      </Link>

      <div className="mt-12 md:mt-0 md:ml-12">
        <div className="text-5xl font-bold">
          <TypeIt
            getBeforeInit={(instance) => {
              return instance
                .type('Creative Resume')
                .pause(500)
                .move(-11)
                .delete(4)
                .pause(250)
                .type('Reac')
                .move('END');
            }}
          />
        </div>
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
