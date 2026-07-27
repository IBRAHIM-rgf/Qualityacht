'use client';

// ── CaribbeanShowcase ────────────────────────────────────────────────────────
// Reproduction de l'animation "cartes flottantes" d'alethia.earth (section
// "ALETHIA SOLVES") adaptee a la palette Qualityacht et aux photos Caraibes.
//
// Trois effets combines, chacun sur son propre calque (transforms qui se
// composent par imbrication .cs-pos > .cs-card > .cs-float) :
//   1. REVEAL au scroll  : chaque carte arrive de son offset (--ox/--oy) +
//      scale, en cascade (transition-delay --d). Declenche par IntersectionObserver.
//   2. FLOTTEMENT perpetuel : keyframe cs-float (translateY doux), duree --fd
//      differente par carte -> mouvement desynchronise facon Framer.
//   3. PARALLAX au scroll : JS ecrit --p (progression -1..1 de la section dans
//      le viewport) sur la racine ; chaque carte derive de --p * sa profondeur.
//
// Prefers-reduced-motion : anime rien (cartes figees, visibles).

import Image from 'next/image';
import { useEffect, useRef } from 'react';

// Mini graphe en barres (facon cartes data d'alethia). Derniere barre = accent orange.
function Bars({ heights }) {
  return (
    <div className="flex items-end gap-[3px] h-8">
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-[5px] rounded-sm"
          style={{ height: `${h}%`, backgroundColor: i === heights.length - 1 ? '#c2622a' : '#5a5b60' }}
        />
      ))}
    </div>
  );
}

// Carte data sombre (kicker + gros chiffre + libelle + barres).
function StatCard({ kicker, big, unit, label, heights }) {
  return (
    <div className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/70">{kicker}</span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#c2622a]" />
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="leading-none">
          <span className="text-3xl md:text-4xl font-semibold text-[#acb0cd]">{big}</span>
          {unit && <span className="ml-1 text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#acb0cd]/60">{unit}</span>}
          <p className="mt-1 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/50">{label}</p>
        </div>
        <Bars heights={heights} />
      </div>
    </div>
  );
}

// Carte photo (avec badge pilule optionnel facon "1 tCO2e").
function PhotoCard({ src, alt, aspect = 'aspect-[3/4]', badge }) {
  return (
    <div className={`relative ${aspect} w-full overflow-hidden rounded-2xl border border-[#C0C0C0]/15 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] bg-[#26272a]`}>
      <Image src={src} alt={alt} fill sizes="320px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      {badge && (
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#26272a]/90 border border-[#C0C0C0]/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#acb0cd] backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c2622a]" />
          {badge}
        </span>
      )}
    </div>
  );
}

// Carte photo aerienne + carte data superposee (facon "TOTAL REMOVAL 8.3").
function AerialCard({ src, alt, kicker, big, unit, heights }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#C0C0C0]/15 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] bg-[#26272a]">
      <Image src={src} alt={alt} fill sizes="360px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-3 right-3 left-auto w-[62%] rounded-xl border border-[#C0C0C0]/20 bg-[#2e2f32]/92 backdrop-blur-sm p-3">
        <span className="block text-[8px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">{kicker}</span>
        <div className="flex items-end justify-between gap-2">
          <span className="text-2xl font-semibold text-[#acb0cd] leading-none">{big}<span className="ml-1 text-[9px] tracking-[0.15em] text-[#acb0cd]/50">{unit}</span></span>
          <Bars heights={heights} />
        </div>
      </div>
    </div>
  );
}

// Carte claire (argent cococo) — echo des cartes "produit" claires d'alethia.
// carte : carteCarab (echo de la carte topographique). yacht : rendu clair.
function LightCard({ src, alt, aspect = 'aspect-square', label, imgClass = 'object-cover' }) {
  return (
    <div className={`relative ${aspect} w-full overflow-hidden rounded-2xl border border-[#C0C0C0]/40 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)]`} style={{ backgroundColor: '#c9c6bf' }}>
      <Image src={src} alt={alt} fill sizes="240px" className={imgClass} />
      {label && (
        <span className="absolute bottom-2 left-2 rounded-md bg-[#26272a]/85 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-[#acb0cd]">{label}</span>
      )}
    </div>
  );
}

// Petite pilule flottante (facon "1 tCO2e").
function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#2e2f32] border border-[#C0C0C0]/30 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.7)]">
      <span className="w-2 h-2 rounded-full bg-[#c2622a]" />
      {children}
    </span>
  );
}

// ── Definition des cartes ─────────────────────────────────────────────────────
// pos : positionnement absolu (desktop lg+). depth : facteur parallax (px, signe
// = sens). fd : duree du flottement. d : delai reveal (cascade). ox/oy : offset
// d'arrivee du reveal. render : contenu.
const CARDS = [
  {
    key: 'cocomer',
    pos: { left: '1.5%', top: '5%', width: '210px' },
    depth: 42, fd: '7s', d: 60, ox: '-46px', oy: '-26px',
    render: <PhotoCard src="/images/pagesCaraibes/cocomer-original.jpeg" alt="Caraibes" badge="St Barths" />,
  },
  {
    key: 'fleet',
    pos: { left: '25.5%', top: '7%', width: '236px' },
    depth: -32, fd: '6s', d: 150, ox: '0px', oy: '-42px',
    render: <StatCard kicker="Luxury Fleet · Caribbean" big="182" unit="Yachts" label="Available this season" heights={[45, 62, 40, 78, 55, 92]} />,
  },
  {
    key: 'aerial',
    pos: { right: '4%', top: '1%', width: '312px' },
    depth: 58, fd: '8.5s', d: 110, ox: '46px', oy: '-30px',
    render: <AerialCard src="/images/pagesCaraibes/st-barth.jpg" alt="Vue aerienne Caraibes" kicker="Guest satisfaction" big="9.4" unit="/10" heights={[50, 70, 45, 85, 60, 95]} />,
  },
  {
    key: 'map',
    pos: { right: '0.5%', top: '41%', width: '188px' },
    depth: -46, fd: '6.5s', d: 300, ox: '52px', oy: '0px',
    render: <LightCard src="/images/pagesCaraibes/carteCarab.jpeg" alt="Carte des Caraibes" aspect="aspect-[4/3]" label="700+ islands" imgClass="object-cover" />,
  },
  {
    key: 'yacht',
    pos: { left: '2.5%', top: '52%', width: '198px' },
    depth: 36, fd: '7.5s', d: 350, ox: '-52px', oy: '0px',
    render: <LightCard src="/images/yachts/yacht1.jpeg" alt="Yacht" aspect="aspect-[4/3]" label="Crewed" imgClass="object-cover grayscale" />,
  },
  {
    key: 'palms',
    pos: { left: '24%', bottom: '3%', width: '232px' },
    depth: -34, fd: '6s', d: 230, ox: '0px', oy: '44px',
    render: <PhotoCard src="/images/pagesCaraibes/palmierscaraibes-original.jpeg" alt="Palmiers Caraibes" aspect="aspect-[4/3]" />,
  },
  {
    key: 'islands',
    pos: { right: '7%', bottom: '2%', width: '250px' },
    depth: 50, fd: '8s', d: 200, ox: '44px', oy: '42px',
    render: <StatCard kicker="Cruising grounds" big="700" unit="+ islands" label="Across 26 nations" heights={[40, 55, 72, 48, 88, 66]} />,
  },
  {
    key: 'pill-concierge',
    pos: { left: '19%', top: '31%', width: 'auto' },
    depth: -20, fd: '5.5s', d: 420, ox: '-30px', oy: '0px',
    render: <Pill>24/7 concierge</Pill>,
  },
  {
    key: 'pill-countries',
    pos: { right: '23%', bottom: '27%', width: 'auto' },
    depth: 26, fd: '6.2s', d: 480, ox: '30px', oy: '0px',
    render: <Pill>26 countries</Pill>,
  },
];

// Sous-ensemble affiche en grille sur mobile/tablette (< lg).
const MOBILE_ORDER = ['cocomer', 'aerial', 'fleet', 'palms', 'map', 'islands'];

export default function CaribbeanShowcase() {
  const rootRef = useRef(null);

  // REVEAL (IntersectionObserver, une fois) + PARALLAX (--p pilote par le scroll).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { root.classList.add('in'); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(root);

    if (reduce) return () => io.disconnect();

    // Parallax : progression = ecart centre-section / centre-viewport, normalise
    // dans [-1, 1]. rAF-throttle pour ne pas surcharger le scroll.
    let raf = null;
    const update = () => {
      raf = null;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const sectionCenter = rect.top + rect.height / 2;
      let p = (vh / 2 - sectionCenter) / (vh / 2 + rect.height / 2);
      p = Math.max(-1, Math.min(1, p));
      root.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="cs-root relative max-w-7xl mx-auto lg:min-h-[880px] lg:flex lg:items-center lg:justify-center">
      <style>{`
        .cs-root { --p: 0; }
        .cs-pos { position: absolute; }
        .cs-card {
          opacity: 0;
          transform: translate(var(--ox, 0), var(--oy, 0)) scale(0.82);
          transition: opacity 1.1s cubic-bezier(.16,1,.3,1), transform 1.2s cubic-bezier(.16,1,.3,1);
          transition-delay: var(--d, 0ms);
          will-change: transform, opacity;
        }
        .cs-root.in .cs-card { opacity: 1; transform: translate(0,0) scale(1); }
        @keyframes cs-float { from { transform: translateY(-7px); } to { transform: translateY(7px); } }
        .cs-float { animation: cs-float var(--fd, 6s) ease-in-out infinite alternate; will-change: transform; }
        @media (prefers-reduced-motion: reduce) {
          .cs-card { opacity: 1 !important; transform: none !important; transition: none !important; }
          .cs-float { animation: none !important; }
        }
      `}</style>

      {/* En-tete central (le "coeur" fixe autour duquel tout flotte) */}
      <div className="relative z-20 text-center px-4 pointer-events-none">
        <span className="inline-block rounded-full border border-[#C0C0C0]/40 bg-[#2e2f32] px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#c2622a] mb-6">
          At a glance
        </span>
        <h2 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#acb0cd] leading-tight max-w-3xl mx-auto">
          The Caribbean,<br className="hidden md:block" /> Curated Around You
        </h2>
        <p className="mt-5 text-sm md:text-base text-[#acb0cd]/60 max-w-xl mx-auto leading-relaxed">
          Seven hundred islands, twenty-six nations, one seamless charter experience — quantified, curated, and crafted for the extraordinary.
        </p>
      </div>

      {/* ── SCATTER (desktop lg+) : cartes en absolu autour du centre ── */}
      <div className="hidden lg:block absolute inset-0 z-10">
        <div className="relative w-full h-full">
          {CARDS.map((c) => (
            <div
              key={c.key}
              className="cs-pos"
              style={{ ...c.pos, transform: `translateY(calc(var(--p) * ${c.depth}px))` }}
            >
              <div className="cs-card" style={{ '--ox': c.ox, '--oy': c.oy, '--d': `${c.d}ms` }}>
                <div className="cs-float" style={{ '--fd': c.fd }}>
                  {c.render}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── GRILLE (mobile / tablette < lg) : meme cartes, sans absolu ── */}
      <div className="lg:hidden mt-10 grid grid-cols-2 gap-4">
        {MOBILE_ORDER.map((key, i) => {
          const c = CARDS.find((x) => x.key === key);
          if (!c) return null;
          return (
            <div key={key} className="cs-card" style={{ '--ox': '0px', '--oy': '28px', '--d': `${i * 90}ms` }}>
              <div className="cs-float" style={{ '--fd': c.fd }}>
                {c.render}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
