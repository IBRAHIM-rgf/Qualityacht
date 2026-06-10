import Image from "next/image";
import Link from "next/link";

// Cards voiliers (cliquables → pages rentals).
const sailingRentalItems = [
  { title: "Classic Sailing Yacht Charter", image: "/images/sailing/classique4.jpg",          href: "/rentals/classic-sailing-yacht" },
  { title: "Catamaran Charter",             image: "/images/sailing/catamaran.jpg",            href: "/rentals/catamaran" },
  { title: "Trimaran Charter",              image: "/images/sailing/trimaran.jpg",             href: "/rentals/trimaran" },
  { title: "Sport Classic Yacht",           image: "/images/sailing/Sport-Classic-Yacht.jpg",  href: "/rentals/sport-classic" },
  { title: "Traditional Sailboat",          image: "/images/sailing/traditional.jpg",          href: "/rentals/traditional" },
  { title: "Sailboat Regatta",              image: "/images/sailing/regate.jpg",               href: "/rentals/regatta" },
];

// Cards des destinations — même ordre que /charters/destinations.
// Pas de href : non cliquables (affichage uniquement).
const destinationItems = [
  { title: "Arctic",                image: "/images/destinations/animals/Arctic.png" },
  { title: "Bahamas",               image: "/images/destinations/animals/Bahamas.jpg" },
  { title: "Central America",       image: "/images/destinations/animals/Central-America.jpg" },
  { title: "East Asia",             image: "/images/destinations/animals/EAST-ASIA.jpg" },
  { title: "Eastern Mediterranean", image: "/images/destinations/animals/Eastern-Mediterranean.jpg" },
  { title: "Indian Ocean",          image: "/images/destinations/animals/Indian-Ocean.jpg" },
  { title: "Indonesia",             image: "/images/destinations/animals/Indonesia.jpg" },
  { title: "North America",         image: "/images/destinations/animals/Nord-America.jpg" },
  { title: "Pacific Ocean",         image: "/images/destinations/animals/Ocean-Pacific.jpeg" },
  { title: "Oman Gulf",             image: "/images/destinations/animals/Oman-Gulf.jpeg" },
  { title: "South East Asia",       image: "/images/destinations/animals/SOUTH-EAST-ASIA.jpeg" },
  { title: "Western Mediterranean", image: "/images/destinations/animals/Western-Mediterranean.webp" },
  { title: "Africa",                image: "/images/destinations/animals/africa.jpeg" },
  { title: "Northern Europe",       image: "/images/destinations/animals/articbynortherneurope.jpg" },
  { title: "Caraïbes",              image: "/images/destinations/animals/caraibes.jpg" },
  { title: "Oceania",               image: "/images/destinations/animals/oceania.jpeg" },
];

// Card style "private jet" : image h-48 + titre seul, titre orange au survol.
function Card({ item }) {
  const content = (
    <>
      <div className="w-full relative mb-6 overflow-hidden h-48 rounded-xl">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h2 className="text-lg font-semibold text-[#acb0cd] mb-2 trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto group-hover:text-[#c2622a] transition-colors duration-300">
        {item.title}
      </h2>
    </>
  );

  // Cliquable seulement si href (voiliers) ; destinations = affichage seul.
  return item.href ? (
    <Link
      href={item.href}
      className="group min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
    >
      {content}
    </Link>
  ) : (
    <div className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center">
      {content}
    </div>
  );
}

export default function SailingRentalPage() {
  const items = [...sailingRentalItems, ...destinationItems];
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-24 px-4"
      style={{ backgroundImage: "url('/images/services-bg.png')" }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-white trajan-regular mb-4 text-center uppercase tracking-wide">
        only for you
      </h1>
      <Image
        src="/images/title-line.png"
        alt="Decorative line"
        width={200}
        height={10}
        className="mx-auto mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {items.map((item) => (
          <Card key={item.title} item={item} />
        ))}
      </div>

      <div className="mt-16 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Qualityacht. All rights reserved.
      </div>
    </section>
  );
}
