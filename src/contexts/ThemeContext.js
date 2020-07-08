import React, { createContext, useEffect, useState } from 'react';

const COLOR_CONFIG = {
  light: {
    '--color-primary': '#444',
    '--color-primary-dark': '#333',
    '--color-inverse': '#fff',
    '--color-inverse-dark': '#f5f5f5',
    '--color-secondary-light': '#f7fafc',
    '--color-secondary': '#edf2f7',
    '--color-secondary-dark': '#718096',
  },
  dark: {
    '--color-primary': '#f5f5f5',
    '--color-primary-dark': '#eeeeee',
    '--color-inverse': '#212121',
    '--color-inverse-dark': '#181818',
    '--color-secondary-light': '#2c2c2c',
    '--color-secondary': '#444',
    '--color-secondary-dark': '#888',
  },
};

const defaultState = {
  darkMode: false,
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

export { ThemeProvider };
