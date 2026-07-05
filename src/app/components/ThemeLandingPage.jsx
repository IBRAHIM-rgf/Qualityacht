import Image from 'next/image';
import Link from 'next/link';
import { destinations } from '../charters/destinationsData';

// Landing générique d'une thématique (Art & Culture, Horses & Riding, Historic Sites).
// Hero + intro + grille des 16 destinations en cards VERTICALES (portrait 3/4 +
// titre dessous, style /only-for-you). Une card est cliquable si Caraïbes
// (caribbeanHref) ou si son titre est dans `links`. `cardImages` surcharge la photo.
export default function ThemeLandingPage({ eyebrow, title, heroImage, intro, caribbeanHref, links = {}, cardImages = {} }) {
  return (
    <div className="bg-[#26272a] text-[#acb0cd]">
      {/* ══ HERO ══ */}
      <section className="relative pt-[70px] md:pt-0 h-[58vh] md:h-[78vh]">
        <Image src={heroImage} alt={title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-[#26272a]/45 to-[#26272a]/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-12 md:pb-16">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3">{eyebrow}</p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            {title}
          </h1>
          <div className="relative w-28 md:w-40 h-5 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </section>

      {/* ══ INTRO ══ */}
      {intro && (
        <section className="bg-[#26272a] py-14 md:py-20 px-6 md:px-14">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#acb0cd] text-base md:text-lg leading-relaxed">{intro}</p>
          </div>
        </section>
      )}

      {/* ══ DESTINATIONS (cards verticales — portrait 3/4 + titre dessous) ══ */}
      <section
        className="py-14 md:py-20 px-6 md:px-14"
        style={{ backgroundImage: "url('/images/nuagesAncien.png')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundColor: '#2e2f32' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-3">By Destination</p>
            <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">Destinations</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {destinations.map((d) => {
              const isCaribbean = d.title === 'Caraïbes';
              const label = isCaribbean ? 'Caribbean' : d.title;
              const href = isCaribbean ? caribbeanHref : (links[d.title] || null);
              const img = cardImages[d.title] || d.image;
              const card = (
                <>
                  <div className="w-full relative overflow-hidden aspect-[3/4] rounded-xl mb-4">
                    <Image src={encodeURI(img)} alt={label} fill sizes="(max-width:768px) 80vw, 25vw" className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold trajan-regular uppercase text-center leading-tight text-[#acb0cd] group-hover:text-[#c2622a] transition-colors duration-300">
                    {label}
                  </h3>
                </>
              );
              const wrapClass = 'group flex flex-col items-center w-[70%] sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-[300px]';
              return href ? (
                <Link key={d.title} href={href} className={`${wrapClass} cursor-pointer`}>
                  {card}
                </Link>
              ) : (
                <div key={d.title} className={`${wrapClass} opacity-90`}>
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
