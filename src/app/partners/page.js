// ══ /partners ══
//
// Remplace l'ancienne page d'attente, qui etait illustree par
// une photo d'aquarium. Reconstruite directement ici : le composant partage
// Text4Images2Section n'est plus utilise par cette route, ses autres
// consommateurs restent intacts.
//
// La grille lit partners-data.js. Un seul partenaire y figure aujourd'hui,
// parce qu'un seul est confirme. Aucune carte de remplissage n'est ajoutee.

import Image from 'next/image';
import Link from 'next/link';
import { PARTNERS } from './partners-data';

export const metadata = {
  title: 'Our Partners | Qualityacht',
  description:
    'Qualityacht works with a small number of selected specialists to extend what we can offer our clients — starting with international real estate.',
};

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const CTA_CUIVRE =
  'inline-flex min-h-[48px] max-w-full flex-1 items-center justify-center text-center px-6 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] ' +
  'transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] ' +
  'hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] ' + FOCUS;

const CTA_ARGENT =
  'inline-flex min-h-[48px] max-w-full flex-1 items-center justify-center text-center px-6 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a]/50 text-[13px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 ' +
  'hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] ' + FOCUS;

export default function PartnersPage() {
  return (
    <main className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* ══ HERO — typographique, aucun logo fictif ══ */}
      <section className="relative px-6 md:px-14 pt-28 md:pt-36 pb-14 md:pb-20 border-b border-[#C0C0C0]/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.32em] text-[#B87333] mb-3">
            Qualityacht · Trusted Expertise
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            Our Partners
          </h1>
          <div className="relative w-28 md:w-40 h-5 mt-5 mx-auto">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-6 text-sm md:text-base leading-relaxed text-[#acb0cd]">
            There are things we do ourselves, and things we would rather entrust to someone who does
            them better. Qualityacht works with a small number of selected specialists so that what
            surrounds a charter — and what follows it — is held to the same standard as the charter
            itself.
          </p>
        </div>
      </section>

      {/* ══ GRILLE PARTENAIRES ══ */}
      <section className="px-6 md:px-14 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <ul
            className={`grid gap-6 items-start list-none p-0 m-0 ${
              PARTNERS.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-xl mx-auto'
            }`}
          >
            {PARTNERS.map((p) => (
              <li key={p.id}>
                <article className="h-full rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 md:p-8 flex flex-col">
                  <div className="flex items-center justify-center rounded-xl border border-[#C0C0C0]/25 bg-[#26272a] px-6 py-6">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={160}
                      height={48}
                      className="h-16 w-auto object-contain"
                    />
                  </div>

                  <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-[#B87333]">
                    {p.category}
                  </p>
                  <h2 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.08em] text-[#C0C0C0] mt-2">
                    {p.name}
                  </h2>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#bd9973]">
                    {p.markets}
                  </p>

                  <p className="mt-5 text-[13px] md:text-[14px] leading-relaxed text-[#acb0cd] flex-1">
                    {p.description}
                  </p>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <Link href={p.internalHref} className={CTA_CUIVRE}>
                      {p.internalCta}
                    </Link>
                    <a
                      href={p.externalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.externalCta} — ${p.name}, opens in a new tab`}
                      className={CTA_ARGENT}
                    >
                      {p.externalCta}
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="px-6 md:px-14 pb-20 md:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            Build Something Exceptional Together
          </h2>
          <p className="mt-5 text-[13px] md:text-base leading-relaxed text-[#acb0cd]">
            If your work would genuinely add something to what our clients experience, we would like
            to hear from you.
          </p>
          <Link href="/#contact" className={`${CTA_CUIVRE} mt-8 inline-flex flex-none`}>
            Contact Qualityacht
          </Link>
        </div>
      </section>
    </main>
  );
}
