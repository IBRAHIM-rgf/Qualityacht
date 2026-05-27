// yacht-detail-v10 : v9 + card Enquire compact (px-2 py-0.5), labels Summer/Winter
// affichés uniquement quand les 2 groupes existent (sinon liste à plat), et
// regroupement par tranches de guests : les saisons type "X Pax" / "X Guests" /
// "(N guests)" sont fusionnées en une seule card avec mini-tableau Guests | Price | Δ.

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
    console.error('yacht-detail-v10 error:', error);
    return <YachtDetailClient yacht={null} similar={[]} />;
  }
}
