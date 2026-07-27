'use client';

// ══ SALT — Direction B, slot v18 (Caraibes) ═══════════════════════════════════
// These : le visiteur doit sentir l'eau sur la peau avant de comprendre qu'on lui
// vend un bateau. La page est une succession de plongeons, pas une brochure.
// Video D'ABORD (~70% de la surface scrollee est du media en mouvement), fond
// presque-noir a biais petrole, UN seul turquoise structurel, et l'orange de
// marque garde pour le tout dernier bouton.
// Toute la mise en forme vit dans src/components/vibe/salt/ — ici, uniquement
// le choix des medias et le texte.

import SaltStyles from '@/components/vibe/salt/SaltStyles';
import SaltHero from '@/components/vibe/salt/SaltHero';
import SaltReadout from '@/components/vibe/salt/SaltReadout';
import SaltTriptych from '@/components/vibe/salt/SaltTriptych';
import SaltChapter from '@/components/vibe/salt/SaltChapter';
import SaltFaces from '@/components/vibe/salt/SaltFaces';
import SaltToybox from '@/components/vibe/salt/SaltToybox';
import SaltRail from '@/components/vibe/salt/SaltRail';
import SaltQuiet from '@/components/vibe/salt/SaltQuiet';
import SaltClose from '@/components/vibe/salt/SaltClose';

const M = '/media/quality';

// ── 1. Le plongeon ────────────────────────────────────────────────────────────
const hero = {
  videoLandscape: `${M}/people/hero-people.mp4`,
  posterLandscape: `${M}/people/hero-people.jpg`,
  videoPortrait: `${M}/people/fun-port-2.mp4`,
  posterPortrait: `${M}/people/fun-port-2.jpg`,
  videoAlt: 'Jet skis running alongside a yacht on turquoise Caribbean water',
  kicker: 'St Barths · Anguilla · St Martin — December to May',
  title: ['The sea is 28°C', 'and the tender is', 'already in the water.'],
  lead: 'Seven days of it. You say go, someone drops the swim ladder, and the rest of the afternoon belongs to you.',
  ctaLabel: 'Start a charter',
  ctaHref: '/request-quote',
  linkLabel: 'See the boats',
  linkHref: '/charters',
  readout: ['Wind 17 kn / SW', 'Sea 28°C', "17°42'N 62°50'W"],
};

// ── 2. La mesure, en contrepoint sec de l'emotion ─────────────────────────────
const readout = {
  h3: 'Read the numbers.',
  lead: "None of this is a mood board. It's a forecast.",
  stats: [
    { value: 700, suffix: '+', label: "Islands and cays inside one week's sailing" },
    { value: 26, suffix: '', label: 'Nations and territories, no visa runs' },
    { value: 181, suffix: '', label: 'Yachts on our Caribbean list right now' },
    { value: 45, suffix: 'min', label: 'The longest hop between two of our anchorages' },
  ],
};

// ── 3. Triptyque de videos VERTICALES natives (jamais recadrees) ──────────────
const triptych = {
  h2: 'Three minutes after the anchor drops.',
  lead: 'Nobody changes for dinner. Nobody checks the time.',
  columns: [
    {
      src: `${M}/aerial/aerial-port-1.mp4`,
      poster: `${M}/aerial/aerial-port-1.jpg`,
      alt: 'Vertical drone footage rising over the anchorage',
      label: '01 — The drone goes up',
    },
    {
      src: `${M}/people/fun-port-1.mp4`,
      poster: `${M}/people/fun-port-1.jpg`,
      alt: 'Guests jumping off the yacht into the sea',
      label: '02 — Someone jumps first',
    },
    {
      src: `${M}/beach/beach-port.mp4`,
      poster: `${M}/beach/beach-port.jpg`,
      alt: 'Turquoise shallows breaking on an empty beach',
      label: '03 — The beach is 200 m away',
    },
  ],
};

// ── 4. Le seul chapitre qui vend quelque chose qui n'est pas a vendre ─────────
const dolphins = {
  sticky: true,
  number: 'Chapter 02',
  video: `${M}/aerial/dolphin.mp4`,
  poster: `${M}/aerial/dolphin.jpg`,
  alt: 'Spinner dolphins running through clear open water',
  h2: 'They find you. Not the other way round.',
  lead: 'Spinner dolphins run the bow wave off the north coast most mornings before nine. There is no booking form for this, and the captain will cut the engines without asking you first.',
};

// ── 5. Les visages, grands et nets — l'actif le plus persuasif ────────────────
const faces = {
  h3: 'You come up laughing. Every single time.',
  lead: 'Salt in your eyes, hair flat, breathing hard, and someone on deck already filming. That is the photograph you actually keep — not the one of the boat.',
  caption: '16:40 — Third time off the platform',
  images: [
    {
      src: `${M}/people/daoud-abismail-tbp8124hgmw-unsplash.jpg`,
      alt: 'Swimmer surfacing through a burst of vivid teal water',
    },
    {
      src: `${M}/people/yiran-ding-kaxbo3lnhum-unsplash.jpg`,
      alt: "Close-up of a swimmer's face breaking through the splash",
    },
    {
      src: `${M}/people/pexels-rachel-claire-4992857.jpg`,
      alt: 'Woman laughing in golden late-afternoon water',
    },
  ],
};

// ── 6. L'echelle et la vitesse : la seule section qui parle de trajet ─────────
const crossing = {
  number: 'Chapter 03',
  video: `${M}/aerial/hero-aerial.mp4`,
  poster: `${M}/aerial/hero-aerial.jpg`,
  videoPortrait: `${M}/aerial/hero-aerial-portrait.mp4`,
  posterPortrait: `${M}/aerial/hero-aerial-portrait.jpg`,
  alt: 'Drone flying low along a turquoise island coastline',
  h2: 'Forty knots of open water between breakfast and lunch.',
  lead: 'Gustavia to Road Bay. You will spend most of it on the foredeck, wet, holding a rail, and not saying very much.',
  route: 'Gustavia ›› 22 NM ›› Ile Fourchue ›› 31 NM ›› Road Bay ›› 14 NM ›› Prickly Pear',
};

// ── 7. L'inventaire : des specs, pas des promesses ────────────────────────────
const toybox = {
  h3: 'Everything on board is meant to get used.',
  lead: 'The toys are not decoration and the crew does not flinch when you ask for all of them before lunch.',
  cards: [
    {
      src: `${M}/aerial/pexels-sergio-hurtado-265552058-14762447.jpg`,
      alt: 'Kitesurfer cutting across the reef shallows beside an anchored yacht',
      title: 'Kite over the reef',
      spec: '15 to 22 kn, December to April, shallows at 1.2 m',
    },
    {
      src: `${M}/halal/pexels-beach-1837030-1920.jpg`,
      alt: 'Surfer riding inside a vivid blue barrel wave',
      title: 'Surf the east side',
      spec: 'Two boards aboard, the captain knows which reef is working',
    },
    {
      src: `${M}/boats/gregor-volvo-ocean-race-816438-1920.jpg`,
      alt: 'Racing yacht under orange and black sails with crew on the rail',
      title: 'Race the fleet',
      spec: 'Wednesday nights out of Gustavia, crew spots open',
    },
    {
      src: `${M}/aerial/hugh-whyte-a74owxiwxtc-unsplash.jpg`,
      alt: 'Two clear-bottom kayaks paddling over bright turquoise water',
      title: 'Clear-bottom kayaks',
      spec: 'Two on the swim platform, turtles at seven in the morning',
    },
  ],
};

// ── 8. Le seul defilement horizontal, justifie : une cote se parcourt ────────
const rail = {
  h3: 'Pick where you wake up.',
  lead: 'Eleven anchorages, none of them more than a morning apart. Tell us which one and we build the week backwards from there.',
  items: [
    { kind: 'image', src: `${M}/aerial/pexels-zakynthos-1281685-1920.jpg`, alt: 'Turquoise cove framed by white cliffs with boats at anchor', name: 'Colombier — 6 m, sand' },
    { kind: 'video', src: `${M}/aerial/aerial-port-2.mp4`, poster: `${M}/aerial/aerial-port-2.jpg`, alt: 'Vertical drone clip over a shallow bay', name: 'Shell Beach — 4 m, sand' },
    { kind: 'image', src: `${M}/beach/jono-hirst-9vnxo0ccr3q-unsplash.jpg`, alt: 'Thatched dock reaching out over brilliant turquoise sea', name: 'Ile Fourchue — 9 m, rock and sand' },
    { kind: 'image', src: `${M}/boats/romain-water-hlhcx8zspxo-unsplash.jpg`, alt: 'Colourful dinghies moored off a wooden Caribbean dock', name: 'Road Bay — 5 m, sand' },
    { kind: 'video', src: `${M}/boats/boat-port.mp4`, poster: `${M}/boats/boat-port.jpg`, alt: 'Vertical clip of a yacht under sail', name: 'Prickly Pear — 7 m, sand' },
    { kind: 'image', src: `${M}/aerial/shane-stagner-cdzb-cfsycu-unsplash.jpg`, alt: 'Island beach with a red-roofed hut and vivid turquoise water', name: 'Sandy Island — 3 m, coral edge' },
    { kind: 'image', src: `${M}/beach/maarten-van-den-heuvel-siuwr3ucir0-unsplash.jpg`, alt: 'Palm leaning over a crystal-clear turquoise lagoon', name: 'Tintamarre — 8 m, sand' },
    { kind: 'image', src: `${M}/aerial/vessel-regist.jpg`, alt: 'Lone figure on a white sand beach beside a turquoise reef', name: 'Grand Cul-de-Sac — 4 m, sand' },
    { kind: 'image', src: `${M}/boats/colin-hobson-ry9mqe6jssk-unsplash.jpg`, alt: 'Yachts anchored in a sunlit turquoise Caribbean bay', name: 'Marigot — 6 m, mud and sand' },
  ],
};

// ── 9. La seule respiration chaude de la page ────────────────────────────────
const quiet = {
  number: 'Chapter 04',
  video: `${M}/interiors/interior-band.mp4`,
  poster: `${M}/interiors/interior-band.jpg`,
  alt: 'Yacht saloon and aft deck in the last of the evening light',
  h2: 'Then it goes quiet.',
  lead: 'Salt drying on your shoulders, the generator off at nine, whole grilled fish and rice on the aft table, and the anchor chain talking to itself all night about eight metres below you.',
  monoLine: '21:10 — Generator off · 27°C · No wind',
  photos: [
    { src: `${M}/interiors/stockcake-diner-sur-yacht-au-coucher-du-soleil-3.jpg`, alt: 'Table laid on the aft deck at sunset' },
    { src: `${M}/food/raul-baz-pocjhyin6xs-unsplash.jpg`, alt: 'Whole grilled fish, avocado and rice seen from above' },
  ],
};

// ── 10. Le seul point orange de toute la page ────────────────────────────────
const close = {
  h2: "Tell us the week. We'll find the boat.",
  lead: "Give us your dates and how many of you there are. That's enough to start.",
  ctaLabel: 'Start a charter',
  ctaHref: '/request-quote',
  linkLabel: 'Or just send us your dates',
  linkHref: '/request-quote',
  monoLine: 'A reply within one working day · A real shortlist within three · A captain who already knows the swell on that side of the island',
  thumb: {
    src: `${M}/people/pexels-william-zali-7863870-33194523.jpg`,
    alt: 'Yacht and jet skis running together on open turquoise water',
  },
  band: {
    src: `${M}/beach/pexels-ocean-1867285-1920.jpg`,
    alt: 'Vivid turquoise lagoon stretching to an empty horizon',
  },
};

export default function CaribbeanV18Client({ fontClass = '' }) {
  return (
    // <main> est deja fourni par layout.js : ici un simple conteneur scope.
    <div className={`salt-root ${fontClass}`}>
      {/* La feuille de style locale reprend la main sur Trajan et sur la
          resaturation globale des images (voir SaltStyles). */}
      <SaltStyles />
      <SaltHero data={hero} />
      <SaltReadout data={readout} />
      <SaltTriptych data={triptych} />
      <SaltChapter data={dolphins} />
      <SaltFaces data={faces} />
      <SaltChapter data={crossing} />
      <SaltToybox data={toybox} />
      <SaltRail data={rail} />
      <SaltQuiet data={quiet} />
      <SaltClose data={close} />
    </div>
  );
}
