'use client';

// useInView — hook d'entree dans le viewport, partage par tous les blocs de la
// direction "A Day Aboard". Sert a deux choses : declencher les reveals et surtout
// ne lancer les videos hors-hero QUE lorsqu'elles sont visibles (sinon toutes les
// videos de la page se telechargent en meme temps).
import { useEffect, useRef, useState } from 'react';

export default function useInView({ threshold = 0.2, once = true, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return; }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, rootMargin]);

  return [ref, inView];
}

// Detecte prefers-reduced-motion cote client (SSR : false, puis correction a l'hydratation).
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);
  return reduced;
}
