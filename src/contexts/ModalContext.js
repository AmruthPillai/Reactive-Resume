import React, { createContext, useState } from "react";

const defaultState = {
  authModal: {},
  createResumeModal: {},
};

const ModalContext = createContext(defaultState);

const ModalProvider = ({ children }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [createResumeOpen, setCreateResumeOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        authModal: { isOpen: authOpen, setOpen: setAuthOpen },
        createResumeModal: {
          isOpen: createResumeOpen,
          setOpen: setCreateResumeOpen,
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;

export { ModalProvider };
