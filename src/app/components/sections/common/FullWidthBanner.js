export default function FullWidthBanner({ title, subtitle, buttonText, backgroundImage }) {
  return (
    <section className="relative w-full h-64 flex items-center justify-center text-white">
      <div className="absolute inset-0">
        <img src={backgroundImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
        <p className="mb-4 text-lg md:text-xl">{subtitle}</p>
        {buttonText && (
          <button className="px-8 py-3 bg-white text-black rounded-full font-semibold shadow-lg hover:bg-gray-200 transition">
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
}
