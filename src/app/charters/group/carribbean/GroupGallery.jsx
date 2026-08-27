'use client';

// ══ Composition editoriale eclatee — Group Caraibes ══
//
// Composant LOCAL a cette route. Sept medias : une video et six photos, en
// composition asymetrique plutot qu'en grille administrative. Chaque media garde
// son ratio d'origine, aucune deformation, aucun texte par-dessus.
//
// La video secondaire respecte prefers-reduced-motion comme le hero : sous
// reduced motion elle n'est pas creee, son poster prend sa place.

import Image from 'next/image';
import { useEffect, useState } from 'react';

const D = '/media/client/lydie/2026-08-27/group-caribbean/gallery';

const PHOTOS_HAUT = [
  { src: `${D}/yacht-at-sea.webp`,      alt: 'Motor yacht under way off the coast',      classe: 'md:col-span-5 md:mt-0'   },
  { src: `${D}/group-swimming.webp`,    alt: 'Guests swimming together off the stern',   classe: 'md:col-span-4 md:mt-14'  },
  { src: `${D}/tropical-flowers.webp`,  alt: 'Tropical flowers in the islands',          classe: 'md:col-span-3 md:mt-6'   },
];

const PHOTOS_BAS = [
  { src: `${D}/caribbean-host.webp`,    alt: 'Crew member welcoming guests aboard',      classe: 'md:col-span-4 md:mt-0'   },
  { src: `${D}/motor-yacht-aerial.webp`,alt: 'Aerial view of a motor yacht at anchor',   classe: 'md:col-span-5 md:mt-12'  },
];

function Carte({ src, alt, classe }) {
  return (
    <figure className={`relative m-0 ${classe}`}>
      <div className="relative w-full overflow-hidden rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] shadow-[0_26px_56px_-26px_rgba(0,0,0,0.85)]">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 92vw, 40vw"
          className="w-full h-auto object-cover"
        />
      </div>
    </figure>
  );
}

export default function GroupGallery() {
  const [animer, setAnimer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const appliquer = () => setAnimer(!mq.matches);
    appliquer();
    mq.addEventListener?.('change', appliquer);
    return () => mq.removeEventListener?.('change', appliquer);
  }, []);

  return (
    <section className="relative bg-[#26272a] px-6 md:px-14 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[12px] md:text-[13px] uppercase tracking-[0.24em] text-[#B87333] font-semibold mb-2">
            Together, At Sea
          </p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            A Week Shared
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-6 md:items-start">
          {PHOTOS_HAUT.map((p) => <Carte key={p.src} {...p} />)}
        </div>

        {/* Video secondaire, en pleine largeur entre les deux rangees. */}
        <div className="relative mt-6 md:mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32]">
          <Image
            src={`${D}/floating-party-poster.webp`}
            alt="Guests gathered on a floating platform beside the yacht"
            fill
            sizes="(max-width: 768px) 92vw, 1100px"
            className={`object-cover ${animer ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}
          />
          {animer && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src={`${D}/floating-party.mp4`}
              poster={`${D}/floating-party-poster.webp`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-6 md:items-start mt-6 md:mt-10">
          {PHOTOS_BAS.map((p) => <Carte key={p.src} {...p} />)}
        </div>
      </div>
    </section>
  );
}
