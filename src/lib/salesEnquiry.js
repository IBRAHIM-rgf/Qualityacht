// src/lib/salesEnquiry.js
//
// Contrat partage entre le formulaire (/sales/enquiry) et l'API (/api/sales-enquiry).
// Une seule source de verite pour les intentions, les champs autorises et les limites
// de longueur : le client et le serveur ne peuvent pas diverger.

export const INTENTS = {
  listings: {
    label: 'Receive our exclusive listings',
    heading: 'Receive our exclusive listings',
    lead: 'Be first to hear about the yachts we bring to market, before they are listed publicly.',
    subject: 'Exclusive listings subscription',
    extraFields: ['categories'],
  },
  sell: {
    label: 'Sell or list my yacht',
    heading: 'Sell or list your yacht',
    lead: 'Tell us about your yacht and our brokerage team will come back to you with a valuation and a sales plan.',
    subject: 'Yacht selling enquiry',
    extraFields: ['yachtName', 'builderModel', 'buildYear', 'lengthOverall', 'currentLocation', 'sellTimeframe'],
  },
  buy: {
    label: 'Find a yacht to buy',
    heading: 'Find a yacht to buy',
    lead: 'Describe the yacht you are looking for and our acquisition experts will shortlist the right candidates.',
    subject: 'Yacht acquisition enquiry',
    extraFields: ['yachtType', 'lengthWanted', 'budget', 'buyTimeframe'],
  },
  offer: {
    label: 'Make an offer',
    heading: 'Make an offer',
    lead: 'Submit your offer and our broker will handle the negotiation with the seller in confidence.',
    subject: 'Offer on a yacht',
    extraFields: ['offerAmount'],
    requiresYacht: true,
  },
  details: {
    label: 'Request the full details',
    heading: 'Request the full details',
    lead: 'We will send you the complete dossier: full specification, photography and survey history.',
    subject: 'Full details request',
    extraFields: [],
    requiresYacht: true,
  },
  general: {
    label: 'Speak to a sales broker',
    heading: 'Speak to a sales broker',
    lead: 'Tell us what you need and one of our sales brokers will get back to you.',
    subject: 'Sales enquiry',
    extraFields: [],
  },
};

export const INTENT_KEYS = Object.keys(INTENTS);
export const DEFAULT_INTENT = 'general';

export function isValidIntent(intent) {
  return typeof intent === 'string' && Object.prototype.hasOwnProperty.call(INTENTS, intent);
}

export function normaliseIntent(intent) {
  return isValidIntent(intent) ? intent : DEFAULT_INTENT;
}

export const LISTING_CATEGORIES = [
  { value: 'motor', label: 'Motor Yachts' },
  { value: 'sailing', label: 'Sailing Yachts' },
  { value: 'toys', label: 'Water Toys & Equipment' },
];

/** Le numero devient obligatoire des que le visiteur demande a etre joint autrement que par e-mail. */
export function phoneIsRequired(contactMethod) {
  return contactMethod === 'phone' || contactMethod === 'whatsapp';
}

export const CONTACT_METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

// Longueur maximale acceptee pour chaque champ. Le serveur rejette tout depassement :
// c'est la garde principale contre les charges utiles abusives.
export const MAX_LENGTHS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  phone: 40,
  country: 80,
  contactMethod: 20,
  message: 4000,
  yachtId: 80,
  yachtType: 60,
  lengthWanted: 60,
  budget: 60,
  buyTimeframe: 60,
  yachtName: 120,
  builderModel: 120,
  buildYear: 10,
  lengthOverall: 60,
  currentLocation: 120,
  sellTimeframe: 60,
  offerAmount: 60,
};

// Libelles utilises dans l'e-mail recu par l'equipe Sales.
export const FIELD_LABELS = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  phone: 'Phone / WhatsApp',
  country: 'Country',
  contactMethod: 'Preferred contact method',
  message: 'Message',
  categories: 'Categories of interest',
  yachtType: 'Type of yacht',
  lengthWanted: 'Desired length',
  budget: 'Indicative budget',
  buyTimeframe: 'Acquisition timeframe',
  yachtName: 'Yacht name',
  builderModel: 'Builder / model',
  buildYear: 'Year',
  lengthOverall: 'Length overall',
  currentLocation: 'Current location',
  sellTimeframe: 'Desired selling timeframe',
  offerAmount: 'Offer amount',
};

// Validation d'e-mail volontairement stricte sur la forme ET sur les caracteres de
// controle : une adresse contenant \r ou \n permettrait d'injecter des en-tetes SMTP
// supplementaires via replyTo.
const EMAIL_RE = /^[^\s@<>;,"]+@[^\s@<>;,".]+\.[a-zA-Z]{2,}$/;

export function isValidEmail(value) {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  if (!v || v.length > MAX_LENGTHS.email) return false;
  if (/[\r\n\t\0]/.test(v)) return false;
  return EMAIL_RE.test(v);
}

/**
 * Validation commune client/serveur. Retourne { ok, errors } ou errors est un objet
 * { champ: message } directement affichable a cote du champ concerne.
 */
export function validateEnquiry(data) {
  const errors = {};
  const intent = normaliseIntent(data.intent);

  if (!String(data.firstName || '').trim()) errors.firstName = 'Please enter your first name.';
  if (!String(data.lastName || '').trim()) errors.lastName = 'Please enter your last name.';

  if (!String(data.email || '').trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Le moyen de contact vient d'une liste fermee : une valeur inventee est refusee.
  const method = data.contactMethod;
  if (method !== undefined && method !== '' && !CONTACT_METHODS.some((m) => m.value === method)) {
    errors.contactMethod = 'Please choose a valid contact method.';
  } else if (phoneIsRequired(method) && !String(data.phone || '').trim()) {
    // Demander a etre rappele sans laisser de numero rend la demande inexploitable.
    errors.phone = 'Please enter a number so we can reach you this way.';
  }

  if (!data.consent) {
    errors.consent = 'Please confirm we may use your details to answer your enquiry.';
  }

  if (INTENTS[intent].requiresYacht && !String(data.yachtId || '').trim()) {
    errors.yachtId = 'This enquiry must reference a yacht.';
  }

  // Controle de longueur sur la valeur BRUTE. Le serveur ne doit jamais tronquer en
  // silence : une charge trop longue est refusee, pas raccourcie.
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const value = data[field];
    if (typeof value === 'string' && value.length > max) {
      errors[field] = `Please keep this under ${max} characters.`;
    }
  }

  return { ok: Object.keys(errors).length === 0, errors };
}
