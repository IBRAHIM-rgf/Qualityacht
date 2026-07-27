'use client';

// Section 7 — LE COFFRE A JOUETS. On passe du reve a l'inventaire : ce qu'il y
// a a bord et ce que ca fait, avec des SPECS et pas des promesses. Damier de
// hauteurs inegales (62/44 puis 44/62 svh) pour casser l'effet catalogue.
// Photos non filtrees, coins droits (SALT est dur), bordure turquoise qui
// s'allume au survol ET au focus clavier.

import Image from 'next/image';
import SaltReveal from './SaltReveal';

const HEIGHTS = ['md:h-[62svh]', 'md:h-[44svh]', 'md:h-[44svh]', 'md:h-[62svh]'];

function Card({ card, index }) {
  return (
    <SaltReveal
      variant="up"
      delay={index * 80}
      duration={400}
      className={`salt-card relative h-[52svh] ${HEIGHTS[index] || 'md:h-[52svh]'} overflow-hidden`}
    >
      <Image
        src={card.src}
        alt={card.alt}
        fill
        quality={86}
        sizes="(max-width: 768px) 100vw, 46vw"
        className="salt-card__img object-cover"
      />
      {/* Scrim LOCAL sur le seul bandeau bas qui porte le texte. */}
      <div className="salt-scrim-s absolute inset-0 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
        <h4 className="salt-h4">{card.title}</h4>
        <p className="salt-mono salt-mono--data mt-2 max-w-[38ch]">{card.spec}</p>
      </div>
    </SaltReveal>
  );
}

export default function SaltToybox({ data }) {
  return (
    <section className="relative w-full bg-[var(--sg)] py-14 md:py-20">
      <div className="px-[5vw] flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
        <h3 className="salt-h3 max-w-[22ch]">{data.h3}</h3>
        <p className="salt-body md:text-right md:max-w-[42ch]">{data.lead}</p>
      </div>

      <div className="px-[5vw] grid grid-cols-1 md:grid-cols-2 gap-[2px] md:items-start">
        {data.cards.map((card, i) => (
          <Card key={card.src} card={card} index={i} />
        ))}
      </div>

      {/* Carte pleine largeur optionnelle (utilisee par la version Halal pour
          l'argument du pont prive, qui merite une ligne a lui seul). */}
      {data.wide && (
        <SaltReveal variant="up" delay={240} duration={400} className="px-[5vw] mt-[2px]">
          <div className="salt-card flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 p-5 md:p-6 bg-[var(--sg2)]">
            <h4 className="salt-h4 shrink-0">{data.wide.title}</h4>
            <p className="salt-mono salt-mono--data">{data.wide.spec}</p>
          </div>
        </SaltReveal>
      )}
    </section>
  );
}
