"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Locale } from "./i18n-config";
import { i18n } from "./i18n-config";

type LanguageContextType = {
  language: Locale;
  setLanguage: (lang: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Locale>(i18n.defaultLocale);

  useEffect(() => {
    const storedLang = localStorage.getItem("language") as Locale;
    const browserLang = navigator.language.split("-")[0] as Locale;
    const initialLang =
      storedLang ||
      (i18n.locales.includes(browserLang) ? browserLang : i18n.defaultLocale);
    setLanguage(initialLang);
  }, []);

  const handleSetLanguage = (lang: Locale) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
