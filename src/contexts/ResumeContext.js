import firebase from "gatsby-plugin-firebase";
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { transformCollectionSnapshot } from "../utils";
import UserContext from "./UserContext";

const defaultState = {
  resumes: [],
  createResume: async () => {},
};

const ResumeContext = createContext(defaultState);

const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([null]);
  const [collectionRef, setCollectionRef] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setCollectionRef(`users/${user.uid}/resumes`);
    }
  }, [user]);

  useEffect(() => {
    if (collectionRef) {
      firebase
        .firestore()
        .collection(collectionRef)
        .onSnapshot((snapshot) =>
          transformCollectionSnapshot(snapshot, setResumes)
        );
    }
  }, [collectionRef]);

  const createResume = async ({ name }) => {
    const id = uuidv4();
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    await firebase.firestore().collection(collectionRef).doc(id).set({
      id,
      name,
      createdAt,
      updatedAt: createdAt,
    });
  };

  const updateResume = async (resume) => {
    const { id, name } = resume;

    if (resumes.find((x) => x.id === id) === resume) return;

    await firebase.firestore().collection(collectionRef).doc(id).update({
      id,
      name,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        createResume,
        updateResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeContext;

export { ResumeProvider };
