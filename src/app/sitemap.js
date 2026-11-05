// /sitemap.xml — SEO etape 1 (client 2026-11-01).
// Pages publiques du site + pages des cases (Caraibes, Bahamas, North America), silo Halal
// et types Only for You. Exclues : admin, pages de test et anciennes versions (-v1, -v2…),
// anciennes adresses /charters/halal et /charters/destinations/caribbean (redirections).
// Fiches bateaux publiees ajoutees depuis la base.
import { CARIBBEAN_SUBREGIONS } from './charters/_shared/caribbeanSubregions';
import { GROUPS, groupSlug } from './charters/destinations/bahamas/bahamasGroups';
import { NA_GROUPS } from './charters/destinations/north-america/northAmericaGroups';
import { SILO } from './halal-yacht-charter/_silo/content';
import { sailingTypes } from './only-for-you/data';
import { ARTICLES } from './journal/articles';
import { getYachtSelections } from '@/lib/db';

// Regenere au plus une fois par heure (fiches des bateaux publies).
export const revalidate = 3600;

const BASE = 'https://www.qualityacht.ch';

// Vraies pages du site sous un nom de version (liens du menu, des cartes, des fiches) :
// gardees dans le sitemap (client 2026-11-01).
const LIVE_VERSION_ROUTES = [
  '/charters/destinations/caribbean-v15',
  '/charters/destinations/caribbean-v15/exploreyacht',
  ...['greater-antilles', 'leeward-islands', 'leeward-antilles', 'windward-islands', 'turks-caicos', 'trinidad-tobago', 'grand-cayman', 'emerging-destinations']
    .map((s) => `/charters/destinations/carabbean/${s}-v11`),
  '/request-quote-test-v10',
];

const STATIC_ROUTES = [
  '/',
  '/airport',
  '/art-culture',
  '/art-culture/bahamas',
  '/art-culture/caribbean',
  '/art-culture/north-america',
  '/charter-costs-explained',
  '/charters',
  '/charters/accessible',
  '/charters/accessible/bahamas',
  '/charters/accessible/bahamas/yacht',
  '/charters/accessible/caribbean',
  '/charters/accessible/caribbean/yacht',
  '/charters/accessible/north-america',
  '/charters/accessible/north-america/yacht',
  '/charters/carribbean',
  '/charters/day-charter',
  '/charters/day-charter/bahamas',
  '/charters/day-charter/caribbean',
  '/charters/day-charter/north-america',
  '/charters/destinations',
  '/charters/destinations/africa',
  '/charters/destinations/antarctica',
  '/charters/destinations/arctic',
  '/charters/destinations/arctic-northern-europe',
  '/charters/destinations/bahamas',
  '/charters/destinations/central-america',
  '/charters/destinations/east-asia',
  '/charters/destinations/eastern-mediterranean',
  '/charters/destinations/greater-antilles',
  '/charters/destinations/indian-ocean',
  '/charters/destinations/indonesia',
  '/charters/destinations/north-america',
  '/charters/destinations/oceania',
  '/charters/destinations/oman-gulf',
  '/charters/destinations/pacific-ocean',
  '/charters/destinations/south-east-asia',
  '/charters/destinations/western-mediterranean',
  '/charters/group',
  '/charters/group/bahamas',
  '/charters/group/carribbean',
  '/charters/last-minute',
  '/charters/last-minute/bahamas',
  '/charters/last-minute/caribbean',
  '/charters/on-demand',
  '/charters/only-couple',
  '/charters/only-couple/bahamas',
  '/charters/only-couple/carribbean',
  '/charters/pet-friendly',
  '/charters/pet-friendly/bahamas',
  '/charters/pet-friendly/carribbean',
  '/charters/sports',
  '/charters/sports/bahamas',
  '/charters/sports/bahamas/fleet',
  '/charters/sports/carribbean',
  '/charters/sports/carribbean/fleet',
  '/choices',
  '/conciergery',
  '/contact',
  '/events',
  '/events/bahamas',
  '/events/caribbean',
  '/events/north-america',
  '/fine-food-dining',
  '/fine-food-dining/caribbean',
  '/halal-yacht-charter',
  '/halal-yacht-charter/bahamas',
  '/halal-yacht-charter/caribbean',
  '/halal-yacht-charter/faq',
  '/halal-yacht-charter/usa',
  '/historic-sites',
  '/historic-sites/bahamas',
  '/historic-sites/bahamas/cycling',
  '/historic-sites/bahamas/hiking',
  '/historic-sites/bahamas/monuments',
  '/historic-sites/caribbean',
  '/historic-sites/north-america',
  '/historic-sites/north-america/cycling',
  '/historic-sites/north-america/hiking',
  '/historic-sites/north-america/monuments',
  '/horses-riding',
  '/horses-riding/bahamas',
  '/horses-riding/caribbean',
  '/horses-riding/north-america',
  '/hotel-palace',
  '/hotel-palace/caribbean',
  '/international-real-estate',
  '/invest-with-impact',
  '/luxury-cars-racing',
  '/luxury-living',
  '/management',
  '/onboard-residence-technology',
  '/only-for-you',
  '/only-for-you/caribbean',
  '/partners',
  '/privacy-policy',
  '/privat-jet',
  '/real-estate',
  '/real-estate/monaco',
  '/request-quote',
  '/sales',
  '/sales/enquiry',
  '/sales/motor',
  '/sales/sailing',
  '/sales/toys',
  '/sport-fishing',
  '/water-toys',
  '/wellness-care',
  '/yachts',
];

export default async function sitemap() {
  // Fiches des bateaux publies : /yacht-detail-v11?name=<nom>. Base indisponible = sans fiches.
  let yachtPages = [];
  try {
    const rows = await getYachtSelections();
    yachtPages = (rows || []).filter((r) => r.is_visible && r.yacht_name)
      .map((r) => `/yacht-detail-v11?name=${encodeURIComponent(r.yacht_name)}`);
  } catch {
    yachtPages = [];
  }
  const caribbean = CARIBBEAN_SUBREGIONS.map((s) => s.slug);
  const bahamas = GROUPS.map((g) => groupSlug(g.name));
  const northAmerica = NA_GROUPS.map((g) => g.slug);
  const routes = [
    ...STATIC_ROUTES,
    ...LIVE_VERSION_ROUTES,
    ...['last-minute/caribbean', 'only-couple/carribbean', 'group/carribbean'].flatMap((p) => caribbean.map((s) => `/charters/${p}/${s}`)),
    ...['destinations/bahamas', 'day-charter/bahamas', 'last-minute/bahamas', 'only-couple/bahamas', 'group/bahamas'].flatMap((p) => bahamas.map((s) => `/charters/${p}/${s}`)),
    ...['destinations/north-america', 'day-charter/north-america'].flatMap((p) => northAmerica.map((s) => `/charters/${p}/${s}`)),
    ...Object.keys(SILO).map((s) => `/halal-yacht-charter/${s}`),
    // Journal (client 2026-11-05)
    '/journal',
    ...ARTICLES.map((a) => `/journal/${a.slug}`),
    ...sailingTypes.flatMap((t) => [`/only-for-you/${t.slug}`, `/only-for-you/${t.slug}/carribbean`, `/only-for-you/${t.slug}/bahamas`]),
    ...yachtPages,
  ];
  const now = new Date();
  return [...new Set(routes)].map((path) => ({
    url: `${BASE}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : path.split('/').length <= 2 ? 0.8 : 0.6,
  }));
}
