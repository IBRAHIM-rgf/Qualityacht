// /charters/destinations/bahamas — page destination (client 2026-09-27) :
// hero video, « Destinations by Region » (16 iles officielles), puis
// « Popular Destinations » (fleurs). La liste des bateaux a ete retiree de
// cette page ; une page flotte dediee sera creee plus tard (comme les Caraibes).

import { BahamasHero, BahamasIslandsGrid, BahamasDestinationsByRegion } from './BahamasRegions';
import BahamasPopularDestinations from './BahamasPopularDestinations';

export default function Page() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <BahamasHero />
      <BahamasIslandsGrid />
      <BahamasDestinationsByRegion />
      <BahamasPopularDestinations />
    </div>
  );
}
