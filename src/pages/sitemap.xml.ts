import type { APIRoute } from 'astro';
import { DEFAULT_LOCALE, LOCALES, LOCALE_INFO, type Locale } from '../i18n/locales';
import { catalog } from '../lib/shop';
import { SITE_URL } from '../lib/site';
import { BRAND_KEYS, brandPaths } from '../content/brands';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Every page in every language, each listing its translations (hreflang in the sitemap). */
export const GET: APIRoute = async () => {
  let slugs: string[] = [];
  try {
    slugs = (await catalog()).map((p) => p.slug);
  } catch {
    return new Response('Catalog unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
  const pages: { path: string; locales: readonly Locale[]; paths?: Record<Locale, string> }[] = [
    { path: '', locales: LOCALES },
    ...BRAND_KEYS.map((b) => ({ path: '', paths: brandPaths(b), locales: LOCALES })),
    // Terms only exist in English and Turkish.
    { path: '/terms', locales: ['en', 'tr'] as const },
    ...slugs.map((s) => ({ path: `/${s}`, locales: LOCALES })),
  ];
  const urls = pages.flatMap(({ path, locales, paths }) => {
    const url = (l: Locale) => esc(`${SITE_URL}/${l}${paths?.[l] ?? path}`);
    const links =
      locales.map((l) => `<xhtml:link rel="alternate" hreflang="${LOCALE_INFO[l].hreflang}" href="${url(l)}"/>`).join('') +
      (locales.includes(DEFAULT_LOCALE) ? `<xhtml:link rel="alternate" hreflang="x-default" href="${url(DEFAULT_LOCALE)}"/>` : '');
    return locales.map((locale) => `<url><loc>${url(locale)}</loc>${links}</url>`);
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`;
  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
