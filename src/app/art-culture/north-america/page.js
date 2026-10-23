import Image from 'next/image';
import ArtCultureStack from '../caribbean/ArtCultureStack';
import { SECTIONS } from './data';

export const metadata = {
  title: 'Art & Culture — North America | Qualityacht',
  description:
    'Culture across the United States, Canada and Mexico: heritage, living traditions and celebrations, woven into bespoke yachting itineraries.',
};

// /art-culture/north-america (client 2026-10-23), calquee sur /art-culture/bahamas : hero,
// puis les 2 cards ART / CULTURE. CULTURE (textes du client) ouvre les 20 sous-regions ;
// ART : « Coming Soon » en attendant les contenus du client.
// Photos : photos North America deja sur le site, en attendant celles du client.
const HERO_IMAGE = '/media/client/2026-10-16/north-america-cards/east-coast.jpg';

const panels = [
  {
    key: 'art',
    title: SECTIONS.art.title,
    eyebrow: SECTIONS.art.eyebrow,
    img: SECTIONS.art.img,
    soon: true,
    text: '',
    bullets: [],
  },
  {
    key: 'culture',
    title: SECTIONS.culture.title,
    eyebrow: SECTIONS.culture.eyebrow,
    img: SECTIONS.culture.img,
    href: '/art-culture/north-america/culture',
    text: 'Across the United States, Canada and Mexico, culture unfolds through distinctive histories, living traditions and regional creativity, enriching each journey with a sense of place that feels both authentic and deeply engaging.',
    bullets: [
      'Curated visits to historic estates and cultural landmarks',
      'Meaningful encounters with local traditions, artisans and heritage experts',
      'Private culinary experiences inspired by regional flavors and seasonal ingredients',
      'Refined, alcohol-free creations crafted with local fruits and botanicals',
      'Thoughtful participation in selected festivals and cultural celebrations',
      'Seamless integration of cultural discovery into bespoke itineraries',
    ],
  },
];

export default function NorthAmericaArtCulturePage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      <section className="relative pt-[70px] md:pt-0">
        <div className="relative w-full h-[75vh] md:h-[85vh]">
          <Image
            src={HERO_IMAGE}
            alt="Art & Culture — North America"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#26272a]/90 via-[#26272a]/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-6 md:pb-10">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            North America · Private Client Edition
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Art &amp; Culture
          </h1>
          <p className="mt-2 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            Museums · Galleries · Exhibitions
          </p>
          <div className="relative w-28 md:w-40 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </section>

      <ArtCultureStack cards={panels} />
    </div>
  );
}
