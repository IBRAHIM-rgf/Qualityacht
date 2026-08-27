import Image from "next/image";
import Link from "next/link";
import { destinations } from "../destinationsData";
import SportsHeroTriptych from "./SportsHeroTriptych";

// ItemsGrid rend toujours son propre <h1>. Comme le hero triptyque porte deja le
// H1 « Sports Yacht Charter », le brancher ici en aurait produit deux — or le
// brief en exige un seul. ItemsGrid etant partage par onze routes, il n'est pas
// modifie : sa grille est reproduite ci-dessous a l'identique (meme fond, meme
// espacement, memes cartes, meme survol), avec des <h2> au lieu du <h1>.
//
// Copie LOCALE des destinations : seule la carte Caraibes mene au guide Sports
// dedie. Les quinze autres gardent leur destination actuelle et
// destinationsData.js reste intact.
const SPORTS_GUIDES = {
  "Caraïbes": "/charters/sports/carribbean",
};

const sportsItems = destinations.map((d) =>
  SPORTS_GUIDES[d.title] ? { ...d, href: SPORTS_GUIDES[d.title] } : d
);

export default function SportsCharter() {
  return (
    <>
      <SportsHeroTriptych />

      <section
        className="relative flex flex-col items-center bg-cover bg-center bg-no-repeat py-24 px-4"
        style={{ backgroundImage: "url('/images/services-bg.png')" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
          {sportsItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
            >
              <div className="w-full relative mb-6 overflow-hidden h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h2 className="text-lg font-semibold text-copper-500 mb-2 trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto">
                {item.title}
              </h2>
              <p className="text-[#C0C0C0] text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
