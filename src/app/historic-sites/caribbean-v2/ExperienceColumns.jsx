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

// ── Bandeau de lisibilite du nom ──────────────────────────────────────────────
// Un simple degrade ne suffisait pas : sur les photos claires des Caraibes
// (sable, turquoise, ciel), un nom comme "Port Royal" disparaissait purement et
// simplement. On pose donc une plaque OPAQUE facon bandeau de mini-carte sous
// la legende, avec un liseré haut pour la detacher de la photo.
const CAPTION_BAND =
  'absolute inset-x-0 bottom-0 px-4 py-3 bg-[#26272a]/92 backdrop-blur-[2px] border-t border-[#C0C0C0]/20';
const TILE_NAME =
  'trajan-regular text-lg md:text-xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug';
const TILE_META = 'mt-1 text-[15px] uppercase tracking-[0.14em] text-[#B87333]';

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
        className="object-cover saturate-[1.55] contrast-[1.15] brightness-[1.04] transition-transform duration-700 group-hover:scale-105"
      />

      {/* voile bas pour lisibilite du nom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#26272a]/90 via-[#26272a]/10 to-transparent" />

      <figcaption className={CAPTION_BAND}>
        <h3 className={TILE_NAME}>{item.name}</h3>
        {item.meta && <p className={TILE_META}>{item.meta}</p>}
      </figcaption>
    </figure>
  );
}

// ── Tuile RANDONNEE : photo + nom + lieu + pills stats + Read more (VIP / acces) ──
const HTAG =
  'inline-flex items-center px-2 py-0.5 rounded-md text-[15px] uppercase tracking-wide bg-[#26272a] border border-[#C0C0C0]/20 text-[#acb0cd]';
const HREAD =
  'w-full px-4 py-2.5 text-[15px] uppercase tracking-[0.2em] text-[#c2622a] border-t border-[#C0C0C0]/15 transition-colors hover:text-[#B03E00]';

function HikeInfo({ label, children }) {
  return (
    <div className="space-y-1">
      <span className={HTAG}>{label}</span>
      <p className="text-[15px] md:text-base leading-relaxed text-[#acb0cd]/85">{children}</p>
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
          className="object-cover saturate-[1.55] contrast-[1.15] brightness-[1.04] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26272a]/92 via-[#26272a]/10 to-transparent" />
        {item.isNew && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#B03E00] text-white text-[13px] font-semibold uppercase tracking-[0.15em]">
            New
          </span>
        )}
        {item.yacht && (
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full border border-[#C0C0C0]/40 bg-[#26272a]/70 text-[#acb0cd] text-[13px] uppercase tracking-[0.12em]">
            Yacht access
          </span>
        )}
        <figcaption className={CAPTION_BAND}>
          <h3 className={TILE_NAME}>{item.name}</h3>
          <p className={TILE_META}>{item.location}</p>
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

// ── Tuile MONUMENT : photo + nom + meta, la carte entiere ouvre la vue agrandie ──
// L'accordeon "Read more" interne a ete remplace : le clic sur la carte ouvre
// desormais MonumentFeature (cf. plus bas), qui occupe la largeur des 3 colonnes
// sur environ deux hauteurs de carte — soit l'equivalent de 6 cartes.
function MonumentTile({ item, index, fallbackImg, onOpen, isOpen }) {
  const src = item.img || fallbackImg;
  return (
    <figure
      className={`reveal group relative rounded-2xl overflow-hidden border transition-all duration-700 flex flex-col ${
        isOpen ? 'border-[#B03E00]' : 'border-[#C0C0C0]/15 hover:border-[#B03E00]/50'
      } bg-[#3a3b3f]/70 backdrop-blur-sm`}
      style={{ transitionDelay: `${(index % 4) * 90}ms` }}
    >
      <button
        type="button"
        onClick={() => onOpen(item, src)}
        aria-expanded={isOpen}
        className="relative aspect-[3/2] overflow-hidden w-full text-left cursor-pointer"
      >
        <Image
          src={encodeURI(src)}
          alt={item.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover saturate-[1.55] contrast-[1.15] brightness-[1.04] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26272a]/92 via-[#26272a]/10 to-transparent" />
        <figcaption className={CAPTION_BAND}>
          <h3 className={TILE_NAME}>{item.name}</h3>
          {item.meta && <p className={TILE_META}>{item.meta}</p>}
          <span className="mt-2 block text-[15px] uppercase tracking-[0.2em] text-[#c2622a]">
            {isOpen ? 'Showing above' : 'View larger'}
          </span>
        </figcaption>
      </button>
    </figure>
  );
}

// ── Vue agrandie d'un monument : largeur des 3 colonnes, ~2 hauteurs de carte ──
// Rendue au-dessus de la grille pour pouvoir couvrir toute la largeur : les
// cartes vivent dans des <section> en colonne, une tuile ne peut donc pas
// s'etendre sur les colonnes voisines depuis sa place.
function MonumentFeature({ item, src, onClose }) {
  return (
    <figure className="relative mb-8 md:mb-10 rounded-2xl overflow-hidden border border-[#B03E00]/40 bg-[#2e2f32] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] animate-[featureIn_320ms_ease-out]">
      <style>{`
        @keyframes featureIn { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <Image
          src={encodeURI(src)}
          alt={item.name}
          fill
          sizes="100vw"
          className="object-cover saturate-[1.55] contrast-[1.15] brightness-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26272a]/92 via-[#26272a]/25 to-transparent" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0] bg-[#26272a]/85 px-4 py-2 text-[15px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors hover:border-[#B03E00] hover:text-[#B03E00]"
        >
          Close
          <span aria-hidden className="leading-none">×</span>
        </button>

        <figcaption className="absolute inset-x-0 bottom-0 px-6 py-5 md:px-8 md:py-6 bg-[#26272a]/92 backdrop-blur-[2px] border-t border-[#C0C0C0]/20">
          <h3 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-tight">
            {item.name}
          </h3>
          {item.meta && (
            <p className="mt-2 text-base md:text-lg uppercase tracking-[0.14em] text-[#B87333]">{item.meta}</p>
          )}
        </figcaption>
      </div>

      {(item.desc || item.experience) && (
        <div className="px-6 py-6 md:px-8 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {item.desc && (
            <p className="text-base md:text-lg leading-relaxed text-[#acb0cd]">{item.desc}</p>
          )}
          {item.experience && (
            <div className="space-y-2">
              <span className={HTAG}>Private experience</span>
              <p className="text-base md:text-lg leading-relaxed text-[#acb0cd]">{item.experience}</p>
            </div>
          )}
        </div>
      )}
    </figure>
  );
}

// Repartit les items d'une seule categorie en 3 sous-colonnes (facon Badrutt),
// pour que le contenu revele sous une tuile HistoricHub reprenne exactement la
// disposition de v2 : 3 colonnes cote a cote, decalage vertical, trait de separation.
function splitInThree(items) {
  const cols = [[], [], []];
  items.forEach((item, i) => cols[i % 3].push(item));
  return cols;
}

export default function ExperienceColumns({ columns }) {
  const rootRef = useRef(null);
  // Une seule categorie (cf. HistoricHub : contenu d'une tuile revele sous elle) :
  // on reprend la disposition v2 a l'identique en repartissant ses items sur 3
  // sous-colonnes (decalage vertical + trait de separation), sans re-afficher
  // l'en-tete de colonne (deja porte par la tuile cliquee au-dessus).
  const single = columns.length === 1;

  // Monument affiche en grand ({ item, src }). Un seul a la fois ; recliquer la
  // meme carte referme. La photo resolue est memorisee au clic pour que la vue
  // agrandie n'ait pas a recalculer le cycle des photos de sous-region.
  const [featured, setFeatured] = useState(null);
  const openMonument = (item, src) =>
    setFeatured((f) => (f && f.item === item ? null : { item, src }));

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

      {single ? (
        <div className="max-w-7xl mx-auto">
          {columns.map((col) => {
            const subCols = splitInThree(col.items);
            return (
              <div key={col.key}>
                <header className="reveal flex flex-col items-center text-center mb-8 md:mb-10">
                  <h2 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.14em] text-[#C0C0C0]">
                    {col.title}
                  </h2>
                  <div className="relative w-24 md:w-28 h-5 mt-2">
                    <Image src="/images/title-line.png" alt="" fill className="object-contain" />
                  </div>
                  {col.subtitle && (
                    <p className="mt-2 text-[15px] uppercase tracking-[0.18em] text-[#acb0cd]/45">
                      {col.subtitle}
                    </p>
                  )}
                </header>

                {/* Vue agrandie AU-DESSUS de la grille : elle doit couvrir les
                    3 colonnes, ce qu'une tuile ne peut pas faire depuis sa
                    <section> en colonne. */}
                {featured && (
                  <MonumentFeature
                    item={featured.item}
                    src={featured.src}
                    onClose={() => setFeatured(null)}
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
                  {subCols.map((items, sci) => {
                    const subOffset = subCols.slice(0, sci).reduce((n, c) => n + c.length, 0);
                    return (
                      <section
                        key={sci}
                        className={`flex flex-col gap-6 md:gap-7 ${OFFSET[sci] || ''} ${
                          sci > 0 ? 'md:border-l md:border-[#C0C0C0]/10 md:pl-6 lg:pl-7' : ''
                        }`}
                      >
                        {items.map((item, i) => {
                          const fb = SUBREGION_PHOTOS[(subOffset + i) % SUBREGION_PHOTOS.length];
                          if (col.variant === 'hike') return <HikeTile key={item.name} item={item} index={i} fallbackImg={fb} />;
                          if (col.variant === 'monument') return <MonumentTile key={item.name} item={item} index={i} fallbackImg={fb} onOpen={openMonument} isOpen={featured?.item === item} />;
                          return <Tile key={item.name} item={item} index={i} fallbackImg={fb} />;
                        })}
                      </section>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
        {featured && (
          <MonumentFeature
            item={featured.item}
            src={featured.src}
            onClose={() => setFeatured(null)}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {columns.map((col, ci) => (
            <section
              key={col.key}
              className={`flex flex-col gap-6 md:gap-7 ${OFFSET[ci] || ''} ${
                ci > 0 ? 'md:border-l md:border-[#C0C0C0]/10 md:pl-6 lg:pl-7' : ''
              }`}
            >
              <header className="reveal flex flex-col items-center text-center mb-8 md:mb-10">
                <h2 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.14em] text-[#C0C0C0]">
                  {col.title}
                </h2>
                <div className="relative w-24 md:w-28 h-5 mt-2">
                  <Image src="/images/title-line.png" alt="" fill className="object-contain" />
                </div>
                {col.subtitle && (
                  <p className="mt-2 text-[15px] uppercase tracking-[0.18em] text-[#acb0cd]/45">
                    {col.subtitle}
                  </p>
                )}
              </header>

              {col.items.map((item, i) => {
                const fb = SUBREGION_PHOTOS[(colOffset[ci] + i) % SUBREGION_PHOTOS.length];
                if (col.variant === 'hike') return <HikeTile key={item.name} item={item} index={i} fallbackImg={fb} />;
                if (col.variant === 'monument') return <MonumentTile key={item.name} item={item} index={i} fallbackImg={fb} onOpen={openMonument} isOpen={featured?.item === item} />;
                return <Tile key={item.name} item={item} index={i} fallbackImg={fb} />;
              })}
            </section>
          ))}
        </div>
        </div>
      )}
    </div>
  );
}
