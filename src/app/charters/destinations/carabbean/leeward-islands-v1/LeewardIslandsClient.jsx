'use client';

import SubRegionPage from '@/components/destinations/SubRegionPage';

const HERO_ISLANDS = [
  'Anguilla',
  'St-Martin',
  'St-Barth',
  'St-Kitts & Nevis',
  'Antigua & Barbuda',
  'Guadeloupe',
];

const DESTINATIONS_DROPDOWN = [
  { value: 'caribbean',         label: 'All Caribbean' },
  { value: 'greater-antilles',  label: 'Greater Antilles' },
  { value: 'leeward-islands',   label: 'Leeward Islands' },
  { value: 'leeward-antilles',  label: 'Leeward Antilles' },
  { value: 'windward-islands',  label: 'Windward Islands' },
  { value: 'turks-caicos',      label: 'Turks & Caicos' },
  { value: 'trinidad-tobago',   label: 'Trinidad & Tobago' },
  { value: 'grand-cayman',      label: 'Grand Cayman' },
];

function ShortDescription() {
  return (
    <>
      <h2 className="trajan-regular text-lg md:text-2xl text-[#acb0cd] leading-snug">
        The Ultimate Yacht Charter Guide to the{' '}
        <span style={{ color: '#d39478' }}>Leeward Islands</span>:{' '}
        Where Sophistication Meets Untamed Beauty
      </h2>

      <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
        The <span style={{ color: '#d39478' }}>Leeward Islands</span>—the most prestigious archipelago of the Caribbean,
        spanning <span style={{ color: '#d39478' }}>Anguilla, St-Martin, St-Barthélemy</span>,{' '}
        <span style={{ color: '#d39478' }}>Antigua & Barbuda</span> and <span style={{ color: '#d39478' }}>Guadeloupe</span>—
        offer the perfect balance of glamour, seclusion, and natural wonder for a{' '}
        <span style={{ color: '#d39478' }}>luxury yacht charter</span>.
      </p>
    </>
  );
}

function LongDescription() {
  return (
    <>
      <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
        These islands form the most refined cruising ground in the Caribbean, where{' '}
        <span style={{ color: '#d39478' }}>turquoise lagoons</span>,{' '}
        <span style={{ color: '#d39478' }}>private beach clubs</span> and{' '}
        <span style={{ color: '#d39478' }}>exclusive anchorages</span> create the ultimate setting for an unforgettable voyage.
      </p>

      <div>
        <h3 className="trajan-regular text-sm md:text-base uppercase tracking-[0.2em] text-[#acb0cd] mb-3">
          A Sanctuary of Sophistication
        </h3>
        <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
          From the legendary <span style={{ color: '#d39478' }}>shores of St-Barth</span> — playground of yachts owners
          and Michelin-starred chefs — to the <span style={{ color: '#d39478' }}>colonial elegance of English Harbour</span> in
          Antigua, every port delivers a distinct, immersive experience of Caribbean luxury.
        </p>
      </div>

      <div>
        <h3 className="trajan-regular text-sm md:text-base uppercase tracking-[0.2em] text-[#acb0cd] mb-3">
          Wild Beauty and Hidden Coves
        </h3>
        <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
          Beyond the polished marinas lie <span style={{ color: '#d39478' }}>volcanic peaks shrouded in rainforest</span>,
          the <span style={{ color: '#d39478' }}>365 beaches of Antigua</span>, the soufrière of Guadeloupe and the secluded
          coves of Anguilla — landscapes that promise adventure, privacy and the most photographed sunsets in the region.
        </p>
      </div>

      <p className="text-sm md:text-base italic text-[#acb0cd]/70">
        Ready to discover the most coveted islands of the Caribbean? Let&rsquo;s craft your itinerary.
      </p>
    </>
  );
}

export default function LeewardIslandsClient({ yachts, totalYachts }) {
  return (
    <SubRegionPage
      title="Leeward Islands"
      heroImage="/images/destinations/Leeward Islands-original.jpg"
      heroIslands={HERO_ISLANDS}
      shortDescription={<ShortDescription />}
      longDescription={<LongDescription />}
      fleetTitle="Yachts in the Leeward Islands"
      yachts={yachts}
      destinationsDropdown={DESTINATIONS_DROPDOWN}
      defaultDestinationValue="leeward-islands"
    />
  );
}
