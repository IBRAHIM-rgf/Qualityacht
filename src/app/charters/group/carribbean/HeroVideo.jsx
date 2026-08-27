'use client';

// Hero video plein cadre, LOCAL a cette route.
// prefers-reduced-motion : la video n'est pas creee du tout, seul le poster est
// rendu. Une regle CSS ne suffirait pas — masquer une <video autoPlay> la laisse
// se charger et tourner derriere. Le poster sert aussi d'image d'attente.

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HeroVideo({ video, poster, position = 'object-center' }) {
  const [animer, setAnimer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const appliquer = () => setAnimer(!mq.matches);
    appliquer();
    mq.addEventListener?.('change', appliquer);
    return () => mq.removeEventListener?.('change', appliquer);
  }, []);

  return (
    <>
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover ${position} ${animer ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}
      />
      {animer && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover ${position}`}
        />
      )}
    </>
  );
}
