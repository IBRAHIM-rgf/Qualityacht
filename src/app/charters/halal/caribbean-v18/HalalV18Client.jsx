'use client';

// ══ SALT — Direction B, slot v18 (Caraibes HALAL) ═════════════════════════════
// MEME charpente que la version principale : memes tokens, meme Archivo Black
// Expanded, memes dix sections, meme rythme video-d'abord. On ne fabrique pas une
// sous-version plus sage — l'energie est identique, seuls les corps a l'ecran et
// les details operationnels changent : le sujet passe du solo a la TRIBU (trois
// enfants sur l'echelle de bain, un equipage sous spinnaker, un pere et un fils).
// Le pont prive devient un argument explicite plutot qu'un sous-entendu.

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

// ── 1. Le plongeon — video famille au bord de mer ─────────────────────────────
const hero = {
  videoLandscape: `${M}/halal/hero-halal.mp4`,
  posterLandscape: `${M}/halal/hero-halal.jpg`,
  videoPortrait: `${M}/halal/fun-port-1.mp4`,
  posterPortrait: `${M}/halal/fun-port-1.jpg`,
  videoAlt: 'A family playing together in the sea off a Caribbean beach',
  kicker: 'St Barths · Anguilla · St Martin — December to May',
  title: ['The sea is 28°C,', 'the deck is yours,', 'and nobody is watching.'],
  lead: 'Seven days on a boat where the crew clears the aft deck the moment you ask, and the swim ladder goes down whenever you want it to.',
  ctaLabel: 'Start a charter',
  ctaHref: '/request-quote',
  linkLabel: 'See the boats',
  linkHref: '/charters',
  readout: ['Wind 17 kn / SW', 'Sea 28°C', "17°42'N 62°50'W"],
};

// ── 2. La mesure — quatrieme compteur remplace par la donnee de bord ─────────
const readout = {
  h3: 'Read the numbers.',
  lead: "None of this is a mood board. It's a forecast.",
  stats: [
    { value: 700, suffix: '+', label: "Islands and cays inside one week's sailing" },
    { value: 26, suffix: '', label: 'Nations and territories, no visa runs' },
    { value: 181, suffix: '', label: 'Yachts on our Caribbean list right now' },
    { value: 5, suffix: '', label: 'Prayer times and qibla on the bridge display, updated by position' },
  ],
};

// ── 3. Triptyque vertical — la colonne humaine passe sur les medias halal ────
const triptych = {
  h2: 'Three minutes after the anchor drops, all six of you are in.',
  lead: 'Nobody changes for dinner. Nobody checks the time.',
  columns: [
    {
      src: `${M}/aerial/aerial-port-1.mp4`,
      poster: `${M}/aerial/aerial-port-1.jpg`,
      alt: 'Vertical drone footage rising over the anchorage',
      label: '01 — The drone goes up',
    },
    {
      src: `${M}/halal/fun-port-2.mp4`,
      poster: `${M}/halal/fun-port-2.jpg`,
      alt: 'Family jumping into the sea from the swim platform',
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

// ── 4. Chapitre dauphins — strictement inchange (aucun corps humain) ─────────
const dolphins = {
  sticky: true,
  number: 'Chapter 02',
  video: `${M}/aerial/dolphin.mp4`,
  poster: `${M}/aerial/dolphin.jpg`,
  alt: 'Spinner dolphins running through clear open water',
  h2: 'They find you. Not the other way round.',
  lead: 'Spinner dolphins run the bow wave off the north coast most mornings before nine. There is no booking form for this, and the captain will cut the engines without asking you first.',
};

// ── 5. Les visages — la substitution la plus importante, et elle ne perd rien ─
const faces = {
  h3: 'They come up laughing. All three of them, every single time.',
  lead: 'Salt in their eyes, hair flat, breathing hard, and the ladder going back down before anyone has caught their breath. Private charter means the deck is closed and the only camera on board is yours.',
  caption: '16:40 — Third time off the platform',
  images: [
    {
      src: `${M}/halal/pexels-jmendezrf-4000822.jpg`,
      alt: 'Three boys laughing together in the shallows on a Caribbean beach',
    },
    {
      src: `${M}/halal/pexels-tomris-656234478-32862944.jpg`,
      alt: 'Warm portrait of a woman in a bright orange headscarf',
    },
    {
      src: `${M}/halal/pexels-yassir-draka-2148838902-33803165.jpg`,
      alt: 'Woman in blue modest beachwear carrying a red bucket at the water line',
    },
  ],
};

// ── 6. Chapitre aerien — strictement inchange ────────────────────────────────
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

// ── 7. L'inventaire + la carte pleine largeur du pont prive ─────────────────
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
      src: `${M}/halal/ahmed-qt78ulpicrm-unsplash.jpg`,
      alt: 'Crew working the foredeck under a red and blue spinnaker',
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
  wide: {
    title: 'Deck closed on request',
    spec: 'Tender, crew and cameras off the aft deck in under five minutes',
  },
};

// ── 8. Le rail des mouillages — strictement inchange ────────────────────────
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

// ── 9. Le calme — la troisieme photo ancre le soir sur la famille ───────────
const quiet = {
  number: 'Chapter 04',
  video: `${M}/interiors/interior-band.mp4`,
  poster: `${M}/interiors/interior-band.jpg`,
  alt: 'Yacht saloon and aft deck in the last of the evening light',
  h2: 'Then it goes quiet.',
  lead: 'Salt drying on your shoulders, the generator off at nine, whole grilled fish and rice from a halal-provisioned galley on the aft table, no alcohol anywhere on board unless you ask for it, and the anchor chain talking to itself all night about eight metres below you.',
  monoLine: '21:10 — Generator off · Isha at 19:04 · 27°C · No wind',
  photos: [
    { src: `${M}/interiors/stockcake-diner-sur-yacht-au-coucher-du-soleil-3.jpg`, alt: 'Table laid on the aft deck at sunset' },
    { src: `${M}/halal/nathan-dumlao-qs656qrrpoo-unsplash.jpg`, alt: 'Father and small son walking hand in hand along the dock' },
  ],
};

// ── 10. La cloture — meme unique point orange ───────────────────────────────
const close = {
  h2: "Tell us the week. We'll find the boat.",
  lead: "Give us your dates and how many of you there are. That's enough to start.",
  ctaLabel: 'Start a charter',
  ctaHref: '/request-quote',
  linkLabel: 'Or just send us your dates',
  linkHref: '/request-quote',
  monoLine: 'A reply within one working day · A real shortlist within three · Halal provisioning and prayer space confirmed before you sign anything',
  thumb: {
    src: `${M}/halal/pexels-skylight-views-2151863365-38244090.jpg`,
    alt: 'Two friends in bright lemon-print kaftans laughing together',
  },
  band: {
    src: `${M}/beach/pexels-ocean-1867285-1920.jpg`,
    alt: 'Vivid turquoise lagoon stretching to an empty horizon',
  },
};

export default function HalalV18Client({ fontClass = '' }) {
  return (
    // <main> est deja fourni par layout.js : ici un simple conteneur scope.
    <div className={`salt-root ${fontClass}`}>
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
