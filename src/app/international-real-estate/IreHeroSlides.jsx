'use client';

// ══ Diaporama du hero /international-real-estate ══
// Reprise fidele du fichier client hero-IRE-complet1.html (2026-09-20) :
// 5 images en fondu croise (1600 ms), chacune affichee 5500 ms, couverture
// totale du cadre ; versions verticales dediees sous 700 px ; arc en bas dans
// la couleur de la page. Seule la 1re image se charge d'abord, les autres
// apres le chargement de la page. Sous prefers-reduced-motion : image fixe.

import { useEffect, useState } from 'react';

const D = '/media/client/lydie/2026-09-20/ire-hero';
const SLIDES = [1, 2, 3, 4, 5].map((n) => ({
  desktop: `${D}/slide-${n}.webp`,
  mobile: `${D}/slide-${n}-mobile.webp`,
}));
const DELAY = 5500;
const FADE_MS = 1600;

export default function IreHeroSlides() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => setLoaded(true);
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (!loaded) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), DELAY);
    return () => clearInterval(id);
  }, [loaded]);

  return (
    <>
    <div aria-hidden className="absolute inset-0 z-0">
      {SLIDES.map((s, i) => {
        const eager = i === 0 || loaded;
        return (
          <picture key={s.desktop} className="contents">
            {eager && <source media="(max-width: 700px)" srcSet={s.mobile} />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={eager ? s.desktop : undefined}
              alt=""
              decoding="async"
              fetchPriority={i === 0 ? 'high' : undefined}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{
                opacity: i === current ? 1 : 0,
                transition: `opacity ${FADE_MS}ms ease-in-out`,
              }}
            />
          </picture>
        );
      })}
    </div>
      {/* Arc en bas : hauteur max 180 px, bords au ras du bas, couleur de la
          page. Au-dessus du voile (z 1), sous les textes (z 2, rendus apres). */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-[-1px] z-[2] leading-[0] pointer-events-none"
        style={{ height: 'clamp(60px, 12vw, 180px)' }}
      >
        <svg viewBox="0 0 1736 80" preserveAspectRatio="none" className="block w-full h-full">
          <path d="M0 80 Q868 -80 1736 80 L1736 82 L0 82 Z" fill="#26272a" />
        </svg>
      </div>
    </>
  );
}
