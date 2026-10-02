'use client';

// Hero video de /charters/halal/bahamas : meme configuration que le hero de
// /charters/halal/caribbean (CaribbeanV15Base, mode video + heroTextLow) :
// hauteur 70vh / 86vh, video plein cadre muette en boucle, degrade bas, titre
// + trait + sous-titre en bas, apparition en fondu + montee (2.8 s).

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HalalBahamasHero({ video, poster = null, title, subtitle }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (el) requestAnimationFrame(() => el.classList.add('revealed'));
  }, []);
  return (
    <section className="relative pt-[70px] md:pt-0 h-[70vh] md:h-[86vh] overflow-hidden bg-[#26272a]">
      <style>{`
        .hb-reveal { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .hb-reveal.revealed { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .hb-reveal { opacity: 1; transform: none; transition: none; } }
      `}</style>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={video}
        poster={poster || undefined}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '50% 75%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-[8%] md:bottom-[10%] flex flex-col items-center px-4">
        <div ref={ref} className="hb-reveal flex flex-col items-center w-full">
          <h1 className="trajan-regular text-4xl md:text-6xl lg:text-7xl uppercase tracking-[0.15em] text-[#acb0cd] text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {title}
          </h1>
          <div className="relative w-32 h-6 mx-auto my-4 md:my-6">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="text-[#acb0cd] text-base md:text-xl uppercase tracking-[0.25em] font-light text-center drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
