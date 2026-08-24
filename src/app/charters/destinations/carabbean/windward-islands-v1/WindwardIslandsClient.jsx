'use client';

import SubRegionPage from '@/components/destinations/SubRegionPage';

const HERO_ISLANDS = [
  'Martinique',
  'St Lucia',
  'Dominica',
  'St Vincent & the Grenadines',
  'Tobago Cays',
  'Grenada',
  'Barbados',
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
        <span style={{ color: '#bd9973' }}>Windward Islands</span>:{' '}
        Where Volcanoes Meet the Sea
      </h2>

      <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
        The <span style={{ color: '#bd9973' }}>Windward Islands</span>—stretching from{' '}
        <span style={{ color: '#bd9973' }}>Martinique</span> down to{' '}
        <span style={{ color: '#bd9973' }}>Grenada</span> and including the legendary{' '}
        <span style={{ color: '#bd9973' }}>Grenadines</span>—are the Caribbean&rsquo;s wildest and most authentic sailing
        ground, blending dramatic <span style={{ color: '#bd9973' }}>volcanic landscapes</span> with vibrant Creole culture.
      </p>
    </>
  );
}

function LongDescription() {
  return (
    <>
      <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
        With <span style={{ color: '#bd9973' }}>steady trade winds</span>, short island hops and an array of unspoiled
        anchorages, the Windwards are widely considered the{' '}
        <span style={{ color: '#bd9973' }}>best sailing region in the Caribbean</span>.
      </p>

      <div>
        <h3 className="trajan-regular text-sm md:text-base uppercase tracking-[0.2em] text-[#acb0cd] mb-3">
          Iconic Anchorages and Hidden Gems
        </h3>
        <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
          From the iconic <span style={{ color: '#bd9973' }}>Pitons of St Lucia</span> rising vertically from the sea,
          to the crystalline waters of <span style={{ color: '#bd9973' }}>Tobago Cays</span> and the exclusive private
          island vibe of <span style={{ color: '#bd9973' }}>Mustique</span> and{' '}
          <span style={{ color: '#bd9973' }}>Bequia</span>, every anchorage tells a different story.
        </p>
      </div>

      <div>
        <h3 className="trajan-regular text-sm md:text-base uppercase tracking-[0.2em] text-[#acb0cd] mb-3">
          Untamed Nature and Living Culture
        </h3>
        <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
          The Windwards remain the Caribbean&rsquo;s last frontier: explore the{' '}
          <span style={{ color: '#bd9973' }}>rainforests of Dominica</span>, the{' '}
          <span style={{ color: '#bd9973' }}>spice plantations of Grenada</span>, the Creole soul of Martinique and the
          coral-rich waters of Barbados — all within a single bareboat or crewed charter week.
        </p>
      </div>

      <p className="text-sm md:text-base italic text-[#acb0cd]/70">
        For sailors who seek the soul of the Caribbean, the Windwards remain unmatched.
      </p>
    </>
  );
}

export default function WindwardIslandsClient({ yachts, totalYachts }) {
  return (
    <SubRegionPage
      title="Windward Islands"
      heroImage="/images/destinations/the Windward Islands-original.jpg"
      heroIslands={HERO_ISLANDS}
      shortDescription={<ShortDescription />}
      longDescription={<LongDescription />}
      fleetTitle="Yachts in the Windward Islands"
      yachts={yachts}
      destinationsDropdown={DESTINATIONS_DROPDOWN}
      defaultDestinationValue="windward-islands"
    />
  );
}
