// Script pour lister toutes les régions disponibles dans l'API Ankor
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Lire les credentials depuis .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const lines = envContent.split('\n');

let ANKOR_API_URL, ANKOR_COMPANY_URI, ANKOR_KEY_ID;
let ANKOR_PRIVATE_KEY = '';
let inKey = false;

lines.forEach(line => {
  if (line.startsWith('ANKOR_API_URL=')) {
    ANKOR_API_URL = line.split('=')[1].trim();
  } else if (line.startsWith('ANKOR_COMPANY_URI=')) {
    ANKOR_COMPANY_URI = line.split('=')[1].trim();
  } else if (line.startsWith('ANKOR_KEY_ID=')) {
    ANKOR_KEY_ID = line.split('=')[1].trim();
  } else if (line.includes('BEGIN PRIVATE KEY')) {
    inKey = true;
    ANKOR_PRIVATE_KEY = line.split('"')[1];
  } else if (inKey) {
    if (line.includes('END PRIVATE KEY')) {
      ANKOR_PRIVATE_KEY += '\n' + line.split('"')[0];
      inKey = false;
    } else {
      ANKOR_PRIVATE_KEY += '\n' + line;
    }
  }
});

// Générer le JWT
function generateJWT() {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: ANKOR_COMPANY_URI,
    sub: ANKOR_COMPANY_URI,
    aud: `${ANKOR_API_URL}/iam/oauth/token`,
    exp: now + 300,
    iat: now,
  };

  const header = {
    alg: "RS256",
    typ: "JWT",
    kid: ANKOR_KEY_ID,
  };

  return jwt.sign(payload, ANKOR_PRIVATE_KEY, {
    algorithm: 'RS256',
    header: header
  });
}

// Obtenir le Bearer Token
async function getBearerToken() {
  const assertion = generateJWT();

  const response = await fetch(`${ANKOR_API_URL}/iam/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: assertion
    }).toString()
  });

  if (!response.ok) {
    throw new Error(`OAuth failed: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Récupérer tous les yachts
async function getAllVessels(token) {
  const response = await fetch(`${ANKOR_API_URL}/entity/vessel/list`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to get vessels: ${response.status}`);
  }

  return await response.json();
}

// Récupérer les détails d'un yacht
async function getVesselDetails(token, uri) {
  const response = await fetch(`${ANKOR_API_URL}/entity/vessel/${uri}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

// Main
(async () => {
  try {
    console.log('🔐 Authentification...');
    const token = await getBearerToken();
    console.log('✅ Token obtenu\n');

    console.log('📡 Récupération de la liste des yachts...');
    const vessels = await getAllVessels(token);
    console.log(`✅ ${vessels.length} yachts trouvés\n`);

    console.log('📥 Récupération des détails...');
    const regions = new Set();
    const destinations = new Set();

    for (let i = 0; i < Math.min(vessels.length, 50); i++) {
      const details = await getVesselDetails(token, vessels[i]);
      if (details) {
        if (details.region) regions.add(details.region);
        if (details.destination) destinations.add(details.destination);
        if (details.destinations && Array.isArray(details.destinations)) {
          details.destinations.forEach(d => destinations.add(d));
        }
      }
      if ((i + 1) % 10 === 0) console.log(`  Traité ${i + 1}/${Math.min(vessels.length, 50)}`);
    }

    console.log('\n📊 RÉGIONS UNIQUES TROUVÉES:');
    console.log('='.repeat(50));
    Array.from(regions).sort().forEach(r => console.log(`  - ${r}`));

    console.log('\n📍 DESTINATIONS UNIQUES TROUVÉES:');
    console.log('='.repeat(50));
    Array.from(destinations).sort().forEach(d => console.log(`  - ${d}`));

    console.log('\n✅ Terminé!');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
})();
