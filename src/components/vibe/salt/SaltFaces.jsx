'use client';

// Section 5 — LES VISAGES A GRANDE ECHELLE. C'est le contre-pied exact du
// defile de vignettes de 208px : trois humains, gros, nets, le regard lisible.
// AUCUN scrim sur ces photos — le texte est a COTE, jamais dessus. Aucun zoom
// perpetuel non plus (un zoom lent sur un visage = diaporama funeraire).
// Grille volontairement desequilibree : 5/12 a gauche, 7/12 a droite, et une
// carte flottante a cheval sur la jonction.

import { useRef } from 'react';
import Image from 'next/image';
import SaltReveal from './SaltReveal';
import { useSectionProgress } from './useSalt';

export default function SaltFaces({ data }) {
  const sectionRef = useRef(null);
  const progress = useSectionProgress(sectionRef);
  const [tall, wide, floating] = data.images;

  return (
    <section ref={sectionRef} className="relative w-full bg-[var(--sg)] py-14 md:py-20">
      <div className="px-[5vw] md:grid md:grid-cols-12 md:gap-[2px]">
        {/* Colonne gauche : cadre serre, hauteur pleine — l'image la plus forte. */}
        <SaltReveal
          variant="fromleft"
          duration={440}
          className="relative md:col-span-5 h-[62svh] md:h-[88svh] overflow-hidden"
        >
          <Image
            src={tall.src}
            alt={tall.alt}
            fill
            priority
            quality={88}
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover"
          />
        </SaltReveal>

        {/* Colonne droite : un visage encore plus serre, puis le texte. */}
        <div className="md:col-span-7 flex flex-col gap-[2px] mt-[2px] md:mt-0">
          <SaltReveal
            variant="clip"
            delay={80}
            duration={440}
            className="relative h-[46svh] md:h-[52svh] overflow-hidden"
          >
            <Image
              src={wide.src}
              alt={wide.alt}
              fill
              quality={88}
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover"
            />
          </SaltReveal>

          <SaltReveal
            variant="up"
            delay={120}
            duration={440}
            className="flex-1 flex flex-col justify-end bg-[var(--sg)] pt-10 md:pt-0 md:pl-[11vw] md:pb-4"
          >
            <h3 className="salt-h3 max-w-[20ch]">{data.h3}</h3>
            <p className="salt-body mt-5">{data.lead}</p>
          </SaltReveal>
        </div>
      </div>

      {/* Carte flottante a cheval sur la jonction des deux colonnes.
          Parallax leger (+40px) sur la traversee : elle glisse contre le reste. */}
      {/* Elle mord le bas de l'image de gauche et s'arrete avant le bloc de
          texte : elle straddle la jonction sans jamais recouvrir une ligne. */}
      <div className="px-[5vw] mt-[2px] md:px-0 md:mt-0 md:absolute md:left-[calc(5vw_+_24%)] md:top-[52%] md:z-20 md:w-[22vw]">
        <SaltReveal variant="scale" delay={180} duration={520}>
          {/* Le parallax vit sur un enfant : une transform inline sur l'element
              revele ecraserait le transform du reveal lui-meme. */}
          <div
            data-parallax
            className="will-change-transform"
            style={{ transform: `translate3d(0, ${(progress * 40 - 20).toFixed(1)}px, 0)` }}
          >
            <span className="salt-rule block" />
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src={floating.src}
                alt={floating.alt}
                fill
                quality={88}
                sizes="(max-width: 768px) 100vw, 22vw"
                className="object-cover"
              />
            </div>
            <p className="salt-mono salt-mono--data mt-3">{data.caption}</p>
          </div>
        </SaltReveal>
      </div>
    </section>
  );
}
