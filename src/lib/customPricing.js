// src/lib/customPricing.js — Prix saisis dans l'admin (colonne jsonb `custom_pricing`).
// Quand un yacht a au moins une carte de prix, ces prix remplacent ceux d'Ankor :
//  - fiche detail : section « Charter Prices » (onglets par type de charter) ;
//  - cartes des listes : « Price : <prix le plus bas> /week ».
// Aucun acces BDD ici : module partage serveur / client.

// Depuis le 2026-10-31 : fiches de prix par type de charter (lib/charterPrices.js).
// Ce module garde ses fonctions pour les listes et la fiche, a partir de ce modele.
import { normalizeCharterPrices, flatRates, rateTitle, formatPriceAmount, RATE_CURRENCIES } from './charterPrices';

export const PRICING_GROUPS = ['summer', 'winter'];
export const PRICING_CURRENCIES = RATE_CURRENCIES.map((c) => c.code);

/** Toutes les cartes de prix a plat (tous types), format simple des listes. */
export function normalizeCustomPricing(raw, legacyDayRaw = null) {
  return flatRates(normalizeCharterPrices(raw, legacyDayRaw)).map((r) => ({
    group: /winter/i.test(r.period) && !/summer/i.test(r.period) ? 'winter' : 'summer',
    title: rateTitle(r),
    subtitle: r.subtitle,
    price: r.price,
    currency: r.currency,
    unit: r.unit,
    zones: r.zones,
    apa: r.apa,
    vat: r.vat,
    type: r.type,
  }));
}

export function formatCustomPrice(amount, currency = 'EUR') {
  return formatPriceAmount(amount, currency);
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

// ── Day Charter ──
// Colonne jsonb `day_charter` : { enabled } = case « Day Charter » de l'admin (le yacht
// apparait dans le parcours Day Charter). Depuis le 2026-10-31, ses prix sont ceux de
// l'onglet « Day Charter » des fiches de prix (custom_pricing) ; les anciens prix
// stockes dans day_charter sont repris tant que l'onglet Day est vide.

/** Normalise ; renvoie toujours un objet complet (prix = onglet Day). */
export function normalizeDayCharter(raw, pricingRaw = null) {
  let v = raw;
  if (typeof v === 'string') {
    try { v = JSON.parse(v); } catch { v = null; }
  }
  if (!v || typeof v !== 'object' || Array.isArray(v)) v = {};
  const day = normalizeCharterPrices(pricingRaw, v).day;
  const rates = day.rates.map((r) => ({
    price: r.price,
    currency: r.currency,
    from: '',
    to: '',
    location: rateTitle(r),
    zones: r.zones,
    unit: r.unit,
    apa: r.apa,
    vat: r.vat,
  }));
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
    // Dates retirees de l'admin (client 2026-10-04) : plus affichees sur le site.
    period: '',
    location: r.location,
    apa: r.apa,
    vat: r.vat,
  }));
}

function rateToPricingInfo(r) {
  const period = ''; // dates plus affichees (client 2026-10-04)
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
