import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DiningMap from '../DiningMap';
import MichelinDining from '../MichelinDining';
import { PROVISIONING, SECTIONS } from '../data';

// Page ouverte au clic sur une card FINE FOOD ou DINING : les 8 sous-regions empilees
// (bandes photo collees). Un clic sur une sous-region deplie ses adresses.
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

export default async function FineFoodDiningSectionPage({ params }) {
  const { section } = await params;
  const s = SECTIONS[section];
  if (!s) notFound();

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
        </div>
      </div>

      {/* DINING : d'abord la carte des tables etoilees (Leaflet), PUIS les cards photos. */}
      {section === 'dining' && (
        <>
          <DiningMap />
          <MichelinDining />
        </>
      )}

      {/* LIVRAISON PARTOUT — hors decoupage par sous-region, donc au-dessus de la pile et
          sur la seule section Fine Food. */}
      {section === 'fine-food' && PROVISIONING.length > 0 && (
        <div className="px-6 md:px-14 pt-10 md:pt-14">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="trajan-regular text-base md:text-lg text-[#C0C0C0] whitespace-nowrap">
                Delivered Anywhere
              </h2>
              <div className="flex-1 h-px bg-[#B87333]/25" />
            </div>

            <div className="space-y-4">
              {PROVISIONING.map((p) => (
                <article
                  key={p.name}
                  className="bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-2xl p-5 md:p-6 flex flex-col"
                >
                  {p.images && p.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-5 -mt-1">
                      {p.images.slice(0, 3).map((src, k) => (
                        <div key={k} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image src={encodeURI(src)} alt={`${p.name} ${k + 1}`} fill sizes="(max-width:768px) 30vw, 220px" className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center flex-wrap gap-2 mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B87333] border border-[#B87333]/40">
                      {p.type}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-[#acb0cd]/50">{p.base}</span>
                  </div>

                  <h3 className="text-[#C0C0C0] font-semibold text-[15px] leading-snug mb-2">{p.name}</h3>
                  <p className="text-[#acb0cd] text-[13px] leading-relaxed">{p.desc}</p>
                  <p className="mt-3 text-[11px] leading-relaxed text-[#acb0cd]/60 italic">{p.note}</p>

                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 self-start inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C0C0C0] text-[10px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
                    >
                      Visit the shop
                      <span aria-hidden className="text-[13px] leading-none">&rarr;</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#1b223d] border-t border-white/10 px-6 md:px-14 py-5">
        <p className="text-[11px] text-[#7a8094] max-w-4xl mx-auto text-center leading-relaxed">
          ★ Signature Selection — addresses recommended as a priority for ultra-premium private
          clients. All tables, provisioning and private chefs arranged on request through your
          concierge.
        </p>
      </div>

      <div className="py-14 flex justify-center">
        <Link
          href="/fine-food-dining/caribbean"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span>
          Back
        </Link>
      </div>
    </div>
  );
}
