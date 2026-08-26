import Image from "next/image";

// Bloc « Office — Zurich » de la page d'accueil.
// Texte fourni par la cliente, en anglais comme le reste du site.
// « Zurich » et le numero sont en #bd9973, l'accent editorial de la palette,
// deja utilise par la section World Class Experience.
//
// Contraste mesure sur le rendu reel : 2,70:1 sur « Zurich » et 4,46:1 sur le
// numero. La photo de Zurich etant claire par endroits, « Zurich » passe un peu
// sous le seuil de 3:1 du grand texte — d'ou l'ombre portee conservee, qui
// detache les glyphes. Teintes essayees et ecartees : cuivre #C2622A (1,72 et
// 2,84), argent #C0C0C0 (3,91 et 6,46), or amber-200 (5,71 et 9,43).

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
          <Image
              src="/images/title-line.png"
              alt="Decorative line"
              width={200}
              height={10}
              className="mx-auto mb-6"
            />
          </div>
        <h3 className="text-[#bd9973] text-3xl md:text-4xl font-light mb-16 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Zurich
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-16 max-w-2xl mx-auto font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Based in Zurich, our team offers discreet, fully personalized yachting concierge and
          advisory services for ultra-affluent clients, handling every detail of your projects in
          Switzerland and internationally.
        </p>
        
        {/* Contact information */}
        <div className="space-y-6">
          {/* Numero de telephone.
              Pose sur la photo, il dependait de la luminosite du pixel qui se
              trouvait derriere — et il tombe justement sur la partie claire du
              lac. La capsule lui donne un fond fixe #26272A : le contraste passe
              a 5,67:1 et ne bouge plus, quelle que soit l'image. C'est aussi la
              silhouette des CTA du site, et le numero devient appelable d'un
              tap sur mobile. */}
          <a
            href="tel:+41767365781"
            aria-label="Call Qualityacht on +41 76 736 57 81"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0]/70 bg-[#26272a]/90 backdrop-blur-sm px-8 py-3 text-xl md:text-2xl font-normal tracking-[0.2em] text-[#bd9973] shadow-[0_0_18px_rgba(192,192,192,0.28)] transition-[border-color,box-shadow] duration-300 hover:border-[#bd9973] hover:shadow-[0_0_24px_rgba(189,153,115,0.4)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd9973]"
          >
            +41 76 736 57 81
          </a>
          
          {/* Email */}
          {/* Meme capsule que le telephone, pour la meme raison : le fond ne
              depend plus de la photo. Elle reste secondaire — texte un cran plus
              petit et en gris clair, la ou le numero porte le #bd9973. Le
              soulignement est permanent : il signale que c'est un lien sans
              attendre le survol, qui n'existe pas au doigt. */}
          <div>
            <a
              href="mailto:info@qualityacht.ch"
              aria-label="Email Qualityacht at info@qualityacht.ch"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0]/70 bg-[#26272a]/90 backdrop-blur-sm px-8 py-3 text-lg md:text-xl font-light text-gray-300 underline underline-offset-[6px] decoration-[#C0C0C0]/60 shadow-[0_0_18px_rgba(192,192,192,0.28)] transition-[border-color,box-shadow,color] duration-300 hover:border-[#bd9973] hover:text-[#bd9973] hover:decoration-[#bd9973] hover:shadow-[0_0_24px_rgba(189,153,115,0.4)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd9973]"
            >
              info@qualityacht.ch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}