import { createTheme, ThemeOptions } from '@mui/material/styles';

const theme: ThemeOptions = {
  typography: {
    fontSize: 12,
    fontFamily: 'Inter, sans-serif',
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
  },
};

export const lightTheme = createTheme({
  ...theme,
  palette: {
    mode: 'light',
    primary: { main: '#404040' }, // neutral[700]
    secondary: { main: '#0d9488' }, // teal[600]
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
    primary: { main: '#f5f5f5' }, // neutral[100]
    secondary: { main: '#2dd4bf' }, // teal[400]
  },
});
