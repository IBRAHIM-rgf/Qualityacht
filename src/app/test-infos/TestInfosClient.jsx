'use client';

// PAGE TEST INFOS — mega-vision de tout ce qu'Ankor renvoie.
// Reprend le design de yacht-detail-v11 + sections supplémentaires (specs étendus, map, bios crew, raw overview).
// Convention : champs absents pour ce yacht → valeurs FILLER en ROUGE marquées [ex.]

import { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import { getAnkorImageUrl } from '@/lib/utils';
import {
  Ruler, Users, BedDouble, Anchor, Calendar, ChevronLeft, ChevronRight, X, Map as MapIcon,
  Gauge, Fuel, Wrench, Building2, Sparkles, Tv, Ship, UserCircle2, ChevronDown, Info,
  Bath, Layers, Compass, Droplet, Award, Globe, Clock, MapPin,
} from 'lucide-react';

const GALLERY_PAGE = 6;

// ─── Helpers ─────────────────────────────────────────────────────────────
function formatMoney(cents, currency) {
  if (cents == null) return null;
  const amount = cents / 100;
  const sym = { EUR: '€', USD: '$', GBP: '£' }[currency] || currency || '€';
  return `${new Intl.NumberFormat('fr-FR').format(amount)} ${sym}`;
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function FillerValue({ children }) {
  return (
    <span className="text-red-400 italic" title="Valeur d'exemple — Ankor ne renvoie pas ce champ pour ce yacht">
      {children}
      <span className="ml-1 text-[10px] uppercase tracking-wider opacity-80">[ex.]</span>
    </span>
  );
}

function Val({ value, filler }) {
  if (value === null || value === undefined || value === '' || value === 0) {
    return <FillerValue>{filler}</FillerValue>;
  }
  return <span className="text-[#C0C0C0]">{value}</span>;
}

function seasonGroup(s) {
  const name = (s?.name || '').toLowerCase();
  const zones = (s?.inclusionZones || []).map((z) => (z?.label || '').toLowerCase()).join(' ');
  if (/christmas|new\s*year|nye|xmas|holiday/.test(name)) return 'winter';
  const yearRound = /summer\s*[/&]\s*winter|year[-\s]?round/.test(name);
  if (!yearRound) {
    if (/(summer|high|été|haute)/.test(name)) return 'summer';
    if (/(winter|low|hiver|basse)/.test(name)) return 'winter';
  }
  if (/(caribbean|bahamas|antille|antill|virgin|grenadin|grenada)/.test(zones)) return 'winter';
  const dates = (s?.effectiveDates || []).filter((d) => d?.from && d?.to);
  if (dates.length) {
    const months = dates.map((d) => {
      const mid = (new Date(d.from).getTime() + new Date(d.to).getTime()) / 2;
      return new Date(mid).getUTCMonth() + 1;
    });
    const avg = months.reduce((a, b) => a + b, 0) / months.length;
    return avg >= 5 && avg <= 9 ? 'summer' : 'winter';
  }
  return 'summer';
}

// Bug Ankor : sur certains yachts, TOUS les membres ont role="Captain".
// On déduit le vrai rôle depuis la bio (priorité du plus spécifique au plus générique).
// Si Ankor renvoie un rôle non-"Captain", on lui fait confiance.
function inferCrewRole(c) {
  const role = (c.role || '').trim();
  if (role && role.toLowerCase() !== 'captain') return role;

  // On regarde les ~30 premiers mots de la bio (le rôle y est souvent annoncé tôt)
  const intro = (c.bio || '').split(/\s+/).slice(0, 60).join(' ').toLowerCase();
  if (!intro) return role || 'Crew Member';

  // Ordre = du plus spécifique au plus générique
  const rules = [
    [/\b(executive\s+chef|head\s+chef|master\s+chef)\b/, 'Executive Chef'],
    [/\bsous[\s-]?chef\b/, 'Sous Chef'],
    [/\b(pastry|patissier)\b/, 'Pastry Chef'],
    [/\bchef\b/, 'Chef'],
    [/\bchief\s+engineer\b/, 'Chief Engineer'],
    [/\b(2nd|second)\s+engineer\b/, '2nd Engineer'],
    [/\b(3rd|third)\s+engineer\b/, '3rd Engineer'],
    [/\bsole\s+engineer\b/, 'Sole Engineer'],
    [/\b(engineer|engineering)\b/, 'Engineer'],
    [/\bchief\s+stew(ardess)?\b/, 'Chief Stewardess'],
    [/\b(2nd|second)\s+stew(ardess)?\b/, '2nd Stewardess'],
    [/\b(3rd|third)\s+stew(ardess)?\b/, '3rd Stewardess'],
    [/\bjunior\s+stew(ardess)?\b/, 'Junior Stewardess'],
    [/\bstew(ardess)?\b/, 'Stewardess'],
    [/\bchief\s+officer\b/, 'Chief Officer'],
    [/\bfirst\s+officer|first\s+mate|1st\s+officer\b/, 'First Officer'],
    [/\b(2nd|second)\s+officer\b/, '2nd Officer'],
    [/\b(3rd|third)\s+officer\b/, '3rd Officer'],
    [/\bbosun|boatswain\b/, 'Bosun'],
    [/\bpurser\b/, 'Purser'],
    [/\bmasseuse|massage\s+therapist|spa\s+therapist|wellness\b/, 'Spa Therapist'],
    [/\bdive\s+(master|instructor)\b/, 'Dive Master'],
    [/\b(yoga|fitness)\s+instructor\b/, 'Wellness Instructor'],
    [/\bdeckhand|deck\s+crew|deck\s+hand\b/, 'Deckhand'],
    [/\bskipper\b/, 'Skipper'],
    [/\bcaptain\b/, 'Captain'],
    [/\bcook\b/, 'Cook'],
    [/\bsteward(?!ess)\b/, 'Steward'],
    [/\bcrew\s+member\b/, 'Crew Member'],
  ];

  for (const [re, label] of rules) {
    if (re.test(intro)) return label;
  }
  return role || 'Crew Member';
}

function iconFor(label) {
  const t = String(label || '').toLowerCase();
  if (/jet[\s-]?ski|seadoo|wave[\s-]?runner/.test(t)) return '🌊';
  if (/seabob|snorkel|dive|diving|scuba/.test(t)) return '🤿';
  if (/foil|paddle|sup\b|wake|surf/.test(t)) return '🏄';
  if (/water[\s-]?ski/.test(t)) return '🎿';
  if (/banana/.test(t)) return '🚣';
  if (/kayak|canoe/.test(t)) return '🛶';
  if (/inflatable|float|towable/.test(t)) return '🛟';
  if (/fish/.test(t)) return '🎣';
  if (/slide/.test(t)) return '🎢';
  if (/tender|rib\b|dinghy|jet[\s-]?boat/.test(t)) return '🚤';
  if (/sail|hobie/.test(t)) return '⛵';
  if (/jacuzzi|hot[\s-]?tub|spa\b/.test(t)) return '🛁';
  if (/stabili[sz]er/.test(t)) return '⚓';
  if (/gym|fitness|treadmill|weight/.test(t)) return '🏋️';
  if (/bar\b/.test(t)) return '🍹';
  if (/bbq|barbec/.test(t)) return '🍖';
  if (/sun[\s-]?deck|sun[\s-]?pad|sun[\s-]?lounger/.test(t)) return '☀️';
  if (/wi[\s-]?fi|wifi/.test(t)) return '📶';
  if (/swim/.test(t)) return '🏊';
  if (/air[\s-]?cond|climat/.test(t)) return '❄️';
  if (/tv|television|cinema|screen/.test(t)) return '📺';
  if (/heli/.test(t)) return '🚁';
  if (/wine|champagne|drink/.test(t)) return '🍷';
  if (/music|sound|speaker/.test(t)) return '🎵';
  if (/beach[\s-]?club/.test(t)) return '🏖️';
  if (/games?\b|playstation|console/.test(t)) return '🎮';
  if (/elevator|lift/.test(t)) return '🛗';
  return '✦';
}

// ─── Sub-components ──────────────────────────────────────────────────────
function Spec({ icon: Icon, img, label, value, filler }) {
  const hasValue = !(value === undefined || value === null || value === '');
  return (
    <div className="flex flex-col items-center text-center px-3 py-4">
      {img ? (
        <Image src={img} alt={label} width={24} height={24} className="mb-2" />
      ) : (
        <Icon className="w-6 h-6 text-[#B03E00] mb-2" />
      )}
      <span className="text-base">{hasValue ? <span className="text-[#acb0cd]">{value}</span> : <FillerValue>{filler}</FillerValue>}</span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/50 mt-1">{label}</span>
    </div>
  );
}

function SpecRow({ icon: Icon, label, value, filler }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[#C0C0C0]/10 last:border-b-0">
      <Icon className="w-5 h-5 text-[#B03E00] shrink-0" />
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 flex-1">{label}</span>
      <span className="text-sm font-medium"><Val value={value} filler={filler} /></span>
    </div>
  );
}

function Badge({ children, filler = false }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs ${
      filler ? 'border-red-500/50 bg-red-900/10 text-red-400 italic' : 'border-[#C0C0C0]/40 bg-[#3a3b3f] text-[#acb0cd]'
    }`}>
      <span aria-hidden className="text-sm leading-none">{iconFor(children)}</span>
      <span>{children}{filler && <span className="ml-1 text-[10px] uppercase tracking-wider opacity-80">[ex.]</span>}</span>
    </span>
  );
}

function Collapsible({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] overflow-hidden">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 text-left hover:bg-[#3a3b3f]/70 transition-colors">
        <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.12em] text-[#C0C0C0]">{title}</h3>
        <ChevronDown className={`w-6 h-6 text-[#B03E00] shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} strokeWidth={2.5} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Carte mini OpenStreetMap (iframe, pas de dép npm). Filtre CSS pour rester dans la palette dark.
function MiniMap({ lat, lng, label }) {
  if (lat === null || lat === undefined || lng === null || lng === undefined) return null;
  const delta = 0.5;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  return (
    <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] overflow-hidden">
      <div className="aspect-[16/9] relative">
        <iframe src={src} title={`Map ${label}`} className="absolute inset-0 w-full h-full"
          style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) saturate(0.8)' }} loading="lazy" />
      </div>
      <div className="px-4 py-2 flex items-center justify-between text-xs border-t border-[#C0C0C0]/20">
        <span className="text-[#acb0cd]">{label}</span>
        <span className="text-[#acb0cd]/50 font-mono">{lat.toFixed(4)}, {lng.toFixed(4)}</span>
      </div>
    </div>
  );
}

// Crew card avec bio expandable
function CrewCard({ c }) {
  const [open, setOpen] = useState(false);
  const avatar = c.avatar ? getAnkorImageUrl(c.avatar, '320w') : null;
  const hasBio = c.bio && c.bio.length > 0;
  return (
    <div className={`rounded-xl border bg-[#26272a] overflow-hidden transition-all ${open ? 'border-[#B03E00] col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5' : 'border-[#C0C0C0]/40'}`}>
      <button type="button" onClick={() => hasBio && setOpen(o => !o)} disabled={!hasBio}
        className={`w-full text-left ${hasBio ? 'cursor-pointer hover:bg-[#2e2f32]' : 'cursor-default'}`}>
        <div className={`grid ${open ? 'sm:grid-cols-[200px_1fr] gap-4' : 'grid-cols-1'}`}>
          <div className={`relative aspect-square bg-[#26272a] ${open ? 'max-w-[200px]' : ''}`}>
            {avatar ? (
              <Image src={avatar} alt={c.name || 'crew'} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <UserCircle2 className="w-12 h-12 text-[#C0C0C0]/30" />
              </div>
            )}
            {hasBio && !open && (
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#B03E00]/80 text-white text-[9px] uppercase tracking-wider">bio</span>
            )}
          </div>
          <div className={`p-3 ${open ? 'text-left' : 'text-center'}`}>
            <p className="text-sm font-bold text-[#C0C0C0]">{c.name || <FillerValue>JOHN DOE</FillerValue>}</p>
            {(() => {
              const inferred = inferCrewRole(c);
              const isInferred = c.role && c.role.toLowerCase() === 'captain' && inferred !== 'Captain';
              return (
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#B03E00] mt-1" title={isInferred ? `Ankor renvoie "${c.role}" pour tout le monde — rôle déduit de la bio` : undefined}>
                  {c.role ? inferred : <FillerValue>Captain</FillerValue>}
                  {isInferred && <span className="ml-1 text-[8px] text-[#B03E00]/60">*</span>}
                </p>
              );
            })()}
            {open && hasBio && (
              <p className="text-xs text-[#acb0cd] leading-relaxed whitespace-pre-line mt-3">{c.bio}</p>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────
export default function TestInfosClient({ yacht }) {
  const [lightbox, setLightbox] = useState(-1);
  const [galleryPage, setGalleryPage] = useState(0);

  if (!yacht) {
    return (
      <div className="min-h-screen bg-[#26272a] flex items-center justify-center text-[#acb0cd] px-4 text-center">
        <div>
          <p>Yacht non trouvé en BDD.</p>
          <p className="text-sm text-[#acb0cd]/60 mt-2">Lance <code className="text-[#B03E00]">POST /api/admin/yachts/import-region?region=caribbean</code> pour seeder.</p>
        </div>
      </div>
    );
  }

  const full = yacht.full || {};
  const bp = full.blueprint || {};
  const pricing = full.pricing || {};
  const description = full.description || yacht.description;

  const imgs = (yacht.images || []).filter(Boolean).map((i) => getAnkorImageUrl(i, '1280w'));
  const hero = imgs[0] || '/images/yachts/yatch2.jpeg';
  const gallery = imgs.slice(1);
  const price = yacht.pricePerHour || yacht.price;
  const year = yacht.year && yacht.refit ? `${yacht.year} / ${yacht.refit}` : (yacht.year || yacht.refit);
  const yachtType = Array.isArray(full.yachtType) ? full.yachtType.join(', ') : full.yachtType;
  const lastModified = full.lastModified ? new Date(full.lastModified).toLocaleDateString('fr-FR') : null;

  const closeLb = () => setLightbox(-1);
  const prevLb = () => setLightbox((i) => (i - 1 + imgs.length) % imgs.length);
  const nextLb = () => setLightbox((i) => (i + 1) % imgs.length);

  const cabinLayout = Array.isArray(bp.cabinLayout) ? bp.cabinLayout : [];
  const amenities = Array.isArray(bp.amenities) ? bp.amenities : [];
  const toys = Array.isArray(bp.toys) ? bp.toys : [];
  const entertainment = Array.isArray(bp.entertainment) ? bp.entertainment : [];
  const tenders = Array.isArray(bp.tenders) ? bp.tenders : [];
  const crew = Array.isArray(full.crew) ? full.crew : [];
  const seasons = Array.isArray(pricing.pricingInfo) ? pricing.pricingInfo : [];

  const lat = bp.basePort?.coordinates?.latitude;
  const lng = bp.basePort?.coordinates?.longitude;

  const heroUnit = (() => {
    const units = new Set(seasons.map((s) => s?.pricing?.unit).filter(Boolean));
    if (units.has('WEEK')) return 'week';
    if (units.has('DAY') || units.has('HOUR')) return 'day';
    return 'week';
  })();

  const specsTech = [
    { icon: Ruler, label: 'Length overall', value: bp.length ? `${bp.length} m` : null, filler: '60 m' },
    { icon: Ruler, label: 'Beam', value: bp.beam ? `${bp.beam} m` : null, filler: '10 m' },
    { icon: Ruler, label: 'Draft', value: bp.draft ? `${bp.draft} m` : null, filler: '3.2 m' },
    { icon: Gauge, label: 'Top speed', value: bp.topSpeed ? `${bp.topSpeed} kn` : null, filler: '18 kn' },
    { icon: Gauge, label: 'Cruise speed', value: bp.cruiseSpeed ? `${bp.cruiseSpeed} kn` : null, filler: '14 kn' },
    { icon: Wrench, label: 'Engines', value: bp.engines, filler: '2× MTU 4000 hp' },
    { icon: Building2, label: 'Hull construction', value: bp.hullConstruction, filler: 'Steel' },
    { icon: Ship, label: 'Hull type', value: bp.hullType, filler: 'Monohull' },
    { icon: Layers, label: 'Decks', value: bp.decks, filler: '4' },
    { icon: Bath, label: 'Bathrooms', value: bp.bathrooms, filler: '7' },
    { icon: Compass, label: 'Cruising capacity', value: bp.cruisingCapacity || null, filler: '12' },
    { icon: Users, label: 'Static capacity', value: bp.staticCapacity || null, filler: '20' },
    { icon: Fuel, label: 'Fuel capacity', value: bp.fuelCapacity || null, filler: '120 000 L' },
    { icon: Droplet, label: 'Tonnage', value: bp.tonnage || null, filler: '1200 GT' },
    { icon: Ship, label: 'Model', value: bp.model, filler: 'Custom' },
    { icon: Award, label: 'Architect', value: bp.architect, filler: 'Espen Øino' },
    { icon: Award, label: 'Interior designer', value: bp.interiorDesigner, filler: 'Terence Disdale' },
    { icon: Globe, label: 'Yacht type', value: yachtType, filler: 'Motor' },
    { icon: Building2, label: 'Superstructure', value: Array.isArray(bp.superStructure) ? bp.superStructure.join(', ') : bp.superStructure, filler: 'Aluminium' },
  ];

  // ─── Regions and Rates (logique v11) ────────────────────────────────────
  const expandName = (n) => (n || '')
    .replace(/\bMed\b/gi, 'Mediterranean')
    .replace(/\bCarib\b/gi, 'Caribbean')
    .replace(/\bBaha\b/gi, 'Bahamas');
  const extractGuests = (name) => {
    const expanded = expandName(name);
    const m = expanded.match(/^(.*?)\s*[-:(\s]+\(?\s*(\d+(?:\s*(?:to|-|–|—)\s*\d+)?)\s*(?:Pax|Guests?)\s*\)?\s*$/i);
    if (!m) return { base: expanded, guests: null };
    const base = m[1].replace(/[\s\-:(]+$/, '').trim();
    return { base: base || expanded, guests: m[2].replace(/\s+/g, ' ') };
  };
  const bucketTiers = (arr) => {
    const groups = new Map();
    const orphans = [];
    for (const s of arr) {
      const { base, guests } = extractGuests(s.name);
      if (!guests) { orphans.push(s); continue; }
      const u = s.pricing?.unit;
      const c = s.pricing?.currency;
      const zk = (s.inclusionZones || []).map((z) => z?.label).sort().join('|');
      const key = `${base}||${u}||${zk}`;
      if (!groups.has(key)) groups.set(key, { base, unit: u, sample: s, tiers: [], currencies: {} });
      const g = groups.get(key);
      g.tiers.push({ guests, total: s.pricing?.total, currency: c, season: s });
      g.currencies[c] = (g.currencies[c] || 0) + 1;
    }
    const tierItems = [];
    for (const g of groups.values()) {
      if (g.tiers.length >= 2) {
        g.tiers.sort((a, b) => parseInt(a.guests, 10) - parseInt(b.guests, 10));
        const dominantCurrency = Object.entries(g.currencies).sort((a, b) => b[1] - a[1])[0]?.[0];
        tierItems.push({ _tier: true, name: g.base, pricing: { unit: g.unit, currency: dominantCurrency }, inclusionZones: g.sample.inclusionZones, petsAllowed: g.sample.petsAllowed, effectiveDates: g.sample.effectiveDates, tiers: g.tiers });
      } else {
        orphans.push(g.tiers[0].season);
      }
    }
    return [...tierItems, ...orphans];
  };
  const byUnit = { WEEK: [], DAY: [], HOUR: [] };
  seasons.forEach((s) => { const u = s?.pricing?.unit; if (byUnit[u]) byUnit[u].push(s); });
  Object.keys(byUnit).forEach((u) => { byUnit[u] = bucketTiers(byUnit[u]); });
  const unitLabel = { WEEK: '/ week', DAY: '/ day', HOUR: '/ hour' };
  const weekly = byUnit.WEEK;
  const weeklyGrouped = { summer: [], winter: [] };
  weekly.forEach((s) => weeklyGrouped[seasonGroup(s)].push(s));

  const renderSeasonCard = (s, i) => {
    const p = s.pricing || {};
    const zones = (s.inclusionZones || [])
      .filter((z) => z?.label)
      .filter((z, idx, arr) => arr.findIndex((zz) => zz.label === z.label) === idx)
      .sort((a, b) => a.label.localeCompare(b.label));
    const parts = expandName(s.name).split(/\s*[:\-–—]\s+/);
    const titleMain = parts[0] || s.name;
    const titleInfo = parts.slice(1).join(' — ');
    const ZonesBlock = zones.length > 0 && (
      <div className="w-full">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#B03E00] mb-2">Zones</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {zones.map((z, zi) => (
            <span key={zi} className="inline-block px-3 py-1.5 rounded-full border border-[#C0C0C0]/40 bg-[#26272a] text-[#acb0cd] text-xs">{z.label}</span>
          ))}
        </div>
      </div>
    );
    if (s._tier) {
      return (
        <div key={i} className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 flex flex-col items-center gap-4 relative text-center">
          {s.petsAllowed && <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] text-[#B03E00] border border-[#B03E00]/40 rounded-full px-2 py-1">Pets OK</span>}
          <div>
            <h3 className="trajan-regular text-base md:text-lg uppercase tracking-[0.12em] text-[#C0C0C0]">{titleMain}</h3>
            {titleInfo && <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#acb0cd]/70 mt-1">{titleInfo}</p>}
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#B03E00] mt-2">Rates by guests</p>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 items-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/50">Guests</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/50 text-right">Price {unitLabel[p.unit] || ''}</span>
              {s.tiers.map((t, ti) => (
                <Fragment key={ti}>
                  <span className="text-[#C0C0C0] font-bold">{t.guests}</span>
                  <span className="text-[#C0C0C0] text-right">{formatMoney(t.total, t.currency || p.currency)}</span>
                </Fragment>
              ))}
            </div>
          </div>
          {ZonesBlock}
        </div>
      );
    }
    const total = formatMoney(p.total, p.currency);
    return (
      <div key={i} className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 flex flex-col items-center gap-4 relative text-center">
        {s.petsAllowed && <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] text-[#B03E00] border border-[#B03E00]/40 rounded-full px-2 py-1">Pets OK</span>}
        <div>
          <h3 className="trajan-regular text-base md:text-lg uppercase tracking-[0.12em] text-[#C0C0C0]">{titleMain}</h3>
          {titleInfo && <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#acb0cd]/70 mt-1">{titleInfo}</p>}
        </div>
        {total && <p className="trajan-regular text-2xl md:text-3xl text-[#C0C0C0]">{total}<span className="text-sm text-[#acb0cd]/50"> {unitLabel[p.unit] || ''}</span></p>}
        {ZonesBlock}
      </div>
    );
  };

  return (
    <div className="bg-[#26272a] text-[#acb0cd]">

      {/* ══ Bandeau page test ══ */}
      <div className="bg-red-900/30 border-b border-red-700/40 pt-20">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-3 flex items-center justify-between flex-wrap gap-3 text-xs">
          <p className="text-red-300">
            <span className="font-bold uppercase tracking-wider">Test infos</span> — affiche tout ce qu'Ankor peut renvoyer. Les valeurs <span className="italic text-red-400">en rouge [ex.]</span> sont des exemples (Ankor ne fournit pas ce champ pour ce yacht).
          </p>
          {lastModified && (
            <p className="text-red-300/70 flex items-center gap-1.5"><Clock className="w-3 h-3" /> Ankor updated: {lastModified}</p>
          )}
        </div>
      </div>

      {/* ══ HERO ══ */}
      <div className="pt-6 pb-6 px-4 md:px-10">
        <div className="max-w-6xl mx-auto relative aspect-[16/10] md:aspect-[21/9] rounded-xl overflow-hidden border border-[#C0C0C0] bg-[#3a3b3f]">
          <Image src={hero} alt={yacht.name} fill priority className="object-cover object-center" />
        </div>
      </div>

      {/* ══ NOM + FROM + type ══ */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-6 pb-2 text-left">
        <h1 className="trajan-regular text-3xl md:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0]">{yacht.name}</h1>
        <div className="flex items-baseline gap-3 mt-2 flex-wrap">
          {price && (
            <p className="trajan-regular text-2xl md:text-3xl text-[#acb0cd]">
              From {price}<span className="text-sm text-[#acb0cd]/50"> / {heroUnit}</span>
            </p>
          )}
          {yachtType && (
            <span className="px-2 py-0.5 rounded-full border border-[#C0C0C0]/40 text-xs text-[#acb0cd] uppercase tracking-wider">{yachtType}</span>
          )}
        </div>
        <p className="text-sm text-[#acb0cd]/70 mt-2 tracking-wider">
          <Val value={bp.make} filler="Lürssen" /> <span className="text-[#B03E00]">·</span> <Val value={bp.model} filler="Custom Model" />
        </p>
      </div>

      {/* ══ ENTÊTE : enquire + 6 specs résumées ══ */}
      <div className="border-b border-[#C0C0C0]/20">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex-1">
            <a href="/request-quote-test-v10" className="inline-block rounded-xl border-2 border-[#C0C0C0] px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]">
              Enquire about {yacht.name}
            </a>
          </div>
          <div className="lg:flex-[1.4] grid grid-cols-3 sm:grid-cols-6 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] divide-x divide-y sm:divide-y-0 divide-[#C0C0C0]/20">
            <Spec icon={Anchor} label="Builder" value={yacht.make || bp.make} filler="Lürssen" />
            <Spec icon={Ruler} label="Length" value={yacht.length} filler="60m" />
            <Spec icon={Calendar} label="Year" value={year} filler="2020/2024" />
            <Spec icon={Users} label="Guests" value={yacht.guests || yacht.capacity} filler="12" />
            <Spec icon={BedDouble} label="Cabins" value={yacht.cabins} filler="6" />
            <Spec img="/casquette-capitaine.svg" label="Crew" value={yacht.crew || bp.maxCrew} filler="16" />
          </div>
        </div>
      </div>

      {/* ══ BASE PORT + MAP ══ */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-10">
        <div className="text-center mb-8">
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Base Port</h2>
          <div className="relative w-32 h-6 mx-auto mt-3"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          <p className="text-xs text-[#acb0cd]/60 mt-3 italic">basePort.name / .country / .coordinates → embedded OpenStreetMap</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <MapIcon className="w-6 h-6 text-[#B03E00]" />
              <h3 className="trajan-regular text-lg uppercase tracking-wider text-[#C0C0C0]">Home port</h3>
            </div>
            <p className="text-2xl text-[#C0C0C0] font-bold"><Val value={bp.basePort?.name} filler="Monaco" /></p>
            <p className="text-sm text-[#acb0cd]"><Val value={bp.basePort?.country} filler="Principality of Monaco" /></p>
            {(lat !== undefined && lng !== undefined) ? (
              <p className="text-xs text-[#acb0cd]/50 mt-2 font-mono">
                <MapPin className="inline w-3 h-3 mr-1" />{lat.toFixed(4)}°, {lng.toFixed(4)}°
              </p>
            ) : (
              <p className="text-xs text-red-400 mt-2 font-mono italic">[ex.] 43.7384°, 7.4246°</p>
            )}
          </div>
          {(lat !== undefined && lng !== undefined) ? (
            <MiniMap lat={lat} lng={lng} label={bp.basePort?.name} />
          ) : (
            <MiniMap lat={43.7384} lng={7.4246} label="Monaco [ex.]" />
          )}
        </div>
      </div>

      {/* ══ 4 ZONES COLLAPSIBLES (comme v11) ══ */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-12 md:py-16 space-y-4">

        {/* Description */}
        <Collapsible title="Description" defaultOpen>
          {description ? (
            <p className="text-lg md:text-xl leading-relaxed text-[#acb0cd] whitespace-pre-line">
              {description.split(/(?<=\.)\s+/).filter(Boolean).map((sentence, i, arr) => (
                <span key={i}>{sentence}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
          ) : (
            <p className="text-base text-red-400 italic">[ex.] Yacht overview text — Ankor's description field. Multi-paragraph, often 500-2000 chars.</p>
          )}
        </Collapsible>

        {/* Specifications étendues */}
        <Collapsible title="Specifications (extended — 19 fields)" defaultOpen>
          <div className="grid md:grid-cols-2 md:gap-x-12">
            {specsTech.map((s, i) => <SpecRow key={i} icon={s.icon} label={s.label} value={s.value} filler={s.filler} />)}
          </div>
        </Collapsible>

        {/* Amenities & Entertainment avec quantity */}
        <Collapsible title="Amenities & Entertainment">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#B03E00] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Amenities ({amenities.length || 'filler'})
              </p>
              <div className="flex flex-wrap gap-2">
                {amenities.length > 0 ? amenities.map((a, i) => (
                  <Badge key={i}>{a.label}{a.quantity ? ` ×${a.quantity}` : ''}</Badge>
                )) : ['Jacuzzi', 'Beach Club', 'Gym', 'Cinema', 'Stabilizers'].map((l, i) => <Badge key={i} filler>{l}</Badge>)}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#B03E00] mb-3 flex items-center gap-2">
                <Tv className="w-4 h-4" /> Entertainment ({entertainment.length || 'filler'})
              </p>
              <div className="flex flex-wrap gap-2">
                {entertainment.length > 0 ? entertainment.map((e, i) => <Badge key={i}>{e}</Badge>)
                  : ['Wi-Fi', 'Satellite TV', 'Apple TV', 'Bose Sound System'].map((l, i) => <Badge key={i} filler>{l}</Badge>)}
              </div>
            </div>
          </div>
        </Collapsible>

        {/* Water Toys */}
        <Collapsible title={`Water Toys (${toys.length || 'filler'})`}>
          <ul className="grid sm:grid-cols-2 gap-x-8">
            {toys.length > 0 ? toys.map((t, i) => (
              <li key={i} className="flex items-start gap-3 py-1.5 border-b border-[#C0C0C0]/10">
                <span aria-hidden className="text-base leading-none mt-0.5">{iconFor(t.label)}</span>
                <span className="text-[#acb0cd] text-sm flex-1">{t.label}</span>
                {t.quantity && <span className="text-[#C0C0C0] text-xs font-bold border border-[#C0C0C0]/40 rounded-full px-2 py-0.5">×{t.quantity}</span>}
              </li>
            )) : ['Jetski', 'Sea-Bob', 'Paddleboard', 'Snorkel set', 'Wakeboard', 'Kayak'].map((l, i) => (
              <li key={i} className="flex items-start gap-3 py-1.5 border-b border-red-500/20 italic">
                <span aria-hidden className="text-base leading-none mt-0.5">{iconFor(l)}</span>
                <span className="text-red-400 text-sm flex-1">{l} [ex.]</span>
                <span className="text-red-400 text-xs font-bold border border-red-500/40 rounded-full px-2 py-0.5">×{[1,2,4,8,1,2][i]}</span>
              </li>
            ))}
          </ul>
        </Collapsible>
      </div>

      {/* ══ CABIN LAYOUT (cards empilées par prestige, comme v11) ══ */}
      {(() => {
        const prestige = (label) => {
          const l = (label || '').toLowerCase();
          if (l.includes('master') || l.includes('primary') || l.includes('owner')) return 0;
          if (l.includes('vip')) return 1;
          if (l.includes('double')) return 2;
          if (l.includes('queen') || l.includes('king')) return 3;
          if (l.includes('twin')) return 4;
          if (l.includes('single') || l.includes('pullman')) return 5;
          return 6;
        };
        const sorted = cabinLayout.length > 0
          ? [...cabinLayout].sort((a, b) => prestige(a.label) - prestige(b.label))
          : null;
        return (
          <div className="max-w-5xl mx-auto px-5 md:px-10 pb-8">
            <div className="text-center mb-8">
              <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Cabin Layout</h2>
              <div className="relative w-32 h-6 mx-auto mt-3"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
              <p className="text-xs text-[#acb0cd]/60 mt-3 italic">blueprint.cabinLayout[] — empilées par prestige (Master → Single)</p>
            </div>
            <div className="flex flex-col items-start gap-3">
              {sorted ? sorted.map((c, i) => (
                <div key={i} className="inline-flex items-center gap-3 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] px-4 py-2">
                  <BedDouble className="w-5 h-5 text-[#B03E00] shrink-0" strokeWidth={2} />
                  <p className="text-base md:text-lg leading-none">
                    <span className="text-[#acb0cd]">{c.label}&nbsp;:</span>{' '}
                    <span className="text-[#C0C0C0] font-bold">{c.value}</span>
                  </p>
                </div>
              )) : [
                { label: 'Master Cabin', value: '1' },
                { label: 'VIP Cabin', value: '1' },
                { label: 'Double Cabins', value: '4' },
                { label: 'Twin Cabins', value: '2' },
              ].map((c, i) => (
                <div key={i} className="inline-flex items-center gap-3 rounded-xl border border-red-500/50 bg-red-900/10 px-4 py-2 italic">
                  <BedDouble className="w-5 h-5 text-red-400 shrink-0" strokeWidth={2} />
                  <p className="text-base md:text-lg leading-none">
                    <span className="text-red-400/80">{c.label}&nbsp;:</span>{' '}
                    <span className="text-red-400 font-bold">{c.value}</span>
                    <span className="ml-2 text-[10px] uppercase tracking-wider text-red-400/80">[ex.]</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ══ TENDERS ══ */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 pb-8">
        <div className="text-center mb-8">
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Tenders</h2>
          <div className="relative w-32 h-6 mx-auto mt-3"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          <p className="text-xs text-[#acb0cd]/60 mt-3 italic">blueprint.tenders[] — string descriptifs</p>
        </div>
        <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 md:p-8">
          <Ship className="w-6 h-6 text-[#B03E00] mb-4 mx-auto" />
          <ul className="space-y-2">
            {tenders.length > 0 ? tenders.map((t, i) => (
              <li key={i} className="flex items-start gap-3 py-2 border-b border-[#C0C0C0]/10 last:border-b-0">
                <span className="text-[#B03E00] mt-0.5">›</span>
                <span className="text-[#acb0cd] text-sm">{typeof t === 'string' ? t : t.label || JSON.stringify(t)}</span>
              </li>
            )) : [
              'Tender 1 — 8m custom limousine tender with 300hp',
              'Tender 2 — 5m rescue tender',
              'Tender 3 — 3.5m towed tender',
            ].map((l, i) => (
              <li key={i} className="flex items-start gap-3 py-2 border-b border-red-500/20 last:border-b-0 italic">
                <span className="text-red-400 mt-0.5">›</span>
                <span className="text-red-400 text-sm">{l} [ex.]</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ══ REGIONS AND RATES (logique v11) ══ */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 pb-12 md:pb-16">
        <div className="text-center mb-8">
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Regions and Rates</h2>
          <div className="relative w-32 h-6 mx-auto mt-3"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          <p className="text-xs text-[#acb0cd]/60 mt-3 italic">pricing.pricingInfo[] groupé Summer/Winter (Weekly) ou unité (Daily/Hourly)</p>
        </div>
        {seasons.length > 0 ? (
          <div className="space-y-12">
            {weekly.length > 0 && (() => {
              const showSubHeaders = weeklyGrouped.summer.length > 0 && weeklyGrouped.winter.length > 0;
              return (
                <div className="space-y-8">
                  <p className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.2em] text-[#C0C0C0] text-center">Weekly Charter</p>
                  {showSubHeaders ? (
                    <>
                      <div>
                        <p className="trajan-regular text-base uppercase tracking-[0.2em] text-[#B03E00] mb-4 text-center">Summer</p>
                        <div className="grid md:grid-cols-2 gap-5">{weeklyGrouped.summer.map(renderSeasonCard)}</div>
                      </div>
                      <div>
                        <p className="trajan-regular text-base uppercase tracking-[0.2em] text-[#B03E00] mb-4 text-center">Winter</p>
                        <div className="grid md:grid-cols-2 gap-5">{weeklyGrouped.winter.map(renderSeasonCard)}</div>
                      </div>
                    </>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-5">{weekly.map(renderSeasonCard)}</div>
                  )}
                </div>
              );
            })()}
            {(byUnit.DAY.length > 0 || byUnit.HOUR.length > 0) && (
              <div>
                <p className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.2em] text-[#C0C0C0] text-center mb-6">Day Charter</p>
                <div className="grid md:grid-cols-2 gap-5">{[...byUnit.DAY, ...byUnit.HOUR].map(renderSeasonCard)}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {['Mediterranean — Summer High', 'Caribbean — Winter Low'].map((n, i) => (
              <div key={i} className="rounded-xl border border-red-500/50 bg-red-900/10 p-6 italic text-center">
                <h3 className="trajan-regular text-lg uppercase text-red-400 mb-2">{n} [ex.]</h3>
                <p className="trajan-regular text-2xl text-red-400">{i === 0 ? '950 000 €' : '780 000 €'}<span className="text-sm opacity-70"> / week</span></p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══ GALERIE ══ */}
      {gallery.length > 0 && (() => {
        const totalPages = Math.ceil(gallery.length / GALLERY_PAGE);
        const safe = Math.min(galleryPage, totalPages - 1);
        const start = safe * GALLERY_PAGE;
        const slice = gallery.slice(start, start + GALLERY_PAGE);
        const prevG = () => setGalleryPage((p) => (p - 1 + totalPages) % totalPages);
        const nextG = () => setGalleryPage((p) => (p + 1) % totalPages);
        return (
          <div className="max-w-6xl mx-auto px-5 md:px-10 py-14 md:py-20">
            <div className="text-center mb-10">
              <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Gallery</h2>
              <div className="relative w-32 h-6 mx-auto mt-4"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
              <p className="text-base md:text-lg font-bold tracking-[0.15em] text-[#acb0cd] mt-3">{start + 1}–{Math.min(start + GALLERY_PAGE, gallery.length)} / {gallery.length}</p>
              <p className="text-xs text-[#acb0cd]/60 mt-2 italic">blueprint.images[] — {imgs.length} URLs (hero + galerie)</p>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {slice.map((src, i) => {
                  const gi = start + i;
                  return (
                    <button key={gi} onClick={() => setLightbox(gi + 1)} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#C0C0C0] group">
                      <Image src={src} alt={`${yacht.name} ${gi + 2}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </button>
                  );
                })}
              </div>
              {totalPages > 1 && (
                <>
                  <button onClick={prevG} aria-label="Previous" className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-5 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center hover:bg-[#B03E00]/10">
                    <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                  <button onClick={nextG} aria-label="Next" className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-5 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center hover:bg-[#B03E00]/10">
                    <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                </>
              )}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-6">
                {Array.from({ length: totalPages }, (_, p) => (
                  <button key={p} onClick={() => setGalleryPage(p)} aria-label={`Page ${p + 1}`} className={`w-2 h-2 rotate-45 transition-colors ${p === safe ? 'bg-[#B03E00]' : 'bg-[#C0C0C0]/40 hover:bg-[#C0C0C0]'}`} />
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* ══ CREW avec bio expandable (clic sur la card) ══ */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 pb-12 md:pb-16">
        <div className="text-center mb-8">
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">The Crew — {crew.length || 'filler'} members</h2>
          <div className="relative w-32 h-6 mx-auto mt-3"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          <p className="text-xs text-[#acb0cd]/60 mt-3 italic">crew[] — {'{ name, role, avatar, bio }'} · clic sur badge BIO pour voir la biographie · rôle suivi d'un <span className="text-[#B03E00]">*</span> = déduit de la bio (Ankor renvoie "Captain" pour tous sur certains yachts)</p>
        </div>
        {crew.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {crew.map((c, i) => <CrewCard key={i} c={c} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['Captain', 'First Mate', 'Chef', 'Chief Stewardess', 'Engineer'].map((r, i) => (
              <CrewCard key={i} c={{ name: null, role: null, bio: `[ex.] Brief biography of crew member.` }} />
            ))}
          </div>
        )}
      </div>

      {/* ══ Raw entity debug ══ */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 pb-12">
        <div className="text-center mb-6">
          <h2 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.12em] text-[#C0C0C0]/70">Raw entity overview</h2>
          <p className="text-xs text-[#acb0cd]/60 mt-2 italic">Réponse brute de GET /website/entity/{'{uri}'} pour ce yacht</p>
        </div>
        <div className="rounded-xl border border-[#C0C0C0]/40 bg-[#26272a] p-5 font-mono text-xs space-y-1">
          <p><span className="text-[#B03E00]">uri</span>: <span className="text-[#acb0cd]">{full.uri || '—'}</span></p>
          <p><span className="text-[#B03E00]">yachtType</span>: <span className="text-[#acb0cd]">{JSON.stringify(full.yachtType) || '—'}</span></p>
          <p><span className="text-[#B03E00]">description</span>: <span className="text-[#acb0cd]">{description?.length || 0} chars</span></p>
          <p><span className="text-[#B03E00]">blueprint.images</span>: <span className="text-[#acb0cd]">{(bp.images || []).length} URLs</span></p>
          <p><span className="text-[#B03E00]">blueprint.amenities</span>: <span className="text-[#acb0cd]">{amenities.length} items ({amenities.filter(a => a.quantity).length} avec quantity)</span></p>
          <p><span className="text-[#B03E00]">blueprint.toys</span>: <span className="text-[#acb0cd]">{toys.length} items ({toys.filter(t => t.quantity).length} avec quantity)</span></p>
          <p><span className="text-[#B03E00]">blueprint.entertainment</span>: <span className="text-[#acb0cd]">{entertainment.length} items</span></p>
          <p><span className="text-[#B03E00]">blueprint.tenders</span>: <span className="text-[#acb0cd]">{tenders.length} items</span></p>
          <p><span className="text-[#B03E00]">blueprint.cabinLayout</span>: <span className="text-[#acb0cd]">{cabinLayout.length} types</span></p>
          <p><span className="text-[#B03E00]">blueprint.basePort.coordinates</span>: <span className="text-[#acb0cd]">{lat ? `${lat.toFixed(4)}, ${lng.toFixed(4)}` : '—'}</span></p>
          <p><span className="text-[#B03E00]">crew</span>: <span className="text-[#acb0cd]">{crew.length} members ({crew.filter(c => c.bio).length} avec bio, {crew.filter(c => c.avatar).length} avec avatar)</span></p>
          <p><span className="text-[#B03E00]">pricing.weekPricingFrom→To</span>: <span className="text-[#acb0cd]">{formatMoney(pricing.weekPricingFrom?.price, pricing.weekPricingFrom?.currency) || '—'} → {formatMoney(pricing.weekPricingTo?.price, pricing.weekPricingTo?.currency) || '—'}</span></p>
          <p><span className="text-[#B03E00]">pricing.pricingInfo</span>: <span className="text-[#acb0cd]">{seasons.length} seasons</span></p>
          <p><span className="text-[#B03E00]">lastModified</span>: <span className="text-[#acb0cd]">{lastModified || 'n/a'}</span></p>
        </div>
      </div>

      {/* ══ LIGHTBOX ══ */}
      {lightbox >= 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLb}>
          <button onClick={closeLb} aria-label="Close" className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center">
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevLb(); }} aria-label="Previous" className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <div className="relative w-[88vw] md:w-[85vw] h-[75vh] md:h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={imgs[lightbox]} alt="" fill className="object-contain" />
          </div>
          <button onClick={(e) => { e.stopPropagation(); nextLb(); }} aria-label="Next" className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center">
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}
