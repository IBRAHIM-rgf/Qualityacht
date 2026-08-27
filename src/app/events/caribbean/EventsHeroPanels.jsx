'use client';

// ══ Hero a trois panneaux — /events/caribbean ══
//
// Composant LOCAL a cette route. Seul le fond du hero change : le sur-titre, le
// H1, le sous-titre et les deux CTA restent rendus par la page et ne sont pas
// touches. Rien sous le hero n'est modifie.
//
// Panneau droit : la troisieme video du mail n'etait pas accessible — le lien
// Drive demande une autorisation. Aucune video n'a ete inventee ni telechargee
// au hasard : le panneau conserve l'image de regate deja en place. Le jour ou la
// video arrive, il suffit d'ajouter `video` et `poster` a la troisieme entree
// ci-dessous, sans refaire le composant.
//
// Mobile : la video carnaval, centrale, est la seule active ; les deux autres
// panneaux affichent leur poster ou leur image. Sous prefers-reduced-motion,
// aucune lecture automatique.

import { useEffect, useState } from 'react';

const D = '/media/client/lydie/2026-08-27/events/hero';

const PANNEAUX = [
  { video: `${D}/tennis-event-vertical.mp4`,             poster: `${D}/tennis-event-vertical-poster.webp` },
  { video: `${D}/caribbean-carnival-vertical.mp4`,       poster: `${D}/caribbean-carnival-vertical-poster.webp` },
  // En attente de la troisieme video : image seule, pas de source video.
  { video: null, poster: '/media/quality/boats/gregor-volvo-ocean-race-816438-1920.jpg' },
];

// Le carnaval, au centre, est le panneau que l'oeil suit sur mobile.
const PANNEAU_MOBILE = 1;

export default function EventsHeroPanels() {
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
    <div aria-hidden className="absolute inset-0 grid grid-cols-3 gap-[2px] bg-[#26272a]">
      {PANNEAUX.map((p, i) => {
        const enVideo =
          p.video &&
          (petitEcran === false ? animer : petitEcran === true && animer && i === PANNEAU_MOBILE);

        if (!enVideo) {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={p.poster} src={encodeURI(p.poster)} alt="" className="w-full h-full object-cover" />
          );
        }
        return (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            key={p.video}
            src={p.video}
            poster={p.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        );
      })}
    </div>
  );
}
