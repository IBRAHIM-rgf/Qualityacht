import Image from "next/image";
import Link from "next/link";
import ItemsGrid from "../components/ItemsGrid";

const sailingRentalItems = [
  {
    title: "Classic Sailing Yacht Charter",
    description:
      "Elegant and timeless sailing yachts for a refined cruising experience.",
    image: "/images/sailing/classique4.jpg",
    href: "/rentals/classic-sailing-yacht",
  },
  {
    title: "Catamaran Charter",
    description:
      "Spacious and stable twin-hulled sailboats, ideal for family and group charters.",
    image: "/images/sailing/catamaran.jpg",
    href: "/rentals/catamaran",
  },
  {
    title: "Trimaran Charter",
    description:
      "High-performance three-hulled sailboats combining speed and stability.",
    image: "/images/sailing/trimaran.jpg",
    href: "/rentals/trimaran",
  },
  {
    title: "Sport Classic Yacht",
    description:
      "Classic sailing yachts optimized for regattas and sporty cruising.",
    image: "/images/sailing/Sport-Classic-Yacht.jpg",
    href: "/rentals/sport-classic",
  },
  {
    title: "Traditional Sailboat",
    description:
      "Authentic wooden or vintage sailboats for a nostalgic sailing adventure.",
    image: "/images/sailing/traditional.jpg",
    href: "/rentals/traditional",
  },
  {
    title: "Sailboat Regatta",
    description:
      "Competitive racing sailboats designed for thrilling regatta experiences.",
    image: "/images/sailing/regate.jpg",
    href: "/rentals/regatta",
  },
];


export default function SailingRentalPage() {
  return (
    <ItemsGrid
      title="only for you"
      bgImage="/images/services-bg.png"
      items={sailingRentalItems}
      imageWrapperClassName="h-[400px] rounded-lg overflow-hidden"
      imageClassName=""
    />
  );
}
