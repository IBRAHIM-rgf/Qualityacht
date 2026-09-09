import Image from 'next/image';
import Link from 'next/link';
import { destinations } from '../charters/destinationsData';

// Landing générique d'une thématique (Art & Culture, Horses & Riding, Historic Sites).
// Hero + intro + grille des 16 destinations en cards VERTICALES (portrait 3/4 +
// titre dessous, style /only-for-you). Une card est cliquable si Caraïbes
// (caribbeanHref) ou si son titre est dans `links`. `cardImages` surcharge la photo.
// Couleurs du hero rendues plus vives. Constante partagee : /art-culture,
// /historic-sites et /horses-riding ont ainsi exactement le meme traitement.
const HERO_BOOST = 'saturate-[1.4] contrast-[1.1] brightness-[1.03]';

export default function ThemeLandingPage({ eyebrow, title, heroImage, intro, caribbeanHref, links = {}, cardImages = {}, heroFullPhoto = false, animated = false, hideHeroText = false, heroGradientSoft = false, heroZoomDuration = '9s' }) {
  // heroGradientSoft : degrade plus leger (photo deja sombre au premier plan, cf.
  // /historic-sites : arche du Taj Mahal). Defaut = degrade d'origine partout ailleurs.
  const heroGradient = (
    // Le degrade couvre TOUTE la hauteur et finit a to-transparent. Avant, il
    // etait en h-1/2 colle en bas et s'arretait a /10 : a mi-hauteur, l'opacite
    // sautait de 10% a zero d'un coup, ce qui tracait une ligne horizontale
    // visible en travers de la photo (signale par le client sur /events).
    <div className={`absolute inset-0 bg-gradient-to-t ${heroGradientSoft ? 'from-[#26272a]/70 via-[#26272a]/20 to-transparent' : 'from-[#26272a] via-[#26272a]/45 to-transparent'}`} />
  );
  const heroOverlay = (
    <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-4 md:pb-6">
      <div className="hero-rise flex flex-col items-center">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3">{eyebrow}</p>
        <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
          {title}
        </h1>
        <div className="relative w-28 md:w-40 h-5 mt-4">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
  return (
    <div className="bg-[#26272a] text-[#acb0cd]">
      <style>{`
        .hero-rise { opacity: 0; animation: heroRise 2.2s cubic-bezier(0.22,1,0.36,1) 0.15s forwards; }
        @keyframes heroRise { from { opacity: 0; transform: translateY(48px); } to { opacity: 1; transform: translateY(0); } }
        .hero-zoom { animation: heroZoom var(--hz, 18s) ease-in-out infinite alternate; will-change: transform; }
        @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.15); } }
        .theme-float { animation: themeFloat var(--tf, 6s) ease-in-out infinite alternate; will-change: transform; }
        @keyframes themeFloat { from { transform: translateY(-9px); } to { transform: translateY(9px); } }
        @media (prefers-reduced-motion: reduce) { .hero-zoom, .theme-float { animation: none !important; } }
      `}</style>

      {/* ══ HERO ══
          HERO_BOOST : couleurs plus vives (saturation + contraste legerement remontes).
          Pose sur la PHOTO seule — le degrade et le titre sont des freres, ils ne sont
          pas affectes. Meme parti pris que les panneaux de historic-sites/caribbean-v3. */}
      {heroFullPhoto ? (
        // Dezoom max : photo entiere (ratio naturel), aucun crop
        <section className="relative pt-[70px]">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={encodeURI(heroImage)} alt={title} className={`block w-full h-auto ${HERO_BOOST}`} />
            {heroGradient}
            {!hideHeroText && heroOverlay}
          </div>
        </section>
      ) : (
        <section className={`relative pt-[70px] md:pt-0 overflow-hidden ${animated ? 'h-[60vh] md:h-[82vh]' : 'h-[58vh] md:h-[78vh]'}`}>
          <Image src={heroImage} alt={title} fill priority sizes="100vw" style={animated ? { '--hz': heroZoomDuration } : undefined} className={`object-cover object-center ${HERO_BOOST} ${animated ? 'hero-zoom' : ''}`} />
          {heroGradient}
          {!hideHeroText && heroOverlay}
        </section>
      )}

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
            {destinations.map((d, i) => {
              const isCaribbean = d.title === 'Caraïbes';
              const label = isCaribbean ? 'Caribbean' : d.title;
              const href = isCaribbean ? caribbeanHref : (links[d.title] || null);
              const img = cardImages[d.title] || d.image;
              const card = (
                <>
                  <div className={`w-full relative overflow-hidden aspect-[3/4] rounded-xl mb-4 ${animated ? 'shadow-[0_22px_50px_-16px_rgba(0,0,0,0.8)]' : ''}`}>
                    <Image
                      src={encodeURI(img)}
                      alt={label}
                      fill
                      sizes="(max-width:768px) 80vw, 25vw"
                      className={`object-cover rounded-xl transition-transform duration-500 ${isCaribbean ? 'origin-right scale-[1.06] group-hover:scale-110' : 'group-hover:scale-105'}`}
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold trajan-regular uppercase text-center leading-tight text-[#acb0cd] group-hover:text-[#c2622a] transition-colors duration-300">
                    {label}
                  </h3>
                </>
              );
              const wrapClass = `group flex flex-col items-center w-[70%] sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-[300px] ${animated ? 'theme-float' : ''}`;
              const floatStyle = animated ? { '--tf': `${5 + (i % 4)}s`, animationDelay: `${(i % 5) * 0.35}s` } : undefined;
              return href ? (
                <Link key={d.title} href={href} className={`${wrapClass} cursor-pointer`} style={floatStyle}>
                  {card}
                </Link>
              ) : (
                <div key={d.title} className={`${wrapClass} opacity-90`} style={floatStyle}>
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
