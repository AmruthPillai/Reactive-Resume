import React, { useState, useContext, Fragment } from "react";
import BaseModal from "./BaseModal";
import Button from "../components/shared/Button";
import ModalContext from "../contexts/ModalContext";
import UserContext from "../contexts/UserContext";

const AuthModal = () => {
  const [isLoading, setLoading] = useState(false);
  const { authModal } = useContext(ModalContext);
  const { user, loginWithGoogle, logout } = useContext(UserContext);

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
  };

  const handleGoToApp = () => {
    console.log("Go to App");
  };

  const loggedInAction = (
    <Fragment>
      <Button className="mr-6" title="Go to App" onClick={handleGoToApp} />
      <Button title="Logout" onClick={logout} />
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
      title="Who are you?"
      action={user ? loggedInAction : loggedOutAction}
    >
      <p>
        Reactive Resume needs to know who you are so it can securely
        authenticate you into the app and show you only your information. Once
        you are in, you can start building your resume, editing it to add new
        skills or sharing it with the world!
      </p>
    </BaseModal>
  );
};

export default AuthModal;
