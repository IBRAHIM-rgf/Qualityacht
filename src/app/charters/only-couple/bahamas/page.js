// /charters/only-couple/bahamas — page Bahamas du parcours Only Couple (client 2026-10-04),
// sur le modele de /charters/only-couple/carribbean : meme hero (3 videos, titre « The
// Bahamas »), meme bloc « Luxury, Serenity, and Bliss » avec Bahamas a la place de
// Caribbean, puis les sections Bahamas (8 cases, Destinations by Region, Popular
// Destinations, bandeau CTA, FAQ). Les 8 cases ouvrent la page bateaux Only Couple de
// chaque groupe d'iles.

import OnlyCoupleHeroTriptych from '../carribbean/OnlyCoupleHeroTriptych';
import { CloudSection } from '../../destinations/caribbean-v15/CaribbeanV15Base';
import { BahamasIslandsGrid, BahamasDestinationsByRegion, BahamasCtaAndFaq } from '../../destinations/bahamas/BahamasRegions';
import BahamasPopularDestinations from '../../destinations/bahamas/BahamasPopularDestinations';

export const metadata = {
  title: 'Only Couple Charter — The Bahamas | Qualityacht',
};

export default function OnlyCoupleBahamasPage() {
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">
        <OnlyCoupleHeroTriptych title="The Bahamas" />

        {/* ══ DESCRIPTION (variante Only Couple) ══ */}
        <CloudSection className="bg-[#26272a] py-14 md:py-28 px-5 md:px-20" bg="/images/nuagesAncien.png">
          <div className="max-w-3xl mx-auto text-center leading-relaxed space-y-6 md:space-y-8">
            <div>
              <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.12em] text-[#acb0cd] mb-2">
                Bahamas
              </h2>
              <p className="text-lg md:text-2xl text-[#bd9973] italic">
                Luxury, Serenity, and Bliss
              </p>
            </div>
            <p className="text-base md:text-xl text-[#acb0cd] leading-relaxed">
              Discretion is the ultimate luxury. Here, the Bahamas unfolds in{' '}
              <span className="text-[#bd9973] font-semibold">private coves and secluded anchorages</span>,
              where the only witnesses to your escape are the endless horizon and the gentle rhythm of the waves.
              Your yacht, a sanctuary of elegance, blends seamlessly with the turquoise waters&mdash;because
              true exclusivity is found in the{' '}
              <span className="text-[#bd9973] font-semibold">art of going unnoticed</span>.
            </p>
          </div>
        </CloudSection>

        <BahamasIslandsGrid linked linkBase="/charters/only-couple/bahamas" />
        <BahamasDestinationsByRegion />
        <BahamasPopularDestinations />
        <BahamasCtaAndFaq ctaText="Our team of experts is available 24/7 to create your bespoke yachting itinerary across the Bahamas." />
      </div>
    </>
  );
}
