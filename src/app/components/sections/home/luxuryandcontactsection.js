import Image from "next/image";
import LosangeComposen from "../../losangecomposen";
import HomeContactForm from "./HomeContactForm";

const activeItems = [
    { index: 0, title: ['Private Jet'], image: "/images/gridLosange/jet2.png", link: "/privat-jet" },
    { index: 3, title: ['Invest with Impact'], image: "/images/new/invest.jpg", link: "/invest-with-impact" },
    { index: 4, title: ['Hotel & Palace'], image: "/images/new/FB_IMG_1749967381497.jpg", link: "/hotel-palace" },
    { index: 7, title: ['Art & Culture'], image: "/images/new/photo-1715627211239-f9961ad5f794.jpeg", link: "/art-culture" },
    { index: 8, title: ['Horses','&','Riding'], image: "/images/gridLosange/cheval2.png", link: "/horses-riding" },
    { index: 11, title: ['Fine Food','&', 'Dining '], image: "/images/new/17500843321894246574840682884355.jpg", link: "/fine-food-dining" },
  ];
const activeItems2 = [
    { index: 0, title: ['Historic Sites'], image: "/images/new/pexels-gibran-riojas-2153089565-32551597.jpg", link: "/historic-sites" },
    { index: 3, title: ['Partners'], image: "/images/gridLosange/fish.jpg", link: "/partners" },
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



        {/* <LosangeComposen/> */}
        {/* Cible de l'ancre #contact du header. `id="discovery"` reste sur la section
            englobante : /request-quote-test-v10 pointe vers /#discovery. */}
        <div id="contact" className=" py-16 px-4 md:px-24 scroll-mt-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* WhatsApp box : toute la carte est cliquable. Numero officiel confirme,
                identique au telephone. Aucune mention d'horaires. */}
            <a
              href="https://wa.me/41767365781"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Qualityacht on WhatsApp"
              className="rounded-2xl border border-[#C0C0C0] bg-[#3A3B3F] shadow-[0_0_24px_rgba(192,192,192,0.45),0_18px_48px_rgba(0,0,0,0.45)] p-6 flex flex-col justify-between transition-[border-color,box-shadow] duration-300 hover:border-[#C2626A] hover:shadow-[0_0_28px_rgba(194,98,106,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2626A]"
            >
              <div>
                <h2 className="text-2xl font-medium mb-2 flex items-center gap-2 text-[#C0C0C0]">
                  <span className="text-3xl" aria-hidden>🟢</span> WhatsApp
                </h2>
                <p className="text-sm text-[#ACB0CD]">
                  Manage your enquiries and bookings on the go via private chat with our team
                </p>
              </div>
              <span className="mt-4 text-sm text-[#C2622A]" aria-hidden>↗</span>
            </a>

            {/* Coordonnees confirmees officielles. Meme traitement transparent que la
                capsule du configurateur du hero. */}
            <div className="rounded-2xl border border-[#C0C0C0] bg-[#3A3B3F] shadow-[0_0_24px_rgba(192,192,192,0.18),0_18px_48px_rgba(0,0,0,0.45)] p-6 flex flex-col justify-start">
              <h2 className="text-2xl font-medium mb-2 text-[#C0C0C0]">General</h2>
              <a
                href="mailto:info@qualityacht.ch"
                aria-label="Email Qualityacht at info@qualityacht.ch"
                className="text-xl md:text-2xl font-medium text-[#ACB0CD] break-all transition-colors hover:text-[#C2626A] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2626A]"
              >
                info@qualityacht.ch
              </a>
              <a
                href="tel:+41767365781"
                aria-label="Call Qualityacht on +41 76 736 57 81"
                className="text-3xl md:text-4xl font-light my-2 text-[#ACB0CD] transition-colors hover:text-[#C2626A] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2626A]"
              >
                +41 76 736 57 81
              </a>
            </div>

            {/* Troisieme bloc, comme avant, dedie a la seconde adresse. */}
            <div className="rounded-2xl border border-[#C0C0C0] bg-[#3A3B3F] shadow-[0_0_24px_rgba(192,192,192,0.18),0_18px_48px_rgba(0,0,0,0.45)] p-6 flex flex-col justify-start">
              <h2 className="text-2xl font-medium mb-2 text-[#C0C0C0]">Office</h2>
              <a
                href="mailto:office@qualityacht.ch"
                aria-label="Email Qualityacht at office@qualityacht.ch"
                className="text-xl md:text-2xl font-medium text-[#ACB0CD] break-all transition-colors hover:text-[#C2626A] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2626A]"
              >
                office@qualityacht.ch
              </a>
            </div>
            
            
          </div>

          {/* Contact form */}
          <div className="mt-12 rounded-2xl border border-[#C0C0C0] bg-[#3A3B3F] shadow-[0_0_24px_rgba(192,192,192,0.18),0_18px_48px_rgba(0,0,0,0.45)] p-10 grid grid-cols-1">
            <HomeContactForm />
          </div>
        </div>
      </div>


    </section>
  );
}