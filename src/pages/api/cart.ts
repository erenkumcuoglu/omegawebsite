import type { APIRoute } from 'astro';
import { changeCart, readCart, writeCart } from '../../lib/cart';
import { field, localeOf, safePath } from '../../lib/form';
import { secureCookies } from '../../lib/session';

/**
 * Cart changes from plain HTML forms.
 * action=add (product page, back with ?added=1), buy (add, then cart), set / remove (cart page).
 */
export const POST: APIRoute = async ({ request, cookies, url, redirect }) => {
  const form = await request.formData();
  const locale = localeOf(form);
  const action = field(form, 'action');
  const slug = field(form, 'slug');
  const quantity = Number(field(form, 'quantity') || '1');
  const cartPage = `/${locale}/cart`;
  const back = safePath(field(form, 'back'), cartPage);

  const mode = action === 'set' || action === 'remove' ? 'set' : 'add';
  const { cart, full } = changeCart(readCart(cookies), slug, action === 'remove' ? 0 : Number.isFinite(quantity) ? quantity : 1, mode);
  writeCart(cookies, cart, secureCookies(url));

  if (full) return redirect(`${cartPage}?error=cart_full`, 303);
  if (action === 'add') return redirect(`${back}?added=1`, 303);
  return redirect(cartPage, 303);
};

export const GET: APIRoute = ({ redirect }) => redirect('/', 302);
