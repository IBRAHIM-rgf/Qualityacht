/** @type {import('next').NextConfig} */
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
      ];
    },
  };

  export default nextConfig;
  