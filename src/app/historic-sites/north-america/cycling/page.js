// /historic-sites/north-america/cycling — parcours velo Amerique du Nord (client 2026-10-23),
// ouverte par la tuile Cycling du hub. Meme presentation que /historic-sites/bahamas/cycling.
import Image from 'next/image';
import Link from 'next/link';
import ExperienceColumns from '../../caribbean-v2/ExperienceColumns';
import { NORTH_AMERICA_CYCLING } from '../data';

export const metadata = {
  title: 'Cycling — North America by Land | Qualityacht',
  description: 'Curated cycling routes across the United States, Canada and Mexico, for private yacht clients.',
};

export default function CyclingNorthAmericaPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      <div className="px-6 md:px-14 pt-28 md:pt-32 pb-8 border-b border-[#C0C0C0]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
            North America · Private Client Guide
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            Cycling
          </h1>
          <div className="relative w-32 md:w-40 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em]">
            {NORTH_AMERICA_CYCLING.subtitle}
          </p>
        </div>
      </div>

      <ExperienceColumns columns={[NORTH_AMERICA_CYCLING]} />

      <div className="pb-16 flex justify-center">
        <Link
          href="/historic-sites/north-america"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[15px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span>
          North America by Land
        </Link>
      </div>
    </div>
  );
}
