import Image from 'next/image';
import Link from 'next/link';

// Fallback "coming soon" pour la categorie Water Toys & Equipment (encore vide) — vraie
// page facon privat-jet "Destination inconnue" : fond gris-bleu (gray-900) + nuages.
export const metadata = {
  title: 'Water Toys & Equipment | Qualityacht',
  description: 'Water toys and equipment for sale — selection coming soon.',
};

export default function ToysSalesPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden text-[#acb0cd]">
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gray-900" />
        <Image src="/images/nuagesAncien.png" alt="" fill className="object-cover opacity-30 grayscale" priority />
      </div>
      <div className="relative z-10 text-center px-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#B87333] mb-4">Qualityacht &middot; Sales</p>
        <h1 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.12em] text-[#C0C0C0]">
          Water Toys &amp; Equipment
        </h1>
        <div className="relative w-28 h-5 mx-auto my-5">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
        <p className="text-[#acb0cd]/80 text-base md:text-lg mb-8">Selection coming soon.</p>
        <Link
          href="/sales"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span> Back to Sales
        </Link>
      </div>
    </div>
  );
}
