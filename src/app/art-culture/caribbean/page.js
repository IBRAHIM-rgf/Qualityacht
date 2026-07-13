import Image from 'next/image';
import SplitPanels from '../../historic-sites/caribbean-v3/SplitPanels';
import { SECTIONS } from './data';

export const metadata = {
  title: 'Art & Culture — Caribbean | Qualityacht',
  description:
    'Two worlds: Caribbean art (museums, galleries, exhibitions) and Caribbean culture (carnivals, festivals, seasons), sub-region by sub-region.',
};

// Page d'entree : 2 cards ART / CULTURE, meme composant que la card 3 panneaux de
// /historic-sites/caribbean-v3 (survol = le panneau s'elargit, Discovery en bas).
// ART = ce qui etait deja sur cette page (musees, galeries, expositions).
// CULTURE = le calendrier client (carnavals, festivals, saisons, niveau VIP).
const panels = [
  {
    key: 'art',
    title: SECTIONS.art.title,
    img: SECTIONS.art.img,
    href: '/art-culture/caribbean/art',
  },
  {
    key: 'culture',
    title: SECTIONS.culture.title,
    img: SECTIONS.culture.img,
    href: '/art-culture/caribbean/culture',
  },
];

export default function CaribbeanArtCulturePage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* MASTHEAD */}
      <div className="px-6 md:px-14 pt-28 md:pt-32 pb-8 border-b border-[#C0C0C0]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
            Caribbean · Private Client Edition
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            Art &amp; Culture
          </h1>
          <div className="relative w-32 md:w-40 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em]">
            Museums · Galleries · Exhibitions — Carnivals · Festivals · Seasons
          </p>
        </div>
      </div>

      {/* 2 CARDS */}
      <SplitPanels panels={panels} />
    </div>
  );
}
