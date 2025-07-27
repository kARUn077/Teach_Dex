import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    // Add green palette CSS variables when theme changes
    if (theme === "light") {
      root.style.setProperty("--background", "#F0F7F4");
      root.style.setProperty("--foreground", "#1B4332");
      root.style.setProperty("--primary", "#537D5D");
      root.style.setProperty("--primary-foreground", "#FFFFFF");
      root.style.setProperty("--border", "#D8F3DC");
    } else if (theme === "dark") {
      root.style.setProperty("--background", "#16213E");
      root.style.setProperty("--foreground", "#E2E8F0");
      root.style.setProperty("--primary", "#D8F3DC");
      root.style.setProperty("--primary-foreground", "#1B4332");
      root.style.setProperty("--border", "#2D3748");
    }

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};