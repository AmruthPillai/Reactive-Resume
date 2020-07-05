import { set } from "lodash";
import React, { createContext, useContext, useReducer } from "react";
import DatabaseContext from "./DatabaseContext";

const ResumeContext = createContext({});

const ResumeProvider = ({ children }) => {
  const { updateResume } = useContext(DatabaseContext);

  const [state, dispatch] = useReducer((state, { type, payload }) => {
    let newState;

    switch (type) {
      case "on_input":
        newState = set({ ...state }, payload.path, payload.value);
        updateResume(newState);
        return newState;
      case "set_data":
        return payload;
      default:
        throw new Error();
    }
  }, {});

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeContext;

export { ResumeProvider };
