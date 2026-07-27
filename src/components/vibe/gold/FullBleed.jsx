'use client';

// ══ Image plein cadre (sections 3, 5, 8, 9) ════════════════════════════════════
// Une image par ecran, non recadree en carte, sans bordure, sans arrondi, sans ombre :
// elle touche les quatre bords. Le scrim est LOCAL — uniquement la bande basse sous
// laquelle se pose la legende. Le haut de l'image (le visage, la lumiere doree) ne
// recoit STRICTEMENT rien : c'est la correction du point 3 du diagnostic.
// Ken burns tres lent, sans pan lateral (un pan horizontal sur un visage donne le mal
// de mer). Le sens du zoom alterne d'une section a l'autre pour eviter la boucle mecanique.

import Image from 'next/image';
import Reveal from './Reveal';

export default function FullBleed({
  src,
  alt,
  objectPosition = '50% 50%',
  height = '100svh',
  minHeight = 600,
  scrim = 34,               // % de hauteur couverte par le degrade bas
  topScrim = false,         // court voile haut, uniquement si le header passe dessus
  kbDuration = 26,          // secondes
  kbOut = false,            // true : scale(1.06) -> scale(1)
  align = 'left',           // 'left' | 'right' | 'center'
  caption,                  // petites capitales
  line,                     // phrase Fraunces
  lineItalic = false,
  lineSize = '1.5rem',      // section 9 monte a 1.75rem
  padBottom = '9vh',        // section 9 pose sa ligne au tiers bas
  heading,                  // H2 optionnel (section 8)
  body,                     // paragraphe optionnel (section 8)
  priority = false,
}) {
  const alignCls =
    align === 'right'
      ? 'items-end text-right'
      : align === 'center'
        ? 'items-center text-center'
        : 'items-start text-left';

  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--gh-ground)]"
      style={{ height, minHeight: `${minHeight}px` }}
    >
      <div
        className={`gh-kb absolute inset-0 ${kbOut ? 'gh-kb--out' : ''}`}
        style={{ '--gh-kb': `${kbDuration}s` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          quality={88}
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>

      {/* Scrim local bas : il n'existe que pour porter le texte et faire la jointure */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: `${scrim + 8}%`,
          background:
            'linear-gradient(180deg, transparent 0%, rgba(26,21,18,0.72) 70%, #1A1512 100%)',
        }}
      />
      {topScrim && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[12%] pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(26,21,18,0.55), transparent)' }}
        />
      )}

      <div className="gh-col relative z-10 h-full flex flex-col justify-end" style={{ paddingBottom: padBottom }}>
        <div className={`flex flex-col ${alignCls} w-full`}>
          {heading && (
            <Reveal y={20} duration={1200} threshold={0.15}>
              <h2 className="gh-h2 gh-h2--sm max-w-[26ch]">{heading}</h2>
            </Reveal>
          )}
          {caption && (
            <Reveal y={16} duration={1200} delay={heading ? 140 : 0} threshold={0.15}>
              <span className="gh-kicker block mt-5">{caption}</span>
            </Reveal>
          )}
          {line && (
            <Reveal y={16} duration={1300} delay={caption ? 200 : 0} threshold={0.15}>
              <p
                className={`gh-serif mt-4 max-w-[34ch] ${lineItalic ? 'gh-italic' : ''}`}
                style={{ fontSize: lineSize, lineHeight: 1.35 }}
              >
                {line}
              </p>
            </Reveal>
          )}
          {body && (
            <Reveal y={16} duration={1200} delay={260} threshold={0.15}>
              <p className="gh-body mt-5 max-w-[40ch]">{body}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
