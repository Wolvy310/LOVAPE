"use client";

import { useEffect, useState } from "react";

export type Language = "fr" | "en";
export type Theme = "dark" | "light";

export function useSitePreferences() {
  const [language, setLanguage] = useState<Language>("fr");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const savedLanguage = window.localStorage.getItem("lovape-language");
      const savedTheme = window.localStorage.getItem("lovape-theme");

      if (savedLanguage === "fr" || savedLanguage === "en") {
        setLanguage(savedLanguage);
      }

      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      }
    } catch {
      // Ignore storage access errors and keep defaults.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("lovape-language", language);
    } catch {
      // Ignore storage access errors.
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem("lovape-theme", theme);
    } catch {
      // Ignore storage access errors.
    }
  }, [theme]);

  return { language, setLanguage, theme, setTheme };
}

