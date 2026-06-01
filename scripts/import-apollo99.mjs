// Importe APOLLO 99 depuis Ankor (région source West Med) avec override region='caribbean'.
// Idempotent : ré-exécutable.

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
console.log('✓ Token Ankor obtenu');

// 1) Cherche APOLLO 99 dans toutes régions principales pour avoir le bon URI
const regions = ['West Mediterranean', 'East Mediterranean'];
let target = null;
for (const region of regions) {
  const r = await fetch(`${ANKOR_API_URL}/website/search?region=${encodeURIComponent(region)}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!r.ok) continue;
  const data = await r.json();
  const found = (data.hits || []).find(h => /^APOLLO\s*99$/i.test((h.name || '').trim()));
  if (found) {
    target = { ...found, _region: region };
    break;
  }
}
if (!target) { console.error('❌ APOLLO 99 introuvable sur Ankor'); process.exit(1); }
console.log(`✓ Trouvé : ${target.name} (uri=${target.uri.slice(-40)}, source: ${target._region})`);

// 2) Récupérer l'entity complet
const er = await fetch(`${ANKOR_API_URL}/website/entity/${encodeURIComponent(target.uri)}`, {
  headers: { Authorization: `Bearer ${access_token}` },
});
if (!er.ok) { console.error(`entity ${er.status}`); process.exit(1); }
const fullData = await er.json();
console.log(`✓ Entity récupérée (description ${fullData.description?.length || 0} chars, ${fullData.blueprint?.images?.length || 0} images, ${fullData.crew?.length || 0} crew, ${fullData.pricing?.pricingInfo?.length || 0} saisons)`);

// 3) Construire light_data
const bp = fullData.blueprint || {};
const pricing = fullData.pricing || {};
const formatPrice = (p) => {
  if (!p?.price) return null;
  const sym = { EUR: '€', USD: '$', GBP: '£' }[p.currency] || p.currency || '€';
  return `${new Intl.NumberFormat('fr-FR').format(p.price / 100)} ${sym}`;
};
const heroImage = target.hero || bp.images?.[0] || null;
const lightData = {
  id: target.uri,
  name: target.name || bp.name,
  description: fullData.description || null,
  hero_image: heroImage,
  length: target.length ? `${target.length}m` : (bp.length ? `${bp.length}m` : null),
  guests: target.sleeps || bp.sleeps || null,
  cabins: target.cabins || bp.cabins || null,
  crew: bp.maxCrew || null,
  year: target.builtYear || bp.builtYear || null,
  type: (Array.isArray(fullData.yachtType) ? fullData.yachtType[0] : fullData.yachtType || '').toLowerCase() || null,
  location: bp.basePort?.name || null,
  price: pricing.weekPricingFrom ? formatPrice(pricing.weekPricingFrom) : null,
  make: target.make || bp.make || null,
};

// 4) Upsert dans yacht_selections avec region='caribbean' override + ankor_region='west-mediterranean' (vérité Ankor)
await sql`ALTER TABLE yacht_selections ADD COLUMN IF NOT EXISTS ankor_region VARCHAR(50)`;
await sql`ALTER TABLE yacht_selections ADD COLUMN IF NOT EXISTS light_data JSONB`;
await sql`ALTER TABLE yacht_selections ADD COLUMN IF NOT EXISTS full_data JSONB`;

const countResult = await sql`SELECT COUNT(*) as count FROM yacht_selections`;
const nextOrder = parseInt(countResult[0].count) || 0;

const result = await sql`
  INSERT INTO yacht_selections (
    yacht_id, yacht_name, is_visible, is_featured, display_order,
    light_data, full_data, cached_at, ankor_region, region
  )
  VALUES (
    ${target.uri}, ${target.name}, true, false, ${nextOrder},
    ${JSON.stringify(lightData)}, ${JSON.stringify(fullData)},
    NOW(), 'west-mediterranean', 'caribbean'
  )
  ON CONFLICT (yacht_id) DO UPDATE
  SET light_data = EXCLUDED.light_data,
      full_data = EXCLUDED.full_data,
      ankor_region = EXCLUDED.ankor_region,
      region = 'caribbean',
      cached_at = NOW(),
      updated_at = NOW()
  RETURNING (xmax = 0) AS inserted
`;
const wasInserted = result[0]?.inserted;
console.log(`✓ APOLLO 99 ${wasInserted ? 'INSÉRÉ' : 'MIS À JOUR'} en BDD avec region='caribbean' (ankor_region='west-mediterranean')`);

// 5) Vérif
const check = await sql`SELECT yacht_name, region, ankor_region FROM yacht_selections WHERE yacht_id = ${target.uri}`;
console.log('\nVérification BDD :');
console.log(`  ${check[0].yacht_name} | region=${check[0].region} | ankor_region=${check[0].ankor_region}`);

const total = await sql`SELECT COUNT(*) as nb FROM yacht_selections WHERE region = 'caribbean'`;
console.log(`\nTotal yachts région 'caribbean' en BDD : ${total[0].nb}`);
