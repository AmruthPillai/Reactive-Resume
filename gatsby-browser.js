import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import { ModalProvider } from "./src/contexts/ModalContext";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { UserProvider } from "./src/contexts/UserContext";

import "./src/styles/colors.css";
import "./src/styles/tailwind.css";
import "./src/styles/global.css";
import { ResumeProvider } from "./src/contexts/ResumeContext";

const theme = createMuiTheme({
  typography: {
    fontWeightRegular: 500,
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <MuiThemeProvider theme={theme}>
      <ModalProvider>
        <UserProvider>
          <ResumeProvider>{element}</ResumeProvider>
        </UserProvider>
      </ModalProvider>
    </MuiThemeProvider>
  </ThemeProvider>
);
