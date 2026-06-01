// Recherche fuzzy multi-stratégie pour les 13 yachts manquants
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);
const ANKOR_API_URL = process.env.ANKOR_API_URL || 'https://api.ankor.io';

const MISSING = [
  'CARINTHIA VII', 'ELEMENTS', 'PROJECT X', 'FORCE BLUE', 'ALFA', 'APOLLO 99',
  'KINGS LAIR', 'ALLURIA', 'INSPIRATION', 'FAVOR', 'GUILLEMOT', 'NITA K II', 'BLACK PEARL',
];

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

// On indexe les yachts de TOUTES les régions Ankor
const regions = [
  'Caribbean', 'West Mediterranean', 'East Mediterranean',
  'Indian Ocean & South East Asia', 'Australasia & South Pacific',
  'South & Central America', 'Arabian Gulf', 'North America', 'Northern Europe', 'Africa', 'Antarctica',
];
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
console.log(`Index Ankor : ${allHits.length} yachts toutes régions\n`);

const norm = s => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim();

for (const wanted of MISSING) {
  const wantedNorm = norm(wanted);
  const wantedKeywords = wantedNorm.split(' ').filter(k => k.length >= 2);

  console.log(`\n─── ${wanted} ───`);

  // Stratégie 1 : exact (insensitive)
  const exact = allHits.filter(h => norm(h.name) === wantedNorm);
  if (exact.length > 0) {
    console.log(`  ✓ MATCH EXACT (${exact.length})`);
    for (const m of exact.slice(0, 5)) {
      console.log(`     "${m.name}" — ${m._region} — uri=${m.uri.slice(-40)}`);
    }
    continue;
  }

  // Stratégie 2 : tous les mots présents dans le nom Ankor
  const allWords = allHits.filter(h => {
    const hNorm = norm(h.name);
    return wantedKeywords.every(k => hNorm.includes(k));
  });
  if (allWords.length > 0) {
    console.log(`  ~ Mots-clés tous présents (${allWords.length}) :`);
    for (const m of allWords.slice(0, 5)) {
      console.log(`     "${m.name}" — ${m._region}`);
    }
    continue;
  }

  // Stratégie 3 : au moins un mot-clé présent (si le yacht a un nom à 2+ mots)
  if (wantedKeywords.length >= 2) {
    const anyWord = allHits.filter(h => {
      const hNorm = norm(h.name);
      return wantedKeywords.some(k => k.length >= 4 && hNorm.includes(k));
    });
    if (anyWord.length > 0 && anyWord.length <= 8) {
      console.log(`  ? Match partiel (${anyWord.length}, ≥1 mot-clé long) :`);
      for (const m of anyWord.slice(0, 8)) {
        console.log(`     "${m.name}" — ${m._region}`);
      }
      continue;
    }
  }

  console.log(`  ✗ Aucune correspondance dans Ankor.`);
}
