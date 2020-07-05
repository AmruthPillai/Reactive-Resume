import firebase from "gatsby-plugin-firebase";
import { debounce } from "lodash";
import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UserContext from "./UserContext";

const defaultState = {
  isUpdating: false,
  getResume: async () => {},
  createResume: () => {},
  updateResume: async () => {},
  deleteResume: () => {},
};

const DatabaseContext = createContext(defaultState);

const DatabaseProvider = ({ children }) => {
  const [isUpdating, setUpdating] = useState(false);
  const { user } = useContext(UserContext);

  const getResume = async (id) => {
    const snapshot = await firebase
      .database()
      .ref(`users/${user.uid}/resumes/${id}`)
      .once("value");
    return snapshot.val();
  };

  const createResume = (resume) => {
    const id = uuidv4();
    const createdAt = firebase.database.ServerValue.TIMESTAMP;

    firebase
      .database()
      .ref(`users/${user.uid}/resumes/${id}`)
      .set({
        id,
        ...resume,
        createdAt,
        updatedAt: createdAt,
      });
  };

  const updateResume = async (resume) => {
    const { id } = resume;

    setUpdating(true);

    await firebase
      .database()
      .ref(`users/${user.uid}/resumes/${id}`)
      .update({
        ...resume,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      });

    setUpdating(false);
  };

  const debouncedUpdate = debounce(updateResume, 2000);

  const deleteResume = (id) => {
    firebase.database().ref(`users/${user.uid}/resumes/${id}`).remove();
  };

  return (
    <DatabaseContext.Provider
      value={{
        isUpdating,
        getResume,
        createResume,
        updateResume: debouncedUpdate,
        deleteResume,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContext;

export { DatabaseProvider };
