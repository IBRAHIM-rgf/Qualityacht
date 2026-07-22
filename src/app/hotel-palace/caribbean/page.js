import Image from 'next/image';
import CaribbeanMapClient from './CaribbeanMapClient';

export const metadata = {
  title: 'Hotel & Palace — Caribbean | Qualityacht',
  description:
    'Palaces, hotels and private residences across the Caribbean, explored sub-region by sub-region on the map.',
};

// Page dediee ouverte au clic sur les Caraibes depuis la carte monde de /hotel-palace.
// La carte y a la MER BLEUE et des CONTOURS ORANGE autour des zones (cf.
// CaribbeanMapClient).
export default function HotelPalaceCaribbeanPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* MASTHEAD */}
      <div className="px-6 md:px-14 pt-28 md:pt-32 pb-8 border-b border-[#C0C0C0]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
            Caribbean · Ultra-Premium Reference
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            Hotel &amp; Palace
          </h1>
          <div className="relative w-32 md:w-40 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em]">
            Palaces · Hotels · Private Residences
          </p>
        </div>
      </div>

      {/* CARTE CARAIBES (mer bleue, contours orange) */}
      <CaribbeanMapClient />
    </div>
  );
}
