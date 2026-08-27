// ══ Trois photos flottantes — /sport-fishing ══
//
// Composant LOCAL a la page Sport Fishing. Aucun composant global n'est touche.
//
// Composition asymetrique : les trois cartes ne partagent ni la meme largeur, ni
// le meme decalage vertical, ni le meme plan (z-index et ombres differents).
// Chaque carte flotte sur sa propre duree, sa propre amplitude et son propre
// retard, pour eviter le balancement mecanique de trois elements synchronises.
//
// Chaque photo garde SON ratio d'origine (deux verticales, une presque carree) :
// aucun format n'est deforme et aucune image n'est rognee arbitrairement.
//
// prefers-reduced-motion : l'animation est coupee, la composition reste.

import Image from 'next/image';

const DOSSIER = '/media/client/lydie/2026-08-27/sport-fishing';

const PHOTOS = [
  {
    src: `${DOSSIER}/fishing-lures.webp`,
    alt: 'Trolling lures laid out before a day at sea',
    ratio: '1200 / 1800',
    // largeur, decalage vertical, plan, duree, amplitude, retard
    colonne: 'md:col-span-4 md:mt-0',
    flotte: 'flotte-a',
  },
  {
    src: `${DOSSIER}/big-game-catch.webp`,
    alt: 'Big-game fish brought alongside the boat',
    ratio: '1233 / 1800',
    colonne: 'md:col-span-4 md:-mt-10 md:z-10',
    flotte: 'flotte-b',
  },
  {
    src: `${DOSSIER}/sailfish-team.webp`,
    alt: 'Crew and guests with a sailfish at the stern',
    ratio: '720 / 833',
    colonne: 'md:col-span-4 md:mt-24',
    flotte: 'flotte-c',
  },
];

export default function FloatingGallery() {
  return (
    <section className="relative bg-[#26272a] px-6 md:px-14 py-16 md:py-24 overflow-hidden">
      <style>{`
        @keyframes flotteA { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-14px,0); } }
        @keyframes flotteB { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-22px,0); } }
        @keyframes flotteC { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-9px,0); } }
        .flotte-a { animation: flotteA 11s ease-in-out infinite; }
        .flotte-b { animation: flotteB 14s ease-in-out infinite; animation-delay: -3.5s; }
        .flotte-c { animation: flotteC 9s ease-in-out infinite; animation-delay: -6s; }
        @media (prefers-reduced-motion: reduce) {
          .flotte-a, .flotte-b, .flotte-c { animation: none !important; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[12px] md:text-[13px] uppercase tracking-[0.24em] text-[#B87333] font-semibold mb-2">
            On the Water
          </p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            The Shape of a Day
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 md:items-start">
          {PHOTOS.map((photo) => (
            <figure key={photo.src} className={`relative m-0 ${photo.colonne}`}>
              <div className={photo.flotte}>
                <div
                  className="relative w-full overflow-hidden rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] shadow-[0_28px_60px_-28px_rgba(0,0,0,0.85)]"
                  style={{ aspectRatio: photo.ratio }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, 32vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
