'use client';

// ══ Section 1 — Hero "L'heure" ═════════════════════════════════════════════════
// Poser l'heure et la temperature en trois secondes. Ce n'est pas "un yacht", c'est
// un moment precis de la journee ou des gens sont dans l'eau. Donc video d'HUMAINS,
// jamais un drone vide.
// Trois partis pris contre l'existant :
//   - contenu aligne EN BAS A GAUCHE (le centrage est le reflexe brochure) ;
//   - scrim STRICTEMENT LOCAL sur les 46% inferieurs + un voile lateral court sous la
//     seule colonne de texte : aucun voile plein cadre, aucun mix-blend, aucun filtre ;
//   - pas d'indicateur de scroll qui rebondit : un filet vertical qui se remplit UNE fois.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Reveal from './Reveal';

export default function GoldHero({
  videoLandscape,
  posterLandscape,
  videoPortrait,
  posterPortrait,
  posterAlt,
  kicker,
  title,
  lede,
  ctaPrimary,
  ctaSecondary,
}) {
  const vidL = useRef(null);
  const vidP = useRef(null);
  const [still, setStill] = useState(false); // prefers-reduced-motion -> poster fixe

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setStill(true);
      return;
    }
    // Certains navigateurs bloquent l'autoplay tant que .play() n'est pas rappele.
    [vidL.current, vidP.current].forEach((v) => v?.play?.().catch(() => {}));
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-[var(--gh-ground)]">
      {still ? (
        // Mouvement reduit : on ne charge aucune video, seulement le poster.
        <Image
          src={posterLandscape}
          alt={posterAlt}
          fill
          priority
          sizes="100vw"
          quality={88}
          className="object-cover"
        />
      ) : (
        <>
          {/* Paysage : tablette et desktop */}
          <video
            ref={vidL}
            className="hidden sm:block absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterLandscape}
            aria-label={posterAlt}
          >
            <source src={videoLandscape} type="video/mp4" />
          </video>
          {/* Portrait : mobile — un cadrage vertical dedie, jamais un recadrage force */}
          <video
            ref={vidP}
            className="sm:hidden absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterPortrait || posterLandscape}
            aria-label={posterAlt}
          >
            <source src={videoPortrait || videoLandscape} type="video/mp4" />
          </video>
        </>
      )}

      {/* Scrim LOCAL bas (46%) — le haut de l'image ne recoit strictement rien */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 54%, rgba(26,21,18,0.62) 82%, #1A1512 100%)',
        }}
      />
      {/* Voile lateral court, uniquement sous la colonne de texte */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[58%] w-[78%] md:w-[62%] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(26,21,18,0.55), transparent 42%)' }}
      />

      {/* Contenu : bas / gauche, sur la gouttiere de la colonne unique */}
      {/* pb : 8vh, mais jamais moins que la hauteur du filet de scroll (56px + air) */}
      <div className="gh-col relative z-10 h-full flex flex-col justify-end pb-[max(8vh,84px)]">
        <Reveal y={0} duration={1000} delay={200} threshold={0}>
          <span className="flex items-center gap-4">
            <span
              aria-hidden
              className="block h-px w-10"
              style={{ background: 'var(--gh-accent)' }}
            />
            <span className="gh-kicker">{kicker}</span>
          </span>
        </Reveal>

        <Reveal y={18} duration={1400} delay={350} threshold={0}>
          <h1 className="gh-h1 mt-5 max-w-[22ch]">{title}</h1>
        </Reveal>

        <Reveal y={18} duration={1200} delay={750} threshold={0}>
          <p className="gh-body mt-6 max-w-[46ch]">{lede}</p>
        </Reveal>

        <Reveal y={18} duration={1000} delay={1050} threshold={0}>
          <span className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a className="gh-btn" href={ctaPrimary.href}>
              {ctaPrimary.label}
            </a>
            <a className="gh-link" href={ctaSecondary.href}>
              {ctaSecondary.label}
            </a>
          </span>
        </Reveal>
      </div>

      {/* Filet vertical qui se remplit une seule fois (remplace le scroll qui rebondit) */}
      <span
        aria-hidden
        className="gh-tick absolute left-[clamp(1.25rem,6vw,5.5rem)] bottom-0 block w-px"
        style={{ background: 'var(--gh-accent)' }}
      />
    </section>
  );
}
