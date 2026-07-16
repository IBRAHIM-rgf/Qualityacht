import Image from 'next/image';
import SplitPanels from '../../historic-sites/caribbean-v3/SplitPanels';
import { SECTIONS } from './data';

export const metadata = {
  title: 'Fine Food & Dining — Caribbean | Qualityacht',
  description:
    'Two worlds: Caribbean fine food (provisioning, producers, fine grocery) and Caribbean dining (tables, chefs, beach clubs), sub-region by sub-region.',
};

// Photo d'etal de fruits tropicaux (bananes, ananas, noix de coco, mangues) : elle est
// caraibe et alimentaire, elle porte donc le hero de la page Caraibes. La photo
// atmospherique de la landing reste sur /fine-food-dining.
const HERO_IMAGE = '/images/halal/fruits_1440x800.jpg';

const HERO_TEXT =
  'A rarefied expression of Caribbean produce and Caribbean tables, curated for the most discerning clientele.';

// Page d'entree : 2 cards FINE FOOD / DINING, meme composant que les cards de
// /art-culture/caribbean et /historic-sites/caribbean-v3 (survol = le panneau s'elargit,
// Discover en bas). text + bullets ne s'affichent que dans le panneau OUVERT.
const panels = [
  {
    key: 'fine-food',
    title: SECTIONS['fine-food'].title,
    img: SECTIONS['fine-food'].img,
    href: '/fine-food-dining/caribbean/fine-food',
    text: 'Caribbean produce is the quiet luxury of a charter: what comes aboard decides what is served, long before a chef touches it.',
    bullets: [
      'Fine grocery provisioning delivered wherever the yacht lies',
      'Wines, champagnes and rare spirits sourced to order',
      'Day-boat fish and seafood landed at the anchorage',
      'Island producers, growers and market gardeners',
      'Fresh tropical fruit selected the morning it is served',
      'Dietary, halal and allergen requirements handled discreetly',
    ],
  },
  {
    key: 'dining',
    title: SECTIONS.dining.title,
    img: SECTIONS.dining.img,
    boost: true,
    href: '/fine-food-dining/caribbean/dining',
    text: 'Caribbean dining runs from the barefoot table on the sand to the tasting menu ashore, and the best of it is rarely the most visible.',
    bullets: [
      'Tables held at short notice in the season',
      'Private chefs aboard, menus written around the guest',
      'Beach clubs and waterfront tables reachable by tender',
      'Encounters with chefs and producers behind the plate',
      'Private dinners staged ashore, on a beach or at anchor',
      'Seamless integration of every table into bespoke itineraries',
    ],
  },
];

export default function CaribbeanFineFoodDiningPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* HERO (meme traitement que /art-culture/caribbean : object-cover + degrade bas
          renforce + titre en surimpression). Cette photo est prise en plein soleil : sans
          un degrade fort, le titre et le chapo passent dessus et deviennent illisibles. */}
      <section className="relative pt-[70px] md:pt-0 h-[58vh] md:h-[78vh]">
        <Image
          src={encodeURI(HERO_IMAGE)}
          alt="Fine Food & Dining — Caribbean"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#26272a] via-[#26272a]/75 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-8 md:pb-12">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            Caribbean · Private Client Edition
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            Fine Food &amp; Dining
          </h1>
          <div className="relative w-28 md:w-40 h-5 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            Provisioning · Producers · Fine Grocery — Tables · Chefs · Beach Clubs
          </p>
        </div>
      </section>

      {/* TEXTE SOUS LE HERO */}
      <div className="px-6 md:px-14 pt-12 md:pt-16">
        <p className="max-w-3xl mx-auto text-center text-base md:text-lg leading-relaxed text-[#acb0cd]">
          {HERO_TEXT}
        </p>
      </div>

      {/* 2 CARDS */}
      <SplitPanels panels={panels} />
    </div>
  );
}
