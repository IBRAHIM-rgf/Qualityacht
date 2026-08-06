import Image from 'next/image';
import HotelMap from './HotelMap';
import { one } from '@/lib/quality-media';

export const metadata = {
  title: 'Hotel & Palace — Caribbean | Qualityacht',
  description:
    'A curated shortlist of Caribbean palaces with private pools for our charter guests, plus the map to explore the region sub-region by sub-region.',
};

// Page dediee ouverte au clic sur les Caraibes depuis la carte monde de /hotel-palace.
// Hero DRONE (vue aerienne d'ile turquoise, caraibe). L'ancien hero (Zakynthos, Grece)
// n'etait pas caraibe -> remplace par une lagune turquoise + catamarans.
const heroImg = one({ cat: 'aerial', role: 'hero-bg', kind: 'image', tag: 'lagoon' })?.src
  || '/media/quality/aerial/ishan-seefromthesky-rj8fmhnpxbg-unsplash.jpg';

export default function HotelPalaceCaribbeanPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* ══ HERO DRONE ══ */}
      <section className="relative pt-[70px] md:pt-0 h-[58vh] md:h-[74vh]">
        <Image src={heroImg} alt="Hotel & Palace — Caribbean" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#26272a] via-[#26272a]/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-8 md:pb-12">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            Caribbean · Ultra-Premium Reference
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

      {/* ══ CARTE SOMBRE — les hotels apparaissent SUR la carte (popup au clic) ══ */}
      <HotelMap />
    </div>
  );
}
