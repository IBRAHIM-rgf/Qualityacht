// ══ Privacy Policy ══
//
// Contenu bati UNIQUEMENT sur les traitements reellement presents dans le code,
// audites le 25 aout 2026 :
//   - /api/contact, /api/sales-enquiry, /api/brochure : formulaires, envoi SMTP ;
//   - request-quote et privat-jet/contact-broker : saisie cote navigateur ;
//   - localStorage `quote_cart` : selection de yachts, aucune donnee personnelle ;
//   - cookie de session ADMIN uniquement (espace prive, pas les visiteurs) ;
//   - services tiers charges : unpkg (Leaflet), CARTO (fonds de carte), Ankor
//     (donnees yachts), wa.me (WhatsApp si le visiteur clique) ;
//   - AUCUN analytics, AUCUN traceur publicitaire, AUCUN cookie marketing.
//
// Rien n'est invente : ni raison sociale, ni adresse postale, ni numero de
// registre, ni duree de conservation chiffree, ni prestataire non confirme.
// Les points restant a confirmer par le client sont listes dans le rapport.

import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Qualityacht',
  description:
    'How Qualityacht collects, uses and protects personal data submitted through its website — enquiry forms, local storage and third-party services.',
};

const LAST_UPDATED = '25 August 2026';

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.1em] text-[#C0C0C0] mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-[14px] md:text-[15px] leading-relaxed text-[#acb0cd]">
        {children}
      </div>
    </section>
  );
}

function Puces({ items }) {
  return (
    <ul className="space-y-2.5 pl-1">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#c2622a]" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* Masthead — meme parti que les autres pages editoriales du site */}
      <div className="px-6 md:px-14 pt-28 md:pt-32 pb-10 border-b border-[#C0C0C0]/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
            Legal
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-5 text-[13px] text-[#8b90a0]">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="px-6 md:px-14 py-14 md:py-20">
        <div className="max-w-3xl mx-auto space-y-14">
          <Section id="who-we-are" title="Who We Are">
            <p>
              This website is operated by Qualityacht, based in Zurich, Switzerland. Qualityacht arranges
              yacht charters and related services, and introduces clients to selected partners.
            </p>
            <p>
              For any question about this policy or about your personal data, write to{' '}
              <a href="mailto:info@qualityacht.ch" className={`text-[#c2622a] underline ${FOCUS}`}>
                info@qualityacht.ch
              </a>{' '}
              or call{' '}
              <a href="tel:+41767365781" className={`text-[#c2622a] underline ${FOCUS}`}>
                +41 76 736 57 81
              </a>
              .
            </p>
          </Section>

          <Section id="data-we-collect" title="Data We Collect">
            <p>
              We only collect what you choose to send us. We do not build profiles, and we do not buy or
              enrich data from third parties.
            </p>
            <p className="text-[#C0C0C0]">Through our enquiry forms</p>
            <p>
              Depending on the form you use — the contact form on the home page, a charter enquiry, a sales
              enquiry, a private jet broker request or a real-estate brochure request — we may receive your
              first and last name, email address, telephone or WhatsApp number, country, company name, the
              subject of your enquiry, the yacht, aircraft or property you are interested in, your travel
              dates and guest numbers, and any message you write. Fields marked as required are the ones we
              need in order to reply; the rest are optional.
            </p>
            <p className="text-[#C0C0C0]">Stored in your own browser</p>
            <p>
              When you add a yacht to your quote selection, that selection is saved in your browser’s local
              storage under the name <code className="text-[#c2622a]">quote_cart</code>. It contains only
              public details of the boats you picked — name, photo, length, guest capacity, cabins, type and
              indicative price. <span className="text-[#C0C0C0]">No personal data is stored there</span>, it
              never leaves your device on its own, and you can clear it at any time from your browser
              settings.
            </p>
            <p className="text-[#C0C0C0]">Technical data</p>
            <p>
              Like any website, ours is served by a hosting provider that processes technical connection data
              such as IP addresses and browser information in order to deliver the pages and keep the service
              secure.
            </p>
          </Section>

          <Section id="why" title="Why We Use It">
            <Puces
              items={[
                'To answer your enquiry and prepare a proposal, which is the main reason we hold any of this data.',
                'To contact you by the method you chose — email, telephone or WhatsApp.',
                'To remember the yachts you selected, so your choice is still there when you return to the quote page.',
                'To keep the site working and protect it against abuse, including simple anti-spam checks on our forms.',
              ]}
            />
            <p>
              We do not use your data for advertising, we do not sell it, and we do not use it for automated
              decision-making.
            </p>
          </Section>

          <Section id="legal-basis" title="Legal Basis">
            <p>
              Qualityacht is based in Switzerland and this site is subject to Swiss data protection law. Where
              the EU General Data Protection Regulation applies to a visitor, we rely on the following grounds:
            </p>
            <Puces
              items={[
                'Your consent, given when you tick the box before submitting a form.',
                'Steps taken at your request before entering into a contract, when your enquiry concerns a charter, a sale or a service.',
                'Our legitimate interest in running a secure website and in replying to the people who contact us.',
              ]}
            />
            <p>
              You may withdraw your consent at any time. Doing so does not affect anything we lawfully did
              before you withdrew it.
            </p>
          </Section>

          <Section id="recipients" title="Who Receives Your Data">
            <p>
              Enquiries submitted through this site are sent to Qualityacht and handled by our team. They are
              delivered by email through the mail service configured for this website.
            </p>
            <p>
              <span className="text-[#C0C0C0]">Our real-estate partner.</span> Our real-estate pages are
              produced with our partner Gustave Immo. When you request a brochure, your details are sent to
              Qualityacht only — they are not transmitted to the partner by the website. The brochure itself
              is a public document hosted on the partner’s own site and simply opens in a new tab. If your
              request needs to be discussed with the partner, we will tell you first.
            </p>
            <p>
              <span className="text-[#C0C0C0]">Technical providers.</span> Some parts of the site load
              resources from third parties, which necessarily means your browser contacts them:
            </p>
            <Puces
              items={[
                'Map backgrounds are supplied by CARTO and based on OpenStreetMap data, and the mapping library is loaded from the unpkg content delivery network.',
                'Yacht listings and photographs are supplied by the Ankor charter data service.',
                'If you choose to click a WhatsApp button, you are taken to WhatsApp and their own terms apply from that point.',
                'External partner pages and brochures open in a new tab on their own websites, which have their own policies.',
              ]}
            />
            <p>
              We otherwise share personal data only where we are legally required to do so.
            </p>
          </Section>

          <Section id="transfers" title="International Transfers">
            <p>
              Qualityacht is in Switzerland. Some of the technical providers listed above operate outside
              Switzerland and the European Economic Area, so loading a page or sending an enquiry may involve
              a transfer abroad. Where such a transfer takes place and the law requires it, we rely on
              appropriate safeguards. If you would like to know more about a specific provider, contact us at{' '}
              <a href="mailto:info@qualityacht.ch" className={`text-[#c2622a] underline ${FOCUS}`}>
                info@qualityacht.ch
              </a>
              .
            </p>
          </Section>

          <Section id="retention" title="How Long We Keep It">
            <p>
              We keep enquiry data for as long as it takes to answer you and to manage the relationship that
              follows, then for the period required by applicable legal and accounting obligations. We do not
              keep it longer than necessary. Because retention periods depend on the nature of the request and
              on the obligations that apply, we do not publish a single fixed duration here; you can ask us
              what applies to your own request at any time.
            </p>
            <p>
              The yacht selection stored in your browser stays there until you clear it or your browser
              removes it.
            </p>
          </Section>

          <Section id="rights" title="Your Rights">
            <p>Subject to applicable law, you may ask us to:</p>
            <Puces
              items={[
                'Confirm whether we hold personal data about you, and give you a copy.',
                'Correct data that is inaccurate or incomplete.',
                'Delete data we no longer need to keep.',
                'Restrict or object to a particular use of your data.',
                'Receive the data you gave us in a portable format, where that right applies.',
                'Withdraw a consent you previously gave.',
              ]}
            />
            <p>
              Write to{' '}
              <a href="mailto:info@qualityacht.ch" className={`text-[#c2622a] underline ${FOCUS}`}>
                info@qualityacht.ch
              </a>{' '}
              and we will respond within the time allowed by law. If you believe we have not handled your data
              properly, you may also contact the competent supervisory authority — in Switzerland the Federal
              Data Protection and Information Commissioner, or your national authority within the EU.
            </p>
          </Section>

          <Section id="cookies" title="Cookies And Local Storage">
            <p className="text-[#C0C0C0]">This site sets no advertising or analytics cookies.</p>
            <p>
              We do not use Google Analytics or any equivalent measurement tool, and there is no advertising
              pixel or social tracker on our public pages. That is why you are not shown a cookie banner.
            </p>
            <Puces
              items={[
                'Local storage: the quote_cart entry described above, which holds your yacht selection and no personal data.',
                'A session cookie is used only in the private administration area of the site. It is never set for visitors browsing the public pages.',
                'Third-party resources such as map tiles and yacht photographs are requested from the providers listed above; those requests are needed to display the page.',
              ]}
            />
          </Section>

          <Section id="security" title="Security">
            <p>
              The site is served over HTTPS. Enquiry forms validate what is submitted, include anti-spam
              measures, and refuse requests that do not come from this website. Access to the administration
              area is protected by an authenticated session, and credentials are never placed in a web
              address. No transmission over the internet can be guaranteed to be completely secure, but we
              take reasonable measures to protect the data you send us.
            </p>
          </Section>

          <Section id="changes" title="Changes To This Policy">
            <p>
              We may update this policy as the site evolves or as our obligations change. The date at the top
              of this page always shows the latest version. Significant changes will be made clear on this
              page.
            </p>
          </Section>

          <Section id="contact" title="Contact">
            <p>
              For any question or request concerning your personal data:
            </p>
            <Puces
              items={[
                <>
                  Email:{' '}
                  <a href="mailto:info@qualityacht.ch" className={`text-[#c2622a] underline ${FOCUS}`}>
                    info@qualityacht.ch
                  </a>
                </>,
                <>
                  Telephone:{' '}
                  <a href="tel:+41767365781" className={`text-[#c2622a] underline ${FOCUS}`}>
                    +41 76 736 57 81
                  </a>
                </>,
                'Office: Zurich, Switzerland',
              ]}
            />
            <p className="text-[12px] text-[#8b90a0] pt-2">
              This policy describes how the website actually handles data. It is provided for information and
              is not legal advice.
            </p>
          </Section>

          <div className="pt-4 border-t border-[#C0C0C0]/10">
            <Link
              href="/"
              className={`inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] ${FOCUS}`}
            >
              Back to Qualityacht
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
