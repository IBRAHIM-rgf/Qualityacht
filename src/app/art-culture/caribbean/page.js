import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Art & Culture — Caribbean 2026 | Qualityacht',
  description:
    'A curated, ultra-premium reference to the finest museums, galleries, exhibitions, and iconic cultural sites across the Caribbean for 2026.',
};

const islands = [
  {
    island: 'St-Barth',
    venues: [
      {
        type: 'Exhibition',
        name: "Jean-Michel Othoniel — 'Beauty Saves the World'",
        signature: true,
        desc: "Some twenty previously unseen works — blown-glass sculptures, suspended installations, lithographs. A sensory journey conceived specifically for the island's natural landscape. A rare and entirely exclusive moment.",
      },
      {
        type: 'Gallery',
        name: 'Space Gallery — Gustavia',
        signature: true,
        desc: "The island's preeminent reference in Gustavia's Carré d'Or, with an outpost in SoHo, New York. Emerging and established artists, private viewings by appointment.",
      },
      {
        type: 'Exhibition',
        name: 'St Barth Art Week — November',
        signature: true,
        desc: 'Private openings, ephemeral installations in private villas and select venues across Gustavia. A confidential and highly curated event, reserved for collectors and initiates.',
      },
      {
        type: 'Exhibition',
        name: 'St Barth Photo Festival — Nov./Dec.',
        signature: true,
        desc: "The world's leading fashion photographers exhibit across the island's five-star hotels. Evening openings, solo shows in extraordinary settings.",
      },
      {
        type: 'Museum',
        name: 'Wall House Museum',
        signature: false,
        desc: 'Regularly rotating temporary exhibitions — photography, sculpture, contemporary painting. Historic building from the Swedish era (1784–1878) in Gustavia.',
      },
      {
        type: 'Museum',
        name: 'Musée Municipal de St-Barthélemy',
        signature: false,
        desc: 'History of the island under Swedish rule. Period objects, antique maps, authentic colonial architecture. Essential cultural context.',
      },
    ],
  },
  {
    island: 'Guadeloupe',
    venues: [
      {
        type: 'Museum',
        name: 'Mémorial ACTe (MACTe) — Pointe-à-Pitre',
        signature: true,
        desc: "The most ambitious museum ever dedicated to slavery and the slave trade. Spectacular architecture in silver steel on black granite. Permanent exhibition and international cultural programming. Member of UNESCO's Slave Route project.",
      },
      {
        type: 'Gallery',
        name: 'Kreol West Indies Gallery',
        signature: false,
        desc: 'Paintings, metal sculptures, street art, and eco-conscious objects. An integrated museum dedicated to the history and culture of Guadeloupe.',
      },
    ],
  },
  {
    island: 'Martinique',
    venues: [
      {
        type: 'Museum',
        name: 'Musée de la Pagerie — Trois-Îlets',
        signature: false,
        desc: 'Birthplace of Empress Joséphine Bonaparte. Personal effects, period portraits, Empire-style furnishings. French-Caribbean imperial history set within an exceptional tropical estate.',
      },
      {
        type: 'Museum',
        name: 'Écomusée de Martinique — Pointe du Figuier',
        signature: false,
        desc: 'On the site of the former Carib chief Pilote. Amerindian and colonial collections — rare archaeological vestiges, immersive reconstructions. Former Ducanet distillery.',
      },
      {
        type: 'Museum',
        name: 'Musée du Rhum et de la Canne — Sainte-Marie',
        signature: false,
        desc: "Housed in the former Vatable distillery. Permanent exhibition: 'One Land, One Plant, One People.' The island's agricultural, cultural, and identity history across two floors.",
      },
    ],
  },
  {
    island: 'Antigua',
    venues: [
      {
        type: 'UNESCO Site',
        name: "Nelson's Dockyard Museum — English Harbour",
        signature: true,
        desc: "Within the Naval Officers' House of Nelson's Dockyard (1784–1787). Collections spanning the Arawak era to the 19th century. The dockyard is a UNESCO World Heritage Site. Guided tours, exceptional panorama.",
      },
      {
        type: 'Museum',
        name: "Museum of Antigua & Barbuda — St John's",
        signature: false,
        desc: 'Arawak pottery, colonial cartography, history of emancipation. Housed in an 18th-century English courthouse. A remarkable collection of Amerindian artefacts.',
      },
    ],
  },
  {
    island: 'St Kitts & Nevis',
    venues: [
      {
        type: 'UNESCO Site',
        name: 'Brimstone Hill Fortress — St Kitts',
        signature: true,
        desc: "Nicknamed the 'Gibraltar of the Caribbean.' British fortress dating to 1690, inscribed on the UNESCO World Heritage List. 360° panorama of neighbouring islands; integrated military museum.",
      },
      {
        type: 'Museum',
        name: 'Nelson Museum — Nevis',
        signature: false,
        desc: 'The largest collection of Admiral Nelson memorabilia in the New World — prints, porcelain, ship models. Managed by the Nevis Historical and Conservation Society.',
      },
    ],
  },
  {
    island: 'Jamaica',
    venues: [
      {
        type: 'Museum',
        name: 'National Gallery of Jamaica — Kingston',
        signature: true,
        desc: 'The largest public art museum in the English-speaking Caribbean. Permanent collection from the Taino era to the present — Edna Manley, Kapo, Barrington Watson. Retrospectives and thematic exhibitions year-round.',
      },
      {
        type: 'Exhibition',
        name: "'Of Wood and Water' — Scotiabank Collection (Summer 2026)",
        signature: true,
        desc: '40+ works exploring the Jamaican landscape across three geological chapters. NGJ × Scotiabank collaboration. Paintings, sculptures, mixed media.',
      },
      {
        type: 'Exhibition',
        name: 'ARAVARA — NGJ × KADIST (through Sept. 2026)',
        signature: true,
        desc: '10 international artists on time as a political structure — recurrence, collective memory. Presented simultaneously across four Caribbean countries.',
      },
      {
        type: 'Historic Site',
        name: 'Devon House — Kingston',
        signature: false,
        desc: "An 1881 estate built by George Stiebel, Jamaica's first Black millionaire. Restored Victorian architecture, gardens, artisan boutiques. National historic monument.",
      },
    ],
  },
  {
    island: 'Puerto Rico',
    venues: [
      {
        type: 'Museum',
        name: 'Museo de Arte de Puerto Rico — San Juan',
        signature: true,
        desc: '1,000 years of Puerto Rican art — colonial painting, modernism, contemporary Caribbean art. Monumental neoclassical building with sculpture garden. Internationally renowned temporary exhibitions.',
      },
      {
        type: 'Museum',
        name: 'Museo de las Américas — Old San Juan',
        signature: false,
        desc: 'Housed in the former Arsenal de la Puntilla. Collections on indigenous peoples, colonisation, and Afro-Puerto Rican identity. Excellent quality temporary exhibitions.',
      },
    ],
  },
  {
    island: 'Cuba',
    venues: [
      {
        type: 'Museum',
        name: 'Museo Nacional de Bellas Artes — Havana',
        signature: true,
        desc: "The world's largest collection of Caribbean art. Two buildings: Cuban art from all periods and an international collection. The absolute reference for any serious art collector.",
      },
    ],
  },
  {
    island: 'Barbados',
    venues: [
      {
        type: 'Gallery',
        name: 'Gallery of Caribbean Art — Speightstown',
        signature: true,
        desc: 'The only gallery dedicated to art from across the entire region, from Haiti to Guyana. Rotating exhibitions by leading painters, sculptors, and photographers. Free admission.',
      },
      {
        type: 'Museum',
        name: 'Barbados Museum & Historical Society — Bridgetown',
        signature: false,
        desc: '500,000+ artefacts across seven galleries — Amerindian heritage, colonial era, rare books, historic photography. Housed in a former military prison at the British Garrison.',
      },
      {
        type: 'Gallery',
        name: 'National Art Gallery of Barbados',
        signature: false,
        desc: 'The national reference — Barbadian art from the 20th century to contemporary. Acquisitive collections, educational exhibitions, and an annual cultural programme.',
      },
    ],
  },
  {
    island: 'Grenada',
    venues: [
      {
        type: 'Unique Site',
        name: 'Molinere Underwater Sculpture Park',
        signature: true,
        desc: "The world's first underwater museum (2006) by sculptor Jason deCaires Taylor. 75 pH-neutral cement sculptures at 5–8m depth. Ranked among the 25 Wonders of the World by National Geographic. Accessible by snorkelling, diving, or glass-bottom boat.",
      },
      {
        type: 'Museum',
        name: "Grenada National Museum — St George's",
        signature: false,
        desc: 'Housed in the former French Arsenal. Amerindian artefacts, French and British colonial-era objects, history of the 1979 Grenadian revolution.',
      },
    ],
  },
  {
    island: 'Curaçao',
    venues: [
      {
        type: 'Exhibition',
        name: "Exhibition 'Blue' — Contemporary Caribbean Art (through Aug. 1, 2026)",
        signature: true,
        desc: 'Artists from Curaçao and across the region in dialogue through works dominated by blue — collective aspiration, celebration, and island identity.',
      },
      {
        type: 'Museum',
        name: 'Museo Tula — Landhuis Knip',
        signature: false,
        desc: 'Dedicated to the 1795 slave revolt led by Tula. A powerful narrative of resistance in a restored plantation house, set amid the Curaçaoan countryside.',
      },
      {
        type: 'Museum',
        name: 'Curaçao Interactive Experience — Willemstad',
        signature: false,
        desc: 'The history and culture of Curaçao staged in an immersive format. Award-winning scenography. Ideal within the UNESCO colonial quarter of Willemstad.',
      },
    ],
  },
  {
    island: 'Cayman Islands',
    venues: [
      {
        type: 'Museum',
        name: 'Cayman Islands National Museum — George Town',
        signature: false,
        desc: 'Housed in the oldest public building in the Caymans (1830s). Natural history and cultural galleries, animatronic reconstructions, immersive audiovisuals. Exhibition on Ira Thompson, founder of the collections.',
      },
      {
        type: 'Gallery',
        name: 'National Gallery of the Cayman Islands',
        signature: false,
        desc: 'A collection illustrating the essence of Caymanian life — paintings, sculptures, contemporary local and international works. Annual cultural programming.',
      },
    ],
  },
  {
    island: 'St-Martin / Sint Maarten',
    venues: [
      {
        type: 'Museum',
        name: 'Sint Maarten Museum — Philipsburg',
        signature: false,
        desc: 'The first museum on the Dutch side. Arawak pottery, the wreck of HMS Proselyte, history of Hurricane Luis (1995), colonial maritime crafts. An entirely volunteer-run, authentic collection.',
      },
    ],
  },
  {
    island: 'Turks & Caicos',
    venues: [
      {
        type: 'Museum',
        name: 'Turks & Caicos National Museum — Grand Turk',
        signature: true,
        desc: "Housed in Guinep Lodge, a bicentennial building. Rare pre-Columbian collections — including a duho (Lucayan ceremonial seat). History of the salt industry, postcards, maritime artefacts. Voted 'Best Little Museum in the Caribbean.'",
      },
    ],
  },
  {
    island: 'Aruba',
    venues: [
      {
        type: 'Gallery',
        name: 'UNOCA — National Gallery',
        signature: false,
        desc: 'A showcase for local visual arts — painters, sculptors, artisans. A reflection of Aruban cultural diversity, blending Dutch, Latin, and Caribbean influences.',
      },
      {
        type: 'Exhibition / Fair',
        name: 'Aruba Art Fair — 8th Edition (Sept. 11–13, 2026)',
        signature: true,
        desc: 'The flagship event of the ABC Islands. International galleries, emerging and established artists, collectors from around the world.',
      },
    ],
  },
  {
    island: 'US Virgin Islands',
    venues: [
      {
        type: 'Museum',
        name: 'Caribbean Museum Center for the Arts — St Croix',
        signature: false,
        desc: 'The only waterfront art museum in the USVI. Rotating exhibitions every eight weeks, permanent Caribbean collection. Workshops with award-winning artists, film, cultural programmes.',
      },
      {
        type: 'Museum',
        name: 'St Thomas Historical Trust Museum',
        signature: false,
        desc: 'History of St Thomas from Danish colonisation to the 1917 transfer to the United States. Highly personalised guided tours by expert volunteers; VIP format available.',
      },
    ],
  },
  {
    island: 'Trinidad & Tobago',
    venues: [
      {
        type: 'Museum',
        name: 'National Museum and Art Gallery — Port of Spain',
        signature: false,
        desc: 'Works by local and international artists — paintings, Amerindian artefacts, colonial history. A complete cultural memory of the archipelago.',
      },
    ],
  },
  {
    island: 'Dominica',
    venues: [
      {
        type: 'Museum',
        name: 'Dominica Museum — Roseau',
        signature: false,
        desc: 'An 18th-century building. Collections on the indigenous Kalinago people, French and British colonisation, and Dominican Creole culture.',
      },
    ],
  },
];

export default function CaribbeanArtCulturePage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* MASTHEAD */}
      <div className="bg-[#1b223d] border-b border-[#B87333]/30 px-6 md:px-14 pt-28 md:pt-32 pb-10">
        <div className="w-7 h-px bg-[#B87333] mb-5" />
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
          Caribbean 2026 · Ultra-Premium Reference
        </p>
        <h1 className="trajan-regular text-3xl md:text-5xl text-[#C0C0C0] leading-tight mb-2">
          Art &amp; Culture
        </h1>
        <p className="text-[13px] text-[#8b90a0]">
          Museums · Galleries · Exhibitions · Iconic Sites — Private Client Edition
        </p>
      </div>

      {/* INTRO */}
      <div className="bg-[#26272a] px-6 md:px-14 py-12 md:py-16">
        <p className="max-w-3xl mx-auto text-center text-[14px] md:text-[15px] leading-relaxed text-[#acb0cd]">
          This curated selection brings together the most remarkable museums, galleries, and
          exhibitions across the Caribbean — from world-renowned permanent collections to discreet,
          invitation-only exhibitions, every venue chosen for its excellence and its resonance with
          the most sophisticated tastes.
        </p>
      </div>

      {/* CONTENT */}
      <div
        className="px-6 md:px-14 py-14 md:py-20"
        style={{
          backgroundImage: "url('/images/nuagesAncien.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundColor: '#2e2f32',
        }}
      >
        <div className="max-w-6xl mx-auto space-y-16">
          {islands.map((group) => (
            <section key={group.island}>
              {/* Island heading row */}
              <div className="flex items-center gap-3 mb-6">
                <h2 className="trajan-regular text-lg md:text-2xl text-[#C0C0C0] whitespace-nowrap">
                  {group.island}
                </h2>
                <div className="flex-1 h-px bg-[#B87333]/25" />
              </div>

              {/* Venue cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                {group.venues.map((venue) => (
                  <article
                    key={venue.name}
                    className="bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-2xl p-5 flex flex-col"
                  >
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B87333] border border-[#B87333]/40">
                        {venue.type}
                      </span>
                      {venue.signature && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-[#d8be7e]">
                          <span>★</span> Signature Selection
                        </span>
                      )}
                    </div>
                    <h3 className="text-[#C0C0C0] font-semibold text-[15px] leading-snug mb-2">
                      {venue.name}
                    </h3>
                    <p className="text-[#acb0cd] text-[13px] leading-relaxed">{venue.desc}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* CLOSING NOTE */}
      <div className="bg-[#1b223d] border-t border-white/10 px-6 md:px-14 py-5">
        <p className="text-[11px] text-[#7a8094] max-w-4xl mx-auto text-center leading-relaxed">
          ★ Signature Selection — venues recommended as a priority for ultra-premium private clients.
          All private access arranged on request through your concierge.
        </p>
      </div>
    </div>
  );
}
