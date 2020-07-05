import { set } from "lodash";
import React, { createContext, useReducer } from "react";

const initialState = {
  id: "dafa3242-f39a-4755-bab3-be3c3ca3d190",
  profile: {
    photograph: "",
    firstName: "",
    lastName: "",
  },
  createdAt: "",
  updatedAt: "",
};

const ResumeContext = createContext(initialState);

const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, { type, payload }) => {
    switch (type) {
      case "on_input":
        return set({ ...state }, payload.path, payload.value);
      case "set_data":
        return payload;
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
