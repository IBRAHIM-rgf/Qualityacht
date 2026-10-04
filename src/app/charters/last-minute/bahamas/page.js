// ══ /charters/last-minute/bahamas ══
// Page Bahamas du parcours Last Minute (client 2026-09-29) : rendu identique a
// /charters/destinations/bahamas, avec « Last Minute » en blanc au-dessus du
// titre (comme « Day Charter »), le sous-titre « The Bahamas, Ready When You Are » et le CTA
// « Design Your Last Minute Charter ».
import BahamasRoutePage from '../../destinations/bahamas/page';

export const metadata = {
  title: 'Last-Minute Charter — The Bahamas | Qualityacht',
};

export default function LastMinuteBahamasPage() {
  return (
    <BahamasRoutePage
      heroKicker="Qualityacht · Bahamas"
      heroOverTitle="Last Minute"
      heroRuleColor="#C0C0C0"
      heroSubtitle="The Bahamas, Ready When You Are"
      quoteLabel="Design Your Last Minute Charter"
      heroVideo="/media/client/lydie/2026-09-30/lm-bahamas-hero.mp4"
      heroPoster="/media/client/lydie/2026-09-30/lm-bahamas-hero.jpg"
      // 8 cases -> page bateaux de chaque case (client 2026-10-04).
      islandLinkBase="/charters/last-minute/bahamas"
    />
  );
}
