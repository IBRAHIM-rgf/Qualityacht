import HeroBaner from "@/app/components/sections/home/heroBaner";
import WorldClassExperience from "./components/sections/home/WorldClassExperience";
import ServicesGrid from "./components/sections/home/services";
import OfficeZurichSection from "./components/sections/home/OfficeZurichSection";
import BoatTozurich from "./components/sections/home/boatTozurich";
import GridLosange  from "./components/sections/home/gridlosange";
import LosangesuitePcontact from "./components/sections/home/gridlosange2";
import Luxuryandcontactsection from "./components/sections/home/luxuryandcontactsection";

export default function Home() {
  return (
    <div className="w-screen text-[#acb0cd] bg-[#303135] overflow-x-hidden">
      {/* HeroBaner */}
      <HeroBaner />
      <WorldClassExperience />
      <ServicesGrid />
      <div className="w-full bg-[#2a334a]">
        <OfficeZurichSection />
        <BoatTozurich />
      </div>
      <div className="w-full  bg-gradient-to-b from-[#28334f] via-transparent to-[#000000] -my-7">
        {/* luxury et contact */}
        <Luxuryandcontactsection />
      </div>
        {/* losange shadow animation dentre envent decentrer
         images /images sous les titres pour les souligner metre en liste losange et see more word class experiense  
         hero banner cta si je 
         */}

      
      
    </div>
  );
}
