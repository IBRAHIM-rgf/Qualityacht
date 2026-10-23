import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SubRegionStack from '../../caribbean/SubRegionStack';
import { ART, CULTURE, SECTIONS, SUBREGIONS, FLEET_BY_SUBREGION } from '../data';

// /art-culture/north-america/culture (client 2026-10-23), calquee sur /art-culture/bahamas :
// les 20 sous-regions empilees, chacune deplie sa carte culturelle. /art : un lieu par
// sous-region (fichier client du 2026-10-23).

export function generateStaticParams() {
  return Object.keys(SECTIONS).filter((k) => k !== 'art' || ART.length).map((section) => ({ section }));
}

export async function generateMetadata({ params }) {
  const { section } = await params;
  const s = SECTIONS[section];
  if (!s) return {};
  return {
    title: `${s.title} — North America by Subregion | Qualityacht`,
    description: `${s.title} across the United States, Canada and Mexico, subregion by subregion.`,
  };
}

function groupBySub(items) {
  return items.reduce((acc, item) => {
    (acc[item.sub] ||= []).push(item);
    return acc;
  }, {});
}

export default async function NorthAmericaArtCultureSectionPage({ params }) {
  const { section } = await params;
  const s = SECTIONS[section];
  if (!s || (section === 'art' && !ART.length)) notFound();

  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      <div className="px-6 md:px-14 pt-28 md:pt-32 pb-8 border-b border-[#C0C0C0]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
            {s.eyebrow}
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            {s.title}
          </h1>
          <div className="relative w-32 md:w-40 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </div>

      <div className="py-10 md:py-14">
        <SubRegionStack
          regions={SUBREGIONS}
          section={section}
          artBySub={groupBySub(ART)}
          cultureBySub={groupBySub(CULTURE)}
          fleetBySub={FLEET_BY_SUBREGION}
          flat={section === 'art'}
        />
      </div>

      {section === 'art' && (
      <div className="bg-[#1b223d] border-t border-white/10 px-6 md:px-14 py-5">
        <p className="text-[11px] text-[#7a8094] max-w-4xl mx-auto text-center leading-relaxed">
          ★ Signature Selection — venues recommended as a priority for ultra-premium private
          clients. All private access arranged on request through your concierge.
        </p>
      </div>
      )}

      <div className="py-14 flex justify-center">
        <Link
          href="/art-culture/north-america"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span>
          Back
        </Link>
      </div>
    </div>
  );
}
