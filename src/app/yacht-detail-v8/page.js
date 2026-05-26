// yacht-detail-v8 : v7 + hero object-cover, cabin layout en cards compactes
// empilées (triées par prestige), Pricing remplacé par "Regions and Rates"
// affichant pricing.pricingInfo[] (1 card par saison avec zones, dates,
// breakdown collapsible des line items).

import { getSelectionYachtFullByName, getTestYachts } from '@/lib/db';
import YachtDetailClient from './YachtDetailClient';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  try {
    const params = await searchParams;
    const targetName = params?.name || 'Coral Ocean';
    const yacht = await getSelectionYachtFullByName(targetName);
    const all = await getTestYachts();
    const similar = all.filter((y) => y.id !== yacht?.id).slice(0, 5);
    return <YachtDetailClient yacht={yacht} similar={similar} />;
  } catch (error) {
    console.error('yacht-detail-v8 error:', error);
    return <YachtDetailClient yacht={null} similar={[]} />;
  }
}
