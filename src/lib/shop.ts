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

/**
 * A USDT network id as the Omega API names it (TRC20, ERC20, BEP20, POLYGON, ARBITRUM, AVAXC, SOLANA, TON, ...).
 * Not a fixed list here: whatever GET /payment-options offers is shown, and the API checks it again.
 */
export type Network = string;
export const isNetwork = (value: unknown): value is Network => typeof value === 'string' && /^[A-Z0-9_]{2,16}$/.test(value);

/** A network the shop has an address for right now. */
export interface PaymentOption {
  network: Network;
  /** e.g. "Tron (TRC20)", "Polygon". */
  label: string;
  asset: 'USDT';
}

/** Cart limits, same as the API. */
export const MAX_LINES = 20;
export const MAX_QUANTITY = 20;

export type CheckoutStatus = 'AWAITING_PAYMENT' | 'PAID' | 'APPROVED' | 'DELIVERED' | 'REJECTED' | 'EXPIRED';

export interface CheckoutLine {
  slug: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface Checkout {
  id: string;
  number: string;
  token: string;
  kind: 'ORDER' | 'TOPUP';
  paymentMethod: 'CRYPTO' | 'BALANCE';
  status: CheckoutStatus;
  title: string;
  lines: CheckoutLine[];
  /** USD. */
  total: number;
  email: string;
  locale: string;
  /** Crypto payments only: exact USDT to send, network and our address. */
  amount: string | null;
  network: string | null;
  networkLabel: string | null;
  asset: string;
  payTo: string | null;
  expiresAt: string;
  paidAt: string | null;
  createdAt: string;
  slug: string | null;
}

export interface Account {
  email: string;
  locale: string;
  /** A first order was delivered: balance top-up is open. */
  verified: boolean;
  balance: number;
  topup: { min: number; max: number; allowed: boolean };
  entries: { kind: 'TOPUP' | 'PURCHASE' | 'RETURN' | 'ADJUSTMENT'; amount: number; orderNumber: string | null; createdAt: string }[];
  orders: Checkout[];
}

/** What went wrong, as a key the pages can translate (err_<code>). */
export type ShopErrorCode =
  | 'invalid_email'
  | 'invalid'
  | 'network'
  | 'out_of_stock'
  | 'unavailable'
  | 'too_many'
  | 'sign_in'
  | 'insufficient'
  | 'topup_locked'
  | 'login_invalid'
  | 'not_found'
  | 'generic';

export class ShopError extends Error {
  constructor(readonly code: ShopErrorCode, readonly status: number) {
    super(code);
  }
}

const mock = (): boolean => SHOP_MOCK === '1' || (!SHOP_API_URL && import.meta.env.DEV);
export const isMock = mock;

/** HTTP status + API message → a code the site can explain. */
const codeFor = (status: number, message: string, path: string): ShopErrorCode => {
  if (status === 400) return /e-?mail/i.test(message) ? 'invalid_email' : 'invalid';
  if (status === 401) return path.startsWith('/auth/verify') ? 'login_invalid' : 'sign_in';
  if (status === 402) return 'insufficient';
  if (status === 403) return 'topup_locked';
  if (status === 404) return 'not_found';
  if (status === 409) return /stock/i.test(message) ? 'out_of_stock' : 'unavailable';
  if (status === 429) return 'too_many';
  if (status === 503) return /network/i.test(message) ? 'network' : 'unavailable';
  return 'generic';
};

interface CallOptions extends RequestInit {
  shopperIp?: string;
  /** The buyer's session from our cookie. */
  session?: string;
}

async function call<T>(path: string, init: CallOptions = {}): Promise<T> {
  if (!SHOP_API_URL || !WEB_API_TOKEN) throw new ShopError('unavailable', 503);
  const { shopperIp, session, ...request } = init;
  const headers = new Headers(request.headers);
  headers.set('x-web-token', WEB_API_TOKEN);
  headers.set('accept', 'application/json');
  if (request.body) headers.set('content-type', 'application/json');
  if (shopperIp) headers.set('x-shopper-ip', shopperIp);
  if (session) headers.set('x-customer-session', session);
  let response: Response;
  try {
    response = await fetch(`${SHOP_API_URL.replace(/\/$/, '')}/api/public/shop${path}`, {
      ...request,
      headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    throw new ShopError('unavailable', 503);
  }
  if (!response.ok) {
    let message = '';
    try {
      message = String(((await response.json()) as { error?: unknown }).error ?? '');
    } catch {
      /* not JSON */
    }
    throw new ShopError(codeFor(response.status, message, path), response.status);
  }
  if (response.status === 202 || response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

const post = <T>(path: string, body: unknown, options: CallOptions = {}) => call<T>(path, { ...options, method: 'POST', body: JSON.stringify(body) });

/* ---------- catalog ---------- */

export async function catalog(): Promise<Product[]> {
  if (mock()) return MOCK_PRODUCTS;
  return call<Product[]>('/catalog');
}

export async function paymentOptions(): Promise<PaymentOption[]> {
  if (mock()) return MOCK_OPTIONS;
  const options = await call<PaymentOption[]>('/payment-options');
  return options.filter((o) => isNetwork(o.network));
}

/* ---------- checkout ---------- */

export interface CheckoutInput {
  items: { slug: string; quantity: number }[];
  /** Guests only; a signed-in buyer's e-mail comes from the account. */
  email?: string;
  locale: Locale;
  payWith: 'crypto' | 'balance';
  network?: Network;
}

export async function createCheckout(input: CheckoutInput, context: { ip: string; session?: string }): Promise<Checkout> {
  if (mock()) return mockCheckout(input, context.session);
  return post<Checkout>('/checkouts', input, { shopperIp: context.ip, session: context.session });
}

export async function getCheckout(id: string, token: string): Promise<Checkout | null> {
  if (mock()) return mockOrders.get(id)?.token === token ? mockOrders.get(id)! : null;
  try {
    return await call<Checkout>(`/checkouts/${encodeURIComponent(id)}?t=${encodeURIComponent(token)}`);
  } catch (error) {
    if (error instanceof ShopError && error.code === 'not_found') return null;
    throw error;
  }
}

/* ---------- accounts ---------- */

/** Always "sent", whether or not the address has an account. In mock mode returns the link. */
export async function requestLoginLink(email: string, locale: Locale, ip: string, siteOrigin: string): Promise<string | null> {
  if (mock()) return mockLoginLink(email, locale, siteOrigin);
  await post<void>('/auth/login-link', { email, locale }, { shopperIp: ip });
  return null;
}

export async function verifyLogin(token: string, ip: string): Promise<{ session: string; expiresAt: string; account: Account }> {
  if (mock()) return mockVerify(token);
  return post('/auth/verify', { token }, { shopperIp: ip });
}

export async function logout(session: string): Promise<void> {
  if (mock()) {
    mockSessions.delete(session);
    return;
  }
  await post<void>('/auth/logout', {}, { session });
}

/** The signed-in account, or null when the session is missing or no longer valid. */
export async function me(session: string | undefined): Promise<Account | null> {
  if (!session) return null;
  if (mock()) return mockAccount(session);
  try {
    return await call<Account>('/me', { session });
  } catch (error) {
    if (error instanceof ShopError && error.code === 'sign_in') return null;
    throw error;
  }
}

export async function createTopup(amount: number, network: Network, context: { ip: string; session: string }): Promise<Checkout> {
  if (mock()) return mockTopup(amount, network, context.session);
  return post<Checkout>('/topups', { amount, network }, { shopperIp: context.ip, session: context.session });
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

/* ---------- local preview (SHOP_MOCK=1, or `astro dev` without SHOP_API_URL); one process only ---------- */

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

const MOCK_OPTIONS: PaymentOption[] = [
  { network: 'TRC20', label: 'Tron (TRC20)', asset: 'USDT' },
  { network: 'ERC20', label: 'Ethereum (ERC20)', asset: 'USDT' },
  { network: 'BEP20', label: 'BNB Smart Chain (BEP20)', asset: 'USDT' },
  { network: 'POLYGON', label: 'Polygon', asset: 'USDT' },
  { network: 'ARBITRUM', label: 'Arbitrum One', asset: 'USDT' },
  { network: 'AVAXC', label: 'Avalanche C-Chain', asset: 'USDT' },
  { network: 'SOLANA', label: 'Solana (SPL)', asset: 'USDT' },
  { network: 'TON', label: 'TON', asset: 'USDT' },
];

interface MockCustomer {
  email: string;
  locale: Locale;
  balance: number;
  verified: boolean;
  entries: Account['entries'];
}

const mockOrders = new Map<string, Checkout>();
const mockCustomers = new Map<string, MockCustomer>();
const mockTokens = new Map<string, string>();
const mockSessions = new Map<string, string>();
const round2 = (n: number) => Math.round(n * 100) / 100;
const masked = (email: string) => email.replace(/^(.).*(@.*)$/, '$1***$2');

function mockLoginLink(email: string, locale: Locale, origin: string): string {
  const address = email.trim().toLowerCase();
  if (!mockCustomers.has(address)) {
    // The sample account has a delivered order and some balance, so every screen can be seen.
    mockCustomers.set(address, { email: address, locale, balance: 25, verified: true, entries: [{ kind: 'TOPUP', amount: 25, orderNumber: 'W00000001', createdAt: new Date().toISOString() }] });
  }
  const token = crypto.randomUUID().replace(/-/g, '');
  mockTokens.set(token, address);
  return `${origin}/${locale}/account/login?token=${token}`;
}

function mockVerify(token: string): { session: string; expiresAt: string; account: Account } {
  const email = mockTokens.get(token);
  if (!email) throw new ShopError('login_invalid', 401);
  mockTokens.delete(token);
  const session = crypto.randomUUID().replace(/-/g, '');
  mockSessions.set(session, email);
  return { session, expiresAt: new Date(Date.now() + 30 * 864e5).toISOString(), account: mockAccount(session)! };
}

function mockAccount(session: string): Account | null {
  const email = mockSessions.get(session);
  const customer = email ? mockCustomers.get(email) : undefined;
  if (!customer) return null;
  return {
    email: customer.email,
    locale: customer.locale,
    verified: customer.verified,
    balance: round2(customer.balance),
    topup: { min: 5, max: 2000, allowed: customer.verified },
    entries: [...customer.entries].reverse(),
    orders: [...mockOrders.values()].filter((o) => o.email === masked(customer.email)).reverse(),
  };
}

function mockCrypto(total: number, network: Network) {
  return {
    amount: (total + Math.floor(Math.random() * 999 + 1) / 1000).toFixed(3),
    network,
    networkLabel: MOCK_OPTIONS.find((o) => o.network === network)!.label,
    payTo:
      network === 'TRC20'
        ? 'TXYZmockAddressForLocalPreviewOnly000'
        : network === 'SOLANA'
          ? 'MockSoLanaAddressForLocalPreviewOnly1111111'
          : network === 'TON'
            ? 'UQMockTonAddressForLocalPreviewOnly_000000000000'
            : '0x000000000000000000000000000000000000dEaD',
  };
}

function mockCheckout(input: CheckoutInput, session?: string): Checkout {
  const customer = session ? mockCustomers.get(mockSessions.get(session) ?? '') : undefined;
  if (input.payWith === 'balance' && !customer) throw new ShopError('sign_in', 401);
  const email = customer?.email ?? input.email;
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new ShopError('invalid_email', 400);
  if (input.items.length === 0 || input.items.length > MAX_LINES) throw new ShopError('invalid', 400);
  const lines: CheckoutLine[] = input.items.map(({ slug, quantity }) => {
    const item = MOCK_PRODUCTS.find((p) => p.slug === slug);
    if (!item) throw new ShopError('not_found', 404);
    if (!item.inStock) throw new ShopError('out_of_stock', 409);
    if (quantity < 1 || quantity > MAX_QUANTITY) throw new ShopError('invalid', 400);
    return { slug, title: item.title, quantity, unitPrice: item.price };
  });
  const total = round2(lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0));
  if (input.payWith === 'crypto' && !input.network) throw new ShopError('network', 503);
  if (input.payWith === 'balance' && customer!.balance < total) throw new ShopError('insufficient', 402);
  const now = Date.now();
  const byBalance = input.payWith === 'balance';
  if (byBalance) {
    customer!.balance = round2(customer!.balance - total);
    customer!.entries.push({ kind: 'PURCHASE', amount: -total, orderNumber: null, createdAt: new Date(now).toISOString() });
  }
  const checkout: Checkout = {
    id: crypto.randomUUID(),
    number: `W${String(now).slice(-8)}`,
    token: crypto.randomUUID().replace(/-/g, ''),
    kind: 'ORDER',
    paymentMethod: byBalance ? 'BALANCE' : 'CRYPTO',
    status: byBalance ? 'PAID' : 'AWAITING_PAYMENT',
    title: lines.length === 1 ? lines[0].title : `${lines.length} products`,
    lines,
    total,
    email: masked(email),
    locale: input.locale,
    ...(byBalance ? { amount: null, network: null, networkLabel: null, payTo: null } : mockCrypto(total, input.network!)),
    asset: 'USDT',
    expiresAt: new Date(now + (byBalance ? 0 : 60 * 60 * 1000)).toISOString(),
    paidAt: byBalance ? new Date(now).toISOString() : null,
    createdAt: new Date(now).toISOString(),
    slug: lines[0].slug,
  };
  if (byBalance) customer!.entries[customer!.entries.length - 1].orderNumber = checkout.number;
  mockOrders.set(checkout.id, checkout);
  return checkout;
}

function mockTopup(amount: number, network: Network, session: string): Checkout {
  const customer = mockCustomers.get(mockSessions.get(session) ?? '');
  if (!customer) throw new ShopError('sign_in', 401);
  if (!customer.verified) throw new ShopError('topup_locked', 403);
  if (!(amount >= 5 && amount <= 2000)) throw new ShopError('invalid', 400);
  const now = Date.now();
  const checkout: Checkout = {
    id: crypto.randomUUID(),
    number: `W${String(now).slice(-8)}`,
    token: crypto.randomUUID().replace(/-/g, ''),
    kind: 'TOPUP',
    paymentMethod: 'CRYPTO',
    status: 'AWAITING_PAYMENT',
    title: 'Balance top-up',
    lines: [],
    total: round2(amount),
    email: masked(customer.email),
    locale: customer.locale,
    ...mockCrypto(amount, network),
    asset: 'USDT',
    expiresAt: new Date(now + 60 * 60 * 1000).toISOString(),
    paidAt: null,
    createdAt: new Date(now).toISOString(),
    slug: null,
  };
  mockOrders.set(checkout.id, checkout);
  return checkout;
}
