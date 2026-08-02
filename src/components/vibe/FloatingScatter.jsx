'use client';

// FloatingScatter — cartes flottantes dispersees autour d'un contenu central (facon
// alethia.earth), generalise et pilote par des donnees. Trois effets :
//  1. REVEAL : chaque carte JAILLIT du centre vers sa position exterieure (offset
//     calcule en JS = vecteur position finale -> centre) + scale, en cascade.
//  2. FLOTTEMENT perpetuel (keyframe fs-float, duree --fd differente par carte).
//  3. PARALLAX au scroll (--p sur la racine ; derive = --p * profondeur).
// prefers-reduced-motion : cartes figees visibles.
//
// props :
//  - cards : [{ key, pos:{left/right/top/bottom,width}, depth, fd, d, node }]
//  - mobileNodes : nodes affiches en grille 2 colonnes sous lg
//  - children : contenu central (titre)

import { useEffect, useRef } from 'react';

// Mini graphe en barres (derniere barre = accent).
function Bars({ heights, accent }) {
  return (
    <div className="flex items-end gap-[3px] h-8">
      {heights.map((h, i) => (
        <span key={i} className="w-[5px] rounded-sm"
          style={{ height: `${h}%`, backgroundColor: i === heights.length - 1 ? accent : '#5a5b60' }} />
      ))}
    </div>
  );
}

// Carte data sombre (stat + barres) — pour ponctuer le scatter de chiffres.
export function StatChip({ kicker, big, unit, label, heights = [45, 62, 40, 78, 55, 92], accent = '#c2622a' }) {
  return (
    <div className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/70">{kicker}</span>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="leading-none">
          <span className="text-3xl md:text-4xl font-semibold text-[#acb0cd]">{big}</span>
          {unit && <span className="ml-1 text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#acb0cd]/60">{unit}</span>}
          <p className="mt-1 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/50">{label}</p>
        </div>
        <Bars heights={heights} accent={accent} />
      </div>
    </div>
  );
}

// Pilule flottante.
export function Pill({ children, accent = '#c2622a' }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#2e2f32] border border-[#C0C0C0]/30 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.7)]">
      <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
      {children}
    </span>
  );
}

export default function FloatingScatter({ cards = [], mobileNodes = [], minHeightClass = 'lg:min-h-[900px]', children, fromCenter = true, revealDurationMs = 1500 }) {
  const rootRef = useRef(null);
  const scatterRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const computeCenters = () => {
      const scatter = scatterRef.current;
      if (!scatter) return;
      const c = scatter.getBoundingClientRect();
      if (!c.width) return;
      const cx = c.left + c.width / 2;
      const cy = c.top + c.height / 2;
      scatter.querySelectorAll('.fs-pos').forEach((pos) => {
        const r = pos.getBoundingClientRect();
        const card = pos.querySelector('.fs-card');
        if (!card) return;
        card.style.setProperty('--ox', (cx - (r.left + r.width / 2)).toFixed(1) + 'px');
        card.style.setProperty('--oy', (cy - (r.top + r.height / 2)).toFixed(1) + 'px');
      });
    };
    if (fromCenter) computeCenters();

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { root.classList.add('in'); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(root);

    if (reduce) return () => io.disconnect();

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
    const onResize = () => { if (fromCenter) computeCenters(); onScroll(); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className={`fs-root relative max-w-7xl mx-auto ${minHeightClass} lg:flex lg:items-center lg:justify-center ${fromCenter ? '' : 'no-center'}`}
      style={{ '--fs-tr': `${revealDurationMs}ms`, '--fs-op': `${Math.round(revealDurationMs * 0.78)}ms` }}>
      <style>{`
        .fs-root { --p: 0; }
        .fs-pos { position: absolute; }
        .fs-card {
          opacity: 0;
          transform: translate(var(--ox, 0), var(--oy, 0)) scale(0.35);
          transition: opacity var(--fs-op, 1200ms) cubic-bezier(0.16,1,0.3,1), transform var(--fs-tr, 1500ms) cubic-bezier(0.16,1,0.3,1);
          transition-delay: var(--d, 0ms);
          will-change: transform, opacity;
        }
        .fs-root.in .fs-card { opacity: 1; transform: translate(0,0) scale(1); }
        /* no-center : les cartes apparaissent EN PLACE (fondu + leger up), pas depuis le centre */
        .fs-root.no-center .fs-card { transform: translateY(30px) scale(1); }
        .fs-root.no-center.in .fs-card { transform: translateY(0) scale(1); }
        @keyframes fs-float { from { transform: translateY(-7px); } to { transform: translateY(7px); } }
        .fs-float { animation: fs-float var(--fd, 6s) ease-in-out infinite alternate; will-change: transform; }
        @media (prefers-reduced-motion: reduce) {
          .fs-card { opacity: 1 !important; transform: none !important; transition: none !important; }
          .fs-float { animation: none !important; }
        }
      `}</style>

      <div className="relative z-20 text-center px-4">{children}</div>

      {/* Scatter desktop lg+ */}
      <div ref={scatterRef} className="hidden lg:block absolute inset-0 z-10">
        <div className="relative w-full h-full">
          {cards.map((c) => (
            <div key={c.key} className="fs-pos" style={{ ...c.pos, transform: `translateY(calc(var(--p) * ${c.depth ?? 30}px))` }}>
              <div className="fs-card" style={{ '--d': `${c.d ?? 0}ms` }}>
                <div className="fs-float" style={{ '--fd': c.fd || '6s' }}>{c.node}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grille mobile < lg */}
      {mobileNodes.length > 0 && (
        <div className="lg:hidden mt-10 grid grid-cols-2 gap-4">
          {mobileNodes.map((n, i) => (
            <div key={i} className="fs-card" style={{ '--ox': '0px', '--oy': '30px', '--d': `${i * 90}ms` }}>
              <div className="fs-float" style={{ '--fd': `${5.5 + (i % 4) * 0.5}s` }}>{n}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
