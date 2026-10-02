// src/lib/customPricing.js — Tarifs saisis dans l'admin (par saison / région).
//
// Stockage : colonne jsonb `custom_pricing` de yacht_selections, tableau de cartes :
//   { group: 'summer'|'winter', title, subtitle, price, currency, unit: 'WEEK'|'DAY', zones: [],
//     apa: bool, vat: bool }   (apa / vat coches = « + APA » / « + VAT », en sus du prix)
// `price` est en unites de devise (ex. 495000), pas en centimes.
//
// Quand un yacht a au moins une carte, ces tarifs remplacent ceux d'Ankor :
//  - fiche detail : convertis au format Ankor `pricing.pricingInfo` (le rendu
//    « Regions and Rates » existant s'applique tel quel) ;
//  - cartes des listes : « Price : <prix le plus bas> /week ».
// Aucun acces BDD ici : module partage serveur / client.

export const PRICING_GROUPS = ['summer', 'winter'];
export const PRICING_UNITS = ['WEEK', 'DAY'];
export const PRICING_CURRENCIES = ['EUR', 'USD', 'GBP', 'CHF'];

const SYMBOLS = { EUR: '€', USD: '$', GBP: '£', CHF: 'CHF' };

function cleanZones(zones) {
  const list = Array.isArray(zones)
    ? zones
    : String(zones || '').split(/[,\n;]/);
  const seen = new Set();
  const out = [];
  for (const z of list) {
    const label = String(z || '').trim();
    if (!label) continue;
    const key = label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(label);
  }
  return out;
}

/** Normalise une valeur brute (jsonb, string JSON, tableau) en tableau de cartes valides. */
export function normalizeCustomPricing(raw) {
  let arr = raw;
  if (typeof arr === 'string') {
    try { arr = JSON.parse(arr); } catch { arr = []; }
  }
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const row of arr) {
    if (!row || typeof row !== 'object') continue;
    const price = Number(String(row.price ?? '').replace(/[\s'’]/g, '').replace(',', '.'));
    const title = String(row.title || '').trim();
    if (!title || !Number.isFinite(price) || price <= 0) continue;
    out.push({
      group: PRICING_GROUPS.includes(row.group) ? row.group : 'summer',
      title,
      subtitle: String(row.subtitle || '').trim(),
      price: Math.round(price),
      currency: PRICING_CURRENCIES.includes(row.currency) ? row.currency : 'EUR',
      unit: PRICING_UNITS.includes(row.unit) ? row.unit : 'WEEK',
      zones: cleanZones(row.zones),
      apa: row.apa === true || row.apa === 'true',
      vat: row.vat === true || row.vat === 'true',
    });
  }
  return out;
}

export function formatCustomPrice(amount, currency = 'EUR') {
  const n = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(amount);
  return `${n} ${SYMBOLS[currency] || currency}`;
}

/** Carte la moins chere (priorite semaine, sinon jour). */
export function lowestCustomPrice(rows) {
  const list = normalizeCustomPricing(rows);
  if (!list.length) return null;
  const weekly = list.filter((r) => r.unit === 'WEEK');
  const pool = weekly.length ? weekly : list;
  return pool.reduce((min, r) => (min == null || r.price < min.price ? r : min), null);
}

/** Convertit les cartes admin au format Ankor `pricing` (pricingInfo + *PricingFrom). */
export function customPricingToAnkor(rows) {
  const list = normalizeCustomPricing(rows);
  if (!list.length) return null;
  const pricingInfo = list.map((r) => ({
    name: r.subtitle ? `${r.title} - ${r.subtitle}` : r.title,
    pricing: { unit: r.unit, currency: r.currency, total: r.price * 100 },
    inclusionZones: r.zones.map((label) => ({ label })),
    effectiveDates: [],
    petsAllowed: false,
    _group: r.group,
    _apa: r.apa,
    _vat: r.vat,
    _custom: true,
  }));
  const minOf = (unit) => {
    const pool = list.filter((r) => r.unit === unit);
    if (!pool.length) return undefined;
    const m = pool.reduce((a, r) => (a == null || r.price < a.price ? r : a), null);
    return { price: m.price * 100, currency: m.currency };
  };
  return {
    pricingInfo,
    weekPricingFrom: minOf('WEEK'),
    dayPricingFrom: minOf('DAY'),
  };
}

/**
 * Applique les tarifs admin a un yacht « carte » (listes) : prix affiche et
 * pricing brut. Sans carte saisie, le yacht est renvoye tel quel.
 */
export function applyCustomPricingToYacht(yacht, rows) {
  const ankor = customPricingToAnkor(rows);
  if (!ankor) return yacht;
  const low = lowestCustomPrice(rows);
  const formatted = formatCustomPrice(low.price, low.currency);
  return {
    ...yacht,
    pricePerHour: low.unit === 'WEEK' ? formatted : null,
    price: low.unit === 'WEEK' ? yacht.price : formatted,
    _rawPricing: { ...(yacht._rawPricing || {}), ...ankor },
    customPricing: normalizeCustomPricing(rows),
  };
}

// ── Day Charter (client 2026-09-30, plusieurs prix 2026-10-02) ──
// Colonne jsonb `day_charter` de yacht_selections :
//   { enabled: bool, rates: [{ price, currency, from, to, location, apa, vat }] }
// `from` / `to` = dates « AAAA-MM-JJ » (facultatives), `location` = lieu en texte libre.
// Case cochee dans l'admin = le yacht apparait dans le parcours Day Charter,
// avec ses prix a la journee (visibles uniquement dans ce parcours).
// Compatibilite : l'ancien format { price, currency, apa, vat } devient un seul prix ;
// price / currency / apa / vat restent exposes = ceux du prix le plus bas.

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function normalizeDayRate(r) {
  if (!r || typeof r !== 'object') return null;
  const price = Number(String(r.price ?? '').replace(/[\s'’]/g, '').replace(',', '.'));
  if (!Number.isFinite(price) || price <= 0) return null;
  const from = ISO_DATE.test(String(r.from || '')) ? String(r.from) : '';
  const to = ISO_DATE.test(String(r.to || '')) ? String(r.to) : '';
  return {
    price: Math.round(price),
    currency: PRICING_CURRENCIES.includes(r.currency) ? r.currency : 'EUR',
    from,
    to,
    location: String(r.location || '').trim(),
    apa: r.apa === true || r.apa === 'true',
    vat: r.vat === true || r.vat === 'true',
  };
}

/** Normalise la valeur brute ; renvoie toujours un objet complet. */
export function normalizeDayCharter(raw) {
  let v = raw;
  if (typeof v === 'string') {
    try { v = JSON.parse(v); } catch { v = null; }
  }
  if (!v || typeof v !== 'object' || Array.isArray(v)) v = {};
  const source = Array.isArray(v.rates) ? v.rates : (v.price !== undefined && v.price !== null && v.price !== '' ? [v] : []);
  const rates = source.map(normalizeDayRate).filter(Boolean);
  const low = rates.reduce((m, r) => (m == null || r.price < m.price ? r : m), null);
  return {
    enabled: v.enabled === true || v.enabled === 'true',
    rates,
    price: low ? low.price : null,
    currency: low ? low.currency : 'EUR',
    apa: low ? low.apa : false,
    vat: low ? low.vat : false,
  };
}

/** Yacht propose en Day Charter (case cochee). */
export function isDayCharterYacht(yacht) {
  return !!(yacht && yacht.dayCharter && yacht.dayCharter.enabled);
}

/** « 12 500 € » (prix le plus bas) ou null si aucun prix saisi. */
export function formatDayCharterPrice(dc) {
  if (!dc || !dc.price) return null;
  return formatCustomPrice(dc.price, dc.currency);
}

function fmtDate(iso, withYear) {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', ...(withYear ? { year: 'numeric' } : {}), timeZone: 'UTC',
  });
}

/** Periode d'un prix : « Jun 1 – Jun 30, 2027 », « From Jun 1, 2027 », « Until … » ou ''. */
export function formatDayRatePeriod(r) {
  if (!r) return '';
  if (r.from && r.to) {
    const sameYear = r.from.slice(0, 4) === r.to.slice(0, 4);
    return `${fmtDate(r.from, !sameYear)} – ${fmtDate(r.to, true)}`;
  }
  if (r.from) return `From ${fmtDate(r.from, true)}`;
  if (r.to) return `Until ${fmtDate(r.to, true)}`;
  return '';
}

/** Prix Day Charter prets a l'affichage (carte des listes). */
export function dayCharterRatesForDisplay(dc) {
  return ((dc && dc.rates) || []).map((r) => ({
    price: formatCustomPrice(r.price, r.currency),
    period: formatDayRatePeriod(r),
    location: r.location,
    apa: r.apa,
    vat: r.vat,
  }));
}

function rateToPricingInfo(r) {
  const period = formatDayRatePeriod(r);
  const name = r.location
    ? (period ? `${r.location} - ${period}` : r.location)
    : (period ? `Day Charter - ${period}` : 'Day Charter');
  return {
    name,
    pricing: { unit: 'DAY', currency: r.currency, total: r.price * 100 },
    inclusionZones: [],
    effectiveDates: [],
    petsAllowed: false,
    _apa: r.apa,
    _vat: r.vat,
    _custom: true,
  };
}

/** Entree au format Ankor pricingInfo (prix le plus bas). */
export function dayCharterToPricingInfo(dc) {
  if (!dc || !dc.price) return null;
  return rateToPricingInfo({
    price: dc.price, currency: dc.currency, apa: dc.apa, vat: dc.vat, from: '', to: '', location: '',
  });
}

/** Tous les prix Day Charter au format Ankor pricingInfo (rendu « Day Charter » de la fiche). */
export function dayCharterToPricingInfos(dc) {
  return ((dc && dc.rates) || []).map(rateToPricingInfo);
}

/** Parcours Day Charter : ne garde que les yachts coches, avec leurs prix jour. */
export function applyDayCharterMode(list, on) {
  if (!on) return list || [];
  return (list || [])
    .filter(isDayCharterYacht)
    .map((y) => ({
      ...y,
      dayPrice: formatDayCharterPrice(y.dayCharter),
      dayPrices: dayCharterRatesForDisplay(y.dayCharter),
    }));
}
