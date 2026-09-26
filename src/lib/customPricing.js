// src/lib/customPricing.js — Tarifs saisis dans l'admin (par saison / région).
//
// Stockage : colonne jsonb `custom_pricing` de yacht_selections, tableau de cartes :
//   { group: 'summer'|'winter', title, subtitle, price, currency, unit: 'WEEK'|'DAY', zones: [] }
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
