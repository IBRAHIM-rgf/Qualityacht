'use client';

import Image from 'next/image';
import { useState } from 'react';

// ── Données hôtels par destination ────────────────────────────────────────────
const caribbeanHotels = [
  { city: 'Saint-Barthélemy', hotels: ['Eden Rock — Villa-suites à flanc de falaise', 'Le Sereno — Pieds dans l\'eau, design Starck', 'Cheval Blanc St-Barth Isle de France — Collection LVMH'] },
  { city: 'Anguilla', hotels: ['Zemi Beach House — Resort de plage ultra-privé', 'CuisinArt Golf Resort & Spa — Villas et ferme hydroponique'] },
  { city: 'Saint-Martin', hotels: ['La Samanna — Resort de 81 villas sur la plage de Baie Longue', 'Belmond La Samanna — Piscines privées et spa de luxe'] },
  { city: 'Turks & Caicos', hotels: ['COMO Parrot Cay — Île privée, accès bateau uniquement', 'Grace Bay Club — Suites sans enfants, plage de Grace Bay'] },
  { city: 'Antigua', hotels: ['Jumby Bay Island (Oetker Collection) — Île privée exclusive', 'Carlisle Bay — Plage de sable blanc, 10 courts de tennis'] },
  { city: 'Saint-Vincent & Grenadines', hotels: ['Cotton House Mustique — 17 villas sur l\'île des rock stars', 'Firefly Mustique — 5 villas privées avec vue panoramique'] },
  { city: 'Barbade', hotels: ['Sandy Lane Hotel — Le palace historique des Caraïbes', 'Cobblers Cove — 40 suites face à l\'Atlantique'] },
];

const westMedHotels = [
  { city: 'Monaco', hotels: ['Hôtel de Paris Monte-Carlo — Le palais iconique de la Principauté', 'Hôtel Hermitage Monte-Carlo — Belle Époque face au port'] },
  { city: 'Côte d\'Azur', hotels: ['Hôtel du Cap-Eden-Roc (Antibes) — L\'hôtel des stars depuis 1870', 'La Réserve de Beaulieu — La Grande Dame de la Riviera', 'La Chèvre d\'Or (Èze) — Village médiéval, vue sur Monaco'] },
  { city: 'Sardaigne', hotels: ['Cala di Volpe (Costa Smeralda) — L\'adresse mythique de l\'Aga Khan', 'Romazzino Hotel — Rochers roses et mer turquoise'] },
  { city: 'Ibiza', hotels: ['Atzaró Agroturismo — Finca du XVIIIe siècle au coeur des orangers', 'Can Faustino — Villa-hôtel privée pour 12 personnes'] },
  { city: 'Majorque', hotels: ['Son Bunyola (Virgin Limited Edition) — 3 villas privées de Richard Branson', 'Cap Rocat — Forteresse militaire du XIXe transformée en hôtel'] },
  { city: 'Côte Amalfitaine', hotels: ['Belmond Hotel Caruso (Ravello) — Jardins baignant dans la mer', 'Il San Pietro di Positano — Ascenseur privatif jusqu\'à la plage'] },
];

const eastMedHotels = [
  { city: 'Santorin', hotels: ['Canaves Oia Epitome — Suites en falaise avec piscines à débordement', 'Grace Santorini — Design contemporain face à la caldeira'] },
  { city: 'Mykonos', hotels: ['Cavo Tagoo — Grotte-piscine et suites en surplomb de la mer', 'Mykonos Grand Hotel — Villas avec piscine privée'] },
  { city: 'Capri', hotels: ['Capri Palace Jumeirah — Spa médical L\'Olivo, 2 étoiles Michelin', 'Grand Hotel Quisisana — L\'institution capriote depuis 1845'] },
  { city: 'Turquie', hotels: ['Mandarin Oriental Bodrum — 8 villas de plage avec piscine', 'Maçakizi — Le Mykonos turc, plage de Türkbükü'] },
  { city: 'Croatie', hotels: ['Villa Dubrovnik — 56 chambres face aux remparts', 'Adriatic Luxury Hotels — 5 propriétés sur l\'Adriatique'] },
  { city: 'Grèce continentale', hotels: ['Mystique (Santorin) — Suites troglodytes dans la roche volcanique', 'Eagles Palace (Halkidiki) — Péninsule privée en Macédoine'] },
];

const indianOceanHotels = [
  { city: 'Maldives', hotels: ['Soneva Jani — Villas sur pilotis avec toboggan vers la mer', 'Gili Lankanfushi — Le plus grand éco-resort des Maldives', 'Cheval Blanc Randheli — Collection LVMH, île de Noonu Atoll', 'Niyama Private Islands — Double atoll, club de plongée privé'] },
  { city: 'Seychelles', hotels: ['North Island Lodge — 11 villas sur 201 hectares privés', 'Frégate Island Private — 16 villas, 7 plages désertes', 'Six Senses Zil Pasyon — Félicité Island, tortues géantes'] },
  { city: 'Maurice', hotels: ['Shangri-La Le Touessrok — Île Ilot Mangénie privée', 'One & Only Le Saint Géran — 163 chambres sur la côte est'] },
];

const eastAsiaHotels = [
  { city: 'Tokyo', hotels: ['Aman Tokyo — Forteresse de sérénité au-dessus du Palais Impérial', 'Park Hyatt Tokyo (Sofia Coppola) — 52e au 55e étage de la Shinjuku Tower', 'The Peninsula Tokyo — Vues sur le Palais, service légendaire'] },
  { city: 'Kyoto', hotels: ['Aman Kyoto — Jardin secret de 3 000 m² au cœur d\'Arashiyama', 'Suiran Kyoto (Starwood) — Bord de rivière Oi, époque Heian'] },
  { city: 'Hong Kong', hotels: ['The Peninsula Hong Kong — Rolls-Royce, rooftop hélipad depuis 1928', 'Mandarin Oriental Hong Kong — 70 ans d\'excellence sur le Harbour'] },
  { city: 'Shanghai', hotels: ['Aman at Summer Palace Beijing — 15 villas au Palais d\'Été', 'The Peninsula Shanghai — Belle façade Art Déco du Bund'] },
];

const southEastAsiaHotels = [
  { city: 'Bali', hotels: ['Amanjiwo — Temple de la sérénité face au Borobudur', 'Viceroy Bali — 25 villas avec piscine à Ubud', 'Capella Ubud — Tentes de luxe dans la forêt équatoriale'] },
  { city: 'Phuket', hotels: ['Amanpuri — Le premier Aman (1988), plage privée de Pansea', 'Trisara — 39 villas en falaise avec plage privée', 'Rosewood Phuket — Villas dans les rochers de Phakhlok'] },
  { city: 'Singapour', hotels: ['Raffles Singapore — Hôtel colonial mythique depuis 1887', 'Capella Singapore — Sentosa Island, jardins coloniaux'] },
  { city: 'Thaïlande', hotels: ['Soneva Kiri (Koh Kood) — Thaïlande sauvage, ziplining', 'Mandarin Oriental Bangkok — La Dame de la Rivière Chao Phraya'] },
];

const omanGulfHotels = [
  { city: 'Dubaï', hotels: ['Burj Al Arab — Le 7 étoiles emblématique de Jumeirah', 'Atlantis The Royal — 90 restaurants, aquapark, concerts privés', 'Jumeirah Zabeel Saray — Palais ottoman sur Palm Jumeirah'] },
  { city: 'Abu Dhabi', hotels: ['Emirates Palace Mandarin Oriental — 1 km de plage privée, suites dorées', 'Qasr Al Sarab — Oasis de sable dans le désert du Liwa'] },
  { city: 'Oman', hotels: ['Alila Jabal Akhdar — 2 000 m d\'altitude, Rose Valley', 'The Chedi Muscat — 21 hectares en bord de mer d\'Arabie', 'Anantara Al Jabal Al Akhdar — Canyon de 1 000 m à pied'] },
];

const northAmericaHotels = [
  { city: 'New York', hotels: ['Aman New York — Crown Building, spa 1 900 m², 83 suites', 'The Mark — Penthouse de 1 400 m² sur Central Park', 'The Pierre (Taj Hotels) — Rotonde peinte, face au Park'] },
  { city: 'Los Angeles', hotels: ['Hotel Bel-Air — Chez les étoiles de Hollywood depuis 1946', 'Chateau Marmont — Bungalows mythiques du Sunset Strip'] },
  { city: 'Miami', hotels: ['Faena Hotel Miami Beach — Teatro rouge et baleine mammouth', 'The Setai — Tower Art Déco, plage de South Beach'] },
  { city: 'San Francisco', hotels: ['Fairmont San Francisco — Nob Hill, vue sur le Bay Bridge'] },
];

const bahamasHotels = [
  { city: 'Paradise Island', hotels: ['Ocean Club (Four Seasons) — Jardins versaillais en bord d\'Atlantique', 'Atlantis Paradise Island — Resort palace de 2 300 chambres'] },
  { city: 'Harbour Island', hotels: ['The Landing — Boutique hotel colonial sur Pink Sands Beach', 'Pink Sands Resort — 25 cottages face à la plage rose'] },
  { city: 'Exumas', hotels: ['Grand Isle Resort — Marina privée et piscines à débordement'] },
];

const arcticHotels = [
  { city: 'Norvège', hotels: ['The Thief Oslo — Art contemporain sur l\'Astrup Fearnley waterfront', 'Juvet Landscape Hotel — Vitre panoramique sur la forêt'] },
  { city: 'Islande', hotels: ['The Retreat at Blue Lagoon — Spa géothermal et lagon privé', 'Ion Adventure Hotel — Aurora borealis depuis la baignoire'] },
  { city: 'Laponie Finlandaise', hotels: ['Kakslauttanen Arctic Resort — Igloo de verre sous les aurores', 'Wilderness Hotel Nellim — Sur la rive du lac Inari gelé'] },
];

const africaHotels = [
  { city: 'Kenya', hotels: ['Giraffe Manor (Nairobi) — Les girafes passent la tête au petit-déjeuner', 'Singita Grumeti (Serengeti) — Lodges de luxe sur la migration'] },
  { city: 'Maroc', hotels: ['Royal Mansour Marrakech — Palais privés construits par le Roi', 'La Mamounia — Jardins de 8 ha, Winston Churchill y peignait', 'Amanjena — Le premier Aman africain, bassin rose géant'] },
  { city: 'Afrique du Sud', hotels: ['Singita Sabi Sand — Conservation de luxe au Parc Kruger', 'Ellerman House (Le Cap) — 11 suites, vue sur l\'Atlantique'] },
  { city: 'Tanzanie', hotels: ['&Beyond Mnemba Island — Île privée face à Zanzibar', 'Singita Serengeti House — 8 chambres, piscine et boma privés'] },
];

const indonesiaHotels = [
  { city: 'Bali', hotels: ['Four Seasons Sayan — Elipse de béton au-dessus de la rivière Ayung', 'COMO Shambhala Estate — Retraite spa dans la jungle d\'Ubud'] },
  { city: 'Sumba', hotels: ['Nihi Sumba Island — Ex-Nihiwatu, plage surf privée, 8h/j max'] },
  { city: 'Komodo', hotels: ['Ayana Komodo Resort — Face à l\'île des dragons de Komodo'] },
];

const oceaniaHotels = [
  { city: 'Fidji', hotels: ['Laucala Island (Forbes) — 25 villas, 2 golfs, avion privé obligatoire', 'Vatulele Island Resort — 9 villas sur l\'île privée du propriétaire'] },
  { city: 'Polynésie Française', hotels: ['The Brando (Tetiaroa) — L\'île privée de Marlon Brando', 'Four Seasons Bora Bora — Bungalows sur pilotis et manta rays', 'St. Regis Bora Bora — Lagon cristallin, villa Royal Estate'] },
  { city: 'Nouvelle-Zélande', hotels: ['Matakauri Lodge (Queenstown) — Lac Wakatipu et Southern Alps', 'Eagles Nest (Bay of Islands) — 5 villas sur falaise volcanique'] },
];

const centralAmericaHotels = [
  { city: 'Costa Rica', hotels: ['Nayara Tented Camp — Lodges sur pilotis au bord du Arenal', 'Four Seasons Papagayo — Péninsule privée, golf et plongée'] },
  { city: 'Panama', hotels: ['Islas Secas Reserve & Lodge — 14 îles privées au Pacifique', 'The Nayara (Boquete) — Lodge volcanique au Chiriquí'] },
];

const pacificHotels = [
  { city: 'Polynésie', hotels: ['Brando Resort (Tetiaroa) — Île de Marlon Brando, 35 villas', 'Tikehau Pearl Beach Resort — Atoll rose de 30 km de diamètre'] },
  { city: 'Hawaï', hotels: ['Four Seasons Hualalai (Big Island) — Construit dans la lave volcanique', 'Montage Kapalua Bay (Maui) — Falaises et fonds marins de Kapalua'] },
  { city: 'Japon (Îles Ryūkyū)', hotels: ['Hoshinoya Taketomi Island — Ryokan traditionnel sur île privée'] },
];

// ── Destinations ───────────────────────────────────────────────────────────────
const destinations = [
  { name: 'Caribbean',              image: '/images/destinations/animals/caraibes.jpg',                groups: caribbeanHotels },
  { name: 'Western Mediterranean',  image: '/images/destinations/animals/Western-Mediterranean.webp',  groups: westMedHotels },
  { name: 'Eastern Mediterranean',  image: '/images/destinations/animals/Eastern-Mediterranean.jpg',   groups: eastMedHotels },
  { name: 'Indian Ocean',           image: '/images/destinations/animals/Indian-Ocean.jpg',             groups: indianOceanHotels },
  { name: 'East Asia',              image: '/images/destinations/animals/EAST-ASIA.jpg',                groups: eastAsiaHotels },
  { name: 'South East Asia',        image: '/images/destinations/animals/SOUTH-EAST-ASIA.jpeg',         groups: southEastAsiaHotels },
  { name: 'Oman & Gulf',            image: '/images/destinations/animals/Oman-Gulf.jpeg',               groups: omanGulfHotels },
  { name: 'North America',          image: '/images/destinations/animals/Nord-America.jpg',             groups: northAmericaHotels },
  { name: 'Bahamas',                image: '/images/destinations/animals/Bahamas.jpg',                  groups: bahamasHotels },
  { name: 'Arctic & Northern Europe', image: '/images/destinations/animals/Arctic.png',                 groups: arcticHotels },
  { name: 'Africa',                 image: '/images/destinations/animals/africa.jpeg',                  groups: africaHotels },
  { name: 'Indonesia',              image: '/images/destinations/animals/Indonesia.jpg',                groups: indonesiaHotels },
  { name: 'Oceania',                image: '/images/destinations/animals/oceania.jpeg',                 groups: oceaniaHotels },
  { name: 'Central America',        image: '/images/destinations/animals/Central-America.jpg',          groups: centralAmericaHotels },
  { name: 'Pacific Ocean',          image: '/images/destinations/animals/Ocean-Pacific.jpeg',           groups: pacificHotels },
];

// ── Card ───────────────────────────────────────────────────────────────────────
function HotelCard({ dest, onClick }) {
  return (
    <div
      onClick={() => onClick(dest)}
      className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="w-full relative mb-6 overflow-hidden h-48 rounded-xl">
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h2 className="text-lg font-semibold text-[#acb0cd] mb-2 trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto hover:text-[#c2622a] transition-colors duration-300">
        {dest.name}
      </h2>
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────────
function HotelModal({ dest, onClose }) {
  if (!dest) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(10,20,50,0.92)' }}
      onClick={onClose}
    >
      <style>{`
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: #acb0cd; border-radius: 2px; }
        .modal-scroll { scrollbar-width: thin; scrollbar-color: #acb0cd transparent; }
      `}</style>
      <div
        className="modal-scroll relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 px-6 py-8 md:px-10 md:py-10"
        style={{ backgroundColor: '#0a1432' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-[#acb0cd]/50 hover:text-white text-2xl transition-colors duration-200 cursor-pointer"
        >
          ×
        </button>
        <h2 className="trajan-regular text-xl md:text-2xl text-[#acb0cd] uppercase tracking-[0.1em] mb-6 text-center">
          {dest.name}
        </h2>
        <div className="space-y-6">
          {dest.groups.map((group, i) => (
            <div key={i}>
              <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-2 text-center" style={{ color: '#acb0cd' }}>
                {group.city}
              </p>
              <ul className="space-y-1.5">
                {group.hotels.map((hotel, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm md:text-base text-[#acb0cd]">
                    <span className="mt-1 w-1.5 h-1.5 rotate-45 shrink-0 inline-block" style={{ backgroundColor: '#acb0cd' }} />
                    {hotel}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function HotelPalacePage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

      {/* ══ HERO ══ */}
      <div className="relative h-[60vh] md:h-[75vh] flex flex-col items-center justify-center" style={{ backgroundColor: '#1a1b1e' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gridLosange/lustreblanc.png"
          alt="Hotel & Palace"
          className="w-[340px] md:w-[480px] lg:w-[560px] object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 md:pb-16 z-10 px-4">
          <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center">
            Hotels & Palaces
          </h1>
          <p className="text-[#acb0cd]/70 text-xs md:text-sm uppercase tracking-[0.25em] font-light text-center mt-3">
            The World's Most Exceptional Addresses
          </p>
        </div>
      </div>

      {/* ══ GRILLE ══ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-24 px-4"
        style={{ backgroundImage: "url('/images/services-bg.png')" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white trajan-regular mb-4 text-center uppercase tracking-wide">
          Luxury Hotel Destinations
        </h2>
        <Image src="/images/title-line.png" alt="" width={200} height={10} className="mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
          {destinations.map((dest, i) => (
            <HotelCard key={i} dest={dest} onClick={setSelected} />
          ))}
        </div>
      </section>

      <HotelModal dest={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
