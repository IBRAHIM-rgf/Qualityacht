'use client';

// Cases des regions Indian Ocean (client 2026-11-09), comme les cases North America :
// meme carte (DestCard), chaque case ouvre la page de sa region.
import { CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';
import MosaicCards from '../_shared/MosaicCards';
import { IO_GROUPS, IO_CARD_PHOTO } from './indianOceanGroups';

export default function IndianOceanRegionCards({ linkBase = '/charters/destinations/indian-ocean' }) {
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="Explore" title="Indian Ocean" />
          {/* Variante 7B (client 2026-11-19) : carre, rectangle, carre / 4 carres. */}
          <MosaicCards cols={4} wide={[1]} cards={IO_GROUPS.map((g) => ({
            name: g.name, image: g.photoFiltered || g.photo || IO_CARD_PHOTO, imageOld: g.photo || IO_CARD_PHOTO, href: `${linkBase}/${g.slug}`,
          }))} />
        </div>
      </CloudSection>
    </>
  );
}
