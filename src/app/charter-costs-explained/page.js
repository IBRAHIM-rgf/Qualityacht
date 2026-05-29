// Page "Charter Costs Explained" — accessible depuis yacht-detail-v11
// (sous le prix du hero et entre Gallery et Regions and Rates).
// Détaille les différents postes de coût d'un charter de yacht de luxe.

import Image from 'next/image';
import Link from 'next/link';
import { Info } from 'lucide-react';
import BackButton from './BackButton';

export const metadata = {
  title: 'Charter Costs Explained — Qualityacht',
  description: 'Understand how yacht charter pricing works: charter fee, APA, VAT, security deposit and other costs that may apply to your luxury yacht charter.',
};

const SECTIONS = [
  {
    title: 'Charter Fee',
    body: 'The charter fee is the base rate for hiring the yacht for the duration of your charter. It covers the use of the vessel, the captain and crew, basic equipment on board (linens, towels, standard water toys, fishing gear) and routine maintenance. Insurance for the yacht is also included. The charter fee is typically quoted per week (Saturday to Saturday is the most common slot), though shorter or longer durations can sometimes be arranged.',
  },
  {
    title: 'APA — Advance Provisioning Allowance',
    body: 'The APA is a separate working budget paid to the captain before your charter begins, on top of the charter fee. It usually represents 25% to 35% of the charter fee depending on the yacht and itinerary. The APA covers all running expenses during your trip: fuel, dockage and marina fees, food and beverages, water sport activities, communications, special requests, etc. At the end of the charter, the captain provides a detailed accounting — any unused balance is refunded to you, any overspend is settled on the spot.',
  },
  {
    title: 'VAT — Value Added Tax',
    body: 'VAT applies in many cruising areas, particularly the Mediterranean. The applicable rate depends on the flag of the yacht, the route and the country where the charter starts and ends. In the European Union, charters typically attract VAT at the rate of the country in which time is spent (commonly 10% to 22%). The Caribbean and most non-EU waters are generally VAT-free. Your broker will provide a clear quote including any applicable VAT.',
  },
  {
    title: 'Security Deposit',
    body: 'A refundable security deposit may be requested before boarding to cover any incidental damage to the yacht or its equipment. The amount varies by yacht — typically a percentage of the charter fee or a fixed sum. It is returned in full after the charter, less any deductions for damage beyond normal wear and tear.',
  },
  {
    title: 'Delivery & Repositioning Fees',
    body: 'If you wish to start or end your charter outside the yacht\'s normal cruising area, additional delivery or repositioning fees may apply. These cover the cost of moving the yacht (fuel, crew time, port fees) to and from your chosen embarkation point. Your broker can advise on the most cost-effective options for your preferred itinerary.',
  },
  {
    title: 'Crew Gratuity',
    body: 'A crew gratuity is customary at the end of your charter to thank the captain and crew for their service. There is no fixed rule, but industry convention suggests between 5% and 15% of the charter fee, depending on the level of service and your overall satisfaction. The gratuity is typically given to the captain to distribute among the team.',
  },
  {
    title: 'Other Considerations',
    body: 'Some charters may incur additional fees not covered by the APA, such as helicopter landings, exclusive provisions, specialist excursions (private diving instructors, on-board spa treatments), or telecommunications beyond standard satellite use. These are always discussed and approved in advance with you. Travel insurance and personal expenses on land are not included.',
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#26272a] text-[#acb0cd] pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <Info className="w-7 h-7 text-[#B03E00] shrink-0" />
          <h1 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            Charter Costs Explained
          </h1>
        </div>
        <div className="relative w-40 h-7 mt-2 mb-8">
          <Image src="/images/title-line.png" alt="" fill className="object-contain object-left" />
        </div>

        <p className="text-base md:text-lg leading-relaxed text-[#acb0cd] mb-12">
          A luxury yacht charter is more than a simple booking — it is a bespoke experience.
          Understanding how the price is built helps you compare quotes and plan a budget
          with confidence. Below are the main cost components you should know about.
        </p>

        <div className="space-y-6">
          {SECTIONS.map((s, i) => (
            <section key={i} className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6">
              <h2 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.12em] text-[#C0C0C0] mb-3">
                {s.title}
              </h2>
              <p className="text-base text-[#acb0cd] leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6">
          <p className="text-sm italic text-[#acb0cd]/80 leading-relaxed">
            Every charter is unique. Our brokers provide a fully itemised quote covering all
            of the above so you know exactly what is included — and what is not — before you
            commit. Get in touch to receive a transparent estimate tailored to your itinerary.
          </p>
          <div className="mt-5">
            <Link href="/request-quote-test-v10"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#C0C0C0] px-6 py-2.5 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] hover:bg-[#B03E00]/10 transition-colors">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
