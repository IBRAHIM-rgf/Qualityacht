'use client';

// ══ CocomerBand — bandeau VIDEO qui remplace l'ancienne photo "cocomer" ══
// L'ancienne cocomer.jpeg (palette en bois au centre) a ete jugee mauvaise et remplacee
// PARTOUT par la video beach-band.mp4 (plage turquoise, 16:9). Boucle muette, filtre
// gris/desature au repos -> coloree revelee au scroll (meme effet que les BandeauPhoto).
// Autonome (gere sa propre revelation), donc branchable dans n'importe quelle page.
// Palette Qualityacht — JAMAIS de blanc.

import { useEffect, useRef, useState } from 'react';

const VIDEO = '/media/quality/beach/beach-band.mp4';

export default function CocomerBand({
  aspect = '1920 / 1080',
  full = true,
  heightClass = 'h-[45vh] md:h-[70vh]',
  restCls = 'brightness-[0.72] saturate-[0.6]',
  litCls = 'brightness-[0.78] saturate-[1.02]',
}) {
  const ref = useRef(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setLit(true); io.disconnect(); } }),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // TOUJOURS au ratio de la video (16:9 par defaut) : la video remplit le cadre sans
  // jamais etre zoomee/rognee. Les props full/heightClass sont ignorees (compat) — un
  // cadre a hauteur fixe zoomait la video, ce qu'on ne veut plus nulle part.
  return (
    <div
      ref={ref}
      className="relative overflow-hidden w-full bg-[#26272a]"
      style={{ aspectRatio: aspect }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={VIDEO}
        autoPlay muted loop playsInline
        className={`absolute inset-0 w-full h-full object-cover ease-[cubic-bezier(0.4,0,0.2,1)] ${lit ? litCls : restCls}`}
        style={{ objectPosition: 'center', transitionProperty: 'filter', transitionDuration: '2500ms', transitionDelay: lit ? '1200ms' : '0ms' }}
      />
    </div>
  );
}
