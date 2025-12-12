"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type NavbarTheme = "light" | "dark";

interface NavbarThemeContextType {
  theme: NavbarTheme;
  setTheme: (theme: NavbarTheme) => void;
}

// Buat Context
const NavbarThemeContext = createContext<NavbarThemeContextType | undefined>(
  undefined
);

export function NavbarThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<NavbarTheme>("dark");

  return (
    <NavbarThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </NavbarThemeContext.Provider>
  );
}

export function useNavbarTheme() {
  const context = useContext(NavbarThemeContext);
  if (context === undefined) {
    throw new Error("useNavbarTheme must be used within a NavbarThemeProvider");
  }
  return context;
}