import Image from "next/image";
const activeItems = [
    { index: 0, title: ['Design'], image: "/images/services/charter.png" },
    { index: 3, title: ['Développement'], image: "/images/services/charter.png" },
    { index: 4, title: ['Stratégie'], image: "/images/services/charter.png" },
    { index: 7, title: ['SEO'], image: "/images/services/charter.png" },
    { index: 8, title: ['Horses','&','Riding'], image: "/images/services/charter.png" },
    { index: 11, title: ['Analyse'], image: "/images/services/charter.png" },
  ];
export default function LosangeComposen({activeItems}) {
  

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Grille tournée */}
      <div className="grid grid-cols-3 grid-rows-4 gap-6 transform shadow-sm -rotate-45">
        {Array.from({ length: 12 }).map((_, i) => {
          const item = activeItems.find((el) => el.index === i);
          return (
            <div key={i} 
            className={`w-56 h-56 relative group transition-all duration-300 ${
              item ? "shadow-[1px_9px_20px_rgba(0,0,0,0.5)] hover:shadow-[1px_9px_20px_rgba(255,255,255,0.9)]" : ""
            }`}
            // style={item ? { boxShadow: "1px 9px 20px rgba(0,0,0,0.5)" } : {}}
            >
              {item && (
                <a href={item.link || '#'} className="w-full h-full block focus:outline-none" tabIndex={0}>
                  <div className="w-full h-full relative transform rotate-90 overflow-hidden shadow-lg">
                    {/* Image */}
                    <div className="absolute inset-0 transform -rotate-45 scale-150">
                      <Image
                        src={item.image}
                        alt={item.title.join(" ")}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Texte */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center transform -rotate-45">
                      {item.title.map((word, index) => (
                        <h3
                          key={index}
                          className=" px-3 py-1 text-center rounded-full bg-black/40 text-sm md:text-xl font-semibold tracking-wider"
                        >
                          {word}
                        </h3>
                      ))}
                    </div>
                  </div>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
