// yacht-detail-v9 : v8 + Regions and Rates regroupé par unité Ankor
// (Weekly Charter / Daily Charter / Hourly Rates). Au sein de Weekly,
// sous-regroupement Summer / Winter conservé. Cards simplifiées :
// price breakdown et effective periods retirés.

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
    console.error('yacht-detail-v9 error:', error);
    return <YachtDetailClient yacht={null} similar={[]} />;
  }
}
