import Image from "next/image";
import Link from "next/link";
import HeroQuickSearch from "./HeroQuickSearch";

// Phrase d'accueil. Trajan (classe .trajan-regular du site) + ombre portee legere :
// la mer est sombre, l'ombre suffit sans ajouter de voile sur la photo.
function HeroBaseline({ className = "" }) {
  return (
    <p
      className={`trajan-regular uppercase tracking-[0.14em] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${className}`}
    >
      <span className="text-[#C0C0C0]">The Art of </span>
      <span className="text-[#C2622A]">Private</span>
      <span className="text-[#C0C0C0]"> Yachting</span>
    </p>
  );
}

export default function HeroBaner() {
  return (
    <>
      {/* Desktop section */}
      <section
        className="w-screen h-screen bg-cover bg-center bg-blend-normal relative py-20 px-6 hidden md:block"
        style={{
          backgroundImage: "url('/images/FondHero.jpg')",
        }}
      >
        {/* Sur le bleu de la mer : l'horizon est a y~485 et l'ecume commence vers
            y~655 ; le bloc tient dans cette bande. Il s'arrete avant x=1116, ou
            commence le logo anime. */}
        <div className="absolute top-[64%] left-[3%] w-[52%] -translate-y-1/2 z-10 text-center">
          <HeroBaseline className="text-3xl lg:text-4xl" />
        </div>

        <div className="absolute inset-0 flex items-center justify-end px-6 pointer-events-none">
          <Link href="/choices" className="pulse-animation pointer-events-auto">
            <Image
              src="/images/trans.png"
              alt="Qualityacht Logo"
              width={350}
              height={350}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Configurateur : les trois champs alimentent /yachts, qui les lit reellement. */}
        <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center px-8">
          <HeroQuickSearch variant="desktop" />
        </div>

      </section>

      {/* Mobile section */}
      <section className="w-screen h-screen relative py-20 px-6 block md:hidden overflow-hidden">
        {/* Background image using next/image */}
        <Image
          src="/images/hero-mobile-foredeck.jpg"
          alt="Pont avant d'un yacht Qualityacht"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top z-0"
        />

        {/* Mobile : le hero est une autre photo, sans mer bleue. La phrase se place
            dans la zone haute, largement au-dessus du logo anime. */}
        {/* Ciel bleu profond : le voile peut rester tres discret. Il ne sert qu'a
            couvrir le mat clair qui traverse la deuxieme ligne. */}
        <div className="absolute top-[16%] left-0 right-0 z-10 text-center">
          <div className="relative px-6 py-3">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.58) 22%, rgba(0,0,0,0.58) 78%, transparent)' }}
            />
            <HeroBaseline className="relative text-[26px]" />
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6 z-10">
          <Link href="/choices">
            <div className="overflow-hidden h-[200px] mb-[71px] w-[200px] flex items-end justify-center cursor-pointer">
              <Image
                src="/images/logoFondTrans.png"
                alt="Image mobile"
                width={200}
                height={200}
                className="animate-rise-mobile"
                priority
              />
            </div>
          </Link>
        </div>
      </section>

      {/* Configurateur mobile, place JUSTE APRES le hero : le logo anime occupe tout le
          bas du hero mobile, un panneau superpose le masquerait. */}
      <div className="block md:hidden w-full bg-[#0f1730] border-y border-[#C0C0C0]/15 px-5 py-6">
        <HeroQuickSearch variant="mobile" />
      </div>
    </>
  );
}
