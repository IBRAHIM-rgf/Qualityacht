import Image from "next/image";
import Link from "next/link";

// Cards voiliers (cliquables → pages rentals).
const sailingRentalItems = [
  { title: "Classic Sailing Yacht Charter", image: "/images/sailing/classique4.jpg",          href: "/only-for-you/classic-sailing-yacht" },
  { title: "Catamaran Charter",             image: "/images/sailing/catamaran.jpg",            href: "/only-for-you/catamaran" },
  { title: "Trimaran Charter",              image: "/images/sailing/trimaran.jpg",             href: "/only-for-you/trimaran" },
  { title: "Sport Classic Yacht",           image: "/images/sailing/Sport-Classic-Yacht.jpg",  href: "/only-for-you/sport-classic" },
  { title: "Traditional Sailboat",          image: "/images/sailing/traditional.jpg",          href: "/only-for-you/traditional" },
  { title: "Sailboat Regatta",              image: "/images/sailing/regate.jpg",               href: "/only-for-you/regatta" },
];

// Card portrait (forme verticale) : image aspect 3:4 + titre dessous, titre orange au survol.
function Card({ item }) {
  const content = (
    <>
      <div className="w-full relative mb-6 overflow-hidden aspect-[3/4] rounded-xl">
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
  const items = sailingRentalItems;
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
        className="mx-auto mb-8"
      />

      <p className="max-w-3xl mx-auto text-base md:text-lg text-[#acb0cd] leading-relaxed text-center font-normal normal-case mb-12 px-2">
        Only For You is more than a sailboat charter service&mdash;it&rsquo;s your gateway
        to unforgettable sailing experiences. Whether you&rsquo;re a seasoned sailor or
        a first-time adventurer, we craft bespoke journeys that match your aspirations
        and budget. From intimate family getaways to high-end voyages, every trip is
        designed with the same commitment to excellence and authenticity.
      </p>

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
