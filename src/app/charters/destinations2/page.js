import ItemsGrid from "../../components/ItemsGrid";

const destinations = [
  {
    title: "Caribbean",
    description: "Explorez les eaux turquoise et les îles paradisiaques des Caraïbes.",
    image: "/images/destinations/destnation-feature-caribbean.webp",
    href: "/charters/destinations/caribbean-v15",
  },
  {
    title: "East Mediterranean",
    description: "Découvrez l'histoire et la beauté de la Méditerranée orientale.",
    image: "/images/destinations/destnation-feature-east-med.webp",
    href: "/charters/destinations/east-med",
  },
  {
    title: "Indian Ocean",
    description: "Naviguez vers les plages exotiques de l'océan Indien.",
    image: "/images/destinations/destnation-feature-indian-ocean.webp",
    href: "/charters/destinations/indian-ocean",
  },
  {
    title: "North America",
    description: "Partez à l'aventure sur les côtes nord-américaines.",
    image: "/images/destinations/destnation-feature-north-america.webp",
    href: "/charters/destinations/north-america",
  },
  {
    title: "South East Asia",
    description: "Explorez les paysages spectaculaires de l'Asie du Sud-Est.",
    image: "/images/destinations/destnation-feature-south-east-asia.webp",
    href: "/charters/destinations/south-east-asia",
  },
  {
    title: "South Pacific",
    description: "Découvrez les îles idylliques du Pacifique Sud.",
    image: "/images/destinations/destnation-feature-south-pacific.webp",
    href: "/charters/destinations/south-pacific",
  },
  {
    title: "West Mediterranean",
    description: "Profitez du charme et du soleil de la Méditerranée occidentale.",
    image: "/images/destinations/destnation-feature-west-med.webp",
    href: "/charters/destinations/west-med",
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
