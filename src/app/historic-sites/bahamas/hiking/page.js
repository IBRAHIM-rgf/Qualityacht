// /historic-sites/bahamas/hiking — randonnees des Bahamas (client 2026-10-11), ouverte par
// la tuile Hiking de /historic-sites/bahamas. Meme presentation que
// /historic-sites/caribbean/hiking : tuiles photo, difficulte/distance/duree, Read more.
import Image from 'next/image';
import Link from 'next/link';
import ExperienceColumns from '../../caribbean-v2/ExperienceColumns';
import { BAHAMAS_HIKING } from '../data';

export const metadata = {
  title: 'Hiking — Bahamas by Land | Qualityacht',
  description: 'Curated hiking, nature and cultural excursions across The Bahamas, for private yacht clients.',
};

export default function HikingBahamasPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      <div className="px-6 md:px-14 pt-28 md:pt-32 pb-8 border-b border-[#C0C0C0]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
            Bahamas · Private Client Guide
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            Hiking
          </h1>
          <div className="relative w-32 md:w-40 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em]">
            {BAHAMAS_HIKING.subtitle}
          </p>
        </div>
      </div>

      <ExperienceColumns columns={[BAHAMAS_HIKING]} />

      <div className="pb-16 flex justify-center">
        <Link
          href="/historic-sites/bahamas"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[15px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span>
          The Bahamas by Land
        </Link>
      </div>
    </div>
  );
}
