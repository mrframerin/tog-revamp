"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "samba" | "noir" | "psychological" | "giallo" | "scifi";

export const themes: { id: Theme; label: string }[] = [
  { id: "samba", label: "Samba" },
  { id: "noir", label: "Noir" },
  { id: "psychological", label: "Psychological" },
  { id: "giallo", label: "Giallo" },
  { id: "scifi", label: "Sci-Fi" },
];

const ThemeCtx = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "samba", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("samba");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
