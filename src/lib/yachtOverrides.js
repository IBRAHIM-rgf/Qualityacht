// src/lib/yachtOverrides.js — Fiche bateau editable dans l'admin (client 2026-10-02).
//
// A l'ouverture de la fiche (crayon), toutes les informations connues du bateau
// (Ankor ou saisie manuelle) sont pre-remplies : identite, caracteristiques,
// description, photos, equipements, water toys, tenders.
// Seuls les champs MODIFIES par l'admin sont stockes (colonne jsonb `overrides`
// de yacht_selections) : les autres continuent de suivre les donnees d'origine.
// Sur le site, les valeurs modifiees remplacent celles d'Ankor (listes + fiche).
// Aucun acces BDD ici : module partage serveur / client.

// Champs texte (cle -> libelle admin).
export const OVERRIDE_TEXT_FIELDS = [
  ['name', 'Nom du navire'],
  ['type', 'Type'],
  ['make', 'Constructeur'],
  ['model', 'Modèle'],
  ['year', 'Année de construction'],
  ['refit', 'Année de refit'],
  ['length', 'Longueur (m)'],
  ['beam', 'Largeur / Beam (m)'],
  ['draft', "Tirant d'eau / Draft (m)"],
  ['guests', 'Invités'],
  ['cabins', 'Cabines'],
  ['crew', 'Équipage'],
  ['location', "Port d'attache"],
  ['cruiseSpeed', 'Vitesse de croisière (kn)'],
  ['topSpeed', 'Vitesse max (kn)'],
  ['engines', 'Moteurs'],
  ['hullConstruction', 'Construction de la coque'],
  ['fuelCapacity', 'Capacité carburant'],
  ['architect', 'Architecte'],
  ['interiorDesigner', 'Designer intérieur'],
  ['tonnage', 'Tonnage'],
  ['description', 'Description'],
];
// Listes : images / amenities / entertainment / tenders = textes ; toys = { label, quantity }.
export const OVERRIDE_LIST_FIELDS = ['images', 'amenities', 'entertainment', 'tenders', 'toys'];

const TEXT_KEYS = OVERRIDE_TEXT_FIELDS.map(([k]) => k);

// Hebergeurs d'images autorises par next.config.js (images.remotePatterns). Une photo
// ailleurs ferait planter la fiche du site : elle est ignoree a l'affichage et signalee
// dans l'admin.
const IMAGE_HOSTS = ['images.unsplash.com', 'firebasestorage.googleapis.com', 'api.ankor.io', 'cdn.ankor.io'];
export function isSupportedImage(src) {
  const s = String(src || '').trim();
  if (!s) return false;
  if (!/^https?:\/\//i.test(s)) return s.startsWith('/media/'); // cle Ankor relative
  try {
    const u = new URL(s);
    return u.protocol === 'https:' && IMAGE_HOSTS.includes(u.hostname);
  } catch { return false; }
}

function parse(raw) {
  if (!raw) return {};
  if (typeof raw === 'string') { try { return JSON.parse(raw) || {}; } catch { return {}; } }
  return typeof raw === 'object' ? raw : {};
}

function str(v) {
  if (v === undefined || v === null) return '';
  return String(v).trim();
}

// « 24m », « 24 m », 24 -> « 24 »
function meters(v) {
  const s = str(v).replace(/\s*m$/i, '').replace(',', '.');
  return s;
}

function labelList(arr) {
  return (Array.isArray(arr) ? arr : [])
    .map((x) => (typeof x === 'string' ? x : (x?.label || x?.name || '')))
    .map((s) => String(s).trim())
    .filter(Boolean);
}

function toyList(arr) {
  return (Array.isArray(arr) ? arr : [])
    .map((t) => (typeof t === 'string'
      ? { label: t.trim(), quantity: '' }
      : { label: str(t?.label || t?.name), quantity: str(t?.quantity) }))
    .filter((t) => t.label);
}

/**
 * Donnees d'origine d'une ligne yacht_selections (Ankor ou ajout manuel),
 * au format de la fiche admin. `extraCard` = carte Ankor rechargee a la volee
 * (lignes anciennes sans detail en base).
 */
export function extractYachtSource(row, extraCard = null) {
  const cached = { ...parse(row?.cached_data), ...(extraCard || {}) };
  const light = parse(row?.light_data);
  const full = parse(row?.full_data);
  const raw = (cached._rawEntity && typeof cached._rawEntity === 'object') ? cached._rawEntity : full;
  const bp = raw?.blueprint || cached._rawBlueprint || {};
  const firstType = Array.isArray(raw?.yachtType) ? raw.yachtType[0] : raw?.yachtType;
  const images = (Array.isArray(bp.images) && bp.images.length)
    ? bp.images
    : (Array.isArray(cached.images) && cached.images.length)
      ? cached.images
      : (light.hero_image ? [light.hero_image] : []);
  return {
    name: str(row?.yacht_name || cached.name || light.name || bp.name),
    type: str(cached.type || (firstType ? String(firstType).toLowerCase() : '') || light.type),
    make: str(cached.make || bp.make || light.make),
    model: str(bp.model),
    year: str(cached.year || bp.builtYear || light.year),
    refit: str(cached.refit || bp.refitYear),
    length: meters(bp.length || cached.length || light.length),
    beam: meters(bp.beam),
    draft: meters(bp.draft),
    guests: str(cached.guests || cached.capacity || bp.sleeps || light.guests),
    cabins: str(cached.cabins || bp.cabins || light.cabins),
    crew: str(cached.crew || bp.maxCrew || light.crew),
    location: str(bp.basePort?.name || cached.location || light.location),
    cruiseSpeed: str(bp.cruiseSpeed),
    topSpeed: str(bp.topSpeed),
    engines: str(bp.engines),
    hullConstruction: str(bp.hullConstruction),
    fuelCapacity: str(bp.fuelCapacity),
    architect: str(bp.architect),
    interiorDesigner: str(bp.interiorDesigner),
    tonnage: str(bp.tonnage),
    description: str(raw?.description || cached.description || light.description),
    images: images.map(str).filter(Boolean),
    amenities: labelList(bp.amenities),
    entertainment: labelList(bp.entertainment),
    tenders: labelList(bp.tenders),
    toys: toyList(bp.toys),
    // Tarifs Ankor (pre-remplissage des cartes de tarifs).
    _pricing: raw?.pricing || cached._rawPricing || null,
  };
}

/** Nettoie un objet overrides (types attendus, champs connus uniquement). */
export function normalizeOverrides(rawOv) {
  const ov = parse(rawOv);
  const out = {};
  for (const k of TEXT_KEYS) {
    if (ov[k] !== undefined && ov[k] !== null) out[k] = str(ov[k]);
  }
  for (const k of ['images', 'amenities', 'entertainment', 'tenders']) {
    if (Array.isArray(ov[k])) out[k] = ov[k].map(str).filter(Boolean);
  }
  if (Array.isArray(ov.toys)) out.toys = toyList(ov.toys);
  return out;
}

/** Valeurs affichees dans la fiche admin = origine + modifications. */
export function mergeSourceAndOverrides(source, overrides) {
  return { ...source, ...normalizeOverrides(overrides) };
}

/** Ne garde que les champs qui different de l'origine. */
export function diffOverrides(source, edited) {
  const out = {};
  const ed = normalizeOverrides(edited);
  for (const k of TEXT_KEYS) {
    if (ed[k] !== undefined && ed[k] !== str(source?.[k])) out[k] = ed[k];
  }
  for (const k of OVERRIDE_LIST_FIELDS) {
    if (ed[k] !== undefined && JSON.stringify(ed[k]) !== JSON.stringify(source?.[k] || [])) out[k] = ed[k];
  }
  return out;
}

const num = (v) => {
  const n = Number(String(v).replace(',', '.'));
  return Number.isFinite(n) ? n : v;
};

/** Carte des listes du site (YachtCardV2) : applique les modifications admin. */
export function applyOverridesToCard(yacht, rawOv) {
  const ov = normalizeOverrides(rawOv);
  if (!Object.keys(ov).length) return yacht;
  const y = { ...yacht };
  if (ov.name) y.name = ov.name;
  if (ov.type !== undefined) y.type = ov.type || undefined;
  if (ov.make !== undefined) y.make = ov.make || undefined;
  if (ov.year !== undefined) y.year = ov.year ? num(ov.year) : undefined;
  if (ov.refit !== undefined) y.refit = ov.refit ? num(ov.refit) : undefined;
  // Meme format que la valeur d'origine (nombre, ou texte « 24m » des cartes Ankor).
  if (ov.length !== undefined) {
    y.length = !ov.length ? undefined : (typeof yacht.length === 'number' ? num(ov.length) : `${ov.length}m`);
  }
  if (ov.guests !== undefined) { y.guests = ov.guests ? num(ov.guests) : undefined; y.capacity = y.guests; }
  if (ov.cabins !== undefined) y.cabins = ov.cabins ? num(ov.cabins) : undefined;
  if (ov.crew !== undefined) y.crew = ov.crew ? num(ov.crew) : undefined;
  if (ov.location !== undefined) {
    y.location = ov.location || undefined;
    y.destinations = ov.location ? [ov.location] : undefined;
  }
  if (ov.description !== undefined) y.description = ov.description || undefined;
  if (ov.images) y.images = ov.images.filter(isSupportedImage);
  y.overrides = ov;
  return y;
}

/** Fiche detail (yacht + full Ankor) : applique les modifications admin. */
export function applyOverridesToDetail(base, rawOv) {
  const ov = normalizeOverrides(rawOv);
  if (!Object.keys(ov).length) return base;
  const y = applyOverridesToCard(base, ov);
  const full = { ...(base.full || {}) };
  const bp = { ...(full.blueprint || {}) };
  const setBp = (key, val, transform = (v) => v) => {
    if (val === undefined) return;
    if (val === '') delete bp[key]; else bp[key] = transform(val);
  };
  setBp('make', ov.make);
  setBp('model', ov.model);
  setBp('builtYear', ov.year, num);
  setBp('refitYear', ov.refit, num);
  setBp('length', ov.length, num);
  setBp('beam', ov.beam, num);
  setBp('draft', ov.draft, num);
  setBp('sleeps', ov.guests, num);
  setBp('cabins', ov.cabins, num);
  setBp('maxCrew', ov.crew, num);
  setBp('cruiseSpeed', ov.cruiseSpeed, num);
  setBp('topSpeed', ov.topSpeed, num);
  setBp('engines', ov.engines);
  setBp('hullConstruction', ov.hullConstruction);
  setBp('fuelCapacity', ov.fuelCapacity);
  setBp('architect', ov.architect);
  setBp('interiorDesigner', ov.interiorDesigner);
  setBp('tonnage', ov.tonnage);
  if (ov.location !== undefined) {
    bp.basePort = ov.location ? { ...(bp.basePort || {}), name: ov.location } : undefined;
  }
  if (ov.images) bp.images = ov.images.filter(isSupportedImage);
  if (ov.amenities) bp.amenities = ov.amenities.map((label) => ({ label }));
  if (ov.entertainment) bp.entertainment = ov.entertainment;
  if (ov.tenders) bp.tenders = ov.tenders;
  if (ov.toys) bp.toys = ov.toys.map((t) => ({ label: t.label, quantity: t.quantity ? num(t.quantity) : undefined }));
  full.blueprint = bp;
  if (ov.description !== undefined) full.description = ov.description || undefined;
  if (ov.type !== undefined) full.yachtType = ov.type ? [ov.type] : undefined;
  return { ...y, full };
}

// ── Tarifs Ankor -> cartes de tarifs admin (pre-remplissage) ──
const SUPPORTED_CURRENCIES = ['EUR', 'USD', 'GBP', 'CHF'];

function guessGroup(p) {
  const name = (p?.name || '').toLowerCase();
  const zones = (p?.inclusionZones || []).map((z) => (z?.label || '').toLowerCase()).join(' ');
  if (/christmas|new\s*year|nye|xmas|holiday/.test(name)) return 'winter';
  if (/(summer|high)/.test(name)) return 'summer';
  if (/(winter|low)/.test(name)) return 'winter';
  if (/(caribbean|bahamas|antill|virgin|grenadin)/.test(zones)) return 'winter';
  const dates = (p?.effectiveDates || []).filter((d) => d?.from && d?.to);
  if (dates.length) {
    const m = new Date((new Date(dates[0].from).getTime() + new Date(dates[0].to).getTime()) / 2).getUTCMonth() + 1;
    return m >= 5 && m <= 9 ? 'summer' : 'winter';
  }
  return 'summer';
}

/** Cartes de tarifs (format PricingEditor) depuis le pricing Ankor ; semaine / jour uniquement. */
export function ankorPricingToRateRows(pricing) {
  const list = Array.isArray(pricing?.pricingInfo) ? pricing.pricingInfo : [];
  const rows = [];
  for (const p of list) {
    const unit = p?.pricing?.unit;
    const currency = p?.pricing?.currency;
    const total = Number(p?.pricing?.total);
    if (!['WEEK', 'DAY'].includes(unit) || !SUPPORTED_CURRENCIES.includes(currency) || !(total > 0)) continue;
    const name = String(p?.name || '').trim() || (unit === 'DAY' ? 'Day Charter' : 'Weekly Charter');
    rows.push({
      group: guessGroup(p),
      title: name,
      subtitle: '',
      price: String(Math.round(total / 100)),
      currency,
      unit,
      zones: labelList(p?.inclusionZones).join(', '),
      apa: false,
      vat: false,
    });
  }
  return rows;
}
