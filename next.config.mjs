/** @type {import('next').NextConfig} */
// Pages de test et anciennes versions mises en noindex (SEO etape 2, client 2026-11-01).
const NOINDEX_PAGES = [
    '/airport-v2',
    '/art-culture/caribbean-v2',
    '/historic-sites/caribbean-v2',
    '/historic-sites/caribbean-v3',
    '/horses-riding/caribbean-v2',
    '/charters/destinations-accordion',
    '/charters/destinations2',
    '/charters/destinations/arctic-northern-europe-2',
    '/charters/destinations/caribbean-v2',
    '/charters/destinations/caribbean-v16',
    '/charters/destinations/caribbean-v17',
    '/charters/destinations/caribbean-v18',
    '/charters/destinations/caribbean-v19',
    '/charters/destinations/caribbean-v21',
    '/charters/destinations/caribbean-v22',
    '/charters/destinations/carabbean/bahamas-v1',
    '/charters/destinations/carabbean/greater-antilles-v1',
    '/charters/destinations/carabbean/greater-antilles-v2',
    '/charters/destinations/carabbean/greater-antilles-v3',
    '/charters/destinations/carabbean/greater-antilles-v4',
    '/charters/destinations/carabbean/greater-antilles-v5',
    '/charters/destinations/carabbean/greater-antilles-v6',
    '/charters/destinations/carabbean/greater-antilles-v7',
    '/charters/destinations/carabbean/greater-antilles-v8',
    '/charters/destinations/carabbean/greater-antilles-v9',
    '/charters/destinations/carabbean/greater-antilles-v10',
    '/charters/destinations/carabbean/leeward-islands-v1',
    '/charters/destinations/carabbean/windward-islands-v1',
    '/charters/halal/caribbean-v17',
    '/charters/halal/caribbean-v18',
    '/charters/halal/caribbean-v19',
    '/charters/halal/caribbean-v20',
    '/charters/halal/caribbean-v21',
    '/charters/halal/caribbean-v22',
    '/yacht-detail-v1',
    '/yacht-detail-v2',
    '/yacht-detail-v3',
    '/yacht-detail-v4',
    '/yacht-detail-v5',
    '/yacht-detail-v6',
    '/yacht-detail-v7',
    '/yacht-detail-v8',
    '/yacht-detail-v9',
    '/yacht-detail-v10',
    '/effects-demo',
    '/test-infos',
    '/test-region-map',
    '/test-world-relief',
  ];

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '', // Leave empty if no specific port is required
          pathname: '/**', // Allow all images from this domain
        },
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '', // Leave empty if no specific port is required
          pathname: '/**', // Allow all images from this domain
        },
        {
          protocol: 'https',
          hostname: 'api.ankor.io',
          pathname: '/media/**',
        },
        {
          protocol: 'https',
          hostname: 'cdn.ankor.io',
          pathname: '/**',
        },
        // Liens photo copies depuis Ankor (client 2026-10-29).
        {
          protocol: 'https',
          hostname: 'radar.ankor.io',
          pathname: '/media/**',
        },
        // Photos importees depuis l'ordinateur dans l'admin (Vercel Blob, 2026-10-29).
        {
          protocol: 'https',
          hostname: '*.public.blob.vercel-storage.com',
          pathname: '/**',
        },
      ],
    },
    // Adresses SEO halal (client 2026-10-23) : anciennes adresses -> nouvelles (301).
    async redirects() {
      return [
        { source: '/charters/halal', destination: '/halal-yacht-charter', permanent: true },
        { source: '/charters/halal/caribbean', destination: '/halal-yacht-charter/caribbean', permanent: true },
        { source: '/charters/halal/bahamas', destination: '/halal-yacht-charter/bahamas', permanent: true },
        { source: '/charters/halal/north-america', destination: '/halal-yacht-charter/usa', permanent: true },
      ];
    },
    async headers() {
      return [
        {
          // Rien de l'administration ne doit etre mis en cache, ni fuiter via Referer.
          source: '/:path(admin|api/admin)/:rest*',
          headers: [
            { key: 'Cache-Control', value: 'no-store, max-age=0, must-revalidate' },
            { key: 'Referrer-Policy', value: 'no-referrer' },
            { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          ],
        },
        // SEO etape 2 (client 2026-11-01) : pages de test et anciennes versions, sans lien
        // depuis le site. Elles restent en ligne ; Google ne les indexe plus.
        ...NOINDEX_PAGES.map((source) => ({
          source,
          headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }],
        })),
      ];
    },
  };

  export default nextConfig;
  