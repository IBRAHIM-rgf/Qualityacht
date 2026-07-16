import Image from 'next/image';
import SplitPanels from '../../historic-sites/caribbean-v3/SplitPanels';
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
      {/* HERO (meme traitement que les pages theme : object-cover + degrade bas +
          titre en surimpression) */}
      <section className="relative pt-[70px] md:pt-0 h-[58vh] md:h-[78vh]">
        <Image
          src={encodeURI(HERO_IMAGE)}
          alt="Art & Culture — Caribbean"
          fill
          priority
          sizes="100vw"
          // object-bottom : le hero est plus panoramique que la photo (2.05 vs 1.50), 27%
          // de la hauteur est rogne. Par defaut c'est moitie haut / moitie bas, ce qui
          // coupait l'enseigne TAXI. En calant sur le bas, tout le bas de la photo — donc
          // le TAXI — reste visible, et le rognage se fait sur le ciel.
          className="object-cover object-bottom saturate-[1.4] contrast-[1.1] brightness-[1.03]"
        />
        {/* Degrade allege (le renforcement etait destine a la photo des lanternes, qui
            est partie sur /art-culture) : le bas de la photo du taxi cubain — dont
            l'enseigne TAXI — doit rester visible. Lisibilite du titre assuree par les
            drop-shadow, le fond derriere le texte etant deja sombre ici. */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#26272a]/85 via-[#26272a]/35 to-transparent" />

        {/* Le bloc titre est remonte (pb genereux) pour laisser l'enseigne TAXI visible
            EN DESSOUS de lui. Il se pose alors sur le pare-brise, tres clair : sa
            lisibilite est assuree par un voile sombre FLOUTE, cale sur le texte lui-meme
            (et non sur la photo), qui n'atteint donc pas le TAXI. */}
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-28 md:pb-48">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-x-12 -inset-y-6 md:-inset-x-24 md:-inset-y-10 rounded-[50%] bg-[#26272a]/70 blur-2xl"
            />

            <div className="relative flex flex-col items-center">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                Caribbean · Private Client Edition
              </p>
              <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Art &amp; Culture
              </h1>
              <div className="relative w-28 md:w-40 h-5 mt-4">
                <Image src="/images/title-line.png" alt="" fill className="object-contain" />
              </div>
              <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                Museums · Galleries · Exhibitions — Carnivals · Festivals · Seasons
              </p>
            </div>
          </div>
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
