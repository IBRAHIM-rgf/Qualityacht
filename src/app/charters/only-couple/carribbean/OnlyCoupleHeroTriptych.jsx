'use client';

// ══ Hero en triptyque — /charters/only-couple/carribbean ══
//
// Composant LOCAL a cette page. Il remplace l'ancien hero, qui affichait
// /images/yachts/yatch2.jpeg sur mobile et /images/yachts/Yatch_desktop.png sur
// desktop. Ces deux images ne sont pas supprimees du depot : elles servent
// ailleurs, seule leur utilisation ici disparait.
//
// Mise en page reprise de last-minute/caribbean/LastMinuteHero.jsx (grille de
// trois colonnes, filet de 2px, titre en overlay) et strategie media reprise de
// real-estate/HeroTriptych.jsx (une seule video active sur petit ecran, posters
// ailleurs). Aucun de ces deux composants n'est modifie : ils servent de modele.
//
// Les videos sont verticales (720x1280) : en object-cover dans une colonne
// etroite et haute, elles remplissent le cadre sans bande ni deformation.

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const DOSSIER = '/media/client/lydie/2026-08-27/couple-caribbean/hero';

// Ordre demande, de gauche a droite.
const COLONNES = [
  { video: `${DOSSIER}/beach-walk.mp4`,             poster: `${DOSSIER}/beach-walk-poster.webp` },
  { video: `${DOSSIER}/romantic-beach-dinner.mp4`,  poster: `${DOSSIER}/romantic-beach-dinner-poster.webp` },
  { video: `${DOSSIER}/sunset-couple.mp4`,          poster: `${DOSSIER}/sunset-couple-poster.webp` },
];

// Sur mobile, seule la colonne centrale est animee : c'est celle que l'oeil suit.
const COLONNE_MOBILE = 1;

function BurntLine() {
  return (
    <Image
      src="/images/title-line.png"
      alt=""
      aria-hidden
      width={200}
      height={10}
      className="mx-auto my-4 w-24 md:w-48 h-auto"
    />
  );
}

export default function OnlyCoupleHeroTriptych() {
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
    // Les deux preferences peuvent changer en cours de session : on suit.
    mqLarge.addEventListener?.('change', appliquer);
    mqMotion.addEventListener?.('change', appliquer);
    return () => {
      mqLarge.removeEventListener?.('change', appliquer);
      mqMotion.removeEventListener?.('change', appliquer);
    };
  }, []);

  return (
    <section className="relative pt-[70px] md:pt-0 h-[70vh] md:h-[86vh] overflow-hidden bg-[#26272a] grid grid-cols-3 gap-[2px]">
      {COLONNES.map((col, i) => {
        // Tant que la mesure n'a pas eu lieu (petitEcran === null), on n'affiche
        // que le poster : cela evite de lancer trois telechargements avant de
        // savoir sur quel format on se trouve.
        const enVideo =
          petitEcran === false ? animer : petitEcran === true && animer && i === COLONNE_MOBILE;

        if (!enVideo) {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={col.video}
              src={col.poster}
              alt=""
              aria-hidden
              className="w-full h-full object-cover"
            />
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

      {/* Degrade sombre neutre, uniquement pour la lisibilite du titre. Aucun bleu. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"
      />

      <div className="absolute inset-x-0 flex flex-col items-center px-4 bottom-[8%] md:bottom-[10%]">
        <div ref={titreRef} className="reveal-up flex flex-col items-center w-full">
          <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.12em] md:tracking-[0.15em] text-[#acb0cd] text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
            The Caribbean
          </h1>
          <BurntLine />
          <p className="text-[#acb0cd] text-xs md:text-xl uppercase tracking-[0.18em] md:tracking-[0.25em] font-light text-center drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            The Ultimate Luxury Yachting Destination
          </p>
        </div>
      </div>
    </section>
  );
}
