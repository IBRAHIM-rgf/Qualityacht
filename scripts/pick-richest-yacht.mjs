// Trouve le yacht avec le plus de champs Ankor remplis
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL);

const rows = await sql`
  SELECT
    yacht_name,
    yacht_id,
    -- score : nombre de champs critiques renseignés
    (CASE WHEN full_data->>'description' IS NOT NULL AND LENGTH(full_data->>'description') > 100 THEN 1 ELSE 0 END
     + CASE WHEN full_data->'blueprint'->>'bathrooms' IS NOT NULL THEN 1 ELSE 0 END
     + CASE WHEN full_data->'blueprint'->>'hullType' IS NOT NULL AND full_data->'blueprint'->>'hullType' != '' THEN 1 ELSE 0 END
     + CASE WHEN full_data->'blueprint'->>'decks' IS NOT NULL AND full_data->'blueprint'->>'decks' != '' THEN 1 ELSE 0 END
     + CASE WHEN full_data->'blueprint'->>'tonnage' ~ '^[0-9]+(\.[0-9]+)?$' AND (full_data->'blueprint'->>'tonnage')::numeric > 0 THEN 1 ELSE 0 END
     + CASE WHEN full_data->'blueprint'->>'architect' IS NOT NULL AND full_data->'blueprint'->>'architect' != '' THEN 1 ELSE 0 END
     + CASE WHEN full_data->'blueprint'->>'interiorDesigner' IS NOT NULL AND full_data->'blueprint'->>'interiorDesigner' != '' THEN 1 ELSE 0 END
     + CASE WHEN full_data->'blueprint'->>'cruisingCapacity' ~ '^[0-9]+(\.[0-9]+)?$' AND (full_data->'blueprint'->>'cruisingCapacity')::numeric > 0 THEN 1 ELSE 0 END
     + CASE WHEN full_data->'blueprint'->>'fuelCapacity' ~ '^[0-9]+(\.[0-9]+)?$' AND (full_data->'blueprint'->>'fuelCapacity')::numeric > 0 THEN 1 ELSE 0 END
     + CASE WHEN full_data->'blueprint'->'basePort'->'coordinates' IS NOT NULL THEN 1 ELSE 0 END
    ) as completeness_score,
    jsonb_array_length(COALESCE(full_data->'blueprint'->'images', '[]'::jsonb)) as images,
    jsonb_array_length(COALESCE(full_data->'blueprint'->'amenities', '[]'::jsonb)) as amenities,
    jsonb_array_length(COALESCE(full_data->'blueprint'->'toys', '[]'::jsonb)) as toys,
    jsonb_array_length(COALESCE(full_data->'blueprint'->'entertainment', '[]'::jsonb)) as entertainment,
    jsonb_array_length(COALESCE(full_data->'blueprint'->'tenders', '[]'::jsonb)) as tenders,
    jsonb_array_length(COALESCE(full_data->'crew', '[]'::jsonb)) as crew,
    jsonb_array_length(COALESCE(full_data->'pricing'->'pricingInfo', '[]'::jsonb)) as seasons,
    (SELECT COUNT(*) FROM jsonb_array_elements(COALESCE(full_data->'crew', '[]'::jsonb)) c WHERE c->>'bio' IS NOT NULL) as crew_with_bio
  FROM yacht_selections
  WHERE full_data IS NOT NULL
  ORDER BY
    completeness_score DESC,
    images DESC,
    crew DESC,
    seasons DESC
  LIMIT 15
`;

console.log('Top 15 yachts par complétude:\n');
console.log('Score | Name                              | Img | Am | Toy | Ent | Ten | Crew (bio) | Seasons');
console.log('------|-----------------------------------|-----|----|----|-----|-----|------------|--------');
for (const r of rows) {
  console.log(
    `${String(r.completeness_score).padStart(5)} | ${r.yacht_name.padEnd(33)} | ${String(r.images).padStart(3)} | ${String(r.amenities).padStart(2)} | ${String(r.toys).padStart(3)} | ${String(r.entertainment).padStart(3)} | ${String(r.tenders).padStart(3)} | ${String(r.crew).padStart(3)} (${String(r.crew_with_bio).padStart(2)}) | ${String(r.seasons).padStart(3)}`
  );
}
