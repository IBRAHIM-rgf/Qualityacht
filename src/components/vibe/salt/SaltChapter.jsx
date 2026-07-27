'use client';

// Chapitres video plein cadre (sections 4 et 6). La video n'est pas un decor,
// c'est le contenu : on ne la voile jamais entierement, le scrim reste LOCAL et
// colle au texte. Deux variantes :
//   align="bottom" + sticky : la video reste collee, le bloc texte la traverse
//     (chapitre 02, dauphins) et la video decelere de scale 1.06 -> 1.00.
//   align="top" + route : titre cale en haut (rupture de rythme) et bande de
//     route en bas qui se dessine de gauche a droite comme un trace de cap.

import { useRef } from 'react';
import SaltVideo from './SaltVideo';
import SaltReveal from './SaltReveal';
import { useSectionProgress } from './useSalt';

// Scrim voyageur : il accompagne le bloc de texte au lieu d'assombrir le cadre.
const TRAVELING_SCRIM =
  'linear-gradient(to top, rgba(11,26,30,0.94) 0%, rgba(11,26,30,0.80) 45%, rgba(11,26,30,0) 100%)';

export default function SaltChapter({ data }) {
  const sectionRef = useRef(null);
  const progress = useSectionProgress(sectionRef);
  const sticky = data.sticky === true;

  // Sticky : la video freine en arrivant (1.06 -> 1.00).
  // Sinon : simple parallax vertical de 0 a 10%.
  const videoStyle = sticky
    ? { transform: `scale(${(1.06 - progress * 0.06).toFixed(4)})` }
    : { transform: `translate3d(0, ${(progress * 10).toFixed(2)}%, 0) scale(1.12)` };

  const Media = (
    <>
      <div data-parallax className="absolute inset-0 will-change-transform" style={videoStyle}>
        <SaltVideo
          src={data.video}
          poster={data.poster}
          label={data.alt}
          className={`absolute inset-0 w-full h-full object-cover ${data.videoPortrait ? 'hidden sm:block' : ''}`}
        />
        {data.videoPortrait && (
          <SaltVideo
            src={data.videoPortrait}
            poster={data.posterPortrait}
            label={data.alt}
            className="sm:hidden absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      {/* Numero de chapitre geant et translucide — derive lentement en Y. */}
      <span
        data-parallax
        className="salt-mono absolute right-[5vw] top-[8svh] z-10 select-none pointer-events-none"
        style={{
          color: 'rgba(47,214,196,0.22)',
          fontSize: 'clamp(2.6rem, 9vw, 9rem)',
          letterSpacing: '0.04em',
          transform: `translate3d(0, ${(24 - progress * 48).toFixed(1)}px, 0)`,
        }}
        aria-hidden="true"
      >
        {data.number}
      </span>
    </>
  );

  // ── Variante sticky : le texte scrolle PAR-DESSUS une video immobile ───────
  if (sticky) {
    return (
      <section ref={sectionRef} className="relative w-full h-[150svh] bg-[var(--sg)]">
        <div className="sticky top-0 h-[92svh] w-full overflow-hidden">{Media}</div>
        <div className="relative z-10 h-[150svh] -mt-[150svh] flex items-end pointer-events-none">
          <div
            className="w-full px-[5vw] pt-24 pb-[10svh] pointer-events-auto"
            style={{ background: TRAVELING_SCRIM }}
          >
            <SaltReveal variant="up" duration={480}>
              <h2 className="salt-h2 max-w-[18ch]">{data.h2}</h2>
              <p className="salt-lead mt-6">{data.lead}</p>
            </SaltReveal>
          </div>
        </div>
      </section>
    );
  }

  // ── Variante haute : titre en haut, bande de route en bas ─────────────────
  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[620px] overflow-hidden bg-[var(--sg)]"
    >
      {Media}
      <div className="salt-scrim-t absolute inset-0 pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col justify-between px-[5vw] py-[7svh]">
        <SaltReveal variant="down" duration={460} className="max-w-[22ch]">
          <p className="salt-mono salt-mono--data mb-4">{data.number}</p>
          <h2 className="salt-h2">{data.h2}</h2>
          <p className="salt-lead mt-6">{data.lead}</p>
        </SaltReveal>

        {data.route && (
          <SaltReveal variant="wipe" duration={600} className="w-full">
            <span className="salt-rule mb-3 block" />
            <p
              className="salt-mono salt-mono--data whitespace-nowrap overflow-x-auto salt-rail pb-1"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {data.route}
            </p>
          </SaltReveal>
        )}
      </div>
    </section>
  );
}
