# Omega Digital — omegadijital.com

Storefront for game codes and gift cards, paid with **USDT (TRC20)**. Built with [Astro](https://astro.build) and deployed on Netlify.

- Every page is real HTML rendered on the server (Netlify Functions) and cached on Netlify's CDN for 5 minutes, so prices stay fresh and search engines can read every page.
- 10 languages under `/{locale}`: `en tr es pt fr de ru ar id zh` (Arabic is right-to-left). `/` sends visitors to their browser language.
- Each page has a canonical link, hreflang links, `x-default`, JSON-LD (Organization, FAQ, Product, Breadcrumb) and is listed in `/sitemap.xml`.
- The catalog, prices and checkouts come from the Omega API (`/api/public/shop/*`). Only this site's server calls it, using the secret `WEB_API_TOKEN`; browsers never see the token.

## How buying works

1. Product page (`/{locale}/{slug}`): the buyer enters an e-mail. The form posts to `/api/checkout`.
2. The server asks Omega for a checkout and redirects to `/{locale}/order/{id}?t={token}`.
3. The order page shows the exact USDT amount, our TRC20 address and a QR code. It polls `/api/order/{id}` and reloads when the status changes.
4. Omega matches the transfer on-chain. A person approves it in the CMS, and the code is e-mailed.

Order pages are `no-store` and `noindex`, and send `Referrer-Policy: no-referrer`, because the link holds the order token.

## Files

| Path | What |
| --- | --- |
| `src/pages/[locale]/index.astro` | Home: hero, catalog (search + brand chips), how it works, FAQ |
| `src/pages/[locale]/[slug].astro` | Product page and order form |
| `src/pages/[locale]/order/[id].astro` | Payment / order status page |
| `src/pages/[locale]/terms.astro` | Terms & privacy (EN + TR; other languages show EN) |
| `src/pages/api/checkout.ts`, `src/pages/api/order/[id].ts` | Server endpoints that call Omega |
| `src/pages/sitemap.xml.ts` | Sitemap with hreflang alternates |
| `src/i18n/` | Languages and all interface copy |
| `src/lib/shop.ts` | Omega shop API client (+ sample catalog for local preview) |
| `src/lib/site.ts` | Site name, URL, support e-mail |
| `public/__forms.html` | Netlify Forms definition for the footer support form |

## Local development

```bash
npm install
cp .env.example .env    # set SHOP_MOCK=1 to use the sample catalog, or SHOP_API_URL + WEB_API_TOKEN for the real API
npm run dev             # http://localhost:4321
npm run check && npm run build
```

## Netlify

- Build command `npm run build`, publish directory `dist` (already in `netlify.toml`). Node 22.
- **Environment variables** (Site configuration → Environment variables, scope *Functions*):
  - `SHOP_API_URL` = `https://api.omegadijital.com`
  - `WEB_API_TOKEN` = same value as `WEB_API_TOKEN` on the Omega API
- Support form: Netlify → Forms → `support` → add an e-mail notification.
