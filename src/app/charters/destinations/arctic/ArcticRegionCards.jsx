'use client';

// Cases « Arctic » (client 2026-11-19), comme les cases Indian Ocean / Antarctica :
// meme carte (DestCard). 14 cases = 2 blocs de 7 sans case vide (choix du client) :
//  - bloc 1, variante 7B : ligne 1 = carre, rectangle, carre ; ligne 2 = 4 carres ;
//  - bloc 2, variante 7F : ligne 1 = 4 carres ; ligne 2 = 2 carres + rectangle a droite.
// Photo provisoire (image Arctic deja sur le site) en attendant les photos du client.
// Pas de page de region : la case s'eclaire seulement (pas de lien).
import { DestCard, CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';

const PROVISIONAL = '/images/destinations/cards/arctic-card.webp';

const CARDS = [
  'Greenland', 'Svalbard', 'Northern Norway', 'Canadian Arctic', 'Northwest Passage', 'Arctic Alaska', 'Iceland',
  'Jan Mayen', 'North Atlantic Extensions', 'Russian Arctic — Special Enquiry', 'Alaska — Yacht Charter Confirmed',
  'Canada — Yacht Charter Confirmed', 'Arctic Canada — Expedition Only', 'Pacific Northwest–Alaska Corridor',
].map((name) => ({ name, photo: PROVISIONAL, photoFiltered: PROVISIONAL }));

// Index (0-13) des cases en rectangle double largeur : 2e du bloc 1, derniere du bloc 2.
const WIDE = new Set([1, 13]);

function Block({ cards, offset }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px grid-flow-dense md:grid-flow-row">
      {cards.map((c, i) => (
        <div key={c.name} className={WIDE.has(offset + i) ? 'col-span-2' : ''}>
          <DestCard index={offset + i} name={c.name} image={c.photoFiltered} imageOld={c.photo} />
        </div>
      ))}
    </div>
  );
}

export default function ArcticRegionCards() {
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto space-y-px">
          <RevealBlock label="Explore" title="The Arctic" />
          <Block cards={CARDS.slice(0, 7)} offset={0} />
          <Block cards={CARDS.slice(7)} offset={7} />
        </div>
      </CloudSection>
    </>
  );
}
