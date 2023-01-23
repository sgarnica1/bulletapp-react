import { useState, useContext, createContext } from "react";
import { info } from "../utils/info.js";

const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  // VERIFY IF USER HAS DARK MODE ENABLED IN THEIR OS
  const darkDefault = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // VERIFY IF USER HAS A THEME PREFERENCE IN LOCAL STORAGE
  const localStorageTheme = localStorage.getItem(info.localStorageKeys.theme);

  // SET INITIAL THEME TO DARK 
  let initialTheme = darkDefault ? info.theme.dark : info.theme.dark;

  if (localStorageTheme) {
    initialTheme = localStorageTheme;
  }

  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    setTheme(
      theme === info.theme.light
        ? info.theme.dark
        : info.theme.light
    );
    localStorage.setItem(
      info.localStorageKeys.theme,
      theme === info.theme.light
        ? info.theme.dark
        : info.theme.light
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, useTheme };
