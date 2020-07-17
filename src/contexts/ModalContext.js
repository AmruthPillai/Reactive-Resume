import { createNanoEvents } from 'nanoevents';
import React, { createContext, memo } from 'react';
import ModalEvents from '../constants/ModalEvents';

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

const memoizedProvider = memo(ModalProvider);

export { memoizedProvider as ModalProvider };
