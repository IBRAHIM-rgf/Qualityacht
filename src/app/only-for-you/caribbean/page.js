// /only-for-you/caribbean — page Caraibes de tous les bateaux « Only for You »
// (client 2026-10-02). Ouverte par la case The Caribbean de chaque type
// (/only-for-you/<type>, ?type=<slug> pre-selectionne le filtre « Boat Class »).
// Logique commune a toutes les destinations : ../OnlyForYouRegionYachts.

import OnlyForYouRegionYachts from '../OnlyForYouRegionYachts';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Only for You — The Caribbean | Qualityacht',
};

const HERO_IMAGE = '/media/client/lydie/2026-09-10/only-for-you/hero-sailing-trimaran.jpg';

export default async function OnlyForYouCaribbeanPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const type = typeof sp.type === 'string' ? sp.type : '';
  return <OnlyForYouRegionYachts region="caribbean" name="Caribbean" heroImage={HERO_IMAGE} type={type} />;
}
