import Image from 'next/image';
import ArtCultureStack from './ArtCultureStack';
import { SECTIONS } from './data';

export const metadata = {
  title: 'Art & Culture — Caribbean | Qualityacht',
  description:
    'Two worlds: Caribbean art (museums, galleries, exhibitions) and Caribbean culture (carnivals, festivals, seasons), sub-region by sub-region.',
};

// Taxi cubain (La Havane) : photo caraibe, elle va donc sur la page Caraibes ; la
// lanterne rouge est passee sur /art-culture (la page des destinations).
const HERO_IMAGE = '/images/art-culture/louis-renaudineau-79dDz5e_vdE-unsplash.jpg';

const HERO_TEXT =
  'A rarefied expression of Caribbean art and culture, curated for the most discerning clientele.';

// Page d'entree : 2 cards ART / CULTURE, meme composant que la card 3 panneaux de
// /historic-sites/caribbean-v3 (survol = le panneau s'elargit, Discover en bas).
// ART = ce qui etait deja sur cette page (musees, galeries, expositions).
// CULTURE = le calendrier client (carnavals, festivals, saisons, niveau VIP).
// text + bullets s'affichent dans le panneau OUVERT (props optionnels de SplitPanels ;
// les cards de historic-sites/caribbean-v3 n'en passent pas et restent vides).
const panels = [
  {
    key: 'art',
    title: SECTIONS.art.title,
    eyebrow: SECTIONS.art.eyebrow,
    img: SECTIONS.art.img,
    href: '/art-culture/caribbean/art',
    text: 'Caribbean art blends heritage and contemporary refinement, offering a subtle yet compelling cultural dimension to any yachting journey.',
    bullets: [
      'Exclusive access to curated galleries and private exhibitions',
      'Meetings with established and emerging regional artists',
      'Private visits to ateliers and artisan workshops',
      'Opportunities to acquire distinctive, collectible works',
      'Seamless integration of cultural moments into bespoke itineraries',
    ],
  },
  {
    key: 'culture',
    title: SECTIONS.culture.title,
    eyebrow: SECTIONS.culture.eyebrow,
    img: SECTIONS.culture.img,
    href: '/art-culture/caribbean/culture',
    text: 'Caribbean culture unfolds in refined layers of heritage, tradition, and understated authenticity, enriching each journey with a sense of place that is both timeless and deeply immersive.',
    bullets: [
      'Privileged access to historic estates and cultural landmarks',
      'Curated encounters with local traditions and heritage experts',
      'Private culinary experiences inspired by regional influences',
      'Refined selection of fresh, non-alcoholic cocktails crafted from local fruits, suitable for all ages',
      'Discreet participation in select cultural events and celebrations',
      'Seamless integration of cultural immersion within bespoke itineraries',
    ],
  },
];

export default function CaribbeanArtCulturePage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* HERO : la photo est montree EN ENTIER (pleine largeur, hauteur au ratio de
          l'image, AUCUN rognage). Degrade reduit, titre descendu tout en bas. Le
          title-line est SORTI de la photo (juste en dessous, voir plus bas). */}
      <section className="relative pt-[70px] md:pt-0">
        <Image
          src={encodeURI(HERO_IMAGE)}
          alt="Art & Culture — Caribbean"
          width={5000}
          height={3333}
          priority
          sizes="100vw"
          className="block w-full h-auto saturate-[1.4] contrast-[1.1] brightness-[1.03]"
        />
        {/* Degrade bas (h-1/4) : liaison avec le fond, aucun texte sur la photo */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#26272a]/85 via-[#26272a]/25 to-transparent" />
      </section>

      {/* TITRE HORS de la photo (sous le hero, sur fond sombre — plus rien d'ecrit sur l'image) */}
      <div className="flex flex-col items-center text-center px-6 pt-8 md:pt-10">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-2">
          Caribbean · Private Client Edition
        </p>
        <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
          Art &amp; Culture
        </h1>
        <p className="mt-2 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em]">
          Museums · Galleries · Exhibitions
        </p>
        <div className="relative w-28 md:w-40 h-6 mt-4">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* TEXTE SOUS LE HERO */}
      <div className="px-6 md:px-14 pt-8 md:pt-10">
        <p className="max-w-3xl mx-auto text-center text-base md:text-lg leading-relaxed text-[#acb0cd]">
          {HERO_TEXT}
        </p>
      </div>

      {/* 2 CARDS empilees (texte a cote de la photo, reveal par masque, fond nuages) */}
      <ArtCultureStack cards={panels} />
    </div>
  );
}
