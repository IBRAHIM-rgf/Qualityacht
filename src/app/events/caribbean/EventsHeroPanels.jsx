'use client';

// ══ Hero a trois panneaux — /events/caribbean ══
//
// Reprise fidele du fichier client Events_hero_1400x850 (index.html + video1/2/3,
// recu le 2026-09-14) : scene 1400x850, trois panneaux verticaux 9/16 avec
// liseré cuivre, fond bleu nuit en radial, va-et-vient vertical desynchronise.
// Les videos du ZIP sont deposees telles quelles dans /public (piste audio
// retiree, faststart ajoute) ; l'ordre 1, 2, 3 du fichier est conserve.
//
// Composant LOCAL a cette route. Le sur-titre, le H1, le sous-titre et les deux
// CTA restent rendus par la page et ne sont pas touches.
//
// Sous prefers-reduced-motion : aucune lecture automatique, les posters sont
// affiches a la place.

import { useEffect, useState } from 'react';
import styles from './events-hero.module.css';

const D = '/media/client/lydie/2026-09-14/events-hero';

const PANNEAUX = [
  { cls: styles.v1, video: `${D}/event-1.mp4`, poster: `${D}/event-1-poster.jpg` },
  { cls: styles.v2, video: `${D}/event-2.mp4`, poster: `${D}/event-2-poster.jpg` },
  { cls: styles.v3, video: `${D}/event-3.mp4`, poster: `${D}/event-3-poster.jpg` },
];

export default function EventsHeroPanels() {
  const [animer, setAnimer] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const appliquer = () => setAnimer(!mq.matches);
    appliquer();
    mq.addEventListener?.('change', appliquer);
    return () => mq.removeEventListener?.('change', appliquer);
  }, []);

  return (
    <div aria-hidden className={styles.stage}>
      {PANNEAUX.map((p) => (
        <div key={p.video} className={`${styles.wrap} ${p.cls}`}>
          {animer ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src={p.video}
              poster={p.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className={styles.media}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.poster} alt="" className={styles.media} />
          )}
        </div>
      ))}
    </div>
  );
}
