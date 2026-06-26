// ── Handicaps Caraïbes (source unique) ────────────────────────────────────────
// Les 31 handicaps utilisés à la fois par la page accessible
// (src/app/charters/accessible/caribbean/page.js) et par l'admin (tag par yacht).
// Chaque entrée a un `id` STABLE (namespacé par catégorie, ex. 'mobility/power-wheelchair')
// qui est la valeur stockée en BDD dans la colonne `handicaps` (JSONB array).
// Format des ids calqué sur les categories charter ('only-for-you/...').

// 3 statuts d'accompagnement — boutons & badges en couleur (autorisé sur la page accessible).
export const HANDICAP_COMP = {
  req: { short: 'Required',    dot: '#D4846A', text: '#e3a892', bg: 'rgba(212,132,106,0.16)', border: 'rgba(212,132,106,0.55)', onBg: 'rgba(212,132,106,0.20)' },
  rec: { short: 'Advised',     dot: '#C9AA5C', text: '#d8be7e', bg: 'rgba(201,170,92,0.16)',  border: 'rgba(201,170,92,0.55)',  onBg: 'rgba(201,170,92,0.20)' },
  ok:  { short: 'Independent', dot: '#6DAF8A', text: '#8fcfa9', bg: 'rgba(109,175,138,0.16)', border: 'rgba(109,175,138,0.55)', onBg: 'rgba(109,175,138,0.20)' },
};

// Catégories pour les filtres "chips" de la page (inclut 'all').
export const HANDICAP_CATS = [
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

// Sections (catégorie → libellé long) pour le groupement de la page + l'admin.
export const HANDICAP_SECTIONS = [
  { id: 'mobility',  label: 'Mobility Impairment' },
  { id: 'visual',    label: 'Visual Impairment' },
  { id: 'hearing',   label: 'Hearing Impairment' },
  { id: 'cognitive', label: 'Cognitive & Mental Health' },
  { id: 'cardio',    label: 'Cardiorespiratory' },
  { id: 'neuro',     label: 'Neurological' },
  { id: 'hidden',    label: 'Non-Visible Disability' },
  { id: 'multi',     label: 'Complex & Multiple Disability' },
];

// Les 31 handicaps. `id` = valeur BDD ; `cat` = catégorie ; `type` = libellé.
export const HANDICAPS = [
  { id: 'mobility/manual-wheelchair',     cat: 'mobility', type: 'Manual wheelchair', desc: 'No lower-limb mobility; full upper-body function. Self-propelled.', comp: 'req', vessel: 'Anti-slip removable boarding ramp, clear aft deck ≥ 1.2 m, flush cockpit sole', equip: 'Aircraft-grade aluminum ramp, recessed grab rails, flush continuous deck', coord: 'Avoid vessels with raised cockpit soles. Swells exceeding 0.5 m require additional crew support.' },
  { id: 'mobility/power-wheelchair',      cat: 'mobility', type: 'Power wheelchair', desc: 'Full lower-limb paralysis. Power chair weight 80–150 kg; reinforced tie-down required.', comp: 'req', vessel: 'Reinforced aft deck rated to 300 kg+, heavy-duty boarding ramp or hydraulic hoist', equip: 'Cargo-rated ramp, titanium tie-down straps, electric passenger hoist', coord: 'Deck structural load must be independently verified prior to departure. Chair + guest weight combined.' },
  { id: 'mobility/walker-crutch',         cat: 'mobility', type: 'Walker / crutch user', desc: 'Ambulatory with cane, crutches, or rollator. Balance compromised on moving surfaces.', comp: 'rec', vessel: 'Grab rails throughout, non-slip teak deck surfaces, cockpit seating with armrests', equip: 'Marine-grade stainless rails, rubber non-slip matting, padded cockpit seat with arms', coord: 'Rough sea state inadvisable. Prefer vessels with level gangway — no step boarding.' },
  { id: 'mobility/lower-limb-amputee',    cat: 'mobility', type: 'Lower-limb amputee', desc: 'Partial or full amputation of one or both legs. Prosthesis use varies.', comp: 'rec', vessel: 'Flush deck access throughout, step-free wet room, passage widths ≥ 80 cm', equip: 'Teak shower seat, support rails, aquatic prosthesis or amphibious wheelchair on standby', coord: 'Wet prosthesis damage risk at sea. Provision aquatic prosthesis or dedicated water-entry chair.' },
  { id: 'mobility/upper-limb-amputee',    cat: 'mobility', type: 'Upper-limb amputee', desc: 'Partial or full amputation of one or both arms. Grip absent or significantly limited.', comp: 'rec', vessel: 'Sliding doors throughout, lever faucets, all fittings operable single-handed', equip: 'Lever hardware throughout, fixed openers, prosthesis-compatible offshore safety harness', coord: 'Harness compatibility with prosthesis must be confirmed with safety officer before departure.' },
  { id: 'mobility/partial-paralysis',     cat: 'mobility', type: 'Partial paralysis (paresis)', desc: 'Unilateral muscular weakness (hemiparesis) or bilateral lower-limb weakness (paraparesis).', comp: 'rec', vessel: 'Rails concentrated on affected side, armrest seating throughout, berth with safety board', equip: 'Reinforced armrests, berth guard rail, stable boarding step', coord: 'Individual functional assessment required. Degree of paresis determines staffing level.' },
  { id: 'mobility/tetraplegia-paraplegia', cat: 'mobility', type: 'Tetraplegia / Paraplegia', desc: 'Complete paralysis of all four limbs (tetra) or lower limbs (para). Continuous care required.', comp: 'req', vessel: 'Deck-level PMR stateroom, adapted head, wet-room shower, ceiling-track hoist system', equip: 'Electric ceiling hoist, pressure-relief mattress, suction unit as indicated', coord: 'Full care plan submitted to captain and medical officer prior to embarkation. Coastal routing recommended.' },

  { id: 'visual/low-vision',   cat: 'visual', type: 'Low vision', desc: 'Residual acuity < 1/10. Perceives light and contrast; cannot read or navigate independently aboard.', comp: 'rec', vessel: 'Full-spectrum LED lighting at all hours, high-contrast strips on steps and deck edges', equip: 'Tactile deck tiles, high-visibility stair markings, embossed signage', coord: 'Verbal orientation briefing required at each new port. Night navigation to be avoided.' },
  { id: 'visual/blind-total',  cat: 'visual', type: 'Blind (total)', desc: 'No functional vision. White cane or guide dog. Cannot orient independently on an unfamiliar vessel.', comp: 'req', vessel: 'Physical guided orientation at boarding, tactile deck plan, safety guide rope installed', equip: 'Deck safety rope, call bells, fully embossed labeling throughout', coord: 'Guide dogs welcomed — dedicated relief space and food station required. Full verbal briefing at every new location.' },
  { id: 'visual/tunnel-vision', cat: 'visual', type: 'Tunnel vision', desc: 'Severely restricted peripheral field. Central axis only; lateral blind zones.', comp: 'rec', vessel: 'Unobstructed walkways, single-direction circulation plan enforced', equip: 'Floor guide strips, uniform glare-free lighting throughout', coord: 'Crew to monitor lateral obstacles on deck and in companionways.' },

  { id: 'hearing/hard-of-hearing', cat: 'hearing', type: 'Hard of hearing (aided)', desc: 'Partial loss compensated by hearing aids. Understands speech in calm conditions.', comp: 'ok', vessel: 'Visual strobe alarms supplementing all audible safety systems', equip: 'Emergency light alarms, vibrating bed-alert unit', coord: 'Provide sealed waterproof cases for hearing aids — continuous salt-air exposure risk.' },
  { id: 'hearing/deaf-total',      cat: 'hearing', type: 'Deaf (total)', desc: 'No functional hearing. Communication via ASL or lip-reading.', comp: 'rec', vessel: 'All safety alarms fully duplicated visually; dedicated indicator panel on bridge', equip: 'Emergency strobes throughout, vibrating safety wristband, communication tablet, written VHF log', coord: 'Captain and key crew must be briefed on visual safety protocols. Written communications plan to be filed aboard.' },
  { id: 'hearing/deaf-mute',       cat: 'hearing', type: 'Deaf-mute', desc: 'Combined auditory and speech impairment. Non-verbal communication exclusively.', comp: 'req', vessel: 'Full visual communication infrastructure, touchscreen panels at key stations', equip: 'Communication tablet and whiteboard at helm and saloon, ASL application, 100% visual alarm system', coord: 'Port stops to be coordinated with harbors offering ASL interpreter services where possible.' },

  { id: 'cognitive/intellectual-disability', cat: 'cognitive', type: 'Mild / moderate intellectual disability', desc: 'Learning difficulties; unable to follow complex instructions. Partial autonomy possible.', comp: 'req', vessel: 'Safety instructions displayed as pictograms, structured daily schedule, color-coded zones', equip: 'Safety pictogram card set, simplified alarms, color-coded zone markers', coord: 'Adapted safety briefing required. Individual embarkation assessment mandatory.' },
  { id: 'cognitive/autism-spectrum',         cat: 'cognitive', type: 'Autism spectrum (ASD)', desc: 'Sensory hypersensitivity, social communication challenges, strong routine dependency. Anxiety episodes possible.', comp: 'req', vessel: 'Dedicated low-stimulation retreat space, reduced auditory and visual output throughout', equip: 'Noise-canceling headphones, tinted glasses, enclosed calm space with curtain', coord: 'Detailed itinerary shared well in advance. Avoid peak-season marinas. Crew briefed on de-escalation.' },
  { id: 'cognitive/dementia-alzheimer',      cat: 'cognitive', type: "Dementia / Alzheimer's", desc: 'Spatial and temporal disorientation; wandering behavior likely. Constant supervision essential.', comp: 'req', vessel: 'Full perimeter safety netting, exterior doors locked, zero unsupervised deck access', equip: 'Cabin exit alarm, GPS tracking wristband, safety netting on all exterior deck areas', coord: 'Short coastal passages only. Medication management handled exclusively by designated companion.' },
  { id: 'cognitive/psychiatric-conditions',  cat: 'cognitive', type: 'Stabilized psychiatric conditions', desc: 'Bipolar disorder, schizophrenia, or severe anxiety — managed by ongoing treatment plan. Rarely unpredictable.', comp: 'rec', vessel: 'Quiet retreat space available 24 hours, alcohol access restricted if medically indicated, consistent schedule', equip: 'Emergency medication kit aboard, psychiatrist contact information filed with captain', coord: 'Current valid prescription required. Captain to be briefed on treatment protocol and response plan.' },

  { id: 'cardio/chronic-heart-failure', cat: 'cardio', type: 'Chronic heart failure', desc: 'Exertional fatigue and breathlessness. Risk of acute cardiac episode. Severely limited physical capacity.', comp: 'rec', vessel: 'Zero crew duties. Unrestricted access to all spaces, shaded and ventilated cockpit seating', equip: 'AED mandatory, pulse oximeter, full cardiac emergency kit', coord: 'Extreme heat and bluewater passages to be avoided. Maritime medical evacuation protocol briefed before departure.' },
  { id: 'cardio/continuous-o2-therapy', cat: 'cardio', type: 'Continuous O₂ therapy', desc: 'Dependent on O₂ concentrator. Very limited mobility. Absolute no-smoking policy aboard.', comp: 'req', vessel: 'Uninterrupted 220 V supply, ventilated equipment locker, strict non-smoking vessel policy', equip: 'Marine O₂ concentrator, backup cylinders, dedicated circuit breaker', coord: 'O₂ autonomy calculated per route leg. Resupply coordinated at each port of call in advance.' },
  { id: 'cardio/asthma-copd',           cat: 'cardio', type: 'Severe asthma / COPD', desc: 'Sensitivity to humidity, salt air, and exertion. Acute respiratory episodes possible.', comp: 'rec', vessel: 'Well-ventilated, mold-free stateroom; gas cooking prohibited in enclosed spaces', equip: 'Portable nebulizer, rescue bronchodilator, pulse oximeter', coord: 'Avoid high-humidity or misty routes. Rapid medical evacuation plan filed and briefed.' },

  { id: 'neuro/epilepsy',          cat: 'neuro', type: 'Epilepsy', desc: 'Unpredictable tonic-clonic seizures. Fall and drowning risk if episode occurs on deck or at water level.', comp: 'req', vessel: 'Full perimeter lifelines and safety netting on all exterior deck areas', equip: 'Anti-epileptic emergency kit (diazepam / midazolam), O₂ mask, posted seizure response protocol', coord: 'Swimming only under immediate crew supervision. Independent diving strictly prohibited.' },
  { id: 'neuro/multiple-sclerosis', cat: 'neuro', type: 'Multiple sclerosis (MS)', desc: 'Extreme fatigue, balance impairment, heat hypersensitivity. Unpredictable relapse episodes.', comp: 'rec', vessel: 'Shaded cockpit zones, stateroom air-conditioning, ergonomic seating throughout', equip: 'Portable fan, positioning cushion, padded deck mat', coord: 'High-heat navigation to be avoided. Mandatory rest periods — schedule to be agreed with guest prior to departure.' },
  { id: 'neuro/parkinsons',        cat: 'neuro', type: "Parkinson's disease", desc: 'Tremor, rigidity, postural instability. Frequent falls. Delayed movement responses.', comp: 'req', vessel: 'Dense grab-rail installation, cushioned non-slip deck surface, elevated cockpit seating', equip: 'Grab rails in stateroom and head, shower seat, rollator on standby', coord: 'Heavy swell strongly contraindicated. Strict medication schedule must be honored — crew to be briefed.' },
  { id: 'neuro/stroke-sequelae',   cat: 'neuro', type: 'Stroke sequelae (hemiplegia)', desc: 'Unilateral paralysis. Potential speech impairment (aphasia).', comp: 'req', vessel: 'Rails positioned on functional side; all seating oriented to favor strong side', equip: 'Ankle-foot orthosis, quad cane, communication tablet for aphasic guests', coord: 'Marine safety wristband mandatory. Fine motor assessment required before embarkation.' },

  { id: 'hidden/insulin-diabetes', cat: 'hidden', type: 'Insulin-dependent diabetes', desc: 'Blood glucose management multiple times daily. Hypo/hyperglycemia risk if meals or medication are delayed.', comp: 'rec', vessel: 'Reliable 12 V refrigerator for insulin, fixed meal times, rapid-sugar access at all stations', equip: 'Glucometer, insulin cold-storage unit (2–8 °C), rapid sugars accessible at all times', coord: 'Hypoglycemia crisis protocol posted aboard. Designated crew member briefed on recognition and response.' },
  { id: 'hidden/renal-failure',    cat: 'hidden', type: 'Renal failure (dialysis)', desc: 'Dialysis three times per week. Strict dietary protocol. High baseline fatigue.', comp: 'req', vessel: 'Onboard dietary kitchen: low-sodium, low-potassium, purified water supply', equip: 'Dialysis passport, confirmed dialysis center contacts at every port of call', coord: 'Coastal itinerary only — confirmed dialysis access at each scheduled stop is non-negotiable.' },
  { id: 'hidden/fibromyalgia',     cat: 'hidden', type: 'Fibromyalgia / chronic pain', desc: 'Continuous diffuse pain aggravated by cold and damp. Significant fatigue.', comp: 'ok', vessel: 'Orthopedic memory-foam bedding, heated stateroom, positioning cushions throughout', equip: 'Lumbar support, 12 V heated throw, prescription pain-relief emergency kit', coord: 'Cold-water itineraries to be avoided. Vessel motion may aggravate symptoms — sea state briefings recommended.' },
  { id: 'hidden/morbid-obesity',   cat: 'hidden', type: 'Morbid obesity (BMI > 40)', desc: 'Reduced mobility, exertional breathlessness, difficulty in narrow passages.', comp: 'rec', vessel: 'Passageways ≥ 90 cm, seating rated > 200 kg, oversized head and shower', equip: 'Reinforced cockpit seating, XL offshore life jacket, passenger hoist as indicated', coord: 'All deck and equipment load ratings must be independently verified. XL-rated PFD mandatory at all times underway.' },

  { id: 'multi/physical-cognitive',     cat: 'multi', type: 'Combined physical & cognitive disability', desc: 'Concurrent motor and intellectual disabilities. No independent function. Continuous professional care.', comp: 'req', vessel: 'Full PMR stateroom, electric passenger hoist, fully adapted bathroom with wet room', equip: 'Electric hoist, anti-decubitus mattress, suction unit, complete professional care kit', coord: 'Short coastal passages only. Full medical assessment and care plan required before charter confirmation.' },
  { id: 'multi/deafblindness',          cat: 'multi', type: 'Deafblindness', desc: 'Total combined sensory loss — deaf and blind simultaneously. Communication via tactile sign language only.', comp: 'req', vessel: 'Continuous tactile guidance system, obstacle-free layout, extra-wide circulation spaces', equip: 'Personal guide rope, whole-vessel vibrating alarm network, tactile display tablet', coord: 'Specialist deafblind companion is non-negotiable. Deafblind community organization to be consulted in planning.' },
  { id: 'multi/tracheotomy-ventilator', cat: 'multi', type: 'Tracheotomy / Ventilator dependency', desc: 'Partial or total mechanical ventilation. Daily tracheotomy care required.', comp: 'req', vessel: 'Generator-backed power supply, dedicated onboard medical station', equip: 'Portable ventilator, suction unit, emergency O₂, backup generator with automatic transfer switch', coord: 'Coastal navigation only. Coast guard and port medical services notified prior to departure.' },
];

// Map id → libellé court (type). Pratique pour l'affichage admin / chips.
export const HANDICAP_LABELS = HANDICAPS.reduce((acc, h) => { acc[h.id] = h.type; return acc; }, {});

// Map catégorie → libellé long (depuis SECTIONS).
export const HANDICAP_CAT_LABELS = HANDICAP_SECTIONS.reduce((acc, s) => { acc[s.id] = s.label; return acc; }, {});

// Handicaps groupés par catégorie (pour un select cascade catégorie → handicap, style région/sous-région).
export const HANDICAPS_BY_CAT = HANDICAP_SECTIONS.map((sec) => ({
  ...sec,
  items: HANDICAPS.filter((h) => h.cat === sec.id),
}));

export function getHandicapById(id) {
  return HANDICAPS.find((h) => h.id === id) || null;
}

// Parse robuste d'une valeur handicaps venant de la BDD (JSONB array, string, ou null).
export function parseHandicaps(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try { const v = JSON.parse(raw); return Array.isArray(v) ? v : []; } catch { return []; }
  }
  return [];
}
