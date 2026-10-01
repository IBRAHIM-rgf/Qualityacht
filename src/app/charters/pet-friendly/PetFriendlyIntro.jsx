// ══ /charters/pet-friendly — hero + 2 sections (client 2026-10-01) ══
// Meme style que /charters/pet-friendly/carribbean : fond #26272a, titres Trajan
// lavande, sur-titre cuivre clair, filet, CTA du site. Les 3 photos du client,
// dans l'ordre demande (1 hero, 2 deuxieme section, 3 troisieme section), sont
// montrees ENTIERES dans leur propre format (2:3 / 3:4) : ni recadrage, ni
// deformation. Textes : repris tels quels de la page Pet-Friendly Caraibes.
import Image from 'next/image';

const P = '/media/client/pet-friendly/2026-10-01';

const CTA_PRIMARY =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';
const CTA_SECONDARY =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 rounded-full border border-[#C0C0C0] bg-[#26272a]/50 backdrop-blur-sm text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const STEPS = [
  'Share your travel window, preferred region, and details about your pet (breed, size, temperament, special needs).',
  'Receive a curated selection of pet-friendly yachts with proposed itineraries.',
  'We handle all logistics: documentation, vet coordination, port formalities, and onboard preparations.',
  'Board with confidence, knowing every detail has been arranged.',
];

function Rule() {
  return <span aria-hidden className="mt-7 mb-6 block h-px w-28 bg-[#bd9973]/70" />;
}

export default function PetFriendlyIntro() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd]">
      {/* ══ HERO — image 1 ══ */}
      {/* Mobile : photo entiere (2:3) pleine largeur, titre juste en dessous
          (en overlay il recouvrait la personne au centre de la photo). */}
      <section className="md:hidden relative w-full pt-[70px] bg-[#26272a]">
        <div className="relative w-full aspect-[2/3]">
          <Image
            src={`${P}/hero-beach-dogs.webp`}
            alt="Young man standing in the sea at dusk with two white dogs"
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-center text-center px-5 pt-8 pb-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#bd9973] font-semibold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              Qualityacht
            </p>
            <h1 className="trajan-regular text-3xl uppercase tracking-[0.1em] text-[#acb0cd] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Pet-Friendly Charter
            </h1>
            <span aria-hidden className="my-4 block h-px w-24 bg-[#bd9973]/70" />
            <p className="text-[#acb0cd] text-sm uppercase tracking-[0.18em] font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Your Companion, Welcome Aboard
            </p>
        </div>
      </section>

      {/* Desktop : texte a gauche, photo entiere a droite dans son format 2:3. */}
      <section className="hidden md:flex w-full h-[86vh] min-h-[560px] pt-[64px] bg-[#26272a]">
        <div className="flex-1 flex flex-col items-start justify-center px-14 lg:px-20">
          <div className="flex flex-col items-start w-full max-w-xl">
            <p className="text-[13px] uppercase tracking-[0.3em] text-[#bd9973] font-semibold mb-5">Qualityacht</p>
            <h1 className="trajan-regular text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#acb0cd] leading-[1.05]">
              Pet-Friendly Charter
            </h1>
            <Rule />
            <p className="text-[#acb0cd] text-lg uppercase tracking-[0.22em] font-light">Your Companion, Welcome Aboard</p>
          </div>
        </div>
        <div className="relative h-full aspect-[2/3] shrink-0">
          <Image
            src={`${P}/hero-beach-dogs.webp`}
            alt="Young man standing in the sea at dusk with two white dogs"
            fill
            priority
            sizes="(min-width: 768px) 60vh, 100vw"
            className="object-contain"
          />
        </div>
      </section>

      {/* ══ SECTION 2 — image 2 a gauche, texte a droite ══ */}
      <section className="px-5 md:px-14 lg:px-20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative w-full max-w-md mx-auto md:max-w-none aspect-[3/4] rounded-2xl overflow-hidden border border-[#C0C0C0]/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
            <Image src={`${P}/shiba-beach.webp`} alt="Shiba Inu lying on a sandy beach" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain bg-[#2e2f32]" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.12em] text-[#acb0cd] mb-3 leading-tight">
              Pet-Friendly Luxury Yacht Charter
            </h2>
            <p className="text-lg md:text-2xl text-[#bd9973] italic mb-8">Your Companion, Welcome Aboard</p>
            <p className="text-base md:text-lg text-[#acb0cd] leading-relaxed">
              For our most discerning clients, true luxury means never leaving family behind &mdash;
              including your <span className="text-[#bd9973] font-semibold">four-legged companions</span>.
              We curate pet-friendly superyacht charters that combine absolute comfort, discretion, and
              seamless logistics, so you and your pet can sail in complete ease.
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — texte a gauche, image 3 a droite (image d'abord sur mobile) ══ */}
      <section className="px-5 md:px-14 lg:px-20 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="md:order-2 relative w-full max-w-md mx-auto md:max-w-none aspect-[3/4] rounded-2xl overflow-hidden border border-[#C0C0C0]/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
            <Image src={`${P}/dachshund-boat.webp`} alt="Dachshund standing at the bow of a boat" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain bg-[#2e2f32]" />
          </div>
          <div className="md:order-1">
            <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#acb0cd] text-center md:text-left mb-8">
              How to Book
            </h2>
            <ol className="space-y-4 list-none p-0 m-0">
              {STEPS.map((etape, i) => (
                <li key={i} className="flex gap-4 rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-5">
                  <span className="trajan-regular shrink-0 text-2xl leading-none text-[#c2622a]">{i + 1}</span>
                  <span className="text-[15px] leading-[1.7] text-[#acb0cd]">{etape}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
              <a href="/request-quote" className={CTA_PRIMARY}>Plan Your Pet-Friendly Charter</a>
              <a href="/contact" className={CTA_SECONDARY}>Speak to Our Team</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
