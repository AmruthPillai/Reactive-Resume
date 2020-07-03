import React from "react";
import BaseModal from "./BaseModal";
import Button from "../components/shared/Button";

const AuthModal = ({ state }) => {
  return (
    <BaseModal state={state} title="Who are you?" action={action}>
      <p>
        Reactive Resume needs to know who you are so it can securely
        authenticate you into the app and show you only your information. Once
        you are in, you can start building your resume, editing it to add new
        skills or sharing it with the world!
      </p>
    </BaseModal>
  );
};

const action = <Button title="Sign in with Google" />;

export default AuthModal;
