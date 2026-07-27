'use client';

// ══ Halal Caraibes v17 — GOLDEN HOUR ═══════════════════════════════════════════
// MEME squelette, memes tokens, memes composants que /charters/destinations/caribbean-v17.
// Ce qui change : le CASTING (medias cat:'halal' en priorite) et le REGISTRE du copy.
// La mise en page, elle, ne bouge pas d'un pixel — c'est ce qui fait qu'il s'agit de la
// meme marque et non d'une "version halal" au rabais.
//
// Cadrage : aucun plan de corps en maillot, aucun couple enlace, aucune silhouette
// torse nu. Les humains sont de dos, en portrait de visage, ou en groupe familial.
// Le pont prive et l'absence de vis-a-vis deviennent un ARGUMENT MONTRE, pas une
// mention legale. La conformite est enoncee comme un detail d'organisation — c'est
// exactement la maniere haut de gamme de l'enoncer.

import GoldPage from '@/components/vibe/gold/GoldPage';

const CONTENT = {
  // 1 — L'heure. Famille au bord de mer : l'action reste, l'ivresse sportive s'apaise.
  hero: {
    videoLandscape: '/media/quality/halal/hero-halal.mp4',
    posterLandscape: '/media/quality/halal/hero-halal.jpg',
    videoPortrait: '/media/quality/halal/fun-port-1.mp4',
    posterPortrait: '/media/quality/halal/fun-port-1.jpg',
    posterAlt: 'family together at the water’s edge in late afternoon light',
    kicker: 'Caribbean · December to May',
    title: 'At 5:40 the engines go quiet and the whole deck is yours until Maghrib.',
    lede: 'The swim platform is down, the sight lines are closed, and nobody is coming past.',
    ctaPrimary: { label: 'Plan the week', href: '/contact' },
    ctaSecondary: { label: 'See the boats that are free', href: '/yachts' },
  },

  // 2 — La these (identique : c'est la voix de la marque)
  standfirst: {
    heading: 'We book the light before we book the anchorage.',
    paragraphs: [
      'A charter week is not thirty-one islands in seven days. It is about six hours a day that genuinely belong to your family, and one of those hours is worth building the other five around.',
      'So we plan backwards from it. Where the tender drops you at four. Which side of the island the wind leaves alone after five. What time the chef lights the grill so that nobody has to come inside to eat.',
    ],
  },

  // 3 — Le visage. Le meilleur portrait du stock halal : son orange dialogue
  //     directement avec l'accent #E3A857 — la substitution RENFORCE la palette.
  laugh: {
    src: '/media/quality/halal/pexels-tomris-656234478-32862944.jpg',
    alt: 'woman in a bright orange headscarf smiling in warm afternoon light',
    objectPosition: '50% 34%',
    caption: 'Anse Marcel · 17:22',
    line: 'She has been out on the aft deck since four. Nobody has brought up going in.',
  },

  // 4 — Entre cinq et sept, plus le fait d'organisation (priere, qibla)
  editorial: {
    kicker: 'Two — the hours',
    heading: 'Between five and seven, the Caribbean stops performing.',
    paragraphs: [
      'The day boats have gone home. The trade wind drops to almost nothing and the surface flattens enough to read the anchor chain through it.',
      'The crew keeps prayer times on the bridge screen and turns the bow to the qibla when you ask — it takes them under a minute.',
      'The teak is still 31°C under your feet at seven o’clock. This is the part nobody photographs for a brochure, because it is not a place — it is a time of day, and you have to already be out there to get it.',
    ],
  },

  // 5 — La table (inchangee : elle porte l'identite de la direction)
  table: {
    src: '/media/quality/interiors/stockcake-diner-sur-yacht-au-coucher-du-soleil-3.jpg',
    alt: 'dining table laid on a yacht deck at sunset',
    objectPosition: '50% 55%',
    caption: 'Aft deck · 18:05',
    line: 'The table gets laid while the light is still good. Mint tea poured too hot, dates, and a generator you cannot hear.',
  },

  // 6 — De dos : meme geste, meme pudeur, registre pere-fils
  backs: {
    src: '/media/quality/halal/nathan-dumlao-qs656qrrpoo-unsplash.jpg',
    alt: 'father and small son walking hand in hand along a pontoon',
    heading: 'Two of you, facing the wrong way, for twenty minutes.',
    caption: 'Îles des Saintes · 17:50',
  },

  // 7 — Trois heures. 16:40 et 19:10 recastes ; 17:55 neutre, donc conserve.
  hours: {
    kicker: 'Three — one evening, end to end',
    heading: 'How the last three hours actually go.',
    entries: [
      {
        time: '16:40',
        title: 'The beach belongs to the boys again',
        text: 'The north beach empties out after four. It can be privatised for the afternoon if you would rather not share it at all.',
        src: '/media/quality/halal/pexels-jmendezrf-4000822.jpg',
        alt: 'three boys laughing together on a bright beach',
      },
      {
        time: '17:55',
        title: 'The mainsail goes amber and stays amber',
        text: 'Seventy minutes of it, roughly. Long enough to sail back the slow way round the headland instead of the short way.',
        src: '/media/quality/boats/sporthearts-yacht-4993408-1920.jpg',
        alt: 'yacht rigging and sail lit amber by the low sun',
      },
      {
        time: '19:10',
        title: 'The galley fills with the last of the light',
        text: 'A fully halal galley, and a chef who cooks what you actually eat at home rather than a translated version of it.',
        src: '/media/quality/interiors/stockcake-interieur-de-yacht-au-coucher-du-solei.jpg',
        alt: 'yacht interior bathed in low sunset light',
      },
    ],
  },

  // 8 — L'arrivee (inchangee)
  arrival: {
    src: '/media/quality/jets/nate-johnston-ygowzcctb1i-unsplash.jpg',
    alt: 'traveller stepping off a private jet onto a sunlit tarmac',
    objectPosition: '55% 42%',
    heading: 'You land at two. The children are in the water by four.',
    body: 'Private terminal, a car that is already there, forty minutes of tender, and a crew briefed on your household before you board.',
  },

  // 9 — La respiration (inchangee)
  breath: {
    src: '/media/quality/beach/maarten-van-den-heuvel-siuwr3ucir0-unsplash.jpg',
    alt: 'palm leaning over a clear turquoise lagoon',
    line: 'Nothing is scheduled between here and Thursday.',
  },

  // 10 — La demande
  closing: {
    kicker: 'Enquiries',
    heading: 'Tell us the week. We will find the hour.',
    paragraphs: [
      'Send your dates and how many of you there are. Within one working day you get two or three boats that are genuinely free for those dates, crewed, with a route written backwards from five o’clock.',
      'Fully halal galley, alcohol-free by default, and a crew briefed before you board.',
    ],
    ctaPrimary: { label: 'Plan your week', href: '/contact' },
    ctaSecondary: { label: 'Or look at the fleet first', href: '/yachts' },
  },
};

export default function HalalGoldClient({ fontClass }) {
  return <GoldPage fontClass={fontClass} content={CONTENT} />;
}
