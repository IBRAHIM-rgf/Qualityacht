import ItemsGrid from "../../components/ItemsGrid";

const destinations = [
  {
    title: "Caraibes",
    description: "Discover more species in the Caribbean regions.",
    image: "/images/destinations/animals/caraibes.jpg",
    href: "/charters/destinations/caribbean-v15",
  },
  {
    title: "Arctic",
    description: "Discover these unique creatures in the cold waters of the Arctic.",
    image: "/images/destinations/animals/Arctic.png",
    href: "/charters/destinations/arctic",
  },
  {
    title: "Bahamas",
    description: "Observe these magnificent animals in the turquoise waters of the Bahamas.",
    image: "/images/destinations/animals/Bahamas.jpg",
    href: "/charters/destinations/bahamas",
  },
  {
    title: "Central America",
    description: "Meet the colorful wildlife of Central America in its warm waters.",
    image: "/images/destinations/animals/Central-America.jpg",
    href: "/charters/destinations/central-america",
  },
  {
    title: "East Asia",
    description: "Explore the marine diversity of East Asia.",
    image: "/images/destinations/animals/EAST-ASIA.jpg",
    href: "/charters/destinations/east-asia",
  },
  {
    title: "Eastern Mediterranean",
    description: "Discover the marine life of the Eastern Mediterranean.",
    image: "/images/destinations/animals/Eastern-Mediterranean.jpg",
    href: "/charters/destinations/eastern-mediterranean",
  },
  {
    title: "Indian Ocean",
    description: "Admire these creatures in the exotic waters of the Indian Ocean.",
    image: "/images/destinations/animals/Indian-Ocean.jpg",
    href: "/charters/destinations/indian-ocean",
  },
  {
    title: "Indonesia",
    description: "Encounter the exceptional wildlife of Indonesia.",
    image: "/images/destinations/animals/Indonesia.jpg",
    href: "/charters/destinations/indonesia",
  },
  {
    title: "North America",
    description: "Observe these fascinating animals along the North American coasts.",
    image: "/images/destinations/animals/Nord-America.jpg",
    href: "/charters/destinations/north-america",
  },
  {
    title: "Pacific Ocean",
    description: "Discover the marine life of the vast Pacific Ocean.",
    image: "/images/destinations/animals/Ocean-Pacific.jpeg",
    href: "/charters/destinations/pacific-ocean",
  },
  {
    title: "Oman Gulf",
    description: "Explore the unique wildlife of the Gulf of Oman.",
    image: "/images/destinations/animals/Oman-Gulf.jpeg",
    href: "/charters/destinations/oman-gulf",
  },
  {
    title: "South East Asia",
    description: "Meet these creatures in the warm waters of South East Asia.",
    image: "/images/destinations/animals/SOUTH-EAST-ASIA.jpeg",
    href: "/charters/destinations/south-east-asia",
  },
  {
    title: "Western Mediterranean",
    description: "Discover the wildlife of the Western Mediterranean.",
    image: "/images/destinations/animals/Western-Mediterranean.webp",
    href: "/charters/destinations/western-mediterranean",
  },
  {
    title: "Africa",
    description: "Observe the diverse wildlife along the African coasts.",
    image: "/images/destinations/animals/africa.jpeg",
    href: "/charters/destinations/africa",
  },
  {
    title: "Northern Europe",
    description: "Meet these animals in the icy waters of Northern Europe.",
    image: "/images/destinations/animals/articbynortherneurope.jpg",
    href: "/charters/destinations/arctic-northern-europe",
  },
  {
    title: "Oceania",
    description: "Explore the unique marine wildlife of Oceania.",
    image: "/images/destinations/animals/oceania.jpeg",
    href: "/charters/destinations/oceania",
  },
];


export default function DestinationsPage() {
  return (
    <ItemsGrid
      title="Destinations"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
