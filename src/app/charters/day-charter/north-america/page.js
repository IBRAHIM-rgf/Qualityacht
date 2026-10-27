// ══ /charters/day-charter/north-america ══
// Page North America du parcours Day Charter (client 2026-10-27), comme
// /charters/day-charter/bahamas : rendu identique a /charters/destinations/north-america,
// avec « Day Charter » au-dessus du titre, le CTA « Create Your Day at Sea » (?day=1),
// la video hero fournie par le client et les cases vers les bateaux Day Charter.
import NorthAmericaPage from '../../destinations/north-america/page';

const HERO = '/media/client/2026-10-27/day-charter-north-america';

// Eclat (client 2026-10-27) : 3 photos puis 2 videos, dans l'ordre recu.
const E = `${HERO}/eclat`;
const ECLAT_MEDIA = [
  { src: `${E}/photo-1.jpg`, desc: 'Sunset over the bay framed by palm trees', aspect: 'aspect-[4/3]', width: '236px' },
  { src: `${E}/photo-2.jpg`, desc: 'Explorer in a yellow jacket inside a moss-covered lava cave', aspect: 'aspect-[4/5]', width: '220px' },
  { src: `${E}/photo-3.jpg`, desc: 'Aerial view of the Miami Beach shoreline', aspect: 'aspect-[4/3]', width: '236px' },
  { video: true, src: `${E}/video-1.mp4`, poster: `${E}/video-1.jpg`, aspect: 'aspect-[9/16]', width: '180px' },
  { video: true, src: `${E}/video-2.mp4`, poster: `${E}/video-2.jpg`, aspect: 'aspect-video', width: '292px' },
];

export const metadata = {
  title: 'Day Charter North America | Qualityacht',
};

export default function DayCharterNorthAmericaPage() {
  return (
    <NorthAmericaPage
      quoteHref="/request-quote?day=1"
      heroOverTitle="Day Charter"
      quoteLabel="Create Your Day at Sea"
      heroRuleColor="#C0C0C0"
      heroVideo={`${HERO}/hero.mp4`}
      heroPoster={`${HERO}/poster.jpg`}
      regionLinkBase="/charters/day-charter/north-america"
      eclatMedia={ECLAT_MEDIA}
    />
  );
}
