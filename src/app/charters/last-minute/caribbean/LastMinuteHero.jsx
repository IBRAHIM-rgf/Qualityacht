'use client';

// ══ LastMinuteHero — 3 videos cote a cote, pleine largeur ══
// Remplace le hero video unique de caribbean-v15 (heroNode) pour eviter le vide
// lateral des videos portrait en desktop. Meme style de titre overlay que le hero
// video d'origine (BurntLine, positions, tailles).

import { useEffect, useRef } from 'react';

const SOURCES = [
  '/media/quality/last-minute/hero-1.mp4',
  '/media/quality/last-minute/hero-2.mp4',
  '/media/quality/last-minute/hero-3.mp4',
];

function BurntLine() {
  return <div className="w-24 md:w-32 h-px bg-[#B87333] my-4" />;
}

export default function LastMinuteHero() {
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.classList.add('revealed'); });
  }, []);

  return (
    <section className="relative pt-[70px] md:pt-0 h-[70vh] md:h-[86vh] overflow-hidden bg-[#26272a] grid grid-cols-3 gap-[2px]">
      {SOURCES.map((src) => (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video key={src} src={src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 flex flex-col items-center px-4 top-[46%]">
        <div ref={heroRef} className="reveal-up flex flex-col items-center w-full">
          <h1 className="trajan-regular text-4xl md:text-6xl lg:text-7xl uppercase tracking-[0.15em] text-[#acb0cd] text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Last-Minute Charter
          </h1>
          <BurntLine />
          <p className="text-[#acb0cd] text-base md:text-xl uppercase tracking-[0.25em] font-light text-center drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
            The Caribbean, Ready When You Are
          </p>
        </div>
      </div>
    </section>
  );
}
