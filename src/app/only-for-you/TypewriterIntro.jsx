'use client';

// ══ /only-for-you — paragraphe d'introduction (client 2026-09-12) ══
//
// Le texte est agrandi, mis en gras, et apparait au scroll en fondu + deroule
// (il monte legerement) lorsqu'il entre dans l'ecran, une seule fois. La machine
// a ecrire posee plus tot a ete remplacee par cet effet a la demande du client.
// Le texte lui-meme n'est pas modifie. `prefers-reduced-motion` : affichage
// immediat, sans animation.

import { useEffect, useRef } from 'react';

export default function TypewriterIntro({ text, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    // Le texte est visible par defaut (rendu serveur, JS coupe) : on ne le cache
    // qu'une fois l'observateur en place, pour qu'il ne reste jamais invisible.
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return undefined;
    }
    el.style.opacity = '0';
    el.style.transform = 'translate3d(0, 28px, 0)';
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translate3d(0, 0, 0)';
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className={className}
      style={{
        transition:
          'opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1), transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {text}
    </p>
  );
}
