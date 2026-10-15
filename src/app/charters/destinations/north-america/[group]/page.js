// /charters/destinations/north-america/<region> — une page par case North America
// (client 2026-10-15), meme modele que les pages des cases Bahamas (SubregionClient),
// mais avec les bateaux de la sous-region (admin : « Amerique du Nord » + la sous-region).

import { notFound } from 'next/navigation';
import SubregionClient from '../../carabbean/_shared/SubregionClient';
import { NA_GROUPS, NA_CARD_PHOTO } from '../northAmericaGroups';
import { fetchVisibleYachtsForSubRegion } from '@/lib/yachts';

export const dynamic = 'force-dynamic';

const findGroup = (slug) => NA_GROUPS.find((g) => g.slug === slug) || null;

export async function generateMetadata({ params }) {
  const { group: slug } = await params;
  const g = findGroup(slug);
  return g ? { title: `${g.name} — North America Yacht Charter | Qualityacht` } : {};
}

export default async function NorthAmericaRegionPage({ params }) {
  const { group: slug } = await params;
  const g = findGroup(slug);
  if (!g) notFound();
  const config = {
    name: g.name,
    heroImage: NA_CARD_PHOTO,
    heroImageOriginal: NA_CARD_PHOTO,
    topIslands: g.places,
    fleetTitle: 'Yachts in North America',
    hideCaribbeanDestination: true,
    guideArticle: g.name.startsWith('East') || g.name.startsWith('West') ? 'the' : '',
    titleLgClass: g.name.length > 20 ? 'lg:text-5xl' : 'lg:text-7xl',
  };
  try {
    const { yachts, totalYachts } = await fetchVisibleYachtsForSubRegion('north-america', g.key);
    return <SubregionClient {...config} initialData={yachts} totalYachts={totalYachts} />;
  } catch (error) {
    console.error('North America region page error:', error);
    return <SubregionClient {...config} initialData={[]} totalYachts={0} />;
  }
}
