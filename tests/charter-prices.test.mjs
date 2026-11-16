// Test (client 2026-11-09) : une fiche creee dans un autre type que Week (Day Charter,
// Sleep aboard…) doit etre gardee a l'enregistrement et affichee sur la fiche du yacht,
// dans l'ordre Week, puis Day Charter, puis les autres types.
// Lancer : npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CHARTER_TYPES, normalizeCharterPrices, serializeCharterPrices, rateTypesWithRates, cleanPriceInput, cleanSubtitle,
} from '../src/lib/charterPrices.js';

// Meme chemin que l'enregistrement admin : l'admin envoie { version: 2, types },
// le serveur serialise `types` (route PATCH enrich), le site relit avec normalizeCharterPrices.
function saveLikeAdmin(types) {
  const stored = serializeCharterPrices(types);
  return normalizeCharterPrices(JSON.parse(JSON.stringify(stored)));
}

const emptyForm = () => Object.fromEntries(CHARTER_TYPES.map((t) => [t.key, { rates: [], included: '', extras: '', taxes: {} }]));

test('une fiche Day Charter sans Title 1 est gardee et affichee', () => {
  const form = emptyForm();
  form.day.rates.push({ period: 'Summer', title1: '', price: '4,500.00', currency: 'EUR', unit: 'DAY', zones: 'Miami' });
  const prices = saveLikeAdmin(form);
  assert.equal(prices.day.rates.length, 1);
  assert.equal(prices.day.rates[0].price, 4500);
  assert.deepEqual(rateTypesWithRates(prices).map((t) => t.key), ['day']);
});

test('toutes les fiches sont affichees, Week puis Day Charter puis les autres', () => {
  const form = emptyForm();
  form.transfer.rates.push({ title1: 'High Season', price: '900', unit: 'TRANSFER' });
  form.sleepaboard.rates.push({ price: '2000', unit: 'NIGHT' });
  form.day.rates.push({ title1: 'Low Season', price: '5000', unit: 'DAY' });
  form.hours.rates.push({ price: '800', unit: 'HOURS', hours: 3 });
  form.weekly.rates.push({ title1: 'High Season', price: '137000', unit: 'WEEK' });
  form.d4n3.rates.push({ price: '60000', unit: 'D4N3' });
  const prices = saveLikeAdmin(form);
  const shown = rateTypesWithRates(prices).map((t) => t.key);
  assert.deepEqual(shown, ['weekly', 'day', 'hours', 'sleepaboard', 'd4n3', 'transfer']);
  // Aucune fiche perdue : chaque type rempli est affiche.
  for (const t of CHARTER_TYPES) {
    if (form[t.key].rates.length) assert.ok(shown.includes(t.key), `${t.key} doit etre affiche`);
  }
});

test('une fiche sans prix n est pas affichee', () => {
  const form = emptyForm();
  form.day.rates.push({ title1: 'High Season', price: '' });
  assert.equal(rateTypesWithRates(saveLikeAdmin(form)).length, 0);
});

test('montant colle sans virgule, point ni centimes', () => {
  assert.equal(cleanPriceInput('137,000.00'), '137000');
  assert.equal(cleanPriceInput('25 500,50 €'), '25500');
});

test('dates Ankor : espace entre Repeats et Every Year', () => {
  assert.equal(cleanSubtitle('01 May 2026 14 December 2026 (RepeatsEvery Year)'), '01 May 2026 14 December 2026 (Repeats Every Year)');
  assert.equal(cleanSubtitle('01 January 2026 31 December 2026  Repeats Every Year'), '01 January 2026 31 December 2026 Repeats Every Year');
});

// Client 2026-11-16 : les fiches Ankor sont reprises dans chaque section (Week, Day, Hours…).
import { ankorPricingToCharterTypes, ankorDatesSubtitle } from '../src/lib/yachtOverrides.js';

test('fiches Ankor reparties par section, avec dates et APA', () => {
  const pricing = { pricingInfo: [
    { name: '1.01 - 11.01', pricing: { unit: 'WEEK', currency: 'EUR', total: 990000, charterFee: 990000, lineItems: [{ item: 'Charter Fee', amount: 990000, quantity: 1, conditions: 'Weekly' }] },
      effectiveDates: [{ from: '2025-01-01T00:00:00.000Z', to: '2025-01-11T23:59:59.999Z' }, { from: '2026-01-01T00:00:00.000Z', to: '2026-01-11T23:59:59.999Z' }, { from: '2027-01-01T00:00:00.000Z', to: '2027-01-11T23:59:59.999Z' }],
      inclusionZones: [{ label: 'Zanzibar' }] },
    { name: 'Day', pricing: { unit: 'DAY', currency: 'USD', total: 1350000, charterFee: 1000000, lineItems: [{ item: 'Charter Fee', amount: 1000000, quantity: 1 }, { item: 'APA', quantity: 0.35, conditions: '+fuel' }] }, effectiveDates: [] },
    { name: '4 hours', pricing: { unit: 'HOUR', currency: 'USD', total: 300000 }, effectiveDates: [] },
  ] };
  const types = ankorPricingToCharterTypes(pricing);
  const prices = normalizeCharterPrices({ version: 2, types });
  assert.deepEqual(rateTypesWithRates(prices).map((t) => t.key), ['weekly', 'day', 'hours']);
  assert.equal(prices.weekly.rates[0].price, 9900);
  assert.deepEqual(prices.weekly.rates[0].zones, ['Zanzibar']);
  assert.match(prices.weekly.rates[0].subtitle, /January 20\d\d – 11 January 20\d\d \(Repeats Every Year\)/);
  assert.equal(prices.day.rates[0].apa, true);
  assert.equal(prices.day.rates[0].price, 10000);
});

test('dates Ankor sans repetition', () => {
  assert.equal(ankorDatesSubtitle([{ from: '2026-05-01T00:00:00Z', to: '2026-12-14T23:59:59Z' }], new Date('2026-06-01')), '01 May 2026 – 14 December 2026');
});

import { missingRateInfo } from '../src/lib/charterPrices.js';
test('bateau a completer : fiche sans dates ou sans lieux', () => {
  const ok = normalizeCharterPrices({ version: 2, types: { weekly: { rates: [{ price: 100, unit: 'WEEK', subtitle: '01 May 2026 – 14 December 2026', zones: ['Seychelles'] }] } } });
  assert.equal(missingRateInfo(ok), false);
  const noZones = normalizeCharterPrices({ version: 2, types: { day: { rates: [{ price: 100, unit: 'DAY', subtitle: '01 May 2026', zones: [] }] } } });
  assert.equal(missingRateInfo(noZones), true);
  assert.equal(missingRateInfo(normalizeCharterPrices(null)), true);
});
