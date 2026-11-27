import type { APIRoute } from 'astro';
import { field, localeOf } from '../../lib/form';
import { createTopup, isEnabledNetwork, ShopError } from '../../lib/shop';
import { readSession } from '../../lib/session';

/** Balance top-up from the account page: creates a USDT payment shown on the usual order page. */
export const POST: APIRoute = async ({ request, cookies, redirect, clientAddress }) => {
  const form = await request.formData();
  const locale = localeOf(form);
  const back = (code: string) => redirect(`/${locale}/account?error=${code}`, 303);
  const session = readSession(cookies);
  if (!session) return redirect(`/${locale}/account/login`, 303);

  const amount = Math.round(Number(field(form, 'amount').replace(',', '.')) * 100) / 100;
  const network = field(form, 'network');
  if (!Number.isFinite(amount) || amount <= 0) return back('invalid');
  if (!isEnabledNetwork(network)) return back('network');

  try {
    const checkout = await createTopup(amount, network, { ip: clientAddress, session });
    return redirect(`/${locale}/order/${encodeURIComponent(checkout.id)}?t=${encodeURIComponent(checkout.token)}`, 303);
  } catch (error) {
    if (error instanceof ShopError && error.code === 'sign_in') return redirect(`/${locale}/account/login`, 303);
    return back(error instanceof ShopError ? error.code : 'generic');
  }
};

export const GET: APIRoute = ({ redirect }) => redirect('/', 302);
