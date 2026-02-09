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
    // Headers pour WASM et SharedArrayBuffer (requis par @imgly/background-removal)
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',
            },
            {
              key: 'Cross-Origin-Embedder-Policy',
              value: 'require-corp',
            },
          ],
        },
      ];
    },
  };

  export default nextConfig;
  