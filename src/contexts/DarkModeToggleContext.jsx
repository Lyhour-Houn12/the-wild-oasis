import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeProvider = createContext();

const DarkModeToggleContext = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "darkMode",
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("lignt-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeProvider.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeProvider.Provider>
  );
};

function useDarkMode() {
  const context = useContext(DarkModeProvider);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of the provider");
  return context;
}

export { DarkModeToggleContext, useDarkMode };
