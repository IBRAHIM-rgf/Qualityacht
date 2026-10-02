// /charters/destinations/bahamas/<groupe> — une page par case « Bahamas Islands »
// (client 2026-10-02). Meme modele que les pages sous-regions Caraibes
// (SubregionClient) : hero avec la photo de la case, iles du groupe, texte, filtres
// et bateaux selectionnes pour les Bahamas dans l'admin.
// Textes de presentation : fournis par le client plus tard (TEXTS ci-dessous).

import { notFound } from 'next/navigation';
import SubregionClient from '../../carabbean/_shared/SubregionClient';
import { GROUPS, CARDS, groupSlug } from '../bahamasGroups';
import { fetchVisibleYachtsForSubRegion } from '@/lib/yachts';

export const dynamic = 'force-dynamic';

// Texte de chaque page, par slug : { subTitle, intro, extraParagraphs: [{ text }] }.
// Vide en attendant les textes du client.
const TEXTS = {};

function findGroup(slug) {
  const index = GROUPS.findIndex((g) => groupSlug(g.name) === slug);
  return index === -1 ? null : { group: GROUPS[index], index };
}

export async function generateMetadata({ params }) {
  const { group: slug } = await params;
  const found = findGroup(slug);
  if (!found) return {};
  return {
    title: `${found.group.name} — Bahamas Yacht Charter | Qualityacht`,
  };
}

export default async function BahamasGroupPage({ params }) {
  const { group: slug } = await params;
  const found = findGroup(slug);
  if (!found) notFound();
  const { group, index } = found;
  const n = index + 1;
  const config = {
    name: group.name,
    heroImage: `${CARDS}/card-${n}-filtered.jpg`,
    heroImageOriginal: `${CARDS}/card-${n}-color.jpg`,
    topIslands: group.islands.map(([name]) => name),
    ...(TEXTS[slug] || {}),
    fleetTitle: 'Yachts in the Bahamas',
    // Noms longs (ex. « Îles du Sud / Out Islands ») : titre un peu plus petit en grand ecran.
    titleLgClass: group.name.length > 20 ? 'lg:text-5xl' : 'lg:text-7xl',
  };
  try {
    // Bateaux selectionnes pour les Bahamas dans l'admin (toutes sous-regions).
    const { yachts, totalYachts } = await fetchVisibleYachtsForSubRegion('bahamas', null);
    return <SubregionClient {...config} initialData={yachts} totalYachts={totalYachts} />;
  } catch (error) {
    console.error('Bahamas group page error:', error);
    return <SubregionClient {...config} initialData={[]} totalYachts={0} />;
  }
}
