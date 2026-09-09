import ItemsGrid from "../../components/ItemsGrid";

// ══ /charters/day-charter ══
//
// Page a part entiere, demandee par le client (2026-09-09), cible du bouton
// « Day Charter » de /charters/on-demand. Meme construction que
// /charters/destinations : meme hero video, meme intro, memes 16 cartes avec
// les photos animalieres. Les cartes n'ouvrent une page que lorsque le client
// l'a demandee : pour l'instant seule Caribbean est reliee
// (/charters/day-charter/caribbean, rendu identique a caribbean-v15). Les
// autres cartes s'affichent sans lien (ItemsGrid les rend non cliquables).

const cards = [
  {
    title: "Arctic",
    description: "High-latitude cruising among glaciers, fjords and long polar light.",
    image: "/images/destinations/cards/arctic-card.webp",
  },
  {
    title: "Bahamas",
    description: "Shallow banks, powder sand cays and short hops between anchorages.",
    image: "/images/destinations/cards/bahamas-card.webp",
  },
  {
    title: "Central America",
    description: "Two coastlines, rainforest shorelines and passages between oceans.",
    image: "/images/destinations/cards/central-america-card.webp",
  },
  {
    title: "East Asia",
    description: "Island chains, sheltered bays and harbours where cities meet the sea.",
    image: "/images/destinations/cards/east-asia-card.webp",
  },
  {
    title: "Eastern Mediterranean",
    description: "Ancient harbours, clear waters and exceptional island itineraries.",
    image: "/images/destinations/animals/Eastern-Mediterranean.jpg",
  },
  {
    title: "Indian Ocean",
    description: "Remote archipelagos, coral lagoons and extraordinary private escapes.",
    image: "/images/destinations/animals/Indian-Ocean.jpg",
  },
  {
    title: "Indonesia",
    description: "Thousands of islands, volcanic horizons and long cruising in warm water.",
    image: "/images/destinations/cards/indonesia-card.webp",
  },
  {
    title: "North America",
    description: "Rugged headlands, sheltered sounds and classic Atlantic seamanship.",
    image: "/images/destinations/animals/Nord-America.jpg",
  },
  {
    title: "Pacific Ocean",
    description: "Wide ocean passages, coral atolls and anchorages far from anywhere.",
    image: "/images/destinations/animals/Ocean-Pacific.jpeg",
  },
  {
    title: "Oman Gulf",
    description: "Desert cliffs meeting the sea, deep inlets and quiet overnight anchorages.",
    image: "/images/destinations/cards/oman-gulf-card.webp",
  },
  {
    title: "South East Asia",
    description: "Limestone karsts, sheltered bays and island-to-island cruising.",
    image: "/images/destinations/animals/SOUTH-EAST-ASIA.jpeg",
  },
  {
    title: "Western Mediterranean",
    description: "Iconic coastlines, historic ports and refined summer cruising.",
    image: "/images/destinations/animals/Western-Mediterranean.webp",
  },
  {
    title: "Africa",
    description: "Long coastlines, contrasting seas and passages between two oceans.",
    image: "/images/destinations/cards/africa-card.webp",
  },
  {
    title: "Northern Europe",
    description: "Northern fjords, skerries and cool-water cruising under wide skies.",
    image: "/images/destinations/cards/northern-europe-card.webp",
  },
  {
    title: "Caribbean",
    description: "Turquoise passages, secluded anchorages and island-to-island freedom.",
    image: "/images/destinations/animals/caraibes.jpg",
    href: "/charters/day-charter/caribbean",
  },
  {
    title: "Oceania",
    description: "Reef-lined coasts, open water and remote islands across the South Seas.",
    image: "/images/destinations/cards/oceania-card.webp",
  },
];

export const metadata = {
  title: "Day Charter | Qualityacht",
  description:
    "From Caribbean anchorages to Mediterranean harbours — the cruising grounds Qualityacht arranges private yacht charters and tailored itineraries around.",
};

export default function DayCharterPage() {
  return (
    <ItemsGrid
      title="Day Charter"
      heroVideo="/media/client/destinations/destinations-hero.mp4"
      heroVideoPoster="/media/client/destinations/destinations-hero-poster.webp"
      heroVideoCover
      bgImage="/images/services-bg.png"
      items={cards}
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
