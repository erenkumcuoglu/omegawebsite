import { DEFAULT_LOCALE, isLocale, type Locale } from '../i18n/locales';

/** Small helpers for the HTML form endpoints (they all answer with a 303 redirect). */
export const field = (form: FormData, name: string): string => String(form.get(name) ?? '').trim();

export const localeOf = (form: FormData): Locale => {
  const value = field(form, 'locale');
  return isLocale(value) ? value : DEFAULT_LOCALE;
};

export const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** A local path to go back to; anything else becomes the fallback. */
export const safePath = (value: string, fallback: string): string => (/^\/[a-z]{2}(\/[A-Za-z0-9._-]*)*$/.test(value) ? value : fallback);

