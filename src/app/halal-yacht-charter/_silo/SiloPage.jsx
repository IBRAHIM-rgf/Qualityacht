// ══ Modele commun des pages du silo SEO halal (client 2026-10-23) ══
// Hero photo + H1 (requete principale), intro, 4 blocs de texte (photo apres le 2e),
// FAQ ciblee (+ donnees structurees FAQPage), yachts « Halal Charter », demande de
// devis, puis liens vers les autres pages du silo. Style du site (#26272a, lavande,
// cuivre, Trajan).

import Image from 'next/image';
import Link from 'next/link';
import HalalFaq from '../../charters/halal/HalalFaq';
import HalalYachtsSection from '../../charters/halal/HalalYachtsSection';
import { SILO_GROUPS } from './content';

function Line() {
  return (
    <div className="relative w-28 md:w-40 h-5 mx-auto my-4">
      <Image src="/images/title-line.png" alt="" fill className="object-contain" />
    </div>
  );
}

export function SiloLinks({ current = null, title = 'Explore Halal Yacht Charters' }) {
  return (
    <section className="bg-[#26272a] py-14 md:py-20 px-6 md:px-14 border-t border-white/10">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-3">Halal Yacht Charter</p>
        <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">{title}</h2>
        <Line />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 text-left">
          {SILO_GROUPS.map((g) => (
            <div key={g.title}>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#c2622a] mb-3 text-center md:text-left">{g.title}</p>
              <ul className="flex flex-wrap justify-center md:justify-start gap-2">
                {g.items.filter(([slug]) => slug !== current).map(([slug, label]) => (
                  <li key={slug}>
                    <Link
                      href={`/halal-yacht-charter/${slug}`}
                      className="inline-flex items-center rounded-full border border-[#C0C0C0]/40 bg-[#2e2f32] px-3.5 py-1.5 text-xs text-[#acb0cd] transition-colors hover:border-[#c2622a] hover:text-[#c2622a]"
                    >
                      Halal Yacht Charter {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SiloCta() {
  return (
    <section className="bg-[#2e2f32] py-16 md:py-20 px-6 md:px-14">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-3">Bespoke Enquiry</p>
        <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.08em] text-[#C0C0C0] mb-4">Charter On Your Terms</h2>
        <p className="text-[#acb0cd] text-base md:text-lg leading-relaxed mb-8">
          Share your preferences and we will shape a private, halal charter to match. Every request is met discreetly, from cuisine to crew.
        </p>
        <Link
          href="/request-quote"
          className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 rounded-full border text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] trajan-regular text-[#c2622a] border-[#C0C0C0] bg-[#26272a] hover:bg-[#c2622a] hover:text-white hover:border-[#c2622a] transition-all duration-300"
        >
          Request Your Charter
        </Link>
      </div>
    </section>
  );
}

export function FaqJsonLd({ items }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function SiloPage({ slug, page, yachts = [] }) {
  const [s1, s2, ...rest] = page.sections;
  const Section = ({ s }) => (
    <div className="max-w-3xl mx-auto text-center py-8 md:py-10">
      <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.08em] text-[#C0C0C0]">{s.title}</h2>
      <Line />
      <p className="text-[#acb0cd] text-sm md:text-base leading-relaxed">{s.text}</p>
    </div>
  );
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <FaqJsonLd items={page.faq} />
      {/* HERO */}
      <section className="relative pt-[70px] md:pt-0 h-[70vh] md:h-[84vh]">
        <Image src={page.hero} alt={page.h1} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-[#26272a]/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-12 md:pb-16">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">{page.kicker}</p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight max-w-5xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            {page.h1}
          </h1>
          <Line />
          <p className="text-[#acb0cd] text-xs md:text-base uppercase tracking-[0.25em] font-light">Private · Muslim-Friendly · Alcohol-Free</p>
        </div>
      </section>

      {/* INTRO + 2 premiers blocs */}
      <section className="py-14 md:py-20 px-6 md:px-14">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          {page.intro.map((t, i) => (
            <p key={i} className="text-[#acb0cd] text-base md:text-lg leading-relaxed">{t}</p>
          ))}
        </div>
        <Section s={s1} />
        <Section s={s2} />
      </section>

      {/* PHOTO */}
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        <Image src={page.image} alt={`${page.h1} — ${page.kicker}`} fill sizes="100vw" className="object-cover" />
      </div>

      {/* BLOCS SUIVANTS */}
      <section className="py-10 md:py-16 px-6 md:px-14">
        {rest.map((s) => <Section key={s.title} s={s} />)}
      </section>

      {/* FAQ ciblee */}
      <HalalFaq withSection only extra={page.faq} />

      <HalalYachtsSection yachts={yachts} region={page.kicker} />
      <SiloCta />
      <SiloLinks current={slug} />
    </div>
  );
}
