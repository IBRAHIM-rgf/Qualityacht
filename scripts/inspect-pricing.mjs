// Inspecte la structure pricing complète d'un yacht Ankor
// Usage: node scripts/inspect-pricing.mjs [nom yacht]

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);
const ANKOR_API_URL = process.env.ANKOR_API_URL || 'https://api.ankor.io';
const target = process.argv[2] || 'CORAL OCEAN';

function makeJWT() {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign(
    { scopes: ['website:read:*'], iss: process.env.ANKOR_COMPANY_URI, aud: 'ankor.io', sub: process.env.ANKOR_COMPANY_URI, iat: now, exp: now + 300 },
    (process.env.ANKOR_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    { algorithm: 'RS256', header: { alg: 'RS256', typ: 'JWT', kid: process.env.ANKOR_KEY_ID } }
  );
}

// 1) D'abord, regarder ce qu'on a en BDD
console.log(`\n=== Pricing en BDD pour "${target}" ===`);
const rows = await sql`
  SELECT yacht_name, full_data->'pricing' as pricing
  FROM yacht_selections
  WHERE yacht_name ILIKE ${'%' + target + '%'}
  LIMIT 1
`;
if (rows[0]) {
  console.log(`Yacht: ${rows[0].yacht_name}`);
  console.log(JSON.stringify(rows[0].pricing, null, 2));
} else {
  console.log('Pas en BDD');
}

// 2) Vérifier aussi un échantillon de yachts pour voir si certains ont plus de champs pricing
console.log(`\n=== Échantillon : top-level keys de full_data->pricing pour 10 yachts ===`);
const sample = await sql`
  SELECT yacht_name, jsonb_object_keys(full_data->'pricing') as key
  FROM yacht_selections
  WHERE full_data->'pricing' IS NOT NULL
  ORDER BY yacht_name
  LIMIT 100
`;
// Aggrégate par yacht
const byYacht = {};
for (const r of sample) {
  byYacht[r.yacht_name] = byYacht[r.yacht_name] || [];
  byYacht[r.yacht_name].push(r.key);
}
for (const [name, keys] of Object.entries(byYacht).slice(0, 15)) {
  console.log(`  ${name}: [${keys.join(', ')}]`);
}

// 3) Stats sur quels champs existent dans pricing
console.log(`\n=== Stats par clé pricing (sur tous les yachts avec full_data) ===`);
const keyStats = await sql`
  SELECT k.key, COUNT(*) as nb
  FROM yacht_selections,
       LATERAL jsonb_object_keys(full_data->'pricing') AS k(key)
  WHERE full_data->'pricing' IS NOT NULL
  GROUP BY k.key
  ORDER BY nb DESC
`;
for (const r of keyStats) console.log(`  ${r.key.padEnd(30)} ${r.nb}`);

// 4) Récupérer la réponse Ankor brute pour ce yacht (au cas où la BDD soit partielle)
console.log(`\n=== Fetch Ankor live pour "${target}" (au cas où BDD est outdated) ===`);
const tokenRes = await fetch(`${ANKOR_API_URL}/iam/oauth/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: makeJWT() }),
});
const { access_token } = await tokenRes.json();

const searchRes = await fetch(`${ANKOR_API_URL}/website/search?region=${encodeURIComponent('Caribbean')}`, {
  headers: { Authorization: `Bearer ${access_token}` },
});
const searchData = await searchRes.json();
const hit = (searchData.hits || []).find(h => new RegExp(target, 'i').test(h.name || ''));
if (hit) {
  const entityRes = await fetch(`${ANKOR_API_URL}/website/entity/${encodeURIComponent(hit.uri)}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const entityData = await entityRes.json();
  console.log(`Pricing brut Ankor pour ${hit.name}:`);
  console.log(JSON.stringify(entityData.pricing, null, 2));
} else {
  console.log(`Pas trouvé dans Ankor`);
}
