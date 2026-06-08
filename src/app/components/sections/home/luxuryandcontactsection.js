import Image from "next/image";
import LosangeComposen from "../../losangecomposen";

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
        <div className=" py-16 px-4 md:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* WhatsApp box */}
            <div className="rounded-2xl border border-white/20 p-6 shadow-md backdrop-blur-md bg-black/30 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-medium mb-2 flex items-center gap-2">
                  <span className="text-3xl">🟢</span> WhatsApp
                </h2>
                <p className="text-sm text-white/80">
                  Manage your enquiries and bookings on the go via private chat with our team
                </p>
              </div>
              <span className="mt-4 text-sm">↗</span>
            </div>

            {/* Email + phone */}
            <div className="rounded-2xl bg-[#C0C0C0] text-black p-6 flex flex-col justify-center">
              <p className="text-lg font-medium">info@airx.aero</p>
              <p className="text-3xl font-light my-2">+44 203 958 3939</p>
              <p className="text-sm text-gray-600">Telephone line open 24 hours a day</p>
            </div>

            {/* Email + phone */}
            <div className="rounded-2xl bg-[#C0C0C0] text-black p-6 flex flex-col justify-center">
              <p className="text-lg font-medium">info@qualityacht.ch</p>
              <p className="text-3xl font-light my-2">+44 203 958 3939</p>
              <p className="text-sm text-gray-600">Telephone line open 24 hours a day</p>
            </div>
            
            
          </div>

          {/* Contact form */}
          <div className="bg-[#C0C0C0] text-black mt-12 rounded-2xl p-10 grid grid-cols-1 shadow-sm lg:grid-cols-2 gap-8"
          style={{ boxShadow: "#c0c0c045 -20px 18px 20px" }}
          >
            <div>
              <p className="mb-4 font-semibold">
                Please select the reason for your enquiry <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-4 mb-6">
                {['General Enquiry', 'Press', 'Other'].map((label) => (
                  <button
                    key={label}
                    className="px-6 py-2 border border-gray-400 rounded-full text-sm hover:bg-black hover:text-white transition"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  className="border-b border-gray-400 bg-transparent py-2 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  className="border-b border-gray-400 bg-transparent py-2 outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  className="border-b border-gray-400 bg-transparent py-2 outline-none"
                />
                <input
                  type="text"
                  placeholder="Company"
                  className="border-b border-gray-400 bg-transparent py-2 outline-none"
                />
              </div>
              <textarea
                placeholder="Your Message"
                className="w-full mt-4 border-b border-gray-400 bg-transparent py-2 outline-none"
                rows={3}
              />
            </div>
            {/* Empty side or optionally add something like a map or info */}
            <div />
          </div>
        </div>
      </div>


    </section>
  );
}