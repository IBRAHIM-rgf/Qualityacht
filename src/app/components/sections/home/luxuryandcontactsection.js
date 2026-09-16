import Image from "next/image";
import LosangeComposen from "../../losangecomposen";

const activeItems = [
    { index: 0, title: ['Private Jet'], image: "/images/gridLosange/jet2.png", link: "/privat-jet" },
    { index: 3, title: ['Beyond the Ordinary'], image: "/images/new/invest.jpg", link: "/invest-with-impact" },
    { index: 4, title: ['Hotel & Palace'], image: "/images/new/FB_IMG_1749967381497.jpg", link: "/hotel-palace" },
    { index: 7, title: ['Art & Culture'], image: "/images/new/photo-1715627211239-f9961ad5f794.jpeg", link: "/art-culture" },
    { index: 8, title: ['Horses','&','Riding'], image: "/images/gridLosange/cheval2.png", link: "/horses-riding" },
    { index: 11, title: ['Fine Food','&', 'Dining '], image: "/images/new/17500843321894246574840682884355.jpg", link: "/fine-food-dining" },
  ];
const activeItems2 = [
    { index: 0, title: ['Historic Sites'], image: "/images/new/pexels-gibran-riojas-2153089565-32551597.jpg", link: "/historic-sites" },
    { index: 3, title: ['Partners'], image: "/images/gridLosange/partners-pen.jpg", link: "/partners" },
    { index: 4, title: ['Events'], image: "/images/new/fillemasque.png", link: "/events" },
    { index: 7, title: ['Sport Fishing'], image: "/images/new/pexels-valentina-bondarenko-111153662-10076104.jpg", link: "/sport-fishing" },
    { index: 8, title: ['Luxury Cars', '& ','Racing'], image: "/images/gridLosange/luxury.png", link: "/luxury-cars-racing" },
    { index: 11, title: ['Real Estate'], image: "/images/new/realestate.jpeg", link: "/real-estate" },
  ];

const combinedItems = [...activeItems, ...activeItems2];

export default function Luxuryandcontactsection() {
  return (
    <section
      id="discovery"
      className="relative min-h-screen  flex items-center -mt-16 justify-center bg-cover bg-center bg-no-repeat scroll-mt-24"
      style={{
        backgroundImage: "url('/images/testvague.png')",
        backgroundPositionY: 'top',
        WebkitMask: "linear-gradient(to bottom, transparent 0%, black 10%, black 100%)",
        mask: "linear-gradient(to bottom, transparent 0%, black 10%, black 100% )"
      }}
    >
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#05070c73] to-[#1b223d] " />

      {/* Content ici */}
      <div className="relative z-10  text-white text-3xl font-bold">
        
        <div>
          <h2 className="text-3xl text-center mt-72 uppercase md:text-4xl font-normal">
            discover more LUXURY 
          </h2>
          <Image
            src="/images/title-line.png"
            alt="Decorative line"
            width={200}
            height={10}
            className="mx-auto mb-6"
          />
        </div>

        {/* version pc */}
        <div className="hidden md:block">
          <LosangeComposen activeItems={activeItems} />
          <div className="-mt-36">
            <LosangeComposen activeItems={activeItems2} />
          </div>
        </div>
        {/* version mobile */}
        <div className="md:hidden block">
          <div className="bg-cover bg-center p-6 w-full max-w-md mx-auto text-white">
            <ul className="divide-y divide-white/20 text-center">
              {combinedItems.map((item, idx) => (
                <li key={idx} className="py-8 trajan-regular uppercase tracking-wider font-light text-xl">
                  <a href={item.link} className="hover:underline">{item.title.join(' ')}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>



        {/* Bloc contact (WhatsApp, General, Office, formulaire) retire a la
            demande du client (2026-09-17) : une page contact dediee le
            remplacera. HomeContactForm reste dans le depot, inutilise ici. */}
      </div>


    </section>
  );
}