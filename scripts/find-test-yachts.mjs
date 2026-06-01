// Cherche SH DIANA, OUVEGA + un yacht day charter pour /test-infos
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

// 1) En BDD
console.log('═══ 1) Recherche SH DIANA / OUVEGA en BDD ═══');
for (const name of ['SH DIANA', 'OUVEGA', 'DIANA', 'VEGA']) {
  const rows = await sql`SELECT yacht_name, region, ankor_region, is_visible FROM yacht_selections WHERE yacht_name ILIKE ${'%' + name + '%'} LIMIT 5`;
  console.log(`  "${name}" → ${rows.length} match${rows.length > 1 ? 'es' : ''}`);
  for (const r of rows) console.log(`     ${r.yacht_name} | region=${r.region} | ankor=${r.ankor_region} | visible=${r.is_visible}`);
}

console.log('\n═══ 2) Yachts en BDD qui font DAY CHARTER ═══');
const dayCharter = await sql`
  SELECT yacht_name, region,
    jsonb_array_length(COALESCE(full_data->'pricing'->'pricingInfo', '[]'::jsonb)) as seasons,
    (full_data->'pricing'->'dayPricingFrom'->>'price')::numeric / 100 as day_from
  FROM yacht_selections
  WHERE (full_data->'pricing'->'dayPricingFrom') IS NOT NULL
     OR EXISTS (
       SELECT 1 FROM jsonb_array_elements(COALESCE(full_data->'pricing'->'pricingInfo', '[]'::jsonb)) as s
       WHERE s->'pricing'->>'unit' IN ('DAY', 'HOUR')
     )
  ORDER BY yacht_name
  LIMIT 15
`;
console.log(`  ${dayCharter.length} yachts avec day/hour charter en BDD :`);
for (const r of dayCharter) {
  console.log(`     ${r.yacht_name.padEnd(25)} (${r.region}) - ${r.seasons} saisons${r.day_from ? `, day from ${r.day_from}` : ''}`);
}

// 3) Ankor live pour SH DIANA / OUVEGA
console.log('\n═══ 3) Recherche dans Ankor live ═══');
const tokenRes = await fetch(`${ANKOR_API_URL}/iam/oauth/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: makeJWT() }),
});
const { access_token } = await tokenRes.json();

const regions = ['Caribbean', 'West Mediterranean', 'East Mediterranean', 'Indian Ocean & South East Asia', 'Australasia & South Pacific', 'South & Central America', 'Arabian Gulf', 'North America', 'Northern Europe', 'Africa', 'Antarctica'];
const hits = [];
for (const region of regions) {
  const r = await fetch(`${ANKOR_API_URL}/website/search?region=${encodeURIComponent(region)}`, { headers: { Authorization: `Bearer ${access_token}` } });
  if (!r.ok) continue;
  const data = await r.json();
  for (const h of (data.hits || [])) hits.push({ ...h, _region: region });
}

for (const search of ['SH DIANA', 'OUVEGA', 'DIANA', 'VEGA']) {
  const re = new RegExp(search.replace(/\s+/g, '\\s*'), 'i');
  const matches = hits.filter(h => re.test(String(h.name || '')));
  console.log(`\n  "${search}" : ${matches.length} match`);
  for (const m of matches.slice(0, 5)) console.log(`     "${m.name}" — ${m._region}`);
}
