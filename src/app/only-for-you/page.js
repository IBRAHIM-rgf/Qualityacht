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
const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const CTA_CUIVRE =
  'inline-flex min-h-[48px] w-full items-center justify-center text-center px-5 py-3 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a] text-[12px] font-semibold uppercase ' +
  'tracking-[0.16em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] ' +
  'transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] ' +
  'hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] ' + FOCUS;

const CTA_ARGENT =
  'inline-flex min-h-[48px] w-full items-center justify-center text-center px-5 py-3 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a]/50 text-[12px] font-semibold uppercase ' +
  'tracking-[0.16em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 ' +
  'hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] ' + FOCUS;

// Deux parcours par carte, cote a cote et jamais imbriques :
//   - direct vers l'experience Caraibes, qui supprime l'etape intermediaire ;
//   - vers la presentation detaillee du type de voilier.
// L'image et le titre ouvrent la presentation detaillee.
function Card({ item }) {
  const slug = item.href.replace('/only-for-you/', '');
  return (
    <article className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center">
      <Link
        href={item.href}
        className={`group block w-full transition-transform hover:scale-105 ${FOCUS}`}
      >
        <div className="w-full relative mb-6 overflow-hidden aspect-[3/4] rounded-xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <h2 className="text-lg font-semibold text-[#acb0cd] trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto group-hover:text-[#c2622a] transition-colors duration-300">
          {item.title}
        </h2>
      </Link>

      <div className="mt-5 w-full flex flex-col gap-3">
        <Link href={`/only-for-you/${slug}/carribbean`} className={CTA_CUIVRE}>
          Explore in the Caribbean
        </Link>
        <Link href={item.href} className={CTA_ARGENT}>
          Discover This Yacht Style
        </Link>
      </div>
    </article>
  );
}

// Photo fournie par la cliente (Lydie, 25/08/2026) : catamaran horizontal,
// 1400x800, sans mention de copyright dans ses metadonnees. Elle est deja
// legere (253 Ko) et n'a donc pas ete reencodee.
const HERO_IMAGE = '/media/client/lydie/2026-08-25/only-for-you/hero-catamaran.jpg';

export default function SailingRentalPage() {
  const items = sailingRentalItems;
  return (
    <main>
      {/* ══ HERO ══
          Le H1 de la page vient s'y poser : il reste le SEUL de la page. Le
          cadrage mobile est decale vers la gauche pour garder le catamaran et
          ses passagers dans le cadre malgre le format vertical. */}
      <section className="relative w-full h-[62vh] min-h-[420px] md:h-[74vh] overflow-hidden bg-[#26272a]">
        <Image
          src={HERO_IMAGE}
          alt="Catamaran under way with guests on board, turquoise water"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center max-md:object-[38%_50%]"
        />
        {/* Voile sombre neutre, uniquement pour la lisibilite du titre. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(38,39,42,0.35) 0%, rgba(38,39,42,0.10) 38%, rgba(38,39,42,0.55) 78%, rgba(38,39,42,0.92) 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-12 md:pb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white trajan-regular text-center uppercase tracking-wide drop-shadow-[0_3px_14px_rgba(0,0,0,0.85)]">
            only for you
          </h1>
          <Image
            src="/images/title-line.png"
            alt=""
            width={200}
            height={10}
            className="mx-auto mt-4"
          />
          {/* CTA unique du hero — style deja valide sur les autres pages. */}
          <Link
            href="/yachts?type=sailing"
            className="mt-6 inline-flex min-h-[48px] max-w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a]/70 backdrop-blur-sm px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
          >
            Explore the Fleet
          </Link>
        </div>
      </section>

    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-24 px-4"
      style={{ backgroundImage: "url('/images/services-bg.png')" }}
    >

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
    </main>
  );
}
