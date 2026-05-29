// Affiche un résumé propre du pricing pour un yacht
// Usage: node scripts/show-pricing.mjs [nom yacht]

import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL);

const target = process.argv[2] || 'CORAL OCEAN';

const rows = await sql`
  SELECT yacht_name, full_data->'pricing' as pricing
  FROM yacht_selections
  WHERE yacht_name ILIKE ${'%' + target + '%'}
  LIMIT 1
`;
if (!rows[0]) { console.log('Pas en BDD'); process.exit(0); }
console.log(`\nYacht: ${rows[0].yacht_name}\n`);

const infos = rows[0].pricing?.pricingInfo || [];
console.log(`Tarifs saisonniers: ${infos.length}\n`);

for (const p of infos) {
  const total = (p.pricing?.total || 0) / 100;
  const charter = (p.pricing?.charterFee || 0) / 100;
  const cur = p.pricing?.currency || '';
  const unit = p.pricing?.unit || '';
  const zones = (p.inclusionZones || []).map(z => z.label).join(', ');
  const dates = (p.effectiveDates || []).slice(0, 4).map(d => `${(d.from || '').slice(0,10)} - ${(d.to || '').slice(0,10)}`).join(' | ');

  console.log(`### ${p.name} (${unit})`);
  console.log(`  Total:        ${total.toLocaleString('fr-FR')} ${cur}`);
  console.log(`  Charter fee:  ${charter.toLocaleString('fr-FR')} ${cur}`);
  console.log(`  Zones:        ${zones || '-'}`);
  console.log(`  Periodes:     ${dates || '-'}`);
  console.log(`  Pets:         ${p.petsAllowed ? 'yes' : 'no'}`);
  console.log();
}

// Stats : combien de yachts ont N tarifs saisonniers ?
console.log('\n--- Stats globales ---');
const stats = await sql`
  SELECT
    COUNT(*) FILTER (WHERE full_data->'pricing'->'pricingInfo' IS NOT NULL) as with_pricing,
    AVG(jsonb_array_length(full_data->'pricing'->'pricingInfo'))::numeric(4,1) as avg_seasons,
    MIN(jsonb_array_length(full_data->'pricing'->'pricingInfo')) as min_seasons,
    MAX(jsonb_array_length(full_data->'pricing'->'pricingInfo')) as max_seasons
  FROM yacht_selections
  WHERE full_data IS NOT NULL
`;
console.log(stats[0]);

// Échantillon de noms de saisons trouvés
const seasonNames = await sql`
  SELECT DISTINCT p->>'name' as season, COUNT(*) as nb
  FROM yacht_selections,
       LATERAL jsonb_array_elements(full_data->'pricing'->'pricingInfo') AS p
  WHERE full_data->'pricing'->'pricingInfo' IS NOT NULL
  GROUP BY p->>'name'
  ORDER BY nb DESC
  LIMIT 30
`;
console.log('\n--- Top 30 noms de saisons ---');
for (const s of seasonNames) console.log(`  ${String(s.nb).padStart(4)} x  ${s.season}`);
