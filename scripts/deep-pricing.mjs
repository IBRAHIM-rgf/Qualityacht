// Inspecte chaque sous-champ pricing pour identifier tout ce qu'on peut extraire
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL);

const rows = await sql`
  SELECT yacht_name, full_data->'pricing' as pricing
  FROM yacht_selections WHERE yacht_name = 'CORAL OCEAN' LIMIT 1
`;
const p = rows[0].pricing;
const info = p.pricingInfo[0];

console.log('=== pricing top-level keys ===');
console.log(Object.keys(p));
console.log('  weekPricingFrom:', JSON.stringify(p.weekPricingFrom));
console.log('  weekPricingTo:', JSON.stringify(p.weekPricingTo));
console.log('  dayPricingFrom:', JSON.stringify(p.dayPricingFrom));
console.log('  dayPricingTo:', JSON.stringify(p.dayPricingTo));

console.log('\n=== first pricingInfo[0] full structure ===');
console.log(JSON.stringify(info, null, 2).slice(0, 3000));

console.log('\n=== inclusionZones[0] full structure ===');
console.log(JSON.stringify(info.inclusionZones?.[0], null, 2));

console.log('\n=== lineItems[0] full structure ===');
console.log(JSON.stringify(info.pricing?.lineItems?.[0], null, 2));

// All keys present in any lineItem across all yachts
console.log('\n=== Distinct lineItem fields across BDD ===');
const liKeys = await sql`
  SELECT DISTINCT jsonb_object_keys(li) as key, COUNT(*) as nb
  FROM yacht_selections,
       LATERAL jsonb_array_elements(full_data->'pricing'->'pricingInfo') AS season,
       LATERAL jsonb_array_elements(season->'pricing'->'lineItems') AS li
  WHERE full_data->'pricing'->'pricingInfo' IS NOT NULL
  GROUP BY jsonb_object_keys(li)
  ORDER BY nb DESC
`;
for (const r of liKeys) console.log(`  ${r.key.padEnd(20)} ${r.nb}`);

console.log('\n=== Distinct line item names across BDD (sample top 20) ===');
const liItems = await sql`
  SELECT li->>'item' as item, COUNT(*) as nb
  FROM yacht_selections,
       LATERAL jsonb_array_elements(full_data->'pricing'->'pricingInfo') AS season,
       LATERAL jsonb_array_elements(season->'pricing'->'lineItems') AS li
  WHERE full_data->'pricing'->'pricingInfo' IS NOT NULL
  GROUP BY li->>'item'
  ORDER BY nb DESC
  LIMIT 20
`;
for (const r of liItems) console.log(`  ${String(r.nb).padStart(4)} x  ${r.item}`);

console.log('\n=== inputAmountTaxed values ===');
const taxed = await sql`
  SELECT season->'pricing'->>'inputAmountTaxed' as v, COUNT(*) as nb
  FROM yacht_selections,
       LATERAL jsonb_array_elements(full_data->'pricing'->'pricingInfo') AS season
  WHERE full_data->'pricing'->'pricingInfo' IS NOT NULL
  GROUP BY v
`;
for (const r of taxed) console.log(`  ${r.v || '(null)'}: ${r.nb}`);

console.log('\n=== Inclusion zone keys ===');
const zKeys = await sql`
  SELECT jsonb_object_keys(zone) as key, COUNT(*) as nb
  FROM yacht_selections,
       LATERAL jsonb_array_elements(full_data->'pricing'->'pricingInfo') AS season,
       LATERAL jsonb_array_elements(season->'inclusionZones') AS zone
  WHERE full_data->'pricing'->'pricingInfo' IS NOT NULL
  GROUP BY jsonb_object_keys(zone)
  ORDER BY nb DESC
`;
for (const r of zKeys) console.log(`  ${r.key.padEnd(20)} ${r.nb}`);

// Currency / Unit distribution
console.log('\n=== Currencies + units distribution across all seasons ===');
const cur = await sql`
  SELECT season->'pricing'->>'currency' as c, season->'pricing'->>'unit' as u, COUNT(*) as nb
  FROM yacht_selections, LATERAL jsonb_array_elements(full_data->'pricing'->'pricingInfo') AS season
  GROUP BY c, u ORDER BY nb DESC
`;
for (const r of cur) console.log(`  ${r.c} / ${r.u}: ${r.nb}`);

// Exclusion zones — present ?
console.log('\n=== exclusionZones non vides ?');
const excl = await sql`
  SELECT yacht_name, season->>'name' as season, jsonb_array_length(season->'exclusionZones') as nb
  FROM yacht_selections, LATERAL jsonb_array_elements(full_data->'pricing'->'pricingInfo') AS season
  WHERE jsonb_array_length(season->'exclusionZones') > 0
  LIMIT 10
`;
for (const r of excl) console.log(`  ${r.yacht_name} / ${r.season}: ${r.nb} exclusions`);
if (excl.length === 0) console.log('  → aucun yacht avec exclusionZones renseigné');
