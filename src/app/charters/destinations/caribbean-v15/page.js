// ══ Caraibes V15 (= contenu V20) — structure v15 COMPLETE (8 cartes iles + fin de page) avec :
//  - un HERO VIDEO drone AVEC mer = hero-aerial-portrait (nageur en eau turquoise
//    vu du ciel), via la prop heroNode. Video verticale utilisee aussi en desktop
//    (recadree via object-cover) ;
//  - a la place de description/cocomer/ancienne showcase : introNode = l'ECLAT
//    (collage de cartes : 4 textes + 4 photos + 2 videos horizontales, sans effet
//    "tout part du centre") + le 2e bandeau video beach-band (arbre bord de mer).
import Link from 'next/link';
import CaribbeanV15Page from './CaribbeanV15Base';
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

export default function CaribbeanV15RoutePage() {
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
          align="bottom"
        >
          {/* Les CTA sont passes en `children` : VideoHero les rend sous le sous-titre.
              Le bloc etant ancre en bas, il remonte naturellement d'autant, ce qui
              degage le nageur au centre de l'image. Le composant partage par 7 pages
              n'est pas modifie. */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request-quote"
              className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
            >
              Request a Quote
            </Link>
            <Link
              href="/#contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0] bg-[#26272a]/40 backdrop-blur-sm px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C0C0C0] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
            >
              Contact a Broker
            </Link>
          </div>
        </VideoHero>
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
