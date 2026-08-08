import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ExperienceColumns from '../../caribbean-v2/ExperienceColumns';
import { columns, SECTION_META } from '../data';

// Page ouverte au clic sur un panneau de /historic-sites/caribbean (Monuments / Hiking /
// Cycling). Vraie fusion v2/v3 : le MEME composant ExperienceColumns rend les 3
// sections (une seule colonne, celle de la section demandee), chacune avec son variant
// de tuile (monument / hike / tuile simple) — contenu reel de l'ex-v2, style uniforme.

export function generateStaticParams() {
  return Object.keys(SECTION_META).map((section) => ({ section }));
}

export async function generateMetadata({ params }) {
  const { section } = await params;
  const s = SECTION_META[section];
  if (!s) return {};
  return {
    title: `${s.title} — Caribbean | Qualityacht`,
    description: `${s.title} across the Caribbean, curated for private yacht clients.`,
  };
}

export default async function HistoricSitesCategoryPage({ params }) {
  const { section } = await params;
  const meta = SECTION_META[section];
  const column = columns.find((c) => c.key === section);
  if (!meta || !column) notFound();

  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* MASTHEAD */}
      <div className="px-6 md:px-14 pt-28 md:pt-32 pb-8 border-b border-[#C0C0C0]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
            {meta.eyebrow}
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            {meta.title}
          </h1>
          <div className="relative w-32 md:w-40 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </div>

      <ExperienceColumns columns={[column]} />

      <div className="pb-16 flex justify-center">
        <Link
          href="/historic-sites/caribbean"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span>
          Back
        </Link>
      </div>
    </div>
  );
}
