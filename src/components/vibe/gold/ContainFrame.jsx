'use client';

// ══ Section 6 — image PORTRAIT dans un cadre paysage, sans recadrage ═══════════
// Exigence de la direction : l'image n'est jamais recadree. Un object-cover couperait
// le sujet (trois personnes de dos) ; on la pose donc en object-contain plein hauteur,
// et on remplit les cotes avec la MEME image agrandie et floutee — aucune couleur
// etrangere n'entre dans le cadre. Sur mobile (portrait dans portrait), object-cover
// plein cadre : aucun probleme.
// Le flou est porte par le CONTENEUR, pas par le <img> : `.gh-root img{filter:none}`
// (qui annule le saturate global) l'effacerait sinon.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Reveal from './Reveal';

export default function ContainFrame({ src, alt, heading, caption }) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  // Parallax volontairement minuscule (-3% -> +3%) sur le seul arriere-plan floute.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = sectionRef.current;
        const bg = bgRef.current;
        if (!el || !bg) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // p vaut 0 quand la section entre par le bas, 1 quand elle sort par le haut
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        bg.style.transform = `translateY(${(p - 0.5) * 6}%)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-[var(--gh-ground)]"
    >
      {/* Remplissage lateral : meme image, agrandie et floutee — desktop uniquement */}
      <div aria-hidden className="hidden sm:block absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute"
          style={{
            inset: '-14%',
            filter: 'blur(48px)',
            opacity: 0.32,
            willChange: reduced ? 'auto' : 'transform',
          }}
        >
          <Image src={src} alt="" fill sizes="100vw" quality={40} className="object-cover" />
        </div>
      </div>

      {/* Le sujet, entier : contain sur desktop, cover sur mobile (portrait/portrait) */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 60vw"
        quality={88}
        className="object-cover sm:object-contain"
        style={{ objectPosition: '50% 50%' }}
      />

      {/* Scrim local bas, uniquement pour porter le texte */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[42%] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(26,21,18,0.78) 62%, #1A1512 100%)',
        }}
      />

      <div className="gh-col relative z-10 h-full flex flex-col justify-end pb-[9vh]">
        <Reveal y={20} duration={1300} threshold={0.15}>
          <h2 className="gh-h2 gh-h2--sm max-w-[24ch]">{heading}</h2>
        </Reveal>
        <Reveal y={16} duration={1300} delay={180} threshold={0.15}>
          <span className="gh-kicker block mt-5">{caption}</span>
        </Reveal>
      </div>
    </section>
  );
}
