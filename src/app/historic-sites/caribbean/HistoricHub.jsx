// ══ HistoricHub — 3 tuiles (Monuments/Hiking/Cycling) ════════════════════════
// Chaque tuile OUVRE SA SECTION DANS UN NOUVEL ONGLET (/historic-sites/caribbean/
// <key>), a la demande du client. Auparavant le clic revelait le contenu sous les
// tuiles, sur la meme page : c'est incompatible avec une ouverture en onglet,
// qui suppose une URL par section.
//
// Consequence : plus aucun etat local ici, donc plus de 'use client'. Les effets
// visuels au survol sont portes par group-hover, et la mise en avant de la tuile
// active n'a plus d'objet puisqu'on quitte la page.

import Image from 'next/image';

export default function HistoricHub({ panels }) {
  return (
    <div className="px-4 md:px-10 lg:px-14 py-14 md:py-20">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-[#C0C0C0]/20 bg-[#2e2f32] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex flex-col md:flex-row h-auto md:h-[60vh] md:min-h-[420px]">
          {panels.map((p, i) => (
            <a
              key={p.key}
              href={`/historic-sites/caribbean/${p.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex-1 ${
                i > 0 ? 'border-t md:border-t-0 md:border-l border-[#C0C0C0]/15' : ''
              } h-[220px] md:h-auto`}
            >
              <Image
                src={encodeURI(p.img)}
                alt={p.title}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition-all duration-700 scale-100 grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 group-hover:saturate-[1.6] group-hover:contrast-[1.15] group-hover:brightness-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-[#26272a]/45 to-[#26272a]/10 transition-opacity duration-700 group-hover:from-[#26272a]/70 group-hover:via-[#26272a]/10 group-hover:to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#B03E00] origin-left transition-transform duration-700 scale-x-0 group-hover:scale-x-100" />

              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                <h2 className="trajan-regular text-center text-xl md:text-2xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {p.title}
                </h2>
                <span className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border text-[15px] uppercase tracking-[0.18em] transition-colors duration-300 border-[#C0C0C0] text-[#acb0cd] group-hover:border-[#c2622a] group-hover:text-[#c2622a]">
                  Discover
                  {/* Fleche sortante : signale que le lien ouvre un nouvel onglet. */}
                  <span aria-hidden className="leading-none">&#8599;</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
