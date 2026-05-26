// Seed Coral Ocean dans test_yachts avec TOUTES les infos Ankor (full_data brut)
// Usage: node scripts/seed-coral-ocean.mjs

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

config({ path: '.env.local' });

const ANKOR_API_URL = process.env.ANKOR_API_URL || 'https://api.ankor.io';
const sql = neon(process.env.DATABASE_URL);

function makeJWT() {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign(
    {
      scopes: ['website:read:*'],
      iss: process.env.ANKOR_COMPANY_URI,
      aud: 'ankor.io',
      sub: process.env.ANKOR_COMPANY_URI,
      iat: now,
      exp: now + 300,
    },
    (process.env.ANKOR_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    { algorithm: 'RS256', header: { alg: 'RS256', typ: 'JWT', kid: process.env.ANKOR_KEY_ID } }
  );
}

async function getToken() {
  const r = await fetch(`${ANKOR_API_URL}/iam/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: makeJWT(),
    }),
  });
  if (!r.ok) throw new Error(`Ankor auth ${r.status}: ${await r.text()}`);
  return (await r.json()).access_token;
}

function formatPrice(p) {
  if (!p) return null;
  const amount = p.price / 100;
  const sym = { EUR: '€', USD: '$', GBP: '£' }[p.currency] || p.currency || '€';
  return `${new Intl.NumberFormat('fr-FR').format(amount)} ${sym}`;
}

async function main() {
  console.log('1. ALTER TABLE test_yachts ADD COLUMN IF NOT EXISTS full_data JSONB');
  await sql`ALTER TABLE test_yachts ADD COLUMN IF NOT EXISTS full_data JSONB`;
  console.log('   ✓');

  console.log('2. Authentification Ankor...');
  const token = await getToken();
  console.log('   ✓ token obtenu');

  // On cherche dans la région Caribbean (où Coral Ocean est connu) puis on filtre par nom.
  // L'API /website/search ne supporte pas le filtre par nom direct (testé : il filtre côté client).
  console.log('3. Recherche Coral Ocean dans Caribbean...');
  const candidates = [];
  for (const region of ['Caribbean', 'West Mediterranean', 'East Mediterranean']) {
    const r = await fetch(`${ANKOR_API_URL}/website/search?region=${encodeURIComponent(region)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) {
      console.warn(`   ! search ${region} -> ${r.status}`);
      continue;
    }
    const data = await r.json();
    const matches = (data.hits || []).filter(h => /coral\s*ocean/i.test(h.name || ''));
    console.log(`   ${region}: ${matches.length} match(s)`);
    candidates.push(...matches);
  }

  // Dédupliquer par uri
  const seen = new Set();
  const uniq = candidates.filter(c => {
    if (seen.has(c.uri)) return false;
    seen.add(c.uri);
    return true;
  });

  if (uniq.length === 0) {
    console.error('❌ Aucun yacht "Coral Ocean" trouvé dans Ankor.');
    process.exit(1);
  }

  const vessel = uniq[0];
  console.log(`   ✓ trouvé : ${vessel.name} (uri=${vessel.uri})`);

  console.log('4. Récupération entity (détail complet)...');
  const er = await fetch(`${ANKOR_API_URL}/website/entity/${encodeURIComponent(vessel.uri)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!er.ok) throw new Error(`entity ${er.status}`);
  const fullData = await er.json();
  console.log('   ✓ entity récupéré');
  console.log(`     - description: ${fullData.description?.length || 0} chars`);
  console.log(`     - images: ${fullData.blueprint?.images?.length || 0}`);
  console.log(`     - amenities: ${fullData.blueprint?.amenities?.length || 0}`);
  console.log(`     - toys: ${fullData.blueprint?.toys?.length || 0}`);
  console.log(`     - entertainment: ${fullData.blueprint?.entertainment?.length || 0}`);
  console.log(`     - tenders: ${fullData.blueprint?.tenders?.length || 0}`);
  console.log(`     - crew: ${fullData.crew?.length || 0}`);

  // Mapping classique pour cached_data (compat ancien format)
  const bp = fullData?.blueprint;
  const pricing = fullData?.pricing;
  const cached = {
    id: vessel.uri,
    name: vessel.name || bp?.name,
    pricePerHour: pricing?.weekPricingFrom ? formatPrice(pricing.weekPricingFrom) : null,
    price: pricing?.dayPricingFrom ? formatPrice(pricing.dayPricingFrom) : null,
    description: fullData?.description || undefined,
    length: vessel.length ? `${vessel.length}m` : (bp?.length ? `${bp.length}m` : undefined),
    guests: vessel.sleeps || bp?.sleeps,
    capacity: vessel.sleeps || bp?.sleeps,
    cabins: vessel.cabins || bp?.cabins,
    crew: bp?.maxCrew,
    year: vessel.builtYear || bp?.builtYear,
    refit: bp?.refitYear,
    location: bp?.basePort?.name || undefined,
    destinations: bp?.basePort?.name ? [bp.basePort.name] : undefined,
    images: [vessel.hero, ...(bp?.images || [])].filter(Boolean),
    type: vessel.yachtType ? (Array.isArray(vessel.yachtType) ? vessel.yachtType[0] : vessel.yachtType).toLowerCase() : undefined,
    make: vessel.make || bp?.make,
  };

  console.log('5. Upsert en BDD...');
  await sql`
    INSERT INTO test_yachts (yacht_id, cached_data, full_data, updated_at)
    VALUES (${vessel.uri}, ${JSON.stringify(cached)}, ${JSON.stringify(fullData)}, NOW())
    ON CONFLICT (yacht_id) DO UPDATE
      SET cached_data = EXCLUDED.cached_data,
          full_data = EXCLUDED.full_data,
          updated_at = NOW()
  `;
  console.log(`   ✓ ${cached.name} upsertée`);

  const stats = await sql`SELECT yacht_id, cached_data->>'name' as name FROM test_yachts ORDER BY updated_at DESC LIMIT 10`;
  console.log('\n📦 Contenu test_yachts:');
  for (const row of stats) console.log(`   - ${row.name}`);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
