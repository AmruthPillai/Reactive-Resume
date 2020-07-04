import React, { useState, useContext, Fragment } from "react";
import BaseModal from "./BaseModal";
import Button from "../components/shared/Button";
import ModalContext from "../contexts/ModalContext";
import UserContext from "../contexts/UserContext";
import { navigate } from "gatsby";

const AuthModal = () => {
  const [isLoading, setLoading] = useState(false);
  const { authModal } = useContext(ModalContext);
  const { user, loginWithGoogle, logout } = useContext(UserContext);

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
  };

  const handleGotoApp = () => {
    navigate("/app/dashboard");
    authModal.setOpen(false);
  };

  const getTitle = () =>
    user ? `Welcome, ${user.displayName}` : "Who are you?";

  const getMessage = () =>
    user
      ? `Awesome. Now that you've authenticated yourself, we can get on with the real reason you're here. Click on the Go to App button to start building your resume!`
      : `Reactive Resume needs to know who you are so it can securely authenticate you into the app and show you only your information. Once you are in, you can start building your resume, editing it to add new skills or sharing it with the world!`;

  const loggedInAction = (
    <Fragment>
      <Button outline className="mr-8" title="Logout" onClick={logout} />
      <Button title="Go to App" onClick={handleGotoApp} />
    </Fragment>
  );

  const loggedOutAction = (
    <Button
      isLoading={isLoading}
      title="Sign in with Google"
      onClick={handleSignInWithGoogle}
    />
  );

  return (
    <BaseModal
      state={authModal}
      title={getTitle()}
      action={user ? loggedInAction : loggedOutAction}
    >
      <p>{getMessage()}</p>
    </BaseModal>
  );
};

export default AuthModal;
