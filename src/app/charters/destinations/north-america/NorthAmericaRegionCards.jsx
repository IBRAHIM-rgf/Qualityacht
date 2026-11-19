'use client';

// Cases des regions North America (client 2026-10-15), comme les cases « Bahamas
// Islands » : meme carte (DestCard), chaque case ouvre la page de sa region.
import { CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';
import MosaicCards from '../_shared/MosaicCards';
import { NA_GROUPS, NA_CARD_PHOTO } from './northAmericaGroups';

export default function NorthAmericaRegionCards({ linkBase = '/charters/destinations/north-america' }) {
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="Explore" title="North America Regions" />
          {/* Variante 5B (client 2026-11-19) : rectangle a gauche + carre / 3 carres. */}
          <MosaicCards cols={3} wide={[0]} cards={NA_GROUPS.map((g) => ({
            name: g.name, image: g.photoFiltered || g.photo || NA_CARD_PHOTO, imageOld: g.photo || NA_CARD_PHOTO, href: `${linkBase}/${g.slug}`,
          }))} />
        </div>
      </CloudSection>
    </>
  );
}
