import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Tailored Halal Private Charter | Qualityacht',
  description:
    'A fully halal private yacht charter shaped around your family and your faith — halal galley, alcohol-free ambiance, a quiet space for prayer, privacy and bespoke itineraries.',
};

const HERO_IMAGE = '/images/halal/7945425-portrait-3138562.jpg';
const FEATURE_IMAGE = '/images/halal/vecteezy_woman-in-hijab-gazes-thoughtfully-at-the-ocean-while_69947790.jpg';

const TAGLINE = 'A halal charter, quietly perfected for you.';

const INTRO = {
  lead: 'A private yacht that honours your faith as carefully as it honours your comfort.',
  body:
    'From an alcohol-free galley to a quiet space for prayer, every detail is arranged around you and your family. Tell us what matters, and we tailor the vessel, the crew, and the rhythm of each day to suit. Nothing announced, nothing compromised.',
};

// Eyebrows curés (libellés courts de section) ; titres + corps issus du workflow.
const SECTIONS = [
  {
    key: 'halal-galley-cuisine',
    eyebrow: 'Halal Cuisine',
    title: 'The Halal Galley',
    body:
      'On request, the galley can be run halal: no pork, no alcohol in provisioning or in the cooking, and ingredients sourced with care wherever your course takes you. The details are handled quietly and without compromise.\n\nA private chef shapes each menu around your tastes, dietary needs, and the moments that matter — an intimate dinner, a family gathering, a quiet day at anchor. Everything is prepared with care and served with understated confidence.',
    bullets: [
      { label: 'Halal provisioning', text: 'Halal ingredients sourced wherever you sail, arranged on request.' },
      { label: 'No pork, no alcohol', text: 'Neither is brought aboard for the galley — in provisioning or in the cooking.' },
      { label: 'Bespoke menus', text: 'A private chef tailors each dish to your tastes and the occasion.' },
    ],
  },
  {
    key: 'alcohol-free-ambiance',
    eyebrow: 'Alcohol-Free',
    title: 'Aboard, At Ease',
    body:
      'From the moment you step aboard, the atmosphere can be kept entirely alcohol-free and unhurried, in quiet keeping with your preferences. On request, the galley is provisioned and prepared without alcohol — none in the cooking, none in the glass — while the mood stays calm and considered throughout.\n\nEverything is arranged discreetly and in advance with your crew, tailored to you. There is nothing to explain and nothing to manage once you are aboard — only a serene, unhurried charter that feels entirely your own.',
    bullets: [
      { label: 'Alcohol-free ambiance', text: 'On request, no alcohol served or stored aboard — from galley to glass.' },
      { label: 'Discreetly arranged', text: 'Preferences settled with your crew beforehand, so nothing needs explaining on the day.' },
      { label: 'Calm by design', text: 'An unhurried, dignified atmosphere, kept in quiet keeping with your preferences.' },
    ],
  },
  {
    key: 'prayer-aboard',
    eyebrow: 'Prayer Aboard',
    title: 'A Quiet Space to Pray',
    body:
      'A private corner of your yacht can be set aside for prayer, with the Qibla direction indicated and a clean, comfortable place to stand. Should you wish, arrangements for wudu can be readied nearby, so the moment is yours undisturbed.\n\nSimply let us know your preferences, and the crew will do what they can to keep the space quiet and, if it helps, to note the day’s prayer times — so worship can settle gently into the rhythm of your hours at sea, unhurried and dignified.',
    bullets: [
      { label: 'Qibla indicated', text: 'A quiet prayer area with the direction of prayer marked on request.' },
      { label: 'Wudu nearby', text: 'Facilities for ablution readied close at hand where possible.' },
      { label: 'Prayer times', text: 'On request, the crew can help keep track of the day’s prayer times.' },
    ],
  },
  {
    key: 'privacy-and-modesty',
    eyebrow: 'Privacy & Modesty',
    title: 'Held in Confidence',
    body:
      'Your privacy is considered as carefully as your itinerary. We can favour secluded anchorages and quiet coves, keep the upper decks shielded from view, and shape each day so your family enjoys the yacht entirely as its own.\n\nDiscretion extends to the crew. Service is calm and unobtrusive, guest details are kept in confidence, and a female crew presence can be arranged on request for households and guests who value it.',
    bullets: [
      { label: 'Private decks', text: 'Shielded, secluded spaces reserved for your family.' },
      { label: 'Quiet anchorages', text: 'Sheltered coves chosen for calm and seclusion.' },
      { label: 'Female crew', text: 'Arranged on request to suit your preferences.' },
    ],
  },
  {
    key: 'family-and-children',
    eyebrow: 'Family & Children',
    title: 'Room to Grow Together',
    body:
      'From the youngest travellers to grandparents, the yacht adapts to your family. On request, we can arrange connecting cabins, quieter spaces for rest, and an unhurried daily rhythm. The crew attend to small details, so parents can simply be present.\n\nDays can be shaped around your children, with activities and mealtimes tailored to their pace. During Ramadan, suhoor and iftar can be timed thoughtfully, and Eid marked aboard, so the whole family feels unhurried, private, and at home on the water.',
    bullets: [
      { label: 'Cabins arranged', text: 'Connecting or adjacent cabins for parents and children, on request.' },
      { label: 'A gentle pace', text: 'Days and mealtimes shaped around young ones and elders alike.' },
      { label: 'Ramadan & Eid', text: 'Suhoor, iftar, and Eid observance woven into your itinerary, on request.' },
    ],
  },
  {
    key: 'tailored-itineraries',
    eyebrow: 'Tailored Itineraries',
    title: 'A Voyage Shaped Around You',
    body:
      'No fixed package, no set course. Your itinerary begins with a conversation — the waters you wish to see, the pace you prefer, the moments that matter to your family. From there, we compose a private journey around your wishes.\n\nWe can suggest destinations and quiet anchorages to consider, then shape the days around your rhythm: time for prayer, rest, and unhurried moments together. Details are arranged on request, so the voyage feels less like a booking and more like your own.',
    bullets: [
      { label: 'A private conversation', text: 'We begin by listening, then shape the journey around your wishes.' },
      { label: 'Considered destinations', text: 'Calm anchorages and welcoming ports, suggested to suit your family.' },
      { label: 'Your own rhythm', text: 'The pace, the stops, the days — arranged on request, never fixed.' },
    ],
  },
];

const CTA = {
  title: 'Charter On Your Terms',
  body:
    'Share your preferences and we will shape a private, halal charter to match. Every request is met discreetly, from cuisine to crew.',
  buttonLabel: 'Request Your Charter',
};

function BurntLine({ className = '' }) {
  return (
    <div className={`relative w-28 md:w-40 h-5 ${className}`}>
      <Image src="/images/title-line.png" alt="" fill className="object-contain" />
    </div>
  );
}

export default function HalalPrivateCharterPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd]">
      {/* ══ HERO — split : panneau titre + portrait N&B ══ */}
      <section className="grid md:grid-cols-2 pt-[70px] md:pt-0 bg-[#26272a]">
        {/* Portrait */}
        <div className="order-1 md:order-2 relative h-[46vh] md:h-[88vh]">
          <Image src={HERO_IMAGE} alt="Tailored Halal Private Charter" fill priority sizes="(max-width:768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: '50% 28%' }} />
          {/* Fondu vers le panneau titre */}
          <div className="absolute inset-0 md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-[#26272a] bg-gradient-to-t from-[#26272a] via-transparent to-transparent pointer-events-none" />
        </div>
        {/* Panneau titre */}
        <div className="order-2 md:order-1 flex flex-col justify-center px-6 md:px-14 py-12 md:py-0">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-4">Qualityacht · Private Charter</p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            Tailored Halal<br />Private Charter
          </h1>
          <BurntLine className="my-6" />
          <p className="text-[#acb0cd] text-base md:text-lg tracking-wide max-w-md">{TAGLINE}</p>
        </div>
      </section>

      {/* ══ INTRO ══ */}
      <section className="bg-[#26272a] py-16 md:py-24 px-6 md:px-14">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-4">A Private Halal Charter</p>
          <p className="trajan-regular text-xl md:text-3xl text-[#C0C0C0] leading-snug mb-6">{INTRO.lead}</p>
          <p className="text-[#acb0cd] text-base md:text-lg leading-relaxed">{INTRO.body}</p>
          <p className="text-[#acb0cd]/85 text-sm md:text-base leading-relaxed mt-6 max-w-2xl mx-auto">
            With extensive experience in halal-friendly travel, we curate discreet private yacht experiences for an
            international clientele that values understatement, precision, and impeccable service.
          </p>
        </div>
      </section>

      {/* ══ BANDEAU photo océan ══ */}
      <div className="relative w-full h-[34vh] md:h-[52vh] overflow-hidden">
        <Image src={FEATURE_IMAGE} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: '50% 40%' }} />
        <div className="absolute inset-0 bg-[#26272a]/25" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2e2f32] to-transparent" />
      </div>

      {/* ══ SECTIONS ══ */}
      <section
        className="relative py-16 md:py-24 px-6 md:px-14 bg-[#2e2f32]"
        style={{ backgroundImage: "url('/images/nuagesAncien.png')", backgroundSize: 'contain', backgroundPosition: 'center' }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SECTIONS.map((s) => (
            <article key={s.key} className="bg-[#3a3b3f]/80 border border-[#C0C0C0]/15 rounded-2xl p-6 md:p-8 flex flex-col">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#B87333] mb-2">{s.eyebrow}</p>
              <h2 className="trajan-regular text-xl md:text-2xl text-[#C0C0C0] mb-4">{s.title}</h2>
              <div className="space-y-3">
                {s.body.split('\n\n').map((p, i) => (
                  <p key={i} className="text-[#acb0cd] text-sm md:text-[15px] leading-relaxed">{p}</p>
                ))}
              </div>
              <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                {s.bullets.map((b) => (
                  <li key={b.label} className="text-sm leading-relaxed">
                    <span className="text-[#d39478] font-medium">{b.label}</span>
                    <span className="text-[#acb0cd]/80"> — {b.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="bg-[#1b223d] py-16 md:py-20 px-6 md:px-14">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-3">Bespoke Enquiry</p>
          <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.08em] text-[#C0C0C0] mb-4">{CTA.title}</h2>
          <p className="text-[#acb0cd] text-base md:text-lg leading-relaxed mb-8">{CTA.body}</p>
          <Link
            href="/request-quote"
            className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 rounded-full border text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] trajan-regular text-[#c2622a] border-[#C0C0C0] bg-[#26272a] hover:bg-[#c2622a] hover:text-white hover:border-[#c2622a] transition-all duration-300"
          >
            {CTA.buttonLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
