// @ts-check
import { defineConfig, envField } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://omegadijital.com',
  // Pages are rendered on request and cached on Netlify's CDN (see src/lib/http.ts), so prices
  // stay fresh while search engines still get real HTML for every page and language.
  output: 'server',
  // No edge functions here; their local emulator needs Deno, so keep it off in `astro dev`.
  adapter: netlify({ devFeatures: { environmentVariables: false, images: true, edgeFunctions: false } }),
  trailingSlash: 'never',
  build: { format: 'file' },
  compressHTML: true,
  env: {
    schema: {
      // Omega API base, e.g. https://api.omegadijital.com — the shop lives under /api/public/shop.
      SHOP_API_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Shared secret the Omega API expects in X-Web-Token. Never sent to browsers.
      WEB_API_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      // "1" serves a sample catalog instead of the API (local preview only).
      SHOP_MOCK: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
