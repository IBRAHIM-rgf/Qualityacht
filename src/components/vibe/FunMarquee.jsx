'use client';

// FunMarquee — bandeau defilant en boucle de medias (gens qui s'amusent). Defilement
// CSS infini (translateX 0 -> -50% sur le contenu double), pause au survol. Chaque
// vignette : photo ou video, voile d'accent colore. Sens 'left' ou 'right'.

import Image from 'next/image';
import { useEffect, useRef } from 'react';

function Tile({ item, height, accent }) {
  const isVideo = !!item.videoSrc || item.kind === 'video';
  const vref = useRef(null);
  useEffect(() => {
    if (!isVideo) return;
    const v = vref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play?.().catch(() => {}); else v.pause?.(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, [isVideo]);
  return (
    <div className={`relative ${height} aspect-[3/4] shrink-0 rounded-2xl overflow-hidden border border-[#C0C0C0]/12 shadow-[0_16px_36px_-16px_rgba(0,0,0,0.75)]`}>
      {isVideo ? (
        <video ref={vref} muted loop playsInline preload="metadata" poster={item.poster}
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'saturate(1.15) contrast(1.04)' }}>
          <source src={item.videoSrc || item.src} type="video/mp4" />
        </video>
      ) : (
        <Image src={item.src} alt={item.alt || ''} fill sizes="240px" className="object-cover" style={{ filter: 'saturate(1.15) contrast(1.04)' }} />
      )}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(160deg, transparent 45%, ${item.accent || accent}2e 100%)` }} />
      {item.label && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#acb0cd]">{item.label}</span>
        </div>
      )}
    </div>
  );
}

export default function FunMarquee({
  items = [],
  speed = 46,                 // secondes / boucle
  direction = 'left',
  height = 'h-56 md:h-72',
  gap = 'gap-4',
  accent = '#2fd6c4',
}) {
  if (!items.length) return null;
  const doubled = [...items, ...items];
  const anim = direction === 'right' ? 'vibe-marq-r' : 'vibe-marq-l';
  return (
    <div className="vibe-marq relative overflow-hidden">
      <style>{`
        @keyframes vibe-marq-l { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes vibe-marq-r { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .vibe-marq:hover .vibe-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .vibe-track { animation: none !important; } }
      `}</style>
      {/* fondus lateraux */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10" style={{ background: 'linear-gradient(90deg, #26272a, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10" style={{ background: 'linear-gradient(270deg, #26272a, transparent)' }} />
      <div className={`vibe-track flex ${gap} w-max`} style={{ animation: `${anim} ${speed}s linear infinite` }}>
        {doubled.map((item, i) => (
          <Tile key={i} item={item} height={height} accent={accent} />
        ))}
      </div>
    </div>
  );
}
