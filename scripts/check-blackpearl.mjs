// Recheck BLACK PEARL en BDD et Ankor avec différentes orthographes
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);
const ANKOR_API_URL = process.env.ANKOR_API_URL || 'https://api.ankor.io';

console.log('═══ Recherche BLACK PEARL en BDD ═══');
const inDb = await sql`
  SELECT yacht_name, region, ankor_region, is_visible
  FROM yacht_selections
  WHERE yacht_name ILIKE '%BLACK%PEARL%' OR yacht_name ILIKE '%BLACKPEARL%' OR yacht_name ILIKE 'BP%'
`;
console.log(`  ${inDb.length} match en BDD`);
for (const r of inDb) console.log(`    ${r.yacht_name} → region=${r.region} ankor_region=${r.ankor_region} visible=${r.is_visible}`);

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

console.log('\n═══ Recherche dans Ankor (toutes régions) ═══');
const regions = ['Caribbean', 'West Mediterranean', 'East Mediterranean', 'Indian Ocean & South East Asia', 'Australasia & South Pacific', 'South & Central America', 'Arabian Gulf', 'North America', 'Northern Europe', 'Africa', 'Antarctica'];
const hits = [];
for (const region of regions) {
  const r = await fetch(`${ANKOR_API_URL}/website/search?region=${encodeURIComponent(region)}`, { headers: { Authorization: `Bearer ${access_token}` } });
  if (!r.ok) continue;
  const data = await r.json();
  for (const h of (data.hits || [])) {
    const n = String(h.name || '').toUpperCase().replace(/[^A-Z]/g, '');
    if (n.includes('BLACK') || n.includes('PEARL')) hits.push({ ...h, _region: region });
  }
}
console.log(`  ${hits.length} match dans Ankor`);
for (const h of hits) console.log(`    "${h.name}" → ${h._region} (uri=${h.uri.slice(-40)})`);
