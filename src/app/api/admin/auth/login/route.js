// src/app/api/admin/auth/login/route.js
//
// Connexion a l'administration. Le secret arrive dans le CORPS JSON, jamais dans l'URL.
// En cas de succes, un cookie de session signe est pose ; le secret n'est ni renvoye,
// ni stocke cote navigateur, ni journalise.

import {
  ADMIN_COOKIE_NAME,
  NO_STORE,
  createSessionValue,
  isAdminAuthConfigured,
  isSameOrigin,
  sessionCookieOptions,
  verifyAdminSecret,
} from '@/lib/adminAuth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!isAdminAuthConfigured()) {
    console.error('admin login: ADMIN_SECRET_TOKEN non configure');
    return Response.json({ error: 'admin_not_configured' }, { status: 503, headers: NO_STORE });
  }

  if (!isSameOrigin(request)) {
    return Response.json({ error: 'bad_origin' }, { status: 403, headers: NO_STORE });
  }

  let secret;
  try {
    const body = await request.json();
    secret = body?.secret;
  } catch {
    // Corps illisible : meme reponse generique qu'un secret errone.
    return Response.json({ error: 'invalid_credentials' }, { status: 401, headers: NO_STORE });
  }

  // Reponse volontairement identique quelle que soit la raison de l'echec.
  if (!verifyAdminSecret(secret)) {
    return Response.json({ error: 'invalid_credentials' }, { status: 401, headers: NO_STORE });
  }

  const value = createSessionValue();
  if (!value) {
    return Response.json({ error: 'admin_not_configured' }, { status: 503, headers: NO_STORE });
  }

  const res = Response.json({ ok: true }, { headers: NO_STORE });
  res.headers.append(
    'Set-Cookie',
    serializeCookie(ADMIN_COOKIE_NAME, value, sessionCookieOptions()),
  );
  return res;
}

function serializeCookie(name, value, opts) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (opts.path) parts.push(`Path=${opts.path}`);
  if (typeof opts.maxAge === 'number') parts.push(`Max-Age=${opts.maxAge}`);
  if (opts.httpOnly) parts.push('HttpOnly');
  if (opts.sameSite) parts.push(`SameSite=${opts.sameSite === 'strict' ? 'Strict' : opts.sameSite}`);
  if (opts.secure) parts.push('Secure');
  return parts.join('; ');
}
