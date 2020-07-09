import firebase from 'gatsby-plugin-firebase';
import { debounce } from 'lodash';
import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';
import UserContext from './UserContext';

const DEBOUNCE_WAIT_TIME = 4000;

const defaultState = {
  isOffline: false,
  isUpdating: false,
  getResume: async () => {},
  getResumes: async () => {},
  createResume: () => {},
  updateResume: async () => {},
  debouncedUpdateResume: async () => {},
  debouncedUpdateMetadata: async () => {},
  deleteResume: () => {},
};

const DatabaseContext = createContext(defaultState);

const DatabaseProvider = ({ children }) => {
  const [isOffline, setOffline] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const connectedRef = firebase.database().ref('.info/connected');
    connectedRef.on('value', (snapshot) => {
      snapshot.val() === true ? setOffline(false) : setOffline(true);
    });
  }, []);

  const getResume = async (id) => {
    const snapshot = await firebase
      .database()
      .ref(`users/${user.uid}/resumes/${id}`)
      .once('value');
    return snapshot.val();
  };

  const createResume = (resume) => {
    const { id } = resume;
    const createdAt = firebase.database.ServerValue.TIMESTAMP;

    let firstName;
    let lastName;

    if (!user.isAnonymous) {
      [firstName, lastName] = user.displayName.split(' ');
    }

    firebase
      .database()
      .ref(`users/${user.uid}/resumes/${id}`)
      .set({
        profile: {
          firstName: firstName || '',
          lastName: lastName || '',
        },
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

  const debouncedUpdateResume = debounce(updateResume, DEBOUNCE_WAIT_TIME);

  const updateMetadata = async (resumeId, metadata) => {
    setUpdating(true);

    await firebase
      .database()
      .ref(`users/${user.uid}/resumes/${resumeId}`)
      .update({
        metadata,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      });

    setUpdating(false);
  };

  const debouncedUpdateMetadata = debounce(updateMetadata, DEBOUNCE_WAIT_TIME);

  const deleteResume = (id) => {
    firebase.database().ref(`users/${user.uid}/resumes/${id}`).remove();
  };

  return (
    <DatabaseContext.Provider
      value={{
        isOffline,
        isUpdating,
        getResume,
        createResume,
        updateResume,
        debouncedUpdateResume,
        debouncedUpdateMetadata,
        deleteResume,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContext;

const memoizedProvider = memo(DatabaseProvider);

export { memoizedProvider as DatabaseProvider };
