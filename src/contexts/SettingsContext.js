import i18next from 'i18next';
import React, { createContext, memo, useEffect, useState } from 'react';
import themeConfig from '../data/themeConfig';

const defaultState = {
  theme: 'Dark',
  setTheme: () => {},
  language: 'en',
  setLanguage: () => {},
};

const SettingsContext = createContext(defaultState);

const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultState.theme);
  const [language, setLanguage] = useState(defaultState.theme);

  useEffect(() => {
    const prefTheme = localStorage.getItem('theme') || defaultState.theme;
    const prefLanguage =
      localStorage.getItem('language') || defaultState.language;
    setTheme(prefTheme);
    setLanguage(prefLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const colorConfig = themeConfig[theme];
    for (const [key, value] of Object.entries(colorConfig)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;

const memoizedProvider = memo(SettingsProvider);

export { memoizedProvider as SettingsProvider };
