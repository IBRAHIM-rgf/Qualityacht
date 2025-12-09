import Image from "next/image";

export default function HeroImageBackground({ title, subtitle, buttonText, backgroundImage }) {
  return (
    <section className="relative h-[70vh] flex items-center justify-center text-white">
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover brightness-75"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-xl md:text-2xl mb-6">{subtitle}</p>
        {buttonText && (
          <button className="px-8 py-3 bg-white text-black rounded-full font-semibold shadow-lg hover:bg-gray-200 transition">
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
}
