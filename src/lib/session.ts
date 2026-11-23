import type { AstroCookies } from 'astro';

/** The buyer's Omega session. httpOnly: only this site's server reads it and sends it to the API. */
export const SESSION_COOKIE = 'od_session';

export const readSession = (cookies: AstroCookies): string | undefined => cookies.get(SESSION_COOKIE)?.value || undefined;

export const writeSession = (cookies: AstroCookies, session: string, expiresAt: string, secure: boolean): void => {
  cookies.set(SESSION_COOKIE, session, { path: '/', httpOnly: true, secure, sameSite: 'lax', expires: new Date(expiresAt) });
};

export const clearSession = (cookies: AstroCookies): void => cookies.delete(SESSION_COOKIE, { path: '/' });

/** Secure cookies everywhere except plain-http local development. */
export const secureCookies = (url: URL): boolean => url.protocol === 'https:';
