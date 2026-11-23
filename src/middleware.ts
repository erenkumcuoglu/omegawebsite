import { defineMiddleware } from 'astro:middleware';

/** One URL per page: /tr/steam/ → /tr/steam (301), keeping the query string. */
export const onRequest = defineMiddleware((context, next) => {
  // context.url may already be normalised; read the raw request URL.
  const { pathname, search } = new URL(context.request.url);
  if (pathname.length > 1 && pathname.endsWith('/') && !pathname.startsWith('/api/')) {
    return context.redirect(`${pathname.replace(/\/+$/, '')}${search}`, 301);
  }
  return next();
});
