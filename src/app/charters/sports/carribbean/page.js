// ══ /charters/sports/carribbean ══
//
// Route DEDIEE au funnel Sports. La route generique /charters/carribbean n'est
// pas touchee. Aucun composant global n'est utilise ni modifie.
//
// La video du hero a ete produite a partir d'une source de 200 Mo en 4K, jamais
// copiee dans le depot : 1280x720, 14 s, sans piste audio, fast-start, 2,7 Mo.

import HeroVideo from './HeroVideo';

export const metadata = {
  title: 'Caribbean Sports Yacht Charters | Qualityacht',
  description:
    'Sports yacht charters across the Caribbean — watersports, tenders and fast cruising arranged by Qualityacht around your dates.',
};

const HERO_VIDEO = '/media/client/lydie/2026-08-27/sport-yacht-caribbean/hero/sports-caribbean-hero.mp4';
const HERO_POSTER = '/media/client/lydie/2026-08-27/sport-yacht-caribbean/hero/sports-caribbean-hero-poster.webp';

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const CTA_CUIVRE =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-7 md:px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] ' +
  'transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] ' +
  'hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] ' + FOCUS;

const CTA_ARGENT =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-7 md:px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a]/60 backdrop-blur-sm text-[13px] font-semibold ' +
  'uppercase tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 ' +
  'hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] ' + FOCUS;

export default function SportsCaribbeanPage() {
  return (
    <main className="bg-[#26272a] text-[#acb0cd]">
      {/* ══ HERO ══ */}
      <section className="relative w-full pt-[70px] md:pt-0 h-[74vh] min-h-[480px] md:h-[86vh] overflow-hidden bg-[#26272a]">
        <HeroVideo video={HERO_VIDEO} poster={HERO_POSTER} position="object-center" />
        {/* Degrade sombre neutre, pour la lisibilite seule. Aucun bleu. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(38,39,42,0.42) 0%, rgba(38,39,42,0.10) 30%, rgba(38,39,42,0.70) 64%, rgba(38,39,42,0.96) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center px-5 pb-10 md:pb-16">
          <h1 className="trajan-regular text-2xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] md:tracking-[0.12em] text-[#acb0cd] leading-tight max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Caribbean Sports Yacht Charters
          </h1>
          <div aria-hidden className="w-24 md:w-32 h-px bg-[#B87333] my-5" />
          <p className="max-w-2xl text-[13px] md:text-base leading-relaxed text-[#acb0cd] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Fast cruising, tenders and watersports across the islands — planned around your dates, your group and what the conditions actually allow.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a href="/yachts?destination=caribbean" className={CTA_CUIVRE}>Explore the Caribbean Fleet</a>
            <a href="/#contact" className={CTA_ARGENT}>Speak to Our Team</a>
          </div>
        </div>
      </section>

      {/* ══ CE QUE NOUS ORGANISONS ══ */}
      <section className="px-6 md:px-14 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[12px] md:text-[13px] uppercase tracking-[0.24em] text-[#B87333] font-semibold mb-2">
              On the Water
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              Days Built for Speed
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {[
              {
                titre: 'Tenders & Toys',
                texte:
                  'What a yacht carries varies from one vessel to the next. We check the actual inventory of each boat for your dates rather than promising a standard list.',
              },
              {
                titre: 'Coastal Runs',
                texte:
                  'Short passages between islands, with the tender ready for the last stretch to the beach. Conditions decide the day, and the crew calls it on the morning.',
              },
              {
                titre: 'Arranged in Advance',
                texte:
                  'Instructors, equipment and permissions are organised before you arrive, where local rules allow it. Nothing is confirmed until it genuinely is.',
              },
            ].map((c) => (
              <article
                key={c.titre}
                className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 flex flex-col"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#c2622a] mb-5" />
                <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">
                  {c.titre}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.75] text-[#acb0cd]">{c.texte}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/yachts?destination=caribbean" className={CTA_CUIVRE}>Explore the Caribbean Fleet</a>
            <a href="/#contact" className={CTA_ARGENT}>Speak to Our Team</a>
          </div>
        </div>
      </section>
    </main>
  );
}
