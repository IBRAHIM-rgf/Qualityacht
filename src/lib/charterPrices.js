// src/lib/charterPrices.js — Fiches de prix par type de charter (client 2026-10-31).
//
// Stockage : colonne jsonb `custom_pricing` de yacht_selections, objet :
//   { version: 2, types: { weekly|day|halfday|hours|transfer: {
//       rates: [{ period, title1, title2, subtitle, price, currency, unit, zones: [], apa, vat }],
//       included: [], extras: [],
//       taxes: { gratuity, flSales, bahamasSales, vat }   (pourcentages, '' = vide)
//   } } }
// Anciennes donnees (tableau de cartes « Tarifs » + prix Day Charter) : reprises
// automatiquement (semaine -> Weekly, jour -> Day). Le titre libre d'une ancienne
// carte reste affiche (legacyTitle) tant que Title 1 n'est pas choisi.
// Le mot « Rate » n'est utilise que dans l'admin ; le site affiche « Prices ».
// Aucun acces BDD ici : module partage serveur / client.

export const CHARTER_TYPES = [
  { key: 'weekly', label: 'Weekly Charter', unit: 'WEEK' },
  { key: 'day', label: 'Day Charter', unit: 'DAY' },
  { key: 'halfday', label: 'Half-day Charter', unit: 'HALFDAY' },
  { key: 'hours', label: 'Hours Charter', unit: 'HOURS' },
  { key: 'transfer', label: 'Transfer', unit: 'TRANSFER' },
];
const TYPE_KEYS = CHARTER_TYPES.map((t) => t.key);

export const RATE_PERIODS = ['Summer', 'Winter', 'Summer / Winter', 'Christmas', 'New Year', 'Christmas / New Year', 'Holiday'];
export const RATE_TITLES_1 = ['High Season', 'Low Season', 'High Season / Low Season'];
export const RATE_TITLES_2 = [
  'Arctic', 'Central America', 'East Mediterranean', 'Indonesia', 'Pacific Ocean', 'South East Asia',
  'Africa', 'Caribbean', 'Bahamas', 'East Asia', 'Indian Ocean', 'North America', 'Gulf of Oman',
  'West Mediterranean', 'Northern Europe', 'Oceania',
];
export const RATE_CURRENCIES = [
  { code: 'EUR', label: 'EUR €' },
  { code: 'USD', label: 'USD $' },
  { code: 'GBP', label: 'GBP £' },
  { code: 'AED', label: 'AED' },
  { code: 'AUD', label: 'AUD A$' },
  { code: 'CHF', label: 'CHF' },
];
const CURRENCY_CODES = RATE_CURRENCIES.map((c) => c.code);
export const RATE_UNITS = [
  { code: 'WEEK', label: 'Week', suffix: '/ week' },
  { code: 'DAY', label: 'Day', suffix: '/ day' },
  { code: 'HALFDAY', label: 'Half-day (4 hrs)', suffix: '/ half-day (4 hrs)' },
  { code: 'HOURS', label: 'Hours', suffix: '/ hour' },
  { code: 'TRANSFER', label: 'Transfer', suffix: '/ transfer' },
  { code: 'NIGHT', label: 'Night', suffix: '/ night' },
];
const UNIT_CODES = RATE_UNITS.map((u) => u.code);
export const TAX_FIELDS = [
  { key: 'gratuity', label: 'Crew gratuity is customarily' },
  { key: 'flSales', label: 'FL Sales Tax' },
  { key: 'bahamasSales', label: 'Bahamas Sales Tax' },
  { key: 'vat', label: 'VAT' },
];

const SYMBOLS = { EUR: '€', USD: '$', GBP: '£', AED: 'AED', AUD: 'A$', CHF: 'CHF' };

export function formatPriceAmount(amount, currency = 'EUR') {
  const n = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(amount);
  return `${n} ${SYMBOLS[currency] || currency}`;
}

export function unitSuffix(unit) {
  return (RATE_UNITS.find((u) => u.code === unit) || {}).suffix || '';
}

export function defaultUnitFor(typeKey) {
  return (CHARTER_TYPES.find((t) => t.key === typeKey) || CHARTER_TYPES[0]).unit;
}

function toAmount(v) {
  const n = Number(String(v ?? '').replace(/[\s'’]/g, '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

function toPercent(v) {
  const s = String(v ?? '').trim().replace(',', '.').replace('%', '');
  if (s === '') return '';
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? String(n) : '';
}

function splitList(v, sep) {
  const arr = Array.isArray(v) ? v : String(v || '').split(sep);
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    const s = String(x || '').trim();
    if (!s || seen.has(s.toLowerCase())) continue;
    seen.add(s.toLowerCase());
    out.push(s);
  }
  return out;
}

function normalizeRate(r, typeKey) {
  if (!r || typeof r !== 'object') return null;
  const price = toAmount(r.price);
  const title1 = RATE_TITLES_1.includes(r.title1) ? r.title1 : '';
  const legacyTitle = String(r.legacyTitle || '').trim();
  if (!price || (!title1 && !legacyTitle)) return null;
  return {
    period: RATE_PERIODS.includes(r.period) ? r.period : '',
    title1,
    title2: RATE_TITLES_2.includes(r.title2) ? r.title2 : '',
    ...(legacyTitle && !title1 ? { legacyTitle } : {}),
    subtitle: String(r.subtitle || '').trim(),
    price,
    currency: CURRENCY_CODES.includes(r.currency) ? r.currency : 'EUR',
    unit: UNIT_CODES.includes(r.unit) ? r.unit : defaultUnitFor(typeKey),
    zones: splitList(r.zones, /[,\n]/),
    apa: r.apa === true || r.apa === 'true',
    vat: r.vat === true || r.vat === 'true',
  };
}

function emptyType() {
  return { rates: [], included: [], extras: [], taxes: { gratuity: '', flSales: '', bahamasSales: '', vat: '' } };
}

function normalizeType(t, typeKey) {
  const v = t && typeof t === 'object' ? t : {};
  const taxes = v.taxes && typeof v.taxes === 'object' ? v.taxes : {};
  return {
    rates: (Array.isArray(v.rates) ? v.rates : []).map((r) => normalizeRate(r, typeKey)).filter(Boolean),
    included: splitList(v.included, ';'),
    extras: splitList(v.extras, ';'),
    taxes: {
      gratuity: toPercent(taxes.gratuity),
      flSales: toPercent(taxes.flSales),
      bahamasSales: toPercent(taxes.bahamasSales),
      vat: toPercent(taxes.vat),
    },
  };
}

// ── Reprise des anciennes donnees ──
function legacyTitles(title) {
  const t = String(title || '');
  let title1 = '';
  if (/high season\s*\/\s*low season/i.test(t)) title1 = 'High Season / Low Season';
  else if (/high season/i.test(t)) title1 = 'High Season';
  else if (/low season/i.test(t)) title1 = 'Low Season';
  const title2 = RATE_TITLES_2.find((r) => new RegExp(`\\b${r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(t)) || '';
  // Titre libre garde tel quel si on ne peut pas le reconstituer exactement.
  const rebuilt = [title1, title2].filter(Boolean).join(' ');
  const exact = title1 && rebuilt.toLowerCase().replace(/\s+/g, ' ') === t.toLowerCase().replace(/\s+/g, ' ').trim();
  return exact ? { title1, title2 } : { title1: '', title2: '', legacyTitle: t.trim() };
}

function fromLegacyRows(rows) {
  const out = { weekly: [], day: [] };
  for (const row of rows) {
    if (!row || typeof row !== 'object') continue;
    const key = row.unit === 'DAY' ? 'day' : 'weekly';
    out[key].push({
      period: row.group === 'winter' ? 'Winter' : 'Summer',
      ...legacyTitles(row.title),
      subtitle: row.subtitle,
      price: row.price,
      currency: row.currency,
      unit: row.unit === 'DAY' ? 'DAY' : 'WEEK',
      zones: row.zones,
      apa: row.apa,
      vat: row.vat,
    });
  }
  return out;
}

function fromLegacyDay(dayRaw) {
  let v = dayRaw;
  if (typeof v === 'string') { try { v = JSON.parse(v); } catch { v = null; } }
  if (!v || typeof v !== 'object') return [];
  const src = Array.isArray(v.rates) ? v.rates : (v.price ? [v] : []);
  return src.map((r) => ({
    period: '',
    title1: '',
    title2: '',
    legacyTitle: String(r.location || '').trim() || 'Day Charter',
    subtitle: '',
    price: r.price,
    currency: r.currency,
    unit: 'DAY',
    zones: [],
    apa: r.apa,
    vat: r.vat,
  }));
}

/**
 * Normalise la valeur de `custom_pricing` (nouveau format, ancien tableau) en objet
 * complet { weekly, day, halfday, hours, transfer }. `legacyDayRaw` = ancienne
 * colonne day_charter, reprise dans Day si aucun prix Day n'existe encore.
 */
export function normalizeCharterPrices(raw, legacyDayRaw = null) {
  let v = raw;
  if (typeof v === 'string') { try { v = JSON.parse(v); } catch { v = null; } }
  const out = {};
  if (v && typeof v === 'object' && !Array.isArray(v) && v.types) {
    for (const k of TYPE_KEYS) out[k] = normalizeType(v.types[k], k);
    return out;
  }
  const legacy = fromLegacyRows(Array.isArray(v) ? v : []);
  for (const k of TYPE_KEYS) out[k] = normalizeType({ rates: legacy[k] || [] }, k);
  if (!out.day.rates.length && legacyDayRaw) out.day = normalizeType({ rates: fromLegacyDay(legacyDayRaw) }, 'day');
  return out;
}

/** Objet a stocker en base. */
export function serializeCharterPrices(prices) {
  const n = normalizeCharterPrices({ version: 2, types: prices || {} });
  return { version: 2, types: n };
}

export function hasAnyPrice(prices) {
  return !!prices && TYPE_KEYS.some((k) => prices[k] && prices[k].rates.length > 0);
}

/** Toutes les cartes, a plat, avec leur type (pour le prix des listes). */
export function flatRates(prices) {
  const out = [];
  if (!prices) return out;
  for (const k of TYPE_KEYS) for (const r of (prices[k]?.rates || [])) out.push({ ...r, type: k });
  return out;
}

/** Titre affiche d'une carte. */
export function rateTitle(r) {
  if (r.title1) return [r.title1, r.title2].filter(Boolean).join(' — ');
  return r.legacyTitle || '';
}
