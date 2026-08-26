import ItemsGrid from "../../components/ItemsGrid";

// ══ Destinations ══
//
// Les 16 cartes presentaient auparavant des photos du dossier
// /images/destinations/animals/ et des textes sur la faune marine
// (« Discover these unique creatures », « Observe these magnificent animals »…),
// sans rapport avec une page de charter.
//
// Visuels : les 16 cartes affichent les photos animalieres d'origine, comme
// demande. Les 7 destinations qui avaient recu une photo de paysage lors du
// commit 7cb329c retrouvent leur animal.
//
// Les 9 autres pointent sur /destinations/cards/*.webp : c'est exactement la
// meme photographie que dans /destinations/animals/, seulement convertie en WebP
// (comparaison visuelle faite, aucun recadrage). Arctic passe ainsi de 2,1 Mo a
// 20 Ko. Les originaux ne sont ni supprimes ni ecrases.
//
// Textes : navigation, paysages et itineraires. Aucune promesse de disponibilite,
// aucun nombre de yachts, aucune saison garantie, aucune fausse exclusivite.
//
// Les 16 routes sont inchangees, y compris /charters/destinations/caribbean-v15.

const destinations = [
  {
    title: "Arctic",
    description: "High-latitude cruising among glaciers, fjords and long polar light.",
    image: "/images/destinations/cards/arctic-card.webp",
    href: "/charters/destinations/arctic",
  },
  {
    title: "Bahamas",
    description: "Shallow banks, powder sand cays and short hops between anchorages.",
    image: "/images/destinations/cards/bahamas-card.webp",
    href: "/charters/destinations/bahamas",
  },
  {
    title: "Central America",
    description: "Two coastlines, rainforest shorelines and passages between oceans.",
    image: "/images/destinations/cards/central-america-card.webp",
    href: "/charters/destinations/central-america",
  },
  {
    title: "East Asia",
    description: "Island chains, sheltered bays and harbours where cities meet the sea.",
    image: "/images/destinations/cards/east-asia-card.webp",
    href: "/charters/destinations/east-asia",
  },
  {
    title: "Eastern Mediterranean",
    description: "Ancient harbours, clear waters and exceptional island itineraries.",
    image: "/images/destinations/animals/Eastern-Mediterranean.jpg",
    href: "/charters/destinations/eastern-mediterranean",
  },
  {
    title: "Indian Ocean",
    description: "Remote archipelagos, coral lagoons and extraordinary private escapes.",
    image: "/images/destinations/animals/Indian-Ocean.jpg",
    href: "/charters/destinations/indian-ocean",
  },
  {
    title: "Indonesia",
    description: "Thousands of islands, volcanic horizons and long cruising in warm water.",
    image: "/images/destinations/cards/indonesia-card.webp",
    href: "/charters/destinations/indonesia",
  },
  {
    title: "North America",
    description: "Rugged headlands, sheltered sounds and classic Atlantic seamanship.",
    image: "/images/destinations/animals/Nord-America.jpg",
    href: "/charters/destinations/north-america",
  },
  {
    title: "Pacific Ocean",
    description: "Wide ocean passages, coral atolls and anchorages far from anywhere.",
    image: "/images/destinations/animals/Ocean-Pacific.jpeg",
    href: "/charters/destinations/pacific-ocean",
  },
  {
    title: "Oman Gulf",
    description: "Desert cliffs meeting the sea, deep inlets and quiet overnight anchorages.",
    image: "/images/destinations/cards/oman-gulf-card.webp",
    href: "/charters/destinations/oman-gulf",
  },
  {
    title: "South East Asia",
    description: "Limestone karsts, sheltered bays and island-to-island cruising.",
    image: "/images/destinations/animals/SOUTH-EAST-ASIA.jpeg",
    href: "/charters/destinations/south-east-asia",
  },
  {
    title: "Western Mediterranean",
    description: "Iconic coastlines, historic ports and refined summer cruising.",
    image: "/images/destinations/animals/Western-Mediterranean.webp",
    href: "/charters/destinations/western-mediterranean",
  },
  {
    title: "Africa",
    description: "Long coastlines, contrasting seas and passages between two oceans.",
    image: "/images/destinations/cards/africa-card.webp",
    href: "/charters/destinations/africa",
  },
  {
    title: "Northern Europe",
    description: "Northern fjords, skerries and cool-water cruising under wide skies.",
    image: "/images/destinations/cards/northern-europe-card.webp",
    href: "/charters/destinations/arctic-northern-europe",
  },
  {
    title: "Caribbean",
    description: "Turquoise passages, secluded anchorages and island-to-island freedom.",
    image: "/images/destinations/animals/caraibes.jpg",
    href: "/charters/destinations/caribbean-v15",
  },
  {
    title: "Oceania",
    description: "Reef-lined coasts, open water and remote islands across the South Seas.",
    image: "/images/destinations/cards/oceania-card.webp",
    href: "/charters/destinations/oceania",
  },
];

export const metadata = {
  title: "Destinations | Qualityacht",
  description:
    "From Caribbean anchorages to Mediterranean harbours — the cruising grounds Qualityacht arranges private yacht charters and tailored itineraries around.",
};

export default function DestinationsPage() {
  return (
    <ItemsGrid
      title="Destinations"
      heroImage="/images/charters/destination.png"
      bgImage="/images/services-bg.png"
      items={destinations}
      intro={
        <>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#acb0cd] mb-4">
            Where Will Your Journey Begin?
          </h2>
          <p className="text-[13px] md:text-base leading-relaxed text-[#acb0cd]">
            From the Caribbean&rsquo;s turquoise anchorages to the Mediterranean&rsquo;s historic
            harbours, explore destinations shaped for private yachting and tailored itineraries.
          </p>
        </>
      }
    />
  );
}
