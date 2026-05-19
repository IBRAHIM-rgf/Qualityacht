'use client';

import SubRegionPage from '@/components/destinations/SubRegionPage';

const HERO_ISLANDS = [
  'Nassau',
  'Exumas',
  'Abacos',
  'Eleuthera',
  'Harbour Island',
];

const DESTINATIONS_DROPDOWN = [
  { value: 'bahamas',     label: 'All Bahamas' },
  { value: 'nassau',      label: 'Nassau & New Providence' },
  { value: 'exumas',      label: 'Exumas' },
  { value: 'abacos',      label: 'Abacos' },
  { value: 'eleuthera',   label: 'Eleuthera & Harbour Island' },
];

function ShortDescription() {
  return (
    <>
      <h2 className="trajan-regular text-lg md:text-2xl text-[#acb0cd] leading-snug">
        The Ultimate Yacht Charter Guide to the{' '}
        <span style={{ color: '#d39478' }}>Bahamas</span>:{' '}
        700 Islands of Pure Caribbean Paradise
      </h2>

      <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
        The <span style={{ color: '#d39478' }}>Bahamas</span>—an archipelago of{' '}
        <span style={{ color: '#d39478' }}>700 islands</span> and over{' '}
        <span style={{ color: '#d39478' }}>2,400 cays</span> stretching from
        the coast of Florida — define the very idea of a{' '}
        <span style={{ color: '#d39478' }}>tropical yacht charter</span>: crystal-clear waters, powder-white sand and
        the closest superyacht playground to the United States.
      </p>
    </>
  );
}

function LongDescription() {
  return (
    <>
      <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
        Whether you crave the cosmopolitan energy of{' '}
        <span style={{ color: '#d39478' }}>Nassau</span>, the secluded sandbars of the{' '}
        <span style={{ color: '#d39478' }}>Exumas</span>, or the historic loyalist villages of the{' '}
        <span style={{ color: '#d39478' }}>Abacos</span>, the Bahamas deliver the perfect blend of accessibility,
        privacy and natural beauty.
      </p>

      <div>
        <h3 className="trajan-regular text-sm md:text-base uppercase tracking-[0.2em] text-[#acb0cd] mb-3">
          The World&rsquo;s Clearest Waters
        </h3>
        <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
          Drop anchor in the legendary{' '}
          <span style={{ color: '#d39478' }}>Exuma Cays Land &amp; Sea Park</span>, swim with the famous{' '}
          <span style={{ color: '#d39478' }}>pigs of Big Major Cay</span>, snorkel the{' '}
          <span style={{ color: '#d39478' }}>Thunderball Grotto</span>, or stroll the iconic{' '}
          <span style={{ color: '#d39478' }}>pink sand beaches</span> of Harbour Island —
          experiences that exist nowhere else.
        </p>
      </div>

      <div>
        <h3 className="trajan-regular text-sm md:text-base uppercase tracking-[0.2em] text-[#acb0cd] mb-3">
          A Year-Round Destination
        </h3>
        <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
          Sheltered from the Atlantic by Florida and protected by reefs, the Bahamas offer{' '}
          <span style={{ color: '#d39478' }}>over 320 days of sunshine per year</span> and a calm sailing season that
          extends well beyond the traditional Caribbean window. Ideal for a winter escape or a spring family adventure.
        </p>
      </div>

      <p className="text-sm md:text-base italic text-[#acb0cd]/70">
        Ready to discover the Caribbean&rsquo;s most photographed waters? Your charter awaits.
      </p>
    </>
  );
}

export default function BahamasClient({ yachts, totalYachts }) {
  return (
    <SubRegionPage
      title="Bahamas"
      heroImage="/images/destinations/animals/Bahamas.jpg"
      heroIslands={HERO_ISLANDS}
      shortDescription={<ShortDescription />}
      longDescription={<LongDescription />}
      fleetTitle="Yachts in the Bahamas"
      yachts={yachts}
      destinationsDropdown={DESTINATIONS_DROPDOWN}
      defaultDestinationValue="bahamas"
    />
  );
}
