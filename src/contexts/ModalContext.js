import { createNanoEvents } from "nanoevents";
import React, { createContext } from "react";
import ModalEvents from "../constants/ModalEvents";

const emitter = createNanoEvents();

const defaultState = { events: ModalEvents, emitter };

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
