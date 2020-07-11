import React, { createContext, memo, useEffect, useState } from 'react';

const COLOR_CONFIG = {
  light: {
    '--color-primary-50': '#FFFFFF',
    '--color-primary-100': '#FAFAFA',
    '--color-primary-200': '#F1F0F0',
    '--color-primary-300': '#D8D2CD',
    '--color-primary-400': '#CDC4BA',
    '--color-primary-500': '#ABA59D',
    '--color-primary-600': '#8A8680',
    '--color-primary-700': '#686663',
    '--color-primary-800': '#484745',
    '--color-primary-900': '#282727',
  },
  dark: {
    '--color-primary-50': '#212121',
    '--color-primary-100': '#2c2c2c',
    '--color-primary-200': '#424242',
    '--color-primary-300': '#616161',
    '--color-primary-400': '#757575',
    '--color-primary-500': '#9e9e9e',
    '--color-primary-600': '#bdbdbd',
    '--color-primary-700': '#e0e0e0',
    '--color-primary-800': '#eeeeee',
    '--color-primary-900': '#f5f5f5',
  },
};

const defaultState = {
  darkMode: true,
  toggleDarkMode: () => {},
};

const ThemeContext = createContext(defaultState);

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(defaultState.darkMode);

  useEffect(() => {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    isDarkMode ? setDarkMode(true) : setDarkMode(false);
  }, []);

  useEffect(() => {
    const colorConfig = darkMode ? COLOR_CONFIG.dark : COLOR_CONFIG.light;
    for (const [key, value] of Object.entries(colorConfig)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

const memoizedProvider = memo(ThemeProvider);

export { memoizedProvider as ThemeProvider };
