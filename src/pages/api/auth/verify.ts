import type { APIRoute } from 'astro';
import { field, localeOf } from '../../../lib/form';
import { verifyLogin } from '../../../lib/shop';
import { secureCookies, writeSession } from '../../../lib/session';

/**
 * The sign-in page posts the link's token here. It is a POST (a button press), not the link itself,
 * so mail scanners that open links cannot use up the one-time token.
 */
export const POST: APIRoute = async ({ request, cookies, url, redirect, clientAddress }) => {
  const form = await request.formData();
  const locale = localeOf(form);
  const token = field(form, 'token');
  if (token.length < 10 || token.length > 200) return redirect(`/${locale}/account/login?error=login_invalid`, 303);
  try {
    const { session, expiresAt } = await verifyLogin(token, clientAddress);
    writeSession(cookies, session, expiresAt, secureCookies(url));
    return redirect(`/${locale}/account`, 303);
  } catch {
    return redirect(`/${locale}/account/login?error=login_invalid`, 303);
  }
};

export const GET: APIRoute = ({ redirect }) => redirect('/', 302);
