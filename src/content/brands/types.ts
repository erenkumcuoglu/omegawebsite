/** Brand / category landing pages: /{locale}/{slug}. Same slug in every language (simple hreflang). */
export const BRAND_KEYS = ['steam', 'playstation', 'pubg-mobile', 'razer-gold', 'google-play', 'apple'] as const;
export type BrandKey = (typeof BRAND_KEYS)[number];

export interface BrandCopy {
  /** Short display name, e.g. "Steam Wallet". */
  name: string;
  /** <title>, ideally under 60 characters. */
  title: string;
  /** Meta description, ideally 140–160 characters. */
  description: string;
  h1: string;
  /** 1–2 short paragraphs. */
  intro: string[];
  regionTitle: string;
  /** Which card to buy: region / currency rules. */
  region: string[];
  redeemTitle: string;
  redeemSteps: string[];
  faq: [question: string, answer: string][];
}

export type BrandSet = Record<BrandKey, BrandCopy>;
