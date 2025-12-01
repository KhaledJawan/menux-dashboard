"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type LanguageCode = "en" | "de";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
};

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    "nav.overview": "Overview",
    "nav.menu": "Menu",
    "nav.orders": "Orders",
    "nav.tables": "Tables",
    "nav.customers": "Customers",
    "nav.settings": "Settings",
    "topbar.subtitle": "Live pulse of your restaurant—orders, revenue, and guest flow in one view.",
    "settings.title": "Settings",
    "settings.subtitle": "Manage language, branding, and preferences.",
    "settings.language.title": "Language",
    "settings.language.subtitle": "Choose your dashboard language. Default is English.",
    "settings.language.remember": "We’ll remember your choice on this device.",
  },
  de: {
    "nav.overview": "Übersicht",
    "nav.menu": "Speisekarte",
    "nav.orders": "Bestellungen",
    "nav.tables": "Tische",
    "nav.customers": "Kunden",
    "nav.settings": "Einstellungen",
    "topbar.subtitle": "Live-Überblick: Bestellungen, Umsatz und Gästefluss auf einen Blick.",
    "settings.title": "Einstellungen",
    "settings.subtitle": "Sprache, Branding und Präferenzen verwalten.",
    "settings.language.title": "Sprache",
    "settings.language.subtitle": "Wähle die Dashboard-Sprache. Standard ist Englisch.",
    "settings.language.remember": "Wir merken uns deine Auswahl auf diesem Gerät.",
  },
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("menux-lang");
      if (stored === "de" || stored === "en") return stored;
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("menux-lang", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(
    () => (key: string) => translations[language][key] ?? translations.en[key] ?? key,
    [language]
  );

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
