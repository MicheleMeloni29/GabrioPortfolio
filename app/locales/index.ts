import it from './it.json';
import en from './en.json';
import es from './es.json';

export const SUPPORTED_LOCALES = ['it', 'en', 'es'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type Translations = typeof it;

export const translations: Record<Locale, Translations> = {
  it,
  en,
  es,
};

export const FALLBACK_LOCALE: Locale = 'en';
