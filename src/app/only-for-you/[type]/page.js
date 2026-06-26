'use client';

// Page d'un type de voilier (/only-for-you/<slug>) — accessible depuis /only-for-you.
// Hero (image + titre qui monte) + grille des 16 destinations.

import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useRef } from 'react';
import { getSailingTypeBySlug, destinationItems } from '../data';

export default function RentalTypePage({ params }) {
  const { type } = use(params);
  const boat = getSailingTypeBySlug(type);

  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add('revealed'), 200);
    return () => clearTimeout(t);
  }, []);

  if (!boat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#26272a]">
        <p className="text-[#acb0cd] text-lg">Type de bateau inconnu.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#26272a]">
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ══ HERO image + texte qui monte ══ */}
      <div className="relative w-full pt-[70px] md:pt-0 bg-[#26272a]">
        <div className="relative w-full h-[55vh] md:h-[75vh] overflow-hidden">
          <Image src={boat.image} alt={boat.name} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-6 md:pb-12">
            <div ref={heroRef} className="reveal-up flex flex-col items-center text-center w-full">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-2 md:mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                Sailing Charter
              </p>
              <h1 className="trajan-regular text-2xl md:text-5xl lg:text-6xl uppercase tracking-[0.12em] md:tracking-[0.15em] text-[#acb0cd] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {boat.name}
              </h1>
              <div className="relative w-24 md:w-32 h-5 md:h-6 mt-3 md:mt-4">
                <Image src="/images/title-line.png" alt="" fill className="object-contain" />
              </div>
              <p className="text-[#acb0cd]/80 text-xs md:text-sm uppercase tracking-[0.2em] font-light mt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                {boat.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ DESTINATIONS (16 cards, affichage seul) ══ */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 px-5 md:px-10"
        style={{ backgroundImage: "url('/images/services-bg.png')" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.12em] text-[#acb0cd]">Destinations</h2>
            <div className="relative w-32 h-7 mx-auto mt-4">
              <Image src="/images/title-line.png" alt="" fill className="object-contain" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinationItems.map((item) => {
              // Card Caraïbes → copie de v15 propre à ce voilier (/only-for-you/<type>/carribbean).
              const href = item.caribbean ? `/only-for-you/${type}/carribbean` : item.href;
              const content = (
                <>
                  <div className="w-full relative mb-6 overflow-hidden h-48 rounded-xl">
                    <Image src={item.image} alt={item.title} fill className="object-cover rounded-xl" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#acb0cd] trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto group-hover:text-[#c2622a] transition-colors duration-300">
                    {item.title}
                  </h3>
                </>
              );
              // Card cliquable seulement si href (ex. Caraïbes → copie carribbean).
              return href ? (
                <Link key={item.title} href={href}
                  className="group min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer">
                  {content}
                </Link>
              ) : (
                <div key={item.title} className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
