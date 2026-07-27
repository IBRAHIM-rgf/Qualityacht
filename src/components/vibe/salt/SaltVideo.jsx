'use client';

// SaltVideo — la video est le CONTENU de SALT, pas un decor. Une page en compte
// une quinzaine : on ne peut pas laisser 15 flux se decoder en meme temps.
// Regles : preload="metadata" + poster systematique, lecture UNIQUEMENT quand
// l'element est visible (IntersectionObserver play/pause), .play() rappele en
// effet pour contourner le blocage d'autoplay de certains navigateurs, et arret
// complet si l'utilisateur a demande un mouvement reduit (le poster suffit).

import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useSalt';

export default function SaltVideo({
  src,
  poster,
  className = '',
  eager = false,   // true pour le hero : on tente la lecture des le montage
  label,           // description textuelle (equivalent d'un alt)
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;

    if (reduced) { v.pause?.(); return undefined; }
    if (eager) v.play?.().catch(() => {});

    if (typeof IntersectionObserver === 'undefined') {
      v.play?.().catch(() => {});
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play?.().catch(() => {});
        else v.pause?.();
      },
      { threshold: 0.12 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced, eager]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
