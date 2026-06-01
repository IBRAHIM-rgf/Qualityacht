// Vérifie ce que renvoie fetchVisibleYachtsForDestination('caribbean')
// (page /charters/destinations/caribbean-v15/exploreyacht et /charters/destinations/caribbean)
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL);

// 1) Combien de yachts en BDD ont region='caribbean' ET is_visible=true ?
const rows = await sql`
  SELECT yacht_name, ankor_region, region, is_visible
  FROM yacht_selections
  WHERE region = 'caribbean' AND is_visible = true
  ORDER BY yacht_name
`;
console.log(`BDD yacht_selections : ${rows.length} yachts visibles en caribbean`);
for (const r of rows) {
  const tag = r.ankor_region !== r.region ? ` ⚠️ ankor=${r.ankor_region}` : '';
  console.log(`  ${r.yacht_name}${tag}`);
}

console.log('\nDont overrides admin (ankor_region != region) :');
const overrides = rows.filter(r => r.ankor_region && r.ankor_region !== r.region);
for (const r of overrides) console.log(`  ${r.yacht_name} (Ankor: ${r.ankor_region})`);
console.log(`\n→ ${overrides.length} yacht(s) override(s) qui ne seront PAS retournés par fetchYachtsForDestination('caribbean')`);
