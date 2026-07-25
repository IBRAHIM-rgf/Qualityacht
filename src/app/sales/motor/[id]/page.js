import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { YACHTS, getYacht } from '../data';

// Page DETAIL d'un yacht — calquee sur la page detail globaljet.aero (aircraft) : TOUT est
// CENTRE. Hero sobre sur fond photo estompe (nom + "Make an offer" + tagline + barre de
// specs horizontale), puis photo + cercle decoratif, HIGHLIGHTS (liste centree),
// SPECIFICATIONS (categorie + lignes), PHOTO GALLERY. Fond gris-bleu (gray-900) + nuages.
// AUCUN emoji.

export function generateStaticParams() {
  return YACHTS.map((y) => ({ id: y.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const y = getYacht(id);
  if (!y) return {};
  return {
    title: `${y.name} — ${y.builder} ${y.model} for sale | Qualityacht`,
    description: y.tagline,
  };
}

export default async function YachtDetailPage({ params }) {
  const { id } = await params;
  const y = getYacht(id);
  if (!y) notFound();

  const gallery = y.gallery && y.gallery.length ? y.gallery : [y.img];
  const ref = `QA-${y.id.slice(0, 3).toUpperCase()}-${y.year}`;

  const summary = [
    ['Year', y.refit ? `${y.year} · R${y.refit}` : y.year],
    ['Length', y.length],
    ['Beam', y.beam],
    ['Cabins', y.cabins],
    ['Crew', y.crew],
    ['Flag', y.flag],
  ];

  const specGroups = [
    { title: 'Overview', rows: [['Type', y.type], ['Builder', y.builder], ['Model', y.model], ['Year', y.year], ['Refit', y.refit], ['Flag', y.flag], ['Location', y.location]] },
    { title: 'Dimensions', rows: [['Length (LOA)', y.length], ['Beam', y.beam], ['Draft', y.draft]] },
    { title: 'Accommodation', rows: [['Guest cabins', y.cabins], ['Crew cabins', y.crew]] },
    { title: 'Machinery', rows: [['Engines', y.engines], ['Engine hours', y.engineHours]] },
  ];

  return (
    <div className="min-h-screen relative text-[#acb0cd]">
      {/* Fond gris-bleu (gray-900) + nuages, facon page "Destination inconnue" */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gray-900" />
        <Image src="/images/nuagesAncien.png" alt="" fill className="object-cover opacity-30 grayscale" priority />
      </div>

      {/* ── HERO CENTRE sur photo estompee ── */}
      <header className="relative overflow-hidden pt-28 md:pt-40 pb-14 md:pb-16 px-6">
        <div aria-hidden className="absolute inset-0 z-0">
          <Image src={encodeURI(gallery[0])} alt="" fill priority className="object-cover opacity-[0.18] grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-gray-900" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-4">
            {y.type} &middot; {y.builder} {y.model}
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.14em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {y.name}
          </h1>
          <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#8b90a0]">Ref. {ref}</p>

          <Link
            href="/request-quote"
            className="mt-7 inline-flex items-center justify-center px-9 py-3 rounded-full bg-[#c2622a] text-[11px] uppercase tracking-[0.2em] text-gray-900 font-semibold transition-opacity duration-300 hover:opacity-90"
          >
            Make an offer
          </Link>

          <p className="mt-9 max-w-2xl text-sm md:text-base leading-relaxed text-[#acb0cd]/90">
            {y.tagline}
          </p>

          {/* barre de specs horizontale centree */}
          <div className="mt-10 w-full grid grid-cols-3 md:grid-cols-6 gap-y-6 border-t border-[#C0C0C0]/15 pt-8">
            {summary.map(([label, value]) => (
              <div key={label} className="text-center">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#8b90a0]">{label}</p>
                <p className="text-sm md:text-base text-[#C0C0C0] mt-1">{value}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-2xl md:text-3xl text-[#d39478]">
            {y.price}
            {y.priceNote && <span className="ml-2 text-xs uppercase tracking-[0.14em] text-[#8b90a0]">{y.priceNote}</span>}
          </p>
        </div>
      </header>

      {/* ── PHOTO PRINCIPALE + cercle decoratif ── */}
      <section className="relative px-6 py-12 md:py-20">
        <div className="relative max-w-4xl mx-auto">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[600px] md:h-[600px] rounded-full border border-[#C0C0C0]/10"
          />
          <div className="relative max-w-3xl mx-auto h-[280px] md:h-[440px] rounded-lg overflow-hidden border border-[#C0C0C0]/15">
            <Image src={encodeURI(gallery[1] || gallery[0])} alt={y.name} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* ── DESCRIPTION centree ── */}
      <section className="px-6 pb-4">
        <p className="max-w-3xl mx-auto text-center text-sm md:text-base leading-relaxed text-[#acb0cd]">
          {y.description}
        </p>
      </section>

      {/* ── HIGHLIGHTS (liste centree) ── */}
      {y.highlights && y.highlights.length > 0 && (
        <section className="px-6 py-14 md:py-20">
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.18em] text-[#C0C0C0] text-center mb-10">
            Highlights
          </h2>
          <ul className="max-w-2xl mx-auto space-y-4">
            {y.highlights.map((h) => (
              <li key={h} className="text-center text-sm md:text-base text-[#acb0cd] border-b border-[#C0C0C0]/10 pb-4">
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── SPECIFICATIONS (categorie + lignes) ── */}
      <section className="px-6 py-14 md:py-20 border-t border-[#C0C0C0]/10">
        <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.18em] text-[#C0C0C0] text-center mb-12">
          Specifications
        </h2>
        <div className="max-w-3xl mx-auto space-y-10">
          {specGroups.map((g) => (
            <div key={g.title} className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-10">
              <h3 className="trajan-regular text-sm uppercase tracking-[0.16em] text-[#B87333]">{g.title}</h3>
              <div>
                {g.rows
                  .filter(([, v]) => v !== undefined && v !== null && v !== '')
                  .map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4 py-3 border-b border-[#C0C0C0]/10">
                      <span className="text-[11px] uppercase tracking-[0.14em] text-[#8b90a0]">{label}</span>
                      <span className="text-sm text-[#C0C0C0] text-right">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTO GALLERY (centree) ── */}
      {gallery.length > 1 && (
        <section className="px-6 py-14 md:py-20 border-t border-[#C0C0C0]/10">
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.18em] text-[#C0C0C0] text-center mb-10">
            Photo Gallery
          </h2>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {gallery.map((src, i) => (
              <div key={src} className="relative h-[160px] md:h-[220px] rounded-lg overflow-hidden border border-[#C0C0C0]/15">
                <Image
                  src={encodeURI(src)}
                  alt={`${y.name} — ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CONTACT centre ── */}
      <section className="px-6 py-16 md:py-24 border-t border-[#C0C0C0]/10 text-center">
        <h2 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.1em] text-[#C0C0C0] mb-8">
          Interested in {y.name}?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/request-quote"
            className="inline-flex items-center justify-center px-9 py-3 rounded-full bg-[#c2622a] text-[11px] uppercase tracking-[0.2em] text-gray-900 font-semibold transition-opacity duration-300 hover:opacity-90"
          >
            Make an offer
          </Link>
          <Link
            href="/request-quote"
            className="inline-flex items-center justify-center px-9 py-3 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.2em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
          >
            Request full details
          </Link>
        </div>
      </section>

      {/* ── RETOUR ── */}
      <div className="px-6 pb-16 flex justify-center">
        <Link
          href="/sales/motor"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0]/40 text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span>
          All motor yachts
        </Link>
      </div>
    </div>
  );
}
