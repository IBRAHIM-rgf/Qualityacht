// Test simple des destinations Ankor
import { searchAnkorVessels } from './src/lib/utils.js';

const destinationsToTest = [
  { value: 'nice', label: 'Nice (ville)' },
  { value: 'monaco', label: 'Monaco' },
  { value: 'france', label: 'France' },
  { value: 'west-mediterranean', label: 'West Mediterranean' },
  { value: 'east-mediterranean', label: 'East Mediterranean' },
  { value: 'caribbean', label: 'Caribbean' },
  { value: 'bahamas', label: 'Bahamas' },
  { value: 'arctic', label: 'Arctic' },
  { value: 'indian-ocean', label: 'Indian Ocean' },
  { value: 'pacific-ocean', label: 'Pacific Ocean' },
  { value: 'indonesia', label: 'Indonesia' },
  { value: 'africa', label: 'Africa' },
  { value: 'oceania', label: 'Oceania' },
  { value: 'south-east-asia', label: 'South East Asia' },
  { value: 'north-america', label: 'North America' },
];

console.log('🧪 Test des destinations disponibles dans l\'API Ankor\n');

for (const dest of destinationsToTest) {
  console.log(`📍 Test: ${dest.label} (${dest.value})`);

  try {
    const result = await searchAnkorVessels({ destination: dest.value });
    const count = result.yachts?.length || 0;

    if (count > 0) {
      console.log(`   ✅ ${count} yacht(s) trouvé(s)`);
      if (count <= 3) {
        console.log(`   Yachts: ${result.yachts.map(y => y.name).join(', ')}`);
      } else {
        console.log(`   Exemples: ${result.yachts.slice(0, 3).map(y => y.name).join(', ')}`);
      }
    } else {
      console.log(`   ⚠️  Aucun yacht trouvé`);
    }
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
  }
  console.log('');
}
