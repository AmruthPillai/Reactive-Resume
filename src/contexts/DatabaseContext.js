import firebase from 'gatsby-plugin-firebase';
import { debounce } from 'lodash';
import ShortUniqueId from 'short-unique-id';
import React, { createContext, memo, useContext, useState } from 'react';
import UserContext from './UserContext';
import initialState from '../data/initialState.json';
import { getUnsplashPhoto } from '../utils';

const DEBOUNCE_WAIT_TIME = 4000;

const defaultState = {
  isUpdating: false,
  createResume: async () => {},
  duplicateResume: async () => {},
  deleteResume: () => {},
  getResume: async () => {},
  getResumes: async () => {},
  updateResume: async () => {},
  debouncedUpdateResume: async () => {},
};

const DatabaseContext = createContext(defaultState);

const DatabaseProvider = ({ children }) => {
  const dictionary = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  const uuid = new ShortUniqueId({ dictionary });

  const [isUpdating, setUpdating] = useState(false);
  const { user } = useContext(UserContext);

  const getResume = async (id) => {
    try {
      const snapshot = await firebase
        .database()
        .ref(`resumes/${id}`)
        .once('value');
      return snapshot.val();
    } catch (error) {
      return null;
    }
  };

  const createResume = async ({ name }) => {
    const id = uuid();
    const preview = await getUnsplashPhoto();
    const createdAt = firebase.database.ServerValue.TIMESTAMP;

    let firstName;
    let lastName;

    if (!user.isAnonymous) {
      [firstName, lastName] = user.displayName.split(' ');
    }

    const resume = {
      ...initialState,
      id,
      name,
      user: user.uid,
      preview,
      profile: {
        ...initialState.profile,
        firstName: firstName || '',
        lastName: lastName || '',
      },
      createdAt,
      updatedAt: createdAt,
    };

    firebase.database().ref(`resumes/${id}`).set(resume);
  };

  const duplicateResume = async (originalResume) => {
    const id = uuid();
    const preview = await getUnsplashPhoto();
    const createdAt = firebase.database.ServerValue.TIMESTAMP;

    const resume = {
      ...originalResume,
      id,
      name: `${originalResume.name} Copy`,
      preview,
      createdAt,
      updatedAt: createdAt,
    };

    firebase.database().ref(`resumes/${id}`).set(resume);
  };

  const updateResume = async (resume) => {
    setUpdating(true);

    await firebase
      .database()
      .ref(`resumes/${resume.id}`)
      .update({
        ...resume,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      });

    setUpdating(false);
  };

  const debouncedUpdateResume = debounce(updateResume, DEBOUNCE_WAIT_TIME);

  const deleteResume = async (id) => {
    await firebase.database().ref(`/resumes/${id}`).remove();
  };

  return (
    <DatabaseContext.Provider
      value={{
        isUpdating,
        getResume,
        createResume,
        duplicateResume,
        updateResume,
        deleteResume,
        debouncedUpdateResume,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContext;

const memoizedProvider = memo(DatabaseProvider);

export { memoizedProvider as DatabaseProvider };
