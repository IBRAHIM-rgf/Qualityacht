'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { destinations } from './data';

// ── Card ───────────────────────────────────────────────────────────────────────
function DestCard({ dest }) {
  return (
    <Link
      href={`/privat-jet/${dest.slug}`}
      className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="w-full relative mb-6 overflow-hidden h-48 rounded-xl">
        <Image src={dest.image} alt={dest.name} fill className="object-cover rounded-xl" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <h2 className="text-lg font-semibold text-[#acb0cd] mb-2 trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto hover:text-[#c2622a] transition-colors duration-300">
        {dest.name}
      </h2>
    </Link>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function PrivatJetPage() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) el.classList.add('revealed'); });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 1.6s ease, transform 1.6s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ══ HERO avec texte qui monte sur la photo ══ */}
      <div className="relative pt-[70px] md:pt-0">
        <div className="relative w-full">
          {/* Mobile : photo portrait existante */}
          <Image
            src="/images/private_jet/jet_hero.jpeg"
            alt="Private Jet"
            width={927}
            height={1648}
            priority
            sizes="100vw"
            className="w-full h-auto block md:hidden"
          />
          {/* Desktop : photo dediee paysage */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/private_jet/Private_jet_desktop.png"
            alt="Private Jet"
            className="w-full h-auto hidden md:block"
          />
          {/* Dégradé bas pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

          {/* Texte qui monte sur la photo */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-8 md:pb-16">
            <div ref={heroRef} className="reveal-up flex flex-col items-center w-full">
              <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Private Jets
              </h1>
              <p className="text-[#acb0cd]/80 text-xs md:text-sm uppercase tracking-[0.25em] font-light text-center mt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                Your Gateway to Every Destination
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ GRILLE ══ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-24 px-4"
        style={{ backgroundImage: "url('/images/services-bg.png')" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold trajan-regular mb-4 text-center uppercase tracking-wide" style={{ color: '#acb0cd' }}>
          Private Jet Destinations
        </h2>
        <Image src="/images/title-line.png" alt="" width={200} height={10} className="mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
          {destinations.map((dest) => (
            <DestCard key={dest.slug} dest={dest} />
          ))}
        </div>
      </section>
    </div>
  );
}
