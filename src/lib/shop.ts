import { SHOP_API_URL, SHOP_MOCK, WEB_API_TOKEN } from 'astro:env/server';
import type { Locale } from '../i18n/locales';

/** Shapes returned by the Omega API under /api/public/shop (apps/api/src/services/web-shop.service.ts). */
export interface Product {
  slug: string;
  title: string;
  family: string | null;
  /** USD, 2 decimals; paid as the same amount of USDT. */
  price: number;
  inStock: boolean;
}

/** USDT networks the Omega API can take (apps/api/src/lib/usdt-networks.ts). */
export const NETWORKS = ['TRC20', 'ERC20', 'BEP20'] as const;
export type Network = (typeof NETWORKS)[number];
export const isNetwork = (value: unknown): value is Network => typeof value === 'string' && (NETWORKS as readonly string[]).includes(value);

/** A network the shop has an address for right now. */
export interface PaymentOption {
  network: Network;
  label: string;
  asset: 'USDT';
}

export type CheckoutStatus = 'AWAITING_PAYMENT' | 'PAID' | 'APPROVED' | 'DELIVERED' | 'REJECTED' | 'EXPIRED';

export interface Checkout {
  id: string;
  number: string;
  token: string;
  status: CheckoutStatus;
  title: string;
  slug: string | null;
  email: string;
  locale: string;
  amount: string;
  network: string;
  /** e.g. "Tron (TRC20)". */
  networkLabel: string;
  asset: string;
  payTo: string;
  expiresAt: string;
  paidAt: string | null;
  createdAt: string;
}

/** What went wrong, as a key the pages can translate (err_<code>). */
export type ShopErrorCode = 'invalid_email' | 'network' | 'out_of_stock' | 'unavailable' | 'too_many' | 'not_found' | 'generic';

export class ShopError extends Error {
  constructor(readonly code: ShopErrorCode, readonly status: number) {
    super(code);
  }
}

const mock = (): boolean => SHOP_MOCK === '1' || (!SHOP_API_URL && import.meta.env.DEV);

const codeFor = (status: number): ShopErrorCode => {
  if (status === 400) return 'invalid_email';
  if (status === 404) return 'not_found';
  if (status === 409) return 'out_of_stock';
  if (status === 429) return 'too_many';
  if (status === 503) return 'unavailable';
  return 'generic';
};

async function call<T>(path: string, init: RequestInit & { shopperIp?: string } = {}): Promise<T> {
  if (!SHOP_API_URL || !WEB_API_TOKEN) throw new ShopError('unavailable', 503);
  const headers = new Headers(init.headers);
  headers.set('x-web-token', WEB_API_TOKEN);
  headers.set('accept', 'application/json');
  if (init.shopperIp) headers.set('x-shopper-ip', init.shopperIp);
  let response: Response;
  try {
    response = await fetch(`${SHOP_API_URL.replace(/\/$/, '')}/api/public/shop${path}`, {
      ...init,
      headers,
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    throw new ShopError('unavailable', 503);
  }
  if (!response.ok) {
    // A 409 on checkout can also mean "cannot be sold right now"; the body tells which.
    let message = '';
    try {
      message = String(((await response.json()) as { error?: unknown }).error ?? '');
    } catch {
      /* not JSON */
    }
    const code =
      response.status === 409 && !/out of stock/i.test(message)
        ? 'unavailable'
        : response.status === 503 && /network/i.test(message)
          ? 'network'
          : codeFor(response.status);
    throw new ShopError(code, response.status);
  }
  return (await response.json()) as T;
}

export async function catalog(): Promise<Product[]> {
  if (mock()) return MOCK_PRODUCTS;
  return call<Product[]>('/catalog');
}

export async function paymentOptions(): Promise<PaymentOption[]> {
  if (mock()) return MOCK_OPTIONS;
  const options = await call<PaymentOption[]>('/payment-options');
  return options.filter((o) => isNetwork(o.network));
}

export async function product(slug: string): Promise<Product | null> {
  if (mock()) return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  try {
    return await call<Product>(`/products/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (error instanceof ShopError && error.code === 'not_found') return null;
    throw error;
  }
}

export async function createCheckout(input: { slug: string; email: string; locale: Locale; network: Network }, shopperIp: string): Promise<Checkout> {
  if (mock()) return mockCheckout(input);
  return call<Checkout>('/checkouts', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
    shopperIp,
  });
}

export async function getCheckout(id: string, token: string): Promise<Checkout | null> {
  if (mock()) return mockOrders.get(id)?.token === token ? mockOrders.get(id)! : null;
  try {
    return await call<Checkout>(`/checkouts/${encodeURIComponent(id)}?t=${encodeURIComponent(token)}`, { cache: 'no-store' });
  } catch (error) {
    if (error instanceof ShopError && error.code === 'not_found') return null;
    throw error;
  }
}

/** Products grouped by family, families and products sorted by name. */
export const groupByFamily = (products: Product[], otherLabel: string): { family: string; products: Product[] }[] => {
  const groups = new Map<string, Product[]>();
  for (const item of products) {
    const key = item.family?.trim() || otherLabel;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => (a === otherLabel ? 1 : b === otherLabel ? -1 : a.localeCompare(b)))
    .map(([family, items]) => ({ family, products: items.sort((a, b) => a.price - b.price || a.title.localeCompare(b.title)) }));
};

/* ---------- local preview data (SHOP_MOCK=1, or `astro dev` without SHOP_API_URL) ---------- */

const MOCK_PRODUCTS: Product[] = [
  { slug: 'pubg-mobile-60-uc', title: 'PUBG Mobile 60 UC', family: 'PUBG Mobile', price: 0.99, inStock: true },
  { slug: 'pubg-mobile-325-uc', title: 'PUBG Mobile 325 UC', family: 'PUBG Mobile', price: 4.99, inStock: true },
  { slug: 'pubg-mobile-660-uc', title: 'PUBG Mobile 660 UC', family: 'PUBG Mobile', price: 9.99, inStock: true },
  { slug: 'valorant-475-vp', title: 'VALORANT 475 VP', family: 'VALORANT', price: 4.99, inStock: true },
  { slug: 'valorant-1000-vp', title: 'VALORANT 1000 VP', family: 'VALORANT', price: 9.99, inStock: false },
  { slug: 'steam-wallet-10-usd', title: 'Steam Wallet 10 USD', family: 'Steam', price: 10.6, inStock: true },
  { slug: 'steam-wallet-20-usd', title: 'Steam Wallet 20 USD', family: 'Steam', price: 21.1, inStock: true },
  { slug: 'razer-gold-10-usd', title: 'Razer Gold 10 USD', family: 'Razer Gold', price: 10.4, inStock: true },
  { slug: 'google-play-10-usd', title: 'Google Play 10 USD', family: 'Google Play', price: 10.5, inStock: true },
  { slug: 'mobile-legends-86-diamonds', title: 'Mobile Legends 86 Diamonds', family: 'Mobile Legends', price: 1.59, inStock: true },
];

const mockOrders = new Map<string, Checkout>();

const MOCK_OPTIONS: PaymentOption[] = [
  { network: 'TRC20', label: 'Tron (TRC20)', asset: 'USDT' },
  { network: 'ERC20', label: 'Ethereum (ERC20)', asset: 'USDT' },
  { network: 'BEP20', label: 'BNB Smart Chain (BEP20)', asset: 'USDT' },
];

function mockCheckout(input: { slug: string; email: string; locale: Locale; network: Network }): Checkout {
  const item = MOCK_PRODUCTS.find((p) => p.slug === input.slug);
  if (!item) throw new ShopError('not_found', 404);
  if (!item.inStock) throw new ShopError('out_of_stock', 409);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email)) throw new ShopError('invalid_email', 400);
  const id = crypto.randomUUID();
  const now = Date.now();
  const checkout: Checkout = {
    id,
    number: `W${String(now).slice(-8)}`,
    token: crypto.randomUUID().replace(/-/g, ''),
    status: 'AWAITING_PAYMENT',
    title: item.title,
    slug: item.slug,
    email: input.email.replace(/^(.).*(@.*)$/, '$1***$2'),
    locale: input.locale,
    amount: (item.price + Math.floor(Math.random() * 999 + 1) / 1000).toFixed(3),
    network: input.network,
    networkLabel: MOCK_OPTIONS.find((o) => o.network === input.network)!.label,
    asset: 'USDT',
    payTo: input.network === 'TRC20' ? 'TXYZmockAddressForLocalPreviewOnly000' : '0x000000000000000000000000000000000000dEaD',
    expiresAt: new Date(now + 60 * 60 * 1000).toISOString(),
    paidAt: null,
    createdAt: new Date(now).toISOString(),
  };
  mockOrders.set(id, checkout);
  return checkout;
}
