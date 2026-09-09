import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ExperienceColumns from '../../caribbean-v2/ExperienceColumns';
import { columns, SECTION_META } from '../data';

// Page dediee a UNE section de /historic-sites/caribbean (Monuments, Hiking ou
// Cycling). Le hub ouvre desormais chaque tuile dans un NOUVEL ONGLET, ce qui
// suppose une URL par section : le contenu ne peut plus etre simplement revele
// sous la tuile.
// Le contenu lui-meme est inchange — c'est le meme ExperienceColumns, avec la
// meme colonne, donc les cartes monuments gardent leur bandeau et leur vue
// agrandie au clic.

export function generateStaticParams() {
  return Object.keys(SECTION_META).map((section) => ({ section }));
}

export async function generateMetadata({ params }) {
  const { section } = await params;
  const meta = SECTION_META[section];
  if (!meta) return {};
  return {
    title: `${meta.title} — Caribbean by Land | Qualityacht`,
    description: `${meta.title} across the Caribbean, for private yacht clients.`,
  };
}

export default async function HistoricSectionPage({ params }) {
  const { section } = await params;
  const meta = SECTION_META[section];
  const column = columns.find((c) => c.key === section);
  if (!meta || !column) notFound();

  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* MASTHEAD — identique a celui du hub, pour que l'onglet ouvert reste
          visiblement la meme famille de pages. */}
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
          {column.subtitle && (
            <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em]">
              {column.subtitle}
            </p>
          )}
        </div>
      </div>

      <ExperienceColumns columns={[column]} />

      <div className="pb-16 flex justify-center">
        <Link
          href="/historic-sites/caribbean"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[15px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span>
          The Caribbean by Land
        </Link>
      </div>
    </div>
  );
}
