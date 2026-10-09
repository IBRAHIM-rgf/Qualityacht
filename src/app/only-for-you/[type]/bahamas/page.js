// /only-for-you/regatta/bahamas — regates aux Bahamas 2026 par zone (client 2026-10-09),
// ouverte par la case Bahamas de /only-for-you/regatta. Les autres types n'ont pas de
// page Bahamas pour l'instant (404).
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RegattaBahamasClient from './RegattaBahamasClient';

export const metadata = {
  title: 'Bahamas Sailing Regattas — 2026 | Qualityacht',
};

const HERO = '/media/client/lydie/2026-09-27/bahamas-hero/poster.jpg';

export default async function RegattaBahamasPage({ params }) {
  const { type } = await params;
  if (type !== 'regatta') notFound();
  return (
    <main className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      <section className="relative h-[60vh] md:h-[72vh] min-h-[420px] overflow-hidden">
        <Image src={HERO} alt="The Bahamas" fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#26272a]/40 via-[#26272a]/10 to-[#26272a]" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center px-5 pb-10 md:pb-14">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-3">Sailboat Regatta</p>
          <h1 className="trajan-regular text-2xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight max-w-4xl">
            Bahamas Sailing Regattas — 2026
          </h1>
          <div className="relative w-28 md:w-32 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-3 text-[13px] md:text-sm uppercase tracking-[0.18em] text-[#acb0cd]">
            Organized by charter zone · Click any event for details
          </p>
        </div>
      </section>

      <section className="px-5 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <RegattaBahamasClient />
          <div className="mt-16 flex justify-center">
            <Link href="/only-for-you/regatta"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[15px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]">
              <span aria-hidden>&larr;</span> Sailboat Regatta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
