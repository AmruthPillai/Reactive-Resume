import React, { createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "gatsby-plugin-firebase";
import { toast } from "react-toastify";
import { pick } from "lodash";

const defaultUser = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
};

const defaultState = {
  user: defaultUser,
  logout: async () => {},
  loginWithGoogle: async () => {},
};

const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
  const [firebaseUser, loading] = useAuthState(firebase.auth());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (firebaseUser) {
      const user = pick(firebaseUser, Object.keys(defaultUser));
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      const addUserToDatabase = async () => {
        const docRef = firebase.firestore().collection("users").doc(user.uid);
        const snapshot = await docRef.get();
        !snapshot.exists && docRef.set(user);
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
    localStorage.removeItem("user");
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

export { UserProvider };
