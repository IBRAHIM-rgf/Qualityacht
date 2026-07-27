'use client';

// ══ GOLDEN HOUR — squelette commun aux deux pages (v17 Caraibes et v17 Halal) ══
// Les deux pages partagent EXACTEMENT la meme grammaire visuelle, les memes tokens et
// les memes composants. Ce qui change d'une page a l'autre est le CASTING (les medias)
// et le REGISTRE du copy — jamais la mise en page. Tout arrive par la prop `content`.
//
// Arc en 10 temps : hero video (humains) -> silence -> visage -> texte -> table ->
// dos face aux vagues -> trois heures -> arrivee -> respiration -> demande.
// Cinq sections sont une seule image plein ecran avec dix mots ; trois n'ont aucune
// image, dont la derniere qui porte le CTA sur fond nu. Le vide est le produit.

import GoldStyle from './GoldStyle';
import GoldHero from './GoldHero';
import FullBleed from './FullBleed';
import TextSection from './TextSection';
import ContainFrame from './ContainFrame';
import HourEntry from './HourEntry';
import Reveal from './Reveal';

export default function GoldPage({ fontClass = '', content }) {
  const c = content;

  return (
    <div className={`gh-root ${fontClass}`}>
      <GoldStyle />

      {/* 1 — L'heure. Video d'humains en action, contenu bas/gauche, scrim local. */}
      <GoldHero {...c.hero} />

      {/* 2 — Le standfirst. Aucun media : le silence apres l'image, et la these. */}
      <TextSection
        minHeight="72svh"
        heading={c.standfirst.heading}
        light
        rule
        paragraphs={c.standfirst.paragraphs}
      />

      {/* 3 — Le visage, a pleine echelle et net. L'actif le plus persuasif du stock. */}
      <FullBleed
        src={c.laugh.src}
        alt={c.laugh.alt}
        objectPosition={c.laugh.objectPosition}
        scrim={34}
        kbDuration={26}
        caption={c.laugh.caption}
        line={c.laugh.line}
      />

      {/* 4 — Pourquoi cette heure existe. Des faits physiques, pas des superlatifs. */}
      <TextSection
        ground="var(--gh-ground2)"
        minHeight="64svh"
        kicker={c.editorial.kicker}
        kickerMuted
        heading={c.editorial.heading}
        paragraphs={c.editorial.paragraphs}
      />

      {/* 5 — La table dressee pendant que vous nagez encore. Seule inversion de la page. */}
      <FullBleed
        src={c.table.src}
        alt={c.table.alt}
        objectPosition={c.table.objectPosition}
        scrim={38}
        kbDuration={28}
        kbOut
        align="right"
        caption={c.table.caption}
        line={c.table.line}
        lineItalic
      />

      {/* 6 — De dos, face aux vagues. Personne ne regarde le lecteur : il se projette. */}
      <ContainFrame
        src={c.backs.src}
        alt={c.backs.alt}
        heading={c.backs.heading}
        caption={c.backs.caption}
      />

      {/* 7 — Trois heures, trois images. En horaire, jamais en grille de cartes. */}
      <section className="gh-col relative w-full bg-[var(--gh-ground)] py-[clamp(6rem,14vh,11rem)]">
        <Reveal y={24} duration={1100} threshold={0.25}>
          <span className="gh-kicker gh-kicker--mute block">{c.hours.kicker}</span>
        </Reveal>
        <Reveal y={24} duration={1200} delay={120} threshold={0.25}>
          <h2 className="gh-h2 mt-5 max-w-[20ch]">{c.hours.heading}</h2>
        </Reveal>

        <div className="mt-[clamp(4rem,10vh,8rem)] flex flex-col gap-[clamp(5rem,14vh,14rem)]">
          {c.hours.entries.map((e, i) => (
            <HourEntry key={e.time} {...e} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* 8 — L'objection logistique retiree, glissee juste avant la fin. Plus courte. */}
      <FullBleed
        src={c.arrival.src}
        alt={c.arrival.alt}
        objectPosition={c.arrival.objectPosition}
        height="88svh"
        minHeight={520}
        scrim={40}
        topScrim
        kbDuration={30}
        heading={c.arrival.heading}
        body={c.arrival.body}
      />

      {/* 9 — La respiration. Aucun titre, aucun CTA, une seule ligne centree : c'est
             la seule composition centree de toute la page, et elle en tire sa force. */}
      <FullBleed
        src={c.breath.src}
        alt={c.breath.alt}
        objectPosition="50% 50%"
        scrim={30}
        kbDuration={34}
        kbOut
        align="center"
        line={c.breath.line}
        lineSize="1.75rem"
        padBottom="30svh"
      />

      {/* 10 — La demande. Fond nu apres neuf sections d'images : le geste le plus fort.
              La page se referme exactement sur la gouttiere ou elle s'est ouverte. */}
      <TextSection
        ground="var(--gh-ground2)"
        minHeight="78svh"
        kicker={c.closing.kicker}
        heading={c.closing.heading}
        light
        rule
        paragraphs={c.closing.paragraphs}
      >
        <a className="gh-btn" href={c.closing.ctaPrimary.href}>
          {c.closing.ctaPrimary.label}
        </a>
        <a className="gh-link" href={c.closing.ctaSecondary.href}>
          {c.closing.ctaSecondary.label}
        </a>
      </TextSection>
    </div>
  );
}
