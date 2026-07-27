'use client';

// CrewHero — le seul endroit de la page ou du texte se pose sur une image, et le
// seul plan avec de l'action humaine. Video paysage >=640px, video portrait en
// dessous. AUCUN voile plein cadre : un unique scrim LOCAL en bas (moitie basse).
// Sous prefers-reduced-motion, les videos sont remplacees par leur poster.
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import CrewReveal from './CrewReveal';
import { useReducedMotion } from './useInView';

export default function CrewHero({
  videoLandscape, posterLandscape,
  videoPortrait, posterPortrait,
  posterAlt,
  kicker, title, lede,
  ctaPrimary, ctaSecondary,
}) {
  const vidL = useRef(null);
  const vidP = useRef(null);
  const reduced = useReducedMotion();

  // Certains navigateurs bloquent l'autoplay tant que .play() n'est pas rappele.
  useEffect(() => {
    if (reduced) return;
    [vidL.current, vidP.current].forEach((v) => { if (v) v.play?.().catch(() => {}); });
  }, [reduced]);

  return (
    <section className="crew-hero">
      {reduced ? (
        // Mouvement reduit : image fixe, aucun media anime.
        <Image
          src={posterLandscape}
          alt={posterAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <>
          {/* Paysage — desktop et tablette */}
          <video
            ref={vidL}
            className="hidden sm:block absolute inset-0 w-full h-full object-cover"
            autoPlay muted loop playsInline preload="metadata"
            poster={posterLandscape}
            aria-label={posterAlt}
          >
            <source src={videoLandscape} type="video/mp4" />
          </video>
          {/* Portrait — mobile (repli sur la paysage si absente) */}
          <video
            ref={vidP}
            className="sm:hidden absolute inset-0 w-full h-full object-cover"
            autoPlay muted loop playsInline preload="metadata"
            poster={posterPortrait || posterLandscape}
            aria-label={posterAlt}
          >
            <source src={videoPortrait || videoLandscape} type="video/mp4" />
          </video>
        </>
      )}

      {/* Scrim LOCAL bas — ne monte jamais au-dessus de la moitie de l'image */}
      <div className="crew-hero__scrim" />

      {/* Bloc de titre cale en bas a gauche, colonnes 2 a 8 */}
      <div className="absolute inset-0 flex items-end" style={{ paddingBottom: '8vh' }}>
        <div className="crew-grid">
          <div className="gc-2-9 crew-txt crew-txt--l" style={{ position: 'relative' }}>
            <CrewReveal as="p" className="crew-label" y={14} duration={1000} delay={80} style={{ marginBottom: '22px' }}>
              {kicker}
            </CrewReveal>
            <CrewReveal as="h1" className="crew-h1" y={20} duration={1100} delay={150}>
              {title}
            </CrewReveal>
            <CrewReveal as="p" className="crew-lede" y={18} duration={1000} delay={320} style={{ marginTop: '26px' }}>
              {lede}
            </CrewReveal>
            <CrewReveal y={16} duration={1000} delay={480} style={{ marginTop: '38px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '26px' }}>
              <a className="crew-btn" href={ctaPrimary.href}>{ctaPrimary.label}</a>
              <a className="crew-link" href={ctaSecondary.href}>{ctaSecondary.label}</a>
            </CrewReveal>
            {/* Un simple filet vertical en guise d'indicateur : ni fleche, ni rebond. */}
            <div className="crew-tick" style={{ marginTop: '42px' }} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
