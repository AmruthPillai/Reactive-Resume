import { createNanoEvents } from "nanoevents";
import React, { createContext } from "react";

const MODAL_EVENTS = {
  AUTH_MODAL: "auth_modal",
  CREATE_RESUME_MODAL: "create_resume_modal",
  SOCIAL_MODAL: "social_modal",
  WORK_MODAL: "work_modal",
  EDUCATION_MODAL: "education_modal",
};

const emitter = createNanoEvents();

const defaultState = { events: MODAL_EVENTS, emitter };

const ModalContext = createContext(defaultState);

const ModalProvider = ({ children }) => {
  return (
    <ModalContext.Provider value={defaultState}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;

export { ModalProvider, MODAL_EVENTS };
