'use client';

// ══ Bloc editorial sans image (sections 2, 4, 10) ══════════════════════════════
// Le silence entre les images. Meme colonne, meme gouttiere gauche que le hero :
// la page a UNE colonne de texte qui ne bouge jamais d'un pixel, du hero au CTA final.
// Le vide EST le contenu — d'ou le padding vertical volontairement genereux.

import Reveal from './Reveal';

export default function TextSection({
  ground = 'var(--gh-ground)',
  minHeight = '72svh',
  kicker,
  kickerMuted = false,
  heading,
  light = false,            // H2 en Fraunces 300 (sections 2 et 10) au lieu de 400
  rule = false,             // filet 72px qui se dessine apres le titre
  paragraphs = [],
  children,                 // CTA eventuels
}) {
  return (
    <section
      className="gh-col relative w-full flex items-center py-[clamp(6rem,14vh,12rem)]"
      style={{ background: ground, minHeight }}
    >
      <div className="gh-measure w-full">
        {kicker && (
          <Reveal y={20} duration={1100} threshold={0.25}>
            <span className={`gh-kicker block ${kickerMuted ? 'gh-kicker--mute' : ''}`}>
              {kicker}
            </span>
          </Reveal>
        )}

        {heading && (
          <Reveal y={24} duration={1200} delay={kicker ? 120 : 0} threshold={0.25}>
            <h2 className={`gh-h2 ${kicker ? 'mt-5' : ''}`} style={light ? { fontWeight: 300 } : undefined}>
              {heading}
            </h2>
          </Reveal>
        )}

        {rule && (
          <Reveal y={0} duration={900} delay={260} threshold={0.25}>
            <span aria-hidden className="gh-rule gh-rule--draw mt-8" />
          </Reveal>
        )}

        {paragraphs.map((p, i) => (
          <Reveal key={i} y={24} duration={1200} delay={300 + i * 120} threshold={0.2}>
            <p className="gh-body mt-7">{p}</p>
          </Reveal>
        ))}

        {children && (
          <Reveal y={24} duration={1200} delay={300 + paragraphs.length * 120} threshold={0.2}>
            <div className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-4">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
