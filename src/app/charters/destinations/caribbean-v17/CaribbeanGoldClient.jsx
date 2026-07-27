'use client';

// ══ Caraibes v17 — GOLDEN HOUR ═════════════════════════════════════════════════
// Direction A. 17h40 : la lumiere devient miel, on vient de couper le moteur, et
// personne n'a envie de rentrer. Traitement EDITORIAL — un magazine de voyage qu'on
// lit lentement, pas une brochure qui vend.
// Ce fichier ne contient QUE le casting et le copy ; toute la mise en page vit dans
// src/components/vibe/gold/ et est partagee a l'identique avec la version halal.

import GoldPage from '@/components/vibe/gold/GoldPage';

const CONTENT = {
  // 1 — L'heure
  hero: {
    videoLandscape: '/media/quality/people/hero-people.mp4',
    posterLandscape: '/media/quality/people/hero-people.jpg',
    videoPortrait: '/media/quality/people/fun-port-1.mp4',
    posterPortrait: '/media/quality/people/fun-port-1.jpg',
    posterAlt: 'guests riding jet-skis beside an anchored yacht in late afternoon light',
    kicker: 'Caribbean · December to May',
    title: 'At 5:40 the engines go quiet and nobody asks what time dinner is.',
    lede: 'A minute after this frame the water goes the colour of weak tea. You are still in it, and the swim ladder is still down.',
    ctaPrimary: { label: 'Plan the week', href: '/contact' },
    ctaSecondary: { label: 'See the boats that are free', href: '/yachts' },
  },

  // 2 — La these
  standfirst: {
    heading: 'We book the light before we book the anchorage.',
    paragraphs: [
      'A charter week is not thirty-one islands in seven days. It is about six hours a day that genuinely belong to you, and one of those hours is worth building the other five around.',
      'So we plan backwards from it. Where the tender drops you at four. Which side of the island the wind leaves alone after five. What time the chef lights the grill so that nobody has to come inside to eat.',
    ],
  },

  // 3 — Le rire, a grande echelle
  laugh: {
    src: '/media/quality/people/pexels-rachel-claire-4992857.jpg',
    alt: 'woman laughing in shallow water lit by low golden sun',
    objectPosition: '50% 38%',
    caption: 'Anse Marcel · 17:22',
    line: 'She has been in the water since four. Nobody has brought up going in.',
  },

  // 4 — Entre cinq et sept
  editorial: {
    kicker: 'Two — the hours',
    heading: 'Between five and seven, the Caribbean stops performing.',
    paragraphs: [
      'The day boats have gone home. The trade wind drops to almost nothing and the surface flattens enough to read the anchor chain through it.',
      'The teak is still 31°C under your feet at seven o’clock. This is the part nobody photographs for a brochure, because it is not a place — it is a time of day, and you have to already be out there to get it.',
    ],
  },

  // 5 — La table
  table: {
    src: '/media/quality/interiors/stockcake-diner-sur-yacht-au-coucher-du-soleil-3.jpg',
    alt: 'dining table laid on a yacht deck at sunset',
    objectPosition: '50% 55%',
    caption: 'Aft deck · 18:05',
    line: 'The table gets laid while you are still in the water. Ice, a glass, and a generator you cannot hear.',
  },

  // 6 — Les trois de dos
  backs: {
    src: '/media/quality/people/pexels-andersonportella-35541050.jpg',
    alt: 'father holding his two daughters by the hand, facing the surf',
    heading: 'Three of you, facing the wrong way, for twenty minutes.',
    caption: 'Îles des Saintes · 17:50',
  },

  // 7 — Trois heures, trois images
  hours: {
    kicker: 'Three — one evening, end to end',
    heading: 'How the last three hours actually go.',
    entries: [
      {
        time: '16:40',
        title: 'The horses come down to the shallows',
        text: 'They do this every afternoon on the north beach, with or without you. Boots optional, and the water is warmer than the air.',
        src: '/media/quality/horses/sunriseforever-boy-7314817-1920.jpg',
        alt: 'boy riding a horse through backlit surf, water flying',
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
        title: 'The marina lights come on behind you',
        text: 'By then you are in 38°C water on the foredeck with the island turning into a silhouette.',
        src: '/media/quality/interiors/pexels-vince-32727472.jpg',
        alt: 'deck jacuzzi overlooking a marina at dusk',
      },
    ],
  },

  // 8 — L'arrivee
  arrival: {
    src: '/media/quality/jets/nate-johnston-ygowzcctb1i-unsplash.jpg',
    alt: 'traveller stepping off a private jet onto a sunlit tarmac',
    objectPosition: '55% 42%',
    heading: 'You land at two. You are swimming by four.',
    body: 'Private terminal, a car that is already there, forty minutes of tender, and a crew that knows how you take your coffee before you have said it out loud.',
  },

  // 9 — La respiration
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
    ],
    ctaPrimary: { label: 'Plan your week', href: '/contact' },
    ctaSecondary: { label: 'Or look at the fleet first', href: '/yachts' },
  },
};

export default function CaribbeanGoldClient({ fontClass }) {
  return <GoldPage fontClass={fontClass} content={CONTENT} />;
}
