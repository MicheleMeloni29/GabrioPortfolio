'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { FALLBACK_LOCALE, Locale, SUPPORTED_LOCALES, translations, Translations } from '../locales';

type LanguageContextValue = {
  locale: Locale;
  dictionary: Translations;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const LOCALE_COOKIE = 'locale';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

const parseLocaleCookie = (): Locale | null => {
  if (typeof document === 'undefined') {
    return null;
  }
  const cookiePairs = document.cookie.split(';').map((entry) => entry.trim());
  for (const pair of cookiePairs) {
    if (!pair) continue;
    const [key, value] = pair.split('=');
    if (key === LOCALE_COOKIE && value && value.length === 2) {
      if ((SUPPORTED_LOCALES as readonly string[]).includes(value)) {
        return value as Locale;
      }
    }
  }
  return null;
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(FALLBACK_LOCALE);

  useEffect(() => {
    const saved = parseLocaleCookie();
    if (saved && saved !== locale) {
      setLocaleState(saved);
    }
    // we only want to run this on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistLocale = useCallback((next: Locale) => {
    const expires = new Date(Date.now() + COOKIE_MAX_AGE_SECONDS * 1000);
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; expires=${expires.toUTCString()}`;
  }, []);

  const handleChange = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      persistLocale(next);
    },
    [persistLocale],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dictionary: translations[locale],
      setLocale: handleChange,
    }),
    [handleChange, locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
