// /charters/destinations/arctic/<region> — une page par case Arctic (client 2026-11-19),
// meme modele que les cases Indian Ocean (SubregionClient), avec les bateaux publies de
// la sous-region (admin : « Arctique » + la sous-region), client 2026-11-20.

import { notFound } from 'next/navigation';
import SubregionClient from '../../carabbean/_shared/SubregionClient';
import { ARCTIC_GROUPS, ARCTIC_CARD_PHOTO } from '../arcticGroups';
import { fetchVisibleYachtsForSubRegion } from '@/lib/yachts';

export const dynamic = 'force-dynamic';

const findGroup = (slug) => ARCTIC_GROUPS.find((g) => g.slug === slug) || null;

export async function generateMetadata({ params }) {
  const { group: slug } = await params;
  const g = findGroup(slug);
  return g ? {
    title: `${g.name} — Arctic Yacht Charter | Qualityacht`,
    description: `Private yacht charters in ${g.name}, Arctic. Browse the yachts available and request a quote for your dates.`,
  } : {};
}

export default async function ArcticRegionPage({ params }) {
  const { group: slug } = await params;
  const g = findGroup(slug);
  if (!g) notFound();
  const config = {
    name: g.name,
    heroImage: g.photo || ARCTIC_CARD_PHOTO,
    heroImageOriginal: g.photo || ARCTIC_CARD_PHOTO,
    topIslands: g.places,
    fleetTitle: 'Yachts in the Arctic',
    hideCaribbeanDestination: true,
    guideArticle: '',
    titleLgClass: g.name.length > 20 ? 'lg:text-5xl' : 'lg:text-7xl',
  };
  try {
    const { yachts, totalYachts } = await fetchVisibleYachtsForSubRegion('arctic', g.key);
    return <SubregionClient {...config} initialData={yachts} totalYachts={totalYachts} />;
  } catch (error) {
    console.error('Arctic region page error:', error);
    return <SubregionClient {...config} initialData={[]} totalYachts={0} />;
  }
}
