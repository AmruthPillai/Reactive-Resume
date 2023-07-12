import { createTheme, ThemeOptions } from '@mui/material/styles';
import colors from 'tailwindcss/colors';

const theme: ThemeOptions = {
  typography: {
    fontSize: 12,
    fontFamily: '"IBM Plex Sans", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '6px 20px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 30,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 12,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          zIndex: 40,
        },
        paper: {
          border: 'none',
        },
      },
    },
    MuiModal: {
      defaultProps: {
        componentsProps: {
          backdrop: {
            className: 'backdrop-blur-sm',
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...theme,
  palette: {
    mode: 'light',
    background: { default: colors.zinc[50], paper: colors.zinc[100] },
    primary: { main: colors.zinc[900], ...colors.zinc },
    secondary: { main: colors.teal[500], ...colors.teal },
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
    background: { default: colors.zinc[950], paper: colors.zinc[900] },
    primary: { main: colors.zinc[100], ...colors.zinc },
    secondary: { main: colors.teal[600], ...colors.teal },
  },
});
