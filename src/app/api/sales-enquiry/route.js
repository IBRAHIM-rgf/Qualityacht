// src/app/api/sales-enquiry/route.js
//
// Reception des demandes commerciales Sales (/sales/enquiry).
//
// Contrat de reponse :
//   - { ok: true, delivered: true }  -> sendMail a REELLEMENT resolu. Seul cas ou
//     l'interface a le droit d'afficher une confirmation d'envoi.
//   - { ok: true }  sans `delivered` -> honeypot declenche. On renvoie 200 pour ne rien
//     apprendre au robot, mais rien n'a ete envoye : c'est l'unique exception au 200.
//   - 503 -> configuration SMTP incomplete. 502 -> l'envoi a echoue.
// Sans configuration SMTP complete la route repond 503, jamais un faux succes.

import nodemailer from 'nodemailer';
import {
  INTENTS,
  FIELD_LABELS,
  LISTING_CATEGORIES,
  CONTACT_METHODS,
  MAX_LENGTHS,
  isValidIntent,
  validateEnquiry,
} from '@/lib/salesEnquiry';
import { getYacht, getYachtRef } from '@/app/sales/motor/data';

export const runtime = 'nodejs';

const REQUIRED_ENV = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM_EMAIL',
  'SALES_ENQUIRY_TO_EMAIL',
];

function missingEnv() {
  return REQUIRED_ENV.filter((k) => !process.env[k] || !String(process.env[k]).trim());
}

/** Neutralise les caracteres qui permettraient d'injecter un en-tete SMTP. */
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

/**
 * Nettoie une valeur texte SANS la raccourcir : tronquer ici masquerait un depassement
 * et empecherait validateEnquiry de le refuser. Le controle de longueur a lieu ensuite,
 * sur cette valeur brute, et une charge trop longue produit un 400.
 */
function clean(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/\0/g, '').trim();
}

function labelForCategory(value) {
  return LISTING_CATEGORIES.find((c) => c.value === value)?.label || null;
}

function labelForContactMethod(value) {
  return CONTACT_METHODS.find((c) => c.value === value)?.label || null;
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot : champ invisible pour un humain. S'il est rempli, on abandonne
  // silencieusement — le robot recoit un 200 et croit avoir reussi.
  if (typeof payload?.website === 'string' && payload.website.trim() !== '') {
    // Volontairement SANS `delivered` : l'interface ne peut donc pas afficher de
    // confirmation d'envoi, alors que le robot recoit bien un 200.
    return Response.json({ ok: true });
  }

  if (!isValidIntent(payload?.intent)) {
    return Response.json({ ok: false, error: 'invalid_intent' }, { status: 400 });
  }
  const intent = payload.intent;
  const config = INTENTS[intent];

  // On ne conserve que les champs attendus pour cette intention : rien d'autre
  // du corps de la requete n'atteint l'e-mail.
  const baseFields = ['firstName', 'lastName', 'email', 'phone', 'country', 'contactMethod', 'message'];
  const allowed = [...baseFields, ...config.extraFields.filter((f) => f !== 'categories')];

  const data = { intent, consent: payload?.consent === true };
  for (const field of allowed) data[field] = clean(payload?.[field]);

  if (config.extraFields.includes('categories')) {
    const raw = Array.isArray(payload?.categories) ? payload.categories : [];
    data.categories = raw
      .filter((v) => typeof v === 'string')
      .filter((v) => LISTING_CATEGORIES.some((c) => c.value === v))
      .slice(0, LISTING_CATEGORIES.length);
  }

  // Le yacht est resolu depuis son identifiant cote serveur : le navigateur ne
  // choisit jamais le nom affiche dans l'e-mail.
  let yacht = null;
  if (config.requiresYacht) {
    const yachtId = clean(payload?.yachtId);
    yacht = getYacht(yachtId);
    if (!yacht) {
      return Response.json({ ok: false, error: 'unknown_yacht' }, { status: 400 });
    }
    data.yachtId = yachtId;
  }

  const { ok, errors } = validateEnquiry(data);
  if (!ok) {
    return Response.json({ ok: false, error: 'validation_failed', errors }, { status: 400 });
  }

  // Configuration absente : on le dit franchement plutot que de simuler un envoi.
  const missing = missingEnv();
  if (missing.length) {
    console.error(`sales-enquiry: envoi impossible, variables SMTP manquantes (${missing.join(', ')})`);
    return Response.json({ ok: false, error: 'email_not_configured' }, { status: 503 });
  }

  // Construction du corps du message a partir des seuls champs retenus.
  const rows = [];
  const push = (field, value) => {
    if (value === null || value === undefined || value === '') return;
    rows.push([FIELD_LABELS[field] || field, value]);
  };

  push('firstName', data.firstName);
  push('lastName', data.lastName);
  push('email', data.email);
  push('phone', data.phone);
  push('country', data.country);
  push('contactMethod', labelForContactMethod(data.contactMethod));
  if (yacht) {
    rows.push(['Yacht', `${yacht.name} — ${yacht.builder} ${yacht.model} (${yacht.year})`]);
    rows.push(['Reference', getYachtRef(yacht)]);
    rows.push(['Listing', `/sales/motor/${yacht.id}`]);
  }
  for (const field of config.extraFields) {
    if (field === 'categories') {
      const labels = (data.categories || []).map(labelForCategory).filter(Boolean);
      if (labels.length) rows.push([FIELD_LABELS.categories, labels.join(', ')]);
    } else {
      push(field, data[field]);
    }
  }
  push('message', data.message);
  rows.push(['Consent', 'Given — may use these details to answer this enquiry']);

  // Le sujet vient du catalogue d'intentions, jamais d'une valeur saisie.
  const subject = headerSafe(`[Sales] ${config.subject}${yacht ? ` — ${yacht.name}` : ''}`);

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const html = `<table cellpadding="8" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222">
  <thead><tr><th colspan="2" align="left" style="border-bottom:2px solid #C2622A;padding-bottom:8px">${escapeHtml(config.subject)}</th></tr></thead>
  <tbody>
${rows
  .map(
    ([label, value]) =>
      `    <tr><td style="border-bottom:1px solid #eee;color:#666;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="border-bottom:1px solid #eee"><pre style="margin:0;font:inherit;white-space:pre-wrap">${escapeHtml(value)}</pre></td></tr>`,
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
      to: process.env.SALES_ENQUIRY_TO_EMAIL,
      replyTo: headerSafe(data.email),
      subject,
      text,
      html,
    });
  } catch (error) {
    // On journalise le type d'echec, jamais le contenu de la demande.
    console.error('sales-enquiry: sendMail a echoue —', error?.message || 'erreur inconnue');
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }

  // Atteint uniquement apres resolution reelle de sendMail : seul endroit du fichier
  // ou `delivered` est pose a true.
  return Response.json({ ok: true, delivered: true });
}
