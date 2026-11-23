import type { APIRoute } from 'astro';
import { EMAIL, field, localeOf } from '../../../lib/form';
import { requestLoginLink, ShopError } from '../../../lib/shop';

/** Asks Omega to e-mail a sign-in link. The answer never says whether the address has an account. */
export const POST: APIRoute = async ({ request, url, redirect, clientAddress }) => {
  const form = await request.formData();
  const locale = localeOf(form);
  const email = field(form, 'email').toLowerCase();
  const page = `/${locale}/account/login`;
  if (field(form, 'website') !== '') return redirect(`${page}?sent=1`, 303);
  if (!EMAIL.test(email) || email.length > 200) return redirect(`${page}?error=invalid_email`, 303);
  try {
    const devLink = await requestLoginLink(email, locale, clientAddress, url.origin);
    // Local preview only (no e-mail is sent): show the link on the page.
    return redirect(`${page}?sent=1${devLink ? `&dev=${encodeURIComponent(devLink)}` : ''}`, 303);
  } catch (error) {
    return redirect(`${page}?error=${error instanceof ShopError ? error.code : 'generic'}`, 303);
  }
};

export const GET: APIRoute = ({ redirect }) => redirect('/', 302);
