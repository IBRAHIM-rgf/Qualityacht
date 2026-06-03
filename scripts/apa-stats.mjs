import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL);

// Combien de yachts ont l'APA explicite dans au moins une saison vs ceux où c'est "Excluded" en condition ?
const rows = await sql`
  SELECT yacht_name,
    EXISTS (
      SELECT 1 FROM jsonb_array_elements(COALESCE(full_data->'pricing'->'pricingInfo', '[]'::jsonb)) AS s,
           LATERAL jsonb_array_elements(COALESCE(s->'pricing'->'lineItems', '[]'::jsonb)) AS li
      WHERE LOWER(li->>'item') LIKE '%apa%'
    ) AS has_apa_line,
    EXISTS (
      SELECT 1 FROM jsonb_array_elements(COALESCE(full_data->'pricing'->'pricingInfo', '[]'::jsonb)) AS s,
           LATERAL jsonb_array_elements(COALESCE(s->'pricing'->'lineItems', '[]'::jsonb)) AS li
      WHERE LOWER(li->>'conditions') LIKE '%apa%excluded%' OR LOWER(li->>'conditions') LIKE '%apa%excl%'
    ) AS apa_excluded_text
  FROM yacht_selections
  WHERE full_data IS NOT NULL
`;

const withApa = rows.filter(r => r.has_apa_line).length;
const apaExcluded = rows.filter(r => r.apa_excluded_text && !r.has_apa_line).length;
const neither = rows.filter(r => !r.has_apa_line && !r.apa_excluded_text).length;

console.log(`Total yachts : ${rows.length}`);
console.log(`  APA listée dans lineItems : ${withApa}`);
console.log(`  APA absente mais mentionnée "Excluded" en conditions : ${apaExcluded}`);
console.log(`  Aucune mention APA : ${neither}`);
