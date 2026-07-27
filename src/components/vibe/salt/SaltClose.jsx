'use client';

// Section 10 — DITES-NOUS LA SEMAINE. La decision. UNE seule action, et le SEUL
// point chaud de toute la page : l'orange de marque n'apparait qu'ici, en
// remplissage du bouton au survol/focus. Dix sections de teal avant lui : c'est
// de la rarete traitee comme une ressource. On sort le visiteur sur du concret
// (un delai de reponse chiffre), comme on l'y a fait entrer.
// La derniere image n'est PAS assombrie : elle doit etre eclatante.

import Image from 'next/image';
import SaltReveal from './SaltReveal';

export default function SaltClose({ data }) {
  return (
    <section className="relative w-full bg-[var(--sg2)]">
      <span className="salt-rule" />
      <div className="px-[5vw] pt-14 md:pt-24 pb-12 md:pb-20 md:grid md:grid-cols-12 md:gap-[4vw] md:items-end">
        <div className="md:col-span-8">
          <SaltReveal variant="clip" duration={480}>
            <h2 className="salt-h2 max-w-[16ch]">{data.h2}</h2>
          </SaltReveal>
          <SaltReveal variant="up" delay={90} duration={480}>
            <p className="salt-lead mt-6">{data.lead}</p>
          </SaltReveal>
          <SaltReveal
            variant="scale"
            delay={180}
            duration={480}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a href={data.ctaHref} className="salt-btn">{data.ctaLabel}</a>
            <a href={data.linkHref} className="salt-link">{data.linkLabel}</a>
          </SaltReveal>
          <p className="salt-mono salt-mono--ctx mt-8 max-w-[68ch]">{data.monoLine}</p>
        </div>

        {/* Rappel visuel du hero : la boucle se ferme sur la meme energie. */}
        <SaltReveal
          variant="up"
          delay={220}
          duration={480}
          className="hidden md:block md:col-span-4"
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden border border-[var(--sc)]">
            <Image
              src={data.thumb.src}
              alt={data.thumb.alt}
              fill
              quality={86}
              sizes="30vw"
              className="object-cover"
            />
          </div>
        </SaltReveal>
      </div>

      {/* Bande basse pleine largeur, non voilee : le lagon vide, plein cadre. */}
      <div className="relative w-full h-[34svh] overflow-hidden">
        <Image
          src={data.band.src}
          alt={data.band.alt}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
