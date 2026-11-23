import type { AstroCookies } from 'astro';
import { MAX_LINES, MAX_QUANTITY } from './shop';

/**
 * The cart lives in a cookie: "slug:qty|slug:qty". Not httpOnly, so the header badge can read
 * the count on CDN-cached pages; the server validates everything again at checkout.
 */
export const CART_COOKIE = 'od_cart';

export type Cart = { slug: string; quantity: number }[];

const SLUG = /^[a-z0-9][a-z0-9._-]{0,199}$/i;

export const parseCart = (raw: string | undefined): Cart => {
  if (!raw) return [];
  const lines = new Map<string, number>();
  for (const part of raw.split('|')) {
    const [slug, qty] = part.split(':');
    const quantity = Math.min(MAX_QUANTITY, Math.max(1, Math.floor(Number(qty) || 0)));
    if (slug && SLUG.test(slug) && quantity >= 1 && lines.size < MAX_LINES) lines.set(slug, quantity);
  }
  return [...lines.entries()].map(([slug, quantity]) => ({ slug, quantity }));
};

export const readCart = (cookies: AstroCookies): Cart => parseCart(cookies.get(CART_COOKIE)?.value);

export const writeCart = (cookies: AstroCookies, cart: Cart, secure: boolean): void => {
  if (cart.length === 0) {
    cookies.delete(CART_COOKIE, { path: '/' });
    return;
  }
  cookies.set(CART_COOKIE, cart.map((l) => `${l.slug}:${l.quantity}`).join('|'), {
    path: '/',
    sameSite: 'lax',
    secure,
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30,
    encode: (v) => v,
  });
};

/** Adds (or with `set`, replaces) a line; quantity 0 removes it. Returns false when the cart is full. */
export const changeCart = (cart: Cart, slug: string, quantity: number, mode: 'add' | 'set'): { cart: Cart; full: boolean } => {
  if (!SLUG.test(slug)) return { cart, full: false };
  const existing = cart.find((l) => l.slug === slug);
  const next = Math.min(MAX_QUANTITY, Math.max(0, Math.floor(mode === 'add' ? (existing?.quantity ?? 0) + quantity : quantity)));
  if (!existing && next > 0 && cart.length >= MAX_LINES) return { cart, full: true };
  const without = cart.filter((l) => l.slug !== slug);
  if (next === 0) return { cart: without, full: false };
  return { cart: existing ? cart.map((l) => (l.slug === slug ? { slug, quantity: next } : l)) : [...cart, { slug, quantity: next }], full: false };
};
