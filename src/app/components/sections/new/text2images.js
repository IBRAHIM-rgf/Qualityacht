// components/AboutSection.tsx

import Image from "next/image";

export default function Text2imagesSection({ title, content, images = [] }) {
  return (
    <section className=" py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Texte */}
        <div className="font-light text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold ">
            {title}
          </h2>
          <p className="mb-4">{content}</p>
        </div>
        {/* Images */}
        <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-0">
          {/* Première image */}
          <div className="relative w-full aspect-[4/6] rounded-lg overflow-hidden">
            {images[0] && (
              <Image
                src={images[0]}
                alt="office content 1"
                fill
                className="object-cover"
              />
            )}
          </div>
          {/* Deuxième image */}
          <div className="relative w-full aspect-[4/6] rounded-lg overflow-hidden mt-4 lg:mt-10">
            {images[1] && (
              <Image
                src={images[1]}
                alt="office content 2"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
