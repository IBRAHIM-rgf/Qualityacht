'use client';

// ══ Hero en triptyque — /charters/sports ══
//
// Composant LOCAL a cette page. ItemsGrid, partage, n'est pas modifie : la page
// rend ce hero au-dessus de la grille, qui reste inchangee.
//
// Meme principe visuel et meme strategie media que le triptyque Couple deja
// valide : trois colonnes egales avec un filet de 2px, une seule video active
// sur petit ecran, posters ailleurs, et posters seuls sous reduced motion.
//
// Deux des trois sources fournies etaient hors normes pour le web — flyboard a
// 7,9 Mbps (8,7 Mo) et beach-speedboat sur 30,7 s (9,8 Mo), soit 21,3 Mo pour le
// seul hero. Des variantes `-web` ont ete produites (3,5 et 2,2 Mo), ce qui
// ramene le triptyque a 8,5 Mo. Les fichiers d'origine sont conserves intacts.

import { useEffect, useRef, useState } from 'react';

const DOSSIER = '/media/client/lydie/2026-08-27/sport-yacht-caribbean/hero';

const COLONNES = [
  { video: `${DOSSIER}/flyboard-vertical-web.mp4`,        poster: `${DOSSIER}/flyboard-vertical-poster.webp` },
  { video: `${DOSSIER}/parasailing-vertical.mp4`,          poster: `${DOSSIER}/parasailing-vertical-poster.webp` },
  { video: `${DOSSIER}/beach-speedboat-vertical-web.mp4`,  poster: `${DOSSIER}/beach-speedboat-vertical-poster.webp` },
];

const COLONNE_MOBILE = 1;

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const CTA_CUIVRE =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-7 md:px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] ' +
  'transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] ' +
  'hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] ' + FOCUS;

const CTA_ARGENT =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-7 md:px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a]/60 backdrop-blur-sm text-[13px] font-semibold ' +
  'uppercase tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 ' +
  'hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] ' + FOCUS;

export default function SportsHeroTriptych() {
  const titreRef = useRef(null);
  const [petitEcran, setPetitEcran] = useState(null);
  const [animer, setAnimer] = useState(true);

  useEffect(() => {
    const el = titreRef.current;
    if (el) requestAnimationFrame(() => el.classList.add('revealed'));
  }, []);

  useEffect(() => {
    const mqLarge = window.matchMedia('(max-width: 767px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const appliquer = () => {
      setPetitEcran(mqLarge.matches);
      setAnimer(!mqMotion.matches);
    };
    appliquer();
    mqLarge.addEventListener?.('change', appliquer);
    mqMotion.addEventListener?.('change', appliquer);
    return () => {
      mqLarge.removeEventListener?.('change', appliquer);
      mqMotion.removeEventListener?.('change', appliquer);
    };
  }, []);

  return (
    <section className="relative pt-[70px] md:pt-0 h-[74vh] min-h-[500px] md:h-[86vh] overflow-hidden">
      <style>{`
        .sports-reveal { opacity: 0; transform: translateY(28px); transition: opacity 1.6s ease, transform 1.6s ease; }
        .sports-reveal.revealed { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .sports-reveal { transition: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* Triptyque masque vers le bas (client 2026-09-10) : les videos se fondent
          dans le fond nuages de la page au lieu d'une coupure nette. */}
      <div
        aria-hidden
        className="absolute inset-0 grid grid-cols-3 gap-[2px]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
        }}
      >
      {COLONNES.map((col, i) => {
        const enVideo =
          petitEcran === false ? animer : petitEcran === true && animer && i === COLONNE_MOBILE;

        if (!enVideo) {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={col.video} src={col.poster} alt="" aria-hidden className="w-full h-full object-cover" />
          );
        }
        return (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            key={col.video}
            src={col.video}
            poster={col.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        );
      })}
      </div>

      {/* Degrade sombre neutre, pour la lisibilite seule. Aucun bleu. */}
      {/* Degrade sombre neutre. Le panneau de droite est une plage tres claire :
          un degrade faible laissait le H1 illisible dessus. Il est donc renforce
          et remonte plus haut, avec un aplat plus dense derriere le bloc de
          texte lui-meme. Aucun bleu, aucune couleur ajoutee. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.04) 26%, rgba(0,0,0,0.44) 62%, rgba(0,0,0,0.30) 84%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-[7%] md:bottom-[9%] flex flex-col items-center px-4">
        {/* Cadre translucide retire (client 2026-09-10) : titre, filet et boutons seuls */}
        <div ref={titreRef} className="sports-reveal flex flex-col items-center w-full px-6 py-6 md:px-10 md:py-8">
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.12em] md:tracking-[0.15em] text-[#acb0cd] text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Sports Yacht Charter
          </h1>
          <div aria-hidden className="w-24 md:w-32 h-px bg-[#B87333] my-4" />
          <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a href="/yachts?destination=caribbean" className={CTA_CUIVRE}>
              Explore Sports Yachts
            </a>
            <a href="/#contact" className={CTA_ARGENT}>
              Plan Your Charter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
