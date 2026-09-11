// ══ /luxury-cars-racing ══
//
// Remplace l'ancienne page d'attente, qui affichait une phrase generique et une
// photo de cuisine sans rapport. Reconstruite directement ici : le composant
// partage Text4Images2Section n'est plus utilise par cette route.
//
// 2026-09-11 — visuels fournis par le client (public/media/client/lydie/2026-09-11/
// luxury-cars/) : sequence animee autonome pour le hero (fichier HTML integre tel
// quel en iframe pour en conserver le fonctionnement), et une photo par carte.
//
// Aucune collection, aucun modele, aucun partenaire et aucun circuit ne sont
// nommes : rien de tout cela n'est confirme. Voir le rapport pour la liste de ce
// qui reste a fournir.

import Image from 'next/image';
import Link from 'next/link';
import { QUALITYACHT } from '../real-estate/partner-data';

export const metadata = {
  title: 'Luxury Cars & Racing | Qualityacht',
  description:
    'Ground transport and track experiences arranged alongside your charter — organised on request through Qualityacht.',
};

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const CTA_CUIVRE =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a] text-[15px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] ' +
  'transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] ' +
  'hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] ' + FOCUS;

const CTA_ARGENT =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a]/50 text-[15px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 ' +
  'hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] ' + FOCUS;

// Categories de service, formulees sans nommer de marque, de modele ni de
// circuit, puisqu'aucun n'est confirme.
const MEDIA = '/media/client/lydie/2026-09-11/luxury-cars';

const SERVICES = [
  {
    titre: 'Arrival & Transfers',
    image: `${MEDIA}/Track-Events.jpg`,
    alt: 'SUV parked on the sand at sunset, facing the sea',
    texte:
      'A car and a driver waiting where you land, and again when you leave the quay. Arranged for the dates of your charter, in the places we already operate.',
  },
  {
    titre: 'At Your Disposal',
    image: `${MEDIA}/At-Your-Disposal.jpg`,
    alt: 'Passenger seated in the white leather rear cabin of a luxury car',
    texte:
      'A vehicle kept available for the length of your stay, for the days you would rather be ashore than aboard.',
  },
  {
    titre: 'Track & Events',
    image: `${MEDIA}/arrival-and-transfert.jpg`,
    alt: 'Bride stepping into a black limousine, the groom holding her bouquet',
    texte:
      'Circuit days and motorsport weekends can be built around a charter when the calendar allows. We look at what is genuinely open for your dates before proposing anything.',
  },
];

export default function LuxuryCarsRacingPage() {
  return (
    <main className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* ══ HERO — sequence animee fournie par le client (iframe, fonctionnement
          conserve a l'identique), puis le bloc texte existant en dessous.
          La bordure basse (fine bande au-dessus de "What We Arrange") est retiree. ══ */}
      <section className="relative">
        <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-[#050505] aspect-[1440/900]">
          <iframe
            src={`${MEDIA}/luxury-hero-sequence-9.html`}
            title="Luxury Cars & Racing — hero sequence"
            aria-hidden
            tabIndex={-1}
            scrolling="no"
            loading="eager"
            className="absolute inset-0 block h-full w-full border-0"
          />
        </div>
        <div className="max-w-3xl mx-auto text-center px-6 md:px-14 pt-14 md:pt-20 pb-14 md:pb-20">
          <p className="text-sm md:text-base uppercase tracking-[0.32em] text-[#B87333] mb-3">
            Qualityacht · On Land
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            Luxury Cars &amp; Racing
          </h1>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[#acb0cd]">
            A charter rarely begins at the quay. What happens on land — how you arrive, what waits for
            you between two anchorages, the weekend you build around a race — is arranged with the same
            care as the days at sea.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className={CTA_CUIVRE}>
              Speak to Our Concierge
            </Link>
            <Link href="/conciergery" className={CTA_ARGENT}>
              Our Concierge Services
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="px-6 md:px-14 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm md:text-base uppercase tracking-[0.24em] text-[#B87333] font-medium mb-2">
              What We Arrange
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              Three Ways We Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {SERVICES.map((s) => (
              <article
                key={s.titre}
                className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 flex flex-col"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl mb-6">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#c2622a] mb-5" />
                <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">
                  {s.titre}
                </h3>
                <p className="mt-4 text-[15px] md:text-base leading-relaxed text-[#acb0cd]">{s.texte}</p>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-3xl mx-auto text-center text-[15px] leading-relaxed text-[#8b90a0]">
            Availability depends on the destination, the season and the dates. Nothing on this page is a
            catalogue: each request is answered individually.
          </p>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="px-6 md:px-14 pb-20 md:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            Tell Us What You Have In Mind
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-[#acb0cd]">
            Give us the destination and the dates. We will tell you plainly what can be arranged.
          </p>
          <Link href="/#contact" className={`${CTA_CUIVRE} mt-8`}>
            Speak to Our Concierge
          </Link>
          <p className="mt-6 text-[15px] leading-relaxed text-[#8b90a0]">
            {QUALITYACHT.email} · {QUALITYACHT.phone}
          </p>
        </div>
      </section>
    </main>
  );
}
