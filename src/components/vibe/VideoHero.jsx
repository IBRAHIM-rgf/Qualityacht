'use client';

// VideoHero — hero plein cadre avec video drone en boucle (muted/autoplay/loop),
// poster de secours, superpositions COLOREES (peps tropical) et titre anime.
// Video paysage sur desktop, portrait sur mobile (si fournie). Jamais de blanc :
// titre en lavande #acb0cd, kicker orange. prefers-reduced-motion : poster fixe.

import { useEffect, useRef } from 'react';
import Reveal from './Reveal';

export default function VideoHero({
  videoLandscape,
  posterLandscape,
  videoPortrait,
  posterPortrait,
  kicker,
  title,
  subtitle,
  height = 'screen',            // 'screen' | 'tall'
  align = 'center',             // 'center' | 'bottom'
  objectPosition = 'center',    // cadrage video (ex. 'top' pour couper le bas plutot que le haut)
  tintA = 'rgba(47,214,196,0.20)',   // glow turquoise
  tintB = 'rgba(255,122,89,0.18)',   // glow corail
  children,                     // CTA(s)
}) {
  const vidL = useRef(null);
  const vidP = useRef(null);

  // Certains navigateurs bloquent l'autoplay tant que .play() n'est pas rappele.
  useEffect(() => {
    [vidL.current, vidP.current].forEach((v) => { if (v) v.play?.().catch(() => {}); });
  }, []);

  const heightCls = height === 'tall'
    ? 'h-[78svh] min-h-[520px]'
    : 'h-[100svh] min-h-[600px]';
  const justify = align === 'bottom' ? 'justify-end pb-16 md:pb-24' : 'justify-center';

  return (
    <section className={`relative w-full ${heightCls} overflow-hidden bg-[#26272a]`}>
      {/* Video paysage (desktop/tablette) */}
      <video
        ref={vidL}
        className="hidden sm:block absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition }}
        autoPlay muted loop playsInline preload="metadata"
        poster={posterLandscape}
      >
        <source src={videoLandscape} type="video/mp4" />
      </video>
      {/* Video portrait (mobile) — fallback sur la paysage si absente */}
      <video
        ref={vidP}
        className="sm:hidden absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition }}
        autoPlay muted loop playsInline preload="metadata"
        poster={posterPortrait || posterLandscape}
      >
        <source src={videoPortrait || videoLandscape} type="video/mp4" />
      </video>

      {/* Glow colore (peps) — soft-light pour rehausser sans blanchir */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{ background: `radial-gradient(60% 55% at 18% 22%, ${tintA} 0%, transparent 60%), radial-gradient(65% 60% at 85% 88%, ${tintB} 0%, transparent 60%)` }}
      />
      {/* Degrade legibilite (sombre, jamais blanc) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(38,39,42,0.35) 0%, rgba(38,39,42,0.05) 22%, transparent 42%, rgba(38,39,42,0.45) 74%, #26272a 100%)' }}
      />

      {/* Contenu */}
      <div className={`relative z-10 h-full flex flex-col items-center ${justify} px-5 text-center`}>
        {kicker && (
          <Reveal variant="fade" delay={100}>
            <span className="inline-block rounded-full border border-[#C0C0C0]/50 bg-[#26272a]/50 backdrop-blur-sm px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.32em] text-[#c2622a] mb-5">
              {kicker}
            </span>
          </Reveal>
        )}
        <Reveal variant="blur" delay={200} duration={1200}>
          <h1 className="trajan-regular text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[0.12em] text-[#acb0cd] leading-[1.05] drop-shadow-[0_3px_16px_rgba(0,0,0,0.75)] max-w-5xl">
            {title}
          </h1>
        </Reveal>
        {/* Trait accent anime */}
        <Reveal variant="scale" delay={550}>
          <span className="block h-[2px] w-24 md:w-32 my-5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #c2622a 30%, #d39478 70%, transparent)' }} />
        </Reveal>
        {subtitle && (
          <Reveal variant="up" delay={650}>
            <p className="text-[#acb0cd] text-base md:text-2xl uppercase tracking-[0.22em] font-light max-w-2xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
              {subtitle}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal variant="up" delay={800} className="mt-8">
            {children}
          </Reveal>
        )}
      </div>

      {/* Indice de scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="block w-6 h-10 rounded-full border-2 border-[#acb0cd]/40 relative">
          <span className="absolute left-1/2 top-2 -translate-x-1/2 w-1 h-2 rounded-full bg-[#c2622a] animate-bounce" />
        </span>
      </div>
    </section>
  );
}
