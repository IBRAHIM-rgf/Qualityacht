'use client';

// ── Caribbean Onboard Accessibility Coordination Guide ────────────────────────
// Le formulaire/guide ou l'invite choisit son handicap (categorie + besoin
// d'accompagnant + recherche) avant d'arriver sur la page correspondante.
// "Caraibes en premier" : REGION ci-dessous est extrait pour cloner les autres
// regions plus tard (REGION = 'Mediterranean', etc.).
// Palette adaptee au site (sombre #26272a, cococo #C0C0C0, lavande #acb0cd,
// orange #B03E00, cuivre #B87333). Boutons "Companion" en couleur : autorise.

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ArrowRight, Check, Accessibility, Lock } from 'lucide-react';
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

// Boarding : points/indicateurs orange brule (#B03E00), demande client 2026-09-10.
// Le niveau est FIXE par l'equipe pour chaque condition (plus de select).
const BOARDING = {
  req: { dot: '#B03E00', text: '#C0C0C0', border: 'rgba(176,62,0,0.55)', bg: '#26272a', label: 'Dedicated companion required' },
  rec: { dot: '#B03E00', text: '#C0C0C0', border: 'rgba(176,62,0,0.55)', bg: '#26272a', label: 'Companion strongly advised' },
  ok:  { dot: '#B03E00', text: '#C0C0C0', border: 'rgba(176,62,0,0.55)', bg: '#26272a', label: 'Independent boarding' },
};

// Lien vers le formulaire de devis en mode accessible, pre-rempli avec le besoin.
const shareHref = (r) =>
  `/request-quote?accessible=1&message=${encodeURIComponent(`Accessibility need: ${r.type} (${r.desc})`)}`;

// Les 8 categories de besoins (sans le filtre « All », retire le 2026-09-10).
const NEED_CATS = CATS.filter((c) => c.id !== 'all');

// Les 31 handicaps + COMP/CATS/SECTIONS sont importés depuis @/lib/handicaps
// (source unique partagée avec l'admin et le filtre yachts). Voir le haut du fichier.

export default function CaribbeanAccessibilityGuide() {
  const router = useRouter();
  const heroVideoRef = useRef(null);

  // prefers-reduced-motion : on met la video en pause sur une image stable et
  // comprehensible plutot que de la laisser boucler.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const v = heroVideoRef.current;
      if (!v) return;
      if (mq.matches) {
        v.loop = false;
        v.pause();
      } else {
        // Retour a la normale dans la meme session : on rend la boucle et on
        // relance, en absorbant le rejet possible de play().
        v.loop = true;
        const p = v.play?.();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    };
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);
  const [picked, setPicked] = useState('');            // handicap principal choisi (id)
  const [activeCat, setActiveCat] = useState(null); // null = toutes les categories (plus de filtre « All »)
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

  const isFiltered = !!activeCat || activeComp || search.trim();

  const grouped = useMemo(() => {
    const s = search.trim().toLowerCase();
    return SECTIONS
      .filter((sec) => !activeCat || activeCat === sec.id)
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

  const resetAll = () => { setActiveCat(null); setActiveComp(null); setSearch(''); };

  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">

      {/* ══ HERO VIDEO plein cadre ══
          `object-cover` au lieu de `object-contain` : plus de bandes vides. Le
          cadrage privilegie le centre en desktop et le haut du sujet en mobile.
          Aucun voile colore, seulement un degrade sombre neutre pour la lisibilite. */}
      <section className="relative w-full h-[82vh] min-h-[520px] md:h-[84vh] max-md:h-[74vh] overflow-hidden bg-[#26272a]">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={heroVideoRef}
          src="/media/quality/video/hero-accessible-caribbean.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center max-md:object-[50%_35%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(38,39,42,0.55) 0%, rgba(38,39,42,0.25) 30%, rgba(38,39,42,0.55) 68%, #26272a 100%)' }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-5 pb-14 md:pb-20">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-[#C0C0C0] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            The Caribbean &middot; Tailored Support at Sea
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight max-w-4xl drop-shadow-[0_3px_14px_rgba(0,0,0,0.85)]">
            Accessible Caribbean Yacht Charters
          </h1>
          <p className="mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-[#acb0cd] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Whatever your mobility, sensory or onboard support needs, our team will identify
            the right yacht and coordinate every detail with you.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/charters/accessible/caribbean/yacht"
              className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
            >
              View Accessible Yachts
            </Link>
            <Link
              href="/#contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0] bg-[#26272a]/50 backdrop-blur-sm px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C0C0C0] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
            >
              Speak to a Charter Specialist
            </Link>
          </div>
        </div>
      </section>

      {/* ══ MASTHEAD ══ */}
      <div className="border-b border-[#B87333]/30 px-6 md:px-14 pt-14 md:pt-16 pb-10 flex flex-col items-center text-center">
        <Image src="/images/logoFondTrans.png" alt="Qualityacht" width={60} height={60} priority className="rounded-full mb-6" />
        <div className="w-7 h-px bg-[#B87333] mb-5" />
        <p className="text-[12px] md:text-[13px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
          {REGION} · Private Charter Accessibility
        </p>
        <h2 className="trajan-regular text-3xl md:text-5xl text-[#C0C0C0] leading-tight mb-2">
          Onboard Accessibility<br />Coordination Guide
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-7 pt-6 border-t border-white/10 w-full">
          <Legend dot={BOARDING.req.dot} label="Dedicated companion required" />
          <Legend dot={BOARDING.rec.dot} label="Companion strongly advised" />
          <Legend dot={BOARDING.ok.dot}  label="Independent boarding" />
          <span className="text-[13px] text-[#8b90a0]">Each charter assessed individually by our medical coordinator.</span>
        </div>
      </div>

      {/* ══ BLOC DE CONTACT RASSURANT ══
          Place au debut du guide, assez loin du hero pour ne pas dupliquer ses CTA
          tout en restant comprehensible si l'on arrive directement ici. */}
      <section className="px-6 md:px-14 py-10 md:py-14">
        <div className="max-w-3xl mx-auto rounded-2xl border border-[#C0C0C0]/40 bg-[#2e2f32] p-8 md:p-10 text-center">
          <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-[#c2622a] mb-4">
            <span aria-hidden className="w-2 h-2 rounded-full bg-[#B03E00]" />
            Personal coordination
          </span>
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-tight">
            Tell Us What You Need
          </h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-[#acb0cd]">
            Every request is handled individually and in complete confidence. Tell us about your
            mobility, sensory or onboard support needs, and our team will coordinate the yacht,
            equipment and assistance best suited to your journey.
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex min-h-[48px] max-w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
          >
            Arrange a Confidential Briefing
          </Link>
        </div>
      </section>

      {/* ══ BESOINS : acces mobilite reduite (verrouille) + 8 cartes categories ══
          Remplace l'ancienne barre de chips (avec « All »). Le premier bloc est
          toujours actif et non desactivable (logo transparent visible). Les 8
          categories sont des cartes cliquables 4 x 2, centrees, plus grandes.
          Un second clic sur une carte active retire le filtre. */}
      <section className="px-6 md:px-14 py-10 md:py-14 bg-[#2e2f32] border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div
            role="checkbox"
            aria-checked="true"
            aria-disabled="true"
            className="relative overflow-hidden flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-[#B03E00]/60 bg-[#3a3b3f] px-5 py-4 md:px-7 md:py-5 select-none"
          >
            {/* Logo transparent du site, visible en filigrane */}
            <Image
              src="/images/trans.png"
              alt=""
              aria-hidden
              width={120}
              height={120}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 opacity-25 md:opacity-30 pointer-events-none"
            />
            <div className="flex items-center gap-4 pr-16 md:pr-0 min-w-0">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#B03E00] text-white flex-none">
                <Check size={16} />
              </span>
              <span className="flex items-center gap-2 text-[15px] md:text-base text-[#C0C0C0] font-medium">
                <Accessibility className="w-5 h-5 flex-none text-[#B03E00]" />
                Reduced mobility access
              </span>
            </div>
            <span className="basis-full md:basis-auto pl-11 md:pl-0 md:ml-auto md:mr-28 inline-flex items-center gap-1.5 text-[12px] md:text-[13px] uppercase tracking-[0.16em] text-[#B03E00]">
              <Lock size={13} /> Included
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {NEED_CATS.map((c) => {
              const on = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActiveCat(on ? null : c.id)}
                  className={`min-h-[84px] md:min-h-[96px] rounded-2xl border px-4 py-4 text-center text-[14px] md:text-[15px] font-medium tracking-wide transition-colors ${
                    on
                      ? 'bg-[#B03E00] border-[#B03E00] text-white'
                      : 'bg-[#3a3b3f] border-[#C0C0C0]/20 text-[#C0C0C0] hover:border-[#B03E00]'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ RESULTS LINE ══ */}
      <div className="flex items-center justify-between px-6 md:px-14 py-3 bg-[#26272a] border-b border-white/10 text-[13px] text-[#8b90a0] tracking-wide">
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
          <p className="text-[12px] md:text-[13px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-2">Find your yacht</p>
          <h2 className="trajan-regular text-2xl md:text-3xl text-[#C0C0C0] mb-4">Your Boarding Preference</h2>
          <p className="text-[13px] md:text-sm text-[#acb0cd] leading-relaxed">
            For the ultimate white-glove experience, <span className="text-[#C0C0C0] font-medium">Dedicated Companion</span> is required.
          </p>
          <p className="text-[13px] md:text-sm text-[#acb0cd] leading-relaxed">
            For a more independent stay, <span className="text-[#C0C0C0] font-medium">Independent Boarding</span> is strongly advised.
          </p>
          <p className="text-[13px] text-[#8b90a0] mt-4">The boarding level shown on each condition is set by our team and cannot be changed.</p>
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
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
                  <h2 className="trajan-regular text-lg md:text-xl text-[#C0C0C0] min-w-0">{sec.label}</h2>
                  <span className="text-[13px] text-[#8b90a0] whitespace-nowrap">{rows.length} condition{rows.length > 1 ? 's' : ''}</span>
                  <div className="flex-1 min-w-[2rem] h-px bg-[#B87333]/25" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                  {rows.map((r) => (
                    <Card key={r.id} r={r} open={expanded.has(r.type)} onToggle={() => toggle(r.type)}
                      selected={picked === r.id} onSelect={() => setPicked(picked === r.id ? '' : r.id)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* ══ CLOSING NOTE ══ */}
      {/* Bande bleue conservee, mais aucun texte directement dessus : le texte
          est pose dans une carte anthracite (demande client 2026-09-10). */}
      <div className="px-6 md:px-14 py-6 bg-[#1b223d] border-t border-white/10">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-6 flex-wrap rounded-2xl bg-[#2e2f32] border border-[#C0C0C0]/20 px-6 py-5">
        <p className="text-[13px] text-[#acb0cd] leading-relaxed max-w-2xl">
          Every guest&apos;s requirements are handled individually and in complete confidence.{' '}
          <span className="text-[#B87333] font-medium">Contact your Charter Coordinator</span> to arrange a dedicated accessibility
          assessment ahead of embarkation.
        </p>
        <span className="flex-none border border-[#C0C0C0]/25 rounded px-4 py-2 text-[12px] tracking-[0.12em] uppercase text-[#acb0cd]">
          {REGION} Fleet
        </span>
      </div>
      </div>

      {/* ══ BARRE STICKY : choix + View Yacht ══ */}
      {picked && <div className="h-20" />}
      {picked && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#26272a]/95 backdrop-blur border-t border-[#B03E00]/60 px-6 md:px-14 py-3 flex items-center justify-between gap-4">
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
      <span className="w-[9px] h-[9px] rounded-full flex-none" style={{ backgroundColor: dot }} />
      <span className="text-[13px] text-[#acb0cd] tracking-wide">{label}</span>
    </span>
  );
}

function Card({ r, open, onToggle, selected, onSelect }) {
  // Niveau d'accompagnement FIXE (defini par l'equipe dans lib/handicaps.js),
  // affiche en lecture seule : plus de select modifiable (client 2026-09-10).
  const cc = BOARDING[r.comp] || BOARDING.req;
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
        <h3 className="text-[#C0C0C0] font-semibold text-[16px] leading-snug">{r.type}</h3>
      </div>

      <p className="text-[#acb0cd] text-[14px] leading-relaxed">{r.desc}</p>

      {/* Boarding level, fixe et non modifiable */}
      <div
        className="mt-3.5 flex items-center gap-2.5 w-full pl-3 pr-3 py-2.5 rounded-lg border text-[13px] font-semibold uppercase tracking-[0.06em]"
        style={{ color: cc.text, borderColor: cc.border, backgroundColor: cc.bg }}
        aria-label={`Boarding level: ${cc.label}`}
      >
        <span aria-hidden className="w-[9px] h-[9px] rounded-full flex-none" style={{ backgroundColor: cc.dot }} />
        {cc.label}
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

      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="inline-flex items-center gap-1 text-[13px] font-medium uppercase tracking-[0.08em] text-[#c2622a] hover:text-[#B03E00] transition-colors"
        >
          {open ? 'See less' : 'See more'}
          <ChevronDown size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
        {/* Ouvre le formulaire de devis en mode accessible, pre-rempli avec ce besoin */}
        <Link
          href={shareHref(r)}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#C0C0C0]/40 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#C0C0C0] hover:border-[#B03E00] hover:text-[#B03E00] transition-colors"
        >
          Share with advisors <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}

function Field({ label, value, italic }) {
  return (
    <div>
      <p className="text-[12px] uppercase tracking-[0.14em] text-[#B87333] mb-1">{label}</p>
      <p className={`text-[13.5px] leading-relaxed ${italic ? 'italic text-[#9498a6]' : 'text-[#acb0cd]'}`}>{value}</p>
    </div>
  );
}
