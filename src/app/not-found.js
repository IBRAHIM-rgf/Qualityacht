import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Fond avec nuages en gris */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gray-900" />
        <Image
          src="/images/nuagesAncien.png"
          alt="Background clouds"
          fill
          className="object-cover opacity-30 grayscale"
          priority
        />
      </div>

      {/* Logo centré */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <div className="mb-8 relative w-48 h-48 md:w-64 md:h-64 hover:opacity-80 transition-opacity duration-300">
          <Image
            src="/images/logoFondTrans.png"
            alt="Qualityacht Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Message 404 discret */}
        <div className="text-center space-y-4">
          <h1 className="text-gray-500 text-6xl md:text-8xl font-light tracking-wider">404</h1>
          <p className="text-gray-400 text-lg md:text-xl">Page not found</p>

          <Link
            href="/"
            className="inline-block mt-8 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
