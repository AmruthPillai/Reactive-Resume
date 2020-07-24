import { navigate } from '@reach/router';
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
  loginAnonymously: async () => {},
  deleteAccount: async () => {},
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
      return await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginAnonymously = async () => {
    try {
      return await firebase.auth().signInAnonymously();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    firebase.auth().signOut();
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const deleteAccount = async () => {
    const { currentUser } = firebase.auth();
    const deleteUser = firebase.functions().httpsCallable('deleteUser');
    deleteUser();

    try {
      deleteUser();
      await currentUser.delete();
    } catch (e) {
      if (e.code === 'auth/requires-recent-login') {
        await loginWithGoogle();
        await currentUser.delete();
      }
    } finally {
      logout();
      toast(
        "It's sad to see you go, but we respect your privacy. All your data has been deleted successfully. Hope to see you again soon!",
      );
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        loading,
        loginWithGoogle,
        loginAnonymously,
        deleteAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

const memoizedProvider = memo(UserProvider);

export { memoizedProvider as UserProvider };
