import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SECTIONS, SUBREGIONS } from '../subregions';

// Page Discovery ouverte au clic depuis une card de /historic-sites/caribbean-v3.
// Les 8 sous-regions sont empilees les unes SOUS les autres (une bande photo pleine
// largeur chacune) ; les activites viendront DEDANS (bloc "Activities" : il suffit de
// remplir le tableau `activities` de la sous-region dans ../subregions.js).
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

export default async function DiscoverySectionPage({ params }) {
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
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em]">
            Sub-region by sub-region
          </p>
        </div>
      </div>

      {/* SOUS-REGIONS EMPILEES — bandes photo collees les unes SOUS les autres, en
          colonne centree, sans cadre ni espacement (cf. reference client). Le nom et
          les activites sont poses DANS la bande. */}
      <div className="py-10 md:py-14">
        <div className="mx-auto w-full max-w-3xl">
          {SUBREGIONS.map((r) => (
            <section key={r.slug} id={r.slug} className="relative h-[40vh] md:h-[46vh] overflow-hidden">
              <Image
                src={encodeURI(r.img)}
                alt={r.name}
                fill
                sizes="(max-width:768px) 100vw, 768px"
                className="object-cover"
              />
              {/* voile bas : lisibilite du nom et des activites poses sur la photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-[#26272a]/50 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {r.name}
                </h2>

                {/* ACTIVITES de la sous-region (a remplir dans ../subregions.js) */}
                {r.activities.length > 0 ? (
                  <ul className="mt-3 space-y-1.5">
                    {r.activities.map((a) => (
                      <li key={a.name} className="flex items-baseline gap-3">
                        <span className="h-px w-4 shrink-0 bg-[#B87333]/70" />
                        <span className="text-[13px] text-[#acb0cd]">{a.name}</span>
                        {a.meta && (
                          <span className="text-[10px] uppercase tracking-[0.12em] text-[#acb0cd]/50">
                            {a.meta}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#B87333]">
                    {s.title} — activities to come
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="pb-16 flex justify-center">
        <Link
          href="/historic-sites/caribbean-v3"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span>
          Back
        </Link>
      </div>
    </div>
  );
}
