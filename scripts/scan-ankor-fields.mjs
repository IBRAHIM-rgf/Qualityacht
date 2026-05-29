// Scan exhaustif des champs Ankor : full_data en BDD + endpoints additionnels
// Usage: node scripts/scan-ankor-fields.mjs

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL);
const ANKOR_API_URL = process.env.ANKOR_API_URL || 'https://api.ankor.io';

function makeJWT() {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign(
    { scopes: ['website:read:*'], iss: process.env.ANKOR_COMPANY_URI, aud: 'ankor.io', sub: process.env.ANKOR_COMPANY_URI, iat: now, exp: now + 300 },
    (process.env.ANKOR_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    { algorithm: 'RS256', header: { alg: 'RS256', typ: 'JWT', kid: process.env.ANKOR_KEY_ID } }
  );
}

const tokenRes = await fetch(`${ANKOR_API_URL}/iam/oauth/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: makeJWT() }),
});
const { access_token } = await tokenRes.json();

// ========================================
// 1) Inventaire des champs dans full_data (BDD)
// ========================================
console.log('\n========== 1) FIELD COVERAGE on 181 yachts in BDD ==========\n');

// Top-level keys
const topKeys = await sql`
  SELECT k.key, COUNT(*) as nb,
         COUNT(*) FILTER (WHERE full_data->k.key IS NOT NULL AND full_data->k.key != 'null'::jsonb) as nb_filled
  FROM yacht_selections, LATERAL jsonb_object_keys(full_data) AS k(key)
  WHERE full_data IS NOT NULL
  GROUP BY k.key ORDER BY nb DESC
`;
console.log('Top-level entity keys:');
for (const r of topKeys) console.log(`  ${r.key.padEnd(20)} present in ${r.nb}/181 yachts (filled: ${r.nb_filled})`);

// blueprint.* keys
const bpKeys = await sql`
  SELECT k.key, COUNT(*) as nb
  FROM yacht_selections, LATERAL jsonb_object_keys(full_data->'blueprint') AS k(key)
  WHERE full_data->'blueprint' IS NOT NULL
  GROUP BY k.key ORDER BY nb DESC
`;
console.log('\nblueprint.* keys:');
for (const r of bpKeys) console.log(`  blueprint.${r.key.padEnd(25)} present in ${r.nb}/181`);

// pricing.* keys
const prKeys = await sql`
  SELECT k.key, COUNT(*) as nb
  FROM yacht_selections, LATERAL jsonb_object_keys(full_data->'pricing') AS k(key)
  WHERE full_data->'pricing' IS NOT NULL
  GROUP BY k.key ORDER BY nb DESC
`;
console.log('\npricing.* keys:');
for (const r of prKeys) console.log(`  pricing.${r.key.padEnd(25)} present in ${r.nb}/181`);

// crew[0].* keys (sample first crew of each yacht)
const crewKeys = await sql`
  SELECT k.key, COUNT(*) as nb
  FROM yacht_selections, LATERAL jsonb_object_keys((full_data->'crew')->0) AS k(key)
  WHERE jsonb_array_length(COALESCE(full_data->'crew', '[]'::jsonb)) > 0
  GROUP BY k.key ORDER BY nb DESC
`;
console.log('\ncrew[*].* keys (sample on first crew member):');
for (const r of crewKeys) console.log(`  crew[].${r.key.padEnd(25)} present in ${r.nb}/?`);

// blueprint.amenities[0] keys
const amKeys = await sql`
  SELECT k.key, COUNT(*) as nb
  FROM yacht_selections, LATERAL jsonb_object_keys((full_data->'blueprint'->'amenities')->0) AS k(key)
  WHERE jsonb_array_length(COALESCE(full_data->'blueprint'->'amenities', '[]'::jsonb)) > 0
  GROUP BY k.key ORDER BY nb DESC
`;
console.log('\namenities[].* keys:');
for (const r of amKeys) console.log(`  amenities[].${r.key.padEnd(20)} present in ${r.nb}`);

// toys[0]
const toyKeys = await sql`
  SELECT k.key, COUNT(*) as nb
  FROM yacht_selections, LATERAL jsonb_object_keys((full_data->'blueprint'->'toys')->0) AS k(key)
  WHERE jsonb_array_length(COALESCE(full_data->'blueprint'->'toys', '[]'::jsonb)) > 0
  GROUP BY k.key ORDER BY nb DESC
`;
console.log('\ntoys[].* keys:');
for (const r of toyKeys) console.log(`  toys[].${r.key.padEnd(20)} present in ${r.nb}`);

// pricingInfo[0]
const piKeys = await sql`
  SELECT k.key, COUNT(*) as nb
  FROM yacht_selections, LATERAL jsonb_object_keys((full_data->'pricing'->'pricingInfo')->0) AS k(key)
  WHERE jsonb_array_length(COALESCE(full_data->'pricing'->'pricingInfo', '[]'::jsonb)) > 0
  GROUP BY k.key ORDER BY nb DESC
`;
console.log('\npricing.pricingInfo[].* keys:');
for (const r of piKeys) console.log(`  pricingInfo[].${r.key.padEnd(18)} present in ${r.nb}`);

// basePort keys
const bpKeysBase = await sql`
  SELECT k.key, COUNT(*) as nb
  FROM yacht_selections, LATERAL jsonb_object_keys(full_data->'blueprint'->'basePort') AS k(key)
  WHERE full_data->'blueprint'->'basePort' IS NOT NULL
  GROUP BY k.key ORDER BY nb DESC
`;
console.log('\nblueprint.basePort.* keys:');
for (const r of bpKeysBase) console.log(`  basePort.${r.key.padEnd(20)} present in ${r.nb}`);

// ========================================
// 2) Endpoints additionnels Ankor (test live)
// ========================================
console.log('\n\n========== 2) Other Ankor endpoints (live probes) ==========\n');

const sampleUri = (await sql`SELECT yacht_id FROM yacht_selections WHERE region='caribbean' LIMIT 1`)[0]?.yacht_id;

const endpoints = [
  // ['method', 'url', 'description']
  ['GET', `/website/search?region=Caribbean`, 'search yachts par région'],
  ['GET', `/website/entity/${encodeURIComponent(sampleUri)}`, 'entity vessel (déjà connu)'],
  ['GET', `/website/calendar/${encodeURIComponent(sampleUri)}`, 'calendrier de disponibilité ?'],
  ['GET', `/website/itinerary/${encodeURIComponent(sampleUri)}`, 'itinéraires ?'],
  ['GET', `/website/booking/${encodeURIComponent(sampleUri)}`, 'booking info ?'],
  ['GET', `/website/quote/${encodeURIComponent(sampleUri)}`, 'quote info ?'],
  ['GET', `/website/availability/${encodeURIComponent(sampleUri)}`, 'availability ?'],
  ['GET', `/website/reviews/${encodeURIComponent(sampleUri)}`, 'reviews ?'],
  ['GET', `/website/destinations`, 'liste des destinations'],
  ['GET', `/website/regions`, 'liste des régions'],
  ['GET', `/entity/vessel/list`, 'liste complète vessels (mentioned in utils.js)'],
  ['GET', `/currency/fx/EUR`, 'taux de change (mentioned in utils.js)'],
];

for (const [method, path, desc] of endpoints) {
  try {
    const r = await fetch(`${ANKOR_API_URL}${path}`, {
      method,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const status = r.status;
    let preview = '';
    if (r.ok) {
      const text = await r.text();
      try {
        const j = JSON.parse(text);
        const keys = Array.isArray(j) ? `array[${j.length}]` : Object.keys(j).slice(0, 10).join(',');
        preview = ` → keys: ${keys}`;
      } catch {
        preview = ` → text (${text.length} chars)`;
      }
    }
    const marker = status === 200 ? '✓' : (status === 404 ? '✗' : '?');
    console.log(`  ${marker} ${status}  ${path.slice(0, 80)}`);
    console.log(`         ${desc}${preview}`);
  } catch (e) {
    console.log(`  ! ERR  ${path}: ${e.message}`);
  }
}
