// ══ /charters/last-minute/bahamas ══
// Page Bahamas du parcours Last Minute (client 2026-09-29) : rendu identique a
// /charters/destinations/bahamas, avec la pastille « Qualityacht · Last Minute
// Bahamas », le sous-titre « The Bahamas, Ready When You Are » et le CTA
// « Design Your Last Minute Charter ».
import BahamasRoutePage from '../../destinations/bahamas/page';

export const metadata = {
  title: 'Last-Minute Charter — The Bahamas | Qualityacht',
};

export default function LastMinuteBahamasPage() {
  return (
    <BahamasRoutePage
      heroKicker="Qualityacht · Last Minute Bahamas"
      heroSubtitle="The Bahamas, Ready When You Are"
      quoteLabel="Design Your Last Minute Charter"
    />
  );
}
