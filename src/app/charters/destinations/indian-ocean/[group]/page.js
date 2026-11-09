// /charters/destinations/indian-ocean/<region> — une page par case Indian Ocean
// (client 2026-11-09), meme modele que les cases North America (SubregionClient), avec
// les bateaux de la sous-region (admin : « Ocean Indien » + la sous-region).

import { notFound } from 'next/navigation';
import SubregionClient from '../../carabbean/_shared/SubregionClient';
import { IO_GROUPS, IO_CARD_PHOTO } from '../indianOceanGroups';
import { fetchVisibleYachtsForSubRegion } from '@/lib/yachts';

export const dynamic = 'force-dynamic';

const findGroup = (slug) => IO_GROUPS.find((g) => g.slug === slug) || null;

export async function generateMetadata({ params }) {
  const { group: slug } = await params;
  const g = findGroup(slug);
  return g ? {
    title: `${g.name} — Indian Ocean Yacht Charter | Qualityacht`,
    description: `Private yacht charters in ${g.name}, Indian Ocean. Browse the yachts available and request a quote for your dates.`,
  } : {};
}

export default async function IndianOceanRegionPage({ params }) {
  const { group: slug } = await params;
  const g = findGroup(slug);
  if (!g) notFound();
  const config = {
    name: g.name,
    heroImage: g.photo || IO_CARD_PHOTO,
    heroImageOriginal: g.photo || IO_CARD_PHOTO,
    topIslands: g.places,
    fleetTitle: 'Yachts in the Indian Ocean',
    hideCaribbeanDestination: true,
    guideArticle: g.name === 'Maldives' || g.name === 'Seychelles' || g.name === 'Mascarene Islands' ? 'the' : '',
    titleLgClass: g.name.length > 20 ? 'lg:text-5xl' : 'lg:text-7xl',
  };
  try {
    const { yachts, totalYachts } = await fetchVisibleYachtsForSubRegion('indian-ocean', g.key);
    return <SubregionClient {...config} initialData={yachts} totalYachts={totalYachts} />;
  } catch (error) {
    console.error('Indian Ocean region page error:', error);
    return <SubregionClient {...config} initialData={[]} totalYachts={0} />;
  }
}
