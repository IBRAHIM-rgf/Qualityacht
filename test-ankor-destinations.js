// Test des destinations disponibles dans l'API Ankor
import fs from 'fs';
import jwt from 'jsonwebtoken';

// Lire les variables d'environnement
const envContent = fs.readFileSync('.env.local', 'utf-8');
const lines = envContent.split('\n');

let ANKOR_API_URL, ANKOR_COMPANY_URI, ANKOR_KEY_ID, ANKOR_PRIVATE_KEY;

for (const line of lines) {
  if (line.startsWith('ANKOR_API_URL=')) {
    ANKOR_API_URL = line.split('=')[1].trim();
  } else if (line.startsWith('ANKOR_COMPANY_URI=')) {
    ANKOR_COMPANY_URI = line.split('=')[1].trim();
  } else if (line.startsWith('ANKOR_KEY_ID=')) {
    ANKOR_KEY_ID = line.split('=')[1].trim();
  } else if (line.startsWith('ANKOR_PRIVATE_KEY=')) {
    ANKOR_PRIVATE_KEY = line.substring(line.indexOf('=') + 1).trim().replace(/\\n/g, '\n');
  }
}

// Générer un JWT
function generateJWT() {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: ANKOR_KEY_ID,
    sub: ANKOR_COMPANY_URI,
    aud: `${ANKOR_API_URL}/iam/oauth/token`,
    exp: now + 300,
    iat: now,
  };

  return jwt.sign(payload, ANKOR_PRIVATE_KEY, { algorithm: 'RS256' });
}

// Obtenir un token d'accès
async function getAccessToken() {
  const clientAssertion = generateJWT();

  const response = await fetch(`${ANKOR_API_URL}/iam/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: clientAssertion,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

// Tester différentes destinations
async function testDestinations() {
  console.log('🔑 Obtention du token...');
  const token = await getAccessToken();
  console.log('✅ Token obtenu\n');

  const destinationsToTest = [
    'nice',
    'monaco',
    'france',
    'west-mediterranean',
    'east-mediterranean',
    'caribbean',
    'bahamas',
    'arctic',
    'indian-ocean',
    'pacific-ocean',
    'indonesia',
    'africa',
    'oceania',
  ];

  for (const dest of destinationsToTest) {
    console.log(`\n📍 Test destination: "${dest}"`);

    try {
      const response = await fetch(
        `${ANKOR_API_URL}/website/search?destination=${encodeURIComponent(dest)}&limit=5`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.log(`   ❌ Erreur ${response.status}: ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      const count = data.yachts?.length || 0;

      if (count > 0) {
        console.log(`   ✅ ${count} yacht(s) trouvé(s)`);
        console.log(`   Exemples: ${data.yachts.slice(0, 3).map(y => y.name).join(', ')}`);
      } else {
        console.log(`   ⚠️  Aucun yacht trouvé`);
      }
    } catch (error) {
      console.log(`   ❌ Erreur: ${error.message}`);
    }
  }
}

testDestinations().catch(console.error);
