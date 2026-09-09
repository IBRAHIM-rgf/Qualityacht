// Page "Charter Costs Explained" — accessible depuis yacht-detail-v11
// (sous le prix du hero et entre Gallery et Regions and Rates).
// Détaille les différents postes de coût d'un charter de yacht de luxe.

import Image from 'next/image';
import Link from 'next/link';
import { Info } from 'lucide-react';
import BackButton from './BackButton';
import CharterCalculator from './CharterCalculator';

export const metadata = {
  title: 'Charter Costs Explained — Qualityacht',
  description: 'Understand how yacht charter pricing works: charter fee, APA, VAT, security deposit and other costs that may apply to your luxury yacht charter.',
};

const SECTIONS = [
  {
    title: 'Charter Fee',
    body: 'The charter fee is the base rate for exclusive use of the yacht for the duration of your trip. It covers the vessel, captain and crew, standard onboard equipment (linens, towels, water toys, fishing gear), routine maintenance, and yacht insurance. Fees are typically quoted on a per-week basis (Saturday to Saturday), though alternative durations can often be accommodated.',
  },
  {
    title: 'APA — Advance Provisioning Allowance',
    body: 'The APA is a working budget paid to the captain prior to departure, in addition to the charter fee. It generally represents 25%–35% of the charter fee, depending on the yacht and itinerary. The APA covers all operational expenses during your trip — fuel, marina and dockage fees, food and beverage, watersport activities, communications, and special requests. A full accounting is provided at the end of the charter: unused funds are refunded, and any overage is settled at that time.',
  },
  {
    title: 'VAT — Value Added Tax',
    body: "VAT applies in many cruising destinations, particularly throughout the Mediterranean. The applicable rate is determined by the yacht's flag, the route, and the charter's start and end points. Within the European Union, VAT is typically assessed at the rate of the country where time is spent, commonly ranging from 10% to 22%. Most Caribbean and non-EU destinations are VAT-exempt. Your broker will provide a comprehensive quote reflecting any applicable tax.",
  },
  {
    title: 'Security Deposit',
    body: 'A refundable security deposit is typically required prior to boarding to cover potential incidental damage to the yacht or its equipment. The amount varies by vessel — generally calculated as a percentage of the charter fee or a set flat amount — and is returned in full following the charter, less any deductions for damage beyond normal wear and tear.',
  },
  {
    title: 'Delivery & Repositioning Fees',
    body: "Should you wish to begin or end your charter outside the yacht's primary cruising area, delivery or repositioning fees may apply. These fees account for the cost of relocating the vessel — including fuel, crew time, and port charges. Your broker can advise on the most cost-effective approach for your preferred itinerary.",
  },
  {
    title: 'Crew Gratuity',
    body: 'A gratuity for the captain and crew is standard practice at the conclusion of your charter. While there is no fixed requirement, industry convention is 5%–15% of the charter fee, commensurate with the level of service received. Gratuity is typically presented to the captain for distribution among the crew.',
  },
  {
    title: 'Additional Considerations',
    body: 'Certain expenses may fall outside the scope of the APA, including helicopter landings, premium provisioning, specialty excursions (private dive instruction, onboard spa services), or satellite communications beyond standard usage. Any such items are discussed and approved with you in advance. Personal travel insurance and onshore expenses are not included in the charter package.',
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#26272a] text-[#acb0cd] pt-24 pb-20 px-4">
      <div className="mb-8">
        <BackButton />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-3">
          <h1 className="trajan-regular text-xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0] whitespace-nowrap">
            Understanding Your Charter Investment
          </h1>
        </div>
        <div className="relative w-40 h-7 mt-2 mb-8 mx-auto">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>

        <p className="text-base md:text-lg leading-relaxed text-[#acb0cd] mb-12">
          A luxury yacht charter is more than a booking — it&rsquo;s a fully customized experience.
          Knowing how pricing is structured allows you to compare proposals and budget with
          confidence. Below is a breakdown of the key cost components.
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

        {/* ══ Calculateur interactif ══ */}
        <div className="mt-14 mb-10">
          <div className="flex items-center justify-center mb-3">
            <h2 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              Charter Cost Estimator
            </h2>
          </div>
          <div className="relative w-32 h-6 mb-6 mx-auto">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="text-sm md:text-base text-[#acb0cd]/80 leading-relaxed mb-6">
            Estimate the full cost of a luxury yacht charter — adjust parameters below to see how charter fee,
            APA, VAT, deposit and crew gratuity build up to your total commitment.
          </p>
          <CharterCalculator />
        </div>

        <div className="mt-12 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6">
          <p className="text-sm italic text-[#acb0cd]/80 leading-relaxed">
            Every charter is unique. Our brokers provide a fully itemized proposal covering all
            of the above — so you know exactly what is included before you commit. Contact us
            today for a transparent, customized estimate tailored to your itinerary.
          </p>
          <div className="mt-5">
            <Link href="/request-quote-test-v10"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#C0C0C0] px-6 py-2.5 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-colors">
              Design Your Charter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
