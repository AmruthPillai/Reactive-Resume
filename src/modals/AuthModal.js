import { navigate } from 'gatsby';
import React, { memo, useContext, useEffect, useState } from 'react';
import Button from '../components/shared/Button';
import ModalContext from '../contexts/ModalContext';
import UserContext from '../contexts/UserContext';
import BaseModal from './BaseModal';

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { emitter, events } = useContext(ModalContext);
  const { user, loginWithGoogle, logout } = useContext(UserContext);

  useEffect(() => {
    const unbind = emitter.on(events.AUTH_MODAL, () => setOpen(true));

    return () => unbind();
  }, [emitter, events]);

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
  };

  const handleGotoApp = () => {
    navigate('/app/dashboard');
    setOpen(false);
  };

  const getTitle = () =>
    user ? `Welcome, ${user.displayName}` : 'Who are you?';

  const getMessage = () =>
    user
      ? `Awesome. Now that you've authenticated yourself, we can get on with the real reason you're here. Click on the Go to App button to start building your resume!`
      : `Reactive Resume needs to know who you are so it can securely authenticate you into the app and show you only your information. Once you are in, you can start building your resume, editing it to add new skills or sharing it with the world!`;

  const loggedInAction = (
    <>
      <Button outline className="mr-8" onClick={logout}>
        Logout
      </Button>
      <Button title="" onClick={handleGotoApp}>
        Go to App
      </Button>
    </>
  );

  const loggedOutAction = (
    <Button isLoading={isLoading} onClick={handleSignInWithGoogle}>
      Sign in with Google
    </Button>
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
