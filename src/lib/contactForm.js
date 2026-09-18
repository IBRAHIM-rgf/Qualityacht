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
// Catalogue des experiences proposees sur /contact. Le serveur n'accepte que
// ces libelles : ils finissent dans l'e-mail, jamais une valeur libre.
export const CONTACT_EXPERIENCE_GROUPS = [
  {
    title: 'Yacht Charter',
    items: [
      'Day Charter',
      'Last-Minute Charter',
      'Yacht Charter',
      'Pet-Friendly Yacht Charter',
      'Accessible Charter Yacht',
      'Couple’s Charter',
      'Group Yacht Charter',
      'Sports Yacht Charter',
      'Tailored Halal Private Charter Services',
    ],
  },
  {
    title: 'Yacht Sales',
    items: ['Motor Yacht Sales & Acquisitions', 'Sailing Yachts for Sale', 'Water Toys & Equipment'],
  },
  {
    title: 'Luxury Experiences',
    items: ['Beyond the Ordinary', 'Private Jet', 'Luxury Real Estate', 'Sport Fishing'],
  },
];

export const CONTACT_EXPERIENCES = CONTACT_EXPERIENCE_GROUPS.flatMap((g) => g.items);

export const CONTACT_LANGUAGES = [
  { id: 'mandarin', label: 'Mandarin', native: '普通话' },
  { id: 'cantonese', label: 'Cantonese', native: '粤语' },
];

export function isValidLanguage(v) {
  return typeof v === 'string' && CONTACT_LANGUAGES.some((l) => l.id === v);
}

export function labelForLanguage(v) {
  const l = CONTACT_LANGUAGES.find((x) => x.id === v);
  return l ? `${l.label} (${l.native})` : null;
}

/** Ne garde que les libelles connus, sans doublon, dans l'ordre du catalogue. */
export function normalizeExperiences(list) {
  if (!Array.isArray(list)) return [];
  const wanted = new Set(list.filter((x) => typeof x === 'string'));
  return CONTACT_EXPERIENCES.filter((x) => wanted.has(x));
}

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
  experiences: 'Experiences',
  language: 'Preferred language',
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
  if (data.experiences !== undefined && !Array.isArray(data.experiences)) {
    errors.experiences = 'Please select at least one experience.';
  }
  if (data.language && !isValidLanguage(data.language)) {
    errors.language = 'Please choose a valid language.';
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
