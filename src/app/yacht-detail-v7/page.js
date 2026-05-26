// yacht-detail-v7 : design v5 (nom à gauche, From sous nom, base port compacte,
// dots losanges petits espacés, description avec saut de ligne) + données enrichies v6
// (Ankor full_data via getSelectionYachtFullByName) + 4 zones de texte collapsibles.

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
    console.error('yacht-detail-v7 error:', error);
    return <YachtDetailClient yacht={null} similar={[]} />;
  }
}
