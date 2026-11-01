// /robots.txt — SEO etape 1 (client 2026-11-01) : tout le site ouvert aux moteurs, sauf
// l'administration et les API ; adresse du sitemap.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] }],
    sitemap: 'https://www.qualityacht.ch/sitemap.xml',
    host: 'https://www.qualityacht.ch',
  };
}
