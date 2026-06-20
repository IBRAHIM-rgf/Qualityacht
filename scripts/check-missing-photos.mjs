// Verifie pourquoi les yachts DENISE ROSE, NENNE, THE PURSUIT, SOLAR WINDS n'ont pas de photos.
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);
const ANKOR_API_URL = process.env.ANKOR_API_URL || 'https://api.ankor.io';

const WANTED = ['DENISE ROSE', 'NENNE', 'THE PURSUIT', 'SOLAR WINDS'];

function makeJWT() {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign(
    { scopes: ['website:read:*'], iss: process.env.ANKOR_COMPANY_URI, aud: 'ankor.io', sub: process.env.ANKOR_COMPANY_URI, iat: now, exp: now + 300 },
    (process.env.ANKOR_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    { algorithm: 'RS256', header: { alg: 'RS256', typ: 'JWT', kid: process.env.ANKOR_KEY_ID } }
  );
}

console.log('═══ 1) BDD ═══\n');
for (const name of WANTED) {
  const rows = await sql`
    SELECT yacht_name, region, ankor_region, is_visible,
           light_data->'images' AS light_images,
           full_data->'images' AS full_images,
           light_data->'imageUrl' AS light_image_url,
           full_data->'imageUrl' AS full_image_url,
           light_data->>'uri' AS light_uri,
           full_data->>'uri' AS full_uri
    FROM yacht_selections
    WHERE yacht_name ILIKE ${`%${name}%`}
  `;
  if (rows.length === 0) {
    console.log(`❌ ${name}: NOT IN DB`);
    continue;
  }
  for (const r of rows) {
    const lightCount = Array.isArray(r.light_images) ? r.light_images.length : 0;
    const fullCount = Array.isArray(r.full_images) ? r.full_images.length : 0;
    console.log(`📦 ${r.yacht_name} (${r.region}/${r.ankor_region}, visible=${r.is_visible})`);
    console.log(`   light_data.images : ${lightCount} | full_data.images : ${fullCount}`);
    console.log(`   light_data.imageUrl : ${r.light_image_url || '(none)'}`);
    console.log(`   full_data.imageUrl : ${r.full_image_url || '(none)'}`);
    console.log(`   light uri : ${r.light_uri || '(none)'} | full uri : ${r.full_uri || '(none)'}`);
  }
  console.log();
}

console.log('\n═══ 2) Ankor live ═══\n');
const token = await (async () => {
  const j = makeJWT();
  const res = await fetch(`${ANKOR_API_URL}/iam/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: j,
    }).toString(),
  });
  const data = await res.json();
  return data.access_token || data.token;
})();

// Fetch directly by uri to get full data with images
const URIS = [
  { name: 'DENISE ROSE',  uri: 'c::8275378522::vessel::d5cc2600-fe8c-11ed-889f-43d4bb723744' },
  { name: 'NENNE',        uri: 'c::8275378522::vessel::d5cbfb20-fe8c-11ed-889f-43d4bb723744' },
  { name: 'THE PURSUIT',  uri: 'c::8275378522::vessel::d5cc4dda-fe8c-11ed-889f-43d4bb723744' },
  { name: 'SOLAR WINDS',  uri: 'c::8275378522::vessel::a85435c0-8236-11ee-96e1-5fc48196af5d' },
];

// Search Caribbean to see if yachts still exist under new URIs
console.log('Searching all caribbean to check current vessels...\n');
const sr = await fetch(`${ANKOR_API_URL}/website/search?region=${encodeURIComponent('Caribbean')}`, {
  headers: { Authorization: `Bearer ${token}` }
});
const searchData = await sr.json();
const items = searchData.items || searchData.data || searchData.hits || [];
console.log(`Total Caribbean yachts in Ankor: ${items.length}`);

// Quick peek at structure
if (items.length > 0) {
  console.log('Sample item keys:', Object.keys(items[0]).slice(0, 15));
  console.log('Sample item name field:', typeof items[0].name, items[0].name);
}

for (const { name } of URIS) {
  const matches = items.filter((it) => {
    const candidates = [it.name, it.title, it.vesselName, it.vessel_name, it.label];
    const n = String(candidates.find((c) => typeof c === 'string') || '').toUpperCase();
    return n.includes(name);
  });
  if (matches.length === 0) {
    console.log(`❌ ${name}: NOT in current Ankor Caribbean search (deleted from Ankor)`);
  } else {
    for (const m of matches) {
      const imgCount = Array.isArray(m.images) ? m.images.length : 0;
      console.log(`✅ ${name} found as "${m.name || m.title}" (uri: ${m.uri || m.id}) | images: ${imgCount}`);
    }
  }
}
