// Donnees structurees Google (schema.org, JSON-LD) — SEO etape 4 (client 2026-11-01).
// Composant sans etat, utilisable cote serveur comme cote client.

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify echappe le contenu ; « < » neutralise pour rester dans la balise.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

/** FAQ affichee sur la page : questions / reponses texte uniquement. */
export function FaqJsonLd({ items }) {
  const mainEntity = (items || [])
    .filter((it) => typeof it?.q === 'string' && typeof it?.a === 'string')
    .map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    }));
  if (!mainEntity.length) return null;
  return <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity }} />;
}

const SITE = 'https://www.qualityacht.ch';

/** Qualityacht (entreprise) + site, sur toutes les pages. Coordonnees = celles du site. */
export const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Qualityacht',
      url: SITE,
      logo: `${SITE}/images/logoFondTrans.png`,
      email: 'info@qualityacht.ch',
      telephone: '+41767365781',
      address: { '@type': 'PostalAddress', addressLocality: 'Zurich', addressCountry: 'CH' },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: 'Qualityacht',
      url: SITE,
      publisher: { '@id': `${SITE}/#organization` },
    },
  ],
};
