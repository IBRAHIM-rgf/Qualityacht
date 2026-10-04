'use client';

// Liste « Halal-Friendly Yachts » des pages Halal (client 2026-10-04) : bateaux coches
// « Halal Charter » + region dans l'admin. Aucun bateau = section non affichee.

import Image from 'next/image';
import YachtList from '@/components/YachtList';

export default function HalalYachtsSection({ yachts = [], region }) {
  if (!yachts.length) return null;
  return (
    <section className="relative z-10 bg-[#26272a] px-4 md:px-14 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#c2622a] text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-light">{region}</p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] md:tracking-[0.12em] text-[#acb0cd]">Halal-Friendly Yachts</h2>
          <div className="relative w-32 h-6 mx-auto my-4 md:my-6">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
        </div>
        <YachtList yachts={yachts} accentColor="var(--qy-antilles)" />
      </div>
    </section>
  );
}
