import Image from 'next/image';
import Link from 'next/link';
import CaribbeanExplore from '../../components/CaribbeanExplore';

export const metadata = {
  title: 'Superyacht Horses & Racing 2027 — Caribbean Private Guide | Qualityacht',
  description:
    'A private client guide to riding and racing across 48 Caribbean islands in 2027: 8 official racing events, 5 seasonal circuits, and curated equestrian experiences coordinated by concierge.',
};

const stats = [
  { value: '48', label: 'Islands covered' },
  { value: '8', label: 'Racing events' },
  { value: '5', label: 'Seasonal circuits' },
];

const circuits = [
  {
    letter: 'A',
    dates: 'Jan–Mar',
    name: 'Grand Prix des Caraïbes',
    distance: '~1,200 nm',
    route: 'Turks & Caicos → Puerto Rico → USVI → Barbados Gold Cup → Antigua',
  },
  {
    letter: 'B',
    dates: 'Apr–May',
    name: 'Leewards Loop',
    distance: '~800 nm',
    route: 'St Barth → Anguilla → St Martin → St Kitts → Montserrat → Guadeloupe',
  },
  {
    letter: 'C',
    dates: 'May–Jun',
    name: 'ABC Islands & Cayman',
    distance: '~1,500 nm',
    route: 'Aruba → Bonaire → Curaçao → Grand Cayman → Jamaica',
  },
  {
    letter: 'D',
    dates: 'Aug–Oct',
    name: 'Windwards & Grenadines',
    distance: '~900 nm',
    route: 'Martinique (Aug 15) → Dominica → St Lucia → Grenadines → Trinidad Derby → Grenada',
  },
  {
    letter: 'E',
    dates: 'Nov–Jan',
    name: 'Grand Prestige Year-End',
    distance: '~1,800 nm',
    route: 'BVI → Antigua Charter Show → St Barth NYE → Jamaica Diamond Mile → Barbados',
  },
];

const regions = [
  {
    name: 'Greater Antilles',
    photo: '/images/destinations/gretar antilles-original.jpg',
    islands: [
      {
        name: 'Cuba (Havana · Viñales)',
        riding: 'Viñales Valley UNESCO — mogotes, tobacco, coffee (4h). Cayo Largo beach rides.',
        racing: 'Clásico del Caribe (Dec) — verify US regulations 2027.',
        season: 'Nov–Apr',
      },
      {
        name: 'Puerto Rico (Canóvanas · San Juan)',
        riding: 'Coastal riding, Vieques & Culebra.',
        racing: 'Hipódromo Camarero (Wed–Sun); Clásico del Caribe (Dec).',
        season: 'Nov–Apr',
      },
      {
        name: 'Jamaica (Kingston · Montego Bay)',
        riding: 'Private stables, Blue Mountains.',
        racing: 'Caymanas Park — Triple Crown; Diamond Mile (Nov); Boxing Day (Dec 26).',
        season: 'Nov–Jul',
      },
    ],
  },
  {
    name: 'Turks & Caicos',
    photo: '/images/destinations/Turks and Caicos-original.jpg',
    islands: [
      {
        name: 'Providenciales (Turks & Caicos)',
        riding: 'Provo Ponies (20 yrs), Long Bay Beach, swimming in the sea.',
        racing: '—',
        season: 'Dec–Aug',
      },
      {
        name: 'Grand Turk (Turks & Caicos)',
        riding: 'Beach & surf-side rides, Atlantic-facing beaches.',
        racing: '—',
        season: 'Nov–Apr',
      },
      {
        name: 'South Caicos (Turks & Caicos)',
        riding: 'Riding on pristine, untouched beaches.',
        racing: '—',
        season: 'Nov–Apr',
      },
      {
        name: 'West Caicos (Turks & Caicos)',
        riding: 'Near-deserted beaches, private riding.',
        racing: '—',
        season: 'Nov–Apr',
      },
    ],
  },
  {
    name: 'Cayman Islands',
    photo: '/images/destinations/Cayman Islands-original.jpg',
    islands: [
      {
        name: 'Grand Cayman (West Bay · George Town)',
        riding:
          "Cayman Horse Riding (30 yrs, Barker's Beach, sea swims). Pampered Ponies (moonlight rides). Equestrian Center (dressage).",
        racing: '—',
        season: 'Nov–Apr',
      },
      {
        name: 'Cayman Brac (Stake Bay)',
        riding: 'Riding along limestone cliffs; marine caves, unique landscape.',
        racing: '—',
        season: 'Nov–Apr',
      },
      {
        name: 'Little Cayman',
        riding: 'Private rides on a near-deserted island (fewer than 200 residents).',
        racing: '—',
        season: 'Nov–Apr',
      },
    ],
  },
  {
    name: 'Leeward Islands',
    photo: '/images/destinations/Leeward Islands-original.jpg',
    islands: [
      {
        name: 'Anguilla',
        riding: 'Beach rides — Shoal Bay, Meads Bay. Belmond Cap Juluca.',
        racing: '—',
        season: 'Nov–Apr',
      },
      {
        name: 'St Martin / St Maarten',
        riding: 'Coastal riding — Baie Orientale (FR) and the Dutch side.',
        racing: 'Heineken Regatta (Mar).',
        season: 'Nov–Apr',
      },
      {
        name: 'St Barth (Gustavia)',
        riding:
          'Riding through hills and private beaches — Anse du Gouverneur, Grande Saline.',
        racing: 'NYE Dec 31, Gustavia — reserve 18 months ahead.',
        season: 'Dec–Apr',
      },
      {
        name: 'Antigua',
        riding:
          "Horseback at Fort James — 18th-century cannons, views over St John's Harbour, sea swims.",
        racing: 'Antigua Sailing Week (Apr–May); Charter Yacht Show (Dec).',
        season: 'Nov–May',
      },
      {
        name: 'Barbuda (from Antigua)',
        riding: 'Pink-sand beach rides; frigate-bird colony.',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'St Kitts & Nevis',
        riding:
          'Plantation rides through the sugar cane. Four Seasons Nevis private riding.',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'Montserrat',
        riding:
          'Riding in the north only — lunar landscapes, a near-deserted island (southern volcanic exclusion zone).',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'Guadeloupe (+ Les Saintes)',
        riding:
          "Tropical-forest riding in Basse-Terre. Marie-Galante's isolated beaches.",
        racing: '—',
        season: 'Nov–Apr',
      },
    ],
  },
  {
    name: 'British Virgin Islands (BVI)',
    photo: '/images/destinations/The Leeward Antilles-original.jpg',
    islands: [
      {
        name: 'Tortola (Road Town)',
        riding: "Coastal riding — Cane Garden Bay, Apple Bay, Brewer's Bay.",
        racing: 'BVI Spring Regatta (Apr).',
        season: 'Nov–May',
      },
      {
        name: 'Virgin Gorda',
        riding: 'Rides to The Baths (emblematic giant boulders).',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'Jost Van Dyke',
        riding: 'Horseback rides; Soggy Dollar Bar. Tender access from the superyacht.',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'Anegada',
        riding:
          'Riding on isolated beaches; flamingos and lobsters (reef — careful navigation, max draft ~2m).',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'Peter Island',
        riding: 'Exclusive private resort, riding on request.',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'Buck Island (near Tortola)',
        riding: 'Marine reserve — snorkelling (no riding).',
        racing: '—',
        season: 'Nov–May',
      },
    ],
  },
  {
    name: 'US Virgin Islands (USVI)',
    photo: '/images/destinations/The Leeward Antilles-original.jpg',
    islands: [
      {
        name: 'St Thomas',
        riding: 'Coastal riding; professional operators near the marinas.',
        racing: 'St Thomas Regatta (Mar).',
        season: 'Nov–May',
      },
      {
        name: 'St John',
        riding: 'USVI National Park — horse trails; 60% of the island protected.',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'St Croix',
        riding: 'Authentic local equestrian tradition; wild east coast.',
        racing: 'Boxing Day racing (tradition).',
        season: 'Nov–May',
      },
    ],
  },
  {
    name: 'Windward Islands & Grenadines',
    photo: '/images/destinations/the Windward Islands-original.jpg',
    islands: [
      {
        name: 'Martinique',
        riding:
          'Ranch Jack (Trois-Îlets, since 1974). Anse Macabou for experts (gallop level 5).',
        racing: 'Beach Racing, Sainte-Marie — Aug 15, 2027, unique in the world.',
        season: 'Year-round',
      },
      {
        name: 'Dominica (Nature Island)',
        riding:
          'Jungle and mountain rides — primary rainforest, humpback whales.',
        racing: '—',
        season: 'Nov–Jun',
      },
      {
        name: 'St Lucia',
        riding:
          "Holiday Riding Stables (Gros-Islet, 1993). Dore's Riding Stables — Pigeon Point.",
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'St Vincent',
        riding: 'Cleland Equestrian Club — hills and volcanic jungle.',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'Mustique (private island)',
        riding:
          'Mustique Equestrian Centre (five-star) — thoroughbreds and ponies, hills, beach and sea swims.',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'Bequia',
        riding:
          'Riding through hills and beaches; an authentic, little-touristed island.',
        racing: 'Bequia Spring Regatta (Apr).',
        season: 'Nov–May',
      },
      {
        name: 'Canouan',
        riding:
          'Riding at Mandarin Oriental / Raffles — ultra-exclusive resort, golf, private beaches.',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'Tobago Cays (marine reserve)',
        riding:
          'Protected marine park — no riding. Turtles, coral, an exceptional natural anchorage.',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'Grenada (Grand Anse)',
        riding: 'Bonanza Stables — hills and Grand Anse Beach. Carriage rides.',
        racing: 'Grenada Sailing Week (Jan).',
        season: 'Nov–May',
      },
      {
        name: 'Carriacou',
        riding:
          'Riding beaches and hills; an authentic island with a traditional shipyard.',
        racing: '—',
        season: 'Nov–May',
      },
      {
        name: 'Barbados (Bridgetown)',
        riding:
          'Swimming horses at sea (Garrison Savannah); rides along the east and west coasts.',
        racing: 'Sandy Lane Gold Cup (Mar); Barbados Derby (Aug); 25 race days a year.',
        season: 'Year-round',
      },
      {
        name: 'Trinidad (Port of Spain)',
        riding: "Queen's Park Savannah riding; rides in northern Trinidad.",
        racing: 'Trinidad Derby (Sep 24); Santa Rosa racing.',
        season: 'Nov–Jun',
      },
      {
        name: 'Tobago',
        riding: 'Forest trails; wild east-coast beaches.',
        racing: '—',
        season: 'Nov–Jun',
      },
    ],
  },
  {
    name: 'ABC Islands (Aruba · Bonaire · Curaçao)',
    photo: '/images/destinations/The Leeward Antilles-original.jpg',
    islands: [
      {
        name: 'Aruba (outside the cyclone zone)',
        riding:
          'Hoofs of Hope Ranch (40 yrs, multi-site). Gold Mine Ranch. Rancho La Ponderosa.',
        racing: '—',
        season: 'Year-round',
      },
      {
        name: 'Bonaire (marine reserve)',
        riding:
          "Horse Ranch Bonaire — mangroves and turquoise sea; the world's shore-diving capital.",
        racing: '—',
        season: 'Year-round',
      },
      {
        name: 'Curaçao',
        riding: 'Christoffelpark and coastal cliffs. Willemstad UNESCO.',
        racing: '—',
        season: 'Year-round',
      },
    ],
  },
];

export default function CaribbeanHorsesRacingPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* HERO */}
      <section className="relative pt-[70px] md:pt-0 h-[56vh] md:h-[70vh]">
        <Image src="/images/horse/hero_caraibes.png" alt="Horses &amp; Racing — Caribbean" fill priority sizes="100vw" className="object-cover saturate-[1.35] brightness-105" />
        {/* Rehausse le bleu de la mer / vivifie la photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b6fb3]/40 via-[#0b6fb3]/15 to-transparent mix-blend-soft-light" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-[#26272a]/45 to-[#26272a]/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-10 md:pb-14">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
            Caribbean 2027 · Private Client Guide
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            Horses &amp; Racing
          </h1>
          <div className="relative w-28 md:w-36 h-5 mt-3">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <div className="bg-[#26272a] px-6 md:px-14 py-8 border-b border-[#C0C0C0]/10">
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-xl px-3 py-3 text-center"
            >
              <div className="trajan-regular text-xl md:text-2xl font-bold text-[#C0C0C0]">
                {s.value}
              </div>
              <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] text-[#8b90a0]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEASONAL CIRCUITS */}
      <section
        className="px-6 md:px-14 py-14 md:py-20"
        style={{
          backgroundImage: "url('/images/nuagesAncien.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundColor: '#2e2f32',
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <h2 className="trajan-regular text-lg md:text-2xl text-[#C0C0C0] whitespace-nowrap">
            Seasonal Circuits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start justify-items-center">
          {circuits.map((c) => (
            <article
              key={c.dates}
              className="w-full bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-2xl p-5 flex flex-col text-center"
            >
              <div className="mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.14em] text-[#B03E00] border border-[#B03E00]/50">
                  {c.dates}
                </span>
              </div>
              <h3 className="text-[#C0C0C0] font-bold text-[15px] leading-snug mb-1">
                {c.name}
              </h3>
              <p className="text-[12px] text-[#8b90a0] mb-3">{c.distance}</p>
              <p className="text-[#acb0cd] text-[13px] leading-relaxed">{c.route}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ISLANDS BY REGION */}
      <section
        className="px-6 md:px-14 py-14 md:py-20"
        style={{
          backgroundImage: "url('/images/nuagesAncien.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundColor: '#2e2f32',
        }}
      >
        {regions.map((region) => (
          <div key={region.name} className="mb-14 last:mb-0">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h2 className="trajan-regular text-lg md:text-2xl text-[#C0C0C0] whitespace-nowrap">
                {region.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
              {region.islands.map((island) => (
                <article
                  key={island.name}
                  className="bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-2xl overflow-hidden flex flex-col"
                >
                  {/* Photo de region + nom de l'ile en overlay (style regatta) */}
                  <div className="relative h-36 md:h-40 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${encodeURI(region.photo)}')`, opacity: 0.55 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#26272a]/40 via-[#26272a]/25 to-[#26272a]/85" />
                    <span className="absolute top-3 right-3 inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.14em] text-[#B03E00] border border-[#B03E00]/50 bg-[#26272a]/70">
                      {island.season}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center px-4">
                      <h3 className="trajan-regular text-sm md:text-base font-bold uppercase tracking-[0.1em] text-center text-[#C0C0C0] leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                        {island.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[13px] leading-relaxed mb-2">
                      <span className="text-[#c2622a] font-semibold uppercase tracking-[0.08em] text-[11px] mr-2">
                        Riding
                      </span>
                      <span className="text-[#acb0cd]">{island.riding}</span>
                    </p>

                    {island.racing !== '—' && (
                      <p className="text-[13px] leading-relaxed">
                        <span className="text-[#c2622a] font-semibold uppercase tracking-[0.08em] text-[11px] mr-2">
                          Racing
                        </span>
                        <span className="text-[#acb0cd]">{island.racing}</span>
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CLOSING NOTE BAND */}
      <div className="bg-[#1b223d] border-t border-white/10 px-6 md:px-14 py-5">
        <p className="text-[11px] text-[#7a8094] leading-relaxed">
          48 islands · 8 official racing events · 5 seasonal circuits. Riding and
          racing arrangements coordinated on request through your concierge.
        </p>
      </div>

      {/* Sections reprises de caribbean-v15 (a partir de "Explore / Caribbean Islands") :
          Caribbean Islands, Destinations by Region, Popular Destinations, CTA, FAQ + modal carte. */}
      <CaribbeanExplore />
    </div>
  );
}
