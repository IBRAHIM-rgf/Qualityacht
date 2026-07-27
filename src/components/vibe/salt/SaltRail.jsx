'use client';

// Section 8 — CHOISIR OU L'ON SE REVEILLE. Le SEUL defilement horizontal de la
// page, et il est justifie par le contenu : une cote se parcourt lateralement.
// AUCUN visage dedans — le defile de visages est precisement ce qu'on corrige.
// Le rail alterne des photos paysage (recadrage licite) et deux videos
// VERTICALES laissees dans leur ratio 9/16 natif, ce qui casse le rythme.
// Manipulable a la souris (drag), a la molette, au clavier et par deux boutons.

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SaltVideo from './SaltVideo';
import { useRailAutoscroll } from './useSalt';

export default function SaltRail({ data }) {
  const railRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startLeft: 0 });
  const [thumb, setThumb] = useState({ width: 20, left: 0 });
  const { pause, resume } = useRailAutoscroll(railRef, { speed: 26 });

  // Curseur custom : sa largeur reflete la portion visible du rail.
  const syncThumb = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const width = Math.max(8, (el.clientWidth / el.scrollWidth) * 100);
    setThumb({ width, left: max > 0 ? (el.scrollLeft / max) * (100 - width) : 0 });
  }, []);

  useEffect(() => {
    syncThumb();
    window.addEventListener('resize', syncThumb);
    return () => window.removeEventListener('resize', syncThumb);
  }, [syncThumb]);

  const nudge = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
  };

  // Drag souris : l'autoscroll s'arrete NET, pas de ralentissement mou.
  const onPointerDown = (e) => {
    const el = railRef.current;
    if (!el || e.pointerType === 'touch') return;
    dragRef.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    pause();
    el.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    const el = railRef.current;
    if (!el || !dragRef.current.active) return;
    el.scrollLeft = dragRef.current.startLeft - (e.clientX - dragRef.current.startX);
  };
  const endDrag = () => { dragRef.current.active = false; };

  return (
    <section
      className="relative w-full bg-[var(--sg)] py-14 md:py-20"
      aria-labelledby="salt-rail-title"
    >
      <div className="px-[5vw] flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <h3 id="salt-rail-title" className="salt-h3 max-w-[20ch]">{data.h3}</h3>
        <p className="salt-body md:text-right md:max-w-[44ch]">{data.lead}</p>
      </div>

      <div
        ref={railRef}
        role="region"
        aria-label={data.h3}
        tabIndex={0}
        onScroll={syncThumb}
        onMouseEnter={pause}
        onMouseLeave={() => { endDrag(); resume(); }}
        onFocus={pause}
        onBlur={resume}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
        }}
        className="salt-rail flex gap-[2px] overflow-x-auto pl-[5vw] pr-[5vw] cursor-grab active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--sc)]"
      >
        {data.items.map((item) => (
          <figure
            key={item.src}
            className={`relative shrink-0 h-[52svh] md:h-[64svh] ${
              item.kind === 'video' ? 'w-[52vw] md:w-[22vw]' : 'w-[78vw] md:w-[34vw]'
            }`}
          >
            {item.kind === 'video' ? (
              <SaltVideo
                src={item.src}
                poster={item.poster}
                label={item.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                quality={86}
                sizes="(max-width: 768px) 78vw, 34vw"
                className="object-cover select-none"
                draggable={false}
              />
            )}
            {/* Bloc d'identification en haut a gauche : nom, profondeur, fond. */}
            <figcaption className="absolute left-4 top-4 z-10 pr-4">
              <span className="salt-mono salt-mono--data block bg-[rgba(11,26,30,0.72)] px-2 py-1">
                {item.name}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Piste + curseur turquoise, en remplacement de la scrollbar native. */}
      <div className="px-[5vw] mt-6 flex items-center gap-4">
        <div className="relative h-[2px] flex-1 bg-[var(--sg2)]" aria-hidden="true">
          <span
            className="absolute top-0 h-full bg-[var(--sc)] transition-[left] duration-150 ease-linear"
            style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => nudge(-1)} className="salt-nav" aria-label="Previous anchorages">‹</button>
          <button type="button" onClick={() => nudge(1)} className="salt-nav" aria-label="Next anchorages">›</button>
        </div>
      </div>
    </section>
  );
}
