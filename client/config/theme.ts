import { createTheme, ThemeOptions } from '@mui/material/styles';

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
    MuiInputBase: {
      styleOverrides: {
        input: {
          boxShadow: 'none !important',
        },
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
    background: { default: '#fafafa', paper: '#f4f4f5' },
    primary: { main: '#18181b' },
    secondary: { main: '#14b8a6' },
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
    background: { default: '#09090b', paper: '#18181b' },
    primary: { main: '#f4f4f5' },
    secondary: { main: '#0d9488' },
  },
});
