'use client';

// ══ Hero video de /sport-fishing ══
//
// Composant LOCAL a la page Sport Fishing. Aucun composant global n'est touche.
//
// prefers-reduced-motion : le brief demande de NE PAS lancer la video et
// d'afficher le poster. Une regle CSS ne suffirait pas — masquer une <video>
// autoPlay la laisse se charger et se jouer derriere. Le choix est donc fait en
// JavaScript, au montage : tant qu'on ne sait pas, on rend le poster, ce qui
// donne aussi l'image d'attente pendant le chargement et evite tout ecart
// d'hydratation.

import Image from 'next/image';
import { useEffect, useState } from 'react';

const VIDEO = '/media/client/lydie/2026-08-27/sport-fishing/hero/sport-fishing-hero.mp4';
const POSTER = '/media/client/lydie/2026-08-27/sport-fishing/hero/sport-fishing-hero-poster.webp';

export default function HeroVideo() {
  const [animer, setAnimer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const appliquer = () => setAnimer(!mq.matches);
    appliquer();
    mq.addEventListener('change', appliquer);
    return () => mq.removeEventListener('change', appliquer);
  }, []);

  // Cadrage : le bateau est legerement a droite du centre. On decale le point
  // d'ancrage pour le garder dans le cadre une fois la video rognee, en desktop
  // comme en mobile.
  const cadrage = 'object-cover object-[58%_45%] md:object-[54%_50%]';

  return (
    <>
      <Image
        src={POSTER}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`${cadrage} ${animer ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}
      />
      {animer && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src={VIDEO}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full ${cadrage}`}
        />
      )}
    </>
  );
}
