/** Site languages. Must match WEB_LOCALES in the Omega API (checkout e-mails use the same codes). */
export const LOCALES = ['en', 'tr', 'es', 'pt', 'fr', 'de', 'ru', 'ar', 'id', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_INFO: Record<Locale, { name: string; intl: string; hreflang: string; dir: 'ltr' | 'rtl'; og: string }> = {
  en: { name: 'English', intl: 'en-US', hreflang: 'en', dir: 'ltr', og: 'en_US' },
  tr: { name: 'Türkçe', intl: 'tr-TR', hreflang: 'tr', dir: 'ltr', og: 'tr_TR' },
  es: { name: 'Español', intl: 'es-ES', hreflang: 'es', dir: 'ltr', og: 'es_ES' },
  pt: { name: 'Português', intl: 'pt-BR', hreflang: 'pt', dir: 'ltr', og: 'pt_BR' },
  fr: { name: 'Français', intl: 'fr-FR', hreflang: 'fr', dir: 'ltr', og: 'fr_FR' },
  de: { name: 'Deutsch', intl: 'de-DE', hreflang: 'de', dir: 'ltr', og: 'de_DE' },
  ru: { name: 'Русский', intl: 'ru-RU', hreflang: 'ru', dir: 'ltr', og: 'ru_RU' },
  ar: { name: 'العربية', intl: 'ar', hreflang: 'ar', dir: 'rtl', og: 'ar_AR' },
  id: { name: 'Bahasa Indonesia', intl: 'id-ID', hreflang: 'id', dir: 'ltr', og: 'id_ID' },
  zh: { name: '简体中文', intl: 'zh-CN', hreflang: 'zh-Hans', dir: 'ltr', og: 'zh_CN' },
};

export const isLocale = (value: unknown): value is Locale => typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

/** Best site language for an Accept-Language header. */
export const pickLocale = (acceptLanguage: string | null): Locale => {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = Number(params.find((p) => p.trim().startsWith('q='))?.split('=')[1] ?? 1);
      return { base: tag.trim().toLowerCase().split('-')[0], q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.map((r) => r.base).find(isLocale) ?? DEFAULT_LOCALE;
};

export const formatUsd = (amount: number, locale: Locale): string =>
  new Intl.NumberFormat(LOCALE_INFO[locale].intl, { style: 'currency', currency: 'USD' }).format(amount);
