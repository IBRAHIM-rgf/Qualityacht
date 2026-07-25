import Image from 'next/image';
import Link from 'next/link';
import SalesList from './SalesList';

// Section SALES — structure reprise de globaljet.aero/en/sales (header + bandeau
// "subscribe" + liste verticale de listings + bloc "vendez votre yacht"), aux couleurs
// Qualityacht sur le FOND BLEU marine #0a1432 (meme bleu que les modals airport/jet).
// Les 3 yachts sont FICTIFS (demo design). AUCUN emoji.
// NB : remplace l'ancienne landing /sales (grille ItemsGrid Motor/Sailing/Toys). Les
// sous-pages /sales/motor, /sales/sailing, /sales/toys existent toujours.
export const metadata = {
  title: 'Yacht Sales & Acquisitions | Qualityacht',
  description:
    'A curated selection of yachts for sale — brokerage and acquisitions handled with discretion by Qualityacht.',
};

export default function SalesPage() {
  return (
    <div className="min-h-screen text-[#acb0cd]" style={{ backgroundColor: '#0a1432' }}>
      {/* HEADER */}
      <header className="px-6 md:px-14 pt-28 md:pt-36 pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-4">
            Qualityacht &middot; Brokerage &amp; Acquisitions
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            Yacht Sales &amp; Acquisitions
          </h1>
          <div className="relative w-32 md:w-40 h-6 mt-5">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-[#acb0cd]">
            For more than two decades, Qualityacht has advised discerning owners on the purchase and
            sale of exceptional yachts. Each listing below is presented with the same discretion,
            precision, and care that defines every charter we arrange.
          </p>
        </div>
      </header>

      {/* BANDEAU SUBSCRIBE */}
      <div className="px-6 md:px-14 mb-10 md:mb-14">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-[#C0C0C0]/25 bg-white/[0.03] px-6 md:px-10 py-5 md:py-6">
          <div className="text-center md:text-left">
            <p className="trajan-regular text-sm md:text-base uppercase tracking-[0.14em] text-[#C0C0C0]">
              Subscribe to our exclusive listings
            </p>
            <p className="text-[13px] text-[#8b90a0] mt-1">
              Off-market opportunities, shared privately with qualified buyers.
            </p>
          </div>
          <Link
            href="/request-quote"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
          >
            Contact us
            <span aria-hidden className="text-[13px] leading-none">
              &rarr;
            </span>
          </Link>
        </div>
      </div>

      {/* LISTE DES YACHTS */}
      <SalesList />

      {/* BLOC "VENDRE SON YACHT" */}
      <section className="px-6 md:px-14 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            Looking to list your yacht?
          </h2>
          <div className="relative w-24 md:w-32 h-5 mx-auto my-5">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-[#acb0cd]">
            Our brokerage team offers confidential valuations, targeted marketing to a private network
            of buyers, and end-to-end handling of the sale. Speak with an advisor to discuss your yacht.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#C0C0C0] text-xs uppercase tracking-[0.2em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
            >
              Contact the brokerage
              <span aria-hidden className="text-[13px] leading-none">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
