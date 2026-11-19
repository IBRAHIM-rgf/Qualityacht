// /charters/destinations/arctic/<region> — une page par case Arctic (client 2026-11-19),
// meme modele que les cases Indian Ocean (SubregionClient). Pas de bateaux pour
// l'instant (choix du client) : liste vide.

import { notFound } from 'next/navigation';
import SubregionClient from '../../carabbean/_shared/SubregionClient';
import { ARCTIC_GROUPS, ARCTIC_CARD_PHOTO } from '../arcticGroups';

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
  return (
    <SubregionClient
      name={g.name}
      heroImage={g.photo || ARCTIC_CARD_PHOTO}
      heroImageOriginal={g.photo || ARCTIC_CARD_PHOTO}
      topIslands={g.places}
      fleetTitle="Yachts in the Arctic"
      hideCaribbeanDestination
      guideArticle=""
      titleLgClass={g.name.length > 20 ? 'lg:text-5xl' : 'lg:text-7xl'}
      initialData={[]}
      totalYachts={0}
    />
  );
}
