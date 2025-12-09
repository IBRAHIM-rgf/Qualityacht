// components/Text4ImagesSection.tsx

import Image from "next/image";

export default function Text4ImagesSection({ title, content, images = [] }) {
  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Texte */}
        <div className="font-light text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold ">
            {title}
          </h2>
          <p className="mb-4">{content}</p>
        </div>
        {/* Images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="gap-4 flex flex-col">
            {/* Image 1 */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              {images[0] && (
                <Image
                  src={images[0]}
                  alt="Office content 1"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            {/* Image 2 */}
            <div className="relative w-full aspect-video  rounded-lg overflow-hidden">
              {images[1] && (
                <Image
                  src={images[1]}
                  alt="Office content 2"
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
          <div className="mt-8 gap-4 flex flex-col">
            {/* Image 3 */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              {images[2] && (
                <Image
                  src={images[2]}
                  alt="Office content 3"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            {/* Image 4 */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              {images[3] && (
                <Image
                  src={images[3]}
                  alt="Office content 4"
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
