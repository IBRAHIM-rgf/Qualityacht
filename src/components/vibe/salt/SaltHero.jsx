'use client';

// Section 1 — THE DROP. Zero rampe d'acces : la premiere chose vue est de
// l'action humaine dans l'eau, plein cadre, en mouvement. Aucun voile plein
// cadre, aucun mix-blend, aucun filtre : un SEUL scrim local en bas, sous le
// texte. Le H1 est la des le premier frame (pas de reveal) ; seul le kicker et
// le readout de passerelle montent. La derniere ligne du titre est volontairement
// mordue par le bord droit du cadre (overflow-hidden de la section).

import { useRef } from 'react';
import SaltVideo from './SaltVideo';
import SaltReveal from './SaltReveal';
import { useSectionProgress } from './useSalt';

export default function SaltHero({ data }) {
  const sectionRef = useRef(null);
  const progress = useSectionProgress(sectionRef);
  // Parallax leger : la video descend, le bloc de texte remonte.
  const videoShift = progress * 8;
  const textShift = progress * -4;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[620px] overflow-hidden bg-[var(--sg)]"
    >
      {/* Video paysage a partir de sm: — video PORTRAIT NATIVE en dessous
          (fichier dedie, ce n'est pas un recadrage du paysage). */}
      <div
        data-parallax
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${videoShift}%, 0) scale(1.12)` }}
      >
        <SaltVideo
          eager
          src={data.videoLandscape}
          poster={data.posterLandscape}
          label={data.videoAlt}
          className="hidden sm:block absolute inset-0 w-full h-full object-cover"
        />
        <SaltVideo
          eager
          src={data.videoPortrait}
          poster={data.posterPortrait}
          label={data.videoAlt}
          className="sm:hidden absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Scrim LOCAL bas uniquement : les deux tiers hauts de l'image ne sont
          jamais assombris, le turquoise reste du turquoise. */}
      <div className="salt-scrim-b absolute inset-0 pointer-events-none" />

      {/* Bloc texte cale en bas a GAUCHE — le centrage est un reflexe de brochure. */}
      <div
        data-parallax
        className="relative z-10 h-full flex flex-col justify-end px-[5vw] pb-[7svh] will-change-transform"
        style={{ transform: `translate3d(0, ${textShift}%, 0)` }}
      >
        <SaltReveal variant="up" duration={420} className="salt-mono salt-mono--ctx">
          {data.kicker}
        </SaltReveal>
        <SaltReveal variant="wipe" delay={90} duration={420} className="mt-3 mb-6">
          <span className="salt-rule block w-16" />
        </SaltReveal>

        {/* Pas de reveal sur le H1 : il doit exister au premier frame. */}
        <h1 className="salt-h1 w-[92vw] max-w-none">
          {data.title.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </h1>

        <SaltReveal variant="up" delay={140} duration={460} className="salt-lead mt-7">
          {data.lead}
        </SaltReveal>

        <SaltReveal
          variant="up"
          delay={220}
          duration={460}
          className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          <a href={data.ctaHref} className="salt-btn">{data.ctaLabel}</a>
          <a href={data.linkHref} className="salt-link">{data.linkLabel}</a>
        </SaltReveal>
      </div>

      {/* Readout de passerelle : la donnee concrete plutot que l'adjectif. */}
      <SaltReveal
        variant="up"
        delay={90}
        duration={420}
        className="hidden md:block absolute z-10 right-[5vw] bottom-[7svh] text-right salt-mono salt-mono--data"
      >
        {data.readout.map((line) => (
          <span key={line} className="block" style={{ fontVariantNumeric: 'tabular-nums' }}>{line}</span>
        ))}
      </SaltReveal>
    </section>
  );
}
