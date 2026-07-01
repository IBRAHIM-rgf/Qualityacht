// Page MÉMO (interne admin) — Calendrier des régates Caraïbes & Martinique 2026-2027.
// Statique : simple aide-mémoire, pas de BDD. Source : CSV client (redécodé UTF-8).
// Accès via le bouton "Régates" de la home admin (/admin/yachts). robots: noindex.

export const metadata = {
  title: 'Mémo Régates | Admin Qualityacht',
  robots: 'noindex, nofollow',
};

// 17 régates. `url` = site officiel.
const REGATTAS = [
  { nom: 'Caribbean Multihull Challenge', lieu: 'Saint-Martin', date: 'Février 2027', types: 'Multicoques (Diam 24, Catamarans 40–60 pieds)', niveau: 'Moyen à Très Élevé', public: 'Amateurs / Professionnels', specs: 'Festival du multicoque, rallye + régate, ambiance conviviale.', url: 'https://www.caribbeanmultihullchallenge.com/' },
  { nom: 'RORC Caribbean 600', lieu: 'Antigua', date: 'Février 2027', types: 'Monocoques (IRC, Class40), Multicoques', niveau: 'Élevé', public: 'Professionnels / Amateurs confirmés', specs: 'Parcours de 600 milles autour des îles des Caraïbes.', url: 'https://caribbean600.rorc.org/' },
  { nom: 'Heineken Regatta', lieu: 'Saint-Martin', date: 'Mars 2027', types: 'Tous types (monocoques, multicoques, voiliers de croisière)', niveau: 'Débutant à Élevé', public: 'Tous niveaux', specs: "L'une des plus grandes régates des Caraïbes, ambiance festive.", url: 'https://www.heinekenregatta.com/' },
  { nom: 'Bucket Regatta', lieu: 'Saint-Barthélemy', date: 'Mars 2027', types: 'Superyachts (80+ pieds)', niveau: 'Très Élevé', public: 'Propriétaires / Équipages pro', specs: 'Rassemblement de superyachts, régates élitistes.', url: 'https://www.bucketregatta.com/' },
  { nom: 'Les Voiles de St. Barth', lieu: 'Saint-Barthélemy', date: 'Avril 2027', types: 'Monocoques (IRC, Class40), Multicoques, Maxi Yachts', niveau: 'Moyen à Élevé', public: 'Amateurs / Professionnels', specs: 'Courses côtières et parcours "banane", ambiance luxueuse.', url: 'https://www.lesvoilesdesaintbarth.com/' },
  { nom: 'Antigua Sailing Week', lieu: 'Antigua', date: 'Avril–Mai 2027', types: 'Tous types (monocoques, multicoques, classiques)', niveau: 'Débutant à Très Élevé', public: 'Tous niveaux', specs: "50+ ans d'histoire, parcours variés, soirées légendaires.", url: 'https://www.sailingweek.com/' },
  { nom: 'Cap Martinique', lieu: 'Trinité-sur-Mer – Martinique', date: 'Avril 2026 (prochaine édition 2027)', types: 'Monocoques 30–40 pieds (IRC, TCC 0.977–1.081)', niveau: 'Moyen à Élevé', public: 'Amateurs', specs: 'Transatlantique en solitaire ou double, sans escale.', url: 'https://cap-martinique.com/' },
  { nom: 'Tour de la Martinique', lieu: 'Martinique', date: 'Juillet 2026', types: 'Voiliers traditionnels (Gommier, Yole), monocoques', niveau: 'Débutant à Moyen', public: 'Locaux / Amateurs', specs: 'Régate culturelle avec des bateaux traditionnels.', url: 'https://www.martinique.org/la-voile-traditionnelle' },
  { nom: 'Transat AG2R La Mondiale', lieu: 'France – Martinique', date: 'Avril 2026 (prochaine en 2028)', types: 'Figaros Bénéteau 3 (monocoques)', niveau: 'Très Élevé', public: 'Professionnels', specs: 'Course en double pour les Figaros, étape en Martinique.', url: 'https://www.ag2rlamondiale.fr/' },
  { nom: 'Route du Rhum – Destination Guadeloupe', lieu: 'Saint-Malo – Pointe-à-Pitre', date: 'Novembre 2026', types: 'Monocoques (IMOCA, Class40), Multicoques (Ultim, Multi50)', niveau: 'Très Élevé', public: 'Professionnels', specs: 'Transatlantique en solitaire, toutes catégories confondues.', url: 'https://www.routedurhum.com/' },
  { nom: 'Grenada Sailing Week', lieu: 'Grenade', date: 'Janvier 2027', types: 'Tous types (monocoques, multicoques)', niveau: 'Débutant à Moyen', public: 'Amateurs', specs: 'Parcours côtiers, ambiance détendue.', url: 'https://www.grenadasailingweek.com/' },
  { nom: 'BVI Spring Regatta', lieu: 'Îles Vierges Brit.', date: 'Mars 2027', types: 'Tous types (monocoques, multicoques)', niveau: 'Moyen', public: 'Amateurs / Professionnels', specs: 'Courses autour des îles Vierges, conditions idéales pour les débutants.', url: 'https://www.bvispringregatta.org/' },
  { nom: 'St. Maarten Regatta', lieu: 'Saint-Martin', date: 'Mars 2027', types: 'Tous types (monocoques, multicoques)', niveau: 'Débutant à Élevé', public: 'Tous niveaux', specs: 'Courses variées, ambiance festive et internationale.', url: 'https://www.stmaartenregatta.com/' },
  { nom: 'Loro Piana Superyacht Regatta', lieu: 'Îles Vierges Brit.', date: 'Mars 2027', types: 'Superyachts (100+ pieds)', niveau: 'Très Élevé', public: 'Propriétaires / Équipages pro', specs: 'Régate exclusive pour superyachts, organisation haut de gamme.', url: 'https://www.loropianaregatta.com/' },
  { nom: 'Jolly Harbour Yacht Club Regatta', lieu: 'Antigua', date: 'Novembre 2026', types: 'Monocoques, multicoques (toutes tailles)', niveau: 'Débutant à Moyen', public: 'Amateurs', specs: 'Régate locale, ambiance familiale.', url: 'https://jhyc.sailingscene.com/' },
  { nom: "Nelson's Cup", lieu: 'Antigua', date: 'Janvier 2027', types: 'Classiques et modernes (monocoques/multicoques)', niveau: 'Moyen', public: 'Tous niveaux', specs: "Régate en l'honneur de l'amiral Nelson, parcours historiques.", url: 'https://www.nelsonscup.com/' },
  { nom: 'CORAL Reef Regatta', lieu: 'Belize', date: 'Avril 2027', types: 'Tous types (monocoques, multicoques)', niveau: 'Débutant à Moyen', public: 'Amateurs', specs: 'Régate écoresponsable, parcours dans les récifs.', url: 'https://www.coralreefregatta.com/' },
];

// Domaine lisible depuis une URL (pour le libellé du lien).
function domainOf(url) {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
}

export default async function AdminRegattaMemoPage({ searchParams }) {
  const params = (await searchParams) || {};
  const token = typeof params.token === 'string' ? params.token : '';
  const backHref = token ? `/admin/yachts?token=${encodeURIComponent(token)}` : '/admin/yachts';

  return (
    <div className="min-h-screen bg-[#303135] text-[#C0C0C0]">
      {/* Header */}
      <div className="bg-[#1b223d] border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#C0C0C0] trajan-regular">Mémo — Régates</h1>
            <p className="text-gray-400 text-sm mt-1">Calendrier Caraïbes &amp; Martinique 2026–2027 · aide-mémoire interne</p>
          </div>
          <a href={backHref} className="flex-none px-4 py-2 rounded-lg border border-[#C0C0C0]/40 text-[#C0C0C0] hover:border-[#B03E00] hover:text-[#B03E00] text-sm transition-colors whitespace-nowrap">
            ← Retour admin
          </a>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <p className="text-gray-400 text-sm mb-4">{REGATTAS.length} régates référencées.</p>

        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-sm text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#1b223d] text-[#B87333] uppercase text-[11px] tracking-wider">
                <th className="px-3 py-3 font-semibold">Régate</th>
                <th className="px-3 py-3 font-semibold">Lieu</th>
                <th className="px-3 py-3 font-semibold">Date</th>
                <th className="px-3 py-3 font-semibold">Voiliers autorisés</th>
                <th className="px-3 py-3 font-semibold">Difficulté</th>
                <th className="px-3 py-3 font-semibold">Public</th>
                <th className="px-3 py-3 font-semibold">Spécificités</th>
                <th className="px-3 py-3 font-semibold">Site</th>
              </tr>
            </thead>
            <tbody>
              {REGATTAS.map((r, i) => (
                <tr key={r.nom} className={`align-top border-t border-gray-700/60 ${i % 2 ? 'bg-[#2a2b2f]' : 'bg-[#303135]'}`}>
                  <td className="px-3 py-3 font-semibold text-[#C0C0C0] whitespace-nowrap">{r.nom}</td>
                  <td className="px-3 py-3 text-[#acb0cd] whitespace-nowrap">{r.lieu}</td>
                  <td className="px-3 py-3 text-[#acb0cd] whitespace-nowrap">{r.date}</td>
                  <td className="px-3 py-3 text-[#acb0cd]">{r.types}</td>
                  <td className="px-3 py-3 text-[#acb0cd] whitespace-nowrap">{r.niveau}</td>
                  <td className="px-3 py-3 text-[#acb0cd] whitespace-nowrap">{r.public}</td>
                  <td className="px-3 py-3 text-gray-400">{r.specs}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-[#c2622a] hover:text-[#B03E00] hover:underline">
                      {domainOf(r.url)}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Emplacement pour les infos du lien claude.ai (à coller par le client) */}
        <p className="text-gray-500 text-xs mt-6 italic">
          Infos complémentaires (lien claude.ai) : à ajouter — le contenu du lien partagé n'a pas pu être récupéré automatiquement.
        </p>
      </div>
    </div>
  );
}
