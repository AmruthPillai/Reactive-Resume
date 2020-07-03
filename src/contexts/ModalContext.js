import React, { createContext, useState } from "react";

const defaultState = {
  authModal: {},
};

const ModalContext = createContext(defaultState);

const ModalProvider = ({ children }) => {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        authModal: { isOpen: authOpen, setOpen: setAuthOpen },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;

export { ModalProvider };
