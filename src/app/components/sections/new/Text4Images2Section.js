// components/BestSection.tsx
import Image from "next/image";
import Link from "next/link";

// `cta` est OPTIONNEL : { label, href }. Sans lui le rendu est strictement
// identique a l'existant, donc les autres consommateurs ne bougent pas.
export default function Text4Images2Section({ title, content, images = [], cta = null }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Colonne gauche */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </h2>
              <p className="text-gray-400">
                {content}
              </p>
              {cta && (
                <Link
                  href={cta.href}
                  className="mt-6 inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
                >
                  {cta.label}
                </Link>
              )}
            </div>
            {images[0] && (
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={images[0]}
                  alt="Gallery main"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          {/* Colonne droite */}
          <div className="lg:col-span-7 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                  {images[i] && (
                    <Image
                      src={images[i]}
                      alt={`Gallery image ${i}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
              {images[3] && (
                <Image
                  src={images[3]}
                  alt="Gallery image 3"
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
