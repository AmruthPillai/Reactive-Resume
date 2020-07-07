import { createNanoEvents } from "nanoevents";
import React, { createContext } from "react";

const events = {
  AUTH_MODAL: "auth_modal",
  CREATE_RESUME_MODAL: "create_resume_modal",
  SOCIAL_MODAL: "social_modal",
};

const emitter = createNanoEvents();

const defaultState = { events, emitter };

const ModalContext = createContext(defaultState);

const ModalProvider = ({ children }) => {
  return (
    <ModalContext.Provider value={defaultState}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;

export { ModalProvider };
