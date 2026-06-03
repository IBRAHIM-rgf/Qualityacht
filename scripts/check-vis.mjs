import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL);

const stats = await sql`
  SELECT
    COUNT(*) FILTER (WHERE region='caribbean') as total_caribbean,
    COUNT(*) FILTER (WHERE region='caribbean' AND is_visible=true) as visible_caribbean,
    COUNT(*) FILTER (WHERE region='caribbean' AND is_visible=false) as hidden_caribbean,
    COUNT(*) as total_bdd
  FROM yacht_selections
`;
console.log(stats[0]);

const visible = await sql`SELECT yacht_name FROM yacht_selections WHERE region='caribbean' AND is_visible=true ORDER BY yacht_name`;
console.log(`\nVisibles (${visible.length}) :`);
for (const r of visible) console.log(`  ${r.yacht_name}`);
