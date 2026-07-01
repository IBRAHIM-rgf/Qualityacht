'use client';

// ── Caribbean Onboard Accessibility Coordination Guide ────────────────────────
// Le formulaire/guide ou l'invite choisit son handicap (categorie + besoin
// d'accompagnant + recherche) avant d'arriver sur la page correspondante.
// "Caraibes en premier" : REGION ci-dessous est extrait pour cloner les autres
// regions plus tard (REGION = 'Mediterranean', etc.).
// Palette adaptee au site (sombre #26272a, cococo #C0C0C0, lavande #acb0cd,
// orange #B03E00, cuivre #B87333). Boutons "Companion" en couleur : autorise.

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ArrowRight, Check } from 'lucide-react';
import {
  HANDICAP_COMP as COMP,
  HANDICAP_CATS as CATS,
  HANDICAP_SECTIONS as SECTIONS,
  HANDICAPS as DATA,
  HANDICAP_LABELS,
} from '@/lib/handicaps';

const REGION = 'Caribbean';

// Listing yachts Caraïbes dédié accessible (filtré par handicap via ?handicap=<id>).
const YACHTS_LISTING_PATH = '/charters/accessible/caribbean/yacht';

// Boarding : bleu lavande du site (#acb0cd), aucun code couleur par statut.
const BOARDING = {
  req: { dot: '#acb0cd', text: '#acb0cd', border: 'rgba(172,176,205,0.45)', bg: '#26272a' },
  rec: { dot: '#acb0cd', text: '#acb0cd', border: 'rgba(172,176,205,0.45)', bg: '#26272a' },
  ok:  { dot: '#acb0cd', text: '#acb0cd', border: 'rgba(172,176,205,0.45)', bg: '#26272a' },
};

// Les 31 handicaps + COMP/CATS/SECTIONS sont importés depuis @/lib/handicaps
// (source unique partagée avec l'admin et le filtre yachts). Voir le haut du fichier.

export default function CaribbeanAccessibilityGuide() {
  const router = useRouter();
  const [picked, setPicked] = useState('');            // handicap principal choisi (id)
  const [activeCat, setActiveCat] = useState('all');
  const [activeComp, setActiveComp] = useState(null);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(() => new Set());

  const seeMatchingYachts = () => {
    if (!picked) return;
    router.push(`${YACHTS_LISTING_PATH}?handicap=${encodeURIComponent(picked)}`);
  };

  const toggle = (key) => setExpanded((prev) => {
    const next = new Set(prev);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });

  const isFiltered = activeCat !== 'all' || activeComp || search.trim();

  const grouped = useMemo(() => {
    const s = search.trim().toLowerCase();
    return SECTIONS
      .filter((sec) => activeCat === 'all' || activeCat === sec.id)
      .map((sec) => ({
        sec,
        rows: DATA.filter((d) => {
          if (d.cat !== sec.id) return false;
          if (activeComp && d.comp !== activeComp) return false;
          if (s) return [d.type, d.desc, d.vessel, d.equip, d.coord].some((f) => f.toLowerCase().includes(s));
          return true;
        }),
      }))
      .filter((g) => g.rows.length > 0);
  }, [activeCat, activeComp, search]);

  const total = grouped.reduce((n, g) => n + g.rows.length, 0);

  const resetAll = () => { setActiveCat('all'); setActiveComp(null); setSearch(''); };

  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">

      {/* ══ MASTHEAD ══ */}
      <div className="bg-[#1b223d] border-b border-[#B87333]/30 px-6 md:px-14 pt-28 md:pt-32 pb-10">
        <Image src="/images/logoFondTrans.png" alt="Qualityacht" width={60} height={60} priority className="rounded-full mb-6" />
        <div className="w-7 h-px bg-[#B87333] mb-5" />
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
          {REGION} · Private Charter Accessibility
        </p>
        <h1 className="trajan-regular text-3xl md:text-5xl text-[#C0C0C0] leading-tight mb-2">
          Onboard Accessibility<br />Coordination Guide
        </h1>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-7 pt-6 border-t border-white/10">
          <Legend dot={BOARDING.req.dot} label="Dedicated companion required" />
          <Legend dot={BOARDING.rec.dot} label="Companion strongly advised" />
          <Legend dot={BOARDING.ok.dot}  label="Independent boarding" />
          <span className="text-[11px] text-[#6f7585] md:ml-auto">Each charter assessed individually by our medical coordinator.</span>
        </div>
      </div>

      {/* ══ TOOLBAR ══ */}
      <div className="flex flex-col gap-3 px-6 md:px-14 py-4 bg-[#2e2f32] border-b border-white/10">
        {/* Filtres categorie */}
        <div className="flex gap-1.5 flex-wrap">
          {CATS.map((c) => {
            const on = activeCat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`px-3 py-[5px] rounded-full text-[11px] font-medium tracking-wide whitespace-nowrap border transition-colors ${
                  on
                    ? 'bg-[#B03E00] border-[#B03E00] text-[#1c1714]'
                    : 'bg-transparent border-[#C0C0C0]/20 text-[#acb0cd] hover:border-[#B03E00] hover:text-[#C0C0C0]'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ RESULTS LINE ══ */}
      <div className="flex items-center justify-between px-6 md:px-14 py-2.5 bg-[#26272a] border-b border-white/10 text-[11px] text-[#6f7585] tracking-wide">
        <span>
          {total === DATA.length
            ? `${total} conditions across ${SECTIONS.length} categories`
            : `${total} of ${DATA.length} conditions shown`}
        </span>
        {isFiltered && (
          <button onClick={resetAll} className="text-[#c2622a] hover:text-[#B03E00] font-medium transition-colors">
            Clear all filters
          </button>
        )}
      </div>

      {/* ══ CARDS (fond nuage du site) ══ */}
      <div
        className="px-6 md:px-14 py-10"
        style={{
          backgroundImage: 'url(/images/nuagesAncien.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundColor: '#2e2f32',
        }}
      >
        {/* Phrase au-dessus des cards : on selectionne son handicap en cliquant sur une card */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-2">Find your yacht</p>
          <h2 className="trajan-regular text-2xl md:text-3xl text-[#C0C0C0] mb-4">Your Boarding Preference</h2>
          <p className="text-[13px] md:text-sm text-[#acb0cd] leading-relaxed">
            For the ultimate white-glove experience, <span className="text-[#C0C0C0] font-medium">Dedicated Companion</span> is required.
          </p>
          <p className="text-[13px] md:text-sm text-[#acb0cd] leading-relaxed">
            For a more independent stay, <span className="text-[#C0C0C0] font-medium">Independent Boarding</span> is strongly advised.
          </p>
          <p className="text-[12px] text-[#6f7585] mt-4">Set your boarding preference on each condition below.</p>
        </div>

        {total === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[#6f7585] text-sm">
              No conditions match your current filters.{' '}
              <button onClick={resetAll} className="text-[#c2622a] hover:text-[#B03E00] font-medium transition-colors">Reset all filters</button>
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {grouped.map(({ sec, rows }) => (
              <section key={sec.id}>
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="trajan-regular text-lg md:text-xl text-[#C0C0C0] whitespace-nowrap">{sec.label}</h2>
                  <span className="text-[11px] text-[#6f7585] whitespace-nowrap">{rows.length} condition{rows.length > 1 ? 's' : ''}</span>
                  <div className="flex-1 h-px bg-[#B87333]/25" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                  {rows.map((r) => (
                    <Card key={r.id} r={r} open={expanded.has(r.type)} onToggle={() => toggle(r.type)}
                      selected={picked === r.id} onSelect={() => setPicked(r.id)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* ══ CLOSING NOTE ══ */}
      <div className="flex items-center justify-between gap-6 flex-wrap px-6 md:px-14 py-5 bg-[#1b223d] border-t border-white/10">
        <p className="text-[11px] text-[#7a8094] leading-relaxed max-w-2xl">
          Every guest&apos;s requirements are handled individually and in complete confidence.{' '}
          <span className="text-[#B87333] font-medium">Contact your Charter Coordinator</span> to arrange a dedicated accessibility
          assessment ahead of embarkation.
        </p>
        <span className="flex-none border border-white/10 rounded px-4 py-2 text-[10px] tracking-[0.12em] uppercase text-[#6f7585]">
          {REGION} Fleet
        </span>
      </div>

      {/* ══ BARRE STICKY : choix + View Yacht ══ */}
      {picked && <div className="h-20" />}
      {picked && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#1b223d]/95 backdrop-blur border-t border-[#B87333]/40 px-6 md:px-14 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-[#acb0cd] truncate">
            Your choice: <span className="text-[#C0C0C0] font-semibold">{HANDICAP_LABELS[picked] || picked}</span>
          </p>
          <button
            onClick={seeMatchingYachts}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#C0C0C0]/40 text-[#c2622a] text-sm font-medium uppercase tracking-[0.12em] whitespace-nowrap hover:bg-[#B03E00] hover:text-white hover:border-[#B03E00] transition-colors"
          >
            View Yacht <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

function Legend({ dot, label }) {
  return (
    <span className="flex items-center gap-2">
      <span className="w-[7px] h-[7px] rounded-full flex-none" style={{ backgroundColor: dot }} />
      <span className="text-[11px] text-[#8b90a0] tracking-wide">{label}</span>
    </span>
  );
}

function Card({ r, open, onToggle, selected, onSelect }) {
  const [boarding, setBoarding] = useState(r.comp);
  const cc = BOARDING[boarding];
  return (
    <article
      onClick={onSelect}
      className={`relative bg-[#3a3b3f] border rounded-2xl p-5 flex flex-col cursor-pointer transition-colors ${selected ? 'border-[#B03E00] ring-1 ring-[#B03E00]' : 'border-[#C0C0C0]/15 hover:border-[#C0C0C0]/35'}`}
    >
      {selected && (
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#B03E00] text-white shadow-lg">
          <Check size={14} />
        </span>
      )}
      <div className="mb-2.5">
        <h3 className="text-[#C0C0C0] font-semibold text-[15px] leading-snug">{r.type}</h3>
      </div>

      <p className="text-[#acb0cd] text-[13px] leading-relaxed">{r.desc}</p>

      {/* Boarding preference — select colore rouge/jaune/vert selon le statut */}
      <div className="mt-3.5 relative" onClick={(e) => e.stopPropagation()}>
        <select
          value={boarding}
          onChange={(e) => setBoarding(e.target.value)}
          style={{ color: cc.text, borderColor: cc.border, backgroundColor: cc.bg }}
          className="appearance-none w-full cursor-pointer pl-3 pr-9 py-2 rounded-lg border text-[11px] font-semibold uppercase tracking-[0.06em] outline-none transition-colors"
        >
          <option value="req" style={{ backgroundColor: '#26272a', color: BOARDING.req.text }}>Dedicated companion required</option>
          <option value="rec" style={{ backgroundColor: '#26272a', color: BOARDING.rec.text }}>Companion strongly advised</option>
          <option value="ok" style={{ backgroundColor: '#26272a', color: BOARDING.ok.text }}>Independent boarding</option>
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: cc.text }} />
      </div>

      {/* Bloc detail repliable (animation hauteur via grid-rows) */}
      <div className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="space-y-3 border-t border-white/10 pt-4">
            <Field label="Vessel provisions" value={r.vessel} />
            <Field label="Specialist equipment" value={r.equip} />
            <Field label="Coordination notes" value={r.coord} italic />
          </div>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className="mt-4 self-start inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#c2622a] hover:text-[#B03E00] transition-colors"
      >
        {open ? 'See less' : 'See more'}
        <ChevronDown size={13} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
    </article>
  );
}

function Field({ label, value, italic }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.14em] text-[#B87333] mb-1">{label}</p>
      <p className={`text-[12.5px] leading-relaxed ${italic ? 'italic text-[#9498a6]' : 'text-[#acb0cd]'}`}>{value}</p>
    </div>
  );
}
