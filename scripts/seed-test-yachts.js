// Seed des yachts de test en BDD (table test_yachts, séparée de yacht_selections)
// Pour éviter de recharger Ankor à chaque rendu des pages de test (yacht-detail, etc.)
require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const jwt = require('jsonwebtoken');

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
  console.log('Seed test_yachts\n');

  console.log('1. Création de la table test_yachts si absente...');
  await sql`
    CREATE TABLE IF NOT EXISTS test_yachts (
      yacht_id TEXT PRIMARY KEY,
      cached_data JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log('   ✓ table prête');

  console.log('2. Authentification Ankor...');
  const token = await getToken();
  console.log('   ✓ token obtenu');

  console.log('3. Recherche Caribbean...');
  const r = await fetch(`${ANKOR_API_URL}/website/search?region=${encodeURIComponent('Caribbean')}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) throw new Error(`search ${r.status}`);
  const data = await r.json();
  const hits = (data.hits || []).slice(0, 12);
  console.log(`   ✓ ${hits.length} hits pris (sur ${data.hits?.length || 0})`);

  console.log('4. Récupération des détails...');
  const yachts = [];
  for (const vessel of hits) {
    if (!vessel.uri) continue;
    const dr = await fetch(`${ANKOR_API_URL}/website/entity/${encodeURIComponent(vessel.uri)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!dr.ok) continue;
    const det = await dr.json();
    const bp = det?.blueprint;
    const pricing = det?.pricing;
    const yacht = {
      id: vessel.uri,
      name: vessel.name || bp?.name,
      pricePerHour: pricing?.weekPricingFrom ? formatPrice(pricing.weekPricingFrom) : null,
      price: pricing?.dayPricingFrom ? formatPrice(pricing.dayPricingFrom) : null,
      description: det?.description || undefined,
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
      type: vessel.yachtType ? vessel.yachtType.toLowerCase() : undefined,
      make: vessel.make || bp?.make,
    };
    yachts.push(yacht);
  }

  yachts.sort((a, b) => (b.images?.length || 0) - (a.images?.length || 0));
  const picked = yachts.slice(0, 5);
  console.log(`   ✓ ${picked.length} yachts retenus (${picked.map((y) => `${y.name}:${y.images?.length || 0}img`).join(', ')})`);

  console.log('5. Upsert en BDD...');
  for (const y of picked) {
    await sql`
      INSERT INTO test_yachts (yacht_id, cached_data, updated_at)
      VALUES (${y.id}, ${JSON.stringify(y)}, NOW())
      ON CONFLICT (yacht_id) DO UPDATE
        SET cached_data = EXCLUDED.cached_data, updated_at = NOW()
    `;
    console.log(`   ✓ ${y.name}`);
  }

  const count = await sql`SELECT COUNT(*) as count FROM test_yachts`;
  console.log(`\n✅ Terminé. ${count[0].count} test yachts en BDD.`);
}

main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
