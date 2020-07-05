import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import { DashboardProvider } from "./src/contexts/DashboardContext";
import { ModalProvider } from "./src/contexts/ModalContext";
import { ResumeProvider } from "./src/contexts/ResumeContext";
import { TemplateProvider } from "./src/contexts/TemplateContext";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { UserProvider } from "./src/contexts/UserContext";
import "./src/styles/colors.css";
import "./src/styles/global.css";
import "./src/styles/shadows.css";
import "./src/styles/tailwind.css";
import "./src/styles/toastify.css";

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
          <DashboardProvider>
            <ResumeProvider>
              <TemplateProvider>{element}</TemplateProvider>
            </ResumeProvider>
          </DashboardProvider>
        </UserProvider>
      </ModalProvider>
    </MuiThemeProvider>
  </ThemeProvider>
);
