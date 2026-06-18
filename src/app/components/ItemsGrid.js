'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ItemsGrid({
  title,
  bgImage,
  items,
  imageClassName = "rounded-xl",
  imageWrapperClassName = "h-48",
  heroImage = null,
  intro = null,
}) {
  // Reveal-up : meme effet de glissement vers le haut que sur caribbean-v15.
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.classList.add('revealed'); });
  }, [heroImage]);

  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* Hero optionnel : image pleine largeur + titre en overlay qui glisse vers le haut */}
      {heroImage && (
        <div className="relative w-full pt-[70px] md:pt-0 bg-[#26272a]">
          <div className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden">
            <Image src={heroImage} alt={title} fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-6 md:pb-10">
              <div ref={heroRef} className="reveal-up flex flex-col items-center w-full">
                <h1 className="text-3xl md:text-5xl font-bold text-[#acb0cd] trajan-regular mb-3 text-center uppercase tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  {title}
                </h1>
                <Image src="/images/title-line.png" alt="Decorative line" width={200} height={10} className="mx-auto" />
              </div>
            </div>
          </div>
        </div>
      )}

      <section
        className={`relative ${heroImage ? "" : "min-h-screen justify-center"} flex flex-col items-center bg-cover bg-center bg-no-repeat py-24 px-4`}
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        {/* Titre + ligne affichés seulement sans hero (sinon déjà dans le hero) */}
        {!heroImage && (
          <>
            <h1 className="text-3xl md:text-5xl font-bold text-[#acb0cd] trajan-regular mb-4 text-center uppercase tracking-wide">
              {title}
            </h1>
            <Image
              src="/images/title-line.png"
              alt="Decorative line"
              width={200}
              height={10}
              className="mx-auto mb-12"
            />
          </>
        )}

      {/* Intro optionnel (apres title-line, avant la grille) */}
      {intro && (
        <div className="max-w-3xl mx-auto text-center mb-12 px-2">
          {intro}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {items.map((item) => {
          const content = (
            <>
              <div
                className={`w-full relative mb-6 overflow-hidden ${imageWrapperClassName}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`object-cover ${imageClassName}`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h2 className="text-lg font-semibold text-copper-500 mb-2 trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto">
                {item.title}
              </h2>

              <p className="text-[#C0C0C0] text-sm">{item.description}</p>
            </>
          );

          // Card cliquable seulement si un href est fourni.
          return item.href ? (
            <Link
              key={item.title}
              href={item.href}
              className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              {content}
            </Link>
          ) : (
            <div
              key={item.title}
              className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center"
            >
              {content}
            </div>
          );
        })}
      </div>

        <div className="mt-16 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Qualityacht. All rights reserved.
        </div>
      </section>
    </>
  );
}
