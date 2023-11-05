import { useTheme } from "@reactive-resume/hooks";
import { useEffect } from "react";

type Props = { children: React.ReactNode };

export const ThemeProvider = ({ children }: Props) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return children;
};
