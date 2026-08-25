'use client';

// ══ Real Estate — hero en triptyque ══
// Les trois videos d'origine pesaient 54,6 Mo au total et etaient chargees
// simultanement, y compris sur mobile. On charge desormais les variantes
// optimisees, et sur petit ecran une SEULE video est active : les deux autres
// colonnes affichent leur poster, ce qui garde le triptyque sans telecharger
// trois fichiers. Les sources d'origine ne sont ni supprimees ni ecrasees.

import { useEffect, useState } from 'react';

const COLONNES = [
  { video: '/media/quality/real-estate/re-1-opt.mp4', poster: '/media/quality/real-estate/re-1-poster.jpg' },
  { video: '/media/quality/real-estate/re-2-opt.mp4', poster: '/media/quality/real-estate/re-2-poster.jpg' },
  { video: '/media/quality/real-estate/re-3-opt.mp4', poster: '/media/quality/real-estate/re-3-poster.jpg' },
];

// La colonne centrale reste animee sur mobile : c'est celle que l'oeil suit.
const COLONNE_MOBILE = 1;

export default function HeroTriptych() {
  const [petitEcran, setPetitEcran] = useState(null);
  const [animer, setAnimer] = useState(true);

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
    <>
      {COLONNES.map((col, i) => {
        // Tant que la mesure n'a pas eu lieu, on n'affiche que le poster : cela
        // evite de lancer trois telechargements avant de savoir sur quel format
        // on se trouve.
        const enVideo = petitEcran === false ? animer : petitEcran === true && animer && i === COLONNE_MOBILE;

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
            className="w-full h-full object-cover"
          />
        );
      })}
    </>
  );
}
