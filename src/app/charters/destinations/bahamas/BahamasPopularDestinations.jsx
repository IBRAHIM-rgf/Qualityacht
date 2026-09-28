'use client';

// ══ Bahamas — « Popular Destinations » (cercles fleurs) ══
// Meme section que /charters/destinations/caribbean-v15 : sur-titre cuivre
// « Anchorages & Marinas », titre « Popular Destinations », trait, puis 5 cercles
// qui passent du gris a la couleur au survol / toucher (demande client 2026-09-27).
// Chaque fleur a sa version grise et sa version couleur fournies par la cliente :
// fondu de l'une a l'autre, avec le meme zoom et la meme luminosite que la v15.

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const D = '/media/client/lydie/2026-09-27/bahamas-flowers';
const DESTINATIONS = [
  { name: 'The Exumas', slug: 'exumas' },
  { name: 'Harbour Island', slug: 'harbour-island' },
  { name: 'Nassau & Paradise Island', slug: 'nassau' },
  { name: 'Andros', slug: 'andros' },
  { name: 'The Abacos', slug: 'abacos' },
];

function CircleCard({ name, slug }) {
  const [lit, setLit] = useState(false);
  const timerRef = useRef(null);
  const activate = () => { clearTimeout(timerRef.current); setLit(true); };
  const deactivate = () => { timerRef.current = setTimeout(() => setLit(false), 1500); };
  useEffect(() => () => clearTimeout(timerRef.current), []);
  const img = `absolute inset-0 w-full h-full object-cover transition-all duration-500 ${lit ? 'brightness-100 scale-110' : 'brightness-75'}`;
  return (
    <div
      onClick={activate} onMouseEnter={activate} onMouseLeave={deactivate}
      onTouchStart={activate} onTouchEnd={deactivate}
      className="flex flex-col items-center shrink-0 snap-center cursor-pointer gap-2 px-0 py-1"
      style={{ width: '160px' }}
    >
      <div
        className="rounded-full border-4 p-0.5"
        style={{ borderColor: '#C0C0C0', transform: lit ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.3s' }}
      >
        <div className="relative w-[130px] h-[130px] md:w-[155px] md:h-[155px] rounded-full overflow-hidden">
          <Image src={`${D}/${slug}-gray.jpg`} alt={name} fill sizes="160px" className={img} />
          <Image
            src={`${D}/${slug}-color-v2.jpg`} alt="" aria-hidden fill sizes="160px"
            className={img} style={{ opacity: lit ? 1 : 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
        </div>
      </div>
      <h3 className="trajan-regular text-[9px] md:text-[10px] font-bold text-center uppercase tracking-wide leading-tight text-[#acb0cd] px-1">
        {name}
      </h3>
    </div>
  );
}

export default function BahamasPopularDestinations() {
  const revealRef = useRef(null);
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('revealed'); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
      <div className="absolute inset-0 z-0">
        <Image src="/images/services-bg.png" alt="" fill className="object-cover opacity-55" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={revealRef} className="text-center mb-10 md:mb-14 bahamas-reveal">
          <p className="text-[#c2622a] text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-light">Anchorages &amp; Marinas</p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] md:tracking-[0.12em] text-[#acb0cd] mb-2">Popular Destinations</h2>
          <div className="relative w-32 h-6 mx-auto my-4 md:my-6">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-0 md:gap-1 pt-2 pb-4 -mx-4 px-4 scrollbar-hide md:justify-center md:flex-wrap md:overflow-visible md:mx-0 md:px-0">
          {DESTINATIONS.map((d) => <CircleCard key={d.slug} {...d} />)}
        </div>
      </div>
      <style>{`
        .bahamas-reveal { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .bahamas-reveal.revealed { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .bahamas-reveal { opacity: 1; transform: none; transition: none; } }
      `}</style>
    </section>
  );
}
