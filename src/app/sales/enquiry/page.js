import Image from 'next/image';
import Link from 'next/link';
import SalesEnquiryForm from './SalesEnquiryForm';
import { INTENTS, INTENT_KEYS, normaliseIntent } from '@/lib/salesEnquiry';
import { getYacht, getYachtRef } from '../motor/data';

// /sales/enquiry — prise de contact commerciale Sales, distincte du devis charter
// (/request-quote). Le contenu s'adapte au parametre `intent` ; pour `offer` et
// `details`, le yacht est resolu ici depuis `yachtId` et transmis en lecture seule.
// Aucune dependance a la base de donnees : la source est src/app/sales/motor/data.js.

export const metadata = {
  title: 'Sales Enquiry | Qualityacht',
  description:
    'Contact the Qualityacht brokerage team to buy or sell a yacht, make an offer, request a full dossier or receive our exclusive listings.',
};

function TitleLine({ className = 'w-40' }) {
  return (
    <div className={`relative h-6 mt-5 mx-auto ${className}`}>
      <Image src="/images/title-line.png" alt="" fill className="object-contain" />
    </div>
  );
}

export default async function SalesEnquiryPage({ searchParams }) {
  const params = await searchParams;
  const raw = Array.isArray(params?.intent) ? params.intent[0] : params?.intent;
  const intent = normaliseIntent(raw);
  const config = INTENTS[intent];

  // Yacht concerne (offer / details). Un identifiant inconnu n'est jamais fatal :
  // on le signale et on laisse le visiteur repartir vers la flotte en vente.
  const rawYachtId = Array.isArray(params?.yachtId) ? params.yachtId[0] : params?.yachtId;
  const yachtId = typeof rawYachtId === 'string' ? rawYachtId.trim().slice(0, 80) : '';
  const found = yachtId ? getYacht(yachtId) : null;
  const yachtMissing = config.requiresYacht && !found;
  const yacht = found
    ? { id: found.id, name: found.name, builder: found.builder, model: found.model, year: found.year, ref: getYachtRef(found) }
    : null;

  return (
    <div className="min-h-screen relative text-[#acb0cd]">
      {/* Fond gris-bleu + nuages. Contrairement au fond `fixed` des autres pages Sales,
          celui-ci couvre TOUTE la hauteur du document et repete la texture verticalement :
          la section se prolonge jusqu'au footer au lieu de s'arreter en bas du premier
          ecran. Le degrade superpose eteint la texture vers le bas et masque la jointure
          entre deux repetitions. */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900" />
        <div
          className="absolute inset-0 opacity-30 grayscale"
          style={{
            backgroundImage: "url('/images/nuagesAncien.png')",
            backgroundSize: '100% auto',
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'top center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/45 to-gray-900/85" />
      </div>

      <header className="relative pt-32 md:pt-40 pb-10 md:pb-14 px-6 md:px-14">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-4">
            Qualityacht &middot; Brokerage &amp; Acquisitions
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.14em] text-[#C0C0C0] leading-tight">
            {config.heading}
          </h1>
          <TitleLine />
          <p className="mt-5 text-sm md:text-base leading-relaxed text-[#acb0cd]/90">{config.lead}</p>
        </div>
      </header>

      {/* Bascule entre intentions : le visiteur arrive parfois par le mauvais bouton. */}
      <nav aria-label="Type of enquiry" className="px-6 md:px-14">
        <ul className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
          {INTENT_KEYS.filter((key) => !INTENTS[key].requiresYacht || key === intent).map((key) => {
            const active = key === intent;
            const href = key === intent && yacht
              ? `/sales/enquiry?intent=${key}&yachtId=${encodeURIComponent(yacht.id)}`
              : `/sales/enquiry?intent=${key}`;
            return (
              <li key={key}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-block rounded-full border px-5 py-2 text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#c2622a] focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    active
                      ? 'border-[#c2622a] text-[#c2622a]'
                      : 'border-[#C0C0C0]/25 text-[#acb0cd]/80 hover:border-[#C0C0C0]/60 hover:text-[#acb0cd]'
                  }`}
                >
                  {INTENTS[key].label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className="px-6 md:px-14 py-12 md:py-16">
        {yachtMissing ? (
          <div className="max-w-2xl mx-auto text-center rounded-lg border border-[#C0C0C0]/20 bg-gray-900/50 px-6 py-10">
            <h2 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              We could not find that yacht
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-[#acb0cd]">
              The listing this enquiry refers to is no longer available. Pick a yacht from our current
              selection, or tell us what you are looking for and we will search on your behalf.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/sales/motor"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#c2622a] text-[11px] uppercase tracking-[0.2em] text-gray-900 font-semibold transition-opacity duration-300 hover:opacity-90"
              >
                See yachts for sale
              </Link>
              <Link
                href="/sales/enquiry?intent=buy"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.2em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
              >
                Tell us what you are looking for
              </Link>
            </div>
          </div>
        ) : (
          <SalesEnquiryForm intent={intent} yacht={yacht} />
        )}
      </section>
    </div>
  );
}
