'use client';

// ── Caribbean Onboard Accessibility Coordination Guide ────────────────────────
// Le formulaire/guide ou l'invite choisit son handicap (categorie + besoin
// d'accompagnant + recherche) avant d'arriver sur la page correspondante.
// "Caraibes en premier" : REGION ci-dessous est extrait pour cloner les autres
// regions plus tard (REGION = 'Mediterranean', etc.).
// Palette adaptee au site (sombre #26272a, cococo #C0C0C0, lavande #acb0cd,
// orange #B03E00, cuivre #B87333). Boutons "Companion" en couleur : autorise.

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

const REGION = 'Caribbean';

// 3 statuts d'accompagnement — boutons & badges en couleur (autorise).
const COMP = {
  req: { short: 'Required',    dot: '#D4846A', text: '#e3a892', bg: 'rgba(212,132,106,0.16)', border: 'rgba(212,132,106,0.55)', onBg: 'rgba(212,132,106,0.20)' },
  rec: { short: 'Advised',     dot: '#C9AA5C', text: '#d8be7e', bg: 'rgba(201,170,92,0.16)',  border: 'rgba(201,170,92,0.55)',  onBg: 'rgba(201,170,92,0.20)' },
  ok:  { short: 'Independent', dot: '#6DAF8A', text: '#8fcfa9', bg: 'rgba(109,175,138,0.16)', border: 'rgba(109,175,138,0.55)', onBg: 'rgba(109,175,138,0.20)' },
};

const CATS = [
  { id: 'all',       label: 'All' },
  { id: 'mobility',  label: 'Mobility' },
  { id: 'visual',    label: 'Visual' },
  { id: 'hearing',   label: 'Hearing' },
  { id: 'cognitive', label: 'Cognitive' },
  { id: 'cardio',    label: 'Cardio-Resp.' },
  { id: 'neuro',     label: 'Neurological' },
  { id: 'hidden',    label: 'Non-Visible' },
  { id: 'multi',     label: 'Complex' },
];

const SECTIONS = [
  { id: 'mobility',  label: 'Mobility Impairment' },
  { id: 'visual',    label: 'Visual Impairment' },
  { id: 'hearing',   label: 'Hearing Impairment' },
  { id: 'cognitive', label: 'Cognitive & Mental Health' },
  { id: 'cardio',    label: 'Cardiorespiratory' },
  { id: 'neuro',     label: 'Neurological' },
  { id: 'hidden',    label: 'Non-Visible Disability' },
  { id: 'multi',     label: 'Complex & Multiple Disability' },
];

const DATA = [
  { cat: 'mobility', type: 'Manual wheelchair', desc: 'No lower-limb mobility; full upper-body function. Self-propelled.', comp: 'req', vessel: 'Anti-slip removable boarding ramp, clear aft deck ≥ 1.2 m, flush cockpit sole', equip: 'Aircraft-grade aluminum ramp, recessed grab rails, flush continuous deck', coord: 'Avoid vessels with raised cockpit soles. Swells exceeding 0.5 m require additional crew support.' },
  { cat: 'mobility', type: 'Power wheelchair', desc: 'Full lower-limb paralysis. Power chair weight 80–150 kg; reinforced tie-down required.', comp: 'req', vessel: 'Reinforced aft deck rated to 300 kg+, heavy-duty boarding ramp or hydraulic hoist', equip: 'Cargo-rated ramp, titanium tie-down straps, electric passenger hoist', coord: 'Deck structural load must be independently verified prior to departure. Chair + guest weight combined.' },
  { cat: 'mobility', type: 'Walker / crutch user', desc: 'Ambulatory with cane, crutches, or rollator. Balance compromised on moving surfaces.', comp: 'rec', vessel: 'Grab rails throughout, non-slip teak deck surfaces, cockpit seating with armrests', equip: 'Marine-grade stainless rails, rubber non-slip matting, padded cockpit seat with arms', coord: 'Rough sea state inadvisable. Prefer vessels with level gangway — no step boarding.' },
  { cat: 'mobility', type: 'Lower-limb amputee', desc: 'Partial or full amputation of one or both legs. Prosthesis use varies.', comp: 'rec', vessel: 'Flush deck access throughout, step-free wet room, passage widths ≥ 80 cm', equip: 'Teak shower seat, support rails, aquatic prosthesis or amphibious wheelchair on standby', coord: 'Wet prosthesis damage risk at sea. Provision aquatic prosthesis or dedicated water-entry chair.' },
  { cat: 'mobility', type: 'Upper-limb amputee', desc: 'Partial or full amputation of one or both arms. Grip absent or significantly limited.', comp: 'rec', vessel: 'Sliding doors throughout, lever faucets, all fittings operable single-handed', equip: 'Lever hardware throughout, fixed openers, prosthesis-compatible offshore safety harness', coord: 'Harness compatibility with prosthesis must be confirmed with safety officer before departure.' },
  { cat: 'mobility', type: 'Partial paralysis (paresis)', desc: 'Unilateral muscular weakness (hemiparesis) or bilateral lower-limb weakness (paraparesis).', comp: 'rec', vessel: 'Rails concentrated on affected side, armrest seating throughout, berth with safety board', equip: 'Reinforced armrests, berth guard rail, stable boarding step', coord: 'Individual functional assessment required. Degree of paresis determines staffing level.' },
  { cat: 'mobility', type: 'Tetraplegia / Paraplegia', desc: 'Complete paralysis of all four limbs (tetra) or lower limbs (para). Continuous care required.', comp: 'req', vessel: 'Deck-level PMR stateroom, adapted head, wet-room shower, ceiling-track hoist system', equip: 'Electric ceiling hoist, pressure-relief mattress, suction unit as indicated', coord: 'Full care plan submitted to captain and medical officer prior to embarkation. Coastal routing recommended.' },

  { cat: 'visual', type: 'Low vision', desc: 'Residual acuity < 1/10. Perceives light and contrast; cannot read or navigate independently aboard.', comp: 'rec', vessel: 'Full-spectrum LED lighting at all hours, high-contrast strips on steps and deck edges', equip: 'Tactile deck tiles, high-visibility stair markings, embossed signage', coord: 'Verbal orientation briefing required at each new port. Night navigation to be avoided.' },
  { cat: 'visual', type: 'Blind (total)', desc: 'No functional vision. White cane or guide dog. Cannot orient independently on an unfamiliar vessel.', comp: 'req', vessel: 'Physical guided orientation at boarding, tactile deck plan, safety guide rope installed', equip: 'Deck safety rope, call bells, fully embossed labeling throughout', coord: 'Guide dogs welcomed — dedicated relief space and food station required. Full verbal briefing at every new location.' },
  { cat: 'visual', type: 'Tunnel vision', desc: 'Severely restricted peripheral field. Central axis only; lateral blind zones.', comp: 'rec', vessel: 'Unobstructed walkways, single-direction circulation plan enforced', equip: 'Floor guide strips, uniform glare-free lighting throughout', coord: 'Crew to monitor lateral obstacles on deck and in companionways.' },

  { cat: 'hearing', type: 'Hard of hearing (aided)', desc: 'Partial loss compensated by hearing aids. Understands speech in calm conditions.', comp: 'ok', vessel: 'Visual strobe alarms supplementing all audible safety systems', equip: 'Emergency light alarms, vibrating bed-alert unit', coord: 'Provide sealed waterproof cases for hearing aids — continuous salt-air exposure risk.' },
  { cat: 'hearing', type: 'Deaf (total)', desc: 'No functional hearing. Communication via ASL or lip-reading.', comp: 'rec', vessel: 'All safety alarms fully duplicated visually; dedicated indicator panel on bridge', equip: 'Emergency strobes throughout, vibrating safety wristband, communication tablet, written VHF log', coord: 'Captain and key crew must be briefed on visual safety protocols. Written communications plan to be filed aboard.' },
  { cat: 'hearing', type: 'Deaf-mute', desc: 'Combined auditory and speech impairment. Non-verbal communication exclusively.', comp: 'req', vessel: 'Full visual communication infrastructure, touchscreen panels at key stations', equip: 'Communication tablet and whiteboard at helm and saloon, ASL application, 100% visual alarm system', coord: 'Port stops to be coordinated with harbors offering ASL interpreter services where possible.' },

  { cat: 'cognitive', type: 'Mild / moderate intellectual disability', desc: 'Learning difficulties; unable to follow complex instructions. Partial autonomy possible.', comp: 'req', vessel: 'Safety instructions displayed as pictograms, structured daily schedule, color-coded zones', equip: 'Safety pictogram card set, simplified alarms, color-coded zone markers', coord: 'Adapted safety briefing required. Individual embarkation assessment mandatory.' },
  { cat: 'cognitive', type: 'Autism spectrum (ASD)', desc: 'Sensory hypersensitivity, social communication challenges, strong routine dependency. Anxiety episodes possible.', comp: 'req', vessel: 'Dedicated low-stimulation retreat space, reduced auditory and visual output throughout', equip: 'Noise-canceling headphones, tinted glasses, enclosed calm space with curtain', coord: 'Detailed itinerary shared well in advance. Avoid peak-season marinas. Crew briefed on de-escalation.' },
  { cat: 'cognitive', type: "Dementia / Alzheimer's", desc: 'Spatial and temporal disorientation; wandering behavior likely. Constant supervision essential.', comp: 'req', vessel: 'Full perimeter safety netting, exterior doors locked, zero unsupervised deck access', equip: 'Cabin exit alarm, GPS tracking wristband, safety netting on all exterior deck areas', coord: 'Short coastal passages only. Medication management handled exclusively by designated companion.' },
  { cat: 'cognitive', type: 'Stabilized psychiatric conditions', desc: 'Bipolar disorder, schizophrenia, or severe anxiety — managed by ongoing treatment plan. Rarely unpredictable.', comp: 'rec', vessel: 'Quiet retreat space available 24 hours, alcohol access restricted if medically indicated, consistent schedule', equip: 'Emergency medication kit aboard, psychiatrist contact information filed with captain', coord: 'Current valid prescription required. Captain to be briefed on treatment protocol and response plan.' },

  { cat: 'cardio', type: 'Chronic heart failure', desc: 'Exertional fatigue and breathlessness. Risk of acute cardiac episode. Severely limited physical capacity.', comp: 'rec', vessel: 'Zero crew duties. Unrestricted access to all spaces, shaded and ventilated cockpit seating', equip: 'AED mandatory, pulse oximeter, full cardiac emergency kit', coord: 'Extreme heat and bluewater passages to be avoided. Maritime medical evacuation protocol briefed before departure.' },
  { cat: 'cardio', type: 'Continuous O₂ therapy', desc: 'Dependent on O₂ concentrator. Very limited mobility. Absolute no-smoking policy aboard.', comp: 'req', vessel: 'Uninterrupted 220 V supply, ventilated equipment locker, strict non-smoking vessel policy', equip: 'Marine O₂ concentrator, backup cylinders, dedicated circuit breaker', coord: 'O₂ autonomy calculated per route leg. Resupply coordinated at each port of call in advance.' },
  { cat: 'cardio', type: 'Severe asthma / COPD', desc: 'Sensitivity to humidity, salt air, and exertion. Acute respiratory episodes possible.', comp: 'rec', vessel: 'Well-ventilated, mold-free stateroom; gas cooking prohibited in enclosed spaces', equip: 'Portable nebulizer, rescue bronchodilator, pulse oximeter', coord: 'Avoid high-humidity or misty routes. Rapid medical evacuation plan filed and briefed.' },

  { cat: 'neuro', type: 'Epilepsy', desc: 'Unpredictable tonic-clonic seizures. Fall and drowning risk if episode occurs on deck or at water level.', comp: 'req', vessel: 'Full perimeter lifelines and safety netting on all exterior deck areas', equip: 'Anti-epileptic emergency kit (diazepam / midazolam), O₂ mask, posted seizure response protocol', coord: 'Swimming only under immediate crew supervision. Independent diving strictly prohibited.' },
  { cat: 'neuro', type: 'Multiple sclerosis (MS)', desc: 'Extreme fatigue, balance impairment, heat hypersensitivity. Unpredictable relapse episodes.', comp: 'rec', vessel: 'Shaded cockpit zones, stateroom air-conditioning, ergonomic seating throughout', equip: 'Portable fan, positioning cushion, padded deck mat', coord: 'High-heat navigation to be avoided. Mandatory rest periods — schedule to be agreed with guest prior to departure.' },
  { cat: 'neuro', type: "Parkinson's disease", desc: 'Tremor, rigidity, postural instability. Frequent falls. Delayed movement responses.', comp: 'req', vessel: 'Dense grab-rail installation, cushioned non-slip deck surface, elevated cockpit seating', equip: 'Grab rails in stateroom and head, shower seat, rollator on standby', coord: 'Heavy swell strongly contraindicated. Strict medication schedule must be honored — crew to be briefed.' },
  { cat: 'neuro', type: 'Stroke sequelae (hemiplegia)', desc: 'Unilateral paralysis. Potential speech impairment (aphasia).', comp: 'req', vessel: 'Rails positioned on functional side; all seating oriented to favor strong side', equip: 'Ankle-foot orthosis, quad cane, communication tablet for aphasic guests', coord: 'Marine safety wristband mandatory. Fine motor assessment required before embarkation.' },

  { cat: 'hidden', type: 'Insulin-dependent diabetes', desc: 'Blood glucose management multiple times daily. Hypo/hyperglycemia risk if meals or medication are delayed.', comp: 'rec', vessel: 'Reliable 12 V refrigerator for insulin, fixed meal times, rapid-sugar access at all stations', equip: 'Glucometer, insulin cold-storage unit (2–8 °C), rapid sugars accessible at all times', coord: 'Hypoglycemia crisis protocol posted aboard. Designated crew member briefed on recognition and response.' },
  { cat: 'hidden', type: 'Renal failure (dialysis)', desc: 'Dialysis three times per week. Strict dietary protocol. High baseline fatigue.', comp: 'req', vessel: 'Onboard dietary kitchen: low-sodium, low-potassium, purified water supply', equip: 'Dialysis passport, confirmed dialysis center contacts at every port of call', coord: 'Coastal itinerary only — confirmed dialysis access at each scheduled stop is non-negotiable.' },
  { cat: 'hidden', type: 'Fibromyalgia / chronic pain', desc: 'Continuous diffuse pain aggravated by cold and damp. Significant fatigue.', comp: 'ok', vessel: 'Orthopedic memory-foam bedding, heated stateroom, positioning cushions throughout', equip: 'Lumbar support, 12 V heated throw, prescription pain-relief emergency kit', coord: 'Cold-water itineraries to be avoided. Vessel motion may aggravate symptoms — sea state briefings recommended.' },
  { cat: 'hidden', type: 'Morbid obesity (BMI > 40)', desc: 'Reduced mobility, exertional breathlessness, difficulty in narrow passages.', comp: 'rec', vessel: 'Passageways ≥ 90 cm, seating rated > 200 kg, oversized head and shower', equip: 'Reinforced cockpit seating, XL offshore life jacket, passenger hoist as indicated', coord: 'All deck and equipment load ratings must be independently verified. XL-rated PFD mandatory at all times underway.' },

  { cat: 'multi', type: 'Combined physical & cognitive disability', desc: 'Concurrent motor and intellectual disabilities. No independent function. Continuous professional care.', comp: 'req', vessel: 'Full PMR stateroom, electric passenger hoist, fully adapted bathroom with wet room', equip: 'Electric hoist, anti-decubitus mattress, suction unit, complete professional care kit', coord: 'Short coastal passages only. Full medical assessment and care plan required before charter confirmation.' },
  { cat: 'multi', type: 'Deafblindness', desc: 'Total combined sensory loss — deaf and blind simultaneously. Communication via tactile sign language only.', comp: 'req', vessel: 'Continuous tactile guidance system, obstacle-free layout, extra-wide circulation spaces', equip: 'Personal guide rope, whole-vessel vibrating alarm network, tactile display tablet', coord: 'Specialist deafblind companion is non-negotiable. Deafblind community organization to be consulted in planning.' },
  { cat: 'multi', type: 'Tracheotomy / Ventilator dependency', desc: 'Partial or total mechanical ventilation. Daily tracheotomy care required.', comp: 'req', vessel: 'Generator-backed power supply, dedicated onboard medical station', equip: 'Portable ventilator, suction unit, emergency O₂, backup generator with automatic transfer switch', coord: 'Coastal navigation only. Coast guard and port medical services notified prior to departure.' },
];

export default function CaribbeanAccessibilityGuide() {
  const [activeCat, setActiveCat] = useState('all');
  const [activeComp, setActiveComp] = useState(null);
  const [search, setSearch] = useState('');

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
        <div className="w-7 h-px bg-[#B87333] mb-5" />
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
          {REGION} · Private Charter Accessibility
        </p>
        <h1 className="trajan-regular text-3xl md:text-5xl text-[#C0C0C0] leading-tight mb-2">
          Onboard Accessibility<br />Coordination Guide
        </h1>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-7 pt-6 border-t border-white/10">
          <Legend dot={COMP.req.dot} label="Dedicated companion required" />
          <Legend dot={COMP.rec.dot} label="Companion strongly advised" />
          <Legend dot={COMP.ok.dot}  label="Independent boarding" />
          <span className="text-[11px] text-[#6f7585] md:ml-auto">Each charter assessed individually by our medical coordinator.</span>
        </div>
      </div>

      {/* ══ TOOLBAR ══ */}
      <div className="flex items-center gap-3 flex-wrap px-6 md:px-14 py-4 bg-[#2e2f32] border-b border-white/10">
        <div className="relative flex-none w-full sm:w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7585] pointer-events-none" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search condition or equipment…"
            autoComplete="off"
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#3a3b3f] border border-[#C0C0C0]/20 rounded text-[#acb0cd] placeholder:text-[#6f7585] outline-none focus:border-[#B03E00] transition-colors"
          />
        </div>

        <div className="hidden sm:block w-px h-5 bg-white/10" />

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

        {/* Filtre accompagnant (couleurs autorisees) */}
        <div className="flex items-center gap-1.5 md:ml-auto">
          <span className="text-[11px] text-[#6f7585] whitespace-nowrap">Companion:</span>
          {['req', 'rec', 'ok'].map((k) => {
            const on = activeComp === k;
            const c = COMP[k];
            return (
              <button
                key={k}
                onClick={() => setActiveComp(on ? null : k)}
                className="px-[11px] py-[5px] rounded-full text-[11px] font-medium border transition-colors"
                style={
                  on
                    ? { backgroundColor: c.onBg, color: c.text, borderColor: c.border }
                    : { backgroundColor: 'transparent', color: '#acb0cd', borderColor: 'rgba(192,192,192,0.2)' }
                }
              >
                {c.short}
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

      {/* ══ TABLE ══ */}
      <div className="overflow-x-auto">
        {total === 0 ? (
          <div className="py-16 px-6 md:px-14 text-center bg-[#2e2f32]">
            <p className="text-[#6f7585] text-sm">
              No conditions match your current filters.{' '}
              <button onClick={resetAll} className="text-[#c2622a] hover:text-[#B03E00] font-medium transition-colors">Reset all filters</button>
            </p>
          </div>
        ) : (
          <table className="w-full border-collapse" style={{ minWidth: 1040 }}>
            <colgroup>
              <col style={{ width: 172 }} />
              <col style={{ width: 210 }} />
              <col style={{ width: 124 }} />
              <col style={{ width: 210 }} />
              <col style={{ width: 195 }} />
              <col />
            </colgroup>
            <thead>
              <tr>
                {['Condition', 'Clinical overview', 'Companion', 'Vessel provisions', 'Specialist equipment', 'Coordination notes'].map((h, i) => (
                  <th
                    key={h}
                    className={`text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6f7585] bg-[#2e2f32] border-b-2 border-[#C0C0C0]/40 py-3 px-5 whitespace-nowrap ${
                      i === 0 ? 'pl-6 md:pl-14' : ''
                    } ${i === 5 ? 'pr-6 md:pr-14' : ''}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grouped.map(({ sec, rows }) => (
                <FragmentSection key={sec.id} sec={sec} rows={rows} />
              ))}
            </tbody>
          </table>
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

function FragmentSection({ sec, rows }) {
  return (
    <>
      <tr>
        <td colSpan={6} className="trajan-regular text-[15px] text-[#C0C0C0] pt-6 pb-2 px-5 pl-6 md:pl-14 bg-[#26272a] border-t border-white/5 border-b border-[#B87333]/25">
          {sec.label}
          <span className="font-sans text-[11px] text-[#6f7585] ml-3 tracking-wide normal-case">
            {rows.length} condition{rows.length > 1 ? 's' : ''}
          </span>
        </td>
      </tr>
      {rows.map((r) => {
        const c = COMP[r.comp];
        return (
          <tr key={r.type} className="group">
            <td className="align-top py-3.5 px-5 pl-6 md:pl-14 bg-[#2e2f32] group-hover:bg-[#34353a] border-b border-white/5 transition-colors">
              <span className="text-[13px] font-medium text-[#C0C0C0] leading-snug">{r.type}</span>
            </td>
            <td className="align-top py-3.5 px-5 bg-[#2e2f32] group-hover:bg-[#34353a] border-b border-white/5 transition-colors text-[12px] text-[#acb0cd] leading-relaxed">{r.desc}</td>
            <td className="align-top py-3.5 px-5 bg-[#2e2f32] group-hover:bg-[#34353a] border-b border-white/5 transition-colors">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10.5px] font-semibold uppercase tracking-wide whitespace-nowrap border"
                style={{ backgroundColor: c.bg, color: c.text, borderColor: c.border }}
              >
                <span className="w-[5px] h-[5px] rounded-full flex-none" style={{ backgroundColor: c.dot }} />
                {c.short}
              </span>
            </td>
            <td className="align-top py-3.5 px-5 bg-[#2e2f32] group-hover:bg-[#34353a] border-b border-white/5 transition-colors text-[12px] text-[#c4c8d8] leading-relaxed">{r.vessel}</td>
            <td className="align-top py-3.5 px-5 bg-[#2e2f32] group-hover:bg-[#34353a] border-b border-white/5 transition-colors text-[12px] text-[#acb0cd] leading-relaxed">{r.equip}</td>
            <td className="align-top py-3.5 px-5 pr-6 md:pr-14 bg-[#2e2f32] group-hover:bg-[#34353a] border-b border-white/5 transition-colors text-[11.5px] text-[#8b90a0] italic leading-relaxed">{r.coord}</td>
          </tr>
        );
      })}
    </>
  );
}
