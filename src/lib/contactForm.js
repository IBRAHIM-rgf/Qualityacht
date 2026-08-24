// src/lib/contactForm.js
//
// Contrat partage entre le formulaire de contact de l'accueil et /api/contact.
// Volontairement autonome : ne depend pas de salesEnquiry.js, deja valide, pour
// qu'une evolution ici ne puisse pas casser le formulaire Sales.

export const REASONS = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'press', label: 'Press' },
  { value: 'other', label: 'Other' },
];

export const DEFAULT_REASON = 'general';

export function isValidReason(v) {
  return typeof v === 'string' && REASONS.some((r) => r.value === v);
}

export function labelForReason(v) {
  return REASONS.find((r) => r.value === v)?.label || null;
}

// Longueurs maximales. Le serveur REFUSE tout depassement, il ne tronque pas :
// tronquer masquerait une charge abusive au lieu de la signaler.
export const MAX_LENGTHS = {
  fullName: 120,
  email: 254,
  phone: 40,
  company: 120,
  message: 4000,
};

export const FIELD_LABELS = {
  reason: 'Reason for enquiry',
  fullName: 'Full name',
  email: 'Email',
  phone: 'Phone',
  company: 'Company',
  message: 'Message',
};

// Refuse aussi les caracteres de controle : une adresse contenant \r ou \n
// permettrait d'injecter des en-tetes SMTP via replyTo.
const EMAIL_RE = /^[^\s@<>;,"]+@[^\s@<>;,".]+\.[a-zA-Z]{2,}$/;

export function isValidEmail(value) {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  if (!v || v.length > MAX_LENGTHS.email) return false;
  if (/[\r\n\t\0]/.test(v)) return false;
  return EMAIL_RE.test(v);
}

/**
 * Validation commune client/serveur.
 * Retourne { ok, errors } ou errors est { champ: message }.
 */
export function validateContact(data) {
  const errors = {};

  if (!isValidReason(data.reason)) {
    errors.reason = 'Please choose a reason for your enquiry.';
  }
  if (!String(data.fullName || '').trim()) {
    errors.fullName = 'Please enter your name.';
  }
  if (!String(data.email || '').trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!String(data.phone || '').trim()) {
    errors.phone = 'Please enter a phone number.';
  }
  if (!data.consent) {
    errors.consent = 'Please confirm we may use your details to answer your enquiry.';
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
