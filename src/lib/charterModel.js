// ══ Modèle standard de tarification charter (client 2026-10-15) ══
// Saisi dans l'admin, fiche par fiche (colonne JSONB `charter_model` de yacht_selections).
// ÉTAPE 1 : admin uniquement — rien n'est publié sur le site. Les sections existantes
// « Tarifs par saison » et « Day Charter » restent la source du site jusqu'à l'étape 2.
//
// Règles du brief client :
// - 3 devises EUR / USD / GBP, montants saisis à la main, aucune conversion ni addition.
// - Prix manquant = null (jamais 0 / gratuit). Devise désactivée : donnée conservée.
// - Modes nuitées / Day Charter / Hours Charter indépendants.
// - Listes (saisons, réductions, prestations, restauration) avec identifiants stables.
// - Aucun pays, port, saison, prix, remise ou durée prédéfini.
// - Notes internes jamais publiques.

export const CM_CURRENCIES = ['EUR', 'USD', 'GBP'];
export const CM_CURRENCY_LABELS = { EUR: 'Euro — EUR (€)', USD: 'Dollar américain — USD ($)', GBP: 'Livre sterling — GBP (£)' };
export const CM_CURRENCY_SHORT = { EUR: 'EUR (€)', USD: 'USD ($)', GBP: 'GBP (£)' };
export const CM_STATUSES = ['Inclus', 'Non inclus', 'Option payante', 'Non applicable'];
// Prestations standard (section 08), dans l'ordre de la maquette.
export const CM_STANDARD_SERVICES = [
  'TVA / taxes',
  'Carburant de navigation',
  'Générateur',
  'Climatisation',
  'Ports publics',
  'Marinas privées',
  'Bouées de mouillage',
  'Carburant de l’annexe',
  'Wi-Fi',
  'Repas et boissons sans alcool',
  'Frais d’itinéraire et formalités',
];

export function cmId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

const str = (v) => (typeof v === 'string' ? v : v == null ? '' : String(v));
const bool = (v) => v === true;
// Nombre ou null : '' / absent / invalide -> null (jamais 0 par défaut).
export function numOrNull(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  const s = String(v).trim().replace(',', '.');
  if (s === '') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
const prices = (p) => {
  const o = p && typeof p === 'object' ? p : {};
  return { EUR: numOrNull(o.EUR), USD: numOrNull(o.USD), GBP: numOrNull(o.GBP) };
};
const list = (v) => (Array.isArray(v) ? v : []);

export function emptyCharterModel() {
  return normalizeCharterModel({});
}

export function normalizeCharterModel(raw) {
  const r = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const cur = r.currencies || {};
  const modes = r.modes || {};
  const on = r.overnight || {};
  const day = r.day || {};
  const hours = r.hours || {};
  const b = r.boarding || {};
  const cat = r.catering || {};
  const apa = r.apa || {};
  const dep = r.deposit || {};
  const t = r.terms || {};

  // Prestations : les 11 standard toujours présentes (dans l'ordre), puis les ajoutées.
  const rawServices = list(r.services);
  const standard = CM_STANDARD_SERVICES.map((name) => {
    const s = rawServices.find((x) => x && x.standard && x.name === name) || {};
    return {
      id: str(s.id) || `std-${CM_STANDARD_SERVICES.indexOf(name)}`,
      standard: true,
      name,
      status: CM_STATUSES.includes(s.status) ? s.status : '',
      condition: str(s.condition),
      calc: str(s.calc),
      prices: prices(s.prices),
    };
  });
  const extras = rawServices
    .filter((x) => x && !x.standard)
    .map((s) => ({
      id: str(s.id) || cmId(),
      standard: false,
      name: str(s.name),
      status: CM_STATUSES.includes(s.status) ? s.status : '',
      condition: str(s.condition),
      calc: str(s.calc),
      prices: prices(s.prices),
    }));

  return {
    currencies: { EUR: bool(cur.EUR), USD: bool(cur.USD), GBP: bool(cur.GBP) },
    mainCurrency: CM_CURRENCIES.includes(r.mainCurrency) ? r.mainCurrency : '',
    modes: { overnight: bool(modes.overnight), day: bool(modes.day), hours: bool(modes.hours) },
    description: str(r.description),
    overnight: {
      description: str(on.description),
      unit: str(on.unit),
      minNights: numOrNull(on.minNights),
      prices: prices(on.prices),
      partialDays: str(on.partialDays),
    },
    day: {
      description: str(day.description),
      includedHours: numOrNull(day.includedHours),
      minDays: numOrNull(day.minDays),
      departure: str(day.departure),
      return: str(day.return),
      prices: prices(day.prices),
      conditions: str(day.conditions),
    },
    hours: {
      description: str(hours.description),
      minHours: numOrNull(hours.minHours),
      stepMinutes: numOrNull(hours.stepMinutes),
      unit: str(hours.unit),
      prices: prices(hours.prices),
      packages: str(hours.packages),
    },
    seasons: list(r.seasons).map((s) => ({
      id: str(s && s.id) || cmId(),
      name: str(s && s.name),
      start: str(s && s.start),
      end: str(s && s.end),
      mode: ['overnight', 'day', 'hours'].includes(s && s.mode) ? s.mode : '',
      unit: str(s && s.unit),
      priority: numOrNull(s && s.priority),
      prices: prices(s && s.prices),
    })),
    seasonRule: str(r.seasonRule),
    boarding: {
      departurePort: str(b.departurePort),
      returnPort: str(b.returnPort),
      boardingTime: str(b.boardingTime),
      disembarkTime: str(b.disembarkTime),
      timezone: str(b.timezone),
      capacityOvernight: numOrNull(b.capacityOvernight),
      capacityDay: numOrNull(b.capacityDay),
      cabins: numOrNull(b.cabins),
      notes: str(b.notes),
    },
    discounts: list(r.discounts).map((d) => ({
      id: str(d && d.id) || cmId(),
      type: str(d && d.type),
      percent: numOrNull(d && d.percent),
      deadline: str(d && d.deadline),
      threshold: numOrNull(d && d.threshold),
      thresholdUnit: str(d && d.thresholdUnit),
      condition: str(d && d.condition),
    })),
    discountCap: numOrNull(r.discountCap),
    discountMethod: str(r.discountMethod),
    services: [...standard, ...extras],
    catering: {
      fullBoard: bool(cat.fullBoard),
      halfBoard: bool(cat.halfBoard),
      actual: bool(cat.actual),
      fullBoardText: str(cat.fullBoardText),
      halfBoardText: str(cat.halfBoardText),
      actualText: str(cat.actualText),
      childMinAge: numOrNull(cat.childMinAge),
      childMaxAge: numOrNull(cat.childMaxAge),
      freeUnder: numOrNull(cat.freeUnder),
      counting: str(cat.counting),
      rates: list(cat.rates).map((m) => ({
        id: str(m && m.id) || cmId(),
        formula: str(m && m.formula),
        category: str(m && m.category),
        groupMin: numOrNull(m && m.groupMin),
        groupMax: numOrNull(m && m.groupMax),
        unit: str(m && m.unit),
        prices: prices(m && m.prices),
      })),
    },
    apa: {
      enabled: bool(apa.enabled),
      percent: numOrNull(apa.percent),
      fixed: str(apa.fixed),
      prices: prices(apa.prices),
      terms: str(apa.terms),
    },
    deposit: {
      enabled: bool(dep.enabled),
      prices: prices(dep.prices),
    },
    tipMin: numOrNull(r.tipMin),
    tipMax: numOrNull(r.tipMax),
    depositTerms: str(r.depositTerms),
    terms: {
      vatIncluded: bool(t.vatIncluded),
      vatRate: numOrNull(t.vatRate),
      downPayment: numOrNull(t.downPayment),
      schedule: str(t.schedule),
      cancellation: str(t.cancellation),
      other: str(t.other),
      internalNotes: str(t.internalNotes),
      validated: bool(t.validated),
    },
  };
}

// Points à vérifier (affichés dans l'admin, non bloquants).
export function charterModelWarnings(m) {
  const w = [];
  const active = CM_CURRENCIES.filter((c) => m.currencies[c]);
  if (!active.length) w.push('Aucune devise activée.');
  if (m.mainCurrency && !m.currencies[m.mainCurrency]) w.push('La devise principale n’est pas parmi les devises activées.');
  if (active.length && !m.mainCurrency) w.push('Devise principale non choisie.');
  const modeLabels = { overnight: 'Charter avec nuitées', day: 'Day Charter', hours: 'Hours Charter' };
  for (const k of ['overnight', 'day', 'hours']) {
    if (!m.modes[k]) continue;
    const missing = active.filter((c) => m[k].prices[c] === null);
    if (missing.length) w.push(`${modeLabels[k]} : montant manquant en ${missing.join(', ')}.`);
  }
  if (m.modes.overnight && !m.overnight.unit) w.push('Charter avec nuitées : unité tarifaire non renseignée.');
  if (m.modes.hours && !m.hours.unit) w.push('Hours Charter : unité non renseignée.');
  const dated = m.seasons.filter((s) => s.start && s.end);
  m.seasons.forEach((s, i) => {
    const label = s.name || `Période ${i + 1}`;
    if (!s.start || !s.end) w.push(`${label} : dates incomplètes.`);
    else if (s.start > s.end) w.push(`${label} : la date de fin est avant la date de début.`);
  });
  for (let i = 0; i < dated.length; i++) {
    for (let j = i + 1; j < dated.length; j++) {
      const a = dated[i]; const b = dated[j];
      if ((a.mode || '') !== (b.mode || '')) continue;
      if (a.start <= b.end && b.start <= a.end) w.push(`Chevauchement : « ${a.name || 'sans nom'} » et « ${b.name || 'sans nom'} ».`);
    }
  }
  if (m.tipMin !== null && m.tipMax !== null && m.tipMin > m.tipMax) w.push('Pourboire : minimum supérieur au maximum.');
  if (m.catering.childMinAge !== null && m.catering.childMaxAge !== null && m.catering.childMinAge > m.catering.childMaxAge) w.push('Âge enfant : minimum supérieur au maximum.');
  return w;
}
