// src/lib/adminAuth.js
//
// Authentification de l'administration : session signee posee dans un cookie HttpOnly.
//
// Le secret ADMIN_SECRET_TOKEN ne quitte JAMAIS le serveur. Il sert uniquement a
// verifier la saisie au moment de la connexion, puis a signer la session. Le cookie
// ne contient que { version, expiration, nonce } et leur signature HMAC : meme lu,
// il ne revele pas le secret, et toute alteration invalide la signature.
//
// Module serveur uniquement — ne jamais l'importer depuis un composant client.

import 'server-only';

import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';

export const ADMIN_COOKIE_NAME = 'qy_admin_session';

/** Duree de vie d'une session d'administration. */
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60; // 8 heures

const SESSION_VERSION = 1;

function getSecret() {
  const secret = process.env.ADMIN_SECRET_TOKEN;
  return secret && String(secret).trim() ? String(secret) : null;
}

export function isAdminAuthConfigured() {
  return getSecret() !== null;
}

function base64url(buf) {
  return Buffer.from(buf).toString('base64url');
}

/**
 * Comparaison a temps constant. Les deux valeurs sont d'abord condensees en HMAC de
 * longueur fixe : timingSafeEqual exige des tampons de meme taille, et comparer les
 * condenses evite de divulguer la longueur du secret attendu.
 */
export function safeCompare(a, b) {
  const secret = getSecret();
  if (secret === null) return false;
  const digest = (v) => createHmac('sha256', secret).update(String(v ?? '')).digest();
  try {
    return timingSafeEqual(digest(a), digest(b));
  } catch {
    return false;
  }
}

/** Verifie le secret saisi au moment de la connexion. */
export function verifyAdminSecret(candidate) {
  const secret = getSecret();
  if (secret === null) return false;
  if (typeof candidate !== 'string' || candidate.length === 0 || candidate.length > 512) return false;
  return safeCompare(candidate, secret);
}

function sign(payloadB64) {
  const secret = getSecret();
  return createHmac('sha256', secret).update(payloadB64).digest('base64url');
}

/**
 * Fabrique la valeur du cookie de session : "<payload base64url>.<signature>".
 * Le payload ne contient aucun secret.
 */
export function createSessionValue(nowMs = Date.now()) {
  if (!isAdminAuthConfigured()) return null;
  const payload = {
    v: SESSION_VERSION,
    exp: Math.floor(nowMs / 1000) + SESSION_MAX_AGE_SECONDS,
    n: base64url(randomBytes(16)),
  };
  const payloadB64 = base64url(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

/**
 * Valide une valeur de cookie : format, signature, version, expiration.
 * Retourne false a la moindre anomalie.
 */
export function verifySessionValue(value, nowMs = Date.now()) {
  if (!isAdminAuthConfigured()) return false;
  if (typeof value !== 'string' || value.length === 0 || value.length > 4096) return false;

  const dot = value.indexOf('.');
  if (dot <= 0 || dot === value.length - 1) return false;
  const payloadB64 = value.slice(0, dot);
  const providedSig = value.slice(dot + 1);

  // Signature comparee a temps constant.
  let expected;
  try {
    expected = sign(payloadB64);
  } catch {
    return false;
  }
  const a = Buffer.from(providedSig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
  } catch {
    return false;
  }
  if (!payload || payload.v !== SESSION_VERSION) return false;
  if (typeof payload.exp !== 'number' || !Number.isFinite(payload.exp)) return false;
  if (payload.exp * 1000 <= nowMs) return false;

  return true;
}

/** Options du cookie de session. `Secure` uniquement hors developpement. */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

/** Lit la session depuis les cookies de la requete (composants et routes serveur). */
export async function hasValidAdminSession() {
  try {
    // Import dynamique : `next/headers` n'existe qu'a l'interieur du runtime Next.
    // Le charger ici garde le module testable isolement en Node.
    const { cookies } = await import('next/headers');
    const store = await cookies();
    return verifySessionValue(store.get(ADMIN_COOKIE_NAME)?.value);
  } catch {
    return false;
  }
}

/** Variante pour les routes API, qui disposent de l'objet Request. */
export function hasValidAdminSessionFromRequest(request) {
  const raw = request?.headers?.get?.('cookie') || '';
  for (const part of raw.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() !== ADMIN_COOKIE_NAME) continue;
    const raw2 = part.slice(eq + 1).trim();
    // Un cookie mal encode (ex. "%") fait lever decodeURIComponent : on refuse,
    // on ne laisse jamais l'exception remonter en 500.
    let decoded;
    try {
      decoded = decodeURIComponent(raw2);
    } catch {
      return false;
    }
    return verifySessionValue(decoded);
  }
  return false;
}

/**
 * Garde commune a toutes les routes /api/admin/.
 * Retourne une Response a renvoyer telle quelle, ou null si l'appel est autorise.
 */
export function guardAdminRoute(request) {
  if (!isAdminAuthConfigured()) {
    console.error('admin: ADMIN_SECRET_TOKEN non configure');
    return Response.json({ error: 'admin_not_configured' }, { status: 503, headers: NO_STORE });
  }
  if (!hasValidAdminSessionFromRequest(request)) {
    return Response.json({ error: 'unauthorized' }, { status: 401, headers: NO_STORE });
  }
  if (!isSameOrigin(request)) {
    return Response.json({ error: 'bad_origin' }, { status: 403, headers: NO_STORE });
  }
  return null;
}

const MUTATING = new Set(['POST', 'PATCH', 'PUT', 'DELETE']);

/**
 * Controle d'origine STRICT pour les methodes mutantes : l'en-tete Origin doit etre
 * present et correspondre exactement a l'origine de la requete, protocole compris.
 * Un Origin absent est refuse — les navigateurs l'envoient systematiquement sur ces
 * methodes, donc son absence signale un client non conforme.
 * GET et HEAD restent autorises sans Origin.
 */
export function isSameOrigin(request) {
  const method = (request?.method || 'GET').toUpperCase();
  if (!MUTATING.has(method)) return true;

  const origin = request.headers?.get?.('origin');
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

/** En-tetes a appliquer a toute reponse d'administration. */
export const NO_STORE = {
  'Cache-Control': 'no-store, max-age=0, must-revalidate',
  'Referrer-Policy': 'no-referrer',
};
