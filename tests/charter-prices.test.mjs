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
