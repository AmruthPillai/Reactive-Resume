import { ThemeProvider, useMediaQuery } from '@mui/material';
import { useEffect, useMemo } from 'react';

import { darkTheme, lightTheme } from '@/config/theme';
import { setTheme, Theme } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const ThemeWrapper: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme: Theme = useAppSelector((state) => state.build.theme);
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);

  const muiTheme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  useEffect(() => {
    if (theme === undefined) {
      dispatch(setTheme({ theme: prefersDarkMode ? 'dark' : 'light' }));
    }
  }, [theme, dispatch, prefersDarkMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
