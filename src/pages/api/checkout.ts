import type { APIRoute } from 'astro';
import { readCart, writeCart } from '../../lib/cart';
import { EMAIL, field, localeOf } from '../../lib/form';
import { createCheckout, isEnabledNetwork, ShopError } from '../../lib/shop';
import { readSession, secureCookies } from '../../lib/session';

/**
 * The cart page posts here (works without JavaScript). We ask the Omega API for a checkout with the
 * shared token and, when signed in, the buyer's session; then send them to the order page.
 * Astro's origin check rejects cross-site posts.
 */
export const POST: APIRoute = async ({ request, cookies, url, redirect, clientAddress }) => {
  const form = await request.formData();
  const locale = localeOf(form);
  const back = (code: string) => redirect(`/${locale}/cart?error=${code}`, 303);

  // Honeypot: bots fill every field.
  if (field(form, 'website') !== '') return back('generic');
  const items = readCart(cookies);
  if (items.length === 0) return back('cart_empty');

  const session = readSession(cookies);
  const payWith = field(form, 'payWith') === 'balance' ? 'balance' : 'crypto';
  const network = field(form, 'network');
  const email = field(form, 'email').toLowerCase();
  if (payWith === 'balance' && !session) return back('sign_in');
  if (payWith === 'crypto' && !isEnabledNetwork(network)) return back('network');
  if (!session && (!EMAIL.test(email) || email.length > 200)) return back('invalid_email');

  try {
    const checkout = await createCheckout(
      {
        items,
        locale,
        payWith,
        ...(payWith === 'crypto' && isEnabledNetwork(network) ? { network } : {}),
        ...(session ? {} : { email }),
      },
      { ip: clientAddress, session },
    );
    writeCart(cookies, [], secureCookies(url));
    return redirect(`/${locale}/order/${encodeURIComponent(checkout.id)}?t=${encodeURIComponent(checkout.token)}`, 303);
  } catch (error) {
    return back(error instanceof ShopError ? error.code : 'generic');
  }
};

export const GET: APIRoute = ({ redirect }) => redirect('/', 302);
