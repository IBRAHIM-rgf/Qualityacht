// src/app/api/contact/route.js
//
// Formulaire de contact de l'accueil.
//
// Contrat de reponse, identique a celui de /api/sales-enquiry :
//   - { ok: true, delivered: true }  -> sendMail a REELLEMENT resolu. Seul cas ou
//     l'interface a le droit d'annoncer un envoi.
//   - { ok: true } sans `delivered`  -> honeypot declenche. 200 pour ne rien
//     apprendre au robot, mais rien n'a ete transmis.
//   - 503 -> configuration SMTP incomplete. 502 -> l'envoi a echoue.

import nodemailer from 'nodemailer';
import {
  FIELD_LABELS,
  MAX_LENGTHS,
  labelForReason,
  validateContact,
} from '@/lib/contactForm';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REQUIRED_ENV = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM_EMAIL',
  'CONTACT_TO_EMAIL',
];

function missingEnv() {
  return REQUIRED_ENV.filter((k) => !process.env[k] || !String(process.env[k]).trim());
}

/** Neutralise ce qui permettrait d'injecter un en-tete SMTP. */
function headerSafe(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Nettoie SANS raccourcir : la longueur est validee ensuite sur la valeur brute. */
function clean(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/\0/g, '').trim();
}

/** Origine stricte sur les methodes mutantes. */
function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot : invisible pour un humain. Rempli => abandon silencieux.
  if (typeof payload?.website === 'string' && payload.website.trim() !== '') {
    return Response.json({ ok: true });
  }

  if (!isSameOrigin(request)) {
    return Response.json({ ok: false, error: 'bad_origin' }, { status: 403 });
  }

  const data = {
    reason: clean(payload?.reason),
    fullName: clean(payload?.fullName),
    email: clean(payload?.email),
    phone: clean(payload?.phone),
    company: clean(payload?.company),
    message: clean(payload?.message),
    consent: payload?.consent === true,
  };

  const { ok, errors } = validateContact(data);
  if (!ok) {
    return Response.json({ ok: false, error: 'validation_failed', errors }, { status: 400 });
  }

  const missing = missingEnv();
  if (missing.length) {
    // On journalise les NOMS manquants, jamais de valeur ni de donnee visiteur.
    console.error(`contact: envoi impossible, variables manquantes (${missing.join(', ')})`);
    return Response.json({ ok: false, error: 'email_not_configured' }, { status: 503 });
  }

  const rows = [
    [FIELD_LABELS.reason, labelForReason(data.reason)],
    [FIELD_LABELS.fullName, data.fullName],
    [FIELD_LABELS.email, data.email],
    [FIELD_LABELS.phone, data.phone],
    ...(data.company ? [[FIELD_LABELS.company, data.company]] : []),
    ...(data.message ? [[FIELD_LABELS.message, data.message]] : []),
    ['Consent', 'Given — may use these details to answer this enquiry'],
  ];

  // Le sujet vient du catalogue de motifs, jamais d'une valeur saisie.
  const subject = headerSafe(`[Website] ${labelForReason(data.reason)}`);
  const text = rows.map(([l, v]) => `${l}: ${v}`).join('\n');
  const html = `<table cellpadding="8" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222">
  <thead><tr><th colspan="2" align="left" style="border-bottom:2px solid #C2622A;padding-bottom:8px">${escapeHtml(labelForReason(data.reason))}</th></tr></thead>
  <tbody>
${rows
  .map(
    ([l, v]) =>
      `    <tr><td style="border-bottom:1px solid #eee;color:#666;white-space:nowrap;vertical-align:top">${escapeHtml(l)}</td><td style="border-bottom:1px solid #eee"><pre style="margin:0;font:inherit;white-space:pre-wrap">${escapeHtml(v)}</pre></td></tr>`,
  )
  .join('\n')}
  </tbody>
</table>`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: headerSafe(data.email),
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error('contact: sendMail a echoue —', error?.message || 'erreur inconnue');
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }

  // Atteint uniquement apres resolution reelle de sendMail.
  return Response.json({ ok: true, delivered: true });
}
