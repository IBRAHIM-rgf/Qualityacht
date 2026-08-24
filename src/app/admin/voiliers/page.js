// Page MÉMO (interne admin) — Types de voiliers utilisés en régate aux Caraïbes.
// Statique : aide-mémoire pour le charter régate. Accès via le bouton "Voiliers"
// de la home admin (/admin/yachts). robots: noindex.

import { redirect } from 'next/navigation';
import { hasValidAdminSession } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Mémo Types de Voiliers | Admin Qualityacht',
  robots: 'noindex, nofollow',
};

// 4 familles de voiliers de régate.
const CATEGORIES = [
  {
    icon: '🏆',
    titre: 'Monotypes de course (one-design)',
    intro: "Bateaux identiques pour tous les concurrents : la performance dépend de la technique de l'équipage.",
    boats: [
      { nom: 'Laser / ILCA', note: 'Très courant en régate côtière légère.' },
      { nom: 'Optimist', note: 'Pour les jeunes régatiers.' },
      { nom: 'Sunfish', note: 'Populaire localement aux Caraïbes.' },
    ],
  },
  {
    icon: '⛵',
    titre: 'Voiliers de croisière-course (IRC / ORC)',
    intro: 'Le cœur des grandes régates (Antigua Sailing Week, St. Maarten Heineken Regatta), classés par handicap.',
    boats: [
      { nom: 'Beneteau First (40, 45…)', note: '' },
      { nom: 'J/Boats (J/24, J/80, J/120…)', note: '' },
      { nom: "Swan (Nautor's Swan)", note: '' },
      { nom: 'Farr 40', note: '' },
      { nom: 'TP52', note: 'Haut de gamme très compétitif.' },
    ],
  },
  {
    icon: '🚀',
    titre: 'Multicoques',
    intro: 'Très appréciés aux Caraïbes (alizés) pour leur vitesse et le spectacle.',
    boats: [
      { nom: 'Catamarans de course (Gunboat, Outremer modifiés)', note: '' },
      { nom: 'Trimarans (Dragonfly, Corsair)', note: '' },
      { nom: 'ORMA 60', note: 'Pour les grandes courses transocéaniques.' },
    ],
  },
  {
    icon: '🌊',
    titre: 'Grandes courses transatlantiques',
    intro: 'Épreuves type Route du Rhum (arrivée Guadeloupe) ou Transat Jacques Vabre.',
    boats: [
      { nom: 'IMOCA 60', note: 'Monocoques à foils, très techniques.' },
      { nom: 'Ocean Fifty (ex-Multi50)', note: '' },
      { nom: 'Ultim', note: 'Trimarans géants (ex : Maxi Edmond de Rothschild).' },
    ],
  },
];

// Recommandations par niveau / clientèle (caractéristiques clés pour le charter).
const RECOS = [
  { boat: 'J/24, J/80', cat: 'IRC / ORC', pour: 'Équipages novices à intermédiaires' },
  { boat: 'TP52, Farr 40', cat: 'IRC / ORC', pour: 'Équipages expérimentés, compétition sérieuse' },
  { boat: 'Swan 45', cat: 'IRC / ORC', pour: 'Performance + confort haut de gamme' },
  { boat: 'Gunboat', cat: 'Multicoques', pour: 'Choix premium' },
  { boat: 'Corsair / Dragonfly', cat: 'Multicoques', pour: 'Plus accessible, régate côtière' },
  { boat: 'Class40', cat: 'Offshore', pour: 'Le plus accessible pour un charter transocéanique / Route du Rhum' },
];

// Régates emblématiques ↔ types de bateaux.
const REGATES = [
  { nom: 'Antigua Sailing Week', lieu: 'Antigua', bateaux: 'IRC, croisière-course' },
  { nom: 'Heineken Regatta', lieu: 'St. Maarten', bateaux: 'IRC, multicoques' },
  { nom: 'Rolex Regatta', lieu: 'St. Thomas (USVI)', bateaux: 'Variés' },
  { nom: 'Les Voiles de St. Barth', lieu: 'Saint-Barthélemy', bateaux: 'IRC, TP52, multicoques' },
  { nom: 'Route du Rhum (arrivée)', lieu: 'Guadeloupe', bateaux: 'IMOCA, Ultim' },
];

export default async function AdminVoiliersMemoPage({ searchParams }) {
  const params = (await searchParams) || {};

  // Ancienne URL portant encore un ancien parametre secret dans l'URL : on nettoie sans lire sa valeur.
  if ('token' in params) {
    redirect('/admin/voiliers');
  }

  // Page interne : aucune session valide, aucun contenu rendu.
  if (!(await hasValidAdminSession())) {
    redirect('/admin/yachts');
  }

  // Retour vers l'administration sans aucun parametre : la session est dans le cookie.
  const backHref = '/admin/yachts';

  return (
    <div className="min-h-screen bg-[#303135] text-[#C0C0C0]">
      {/* Header */}
      <div className="bg-[#1b223d] border-b border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#C0C0C0] trajan-regular">Mémo — Types de Voiliers</h1>
            <p className="text-gray-400 text-sm mt-1">Voiliers de régate aux Caraïbes · aide-mémoire charter régate</p>
          </div>
          <a href={backHref} className="flex-none px-4 py-2 rounded-lg border border-[#C0C0C0]/40 text-[#C0C0C0] hover:border-[#B03E00] hover:text-[#B03E00] text-sm transition-colors whitespace-nowrap">
            ← Retour admin
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-10">

        {/* Familles de voiliers */}
        <section>
          <h2 className="text-[#B87333] uppercase text-xs tracking-[0.2em] font-semibold mb-4">Familles de voiliers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CATEGORIES.map((cat) => (
              <div key={cat.titre} className="bg-[#1b223d] border border-gray-700 rounded-xl p-5">
                <h3 className="text-[#C0C0C0] font-semibold text-base mb-1">
                  <span className="mr-2">{cat.icon}</span>{cat.titre}
                </h3>
                <p className="text-gray-400 text-[13px] leading-relaxed mb-3">{cat.intro}</p>
                <ul className="space-y-1.5">
                  {cat.boats.map((b) => (
                    <li key={b.nom} className="text-sm text-[#acb0cd] flex gap-2">
                      <span className="text-[#B03E00] flex-none">•</span>
                      <span>
                        <span className="font-medium text-[#C0C0C0]">{b.nom}</span>
                        {b.note ? <span className="text-gray-400"> — {b.note}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Recommandations par niveau */}
        <section>
          <h2 className="text-[#B87333] uppercase text-xs tracking-[0.2em] font-semibold mb-4">Reco charter par niveau / clientèle</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-sm text-left min-w-[560px]">
              <thead>
                <tr className="bg-[#1b223d] text-[#B87333] uppercase text-[11px] tracking-wider">
                  <th className="px-3 py-3 font-semibold">Bateau</th>
                  <th className="px-3 py-3 font-semibold">Catégorie</th>
                  <th className="px-3 py-3 font-semibold">Pour qui</th>
                </tr>
              </thead>
              <tbody>
                {RECOS.map((r, i) => (
                  <tr key={r.boat} className={`border-t border-gray-700/60 ${i % 2 ? 'bg-[#2a2b2f]' : 'bg-[#303135]'}`}>
                    <td className="px-3 py-3 font-semibold text-[#C0C0C0] whitespace-nowrap">{r.boat}</td>
                    <td className="px-3 py-3 text-[#acb0cd] whitespace-nowrap">{r.cat}</td>
                    <td className="px-3 py-3 text-gray-400">{r.pour}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Régates emblématiques */}
        <section>
          <h2 className="text-[#B87333] uppercase text-xs tracking-[0.2em] font-semibold mb-4">Régates emblématiques ↔ bateaux</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-sm text-left min-w-[560px]">
              <thead>
                <tr className="bg-[#1b223d] text-[#B87333] uppercase text-[11px] tracking-wider">
                  <th className="px-3 py-3 font-semibold">Régate</th>
                  <th className="px-3 py-3 font-semibold">Lieu</th>
                  <th className="px-3 py-3 font-semibold">Types de bateaux</th>
                </tr>
              </thead>
              <tbody>
                {REGATES.map((r, i) => (
                  <tr key={r.nom} className={`border-t border-gray-700/60 ${i % 2 ? 'bg-[#2a2b2f]' : 'bg-[#303135]'}`}>
                    <td className="px-3 py-3 font-semibold text-[#C0C0C0] whitespace-nowrap">{r.nom}</td>
                    <td className="px-3 py-3 text-[#acb0cd] whitespace-nowrap">{r.lieu}</td>
                    <td className="px-3 py-3 text-gray-400">{r.bateaux}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-gray-500 text-xs italic">
          Mémo interne. Les « fiches bateaux » détaillées et les « offres par niveau » évoquées dans la source
          (widgets non exportés) peuvent être ajoutées ici — donne-moi le texte et je complète.
        </p>
      </div>
    </div>
  );
}
