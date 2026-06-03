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
    requestAnimationFrame(() => { el.classList.add('revealed'); });
  }, []);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 1.6s ease, transform 1.6s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ══ HERO ══ */}
      <div className="pt-[70px] md:pt-0">
        <Image
          src="/images/private_jet/jet_hero.jpeg"
          alt="Private Jet"
          width={927}
          height={1648}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />
      </div>

      {/* ══ TITRE (anim reveal-up venant du bas) ══ */}
      <div className="bg-[#26272a] px-4 py-10 md:py-16 flex flex-col items-center">
        <div ref={heroRef} className="reveal-up flex flex-col items-center w-full">
          <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center">
            Private Jets
          </h1>
          <p className="text-[#acb0cd]/70 text-xs md:text-sm uppercase tracking-[0.25em] font-light text-center mt-3">
            Your Gateway to Every Destination
          </p>
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
