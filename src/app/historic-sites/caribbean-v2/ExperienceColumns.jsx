'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Galerie 3 colonnes facon Badrutt's Palace, adaptee a la palette SOMBRE Qualityacht
// (jamais de blanc). Colonnes decalees verticalement + reveal au scroll.
// Chaque tuile = photo paysage OU placeholder degrade (item.img absent) avec le
// nom en surimpression. Ajouter une photo plus tard = renseigner item.img.
// AUCUN emoji.

// Photos des sous-regions Caraibes (memes que regatta / CaribbeanExplore), cyclees
// sur les tuiles. item.img reste prioritaire si on assigne une photo precise.
const SUBREGION_PHOTOS = [
  '/images/destinations/gretar antilles-original.jpg',
  '/images/destinations/Leeward Islands-original.jpg',
  '/images/destinations/The Leeward Antilles-original.jpg',
  '/images/destinations/the Windward Islands-original.jpg',
  '/images/destinations/Turks and Caicos-original.jpg',
  '/images/destinations/Trinidad and Tobago-original.jpg',
  '/images/destinations/Cayman Islands-original.jpg',
  '/images/pagesCaraibes/emergencyfilter.jpg',
];

function Tile({ item, index, fallbackImg }) {
  const src = item.img || fallbackImg;
  return (
    <figure
      className="reveal group relative rounded-2xl overflow-hidden border border-[#C0C0C0]/15 aspect-[3/2] transition-all duration-700 hover:border-[#B03E00]/50"
      style={{ transitionDelay: `${(index % 4) * 90}ms` }}
    >
      <Image
        src={encodeURI(src)}
        alt={item.name}
        fill
        sizes="(max-width:768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* voile bas pour lisibilite du nom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#26272a]/90 via-[#26272a]/10 to-transparent" />

      <figcaption className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="trajan-regular text-base md:text-lg uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          {item.name}
        </h3>
        {item.meta && (
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#B87333]">{item.meta}</p>
        )}
      </figcaption>
    </figure>
  );
}

// ── Tuile RANDONNEE : photo + nom + lieu + pills stats + Read more (VIP / acces) ──
const HTAG =
  'inline-flex items-center px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wide bg-[#26272a] border border-[#C0C0C0]/20 text-[#acb0cd]';
const HREAD =
  'w-full px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[#c2622a] border-t border-[#C0C0C0]/15 transition-colors hover:text-[#B03E00]';

function HikeInfo({ label, children }) {
  return (
    <div className="space-y-1">
      <span className={HTAG}>{label}</span>
      <p className="text-[12px] leading-relaxed text-[#acb0cd]/85">{children}</p>
    </div>
  );
}

function HikeTile({ item, index, fallbackImg }) {
  const [open, setOpen] = useState(false);
  const src = item.img || fallbackImg;
  return (
    <figure
      className="reveal group relative rounded-2xl overflow-hidden border border-[#C0C0C0]/15 bg-[#3a3b3f]/70 backdrop-blur-sm transition-all duration-700 hover:border-[#B03E00]/50 flex flex-col"
      style={{ transitionDelay: `${(index % 4) * 90}ms` }}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={encodeURI(src)}
          alt={item.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26272a]/92 via-[#26272a]/10 to-transparent" />
        {item.isNew && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#B03E00] text-white text-[9px] font-semibold uppercase tracking-[0.15em]">
            New
          </span>
        )}
        {item.yacht && (
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full border border-[#C0C0C0]/40 bg-[#26272a]/70 text-[#acb0cd] text-[9px] uppercase tracking-[0.12em]">
            Yacht access
          </span>
        )}
        <figcaption className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="trajan-regular text-base md:text-lg uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            {item.name}
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#B87333]">{item.location}</p>
        </figcaption>
      </div>

      <div className="px-4 pt-3 flex flex-wrap gap-1.5">
        <span className={HTAG}>{item.level}</span>
        <span className={HTAG}>{item.distance}</span>
        <span className={HTAG}>{item.elevation}</span>
        <span className={HTAG}>{item.duration}</span>
      </div>

      <button onClick={() => setOpen((v) => !v)} className={`${HREAD} mt-3`}>
        {open ? 'Show less' : 'Read more'}
      </button>

      {open && (
        <div className="px-4 py-3 border-t border-[#C0C0C0]/15 space-y-3 bg-[#26272a]/40">
          <HikeInfo label="VIP experience">{item.vip}</HikeInfo>
          <HikeInfo label="Access">
            {item.access} · {item.yacht ? 'Yacht access' : 'Shore only'}
          </HikeInfo>
        </div>
      )}
    </figure>
  );
}

export default function ExperienceColumns({ columns }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // decalage vertical des colonnes (Badrutt) : milieu plus bas, droite intermediaire
  const OFFSET = ['md:mt-0', 'md:mt-20', 'md:mt-10'];

  // offset cumule par colonne pour cycler les photos sous-regions sans repetition alignee
  const colOffset = [];
  let acc = 0;
  for (const c of columns) {
    colOffset.push(acc);
    acc += c.items.length;
  }

  return (
    <div ref={rootRef} className="px-6 md:px-10 lg:px-14 py-14 md:py-20">
      <style>{`
        .reveal { opacity: 0; transform: translateY(34px); }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 max-w-7xl mx-auto">
        {columns.map((col, ci) => (
          <section
            key={col.key}
            className={`flex flex-col gap-6 md:gap-7 ${OFFSET[ci] || ''} ${
              ci > 0 ? 'md:border-l md:border-[#C0C0C0]/10 md:pl-6 lg:pl-7' : ''
            }`}
          >
            {/* En-tete de colonne */}
            <header className="reveal flex flex-col items-center text-center mb-1">
              <h2 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.14em] text-[#C0C0C0]">
                {col.title}
              </h2>
              <div className="relative w-24 md:w-28 h-5 mt-2">
                <Image src="/images/title-line.png" alt="" fill className="object-contain" />
              </div>
              {col.subtitle && (
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#acb0cd]/45">
                  {col.subtitle}
                </p>
              )}
              {col.placeholder && (
                <span className="mt-3 inline-block px-3 py-1 rounded-full border border-[#C0C0C0]/30 text-[9px] uppercase tracking-[0.2em] text-[#acb0cd]/60">
                  Placeholder — à compléter
                </span>
              )}
            </header>

            {col.items.map((item, i) => {
              const fb = SUBREGION_PHOTOS[(colOffset[ci] + i) % SUBREGION_PHOTOS.length];
              return col.variant === 'hike' ? (
                <HikeTile key={item.name} item={item} index={i} fallbackImg={fb} />
              ) : (
                <Tile key={item.name} item={item} index={i} fallbackImg={fb} />
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
}
