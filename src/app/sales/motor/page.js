import Image from 'next/image';
import Link from 'next/link';
import MotorListings from './MotorListings';
import { YACHTS, SELLING_STEPS, BUYING_STEPS, PUBLICATIONS, BUILDERS, RECENT_SALES } from './data';

// /sales/motor — page COMPLETE calquee sur globaljet.aero/fr/sales : hero sobre sur fond
// photo estompe, "Highlights" (3 cards compactes + cercle decoratif), "Our Exclusive List"
// (sidebar filtres + lignes compactes), puis sections IMAGE+TEXTE cote a cote (valeur
// ajoutee, vendre, acheter), publications, processus vente/achat, ventes recentes, builders,
// gestion, contact. Tout transpose au monde MARITIME. AUCUN emoji.
export const metadata = {
  title: 'Motor Yacht Sales & Acquisitions | Qualityacht',
  description:
    'A curated selection of motor yachts for sale, and a proven brokerage process for buying and selling — handled with discretion by Qualityacht.',
};

function TitleLine({ className = 'w-24' }) {
  return (
    <div className={`relative h-5 my-5 ${className}`}>
      <Image src="/images/title-line.png" alt="" fill className="object-contain object-left" />
    </div>
  );
}

function ProcessSteps({ steps }) {
  return (
    <ol className="grid md:grid-cols-2 gap-x-12 gap-y-0 max-w-5xl mx-auto">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-4 border-b border-[#C0C0C0]/10 py-4">
          <span className="shrink-0 trajan-regular text-base md:text-lg text-[#c2622a] leading-none w-7 text-right">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-sm leading-relaxed text-[#acb0cd] flex-1">{step}</span>
        </li>
      ))}
    </ol>
  );
}

// Section image + texte cote a cote. reverse = image a droite.
function SplitSection({ img, eyebrow, title, children, cta, ctaHref, reverse = false }) {
  return (
    <section className="px-6 md:px-14 py-16 md:py-24 border-t border-[#C0C0C0]/10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div className={`relative h-[240px] md:h-[360px] rounded-lg overflow-hidden border border-[#C0C0C0]/15 ${reverse ? 'md:order-2' : ''}`}>
          <Image src={encodeURI(img)} alt="" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className={reverse ? 'md:order-1' : ''}>
          {eyebrow && <p className="text-[10px] uppercase tracking-[0.3em] text-[#B87333] mb-3">{eyebrow}</p>}
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            {title}
          </h2>
          <TitleLine />
          <p className="text-sm md:text-base leading-relaxed text-[#acb0cd]">{children}</p>
          {cta && (
            <div className="mt-7">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.2em] text-[#acb0cd] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a]"
              >
                {cta}
                <span aria-hidden className="text-[13px] leading-none">&rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function MotorSalesPage() {
  return (
    <div className="min-h-screen relative text-[#acb0cd]">
      {/* Fond "bleu" facon page privat-jet "Destination inconnue" : gris-bleu tres sombre
          (gray-900) + nuages en gris (nuagesAncien). Fixe -> reste derriere tout le scroll. */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gray-900" />
        <Image src="/images/nuagesAncien.png" alt="" fill className="object-cover opacity-30 grayscale" priority />
      </div>
      {/* ── HERO (titre sobre sur fond photo estompe) ── */}
      <header className="relative overflow-hidden pt-32 md:pt-44 pb-16 md:pb-24 px-6 md:px-14">
        {/* Le masque fait DISPARAITRE la photo vers le bas au lieu de la recouvrir d'une
            couleur : le fond reel de la page (gray-900 + nuages) reapparait progressivement,
            donc aucune ligne de demarcation avec la section suivante. Le voile sombre sert
            uniquement a garder le titre lisible et s'efface avec la photo. */}
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{
            maskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
          }}
        >
          <Image src="/images/Sales/last-man-standing.jpg" alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            Qualityacht &middot; Brokerage &amp; Acquisitions
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.14em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Motor Yacht Sales &amp; Acquisitions
          </h1>
          <div className="relative w-40 h-6 mt-5 mx-auto">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-[#acb0cd]/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Built on decades of experience, Qualityacht is recognised in the world of luxury yachting for its
            exacting standards and discretion. As a trusted broker, we have guided owners through countless
            transactions and acquisitions for a demanding international clientele.
          </p>
          <Link
            href="/sales/enquiry?intent=listings"
            className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.2em] text-[#acb0cd] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a]"
          >
            Subscribe to our exclusive listings
            <span aria-hidden className="text-[13px] leading-none">&rarr;</span>
          </Link>
        </div>
      </header>

      {/* ── HIGHLIGHTS (3 cards compactes + cercle decoratif) ── */}
      <section className="relative px-6 md:px-14 py-16 md:py-24">
        <div className="max-w-5xl mx-auto relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-[380px] aspect-square md:w-[560px] md:h-[560px] md:max-w-none md:aspect-auto rounded-full border border-[#C0C0C0]/10"
          />
          <h2 className="relative trajan-regular text-2xl md:text-4xl uppercase tracking-[0.16em] text-[#C0C0C0] text-center mb-12">
            Highlights
          </h2>
          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6">
            {YACHTS.map((y) => (
              <Link key={y.id} href={`/sales/motor/${y.id}`} className="group block">
                <div className="relative h-[170px] md:h-[190px] rounded-lg overflow-hidden border border-[#C0C0C0]/15">
                  <Image
                    src={encodeURI(y.img)}
                    alt={y.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded-full bg-[#c2622a] text-[9px] font-semibold uppercase tracking-[0.12em] text-[#0a1432]">
                    {y.badge}
                  </span>
                </div>
                <p className="mt-3 trajan-regular text-sm uppercase tracking-[0.1em] text-[#C0C0C0]">{y.name}</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#8b90a0] mt-1">
                  {y.builder} {y.model} &middot; {y.year}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LISTE EXCLUSIVE (sidebar + lignes compactes) ── */}
      <div className="pb-8 md:pb-12">
        <MotorListings />
      </div>

      {/* ── VALEUR AJOUTEE (image + texte) ── */}
      <SplitSection img="/images/Sales/last-man-standing-3.jpg" title="The Qualityacht Difference">
        More than a broker, Qualityacht is a trusted <span className="text-[#bd9973]">partner</span>. Among the
        leading yacht brokers, we have built a solid reputation for performance and reliability with our partners,
        suppliers and international clients. Our in-house experts are supported on every transaction by a dedicated
        legal team and by our technical department. Through our worldwide network of industry specialists,
        Qualityacht is your asset to sell your yacht on the best financial terms and within the shortest time.
      </SplitSection>

      {/* ── VENDRE (texte + image) ── */}
      <SplitSection
        img="/images/Sales/pobedy-i-2.jpg"
        eyebrow="Sellers"
        title="Looking to sell your yacht?"
        cta="List your yacht"
        ctaHref="/sales/enquiry?intent=sell"
        reverse
      >
        Make Qualityacht your exclusive partner. We will position your asset on the international market to make it
        visible to qualified buyers, and put a proven sales process in place. From high-quality photography to video
        walkthroughs, we present your yacht at its very best. We promote your yacht in specialised publications and
        list it exclusively on Qualityacht as well as the world&rsquo;s leading marketplaces. By choosing
        Qualityacht, the world becomes your market.
      </SplitSection>

      {/* ── PUBLICATIONS ── */}
      <section className="px-6 md:px-14 py-14 md:py-20 border-t border-[#C0C0C0]/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#B87333] mb-8">Where we will list your yacht</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
            {PUBLICATIONS.map((p) => (
              <span key={p} className="trajan-regular text-base md:text-xl uppercase tracking-[0.12em] text-[#C0C0C0]/80">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSUS DE VENTE ── */}
      <section className="px-6 md:px-14 py-16 md:py-24 border-t border-[#C0C0C0]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B87333] mb-3">Selling</p>
            <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              Yacht Selling Process
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#8b90a0] uppercase tracking-[0.1em]">
              Trust and transparency at every step for a successful sale
            </p>
          </div>
          <ProcessSteps steps={SELLING_STEPS} />
        </div>
      </section>

      {/* ── ACHETER (image + texte) ── */}
      <SplitSection
        img="/images/Sales/s-kris-2.jpg"
        eyebrow="Buyers"
        title="Looking to buy a yacht?"
        cta="Start your search"
        ctaHref="/sales/enquiry?intent=buy"
      >
        Qualityacht will find the yacht that suits you best. Our acquisition experts and worldwide network let you set
        sail with complete peace of mind. We take into account your budget, range, cabin capacity, performance and the
        comfort you require, while remaining uncompromising on our standards of excellence. Throughout the process, we
        rely on the support of our respected technical services. With Qualityacht by your side, your mind is at ease.
      </SplitSection>

      {/* ── PROCESSUS D'ACHAT ── */}
      <section className="px-6 md:px-14 py-16 md:py-24 border-t border-[#C0C0C0]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B87333] mb-3">Buying</p>
            <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              Yacht Buying Process
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#8b90a0] uppercase tracking-[0.1em]">
              Trust and transparency at every step for a successful acquisition
            </p>
          </div>
          <ProcessSteps steps={BUYING_STEPS} />
        </div>
      </section>

      {/* ── VENTES RECENTES ── */}
      <section className="px-6 md:px-14 py-16 md:py-24 border-t border-[#C0C0C0]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B87333] mb-3">Track record</p>
            <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">Recent Sales</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#C0C0C0]/10 border border-[#C0C0C0]/10">
            {RECENT_SALES.map((s) => (
              <div key={s.name} className="bg-gray-900 px-5 py-7 text-center">
                <p className="trajan-regular text-sm md:text-base uppercase tracking-[0.08em] text-[#C0C0C0]">{s.name}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#8b90a0]">
                  {s.year} &middot; <span className="text-[#B87333]">Sold</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILDERS ── */}
      <section className="px-6 md:px-14 py-16 md:py-24 border-t border-[#C0C0C0]/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0] mb-10">
            Builders We Broker
          </h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {BUILDERS.map((b) => (
              <span key={b} className="text-sm md:text-base uppercase tracking-[0.14em] text-[#acb0cd]/80">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME DE GESTION ── */}
      <SplitSection img="/images/Sales/pobedy-i-3.jpg" title="Yacht Management Programme" cta="Yacht Management" ctaHref="/management" reverse>
        Beyond the sale, Qualityacht looks after your yacht at every stage of ownership — crew, maintenance,
        compliance and operations — so you enjoy the sea while we handle the rest.
      </SplitSection>

      {/* ── CONTACT ── */}
      <section className="px-6 md:px-14 py-16 md:py-24 border-t border-[#C0C0C0]/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-snug">
            We would be delighted to assist you with all your yachting requirements
          </h2>
          <div className="mt-8 flex justify-center">
            <Link
              href="/sales/enquiry?intent=general"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#C0C0C0] text-xs uppercase tracking-[0.2em] text-[#acb0cd] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a]"
            >
              Contact us
              <span aria-hidden className="text-[13px] leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
