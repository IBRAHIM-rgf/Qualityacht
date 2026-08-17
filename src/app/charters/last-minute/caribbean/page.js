// Page Last-Minute Charter — Caraïbes : reutilise le rendu de caribbean-v15 (meme base
// que la page Caraibes canonique, cf. /charters/destinations/caribbean), avec le hero
// remplace par un triptyque de 3 videos cote a cote (heroNode) au lieu du hero video/
// image d'origine.
import CaribbeanV15Page from '../../destinations/caribbean-v15/page';
import LastMinuteHero from './LastMinuteHero';

export const metadata = {
  title: 'Last-Minute Charter — The Caribbean | Qualityacht',
  description:
    'Last-minute private yacht charter across the Caribbean: available yachts, curated itineraries, and immediate concierge coordination.',
};

export default function LastMinuteCaribbeanPage() {
  return (
    <CaribbeanV15Page
      heroTitle="Last-Minute Charter"
      heroNode={<LastMinuteHero />}
      showShowcase
      showcaseBandVideo="/media/quality/last-minute/band-1.mp4"
      showcaseBandFull={false}
    />
  );
}
