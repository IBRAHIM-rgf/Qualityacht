import Image from "next/image";

export default function OfficeZurichSection() {
  return (
    <section 
      className="relative min-h-screen flex mt-32 items-center justify-center bg-blue-950 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/zurich.jpg')",
         WebkitMask: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
        mask: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)"
      }}
    >
   {/* Gradient overlay */}
   <div className="absolute inset-0 bg-gradient-to-b from-[#303135] via-[#30313582] via-80% from-0% to-blue-950/80 to-100%"></div>
      
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Office and Zurich - same size */}
        <div>
          <h2 className="  text-3xl md:text-4xl font-light tracking-wide">
            OFFICE
          </h2>
          <div className="flex justify-center my-6">
            <div className="h-px w-48 bg-gradient-to-r from-transparent via-[#C0C0C0] to-transparent"></div>
          </div>
          </div>
        <h3 className="text-amber-200 text-3xl md:text-4xl font-light mb-16 tracking-wide">
          Zurich
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-16 max-w-2xl mx-auto font-light">
        Notre bureau de Zurich<br/> vous accueille pour vous offrir un accompagnement personnalisé dans tous vos projets de yachting, en Suisse et à l’international.
        </p>
        
        {/* Contact information */}
        <div className="space-y-6">
          {/* Phone number */}
          <div className="text-amber-200 text-xl md:text-2xl font-light tracking-[0.2em]">
            +41 76 736 57 81
          </div>
          
          {/* Email */}
          <div className="text-gray-300 text-lg md:text-xl font-light">
            info@qualityacht.ch
          </div>
        </div>
      </div>
    </section>
  );
}