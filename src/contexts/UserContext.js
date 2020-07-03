import React, { createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "gatsby-plugin-firebase";
import { toast } from "react-toastify";

const defaultState = {
  user: null,
  logout: () => {},
  loginWithGoogle: async () => {},
};

const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
  const [firebaseUser, loading] = useAuthState(firebase.auth());
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(firebaseUser);
  }, [firebaseUser]);

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
