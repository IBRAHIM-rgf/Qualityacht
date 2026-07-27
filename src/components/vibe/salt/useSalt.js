'use client';

// ── SALT — boite a outils de mouvement ────────────────────────────────────────
// Quatre hooks partages par toutes les sections de la direction SALT.
// Regle commune : tout ce qui bouge doit pouvoir etre coupe net par
// prefers-reduced-motion, et rien ne doit tourner hors ecran (batterie).

import { useCallback, useEffect, useRef, useState } from 'react';

// Renvoie false au premier rendu (SSR) puis la vraie valeur cote client :
// evite tout mismatch d'hydratation tout en respectant la preference systeme.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);
  return reduced;
}

// Passe a true la premiere fois que l'element entre dans le viewport.
// once=true par defaut : un reveal ne se rejoue jamais au scroll inverse.
export function useInView({ threshold = 0.25, once = true, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    // Navigateur sans IO : on affiche tout plutot que de rien afficher.
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return undefined; }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); if (once) io.disconnect(); }
        else if (!once) setInView(false);
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, rootMargin]);

  return [ref, inView];
}

// Compteur qui s'incremente (easeOutQuart). En mouvement reduit, la valeur
// finale est posee d'emblee — jamais de comptage.
export function useCountUp(target, active, duration = 900, delay = 0) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    if (reduced) { setValue(target); return undefined; }
    let raf = null;
    let timer = null;
    const run = () => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    timer = setTimeout(run, delay);
    return () => { clearTimeout(timer); if (raf) cancelAnimationFrame(raf); };
  }, [target, active, duration, delay, reduced]);

  return value;
}

// Progression 0 -> 1 de la traversee d'une section par le viewport.
// Sert aux parallax : lecture du rect dans un rAF, jamais dans le handler.
export function useSectionProgress(ref) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) { setProgress(0.5); return undefined; }
    let raf = null;
    const compute = () => {
      raf = null;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      setProgress(Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh))));
    };
    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(compute); };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, reduced]);

  return progress;
}

// Petit utilitaire : fusionne des classes en ignorant les valeurs vides.
export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

// Autoscroll horizontal du rail (section 8). S'arrete NET au survol, au focus
// clavier et pendant un drag — pas de ralentissement mou.
export function useRailAutoscroll(railRef, { speed = 26, enabled = true } = {}) {
  const reduced = useReducedMotion();
  const pausedRef = useRef(false);
  const pause = useCallback(() => { pausedRef.current = true; }, []);
  const resume = useCallback(() => { pausedRef.current = false; }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el || reduced || !enabled) return undefined;
    let raf = null;
    let last = null;
    let visible = false;

    const step = (now) => {
      if (last === null) last = now;
      const dt = (now - last) / 1000;
      last = now;
      if (visible && !pausedRef.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          const next = el.scrollLeft + speed * dt;
          el.scrollLeft = next >= max - 0.5 ? 0 : next;
        }
      }
      raf = requestAnimationFrame(step);
    };

    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.2 })
      : null;
    io?.observe(el);
    if (!io) visible = true;
    raf = requestAnimationFrame(step);

    return () => { if (raf) cancelAnimationFrame(raf); io?.disconnect(); };
  }, [railRef, speed, reduced, enabled]);

  return { pause, resume };
}
