// ══ Fine Food — Tables d'exception (cards style /art-culture) ══
// Chefs francais etoiles ou distinctions equivalentes (Relais & Chateaux,
// gastronomique) des Caraibes, en cards portrait qui flottent (theme-float,
// ombre, titre en orange au survol) — meme traitement que les cards Art & Culture.
// Selection editoriale, AUCUNE affiliation.

import Image from 'next/image';
import { media } from '@/lib/quality-media';

const FOOD = media({ cat: 'food', kind: 'image' }).map((m) => m.src);

// Selection reelle (a titre indicatif).
const RESTAURANTS = [
  { name: 'Le Gaïac', place: 'Le Toiny — St-Barthélemy', chef: 'Cuisine gastronomique française', badge: 'Relais & Châteaux', desc: 'Table gastronomique face à l’océan, produits d’exception et signature française.' },
  { name: 'La Case de l’Isle', place: 'Cheval Blanc — St-Barthélemy', chef: 'Chef au parcours étoilé', badge: 'Gastronomique', desc: 'Cuisine méditerranéenne raffinée les pieds dans le sable, sur la baie des Flamands.' },
  { name: 'Bonito', place: 'Gustavia — St-Barthélemy', chef: 'Cuisine franco-latine', badge: 'Iconique', desc: 'Vue sur le port, ceviches et grillades dans une salle ouverte devenue une institution.' },
  { name: 'Jacala', place: 'Meads Bay — Anguilla', chef: 'Jacques Borderon (français)', badge: 'French fine dining', desc: 'Table française sur la plage, l’une des plus courues de la Caraïbe.' },
  { name: 'Blanchards', place: 'Meads Bay — Anguilla', chef: 'Cuisine caribéenne raffinée', badge: 'Fine dining', desc: 'Institution de Meads Bay, produits locaux et cave remarquable.' },
  { name: 'Malliouhana / Fifty-Eight°', place: 'Meads Bay — Anguilla', chef: 'Inspiration Riviera française', badge: 'Auberge Resorts', desc: 'Terrasse en surplomb, cuisine française ensoleillée face au couchant.' },
  { name: 'The Cliff', place: 'St James — Barbade', chef: 'Fine dining contemporain', badge: 'Signature', desc: 'Table dressée sur la falaise, l’une des plus spectaculaires des Caraïbes.' },
  { name: 'Le Soleil d’Or', place: 'Cayman Brac — Cayman', chef: 'Farm-to-table gastronomique', badge: 'Farm-to-table', desc: 'Cuisine du potager à l’assiette, sur une ferme insulaire préservée.' },
].map((r, i) => ({ ...r, img: FOOD[i % FOOD.length] }));

export default function MichelinDining() {
  return (
    <section className="relative bg-[#26272a] px-6 md:px-14 py-16 md:py-24">
      <style>{`
        .ff-float { animation: ffFloat var(--tf, 6s) ease-in-out infinite alternate; will-change: transform; }
        @keyframes ffFloat { from { transform: translateY(-9px); } to { transform: translateY(9px); } }
        @media (prefers-reduced-motion: reduce) { .ff-float { animation: none !important; } }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-3">Tables of Exception</p>
          <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">Starred Chefs, Island Tables</h2>
          <div className="relative w-28 md:w-36 h-5 mx-auto mt-4"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          <p className="mt-5 max-w-2xl mx-auto text-[13px] md:text-sm text-[#8b90a0] leading-relaxed">
            French starred chefs and equivalent distinctions across the islands — booked and integrated into your itinerary by concierge.
            Editorial selection for reference only; Qualityacht has no affiliation with these establishments.
          </p>
        </div>

        {/* Cards restaurants — style /art-culture (portrait, flottent, hover orange) */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {RESTAURANTS.map((r, i) => (
            <div
              key={r.name}
              className="group ff-float flex flex-col w-[80%] sm:w-[calc(50%-20px)] lg:w-[calc(25%-30px)] max-w-[300px]"
              style={{ '--tf': `${5 + (i % 4)}s`, animationDelay: `${(i % 5) * 0.35}s` }}
            >
              <div className="w-full relative overflow-hidden aspect-[3/4] rounded-xl mb-4 shadow-[0_22px_50px_-16px_rgba(0,0,0,0.8)]">
                {r.img && (
                  <Image
                    src={r.img}
                    alt={r.name}
                    fill
                    sizes="(max-width:768px) 80vw, 300px"
                    className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#26272a]/85 to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wide bg-[#B03E00] text-[#efe7d6]">{r.badge}</span>
              </div>
              <h3 className="trajan-regular text-base uppercase tracking-[0.06em] text-center leading-tight text-[#acb0cd] group-hover:text-[#c2622a] transition-colors duration-300">{r.name}</h3>
              <p className="text-[11px] text-[#B87333] text-center mt-1.5">{r.place}</p>
              <p className="text-[11px] text-[#acb0cd]/60 italic text-center mt-0.5">{r.chef}</p>
              <p className="text-[12px] text-[#acb0cd]/80 leading-relaxed text-center mt-2">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
