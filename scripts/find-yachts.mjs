// Cherche une liste de yachts en BDD (et dans Ankor live si absents)
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);
const ANKOR_API_URL = process.env.ANKOR_API_URL || 'https://api.ankor.io';

const WANTED = [
  'CARINTHIA VII', 'ELEMENTS', 'CORAL OCEAN', 'PROJECT X', 'FORCE BLUE', 'ALFA',
  'WESTERLUND GND', 'BATEN KAITOS II', 'SOLAR WINDS', 'OKINAWA', 'THE PURSUIT',
  'THE SUN', 'SUNMOON', 'NENNE', 'LADY ROSE', 'ONE PLANET', 'MANE ET NOCTE',
  'APOLLO 99', 'TESNI', 'STELLA', "L'HIPPOCAMPE", 'VANTANERA', 'ABUNDANCE',
  'DENISE ROSE', 'KINGS LAIR', 'ALLURIA', 'INSPIRATION', 'FAVOR', 'CUPCAKE',
  'GUILLEMOT', 'NITA K II', 'TOP FIVE II', 'ATLANTIC', 'KING BENJI', 'BLACK PEARL',
];

function makeJWT() {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign(
    { scopes: ['website:read:*'], iss: process.env.ANKOR_COMPANY_URI, aud: 'ankor.io', sub: process.env.ANKOR_COMPANY_URI, iat: now, exp: now + 300 },
    (process.env.ANKOR_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    { algorithm: 'RS256', header: { alg: 'RS256', typ: 'JWT', kid: process.env.ANKOR_KEY_ID } }
  );
}

// 1) Check en BDD
console.log('═══ 1) Recherche en BDD (yacht_selections) ═══\n');
const results = { foundCaribbean: [], foundOther: [], notFound: [] };

for (const name of WANTED) {
  const pattern = `%${name}%`;
  const rows = await sql`
    SELECT yacht_name, region, ankor_region
    FROM yacht_selections
    WHERE yacht_name ILIKE ${pattern}
  `;
  if (rows.length === 0) {
    results.notFound.push(name);
  } else if (rows.some(r => r.region === 'caribbean' || r.ankor_region === 'caribbean')) {
    results.foundCaribbean.push({ wanted: name, matches: rows });
  } else {
    results.foundOther.push({ wanted: name, matches: rows });
  }
}

console.log(`✅ DÉJÀ EN BDD (région caribbean) : ${results.foundCaribbean.length}/${WANTED.length}`);
for (const r of results.foundCaribbean) {
  const exact = r.matches[0];
  console.log(`   ${exact.yacht_name}${r.matches.length > 1 ? ` (+${r.matches.length - 1} autres matches)` : ''}`);
}

console.log(`\n⚠️  EN BDD mais autre région : ${results.foundOther.length}`);
for (const r of results.foundOther) {
  for (const m of r.matches) {
    console.log(`   ${m.yacht_name} → région=${m.region || 'aucune'}, ankor_region=${m.ankor_region || 'aucune'} (cherché: ${r.wanted})`);
  }
}

console.log(`\n❌ PAS EN BDD : ${results.notFound.length}`);
for (const n of results.notFound) console.log(`   ${n}`);

// 2) Pour les non-trouvés, on cherche dans Ankor live
if (results.notFound.length > 0) {
  console.log('\n═══ 2) Recherche dans Ankor live (toutes régions) ═══\n');
  const tokenRes = await fetch(`${ANKOR_API_URL}/iam/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: makeJWT() }),
  });
  const { access_token } = await tokenRes.json();

  // On charge toutes les régions principales pour avoir un index complet
  const regions = ['Caribbean', 'West Mediterranean', 'East Mediterranean', 'Indian Ocean & South East Asia', 'Australasia & South Pacific', 'South & Central America', 'Arabian Gulf'];
  const allHits = [];
  for (const region of regions) {
    const r = await fetch(`${ANKOR_API_URL}/website/search?region=${encodeURIComponent(region)}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!r.ok) continue;
    const data = await r.json();
    for (const hit of (data.hits || [])) {
      allHits.push({ ...hit, _region: region });
    }
  }
  console.log(`   ${allHits.length} yachts indexés (toutes régions Ankor)\n`);

  for (const n of results.notFound) {
    const re = new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s*'), 'i');
    const matches = allHits.filter(h => re.test(h.name || ''));
    if (matches.length === 0) {
      console.log(`❌ ${n.padEnd(20)} → introuvable sur Ankor`);
    } else {
      const m = matches[0];
      const others = matches.length > 1 ? ` (+${matches.length - 1} autres)` : '';
      console.log(`🔍 ${n.padEnd(20)} → ${m.name} dans Ankor région "${m._region}"${others}`);
    }
  }
}

// 3) Stats finales
console.log(`\n═══ Résumé ═══`);
console.log(`Demandés:          ${WANTED.length}`);
console.log(`Déjà en BDD/carib: ${results.foundCaribbean.length}`);
console.log(`Manquants:         ${results.notFound.length + results.foundOther.length}`);
