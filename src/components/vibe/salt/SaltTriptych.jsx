'use client';

// Section 3 — TROIS MINUTES APRES LE MOUILLAGE. Trois videos VERTICALES NATIVES
// cote a cote : on ne les recadre jamais en paysage, c'est leur format d'origine.
// Le titre est pose EN SURIMPRESSION avec mix-blend-mode: difference — un seul
// effet, assume : il passe clair sur l'eau sombre et sombre sur l'ecume.
// Mobile : defilement horizontal avec snap, une video par ecran + indicateur.

import { useRef, useState } from 'react';
import SaltVideo from './SaltVideo';
import SaltReveal from './SaltReveal';
import { useSectionProgress } from './useSalt';

// Ondulation : la colonne du milieu reste fixe, les deux autres se croisent.
const DRIFT = [-28, 0, 28];

export default function SaltTriptych({ data }) {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const progress = useSectionProgress(sectionRef);
  const [active, setActive] = useState(0);

  // Position du snap mobile pour l'indicateur (aucun calcul hors du scroll).
  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const w = el.clientWidth * 0.82 + 2;
    setActive(Math.round(el.scrollLeft / w));
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[var(--sg)] overflow-hidden">
      {/* ── Desktop : trois colonnes de meme largeur, 2px de fond en guise de filet ── */}
      <div className="hidden md:flex w-full h-[100svh] min-h-[620px] gap-[2px]">
        {data.columns.map((col, i) => (
          <SaltReveal
            key={col.src}
            variant="clip"
            delay={i * 90}
            duration={520}
            className="relative flex-1 h-full overflow-hidden"
          >
            <div
              data-parallax
              className="absolute inset-0 will-change-transform"
              style={{ transform: `translate3d(0, ${(progress - 0.5) * 2 * DRIFT[i]}px, 0) scale(1.06)` }}
            >
              <SaltVideo
                src={col.src}
                poster={col.poster}
                label={col.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {/* Scrim LOCAL sur le seul tiers bas qui porte le label. */}
            <div className="salt-scrim-s absolute inset-0 pointer-events-none" />
            <p className="salt-mono salt-mono--data absolute left-5 bottom-6 z-10">{col.label}</p>
          </SaltReveal>
        ))}
      </div>

      {/* ── Mobile : une video par ecran, snap, format vertical respecte ── */}
      <div
        ref={railRef}
        onScroll={onScroll}
        className="salt-rail md:hidden flex gap-[2px] overflow-x-auto snap-x snap-mandatory"
      >
        {data.columns.map((col) => (
          <div
            key={col.src}
            className="relative shrink-0 snap-center w-[82vw] aspect-[9/16] overflow-hidden"
          >
            <SaltVideo
              src={col.src}
              poster={col.poster}
              label={col.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="salt-scrim-s absolute inset-0 pointer-events-none" />
            <p className="salt-mono salt-mono--data absolute left-4 bottom-5 z-10">{col.label}</p>
          </div>
        ))}
      </div>
      <div className="md:hidden flex gap-2 px-[5vw] mt-4" aria-hidden="true">
        {data.columns.map((col, i) => (
          <span
            key={col.src}
            className="h-[2px] flex-1 transition-opacity duration-300"
            style={{ background: 'var(--sc)', opacity: i === active ? 1 : 0.28 }}
          />
        ))}
      </div>

      {/* Titre en surimpression, cale au centre vertical des colonnes.
          pointer-events-none : il ne doit jamais bloquer le scroll du rail. */}
      <div className="md:absolute md:inset-0 md:flex md:items-center md:pointer-events-none z-20 px-[5vw] py-14 md:py-0">
        <div className="md:mix-blend-difference w-full">
          <h2 className="salt-h2">{data.h2}</h2>
          <p className="salt-lead mt-5">{data.lead}</p>
        </div>
      </div>
    </section>
  );
}
