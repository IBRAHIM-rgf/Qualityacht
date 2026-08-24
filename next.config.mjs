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
  