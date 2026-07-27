'use client';

// CrewVideoBand — bande video pleine largeur (section equipage).
// La video ne se charge et ne demarre QUE lorsque la bande entre dans le viewport
// (IntersectionObserver) : hors de vue elle est mise en pause, pour ne pas telecharger
// tous les medias de la page en meme temps.
// Scrim LOCAL bas uniquement (48% de hauteur), aucun voile plein cadre.
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import useInView, { useReducedMotion } from './useInView';

export default function CrewVideoBand({ src, poster, alt, height = '66svh' }) {
  const [ref, inView] = useInView({ threshold: 0.25, once: false });
  const vid = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = vid.current;
    if (!v || reduced) return;
    if (inView) v.play?.().catch(() => {});
    else v.pause?.();
  }, [inView, reduced]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height, background: 'var(--ground2)' }}>
      {reduced ? (
        <Image src={poster} alt={alt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
      ) : (
        <video
          ref={vid}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline preload="metadata"
          poster={poster}
          aria-label={alt}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: '48%', background: 'linear-gradient(to top, rgba(28,26,25,.85) 0%, rgba(28,26,25,.45) 40%, rgba(28,26,25,0) 100%)' }}
      />
    </div>
  );
}
