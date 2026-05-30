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

// 1) Statistiques sur tous les yachts en BDD
console.log('--- Stats roles vs nb crew (BDD) ---\n');
const yachts = await sql`
  SELECT yacht_name, full_data->'crew' as crew
  FROM yacht_selections
  WHERE jsonb_array_length(COALESCE(full_data->'crew', '[]'::jsonb)) > 3
  ORDER BY jsonb_array_length(full_data->'crew') DESC
  LIMIT 10
`;
for (const y of yachts) {
  const crew = y.crew || [];
  const roles = {};
  for (const c of crew) {
    const r = c.role || '(null)';
    roles[r] = (roles[r] || 0) + 1;
  }
  const list = Object.entries(roles).map(([r, n]) => `${n}× ${r}`).join(', ');
  console.log(`${y.yacht_name.padEnd(25)} ${crew.length} crew → ${list}`);
}

// 2) Fetch live l'entity raw pour voir si Ankor a d'autres champs crew
console.log('\n--- Raw Ankor entity (live) pour CORAL OCEAN — toutes les keys par crew member ---\n');
const tokenRes = await fetch(`${ANKOR_API_URL}/iam/oauth/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: makeJWT() }),
});
const { access_token } = await tokenRes.json();

const uri = 'c::8864389904::vessel::d5cca304-fe8c-11ed-889f-43d4bb723744';
const er = await fetch(`${ANKOR_API_URL}/website/entity/${encodeURIComponent(uri)}`, {
  headers: { Authorization: `Bearer ${access_token}` },
});
const data = await er.json();
const crew = data.crew || [];

// Print all keys across all crew
const allKeys = new Set();
for (const c of crew) {
  for (const k of Object.keys(c)) allKeys.add(k);
}
console.log(`All keys present in any crew member: ${[...allKeys].join(', ')}`);

console.log('\nSample (first 5) with FULL JSON:');
for (const c of crew.slice(0, 5)) {
  console.log(JSON.stringify(c, null, 2).slice(0, 300));
  console.log('---');
}
