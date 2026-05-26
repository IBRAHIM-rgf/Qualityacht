import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL);

const stats = await sql`
  SELECT
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE full_data IS NOT NULL) as with_full_data,
    pg_size_pretty(pg_total_relation_size('yacht_selections')) as table_size
  FROM yacht_selections
`;
console.log('Stats:', stats[0]);

const sample = await sql`
  SELECT yacht_name,
    full_data->'description' IS NOT NULL as has_desc,
    jsonb_array_length(COALESCE(full_data->'blueprint'->'images', '[]'::jsonb)) as nb_images,
    jsonb_array_length(COALESCE(full_data->'blueprint'->'toys', '[]'::jsonb)) as nb_toys,
    jsonb_array_length(COALESCE(full_data->'crew', '[]'::jsonb)) as nb_crew
  FROM yacht_selections
  WHERE region = 'caribbean'
  ORDER BY display_order
  LIMIT 5
`;
console.log('Sample yachts:');
for (const r of sample) console.log(`  ${r.yacht_name}: desc=${r.has_desc}, images=${r.nb_images}, toys=${r.nb_toys}, crew=${r.nb_crew}`);
