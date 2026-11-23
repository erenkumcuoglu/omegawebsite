import type { Locale } from '../../i18n/locales';
import type { Product } from '../../lib/shop';
import { BRAND_KEYS, type BrandCopy, type BrandKey, type BrandSet } from './types';
import en from './en';

export { BRAND_KEYS, type BrandCopy, type BrandKey };

// One file per language (en.ts, tr.ts, ...); a missing language falls back to English.
const files = import.meta.glob<{ default: BrandSet }>(['./*.ts', '!./index.ts', '!./types.ts'], { eager: true });
const sets: Partial<Record<string, BrandSet>> = Object.fromEntries(
  Object.entries(files).map(([path, module]) => [path.replace(/^\.\/|\.ts$/g, ''), module.default]),
);

export const brandCopy = (key: BrandKey, locale: Locale): { copy: BrandCopy; lang: Locale | 'en' } => {
  const set = sets[locale];
  return set ? { copy: set[key], lang: locale } : { copy: en[key], lang: 'en' };
};

export const isBrandKey = (value: unknown): value is BrandKey => typeof value === 'string' && (BRAND_KEYS as readonly string[]).includes(value);

/** Which brand a product belongs to, from its family and title as the Omega API names them. */
const MATCHERS: Record<BrandKey, RegExp> = {
  steam: /\bsteam\b/i,
  playstation: /\b(psn|playstation)\b/i,
  'pubg-mobile': /\bpubg\b/i,
  'razer-gold': /\brazer\b/i,
  'google-play': /\bgoogle\s*play\b/i,
  apple: /\b(apple|itunes|app\s*store)\b/i,
};

export const brandOf = (product: Pick<Product, 'title' | 'family'>): BrandKey | null => {
  const text = `${product.family ?? ''} ${product.title}`;
  return BRAND_KEYS.find((key) => MATCHERS[key].test(text)) ?? null;
};

/**
 * Localized URL slugs: /{locale}/{slug}. The words people search in each language
 * (docs/seo-keywords.md). ASCII only, so links stay readable when shared.
 */
export const BRAND_SLUGS: Record<BrandKey, Record<Locale, string>> = {
  steam: { en: 'steam-wallet-code', tr: 'steam-cuzdan-kodu', es: 'tarjeta-steam', pt: 'gift-card-steam', fr: 'carte-steam', de: 'steam-guthaben', ru: 'karta-steam', ar: 'steam-card', id: 'voucher-steam-wallet', zh: 'steam-chongzhika' },
  playstation: { en: 'psn-gift-card', tr: 'psn-kodu', es: 'tarjeta-psn', pt: 'gift-card-playstation', fr: 'carte-psn', de: 'psn-guthaben', ru: 'karta-psn', ar: 'playstation-card', id: 'voucher-psn', zh: 'psn-dianka' },
  'pubg-mobile': { en: 'pubg-mobile-uc', tr: 'pubg-uc-satin-al', es: 'uc-pubg-mobile', pt: 'uc-pubg-mobile', fr: 'uc-pubg-mobile', de: 'pubg-mobile-uc-kaufen', ru: 'pubg-mobile-uc', ar: 'pubg-uc', id: 'top-up-uc-pubg', zh: 'pubg-mobile-uc' },
  'razer-gold': { en: 'razer-gold-pin', tr: 'razer-gold-pin', es: 'razer-gold', pt: 'razer-gold', fr: 'razer-gold', de: 'razer-gold-kaufen', ru: 'razer-gold', ar: 'razer-gold', id: 'razer-gold', zh: 'razer-gold' },
  'google-play': { en: 'google-play-gift-card', tr: 'google-play-hediye-karti', es: 'tarjeta-google-play', pt: 'gift-card-google-play', fr: 'carte-google-play', de: 'google-play-guthaben', ru: 'google-play-karta', ar: 'google-play-card', id: 'voucher-google-play', zh: 'google-play-lipinka' },
  apple: { en: 'apple-gift-card', tr: 'apple-hediye-karti', es: 'tarjeta-apple', pt: 'gift-card-apple', fr: 'carte-apple', de: 'apple-geschenkkarte', ru: 'apple-karta', ar: 'itunes-card', id: 'gift-card-apple', zh: 'apple-lipinka' },
};

/** Path after the locale, e.g. "/steam-cuzdan-kodu". */
export const brandPath = (key: BrandKey, locale: Locale): string => `/${BRAND_SLUGS[key][locale]}`;

/** The brand page's path in every language (for hreflang and the language menu). */
export const brandPaths = (key: BrandKey): Record<Locale, string> =>
  Object.fromEntries(Object.entries(BRAND_SLUGS[key]).map(([l, slug]) => [l, `/${slug}`])) as Record<Locale, string>;

/**
 * Which brand page a slug asks for in a locale. `exact` false means the slug is the brand key or
 * another language's slug: redirect to this language's slug.
 */
export const findBrand = (locale: Locale, slug: string): { key: BrandKey; exact: boolean } | null => {
  for (const key of BRAND_KEYS) {
    if (BRAND_SLUGS[key][locale] === slug) return { key, exact: true };
  }
  for (const key of BRAND_KEYS) {
    if (key === slug || Object.values(BRAND_SLUGS[key]).includes(slug)) return { key, exact: false };
  }
  return null;
};
