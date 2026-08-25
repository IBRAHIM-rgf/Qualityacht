// src/lib/brochureRequest.js
//
// Contrat partage entre le formulaire de brochure Real Estate et /api/brochure.
// Autonome, comme contactForm.js : une evolution ici ne peut pas casser les
// formulaires Sales ou Contact deja valides.

import { DUBAI_PROGRAMMES, MARKETS } from '@/app/real-estate/partner-data';

// Catalogue ferme : le sujet du mail ne peut venir que d'ici, jamais d'une
// valeur saisie par le visiteur.
export const PROJECTS = [
  ...DUBAI_PROGRAMMES.map((p) => ({ value: p.id, label: p.name, destination: 'Dubai' })),
  ...MARKETS.filter((m) => m.id !== 'dubai').map((m) => ({
    value: `market-${m.id}`, label: `${m.name} — general enquiry`, destination: m.name,
  })),
];

export function isValidProject(v) {
  return typeof v === 'string' && PROJECTS.some((p) => p.value === v);
}

export function projectByValue(v) {
  return PROJECTS.find((p) => p.value === v) || null;
}

// Longueurs maximales. Le serveur REFUSE tout depassement, il ne tronque pas.
export const MAX_LENGTHS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  phone: 40,
  country: 80,
  message: 4000,
};

export const FIELD_LABELS = {
  project: 'Project of interest',
  destination: 'Destination',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  phone: 'Phone / WhatsApp',
  country: 'Country',
  message: 'Message',
};

// Refuse les caracteres de controle : une adresse contenant \r ou \n permettrait
// d'injecter des en-tetes SMTP via replyTo.
const EMAIL_RE = /^[^\s@<>;,"]+@[^\s@<>;,".]+\.[a-zA-Z]{2,}$/;

export function isValidEmail(value) {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  if (!v || v.length > MAX_LENGTHS.email) return false;
  if (/[\r\n\t\0]/.test(v)) return false;
  return EMAIL_RE.test(v);
}

/** Validation commune client/serveur. Retourne { ok, errors }. */
export function validateBrochureRequest(data) {
  const errors = {};

  if (!isValidProject(data.project)) {
    errors.project = 'Please choose a project.';
  }
  if (!String(data.firstName || '').trim()) errors.firstName = 'Please enter your first name.';
  if (!String(data.lastName || '').trim()) errors.lastName = 'Please enter your last name.';

  if (!String(data.email || '').trim()) errors.email = 'Please enter your email address.';
  else if (!isValidEmail(data.email)) errors.email = 'Please enter a valid email address.';

  if (!String(data.phone || '').trim()) errors.phone = 'Please enter a phone or WhatsApp number.';
  if (!String(data.country || '').trim()) errors.country = 'Please enter your country.';

  if (!data.consent) {
    errors.consent = 'Please confirm we may contact you about this request.';
  }

  // Controle sur la valeur BRUTE, avant tout nettoyage.
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const value = data[field];
    if (typeof value === 'string' && value.length > max) {
      errors[field] = `Please keep this under ${max} characters.`;
    }
  }

  return { ok: Object.keys(errors).length === 0, errors };
}
