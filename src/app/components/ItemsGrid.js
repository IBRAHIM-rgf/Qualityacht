import Image from "next/image";
import Link from "next/link";

export default function ItemsGrid({
  title,
  bgImage,
  items,
  imageClassName = "rounded-xl",
  imageWrapperClassName = "h-48",
}) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-24 px-4"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-white trajan-regular mb-4 text-center uppercase tracking-wide">
        {title}
      </h1>
      <Image
        src="/images/title-line.png"
        alt="Decorative line"
        width={200}
        height={10}
        className="mx-auto mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <div
              className={`w-full relative mb-6 overflow-hidden ${imageWrapperClassName}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={`object-cover ${imageClassName}`}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h2 className="text-lg font-semibold text-copper-500 mb-2 trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto">
              {item.title}
            </h2>

            <p className="text-[#C0C0C0] text-sm">{item.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Qualityacht. All rights reserved.
      </div>
    </section>
  );
}
