import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import React from 'react';
import { DatabaseProvider } from './src/contexts/DatabaseContext';
import { MetadataProvider } from './src/contexts/MetadataContext';
import { ModalProvider } from './src/contexts/ModalContext';
import { ResumeProvider } from './src/contexts/ResumeContext';
import { StorageProvider } from './src/contexts/StorageContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { UserProvider } from './src/contexts/UserContext';
import './src/styles/colors.css';
import './src/styles/global.css';
import './src/styles/shadows.css';
import './src/styles/tailwind.css';
import './src/styles/toastify.css';

const theme = createMuiTheme({
  typography: {
    fontWeightRegular: 500,
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
});

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <MuiThemeProvider theme={theme}>
      <ModalProvider>
        <UserProvider>
          <DatabaseProvider>
            <ResumeProvider>
              <MetadataProvider>
                <StorageProvider>{element}</StorageProvider>
              </MetadataProvider>
            </ResumeProvider>
          </DatabaseProvider>
        </UserProvider>
      </ModalProvider>
    </MuiThemeProvider>
  </ThemeProvider>
);
