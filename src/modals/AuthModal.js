import { navigate } from 'gatsby';
import React, { memo, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/shared/Button';
import ModalContext from '../contexts/ModalContext';
import UserContext from '../contexts/UserContext';
import BaseModal from './BaseModal';

const AuthModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isLoadingGoogle, setLoadingGoogle] = useState(false);
  const [isLoadingAnonymous, setLoadingAnonymous] = useState(false);

  const { emitter, events } = useContext(ModalContext);
  const { user, loginWithGoogle, loginAnonymously, logout } = useContext(
    UserContext,
  );

  useEffect(() => {
    const unbind = emitter.on(events.AUTH_MODAL, () => setOpen(true));

    return () => unbind();
  }, [emitter, events]);

  const handleSignInWithGoogle = async () => {
    setLoadingGoogle(true);
    await loginWithGoogle();
    setLoadingGoogle(false);
  };

  const handleSignInAnonymously = async () => {
    setLoadingAnonymous(true);
    await loginAnonymously();
    setLoadingAnonymous(false);
  };

  const handleGotoApp = () => {
    navigate('/app/dashboard');
    setOpen(false);
  };

  const getTitle = () =>
    user
      ? t('modals.auth.welcome', { name: user.displayName || 'Agent 47' })
      : t('modals.auth.whoAreYou');

  const getMessage = () =>
    user ? t('modals.auth.loggedInText') : t('modals.auth.loggedOutText');

  const loggedInAction = (
    <>
      <Button outline className="mr-8" onClick={logout}>
        {t('shared.buttons.logout')}
      </Button>
      <Button title="" onClick={handleGotoApp}>
        {t('landing.hero.goToApp')}
      </Button>
    </>
  );

  const loggedOutAction = (
    <div className="flex">
      <Button isLoading={isLoadingGoogle} onClick={handleSignInWithGoogle}>
        {t('modals.auth.buttons.google')}
      </Button>
      <Button
        className="ml-8"
        isLoading={isLoadingAnonymous}
        onClick={handleSignInAnonymously}
      >
        {t('modals.auth.buttons.anonymous')}
      </Button>
    </div>
  );

  return (
    <BaseModal
      title={getTitle()}
      state={[open, setOpen]}
      action={user ? loggedInAction : loggedOutAction}
    >
      <p className="leading-loose">{getMessage()}</p>
    </BaseModal>
  );
};

export default memo(AuthModal);
