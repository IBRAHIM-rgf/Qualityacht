'use client';

// Bandeau CTA « Ready to Sail » + FAQ du hub /charters : copie conforme de la
// fin de page Caraibes (caribbean-v15), memes textes, meme photo, meme lien
// (client 2026-09-29, alignement sur le modele Caribbean).
import {
  StBarthBandeau, CloudSection, RevealBlock, FaqItem, faqItems,
} from './destinations/caribbean-v15/CaribbeanV15Base';

export default function ChartersCtaAndFaq() {
  return (
    <>
      <StBarthBandeau>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 gap-5">
          <div className="rounded-2xl border border-[#C0C0C0] bg-[#3a3b3f]/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 max-w-xs md:max-w-xl">
            <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] mb-2 md:mb-3 text-[#acb0cd]">Ready to Sail</p>
            <h2 className="trajan-regular text-xl md:text-5xl uppercase tracking-[0.08em] md:tracking-[0.12em] leading-tight text-[#acb0cd]">
              Plan Your Caribbean Charter
            </h2>
          </div>
          <div className="rounded-2xl border border-[#C0C0C0] bg-[#3a3b3f]/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 max-w-xs md:max-w-md">
            <p className="text-sm md:text-base leading-relaxed text-[#acb0cd]">
              Our team of experts is available 24/7 to create your bespoke yachting itinerary across the Caribbean.
            </p>
          </div>
          <a href="/charters/destinations/caribbean-v15/exploreyacht"
            style={{ color: '#c2622a', backgroundColor: '#26272a', borderColor: '#C0C0C0' }}
            className="trajan-regular text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] px-7 md:px-10 py-3 md:py-4 border rounded-full hover:bg-[#c2622a] hover:text-white hover:border-[#c2622a] transition-all duration-300">
            Explore Yachts
          </a>
        </div>
      </StBarthBandeau>

      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16" bg="/images/nuagesAncien.png">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="Frequently Asked Questions" title="Your Luxury Yacht Charter, Explained" sub="" useTitleLine />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
            {faqItems.map((item, i) => (
              <div key={i} className={faqItems.length % 3 !== 0 && i === faqItems.length - 1 ? 'md:col-start-2' : ''}>
                <FaqItem q={item.q} a={item.a} />
              </div>
            ))}
          </div>
        </div>
      </CloudSection>
    </>
  );
}
