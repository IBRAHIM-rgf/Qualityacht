import Link from "next/link";
import Image from "next/image";

// ══ /choices ══
//
// Les quatre choix precedents (Sales, Management, Charter Fleet, Charter
// Management) sont remplaces. Les liens desktop etaient poses en `top-72 left-60`
// et `bottom-56 right-72`, donc cales sur le viewport : la composition se
// deformait d'une taille d'ecran a l'autre. Ils sont desormais positionnes en
// POURCENTAGE a l'interieur du conteneur du symbole, qui est lui-meme borne.
//
// Le bleu marine historique est retire de cette page uniquement ; le reste du
// site, dont le Header et le Footer, garde le sien.

const CHOIX = [
  { label: "Destination", href: "/charters/destinations" },
  { label: "Last Minute Charter", href: "/charters/last-minute" },
  { label: "Day Charter", href: "/charters/on-demand" },
  { label: "Group Charter", href: "/charters/group" },
];

// Positions en pourcentage du conteneur carre du symbole. Composition
// symetrique : les quatre capsules occupent les quatre coins.
const ANCRAGES = [
  "left-[-14%] top-[16%]",    // haut gauche  — Destination
  "left-[-14%] bottom-[16%]", // bas gauche   — Last Minute Charter
  "right-[-14%] top-[16%]",   // haut droite  — Day Charter
  "right-[-14%] bottom-[16%]",// bas droite   — Group Charter
];

const FOCUS =
  "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]";

// Capsule commune : meme largeur et meme hauteur minimale pour les quatre,
// meme si un libelle passe sur deux lignes.
const CAPSULE =
  // 48 px minimum partout ; en desktop on impose 64 px pour que les quatre
  // capsules gardent la meme hauteur meme quand un libelle passe sur deux lignes.
  "flex min-h-[48px] md:min-h-[64px] w-full items-center justify-center rounded-full " +
  "border border-[#C0C0C0]/70 bg-[#26272A]/80 px-5 py-3 text-center " +
  "trajan-regular uppercase tracking-[0.14em] text-[#C0C0C0] leading-tight " +
  "transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] " +
  FOCUS;

export const metadata = {
  title: "Choose Your Experience | Qualityacht",
  description:
    "Destination, last-minute charter, day charter or group charter — choose where your Qualityacht experience begins.",
};

export default function Choices() {
  return (
    <div className="bg-[#3A3B3F]">
      <h1 className="sr-only">Choose Your Qualityacht Experience</h1>

      {/* ══ DESKTOP — composition autour du symbole ══ */}
      <section
        className="relative hidden md:flex items-center justify-center min-h-screen bg-[#3A3B3F] px-8 py-16"
        style={{
          backgroundImage: "url('/images/services-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Conteneur du symbole : c'est LUI qui sert de repere aux quatre liens,
            plus le viewport. Sa largeur suit la hauteur disponible pour que le
            symbole reste entier meme sur un ecran bas comme 1024x768. */}
        <div className="relative w-full max-w-[min(58vh,560px)] aspect-square">
          <Image
            src="/images/trans.png"
            alt=""
            fill
            sizes="(max-width: 1280px) 40vw, 560px"
            priority
            className="object-contain"
          />

          <nav aria-label="Choose your charter experience" className="absolute inset-0">
            <ul className="contents">
              {CHOIX.map((c, i) => (
                <li
                  key={c.href}
                  className={`absolute ${ANCRAGES[i]} w-[42%] min-w-[168px] -translate-y-1/2 lg:w-[46%]`}
                >
                  <Link href={c.href} prefetch={false} className={`${CAPSULE} text-[13px] lg:text-[15px]`}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ══ MOBILE — symbole puis liste verticale, principe conserve ══ */}
      <section
        className="md:hidden flex flex-col items-center bg-[#3A3B3F] px-5 pt-24 pb-14"
        style={{
          backgroundImage: "url('/images/services-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative w-[62vw] max-w-[280px] aspect-square">
          <Image src="/images/trans.png" alt="" fill sizes="62vw" priority className="object-contain" />
        </div>

        <nav
          aria-label="Choose your charter experience"
          className="w-full max-w-sm mt-8"
        >
          <ul className="flex flex-col gap-3.5">
            {CHOIX.map((c) => (
              <li key={c.href}>
                <Link href={c.href} prefetch={false} className={`${CAPSULE} text-[14px]`}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </div>
  );
}
