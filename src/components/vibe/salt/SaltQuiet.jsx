'use client';

// Section 9 — PUIS LE SILENCE. Apres huit sections d'energie, une seule section
// basse : le sel qui seche, le moteur coupe, le repas. C'est le point
// d'IMMOBILITE de la page — le bandeau video ne recoit AUCUN parallax, et c'est
// ce contraste avec tout le reste qui le rend perceptible. Seule section ou la
// lumiere doree existe : on ne corrige pas la temperature, on la laisse
// cohabiter avec le turquoise.

import Image from 'next/image';
import SaltVideo from './SaltVideo';
import SaltReveal from './SaltReveal';

export default function SaltQuiet({ data }) {
  return (
    <section className="relative w-full bg-[var(--sg)]">
      <div className="relative w-full h-[70svh] overflow-hidden">
        <SaltVideo
          src={data.video}
          poster={data.poster}
          label={data.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <p className="salt-mono salt-mono--data absolute left-[5vw] top-[6svh] z-10">{data.number}</p>
      </div>

      {/* Photos posees en DEBORD sur le bord bas du bandeau : elles mordent la
          video, filet turquoise sur leur bord haut. */}
      <div className="px-[5vw] relative z-10 flex flex-wrap gap-[2px] md:gap-6 -mt-10 md:-mt-[12svh]">
        {data.photos.map((photo, i) => (
          <SaltReveal
            key={photo.src}
            variant="up"
            delay={120 + i * 120}
            duration={560}
            className={i === 0 ? 'w-[58%] md:w-[28vw]' : 'w-[40%] md:w-[20vw] md:self-end'}
          >
            <span className="salt-rule block" />
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                quality={86}
                sizes="(max-width: 768px) 50vw, 28vw"
                className="object-cover"
              />
            </div>
          </SaltReveal>
        ))}
      </div>

      <div className="px-[5vw] py-14 md:py-20 grid md:grid-cols-2 gap-8 md:gap-[8vw]">
        <SaltReveal variant="up" duration={420}>
          <h2 className="salt-h2">{data.h2}</h2>
        </SaltReveal>
        <SaltReveal variant="up" delay={90} duration={420} className="flex flex-col justify-end">
          <p className="salt-lead">{data.lead}</p>
          <p className="salt-mono salt-mono--data mt-6" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {data.monoLine}
          </p>
        </SaltReveal>
      </div>
    </section>
  );
}
