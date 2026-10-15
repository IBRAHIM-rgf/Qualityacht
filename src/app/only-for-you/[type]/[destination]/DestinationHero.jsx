// Page « type de voilier + destination » (client 2026-10-14) : ouverte par chaque case
// destination de /only-for-you/<type>. Comme les autres destinations n'ont pas encore
// de contenu, la page affiche le hero (photo de la case) et les 2 boutons deja
// utilises sur le site ; les sections suivantes viendront avec le contenu du client.
import Image from 'next/image';
import Link from 'next/link';

const CTA =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';
const CTA2 =
  'inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0] bg-[#26272a]/40 backdrop-blur-sm px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C0C0C0] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

export default function DestinationHero({ boat, typeSlug, title, image }) {
  return (
    <main className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      <section className="relative h-[70vh] md:h-[82vh] min-h-[460px] overflow-hidden">
        <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#26272a]/40 via-[#26272a]/10 to-[#26272a]" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center px-5 pb-10 md:pb-14">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-3">{boat.name}</p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            {title}
          </h1>
          <div className="relative w-28 md:w-32 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/request-quote" className={CTA}>Design Your Charter</Link>
            <Link href="/contact" className={CTA2}>Contact a Broker</Link>
          </div>
        </div>
      </section>

      <div className="py-14 flex justify-center">
        <Link
          href={`/only-for-you/${typeSlug}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[15px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
        >
          <span aria-hidden>&larr;</span> {boat.name}
        </Link>
      </div>
    </main>
  );
}
