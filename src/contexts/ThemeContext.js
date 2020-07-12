import React, { createContext, memo, useEffect, useState } from 'react';
import themeConfig from '../data/themeConfig';

const defaultState = {
  theme: 'Dark',
  setTheme: () => {},
};

const ThemeContext = createContext(defaultState);

const ThemeProvider = ({ children }) => {
  const [theme, setThemeX] = useState(defaultState.theme);

  useEffect(() => {
    const prefTheme = localStorage.getItem('theme') || defaultState.theme;
    setThemeX(prefTheme);
  }, []);

  useEffect(() => {
    const colorConfig = themeConfig[theme];
    for (const [key, value] of Object.entries(colorConfig)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [theme]);

  const setTheme = (themeRef) => {
    setThemeX(themeRef);
    localStorage.setItem('theme', themeRef);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

const memoizedProvider = memo(ThemeProvider);

export { memoizedProvider as ThemeProvider };
