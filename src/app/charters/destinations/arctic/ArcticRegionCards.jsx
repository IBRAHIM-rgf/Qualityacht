'use client';

// Cases « Arctic » (client 2026-11-20) : 7 cases, 4 colonnes, espace 4 px, fond #1a1d21,
// sans case vide. Ligne 1 : Svalbard | Canadian Arctic (rectangle) | Northern Norway ;
// ligne 2 : Northwest Passage | Greenland | Iceland | North Atlantic Extensions.
// Photo floue au repos, reelle au survol, nom en bas a gauche. Telephone : 1 colonne.
// Chaque case ouvre sa page de region.
import { CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';
import MosaicCards from '../_shared/MosaicCards';
import { ARCTIC_GROUPS, ARCTIC_CARD_SLUGS, ARCTIC_CARD_PHOTO } from './arcticGroups';

const CARDS = ARCTIC_CARD_SLUGS.map((slug) => ARCTIC_GROUPS.find((g) => g.slug === slug)).map((g) => ({
  name: g.name, image: g.photoFiltered || ARCTIC_CARD_PHOTO, imageOld: g.photo || ARCTIC_CARD_PHOTO,
  href: `/charters/destinations/arctic/${g.slug}`,
}));

export default function ArcticRegionCards() {
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="Explore" title="The Arctic" />
          <MosaicCards cols={4} wide={[1]} mobileOne gapClass="gap-1" className="bg-[#1a1d21]" cards={CARDS} />
        </div>
      </CloudSection>
    </>
  );
}
