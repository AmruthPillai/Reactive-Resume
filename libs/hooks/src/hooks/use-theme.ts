import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

type Theme = "system" | "dark" | "light";

type UseThemeOutput = {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const useTheme = (): UseThemeOutput => {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [isDarkMode, setDarkMode] = useState<boolean>(isDarkOS);
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");

  useEffect(() => {
    if (theme === "system") setDarkMode((prev) => !prev);
  }, [theme]);

  useEffect(() => {
    switch (theme) {
      case "light": {
        setDarkMode(false);
        break;
      }
      case "system": {
        setDarkMode(isDarkOS);
        break;
      }
      case "dark": {
        setDarkMode(true);
        break;
      }
    }
  }, [theme, isDarkOS]);

  function toggleTheme() {
    const toggleDict: Record<Theme, Theme> = {
      light: "system",
      system: "dark",
      dark: "light",
    };

    setTheme((prevMode) => toggleDict[prevMode]);
  }

  return {
    theme,
    setTheme,
    isDarkMode,
    toggleTheme,
  };
};
