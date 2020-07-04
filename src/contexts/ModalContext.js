import React, { createContext, useState } from "react";

const defaultState = {
  authModal: {
    isOpen: false,
    setOpen: () => {},
  },
  createResumeModal: {
    isOpen: false,
    setOpen: () => {},
    data: null,
    setData: () => {},
  },
};

const ModalContext = createContext(defaultState);

const ModalProvider = ({ children }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [createResumeOpen, setCreateResumeOpen] = useState(false);
  const [createResumeData, setCreateResumeData] = useState(null);

  return (
    <ModalContext.Provider
      value={{
        authModal: { isOpen: authOpen, setOpen: setAuthOpen },
        createResumeModal: {
          isOpen: createResumeOpen,
          setOpen: setCreateResumeOpen,
          data: createResumeData,
          setData: setCreateResumeData,
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;

export { ModalProvider };
