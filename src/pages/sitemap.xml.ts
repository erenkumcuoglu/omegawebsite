import type { APIRoute } from 'astro';
import { DEFAULT_LOCALE, LOCALES, LOCALE_INFO } from '../i18n/locales';
import { catalog } from '../lib/shop';
import { SITE_URL } from '../lib/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Every page in every language, each listing its translations (hreflang in the sitemap). */
export const GET: APIRoute = async () => {
  let slugs: string[] = [];
  try {
    slugs = (await catalog()).map((p) => p.slug);
  } catch {
    return new Response('Catalog unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
  const paths = ['', '/terms', ...slugs.map((s) => `/${s}`)];
  const urls = paths.flatMap((path) =>
    LOCALES.map((locale) => {
      const links = LOCALES.map((l) => `<xhtml:link rel="alternate" hreflang="${LOCALE_INFO[l].hreflang}" href="${esc(`${SITE_URL}/${l}${path}`)}"/>`).join('');
      const fallback = `<xhtml:link rel="alternate" hreflang="x-default" href="${esc(`${SITE_URL}/${DEFAULT_LOCALE}${path}`)}"/>`;
      return `<url><loc>${esc(`${SITE_URL}/${locale}${path}`)}</loc>${links}${fallback}</url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`;
  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
