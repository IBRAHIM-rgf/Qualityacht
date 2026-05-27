// yacht-detail-v11 : v10 + phrase sous le prix hero indiquant la possibilité
// de réserver par cabine (en plus du whole-boat charter).

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
    console.error('yacht-detail-v11 error:', error);
    return <YachtDetailClient yacht={null} similar={[]} />;
  }
}
