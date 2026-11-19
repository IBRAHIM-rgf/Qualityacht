'use client';

// Cases « Arctic » (client 2026-11-19) : 14 destinations, dans l'ordre du client,
// 2 blocs sans case vide : 7B (carre, rectangle, carre / 4 carres) puis
// 7F (4 carres / 2 carres + rectangle a droite).
// Image filtree au repos, image reelle au survol (comme Indian Ocean).
// Chaque case ouvre sa page de region (client 2026-11-19).
import { CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';
import MosaicCards from '../_shared/MosaicCards';
import { ARCTIC_GROUPS, ARCTIC_CARD_PHOTO } from './arcticGroups';

const CARDS = ARCTIC_GROUPS.map((g) => ({
  name: g.name, image: g.photoFiltered || g.photo || ARCTIC_CARD_PHOTO, imageOld: g.photo || ARCTIC_CARD_PHOTO,
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
          <div className="space-y-px">
            <MosaicCards cols={4} wide={[1]} cards={CARDS.slice(0, 7)} />
            <MosaicCards cols={4} wide={[6]} cards={CARDS.slice(7)} offset={7} />
          </div>
        </div>
      </CloudSection>
    </>
  );
}
