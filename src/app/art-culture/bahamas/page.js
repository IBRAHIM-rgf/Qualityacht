import Image from 'next/image';
import ArtCultureStack from '../caribbean/ArtCultureStack';
import { SECTIONS } from './data';

export const metadata = {
  title: 'Art & Culture — Bahamas | Qualityacht',
  description:
    'Two worlds: Bahamian art (galleries, artists, island expression) and Bahamian culture (heritage, festivals, island rhythms).',
};

// /art-culture/bahamas (client 2026-10-10), calquee sur /art-culture/caribbean : hero,
// puis les 2 cards ART / CULTURE avec les textes fournis par le client. ART ouvre les
// lieux par groupe d'iles ; CULTURE est « Coming Soon » (pas encore de contenu).
const HERO_IMAGE = '/media/client/lydie/2026-09-27/bahamas-hero/poster.jpg';

const panels = [
  {
    key: 'art',
    title: SECTIONS.art.title,
    eyebrow: SECTIONS.art.eyebrow,
    img: SECTIONS.art.img,
    href: '/art-culture/bahamas/art',
    text: 'Bahamian art brings together vivid island expression, maritime heritage, and a distinctly contemporary point of view. From Nassau’s evolving gallery scene to intimate studios across the Out Islands, each encounter offers a thoughtful cultural dimension to life at sea.',
    bullets: [
      'Private access to curated galleries and select exhibitions in Nassau and beyond',
      'Introductions to established and emerging Bahamian artists',
      'Private visits to ateliers, studios, and artisan workshops',
      'Opportunities to discover and acquire distinctive, collectible works',
      'Seamless integration of art-focused moments into bespoke yachting itineraries',
    ],
  },
  {
    key: 'culture',
    title: SECTIONS.culture.title,
    eyebrow: SECTIONS.culture.eyebrow,
    img: SECTIONS.culture.img,
    soon: true,
    text: 'Bahamian culture unfolds through a graceful blend of island heritage, creative expression, and effortless warmth. From Nassau’s storied streets to the quiet cays of the Out Islands, each experience reveals a distinct sense of place—refined, welcoming, and deeply rooted in the sea.',
    bullets: [
      'Privileged access to historic estates, museums, and cultural landmarks',
      'Curated introductions to Bahamian artisans, storytellers, and heritage experts',
      'Private culinary experiences shaped by island traditions and local ingredients',
      'Refined selection of fresh, non-alcoholic cocktails inspired by tropical flavors, suitable for all ages',
      'Discreet access to select regattas, Junkanoo celebrations, and island festivals',
      'Seamless integration of Bahamian culture into bespoke yachting itineraries',
    ],
  },
];

export default function BahamasArtCulturePage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* HERO : photo montree en entier (meme parti que la page Caraibes). */}
      <section className="relative pt-[70px] md:pt-0">
        <Image
          src={HERO_IMAGE}
          alt="Art & Culture — Bahamas"
          width={1440}
          height={900}
          priority
          sizes="100vw"
          className="block w-full h-auto saturate-[1.4] contrast-[1.1] brightness-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#26272a]/90 via-[#26272a]/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-6 md:pb-10">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            Bahamas · Private Client Edition
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Art &amp; Culture
          </h1>
          <p className="mt-2 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            Museums · Galleries · Exhibitions
          </p>
          <div className="relative w-28 md:w-40 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </section>

      <ArtCultureStack cards={panels} />
    </div>
  );
}
