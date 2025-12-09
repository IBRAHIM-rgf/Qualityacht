// components/BestSection.tsx
import Image from "next/image";

export default function Text4Images2Section({ title, content, images = [] }) {
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
