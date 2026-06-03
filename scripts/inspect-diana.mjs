import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL);

const rows = await sql`
  SELECT yacht_name, full_data->'pricing' as pricing
  FROM yacht_selections
  WHERE yacht_name ILIKE '%DIANA%'
  LIMIT 1
`;

if (!rows[0]) { console.log('SH DIANA pas trouvé'); process.exit(); }
const p = rows[0].pricing;
console.log(`\n${rows[0].yacht_name}\n`);
console.log(`Pricing top keys: ${Object.keys(p).join(', ')}`);
console.log(`weekPricingFrom: ${JSON.stringify(p.weekPricingFrom)}`);
console.log(`weekPricingTo: ${JSON.stringify(p.weekPricingTo)}\n`);

const infos = p.pricingInfo || [];
console.log(`${infos.length} saisons\n`);

for (const s of infos) {
  const total = (s.pricing?.total || 0) / 100;
  const charter = (s.pricing?.charterFee || 0) / 100;
  const cur = s.pricing?.currency || '';
  console.log(`### ${s.name}`);
  console.log(`   Unit: ${s.pricing?.unit} | Currency: ${cur} | Tax mode: ${s.pricing?.inputAmountTaxed}`);
  console.log(`   Total: ${total} ${cur} | Charter Fee: ${charter} ${cur}`);
  console.log(`   Line items (${(s.pricing?.lineItems || []).length}):`);
  for (const li of (s.pricing?.lineItems || [])) {
    console.log(`     - ${li.item} | amount=${(li.amount || 0) / 100} | qty=${li.quantity} | unitPrice=${(li.unitPrice || 0) / 100} | conditions="${li.conditions || ''}"`);
  }
  console.log();
}
