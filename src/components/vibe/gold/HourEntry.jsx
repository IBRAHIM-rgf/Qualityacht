'use client';

// ══ Section 7 — une entree d'horaire ═══════════════════════════════════════════
// Le seul moment ou la page montre plusieurs images ensemble, et elle le fait en
// HORAIRE, pas en grille de cartes : entrees empilees verticalement, alternees
// gauche / droite, 14rem d'air entre chacune. Aucun cadre, aucune ombre portee,
// aucun fond de carte, aucun arrondi — juste l'image et le texte dans le vide.
// L'image demarre a scale 1.04 et se pose a 1.00 : un "settle", pas un zoom.

import Image from 'next/image';
import Reveal from './Reveal';

export default function HourEntry({ time, title, text, src, alt, flip = false }) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end gap-8 md:gap-14 ${
        flip ? 'md:flex-row-reverse' : ''
      }`}
    >
      <Reveal
        y={32}
        scaleFrom={1.04}
        duration={1400}
        threshold={0.2}
        className="relative w-[88vw] md:w-[62vw] max-w-[620px] shrink-0"
      >
        <div className="relative w-full" style={{ aspectRatio: '3 / 4' }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 88vw, 620px"
            quality={86}
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal y={32} duration={1400} threshold={0.2} className="md:pb-3">
        <span className="gh-kicker block">{time}</span>
        <h3
          className="gh-serif gh-italic mt-4"
          style={{ fontSize: '1.5rem', lineHeight: 1.2, fontWeight: 400 }}
        >
          {title}
        </h3>
        <p className="gh-body mt-4 max-w-[32ch]">{text}</p>
      </Reveal>
    </div>
  );
}
