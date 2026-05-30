import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL);

const rows = await sql`
  SELECT yacht_name, full_data->'crew' as crew
  FROM yacht_selections WHERE yacht_name = 'CORAL OCEAN' LIMIT 1
`;
if (!rows[0]) { console.log('no'); process.exit(); }
const crew = rows[0].crew || [];
console.log(`Coral Ocean: ${crew.length} crew\n`);

const roles = {};
for (const c of crew) {
  const r = c.role || '(null)';
  roles[r] = (roles[r] || 0) + 1;
}
console.log('Roles distribution:');
for (const [r, n] of Object.entries(roles)) console.log(`  ${n.toString().padStart(3)} x ${r}`);

console.log('\nFirst 5 crew members (raw keys):');
for (const c of crew.slice(0, 5)) {
  console.log(`  name=${c.name} role=${c.role} bio=${(c.bio||'').slice(0,40).replace(/\n/g, ' ')}...`);
  console.log(`    keys=${Object.keys(c).join(',')}`);
}
