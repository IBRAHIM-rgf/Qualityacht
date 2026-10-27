// Pages ouvertes par les 8 cases des pages de parcours (client 2026-10-04) :
// /charters/day-charter/bahamas/<groupe>, /charters/last-minute/bahamas/<groupe>,
// /charters/last-minute/caribbean/<sous-region>, /charters/only-couple/carribbean/<sous-region>,
// /charters/only-couple/bahamas/<groupe>. Meme modele que les pages des iles Bahamas
// (SubregionClient) ; bateaux = categorie du parcours + sous-region de la case (admin).

import { notFound } from 'next/navigation';
import SubregionClient from '../destinations/carabbean/_shared/SubregionClient';
import { GROUPS, CARDS, groupSlug } from '../destinations/bahamas/bahamasGroups';
import { CARIBBEAN_SUBREGIONS } from './caribbeanSubregions';
import { NA_GROUPS, NA_CARD_PHOTO } from '../destinations/north-america/northAmericaGroups';
import { getCategoryYachts } from '@/lib/categoryYachts';

function findBahamas(slug) {
  const index = GROUPS.findIndex((g) => groupSlug(g.name) === slug);
  if (index === -1) return null;
  const g = GROUPS[index];
  const n = index + 1;
  return {
    region: 'bahamas',
    key: g.key,
    name: g.name,
    heroImage: `${CARDS}/card-${n}-filtered.jpg`,
    heroImageOriginal: `${CARDS}/card-${n}-color.jpg`,
    topIslands: g.islands.map(([name]) => name),
    fleetTitle: 'Yachts in the Bahamas',
  };
}

function findCaribbean(slug) {
  const s = CARIBBEAN_SUBREGIONS.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    region: 'caribbean',
    key: s.key,
    name: s.name,
    heroImage: s.image,
    heroImageOriginal: s.imageOld,
    topIslands: s.islands,
    fleetTitle: 'Yachts in the Caribbean',
  };
}

// Cases North America (client 2026-10-27) : /charters/day-charter/north-america/<region>.
function findNorthAmerica(slug) {
  const g = NA_GROUPS.find((x) => x.slug === slug);
  if (!g) return null;
  return {
    region: 'north-america',
    key: g.key,
    name: g.name,
    heroImage: g.photo || NA_CARD_PHOTO,
    heroImageOriginal: g.photo || NA_CARD_PHOTO,
    topIslands: g.places,
    fleetTitle: 'Yachts in North America',
    hideCaribbeanDestination: true,
    guideArticle: g.name.startsWith('East') || g.name.startsWith('West') ? 'the' : '',
  };
}

function findCase(region, slug) {
  if (region === 'north-america') return findNorthAmerica(slug);
  return region === 'bahamas' ? findBahamas(slug) : findCaribbean(slug);
}

/** Titre d'onglet : « <case> — <parcours> | Qualityacht ». */
export function caseMetadata(region, slug, label) {
  const c = findCase(region, slug);
  return c ? { title: `${c.name} — ${label} | Qualityacht` } : {};
}

/** Page d'une case : category = cle de categorie admin, dayCharter = case Day Charter. */
export async function CaseYachtsPage({ region, slug, category = null, dayCharter = false }) {
  const c = findCase(region, slug);
  if (!c) notFound();
  const { region: r, key, ...rest } = c;
  const config = {
    ...rest,
    titleLgClass: c.name.length > 20 ? 'lg:text-5xl' : 'lg:text-7xl',
  };
  const yachts = await getCategoryYachts({ region: r, subRegion: key, category, dayCharter });
  return <SubregionClient {...config} initialData={yachts} totalYachts={yachts.length} />;
}

/** Flotte d'une categorie sur toute une region (boutons « Explore the ... Fleet » des pages Sports). */
export async function CategoryFleetPage({ region, category, name, heroImage, topIslands = [], fleetTitle }) {
  const yachts = await getCategoryYachts({ region, category });
  return (
    <SubregionClient
      name={name}
      heroImage={heroImage}
      heroImageOriginal={heroImage}
      topIslands={topIslands}
      fleetTitle={fleetTitle}
      titleLgClass={name.length > 20 ? 'lg:text-5xl' : 'lg:text-7xl'}
      initialData={yachts}
      totalYachts={yachts.length}
    />
  );
}
