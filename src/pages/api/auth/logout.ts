import type { APIRoute } from 'astro';
import { localeOf } from '../../../lib/form';
import { logout } from '../../../lib/shop';
import { clearSession, readSession } from '../../../lib/session';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const locale = localeOf(await request.formData());
  const session = readSession(cookies);
  clearSession(cookies);
  if (session) await logout(session).catch(() => undefined);
  return redirect(`/${locale}`, 303);
};

export const GET: APIRoute = ({ redirect }) => redirect('/', 302);
