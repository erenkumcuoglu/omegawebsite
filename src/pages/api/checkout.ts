import type { APIRoute } from 'astro';
import { DEFAULT_LOCALE, isLocale } from '../../i18n/locales';
import { createCheckout, isNetwork, ShopError } from '../../lib/shop';

/**
 * The product form posts here (works without JavaScript). We ask the Omega API for a checkout
 * with the shared token, then send the buyer to their order page. Astro's origin check rejects
 * cross-site posts.
 */
export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  const form = await request.formData();
  const slug = String(form.get('slug') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const network = String(form.get('network') ?? '');
  const rawLocale = String(form.get('locale') ?? '');
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const back = (code: string) => redirect(`/${locale}/${encodeURIComponent(slug)}?error=${code}`, 303);

  if (!slug || slug.length > 200) return redirect(`/${locale}`, 303);
  // Honeypot: bots fill every field.
  if (String(form.get('website') ?? '') !== '') return back('generic');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) return back('invalid_email');

  if (!isNetwork(network)) return back('network');

  try {
    const checkout = await createCheckout({ slug, email, locale, network }, clientAddress);
    const response = redirect(`/${locale}/order/${encodeURIComponent(checkout.id)}?t=${encodeURIComponent(checkout.token)}`, 303);
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    return back(error instanceof ShopError ? error.code : 'generic');
  }
};

export const GET: APIRoute = ({ redirect }) => redirect('/', 302);
