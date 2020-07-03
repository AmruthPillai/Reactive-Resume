import React from "react";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import { ThemeProvider } from "./src/contexts/ThemeContext";

import "./src/styles/tailwind.css";
import "./src/styles/global.css";
import { ModalProvider } from "./src/contexts/ModalContext";
import { UserProvider } from "./src/contexts/UserContext";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <ModalProvider>
      <UserProvider>{element}</UserProvider>
    </ModalProvider>
  </ThemeProvider>
);
