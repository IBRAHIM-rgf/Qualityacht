import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SubRegionStack from '../SubRegionStack';
import { ART, CULTURE, SECTIONS, SUBREGIONS } from '../data';

// Page ouverte au clic sur une card ART ou CULTURE : les 8 sous-regions empilees
// (bandes photo collees). Un clic sur une sous-region deplie ses infos.
// AUCUN emoji.

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export async function generateMetadata({ params }) {
  const { section } = await params;
  const s = SECTIONS[section];
  if (!s) return {};
  return {
    title: `${s.title} — Caribbean by Sub-Region | Qualityacht`,
    description: `${s.title} across the Caribbean, sub-region by sub-region.`,
  };
}

// Regroupement par sous-region, fait une fois au rendu (donnees statiques).
function groupBySub(items) {
  return items.reduce((acc, item) => {
    (acc[item.sub] ||= []).push(item);
    return acc;
  }, {});
}

export default async function ArtCultureSectionPage({ params }) {
  const { section } = await params;
  const s = SECTIONS[section];
  if (!s) notFound();

  const artBySub = groupBySub(ART);
  const cultureBySub = groupBySub(CULTURE);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* MASTHEAD */}
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
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em]">
            Sub-region by sub-region — tap to open
          </p>
        </div>
      </div>

      {/* SOUS-REGIONS EMPILEES (clic = infos) */}
      <div className="py-10 md:py-14">
        <SubRegionStack
          regions={SUBREGIONS}
          section={section}
          artBySub={artBySub}
          cultureBySub={cultureBySub}
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
          href="/art-culture/caribbean"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span>
          Back
        </Link>
      </div>
    </div>
  );
}
