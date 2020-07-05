import { set } from "lodash";
import React, { createContext, useReducer } from "react";

const initialState = {
  profile: {
    photograph: "",
    firstName: "",
    lastName: "",
  },
};

const ResumeContext = createContext(initialState);

const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, { type, payload }) => {
    switch (type) {
      case "on_input":
        return set({ ...state }, payload.path, payload.value);
      default:
        throw new Error();
    }
  }, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeContext;

export { ResumeProvider };
