// yacht-detail-v6 : fiche enrichie avec TOUTES les infos Ankor.
// Lit full_data depuis yacht_selections (source de vérité prod, rempli par
// l'import-region admin). Yacht ciblé : ?name=… (defaut: Coral Ocean).

import { getSelectionYachtFullByName, getTestYachts } from '@/lib/db';
import YachtDetailClient from './YachtDetailClient';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  try {
    const params = await searchParams;
    const targetName = params?.name || 'Coral Ocean';
    const yacht = await getSelectionYachtFullByName(targetName);
    // "Similar" : on continue à piocher dans test_yachts (5 yachts les plus riches en images)
    const all = await getTestYachts();
    const similar = all.filter(y => y.id !== yacht?.id).slice(0, 5);
    return <YachtDetailClient yacht={yacht} similar={similar} />;
  } catch (error) {
    console.error('yacht-detail-v6 error:', error);
    return <YachtDetailClient yacht={null} similar={[]} />;
  }
}
