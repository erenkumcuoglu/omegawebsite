import type { APIRoute } from 'astro';
import { getCheckout } from '../../../lib/shop';
import { noStore } from '../../../lib/http';

/** The order page polls this for its status (same token as the page link). */
export const GET: APIRoute = async ({ params, url }) => {
  const headers = new Headers({ 'content-type': 'application/json' });
  noStore(headers);
  const token = url.searchParams.get('t') ?? '';
  try {
    const checkout = params.id && token ? await getCheckout(params.id, token) : null;
    if (!checkout) return new Response(JSON.stringify({ error: 'not_found' }), { status: 404, headers });
    return new Response(JSON.stringify({ status: checkout.status }), { status: 200, headers });
  } catch {
    return new Response(JSON.stringify({ error: 'unavailable' }), { status: 503, headers });
  }
};
