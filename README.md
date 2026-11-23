# Omega Digital — omegadijital.com

Storefront for game codes and gift cards, paid with **USDT on TRC20, ERC20 or BEP20**. Built with [Astro](https://astro.build) and deployed on Netlify.

- Every page is real HTML rendered on the server (Netlify Functions) and cached on Netlify's CDN for 5 minutes, so prices stay fresh and search engines can read every page.
- 10 languages under `/{locale}`: `en tr es pt fr de ru ar id zh` (Arabic is right-to-left). `/` sends visitors to their browser language.
- Each page has a canonical link, hreflang links, `x-default`, JSON-LD (Organization, FAQ, Product, Breadcrumb) and is listed in `/sitemap.xml`.
- The catalog, prices and checkouts come from the Omega API (`/api/public/shop/*`). Only this site's server calls it, using the secret `WEB_API_TOKEN`; browsers never see the token.

## Cart, accounts and balance

- **Cart:** product pages add to a cart kept in the `od_cart` cookie (`slug:qty|…`, max 20 products × 20 codes). `/{locale}/cart` is the cart and the payment form in one page: guest e-mail, then USDT on any network from `GET /payment-options`, or the store balance when signed in.
- **Sign-in:** `/{locale}/account/login` asks Omega to e-mail a link (`POST /auth/login-link`). The link opens the same page with `?token=`. The buyer presses a button (`POST /api/auth/verify`), so mail scanners cannot use up the one-time token. The session goes into the httpOnly, Secure, SameSite=Lax `od_session` cookie and is sent to Omega as `X-Customer-Session`.
- **Account:** `/{locale}/account` shows the balance, the top-up form (only after the first delivered order), balance history and orders.
- **Business rules (shown in every language and in the terms):** the balance can only be spent here. A top-up is a digital goods purchase and cannot be withdrawn, transferred or refunded. Top-up opens after the first delivered order. Every order is reviewed before the code is e-mailed.
- Catalog pages are CDN-cached and the same for everyone. Nothing per buyer is rendered into them: the header cart badge reads the cookie in the browser. Cart, account and order pages are `no-store` and `noindex`.

## How buying works

1. Product page (`/{locale}/{slug}`): the buyer picks a network (from `GET /payment-options`, only networks with an address) and enters an e-mail. The form posts to `/api/checkout`.
2. The server asks Omega for a checkout and redirects to `/{locale}/order/{id}?t={token}`.
3. The order page shows the exact USDT amount, the network, our address with a QR code, a countdown and a warning that exchange withdrawal fees must be added on top. It polls `/api/order/{id}` and reloads when the status changes.
4. Omega matches the transfer on-chain. A person approves it in the CMS, and the code is e-mailed.

Order pages are `no-store` and `noindex`, and send `Referrer-Policy: no-referrer`, because the link holds the order token.

## Files

| Path | What |
| --- | --- |
| `src/pages/[locale]/index.astro` | Home: hero, catalog (search + brand chips), how it works, FAQ |
| `src/pages/[locale]/[slug].astro` | Product page and order form |
| `src/pages/[locale]/order/[id].astro` | Payment / order status page |
| `src/pages/[locale]/terms.astro` | Terms & privacy (EN + TR; other languages show EN) |
| `src/pages/[locale]/cart.astro` | Cart and payment |
| `src/pages/[locale]/account/` | Sign-in and account (balance, top-up, history, orders) |
| `src/pages/api/` | Form endpoints: cart, checkout, topup, auth/*; order status poll |
| `src/lib/cart.ts`, `src/lib/session.ts` | Cart and session cookies |
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
