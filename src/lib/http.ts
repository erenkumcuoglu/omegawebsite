/** Catalog pages: cached on Netlify's CDN for 5 minutes, served stale for up to a day while it refreshes. */
export const cacheCatalog = (headers: Headers): void => {
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  headers.set('Netlify-CDN-Cache-Control', 'public, durable, s-maxage=300, stale-while-revalidate=86400');
};

/** Anything per buyer (order pages, API answers) must never be cached or leak its URL. */
export const noStore = (headers: Headers): void => {
  headers.set('Cache-Control', 'private, no-store');
  headers.set('Referrer-Policy', 'no-referrer');
  headers.set('X-Robots-Tag', 'noindex, nofollow');
};
