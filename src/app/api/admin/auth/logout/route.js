// src/app/api/admin/auth/logout/route.js
//
// Deconnexion : efface le cookie de session. N'exige aucune valeur secrete cote
// navigateur — se deconnecter doit toujours rester possible.

import { ADMIN_COOKIE_NAME, NO_STORE, isSameOrigin } from '@/lib/adminAuth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: 'bad_origin' }, { status: 403, headers: NO_STORE });
  }

  const res = Response.json({ ok: true }, { headers: NO_STORE });
  const parts = [
    `${ADMIN_COOKIE_NAME}=`,
    'Path=/',
    'Max-Age=0',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'HttpOnly',
    'SameSite=Strict',
  ];
  if (process.env.NODE_ENV === 'production') parts.push('Secure');
  res.headers.append('Set-Cookie', parts.join('; '));
  return res;
}
