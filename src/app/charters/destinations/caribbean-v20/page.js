// ══ Caraibes V20 — structure v15 COMPLETE (8 cartes iles + fin de page) avec :
//  - un HERO VIDEO drone AVEC mer = hero-aerial-portrait (nageur en eau turquoise
//    vu du ciel), via la prop heroNode. Video verticale utilisee aussi en desktop
//    (recadree via object-cover) ;
//  - a la place de description/cocomer/ancienne showcase : introNode = l'ECLAT
//    (collage de cartes : 4 textes + 4 photos + 2 videos horizontales, sans effet
//    "tout part du centre") + le 2e bandeau video beach-band (arbre bord de mer).
import CaribbeanV15Page from '../caribbean-v15/page';
import CaribbeanV20Eclat from './CaribbeanV20Eclat';
import VideoHero from '@/components/vibe/VideoHero';
import { one } from '@/lib/quality-media';

export const metadata = {
  title: 'The Caribbean — Luxury Yacht Charters | Qualityacht',
  description:
    'The Caribbean by Qualityacht: aerial drone views over turquoise seas, 700+ islands and a fleet curated for the extraordinary.',
};

// Hero choisi par le client : hero-aerial-portrait (drone au-dessus d'un nageur en
// eau turquoise). Meme video en desktop et mobile.
const heroVideo = one({ cat: 'aerial', kind: 'video', role: 'hero-bg', orientation: 'portrait' });
const palmiers = one({ cat: 'beach', role: 'section-band', kind: 'image' })?.src;

export default function CaribbeanV20Page() {
  return (
    <CaribbeanV15Page
      heroNode={
        <VideoHero
          videoLandscape={heroVideo?.src}
          posterLandscape={heroVideo?.poster}
          videoPortrait={heroVideo?.src}
          posterPortrait={heroVideo?.poster}
          kicker="Qualityacht · Caribbean"
          title="The Caribbean"
          subtitle="The Ultimate Luxury Yachting Destination"
        />
      }
      showShowcase={false}
      showCocomer={false}
      showDescription={false}
      palmiersSrc={palmiers}
      palmiersAspect="3 / 2"
      introNode={<CaribbeanV20Eclat />}
    />
  );
}
