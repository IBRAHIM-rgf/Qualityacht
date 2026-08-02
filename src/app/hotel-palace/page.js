import Image from 'next/image';
import WorldMapClient from './WorldMapClient';
import { media } from '@/lib/quality-media';

export const metadata = {
  title: 'Hotel & Palace | Qualityacht',
  description:
    'Palaces and hotels across our charter destinations — explored on the map, region by region and sub-region by sub-region.',
};

// Hero repris du traitement des pages theme (object-cover + degrade bas + titre en
// surimpression), puis la carte monde a la place de la grille de destinations : ici la
// carte EST la navigation.
// Hero drone (vue aerienne) — differente de la page Caraibes.
const HERO_IMAGE = (media({ cat: 'aerial', role: 'hero-bg', kind: 'image' })[1]
  || media({ cat: 'aerial', role: 'hero-bg', kind: 'image' })[0])?.src
  || '/images/new/FB_IMG_1749967381497.jpg';

export default function HotelPalacePage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* ══ HERO ══ */}
      <section className="relative pt-[70px] md:pt-0 h-[58vh] md:h-[78vh]">
        <Image
          src={encodeURI(HERO_IMAGE)}
          alt="Hotel & Palace"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#26272a] via-[#26272a]/70 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-8 md:pb-12">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            Ultra-Premium Reference
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            Hotel &amp; Palace
          </h1>
          <div className="relative w-28 md:w-40 h-5 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            Palaces · Hotels
          </p>
        </div>
      </section>

      {/* ══ INTRO ══ */}
      <section className="px-6 md:px-14 pt-12 md:pt-16">
        <p className="max-w-3xl mx-auto text-center text-base md:text-lg leading-relaxed text-[#acb0cd]">
          A curated selection of palaces and hotels across every destination
          we charter. Open a destination on the map to descend into its sub-regions, and from
          each sub-region into the addresses that hold their rank.
        </p>
      </section>

      {/* ══ CARTE MONDE ══ */}
      <WorldMapClient />
    </div>
  );
}
