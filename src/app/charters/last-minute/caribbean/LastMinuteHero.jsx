'use client';

// ══ LastMinuteHero — 3 videos cote a cote, pleine largeur ══
// Remplace le hero video unique de caribbean-v15 (heroNode) pour eviter le vide
// lateral des videos portrait en desktop. Contenu identique au hero des pages
// Bahamas (client 2026-09-29) : pastille, titre centre, trait, sous-titre et
// 2 boutons, memes polices et tailles que VideoHero.

import Link from 'next/link';
import Reveal from '@/components/vibe/Reveal';

const SOURCES = [
  '/media/quality/last-minute/hero-1.mp4',
  '/media/quality/last-minute/hero-2.mp4',
  '/media/quality/last-minute/hero-3.mp4',
];

const BTN_PRIMARY =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';
const BTN_SECONDARY =
  'inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0] bg-[#26272a]/40 backdrop-blur-sm px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C0C0C0] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

export default function LastMinuteHero() {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-[#26272a]">
      <div className="absolute inset-0 grid grid-cols-3 gap-[2px]">
        {SOURCES.map((src) => (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video key={src} src={src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ))}
      </div>
      {/* Degrade de lisibilite, identique a VideoHero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(38,39,42,0.35) 0%, rgba(38,39,42,0.05) 22%, transparent 42%, rgba(38,39,42,0.45) 74%, #26272a 100%)' }}
      />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 text-center pt-[210px] md:pt-[190px]">
        <Reveal variant="fade" delay={100}>
          <span className="inline-block rounded-full border border-[#C0C0C0]/50 bg-[#26272a]/50 backdrop-blur-sm px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.32em] text-[#c2622a] mb-5">
            Qualityacht · Last Minute Caribbean
          </span>
        </Reveal>
        <Reveal variant="blur" delay={200} duration={1200}>
          <h1 className="trajan-regular text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[0.12em] text-[#acb0cd] leading-[1.05] drop-shadow-[0_3px_16px_rgba(0,0,0,0.75)] max-w-5xl">
            Last-Minute Charter
          </h1>
        </Reveal>
        <Reveal variant="scale" delay={550}>
          <span className="block h-[2px] w-24 md:w-32 my-5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #c2622a 30%, #bd9973 70%, transparent)' }} />
        </Reveal>
        <Reveal variant="up" delay={650}>
          <p className="text-[#acb0cd] text-base md:text-2xl uppercase tracking-[0.22em] font-light max-w-2xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
            The Caribbean, Ready When You Are
          </p>
        </Reveal>
        <Reveal variant="up" delay={800} className="mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/request-quote" className={BTN_PRIMARY}>Design Your Last Minute Charter</Link>
            <Link href="/contact" className={BTN_SECONDARY}>Contact a Broker</Link>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="block w-6 h-10 rounded-full border-2 border-[#acb0cd]/40 relative">
          <span className="absolute left-1/2 top-2 -translate-x-1/2 w-1 h-2 rounded-full bg-[#c2622a] animate-bounce" />
        </span>
      </div>
    </section>
  );
}
