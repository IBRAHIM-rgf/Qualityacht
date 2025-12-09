import LosangeComposen from "../../losangecomposen";
const activeItems = [
    { index: 0, title: ['Design'], image: "/images/gridLosange/jet2.png" },
    { index: 3, title: ['Développement'], image: "/images/gridLosange/dalailama.png" },
    { index: 4, title: ['Stratégie'], image: "/images/gridLosange/chevalacier.png" },
    { index: 7, title: ['SEO'], image: "/images/gridLosange/cheval.png" },
    { index: 8, title: ['Branding'], image: "/images/gridLosange/cheval2.png" },
    { index: 11, title: ['Analyse'], image: "/images/gridLosange/piecevide.png" },
  ];
export default function GridLosange() {
  return (
    <section 
      className="relative min-h-screen overflow-hidden flex items-end -mt-16 justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/testvague.png')",
        backgroundPositionY: 'top',
        WebkitMask: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
        mask: "linear-gradient(to bottom, transparent 0%, black 20%, black 100% )"
      }}
    >
      {/* Overlay flouté dégradé (haut opaque → bas transparent) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#3b466c]/50 to-[#1b223d]/60 " />

      {/* Content ici */}
      <div className="relative -mb-10 z-10 text-white text-3xl font-bold">
        <LosangeComposen activeItems={activeItems} />
        {/* <LosangeComposen/> */}
      </div>
    </section>
  );
}


