// components/ImageTextImage.tsx

import Image from "next/image";

export default function ImageTextImage({ title, content, images = [] }) {
  // content peut contenir des sauts de ligne, on les gère pour plusieurs paragraphes
  const paragraphs = content ? content.split('\n').filter(Boolean) : [];
  return (
    <section className="  py-16 px-4 md:px-12">
      <div
        className="
          max-w-7xl
          mx-auto
          lg:grid
          grid-cols-[1fr_2fr_1fr]
          gap-8
          items-center
        "
      >
        {/* Image de gauche */}
        {images[0] && (
          <div className="relative w-full aspect-[4/6] hidden lg:block rounded-lg overflow-hidden">
            <Image
              src={images[0]}
              alt="Portrait image left"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Texte au centre */}
        <div className="font-light text-gray-400 text-center lg:text-left">
          {title && (
            <h2 className="mb-4 text-4xl tracking-tight text-center font-extrabold ">
              {title}
            </h2>
          )}
          {paragraphs.length > 0
            ? paragraphs.map((p, i) => (
                <p className="mb-4" key={i}>{p}</p>
              ))
            : null}
        </div>

        {/* Image de droite */}
        {images[1] && (
          <div className="relative w-full aspect-[4/6]  hidden lg:block rounded-lg overflow-hidden">
            <Image
              src={images[1]}
              alt="Portrait image right"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Responsive arrangement pour mobile */}
      <div className="grid grid-cols-2 gap-4 mt-8 lg:hidden">
        {images.slice(0, 2).map((img, i) => (
          <div className="relative w-full aspect-[4/6] rounded-lg overflow-hidden" key={i}>
            <Image
              src={img}
              alt={`Portrait image ${i === 0 ? 'left' : 'right'} (mobile)`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
