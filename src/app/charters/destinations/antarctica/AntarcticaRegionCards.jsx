'use client';

// Cases « Antarctica » (client 2026-11-17), comme les cases Indian Ocean : meme carte
// (DestCard), image filtree au repos et image coloree au survol. Pas de page de
// region pour l'instant : la case s'eclaire seulement (pas de lien).
import { DestCard, CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';

const C = '/media/client/2026-11-17/antarctica-cards';

const CARDS = [
  { name: 'Antarctica', photo: `${C}/antarctica.webp`, photoFiltered: `${C}/antarctica-filtered.webp` },
  { name: 'Argentina', photo: `${C}/argentina.webp`, photoFiltered: `${C}/argentina-filtered.webp` },
  { name: 'Chile', photo: `${C}/chile.jpg`, photoFiltered: `${C}/chile-filtered.webp` },
];

export default function AntarcticaRegionCards() {
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="Explore" title="Antarctica" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px">
            {CARDS.map((c, i) => (
              <DestCard key={c.name} index={i} name={c.name} image={c.photoFiltered} imageOld={c.photo} />
            ))}
          </div>
        </div>
      </CloudSection>
    </>
  );
}
