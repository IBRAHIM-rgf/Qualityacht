// Route dynamique regatta event : /charters/destinations/carabbean/regatta/<eventId>
// Affiche une page style SubregionClient (filtres + yachts) avec le nom de l'event
// en titre, et la sous-region (Greater Antilles, Leeward, etc.) correspondante.

import SubregionClient from '../../_shared/SubregionClient';
import { CARIBBEAN_SUBREGIONS } from '../../_shared/configs';
import { REGATTAS_2027, REGATTA_BOAT_GROUPS } from '../../../../../regattas-caribbean-shared/regattas-data';
import { fetchVisibleYachts } from '@/lib/yachts';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

// Toggles regatta : Women + Junior (au lieu de pet/water/couple)
const REGATTA_TOGGLES = [
  { key: 'groupFriendly', label: 'Group Friendly' },
  { key: 'womenFriendly', label: 'Women' },
  { key: 'juniorFriendly', label: 'Junior' },
];

// Override par event-id (alignement avec la card du listing /rentals/regatta/carribbean).
// Doit rester en sync avec EVENT_REGION_OVERRIDE du fichier rentals/[type]/carribbean/page.js
// pour que la photo de la card == photo de la page event.
const EVENT_REGION_OVERRIDE = {
  'stir':               'leeward-antilles',
  'bvi-spring-regatta': 'greater-antilles',
  'ior-st-thomas':      'greater-antilles',
  'mango-bowl':         'windward-islands',
};

// Mapping event island -> region SubregionClient
function getRegionSlugForEvent(event) {
  if (event && EVENT_REGION_OVERRIDE[event.id]) return EVENT_REGION_OVERRIDE[event.id];
  const island = event.island || '';
  if (/Barbados|Grenad|Martinique|Schoelcher|St\.? ?Vincent|Grenadines|St\.? ?Lucia/.test(island)) return 'windward-islands';
  if (/Sint Maarten|St\.? ?Maarten|Antigua|Saint-Barth|St\.? ?Barth|USVI|St\.? ?Thomas|BVI|Tortola/.test(island)) return 'leeward-islands';
  if (/Aruba|Bonaire|Cura/.test(island)) return 'leeward-antilles';
  if (/Turks|Caicos/.test(island)) return 'turks-caicos';
  if (/Trinidad|Tobago/.test(island)) return 'trinidad-tobago';
  if (/Cayman/.test(island)) return 'grand-cayman';
  if (/Cuba|Puerto Rico|Jamaica|Hispaniola/.test(island)) return 'greater-antilles';
  return 'emerging-destinations';
}

export default async function Page({ params }) {
  const { eventId } = await params;
  const event = REGATTAS_2027.find((r) => r.id === eventId);
  if (!event) notFound();

  const regionSlug = getRegionSlugForEvent(event);
  const baseConfig = CARIBBEAN_SUBREGIONS[regionSlug] || CARIBBEAN_SUBREGIONS['greater-antilles'];

  // Override le titre et l'intro avec le nom et la description de l'event.
  const config = {
    ...baseConfig,
    name: event.name,
    subTitle: event.dates + ' · ' + event.island,
    intro: event.description?.island || baseConfig.intro,
    extraParagraphs: [
      ...(event.description?.race ? [{ heading: 'The Race', text: event.description.race }] : []),
      ...(event.description?.nightlife ? [{ heading: 'Off the Water', text: event.description.nightlife }] : []),
      ...(event.footer ? [{ italic: true, text: event.footer }] : []),
    ],
  };

  try {
    const { yachts, totalYachts } = await fetchVisibleYachts({ destination: 'caribbean' });
    return <SubregionClient {...config} initialData={yachts} totalYachts={totalYachts} customToggles={REGATTA_TOGGLES} hideYachtType boatGroups={REGATTA_BOAT_GROUPS} />;
  } catch (error) {
    console.error('Regatta event page error:', error);
    return <SubregionClient {...config} initialData={[]} totalYachts={0} customToggles={REGATTA_TOGGLES} hideYachtType boatGroups={REGATTA_BOAT_GROUPS} />;
  }
}
