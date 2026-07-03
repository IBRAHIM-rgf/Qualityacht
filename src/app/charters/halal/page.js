import Image from 'next/image';
import Link from 'next/link';
import HalalFaq from './HalalFaq';
import { destinations } from '../destinationsData';

export const metadata = {
  title: 'Tailored Halal Private Charter | Qualityacht',
  description:
    'A fully halal private yacht charter shaped around your family and your faith — halal galley, alcohol-free ambiance, a quiet space for prayer, privacy and bespoke itineraries.',
};

const HERO_IMAGE = '/images/halal/7945425-portrait-3138562.jpg';

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
      {/* ══ HERO — portrait plein cadre, titre en overlay ══ */}
      <section className="relative pt-[70px] md:pt-0 h-[72vh] md:h-[88vh]">
        <Image src={HERO_IMAGE} alt="Tailored Halal Private Charter" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: '50% 28%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-[#26272a]/45 to-[#26272a]/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-12 md:pb-16">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3">Qualityacht · Private Charter</p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            Tailored Halal<br />Private Charter
          </h1>
          <BurntLine className="mt-4" />
        </div>
      </section>

      {/* ══ INTRO ══ */}
      <section className="bg-[#26272a] py-16 md:py-24 px-6 md:px-14">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-4">A Private Halal Charter</p>
          <p className="text-[#acb0cd]/85 text-sm md:text-base leading-relaxed mt-6 max-w-2xl mx-auto">
            With extensive experience in halal-friendly travel, we curate discreet private yacht experiences for an
            international clientele that values understatement, precision, and impeccable service.
          </p>
        </div>
      </section>

      {/* ══ DESTINATIONS ══ */}
      <section className="bg-[#26272a] py-16 md:py-24 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-3">Where to Sail</p>
            <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">Destinations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinations.map((d) => (
              <Link key={d.title} href={d.href} className="group min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
                <div className="w-full relative mb-6 overflow-hidden h-48 rounded-xl">
                  <Image src={d.image} alt={d.title} fill className="object-cover rounded-xl" sizes="(max-width:768px) 100vw, 33vw" />
                </div>
                <h3 className="text-lg font-semibold text-[#acb0cd] trajan-regular uppercase text-center break-words leading-tight w-full group-hover:text-[#c2622a] transition-colors duration-300">
                  {d.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ — Discreet Details ══ */}
      <section
        className="relative py-16 md:py-24 px-6 md:px-14 bg-[#2e2f32]"
        style={{ backgroundImage: "url('/images/nuagesAncien.png')", backgroundSize: 'contain', backgroundPosition: 'center' }}
      >
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-4">Discreet Details</p>
          <p className="text-[#acb0cd] text-base md:text-lg leading-relaxed">
            For guests who value discretion, refinement, and a fully tailored experience.
          </p>
        </div>
        <HalalFaq />
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
