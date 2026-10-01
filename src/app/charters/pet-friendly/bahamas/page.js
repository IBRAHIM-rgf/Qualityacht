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
      />
    </main>
  );
}
