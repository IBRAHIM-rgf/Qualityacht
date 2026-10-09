// /historic-sites/bahamas — sites historiques des Bahamas (client 2026-10-09), ouverte par
// la case Bahamas de /historic-sites. Meme presentation que les monuments Caraibes
// (/historic-sites/caribbean/monuments) : tuiles photo, vue agrandie au clic avec la
// description, la periode historique et l'experience VIP.
import Image from 'next/image';
import Link from 'next/link';
import ExperienceColumns from '../caribbean-v2/ExperienceColumns';
import { BAHAMAS_HERITAGE } from './data';

export const metadata = {
  title: 'Bahamas — Heritage Sites | Qualityacht',
  description: 'Curated cultural and historic excursions across The Bahamas, for private yacht clients.',
};

export default function HistoricSitesBahamasPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      <div className="px-6 md:px-14 pt-28 md:pt-32 pb-8 border-b border-[#C0C0C0]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
            Bahamas · Private Client Guide
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            Bahamas — Heritage Sites
          </h1>
          <div className="relative w-32 md:w-40 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em]">
            {BAHAMAS_HERITAGE.subtitle}
          </p>
        </div>
      </div>

      <ExperienceColumns columns={[BAHAMAS_HERITAGE]} />

      <div className="pb-16 flex justify-center">
        <Link
          href="/historic-sites"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[15px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span>
          Historic Sites
        </Link>
      </div>
    </div>
  );
}
