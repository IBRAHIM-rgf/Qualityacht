import Image from "next/image";
import LosangeComposen from "../../losangecomposen";
const activeItems = [
    { index: 0, title: ['Design'], image: "/images/gridLosange/hotel.png" },
    { index: 3, title: ['Développement'], image: "/images/gridLosange/toitture.png" },
    { index: 4, title: ['Stratégie'], image: "/images/gridLosange/cheval1.png" },
    { index: 7, title: ['SEO'], image: "/images/gridLosange/lustre.png" },
    { index: 8, title: ['Branding'], image: "/images/gridLosange/oeuil.png" },
    { index: 11, title: ['Analyse'], image: "/images/gridLosange/jet.png" },
  ];

export default function LosangesuitePcontact() {
  return (
    <section 
      className="relative min-h-screen  flex items-center -mt-16 justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/vagues.png')",
        backgroundPositionY: 'top',
        // WebkitMask: "#000000a6 0%, #000000 20%, #000000 100%)",
        // mask: "linear-gradient(#000000a6 0%, #000000 20%, #000000 100%)",
      }}
    >
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#05070c73] to-[#1b223d] " />

      {/* Content ici */}
      <div className="relative z-10 -mt-52 text-white text-3xl font-bold">
        <LosangeComposen activeItems={activeItems}/>
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
            <div className="rounded-2xl bg-[#e5e5e5] text-black p-6 flex flex-col justify-center">
              <p className="text-lg font-medium">info@airx.aero</p>
              <p className="text-3xl font-light my-2">+44 203 958 3939</p>
              <p className="text-sm text-gray-600">Telephone line open 24 hours a day</p>
            </div>

            
            
          </div>

          {/* Contact form */}
          <div className="bg-[#e5e5e5] text-black mt-12 rounded-2xl p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
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