import firebase from 'gatsby-plugin-firebase';
import { pick } from 'lodash';
import React, { createContext, memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuthState from '../hooks/useAuthState';

const defaultUser = {
  uid: null,
  email: null,
  displayName: null,
  isAnonymous: false,
};

const defaultState = {
  loading: false,
  user: defaultUser,
  logout: async () => {},
  loginWithGoogle: async () => {},
};

const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
  const [firebaseUser, loading] = useAuthState(firebase);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    setUser(localUser);
  }, []);

  useEffect(() => {
    if (firebaseUser) {
      const remoteUser = pick(firebaseUser, Object.keys(defaultUser));
      localStorage.setItem('user', JSON.stringify(remoteUser));
      setUser(remoteUser);

      const addUserToDatabase = async () => {
        const userRef = firebase.database().ref(`users/${remoteUser.uid}`);
        const snapshot = await userRef.once('value');
        !snapshot.val() && userRef.set(remoteUser);
      };

      addUserToDatabase();
    }
  }, [firebaseUser]);

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    await firebase.auth().signOut();
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        loading,
        loginWithGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

const memoizedProvider = memo(UserProvider);

export { memoizedProvider as UserProvider };
