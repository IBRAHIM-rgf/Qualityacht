'use client';

// Blocs partages par les pages "vibe" (V2/V3, Caraibes & Halal) : en-tete de
// section anime, bandeau video plein cadre, bouton CTA de marque, bande de stats.

import Reveal from './Reveal';

export function SectionHead({ kicker, title, sub, align = 'center' }) {
  const a = align === 'left' ? 'text-left items-start' : 'text-center items-center';
  return (
    <div className={`flex flex-col ${a} mb-10 md:mb-14`}>
      {kicker && <Reveal variant="fade"><p className="text-[#c2622a] text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-light">{kicker}</p></Reveal>}
      <Reveal variant="up" delay={80}>
        <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#acb0cd]">{title}</h2>
      </Reveal>
      <Reveal variant="scale" delay={200}>
        <span className={`block h-[2px] w-24 my-5 rounded-full ${align === 'left' ? '' : 'mx-auto'}`} style={{ background: 'linear-gradient(90deg, transparent, #c2622a 30%, #d39478 70%, transparent)' }} />
      </Reveal>
      {sub && <Reveal variant="up" delay={260}><p className="text-[#acb0cd]/55 text-sm md:text-base uppercase tracking-[0.1em] px-1 max-w-2xl">{sub}</p></Reveal>}
    </div>
  );
}

export function VideoBand({ media: m, title, sub, height = 'h-[60vh] md:h-[80vh]', tint = true }) {
  if (!m) return null;
  return (
    <section className={`relative w-full ${height} overflow-hidden`}>
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={m.poster}>
        <source src={m.src} type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, transparent 24%, transparent 56%, rgba(38,39,42,0.65) 88%, #26272a 100%)' }} />
      {tint && <div className="absolute inset-0 mix-blend-soft-light pointer-events-none" style={{ background: 'radial-gradient(55% 55% at 22% 30%, rgba(47,214,196,0.22), transparent 60%), radial-gradient(60% 60% at 82% 82%, rgba(255,122,89,0.18), transparent 60%)' }} />}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
        <Reveal variant="blur" duration={1200}>
          <h2 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#acb0cd] drop-shadow-[0_3px_14px_rgba(0,0,0,0.7)] max-w-4xl">{title}</h2>
        </Reveal>
        {sub && <Reveal variant="up" delay={250}><p className="mt-5 text-[#acb0cd] text-sm md:text-lg uppercase tracking-[0.2em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">{sub}</p></Reveal>}
      </div>
    </section>
  );
}

export function CtaButton({ href = '/yachts', children }) {
  return (
    <a href={href} style={{ color: '#c2622a', backgroundColor: '#26272a', borderColor: '#C0C0C0' }}
      className="trajan-regular inline-block text-xs md:text-sm uppercase tracking-[0.25em] px-8 md:px-10 py-3.5 md:py-4 border rounded-full hover:bg-[#c2622a] hover:text-[#26272a] hover:border-[#c2622a] transition-all duration-300">
      {children}
    </a>
  );
}

// Bande de stats animees (chiffres qui apparaissent au scroll).
export function StatStrip({ stats = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
      {stats.map((s, i) => (
        <Reveal key={i} variant="up" delay={i * 100} className="text-center">
          <div className="trajan-regular text-3xl md:text-5xl text-[#acb0cd]">{s.big}</div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#c2622a] mt-2">{s.label}</div>
        </Reveal>
      ))}
    </div>
  );
}
