// ══ /charters/pet-friendly/bahamas ══
// Page Pet-Friendly Bahamas (client 2026-10-01) : uniquement le hero et les
// 2 sections avec les 3 photos du client (deplaces depuis /charters/pet-friendly),
// titre adapte aux Bahamas, meme presentation que la page Pet-Friendly Caraibes.
import PetFriendlyIntro from '../PetFriendlyIntro';

export const metadata = {
  title: 'Pet-Friendly Charter — The Bahamas | Qualityacht',
};

export default function PetFriendlyBahamasPage() {
  return (
    <main className="bg-[#26272a]">
      <PetFriendlyIntro
        kicker="Pet-Friendly Charter"
        title="The Bahamas"
        subtitle="Cruising the Islands, Together"
        // Hero du client (2026-10-05).
        heroImage="/media/client/pet-friendly/2026-10-05/hero-sleeping-cat.webp"
        heroAlt="White and tabby cat sleeping on a cushion"
        // Ancienne photo du hero, remise juste sous le hero (client 2026-10-05).
        afterHeroImage={{ src: '/media/client/pet-friendly/2026-10-01/hero-beach-dogs.webp', alt: 'Young man standing in the sea at dusk with two white dogs' }}
      />
    </main>
  );
}
