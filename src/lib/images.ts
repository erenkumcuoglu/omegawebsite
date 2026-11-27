import type { BrandKey } from '../content/brands/types';

/**
 * Product artwork supplied by our partner Coda (Codashop tiles, 178×178), served from /public/products.
 * Matched on the product's family + title as the Omega API names them; first rule wins, so the
 * region-specific ones come before the general ones. No match: the brand-gradient tile is drawn.
 */
const RULES: [RegExp, string][] = [
  [/\bsteam\b.*\b(usd|us|usa|united states)\b/i, '/products/steam-us.jpg'],
  [/\bsteam\b/i, '/products/steam.jpg'],
  [/\b(psn|playstation)\b.*\b(tr|try|tl|türkiye|turkiye|turkey)\b/i, '/products/psn-tr.png'],
  [/\b(psn|playstation)\b.*\b(de|eur|germany|deutschland)\b/i, '/products/psn-de.png'],
  [/\b(psn|playstation)\b/i, '/products/psn-us.png'],
  [/\bpubg\b/i, '/products/pubg-mobile.jpg'],
  [/\bgoogle\s*play\b/i, '/products/google-play.png'],
  [/\b(apple|itunes|app\s*store)\b/i, '/products/apple.png'],
  [/\bvalorant\b/i, '/products/valorant.jpg'],
  [/\b(mobile\s*legends|mlbb)\b/i, '/products/mobile-legends.jpg'],
  [/\bfree\s*fire\b/i, '/products/free-fire.png'],
  [/\b(call\s*of\s*duty|cod\s*mobile|codm)\b/i, '/products/cod-mobile.jpg'],
  [/\bwild\s*rift\b/i, '/products/wild-rift.jpg'],
  [/\b(league\s*of\s*legends|lol)\b/i, '/products/league-of-legends.jpg'],
  [/\bfortnite\b/i, '/products/fortnite.png'],
  [/\bnintendo\b/i, '/products/nintendo.jpg'],
  [/\b(ea\s*(sports\s*)?fc|fc\s*mobile)\b/i, '/products/ea-fc.png'],
  [/\bspotify\b/i, '/products/spotify.png'],
  // Not on Codashop: cropped from Razer Gold's own share image (gold.razer.com).
  [/\brazer\b/i, '/products/razer-gold.jpg'],
];

export const productImage = (product: { title: string; family?: string | null }): string | null => {
  const text = `${product.family ?? ''} ${product.title}`;
  return RULES.find(([pattern]) => pattern.test(text))?.[1] ?? null;
};

/** Brand landing pages and brand tiles. */
const BRAND_IMAGES: Partial<Record<BrandKey, string>> = {
  steam: '/products/steam.jpg',
  playstation: '/products/psn-us.png',
  'pubg-mobile': '/products/pubg-mobile.jpg',
  'razer-gold': '/products/razer-gold.jpg',
  'google-play': '/products/google-play.png',
  apple: '/products/apple.png',
};

export const brandImage = (key: BrandKey): string | null => BRAND_IMAGES[key] ?? null;
