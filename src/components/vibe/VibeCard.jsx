'use client';

// VibeCard — carte media COLOREE (photo ou video) avec voile d'accent tropical,
// leger boost de saturation (peps), zoom au survol et label/badge optionnels.
// Video : lecture uniquement quand visible (IntersectionObserver) — muted/loop.

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function VibeCard({
  src,                 // image
  videoSrc,            // video (prioritaire si fourni)
  poster,
  alt = '',
  aspect = 'aspect-[4/3]',
  label,
  badge,
  accent = '#2fd6c4',  // turquoise par defaut ; ex corail '#ff7a59'
  className = '',
  imgClass = '',
  sizes = '(max-width: 768px) 90vw, 480px',
  priority = false,
}) {
  const isVideo = !!videoSrc;
  const vref = useRef(null);

  useEffect(() => {
    if (!isVideo) return;
    const v = vref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play?.().catch(() => {});
      else v.pause?.();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [isVideo]);

  return (
    <div className={`group relative ${aspect} w-full overflow-hidden rounded-2xl border border-[#C0C0C0]/15 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.7)] bg-[#26272a] ${className}`}>
      {isVideo ? (
        <video
          ref={vref}
          muted loop playsInline preload="metadata" poster={poster}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] ${imgClass}`}
          style={{ filter: 'saturate(1.14) contrast(1.04)' }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={src} alt={alt} fill sizes={sizes} priority={priority}
          className={`object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] ${imgClass}`}
          style={{ filter: 'saturate(1.14) contrast(1.04)' }}
        />
      )}

      {/* Voile d'accent colore (peps) — s'estompe au survol pour reveler la couleur */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-40 transition-opacity duration-700"
        style={{ background: `linear-gradient(145deg, transparent 42%, ${accent}26 100%)` }}
      />
      {(label || badge) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      )}
      {badge && (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#26272a]/85 border border-[#C0C0C0]/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#acb0cd] backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          {badge}
        </span>
      )}
      {label && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="trajan-regular text-sm md:text-base uppercase tracking-[0.14em] text-[#acb0cd] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">{label}</span>
        </div>
      )}
    </div>
  );
}
