'use client';

// Bandeau + CTA en bas de la page Antarctica (client 2026-11-17), comme Indian Ocean.
// Photo du client (grottes de marbre).
import { StBarthBandeau } from '../caribbean-v15/CaribbeanV15Base';

const CTA_PHOTO = '/media/client/2026-11-17/antarctica-cta/marble-caves.webp';

export default function AntarcticaCta() {
  return (
    <StBarthBandeau src={CTA_PHOTO}>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 gap-5">
        <div className="rounded-2xl border border-[#C0C0C0] bg-[#3a3b3f]/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 max-w-xs md:max-w-xl">
          <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] mb-2 md:mb-3 text-[#acb0cd]">Ready to Sail</p>
          <h2 className="trajan-regular text-xl md:text-5xl uppercase tracking-[0.08em] md:tracking-[0.12em] leading-tight text-[#acb0cd]">
            Plan Your Antarctica Charter
          </h2>
        </div>
        <div className="rounded-2xl border border-[#C0C0C0] bg-[#3a3b3f]/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 max-w-xs md:max-w-md">
          <p className="text-sm md:text-base leading-relaxed text-[#acb0cd]">
            Our team of experts is available 24/7 to create your bespoke yachting itinerary across Antarctica and Patagonia.
          </p>
        </div>
        <a href="/request-quote"
          style={{ color: '#c2622a', backgroundColor: '#26272a', borderColor: '#C0C0C0' }}
          className="trajan-regular text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] px-7 md:px-10 py-3 md:py-4 border rounded-full hover:bg-[#c2622a] hover:text-white hover:border-[#c2622a] transition-all duration-300">
          Design Your Charter
        </a>
      </div>
    </StBarthBandeau>
  );
}
