'use client';

// Cases des regions North America (client 2026-10-15), comme les cases « Bahamas
// Islands » : meme carte (DestCard), chaque case ouvre la page de sa region.
import { DestCard, CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';
import { NA_GROUPS, NA_CARD_PHOTO } from './northAmericaGroups';

export default function NorthAmericaRegionCards() {
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="Explore" title="North America Regions" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {NA_GROUPS.map((g, i) => (
              <DestCard key={g.slug} index={i} name={g.name} image={NA_CARD_PHOTO} imageOld={NA_CARD_PHOTO}
                href={`/charters/destinations/north-america/${g.slug}`} />
            ))}
          </div>
        </div>
      </CloudSection>
    </>
  );
}
