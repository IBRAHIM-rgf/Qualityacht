// src/lib/adminCategories.js — Categories charter de l'admin (liste definitive, client 2026-11-01).
//
// Chaque categorie = une case dans la fiche bateau ; cochee, le bateau est ajoute
// automatiquement a la section correspondante du site :
//  - kind 'cat'    : cle stockee dans yacht_selections.categories (listes des pages du site) ;
//  - kind 'pets'   : colonne pets_allowed (page Pet-Friendly) ;
//  - kind 'groups' : colonne groups_allowed (page Group Charter).
// Fishing et Ghost : enregistres, sans section du site pour l'instant.
// Suivi des envois (✉ + date) : yacht_selections.admin_extra.mails[key] = 'JJ/MM/AAAA'
// ('' = enveloppe cochee sans date ; cle absente = enveloppe non cochee).
// Catamaran, Classic Sailing Yacht, Trimaran, Traditional Sailboat : retirees puis
// remises le meme jour a la demande du client (2026-11-01).

export const ADMIN_CATEGORIES = [
  { key: 'only-for-couple', label: 'Only for Couple', icon: '💗', kind: 'cat', env: true },
  { key: 'only-for-you', label: 'Only for You', icon: '⛵', kind: 'cat', env: true },
  { key: 'last-minute', label: 'Last Minute Charter', icon: '⌚', kind: 'cat', env: true },
  // Sous-categories Only for You : toutes remises (client 2026-11-01, 2e demande).
  { key: 'only-for-you/classic-sailing-yacht', label: 'Classic Sailing Yacht', icon: '', kind: 'cat', env: false },
  { key: 'only-for-you/catamaran', label: 'Catamaran', icon: '', kind: 'cat', env: false },
  { key: 'only-for-you/trimaran', label: 'Trimaran', icon: '', kind: 'cat', env: false },
  { key: 'only-for-you/sport-classic', label: 'Sport Classic Yacht', icon: '', kind: 'cat', env: false },
  { key: 'only-for-you/traditional', label: 'Traditional Sailboat', icon: '', kind: 'cat', env: false },
  { key: 'only-for-you/regatta', label: 'Sailboat Regatta', icon: '💨', kind: 'cat', env: true },
  { key: 'accessible', label: 'Accessible Yacht Charter', icon: '🕶️', kind: 'cat', env: true },
  { key: 'halal', label: 'Halal', icon: '7', kind: 'cat', env: true },
  { key: 'pets', label: 'Pets', icon: '🐻', kind: 'pets', env: true },
  { key: 'group', label: 'Group', icon: '🍇', kind: 'groups', env: true },
  { key: 'fishing', label: 'Fishing', icon: '🐟', kind: 'cat', env: true },
  { key: 'sport', label: 'Sport Yacht', icon: '🪁', kind: 'cat', env: true },
  { key: 'ghost', label: 'Ghost', icon: '👻', kind: 'cat', env: true, noSection: true },
];

// Colonnes d'icones de la table admin (ordre du calque client), ⌚ apres 👻.
export const ICON_COLUMNS = ['only-for-couple', 'pets', 'accessible', 'halal', 'only-for-you/regatta', 'group', 'fishing', 'sport', 'only-for-you', 'ghost', 'last-minute']
  .map((k) => ADMIN_CATEGORIES.find((c) => c.key === k));

const REMOVED = new Set([]);

const CAT_KEYS = new Set(ADMIN_CATEGORIES.filter((c) => c.kind === 'cat').map((c) => c.key));

/** Cles de categories valides (les retirees et inconnues sont enlevees). */
export function cleanCategories(list) {
  return (Array.isArray(list) ? list : []).filter((k) => !REMOVED.has(k) && CAT_KEYS.has(k));
}

/** Etat coche d'une categorie pour un yacht admin. */
export function isCategoryOn(y, c) {
  if (c.kind === 'pets') return !!y.pets_allowed;
  if (c.kind === 'groups') return !!y.groups_allowed;
  return (y.categories || []).includes(c.key);
}

// Couleurs d'enregistrement (client 2026-11-03) : une par personne de l'equipe.
export const SAVE_COLORS = [
  { key: 'fuchsia', label: 'Rose fuchsia', hex: '#FF2DA0' },
  { key: 'green', label: 'Vert', hex: '#2ECC71' },
  { key: 'red', label: 'Rouge', hex: '#E53935' },
  { key: 'sky', label: 'Bleu ciel', hex: '#5BC0F8' },
];
export const saveColorHex = (key) => (SAVE_COLORS.find((c) => c.key === key) || {}).hex || null;

/** admin_extra normalise : { mails: { key: 'JJ/MM/AAAA' | '' }, red: { key: true }, ca: { name, company, location, phone, website } }. */
export function normalizeAdminExtra(raw) {
  let v = raw;
  if (typeof v === 'string') { try { v = JSON.parse(v); } catch { v = null; } }
  if (!v || typeof v !== 'object') v = {};
  const mails = {};
  const keys = new Set(ADMIN_CATEGORIES.map((c) => c.key));
  for (const [k, d] of Object.entries(v.mails || {})) {
    // '' = enveloppe cochee sans date (client 2026-11-01).
    if (keys.has(k) && (d === '' || /^\d{2}\/\d{2}\/\d{4}$/.test(String(d)))) mails[k] = String(d);
  }
  // Enveloppe rouge (client 2026-11-02) : red[key] = true.
  const red = {};
  for (const [k, on] of Object.entries(v.red || {})) {
    if (keys.has(k) && on === true) red[k] = true;
  }
  const ca = {};
  for (const f of ['name', 'company', 'location', 'phone', 'website']) {
    const s = String((v.ca || {})[f] || '').trim().slice(0, 200);
    if (s) ca[f] = s;
  }
  // Dernier enregistrement de la fiche (client 2026-11-03) : couleur de la personne + date/heure.
  const sv = v.saved && typeof v.saved === 'object' ? v.saved : null;
  const saved = sv && SAVE_COLORS.some((c) => c.key === sv.color) && !Number.isNaN(Date.parse(sv.at))
    ? { color: sv.color, at: new Date(sv.at).toISOString() } : null;
  // Corbeille (client 2026-11-03) : date de mise a la corbeille + visibilite d'avant.
  const tr = v.trash && typeof v.trash === 'object' ? v.trash : null;
  const trash = tr && !Number.isNaN(Date.parse(tr.at)) ? { at: new Date(tr.at).toISOString(), wasVisible: tr.wasVisible === true } : null;
  return { mails, red, ca, ...(saved ? { saved } : {}), ...(trash ? { trash } : {}) };
}
