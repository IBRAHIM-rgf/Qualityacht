'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// ── Données jets privés Caribbean (français, triés par taille décroissante) ───
// Ordre de tri : grands → tous → moyens/grands → moyens → petits → STOL → Pas d'aéroport
function sizeRank(label) {
  const s = String(label).toLowerCase();
  if (s.includes('grands jets')) return 0;
  if (s.includes('tous jets')) return 1;
  if (s.includes('moyens/grands')) return 2;
  if (s.includes('jets privés moyens')) return 3;
  if (s.includes('petits jets')) return 4;
  if (s.includes('stol')) return 5;
  if (s.includes("pas d'aéroport") || s.includes('pas d’aéroport')) return 6;
  return 99;
}

const _caribbeanJetGroupsRaw = [
  { island: 'Cuba', airports: ['Aéroport International José Martí (HAV) — grands jets privés', 'Aéroport Juan Gualberto Gómez (VRA) — jets privés moyens', 'Aéroport de Cayo Largo (CYL) — petits jets privés'] },
  { island: 'République Dominicaine', airports: ['Aéroport International de Punta Cana (PUJ) — tous jets privés', 'Aéroport International de Casa de Campo (LRM) — jets privés moyens', 'Aéroport International Las Américas (SDQ) — tous jets privés', 'Aéroport International de La Romana (LRM) — jets privés moyens'] },
  { island: 'Haïti', airports: ['Aéroport International Toussaint Louverture (PAP) — jets privés moyens', 'Aéroport International du Cap-Haïtien (CAP) — petits jets privés'] },
  { island: 'Jamaïque', airports: ['Aéroport International Sangster (MBJ) — tous jets privés', 'Aéroport International Norman Manley (KIN) — tous jets privés', 'Aéroport International Ian Fleming (OCJ) — petits jets privés'] },
  { island: 'Porto Rico', airports: ['Aéroport International Luis Muñoz Marín (SJU) — tous jets privés', 'Aéroport Fernando Luis Ribas Dominicci (SIG) — petits jets privés', 'Aéroport de Mercedita (PSE) — jets privés moyens'] },
  { island: 'Anguilla', airports: ['Aéroport International Clayton J. Lloyd (AXA) — petits jets privés'] },
  { island: 'Saint-Martin / Sint Maarten', airports: ['Aéroport International Princess Juliana (SXM) — tous jets privés', 'Aéroport de Grand Case (SFG) — jets privés moyens'] },
  { island: 'Saint-Barthélemy', airports: ['Aéroport de Gustavia (SBH) — avions STOL uniquement'] },
  { island: 'Saba', airports: ['Aéroport Juancho E. Yrausquin (SAB) — avions STOL uniquement'] },
  { island: 'Saint-Eustache', airports: ['Aéroport F.D. Roosevelt (EUX) — petits jets privés'] },
  { island: 'Saint-Kitts & Nevis', airports: ['Aéroport International Robert L. Bradshaw (SKB) — tous jets privés', 'Aéroport International Vance W. Amory (NEV) — petits jets privés'] },
  { island: 'Antigua & Barbuda', airports: ['Aéroport International V.C. Bird (ANU) — tous jets privés', 'Aéroport de Barbuda Codrington (BBQ) — petits jets privés'] },
  { island: 'Montserrat', airports: ['Aéroport John A. Osborne (MNI) — petits jets privés'] },
  { island: 'Guadeloupe', airports: ['Aéroport International de Pointe-à-Pitre (PTP) — tous jets privés'] },
  { island: 'Aruba', airports: ['Aéroport International Queen Beatrix (AUA) — tous jets privés'] },
  { island: 'Bonaire', airports: ['Aéroport International de Flamingo (BON) — jets privés moyens'] },
  { island: 'Curaçao', airports: ['Aéroport International de Curaçao (CUR) — tous jets privés'] },
  { island: 'Dominique', airports: ['Aéroport Douglas-Charles (DOM) — jets privés moyens', 'Aéroport de Canefield (DCF) — petits jets privés'] },
  { island: 'Martinique', airports: ['Aéroport International Aimé Césaire (FDF) — tous jets privés'] },
  { island: 'Sainte-Lucie', airports: ['Aéroport International Hewanorra (UVF) — tous jets privés', 'Aéroport George F.L. Charles (SLU) — petits jets privés'] },
  { island: 'Saint-Vincent & les Grenadines', airports: ['Aéroport International d\'Argyle (SVD) — jets privés moyens/grands', 'Aéroport de Mustique (MQS) — petits jets privés', 'Aéroport de Canouan (CIW) — jets privés moyens'] },
  { island: 'Grenade', airports: ['Aéroport International Maurice Bishop (GND) — tous jets privés', 'Aéroport de Lauriston (CRU) — petits jets privés'] },
  { island: 'Barbade', airports: ['Aéroport International Grantley Adams (BGI) — tous jets privés'] },
  { island: 'Turks & Caicos', airports: ['Aéroport International de Providenciales (PLS) — jets privés moyens/grands', 'Aéroport International de Grand Turk (GDT) — petits jets privés'] },
  { island: 'Trinité-et-Tobago', airports: ['Aéroport International de Piarco (POS) — tous jets privés', 'Aéroport International A.N.R. Robinson (TAB) — jets privés moyens'] },
  { island: 'Barbuda', airports: ['Aéroport de Barbuda Codrington (BBQ) — petits jets privés'] },
  { island: 'Carriacou', airports: ['Aéroport de Lauriston (CRU) — petits jets privés'] },
  { island: 'Petite Martinique', airports: ['Pas d\'aéroport — accès par bateau uniquement'] },
  { island: 'Redonda', airports: ['Pas d\'aéroport'] },
  { island: 'Aves Island', airports: ['Pas d\'aéroport'] },
  { island: 'Navassa Island', airports: ['Pas d\'aéroport'] },
  { island: 'Sombrero Island', airports: ['Pas d\'aéroport'] },
];

// Trie chaque liste d'aéroports par taille décroissante (du plus gros au plus petit).
const caribbeanJetGroups = _caribbeanJetGroupsRaw.map(g => ({
  ...g,
  airports: [...g.airports].sort((a, b) => sizeRank(a) - sizeRank(b)),
}));

// ── Destinations (ordre identique à /charters/destinations : Caraïbes en avant-dernier) ───
const destinations = [
  { name: 'Arctic',              image: '/images/destinations/animals/Arctic.png',                  groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Bahamas',             image: '/images/destinations/animals/Bahamas.jpg',                 groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Central America',     image: '/images/destinations/animals/Central-America.jpg',         groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'East Asia',           image: '/images/destinations/animals/EAST-ASIA.jpg',               groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Eastern Mediterranean', image: '/images/destinations/animals/Eastern-Mediterranean.jpg', groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Indian Ocean',        image: '/images/destinations/animals/Indian-Ocean.jpg',            groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Indonesia',           image: '/images/destinations/animals/Indonesia.jpg',               groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'North America',       image: '/images/destinations/animals/Nord-America.jpg',            groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Pacific Ocean',       image: '/images/destinations/animals/Ocean-Pacific.jpeg',          groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Oman Gulf',           image: '/images/destinations/animals/Oman-Gulf.jpeg',              groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'South East Asia',     image: '/images/destinations/animals/SOUTH-EAST-ASIA.jpeg',        groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Western Mediterranean', image: '/images/destinations/animals/Western-Mediterranean.webp', groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Africa',              image: '/images/destinations/animals/africa.jpeg',                 groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Northern Europe',     image: '/images/destinations/animals/articbynortherneurope.jpg',   groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Caribbean',           image: '/images/destinations/animals/caraibes.jpg',               groups: caribbeanJetGroups },
  { name: 'Oceania',             image: '/images/destinations/animals/oceania.jpeg',                groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
];

// ── Card ───────────────────────────────────────────────────────────────────────
function DestCard({ dest, onClick }) {
  return (
    <div
      onClick={() => onClick(dest)}
      className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="w-full relative mb-6 overflow-hidden h-48 rounded-xl">
        <Image src={dest.image} alt={dest.name} fill className="object-cover rounded-xl" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <h2 className="text-lg font-semibold text-[#acb0cd] mb-2 trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto hover:text-[#c2622a] transition-colors duration-300">
        {dest.name}
      </h2>
    </div>
  );
}

// ── Parsing & catégorisation des aéroports ────────────────────────────────────
// Format string : "Aéroport ... (CODE) — taille"
// Cas spécial : "Pas d'aéroport — accès par bateau uniquement" (pas de code)
function parseAirport(str) {
  const m = str.match(/^(.+?)\s*\(([A-Z]{2,4})\)\s*[—-]\s*(.+)$/);
  if (m) return { name: m[1].trim(), code: m[2], size: m[3].trim() };
  // Cas sans code aéroport
  const noCode = str.split(/\s*[—-]\s*/);
  return { name: noCode[0].trim(), code: null, size: (noCode[1] || '').trim() || null };
}

// Libellés FR cohérents pour les sous-sections
const CATEGORY_LABEL = {
  'grands jets privés': 'Grands jets privés',
  'tous jets privés': 'Tous jets privés',
  'jets privés moyens/grands': 'Jets privés moyens & grands',
  'jets privés moyens': 'Jets privés moyens',
  'petits jets privés': 'Petits jets privés',
  'avions STOL uniquement': 'Avions STOL uniquement',
};
function categoryLabel(size) {
  if (!size) return 'Autre';
  const lower = size.toLowerCase();
  for (const key of Object.keys(CATEGORY_LABEL)) {
    if (lower.includes(key)) return CATEGORY_LABEL[key];
  }
  // "accès par bateau uniquement" ou variantes
  return size.charAt(0).toUpperCase() + size.slice(1);
}

// Tri des catégories : grands → tous → moyens/grands → moyens → petits → STOL → reste
function categoryRank(label) {
  const l = label.toLowerCase();
  if (l.includes('grands jets privés') && !l.includes('moyens')) return 0;
  if (l.includes('tous jets')) return 1;
  if (l.includes('moyens & grands') || l.includes('moyens/grands')) return 2;
  if (l.includes('jets privés moyens')) return 3;
  if (l.includes('petits jets')) return 4;
  if (l.includes('stol')) return 5;
  return 99;
}

function groupAirports(airports) {
  const buckets = new Map();
  for (const a of airports) {
    const parsed = parseAirport(a);
    const cat = categoryLabel(parsed.size);
    if (!buckets.has(cat)) buckets.set(cat, []);
    buckets.get(cat).push(parsed);
  }
  return [...buckets.entries()]
    .sort((a, b) => categoryRank(a[0]) - categoryRank(b[0]));
}

// ── Modal ──────────────────────────────────────────────────────────────────────
function JetModal({ dest, onClose }) {
  if (!dest) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(10,20,50,0.92)' }} onClick={onClose}>
      <style>{`
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: #acb0cd; border-radius: 2px; }
        .modal-scroll { scrollbar-width: thin; scrollbar-color: #acb0cd transparent; }
      `}</style>
      <div
        className="modal-scroll relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 px-6 py-8 md:px-10 md:py-10"
        style={{ backgroundColor: '#0a1432' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-5 text-[#acb0cd]/50 hover:text-white text-2xl transition-colors duration-200 cursor-pointer">×</button>
        <h2 className="trajan-regular text-xl md:text-2xl text-[#acb0cd] uppercase tracking-[0.1em] mb-4 text-center">{dest.name}</h2>

        {/* ── Contact broker (aligné à droite, sous le titre) ── */}
        <div className="flex justify-end mb-8">
          <a
            href="/contact-broker"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C0C0C0] px-5 py-2 text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 hover:border-[#B03E00] shadow-[0_4px_15px_rgba(192,192,192,0.2)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.3)]"
          >
            Contact a broker
          </a>
        </div>

        <div className="space-y-10">
          {dest.groups.map((group, i) => {
            const grouped = groupAirports(group.airports);
            return (
              <div key={i}>
                {/* Titre île style "GREATER ANTILLES" : trajan large + trait + triangle */}
                <div className="flex flex-col items-center mb-5">
                  <h3 className="trajan-regular text-base md:text-xl text-[#acb0cd] uppercase tracking-[0.25em] text-center">
                    {group.island}
                  </h3>
                  <div className="w-24 md:w-32 h-px bg-white/20 mt-3" />
                  <span className="text-[#c2622a] text-xs mt-1">▴</span>
                </div>

                {/* Sous-sections par catégorie + pills rounded-full */}
                <div className="space-y-4">
                  {grouped.map(([cat, airports], gi) => (
                    <div key={gi} className="text-center">
                      {airports.length > 0 && airports[0].code !== null && (
                        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#acb0cd]/60 italic mb-2">
                          {cat}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {airports.map((a, ai) => (
                          <span
                            key={ai}
                            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border border-[#C0C0C0]/30 bg-[#26272a]"
                          >
                            <span className="w-1.5 h-1.5 rotate-45 bg-[#c2622a] shrink-0" />
                            <span className="text-[#acb0cd] text-xs md:text-sm">{a.name}</span>
                            {a.code && <span className="text-[#C0C0C0]/70 text-[10px] md:text-xs font-mono">({a.code})</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function PrivatJetPage() {
  const [selected, setSelected] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.classList.add('revealed'); });
  }, []);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 1.6s ease, transform 1.6s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ══ HERO ══ */}
      {/* Image jet_hero.jpeg = 927x1648 (portrait).
          On utilise w-full h-auto (l'image suit son ratio naturel) pour qu'elle soit visible
          en entier sur mobile ET desktop, comme demandé. La hauteur s'adapte automatiquement
          à la largeur. Titre déplacé sous la photo (plus en overlay) avec animation reveal-up. */}
      <div className="pt-[70px] md:pt-0">
        <Image
          src="/images/private_jet/jet_hero.jpeg"
          alt="Private Jet"
          width={927}
          height={1648}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />
      </div>

      {/* ══ TITRE (sous le hero, anim reveal-up venant du bas) ══ */}
      <div className="bg-[#26272a] px-4 py-10 md:py-16 flex flex-col items-center">
        <div ref={heroRef} className="reveal-up flex flex-col items-center w-full">
          <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center">
            Private Jets
          </h1>
          <p className="text-[#acb0cd]/70 text-xs md:text-sm uppercase tracking-[0.25em] font-light text-center mt-3">
            Your Gateway to Every Destination
          </p>
        </div>
      </div>

      {/* ══ GRILLE ══ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-24 px-4"
        style={{ backgroundImage: "url('/images/services-bg.png')" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold trajan-regular mb-4 text-center uppercase tracking-wide" style={{ color: '#acb0cd' }}>
          Private Jet Destinations
        </h2>
        <Image src="/images/title-line.png" alt="" width={200} height={10} className="mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
          {destinations.map((dest, i) => (
            <DestCard key={i} dest={dest} onClick={setSelected} />
          ))}
        </div>
      </section>

      <JetModal dest={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
