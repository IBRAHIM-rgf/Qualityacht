// yacht-detail-v6 : fiche enrichie avec TOUTES les infos Ankor pour CORAL OCEAN
// Lit full_data depuis test_yachts (seedé via scripts/seed-coral-ocean.mjs)

import { getTestYachtFullByName, getTestYachts } from '@/lib/db';
import YachtDetailClient from './YachtDetailClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    const yacht = await getTestYachtFullByName('Coral Ocean');
    const all = await getTestYachts();
    const similar = all.filter(y => y.id !== yacht?.id).slice(0, 5);
    return <YachtDetailClient yacht={yacht} similar={similar} />;
  } catch (error) {
    console.error('yacht-detail-v6 error:', error);
    return <YachtDetailClient yacht={null} similar={[]} />;
  }
}
