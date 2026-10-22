// /halal-yacht-charter/faq — toutes les questions halal (client 2026-10-23).
import Image from 'next/image';
import Link from 'next/link';
import HalalFaq from '../../charters/halal/HalalFaq';
import { HALAL_FAQ } from '../../charters/halal/halalFaqData';
import { SILO } from '../_silo/content';
import { SiloCta, SiloLinks, FaqJsonLd } from '../_silo/SiloPage';

export const metadata = {
  title: 'Halal Yacht Charter FAQ | Qualityacht',
  description: 'Halal yacht charter FAQ: halal chef, alcohol-free yachts, prayer space, female crew, Ramadan, Eid, Muslim families and destinations, answered.',
  alternates: { canonical: 'https://www.qualityacht.ch/halal-yacht-charter/faq' },
};

export default function HalalFaqPage() {
  const groups = Object.entries(SILO).map(([slug, p]) => ({ slug, p }));
  const all = [...HALAL_FAQ, ...groups.flatMap(({ p }) => p.faq)];
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <FaqJsonLd items={all} />
      <section className="pt-[110px] md:pt-[140px] pb-10 px-6 md:px-14 text-center">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3">Qualityacht · Discreet Details</p>
        <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">Halal Yacht Charter FAQ</h1>
        <div className="relative w-28 md:w-40 h-5 mx-auto my-5">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
        <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Everything you need to know about a private halal yacht charter: halal chef, alcohol-free service, prayer space,
          female crew, Ramadan and Eid charters, Muslim families and our destinations.
        </p>
      </section>
      <HalalFaq withSection />
      {groups.map(({ slug, p }) => (
        <section key={slug} className="px-6 md:px-14 py-10 border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center mb-6">
            <h2 className="trajan-regular text-lg md:text-2xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              <Link href={`/halal-yacht-charter/${slug}`} className="hover:text-[#c2622a] transition-colors">{p.h1}</Link>
            </h2>
          </div>
          <HalalFaq only extra={p.faq} />
        </section>
      ))}
      <SiloCta />
      <SiloLinks current="faq" />
    </div>
  );
}
