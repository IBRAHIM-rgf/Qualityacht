// ══ /group — Qualityacht Group (client 2026-09-14) ══
//
// Page NOUVELLE : rien de l'existant n'est modifie ni supprime. Elle reutilise
// l'architecture du projet (Next App Router, Tailwind, Trajan pour les titres,
// Montserrat pour le corps) et n'ajoute aucune dependance.
//
// Palette imposee par le client :
//   fond #252629 · cartes #2D2E32 · titres #C0C0C0 · textes #ACB0CD
//   accent et nom Qualityacht #C2622A · bordures rgba(192,192,192,0.28)
//
// Les logos des societes ne sont PAS inventes : chaque emplacement est un bloc
// vide pret a recevoir le fichier reel.

import Image from 'next/image';
import Link from 'next/link';
import styles from './group.module.css';
import Reveal from './Reveal';

export const metadata = {
  title: 'Qualityacht Group — Beyond The Ordinary',
  description:
    'Qualityacht Group brings together specialist companies across international real estate, luxury interiors, wellness and marine innovation.',
};

const HERO = '/media/client/lydie/2026-09-14/group/hero-marina.jpg';

const OR = '#C2622A';
const ARGENT = '#C0C0C0';
const TEXTE = '#ACB0CD';

const CTA_PLEIN =
  'inline-flex min-h-[48px] items-center justify-center px-8 py-3.5 rounded-full ' +
  'border border-[#C2622A] bg-[#C2622A]/12 text-[12px] font-semibold uppercase ' +
  'tracking-[0.2em] text-[#C2622A] transition-[background-color,box-shadow] duration-500 ' +
  'hover:bg-[#C2622A]/22 focus:outline-none focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-[#C2622A]';

const CTA_LIGNE =
  'inline-flex min-h-[48px] items-center justify-center px-8 py-3.5 rounded-full ' +
  'border border-[rgba(192,192,192,0.28)] text-[12px] font-semibold uppercase ' +
  'tracking-[0.2em] text-[#C0C0C0] transition-[border-color,color] duration-500 ' +
  'hover:border-[#C2622A] hover:text-[#C2622A] focus:outline-none focus-visible:outline ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2622A]';

/* Variantes hero : meme style, avec un fond sombre opaque derriere le bouton
   pour rester lisibles par-dessus la photo. */
const CTA_PLEIN_HERO =
  'inline-flex min-h-[48px] items-center justify-center px-8 py-3.5 rounded-full ' +
  'border border-[#C2622A] bg-[#17181B]/80 backdrop-blur-[3px] text-[12px] font-semibold ' +
  'uppercase tracking-[0.2em] text-[#C2622A] transition-[background-color] duration-500 ' +
  'hover:bg-[#17181B]/92 focus:outline-none focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-[#C2622A]';

const CTA_LIGNE_HERO =
  'inline-flex min-h-[48px] items-center justify-center px-8 py-3.5 rounded-full ' +
  'border border-[rgba(192,192,192,0.55)] bg-[#17181B]/80 backdrop-blur-[3px] text-[12px] ' +
  'font-semibold uppercase tracking-[0.2em] text-[#C0C0C0] transition-[border-color,color] ' +
  'duration-500 hover:border-[#C2622A] hover:text-[#C2622A] focus:outline-none ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[#C2622A]';

const LIEN_CARTE =
  'mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase ' +
  'tracking-[0.2em] text-[#C2622A] transition-opacity duration-500 hover:opacity-70 ' +
  'focus:outline-none focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-[#C2622A]';

// ── Contenus (textes clients, anglais americain — non traduits, non modifies) ──

const ACTIVITES = [
  {
    titre: 'International Real Estate',
    texte:
      'Selected properties, development opportunities and trusted real-estate partners in sought-after international destinations.',
    cta: 'Explore Real Estate',
    href: '#real-estate',
  },
  {
    titre: 'Luxury Living',
    texte:
      'Furniture, rugs, linens and carefully chosen pieces for interiors with character, comfort and timeless appeal.',
    cta: 'Discover The Collection',
    href: '#luxury-living',
  },
  {
    titre: 'Wellness & Care',
    texte:
      'Products, services and experiences designed to bring greater balance, comfort and well-being into everyday life.',
    cta: 'Discover Wellness',
    href: '#wellness',
  },
  {
    titre: 'Water Filtration',
    texte:
      'Advanced water-filtration solutions for yachts, vessels and demanding marine environments.',
    cta: 'Explore Marine Solutions',
    href: '#marine',
  },
  {
    titre: 'Water Toys',
    texte:
      'A selection of premium equipment created to make time on the water more exciting, active and unforgettable.',
    cta: 'Discover Water Toys',
    href: '#marine',
  },
];

const GROUPES_IMMO = [
  { code: 'Group 01', role: 'International Property' },
  { code: 'Group 02', role: 'Development Opportunities' },
  { code: 'Group 03', role: 'Property Advisory' },
];

const SOCIETES = [
  'Group 01', 'Group 02', 'Group 03',
  'Luxury Living', 'Wellness', 'Water Filtration', 'Water Toys',
];

const PRINCIPES = [
  {
    titre: 'Curated',
    texte:
      'We do not offer everything. We select what deserves your attention, based on quality, relevance and trust.',
  },
  {
    titre: 'Complementary',
    texte:
      'Our companies cover different areas, allowing us to connect property, lifestyle, wellness and marine expertise.',
  },
  {
    titre: 'Long-Term',
    texte:
      'We believe in thoughtful decisions, reliable partnerships and relationships built to last.',
  },
];

const INTERETS = [
  'International Real Estate', 'Luxury Living', 'Wellness',
  'Water Filtration', 'Water Toys', 'Partnership', 'Other',
];

// ── Briques d'affichage ──

function SurTitre({ children }) {
  return (
    <p className="text-[11px] md:text-[12px] uppercase tracking-[0.32em] font-semibold mb-4" style={{ color: OR }}>
      {children}
    </p>
  );
}

function Titre({ children, className = '' }) {
  return (
    <h2 className={`trajan-regular uppercase leading-tight tracking-[0.1em] text-2xl md:text-4xl ${className}`} style={{ color: ARGENT }}>
      {children}
    </h2>
  );
}

function Texte({ children, className = '' }) {
  return (
    <p className={`text-[15px] md:text-base leading-[1.85] ${className}`} style={{ color: TEXTE }}>
      {children}
    </p>
  );
}

export default function QualityachtGroupPage() {
  return (
    <main style={{ backgroundColor: '#252629' }}>

      {/* ══ HERO ══ */}
      <section className={`${styles.hero} pt-[70px] md:pt-0`}>
        <div aria-hidden className={styles.heroMedia}>
          {/* Fond : la meme photo, floutee et assombrie, pour prolonger les cotes. */}
          <Image
            src={HERO}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroBackdrop}
          />
          {/* Premier plan : la photo entiere, nette et centree. */}
          <Image
            src={HERO}
            alt="Aerial view of a marina canal with berthed boats, waterfront residences and palms"
            fill
            priority
            sizes="100vw"
            className={styles.heroImg}
          />
        </div>
        <div aria-hidden className={styles.heroVeil} />

        <div className={styles.heroContent}>
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.34em] font-semibold mb-5" style={{ color: OR }}>
            Qualityacht Group
          </p>
          <h1
            className="trajan-regular uppercase leading-[1.1] tracking-[0.12em] text-4xl md:text-6xl lg:text-7xl"
            style={{ color: ARGENT, textShadow: '0 2px 18px rgba(0,0,0,0.75)' }}
          >
            Beyond The Ordinary
          </h1>
          <p
            className="mt-7 mx-auto max-w-2xl text-[15px] md:text-lg leading-[1.85]"
            style={{ color: TEXTE, textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}
          >
            A curated world of exceptional properties, refined interiors, wellness experiences and
            innovative solutions for life at sea.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#activities" className={CTA_PLEIN_HERO}>Discover Our Activities</Link>
            <Link href="#contact" className={CTA_LIGNE_HERO}>Speak To Our Team</Link>
          </div>
        </div>
      </section>

      {/* ══ 1 — INTRODUCTION DU GROUPE ══ */}
      <section className="px-6 md:px-14 py-20 md:py-32">
        <Reveal className="max-w-3xl mx-auto text-center">
          <SurTitre>A Group Of Specialist Companies</SurTitre>
          <Titre>Several Expertises. One Standard Of Excellence.</Titre>
          <div className="mt-8 space-y-6">
            <Texte>
              <span style={{ color: OR }}>Qualityacht</span> Group brings together carefully selected
              companies working across international real estate, luxury interiors, wellness and
              marine innovation.
            </Texte>
            <Texte>
              Each activity has its own expertise, identity and partners. Together, they offer a more
              complete way to access exceptional products, properties and experiences.
            </Texte>
          </div>
        </Reveal>
      </section>

      {/* ══ 2 — NOS ACTIVITES ══ */}
      <section id="activities" className="px-6 md:px-14 pb-20 md:pb-32 scroll-mt-24">
        <Reveal className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <SurTitre>What We Do</SurTitre>
          <Titre>Our Activities</Titre>
        </Reveal>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITES.map((a, i) => (
            <Reveal key={a.titre} delay={i * 90}>
              <article className={`${styles.card} h-full p-8 flex flex-col`}>
                <span aria-hidden className="block h-px w-10 mb-6" style={{ backgroundColor: OR }} />
                <h3 className="trajan-regular uppercase tracking-[0.09em] text-lg md:text-xl leading-snug" style={{ color: ARGENT }}>
                  {a.titre}
                </h3>
                <p className="mt-5 text-[14px] leading-[1.85] flex-1" style={{ color: TEXTE }}>
                  {a.texte}
                </p>
                <Link href={a.href} className={LIEN_CARTE}>
                  {a.cta} <span aria-hidden>&rarr;</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 3 — IMMOBILIER INTERNATIONAL ══ */}
      <section id="real-estate" className="px-6 md:px-14 py-20 md:py-28 scroll-mt-24" style={{ borderTop: '1px solid rgba(192,192,192,0.28)' }}>
        <Reveal className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <SurTitre>Real Estate Division</SurTitre>
          <Titre>Three Perspectives On International Property</Titre>
          <div className="mt-8">
            <Texte>
              Our real-estate division brings together three specialist groups, each offering a
              distinct approach to international property, investment and development.
            </Texte>
          </div>
        </Reveal>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {GROUPES_IMMO.map((g, i) => (
            <Reveal key={g.code} delay={i * 110}>
              <article className={`${styles.card} h-full p-8 flex flex-col text-center`}>
                {/* Emplacement du logo reel — a fournir */}
                <div className={styles.logoSlot} aria-hidden>
                  <span className="text-[10px] uppercase tracking-[0.24em]" style={{ color: 'rgba(172,176,205,0.45)' }}>
                    Logo
                  </span>
                </div>
                <p className="mt-6 text-[11px] uppercase tracking-[0.3em] font-semibold" style={{ color: OR }}>
                  {g.code}
                </p>
                <h3 className="trajan-regular uppercase tracking-[0.08em] text-base md:text-lg mt-3" style={{ color: ARGENT }}>
                  {g.role}
                </h3>
                {/* Nom, destinations et specialite : a completer avec les infos reelles */}
                <p className="mt-5 text-[13px] leading-[1.8] flex-1" style={{ color: 'rgba(172,176,205,0.55)' }}>
                  Company name, destinations and speciality to be added.
                </p>
                <Link href="#contact" className={`${LIEN_CARTE} justify-center`}>
                  Learn More <span aria-hidden>&rarr;</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 4 — LUXURY LIVING ══ */}
      <section id="luxury-living" className="px-6 md:px-14 py-20 md:py-28 scroll-mt-24" style={{ borderTop: '1px solid rgba(192,192,192,0.28)' }}>
        <Reveal className="max-w-3xl mx-auto text-center">
          <SurTitre>Luxury Living</SurTitre>
          <Titre>Objects With Presence</Titre>
          <div className="mt-8">
            <Texte>
              A considered selection of furniture, rugs, linens and refined pieces created to shape
              interiors with character and lasting appeal.
            </Texte>
          </div>
        </Reveal>
      </section>

      {/* ══ 5 — WELLNESS & CARE ══ */}
      <section id="wellness" className="px-6 md:px-14 py-20 md:py-28 scroll-mt-24" style={{ borderTop: '1px solid rgba(192,192,192,0.28)' }}>
        <Reveal className="max-w-3xl mx-auto text-center">
          <SurTitre>Wellness &amp; Care</SurTitre>
          <Titre>Designed For Well-Being</Titre>
          <div className="mt-8">
            <Texte>
              Thoughtful products and experiences that bring comfort, balance and a deeper sense of
              well-being into everyday life.
            </Texte>
          </div>
        </Reveal>
      </section>

      {/* ══ 6 — MARINE INNOVATION ══ */}
      <section id="marine" className="px-6 md:px-14 py-20 md:py-28 scroll-mt-24" style={{ borderTop: '1px solid rgba(192,192,192,0.28)' }}>
        <Reveal className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <SurTitre>Marine Innovation</SurTitre>
          <Titre>Life At Sea, Refined</Titre>
        </Reveal>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <article className={`${styles.card} h-full p-8`}>
              <span aria-hidden className="block h-px w-10 mb-6" style={{ backgroundColor: OR }} />
              <h3 className="trajan-regular uppercase tracking-[0.09em] text-lg md:text-xl" style={{ color: ARGENT }}>
                Water Filtration
              </h3>
              <p className="mt-5 text-[14px] leading-[1.85]" style={{ color: TEXTE }}>
                Advanced solutions for cleaner, better-managed water on board.
              </p>
            </article>
          </Reveal>
          <Reveal delay={110}>
            <article className={`${styles.card} h-full p-8`}>
              <span aria-hidden className="block h-px w-10 mb-6" style={{ backgroundColor: OR }} />
              <h3 className="trajan-regular uppercase tracking-[0.09em] text-lg md:text-xl" style={{ color: ARGENT }}>
                Water Toys
              </h3>
              <p className="mt-5 text-[14px] leading-[1.85]" style={{ color: TEXTE }}>
                Premium equipment for movement, play and unforgettable moments on the water.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ══ 7 — NOS SOCIETES ══ */}
      <section id="companies" className="px-6 md:px-14 py-20 md:py-28 scroll-mt-24" style={{ borderTop: '1px solid rgba(192,192,192,0.28)' }}>
        <Reveal className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <SurTitre>Specialists In Their Field</SurTitre>
          <Titre>Our Companies</Titre>
          <div className="mt-8">
            <Texte>
              Our companies operate independently within their own fields, while sharing the same
              commitment to quality, discretion and long-term relationships.
            </Texte>
          </div>
        </Reveal>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {SOCIETES.map((s, i) => (
            <Reveal key={s} delay={i * 70}>
              {/* Emplacement du logo reel — aucun logo invente */}
              <div className={`${styles.logoSlot} h-full px-4 py-8 flex-col gap-3`}>
                <span className="text-[10px] uppercase tracking-[0.24em]" style={{ color: 'rgba(172,176,205,0.45)' }}>
                  Logo
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-center" style={{ color: TEXTE }}>
                  {s}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 8 — NOTRE APPROCHE ══ */}
      <section className="px-6 md:px-14 py-20 md:py-28" style={{ borderTop: '1px solid rgba(192,192,192,0.28)' }}>
        <Reveal className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <SurTitre>How We Work</SurTitre>
          <Titre>Three Principles</Titre>
        </Reveal>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPES.map((p, i) => (
            <Reveal key={p.titre} delay={i * 110}>
              <article className={`${styles.card} h-full p-8`}>
                <span aria-hidden className="block h-px w-10 mb-6" style={{ backgroundColor: OR }} />
                <h3 className="trajan-regular uppercase tracking-[0.1em] text-lg" style={{ color: ARGENT }}>
                  {p.titre}
                </h3>
                <p className="mt-5 text-[14px] leading-[1.85]" style={{ color: TEXTE }}>
                  {p.texte}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 9 — CONTACT ══ */}
      <section id="contact" className="px-6 md:px-14 py-20 md:py-32 scroll-mt-24" style={{ borderTop: '1px solid rgba(192,192,192,0.28)' }}>
        <Reveal className="max-w-3xl mx-auto text-center">
          <SurTitre>Contact</SurTitre>
          <Titre>Ready To Explore What Comes Next?</Titre>
          <div className="mt-8">
            <Texte>
              Tell us what you are looking for. We will connect you with the right company and the
              right specialist.
            </Texte>
          </div>
        </Reveal>

        <Reveal className="max-w-2xl mx-auto mt-14">
          <form className={`${styles.card} p-8 md:p-10`} action="#contact" method="post">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Champ id="g-name" label="Name" autoComplete="name" />
              <Champ id="g-company" label="Company" autoComplete="organization" />
              <Champ id="g-email" label="Email" type="email" autoComplete="email" />
              <Champ id="g-phone" label="Phone" type="tel" autoComplete="tel" />
              <Champ id="g-country" label="Country" autoComplete="country-name" />
              <div className="flex flex-col">
                <label htmlFor="g-interest" className="text-[11px] uppercase tracking-[0.22em] mb-2" style={{ color: TEXTE }}>
                  Area Of Interest
                </label>
                <select
                  id="g-interest"
                  name="interest"
                  defaultValue=""
                  className="min-h-[46px] rounded-lg px-4 text-[14px] outline-none"
                  style={{ backgroundColor: '#252629', color: TEXTE, border: '1px solid rgba(192,192,192,0.28)' }}
                >
                  <option value="" disabled>Select…</option>
                  {INTERETS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-5 flex flex-col">
              <label htmlFor="g-message" className="text-[11px] uppercase tracking-[0.22em] mb-2" style={{ color: TEXTE }}>
                Message
              </label>
              <textarea
                id="g-message" name="message" rows={5}
                className="rounded-lg px-4 py-3 text-[14px] outline-none resize-y"
                style={{ backgroundColor: '#252629', color: TEXTE, border: '1px solid rgba(192,192,192,0.28)' }}
              />
            </div>
            <div className="mt-8 text-center">
              <button type="submit" className={CTA_PLEIN}>Start A Conversation</button>
            </div>
          </form>
        </Reveal>
      </section>

      {/* ══ FOOTER de page ══ */}
      <section className="px-6 md:px-14 py-16 md:py-20" style={{ borderTop: '1px solid rgba(192,192,192,0.28)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <p className="trajan-regular uppercase tracking-[0.18em] text-lg">
              <span style={{ color: OR }}>Qualityacht</span>{' '}
              <span style={{ color: ARGENT }}>Group</span>
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: TEXTE }}>
              Beyond The Ordinary
            </p>
          </div>
          <nav aria-label="Qualityacht Group" className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-3">
            {[
              ['Our Group', '#activities'],
              ['Our Activities', '#activities'],
              ['Real Estate', '#real-estate'],
              ['Companies', '#companies'],
              ['Contact', '#contact'],
              ['Privacy Policy', '/privacy-policy'],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-[12px] tracking-[0.1em] transition-colors duration-400 hover:text-[#C2622A]"
                style={{ color: TEXTE }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}

function Champ({ id, label, type = 'text', autoComplete }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-[11px] uppercase tracking-[0.22em] mb-2" style={{ color: TEXTE }}>
        {label}
      </label>
      <input
        id={id}
        name={id.replace('g-', '')}
        type={type}
        autoComplete={autoComplete}
        className="min-h-[46px] rounded-lg px-4 text-[14px] outline-none"
        style={{ backgroundColor: '#252629', color: TEXTE, border: '1px solid rgba(192,192,192,0.28)' }}
      />
    </div>
  );
}
