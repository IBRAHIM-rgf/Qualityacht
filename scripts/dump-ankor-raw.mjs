// Dump des réponses brutes Ankor pour debug
// Usage: node scripts/dump-ankor-raw.mjs [region]
// Charge .env.local, appelle /website/search puis /website/entity/{uri} et affiche le JSON brut.

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config({ path: '.env.local' });

const ANKOR_API_URL = process.env.ANKOR_API_URL || 'https://api.ankor.io';
const region = process.argv[2] || 'Caribbean';

function generateJWT() {
  const now = Math.floor(Date.now() / 1000);
  const privateKey = process.env.ANKOR_PRIVATE_KEY.replace(/\\n/g, '\n');
  return jwt.sign(
    {
      scopes: ['website:read:*'],
      iss: process.env.ANKOR_COMPANY_URI,
      aud: 'ankor.io',
      sub: process.env.ANKOR_COMPANY_URI,
      iat: now,
      exp: now + 60 * 55,
    },
    privateKey,
    { algorithm: 'RS256', header: { alg: 'RS256', typ: 'JWT', kid: process.env.ANKOR_KEY_ID } }
  );
}

async function fetchToken() {
  const res = await fetch(`${ANKOR_API_URL}/iam/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: generateJWT(),
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function main() {
  const token = await fetchToken();

  console.log('========================================');
  console.log(`1) GET /website/search?region=${encodeURIComponent(region)}`);
  console.log('========================================');
  const searchRes = await fetch(
    `${ANKOR_API_URL}/website/search?region=${encodeURIComponent(region)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const searchData = await searchRes.json();

  console.log('Status:', searchRes.status);
  console.log('Top-level keys:', Object.keys(searchData));
  console.log(`Total hits: ${searchData.hits?.length || 0}`);
  console.log('\nFirst hit (raw):');
  console.log(JSON.stringify(searchData.hits?.[0], null, 2));

  const firstUri = searchData.hits?.[0]?.uri;
  if (!firstUri) {
    console.log('No URI found, stopping');
    return;
  }

  console.log('\n========================================');
  console.log(`2) GET /website/entity/${firstUri}`);
  console.log('========================================');
  const entityRes = await fetch(
    `${ANKOR_API_URL}/website/entity/${encodeURIComponent(firstUri)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const entityData = await entityRes.json();

  console.log('Status:', entityRes.status);
  console.log('Top-level keys:', Object.keys(entityData));
  console.log('\nFull entity (raw):');
  console.log(JSON.stringify(entityData, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
