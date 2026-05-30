'use client';

// PAGE TEST INFOS — DASHBOARD INVENTAIRE COMPLET de tout ce qu'Ankor renvoie.
// Pas un layout "fiche yacht marketing" — un tableau de bord exhaustif pour broker/admin.
// Champs absents → valeurs FILLER en ROUGE marquées [ex.]

import { useState, Fragment } from 'react';
import Image from 'next/image';
import { getAnkorImageUrl } from '@/lib/utils';
import {
  Ruler, Users, BedDouble, Anchor, Calendar, ChevronLeft, ChevronRight, X, Map as MapIcon,
  Gauge, Fuel, Wrench, Building2, Sparkles, Tv, Ship, UserCircle2, ChevronDown,
  Bath, Layers, Compass, Droplet, Award, Globe, Clock, MapPin, AlertCircle, Database,
  Receipt, FileText, Percent, TrendingUp,
} from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────────
const SYM = { EUR: '€', USD: '$', GBP: '£' };

function formatMoney(cents, currency) {
  if (cents == null) return null;
  return `${new Intl.NumberFormat('fr-FR').format(cents / 100)} ${SYM[currency] || currency || ''}`;
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function FillerValue({ children }) {
  return (
    <span className="text-red-400 italic" title="Ankor ne fournit pas ce champ pour ce yacht">
      {children}
      <span className="ml-1 text-[10px] uppercase tracking-wider opacity-70">[ex.]</span>
    </span>
  );
}

function Val({ value, filler }) {
  if (value === null || value === undefined || value === '' || value === 0) {
    return <FillerValue>{filler}</FillerValue>;
  }
  return <span className="text-[#C0C0C0]">{value}</span>;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Bug Ankor : on déduit le rôle depuis la bio quand role="Captain" pour tous.
function inferCrewRole(c) {
  const role = (c.role || '').trim();
  if (role && role.toLowerCase() !== 'captain') return { role, inferred: false };
  const intro = (c.bio || '').split(/\s+/).slice(0, 60).join(' ').toLowerCase();
  if (!intro) return { role: role || 'Crew Member', inferred: false };
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
  ];
  for (const [re, label] of rules) if (re.test(intro)) return { role: label, inferred: role.toLowerCase() === 'captain' && label !== 'Captain' };
  return { role: role || 'Crew Member', inferred: false };
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

// ─── UI primitives ───────────────────────────────────────────────────────
function StatCard({ label, value, sublabel, icon: Icon, accent = false }) {
  return (
    <div className={`rounded-xl border p-4 ${accent ? 'border-[#B03E00] bg-[#B03E00]/10' : 'border-[#C0C0C0]/30 bg-[#3a3b3f]'}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60">{label}</p>
          <p className="trajan-regular text-2xl text-[#C0C0C0] mt-1">{value}</p>
          {sublabel && <p className="text-xs text-[#acb0cd]/50 mt-1">{sublabel}</p>}
        </div>
        {Icon && <Icon className="w-5 h-5 text-[#B03E00] shrink-0 mt-1" />}
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle, count }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5 pb-3 border-b border-[#C0C0C0]/15">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-[#B03E00]" />}
        <div>
          <h2 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.15em] text-[#C0C0C0]">{title}</h2>
          {subtitle && <p className="text-xs text-[#acb0cd]/60 italic mt-1">{subtitle}</p>}
        </div>
      </div>
      {count !== undefined && (
        <span className="text-xs text-[#acb0cd]/50 font-mono">{count}</span>
      )}
    </div>
  );
}

function Collapsible({ title, defaultOpen = false, children, badge }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] overflow-hidden">
      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-[#3a3b3f]/70">
        <span className="text-sm uppercase tracking-[0.15em] text-[#C0C0C0] flex items-center gap-2">
          {title}
          {badge && <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#B03E00]/20 text-[#B03E00] border border-[#B03E00]/40">{badge}</span>}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#B03E00] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-4 border-t border-[#C0C0C0]/15 pt-3">{children}</div>}
    </div>
  );
}

function MiniMap({ lat, lng, label }) {
  if (lat == null || lng == null) return null;
  const delta = 0.5;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  return (
    <div className="rounded-lg border border-[#C0C0C0]/30 bg-[#3a3b3f] overflow-hidden">
      <div className="aspect-[16/9] relative">
        <iframe src={src} title={`Map ${label}`} className="absolute inset-0 w-full h-full"
          style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) saturate(0.8)' }} loading="lazy" />
      </div>
      <div className="px-3 py-1.5 flex items-center justify-between text-xs border-t border-[#C0C0C0]/20">
        <span className="text-[#acb0cd]">{label}</span>
        <span className="text-[#acb0cd]/50 font-mono text-[10px]">{lat.toFixed(4)}, {lng.toFixed(4)}</span>
      </div>
    </div>
  );
}

// ─── Season detail (line items breakdown) ────────────────────────────────
function SeasonDetail({ season, idx }) {
  const p = season.pricing || {};
  const total = formatMoney(p.total, p.currency);
  const charterFee = formatMoney(p.charterFee, p.currency);
  const subTotal = formatMoney(p.subTotal, p.currency);
  const totalTax = formatMoney(p.totalTax, p.currency);
  const lineItems = p.lineItems || [];
  const dates = season.effectiveDates || [];
  const zones = season.inclusionZones || [];
  const exclusions = season.exclusionZones || [];

  return (
    <div className="space-y-4 text-sm">
      {/* Header chiffres clés */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="rounded border border-[#C0C0C0]/20 bg-[#26272a] p-2">
          <p className="text-[9px] uppercase tracking-wider text-[#acb0cd]/50">Total</p>
          <p className="text-[#B03E00] font-bold">{total || '—'}</p>
        </div>
        <div className="rounded border border-[#C0C0C0]/20 bg-[#26272a] p-2">
          <p className="text-[9px] uppercase tracking-wider text-[#acb0cd]/50">Charter Fee</p>
          <p className="text-[#C0C0C0]">{charterFee || '—'}</p>
        </div>
        <div className="rounded border border-[#C0C0C0]/20 bg-[#26272a] p-2">
          <p className="text-[9px] uppercase tracking-wider text-[#acb0cd]/50">Subtotal</p>
          <p className="text-[#C0C0C0]">{subTotal || '—'}</p>
        </div>
        <div className="rounded border border-[#C0C0C0]/20 bg-[#26272a] p-2">
          <p className="text-[9px] uppercase tracking-wider text-[#acb0cd]/50">Tax</p>
          <p className="text-[#C0C0C0]">{totalTax || '—'}</p>
        </div>
      </div>

      {/* Line items */}
      {lineItems.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#B03E00] mb-2">Line items ({lineItems.length})</p>
          <div className="rounded-lg border border-[#C0C0C0]/20 overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#26272a]">
                <tr>
                  <th className="text-left px-3 py-2 text-[#acb0cd]/60 font-normal">Item</th>
                  <th className="text-right px-3 py-2 text-[#acb0cd]/60 font-normal">Qty</th>
                  <th className="text-right px-3 py-2 text-[#acb0cd]/60 font-normal">Unit price</th>
                  <th className="text-right px-3 py-2 text-[#acb0cd]/60 font-normal">Amount</th>
                  <th className="text-left px-3 py-2 text-[#acb0cd]/60 font-normal">Conditions</th>
                  <th className="text-right px-3 py-2 text-[#acb0cd]/60 font-normal">Tax</th>
                  <th className="text-right px-3 py-2 text-[#acb0cd]/60 font-normal">Disc.</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((li, i) => (
                  <tr key={i} className="border-t border-[#C0C0C0]/10">
                    <td className="px-3 py-2 text-[#C0C0C0] font-medium">{li.item || '—'}</td>
                    <td className="px-3 py-2 text-[#acb0cd] text-right font-mono">{li.quantity ?? '—'}</td>
                    <td className="px-3 py-2 text-[#acb0cd] text-right font-mono">{formatMoney(li.unitPrice, p.currency) || '—'}</td>
                    <td className="px-3 py-2 text-[#C0C0C0] text-right font-mono font-bold">{formatMoney(li.amount, p.currency) || '—'}</td>
                    <td className="px-3 py-2 text-[#acb0cd]/70 text-[10px]">{li.conditions || '—'}</td>
                    <td className="px-3 py-2 text-[#acb0cd]/70 text-right">{li.taxRate ? `${li.taxRate}%` : '—'}</td>
                    <td className="px-3 py-2 text-[#acb0cd]/70 text-right">{li.discount ? `${li.discount}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[#acb0cd]/50 mt-2 italic">
            Taxation mode: <span className="text-[#C0C0C0]">{p.inputAmountTaxed || 'n/a'}</span>
            {p.inputAmountTaxed === 'EXCLUSIVE' && ' — prix indiqué hors taxes'}
            {p.inputAmountTaxed === 'INCLUSIVE' && ' — taxes incluses dans le prix'}
            {p.inputAmountTaxed === 'NONE' && ' — aucune taxe applicable'}
          </p>
        </div>
      )}

      {/* Effective dates */}
      {dates.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#B03E00] mb-2">Effective periods ({dates.length})</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
            {dates.map((d, i) => (
              <div key={i} className="rounded border border-[#C0C0C0]/15 bg-[#26272a] px-2 py-1 text-xs font-mono text-[#acb0cd]">
                {formatDate(d.from)} → {formatDate(d.to)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inclusion zones (avec bbox info) */}
      {zones.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#B03E00] mb-2">Inclusion zones ({zones.length})</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-[#acb0cd]/60">
                <tr>
                  <th className="text-left px-2 py-1 font-normal">Label</th>
                  <th className="text-left px-2 py-1 font-normal">Type</th>
                  <th className="text-left px-2 py-1 font-normal">Category</th>
                  <th className="text-right px-2 py-1 font-normal">Center (lat, lng)</th>
                  <th className="text-right px-2 py-1 font-normal">BBox</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((z, i) => (
                  <tr key={i} className="border-t border-[#C0C0C0]/10">
                    <td className="px-2 py-1 text-[#C0C0C0]">{z.label}</td>
                    <td className="px-2 py-1 text-[#acb0cd]/70">{z.type}</td>
                    <td className="px-2 py-1 text-[#acb0cd]/60 text-[10px]">{(z.category || []).join(' › ')}</td>
                    <td className="px-2 py-1 text-[#acb0cd]/70 text-right font-mono text-[10px]">
                      {z.coordinates ? `${z.coordinates[1]?.toFixed(2)}, ${z.coordinates[0]?.toFixed(2)}` : '—'}
                    </td>
                    <td className="px-2 py-1 text-[#acb0cd]/50 text-right font-mono text-[9px]">
                      {z.bbox ? `[${z.bbox.map(n => n.toFixed(1)).join(', ')}]` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Exclusion zones */}
      {exclusions.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-red-400 mb-2 flex items-center gap-1.5">
            <AlertCircle className="w-3 h-3" /> Exclusion zones ({exclusions.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {exclusions.map((z, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded border border-red-500/40 bg-red-900/20 text-red-300">{z.label}</span>
            ))}
          </div>
        </div>
      )}

      {/* Meta */}
      <div className="flex flex-wrap gap-2 text-[10px]">
        <span className="px-2 py-0.5 rounded border border-[#C0C0C0]/30 text-[#acb0cd]">Currency: {p.currency || '—'}</span>
        <span className="px-2 py-0.5 rounded border border-[#C0C0C0]/30 text-[#acb0cd]">Unit: {p.unit || '—'}</span>
        <span className={`px-2 py-0.5 rounded border ${season.petsAllowed ? 'border-green-500/40 text-green-400' : 'border-[#C0C0C0]/30 text-[#acb0cd]/60'}`}>
          Pets: {season.petsAllowed ? 'yes' : 'no'}
        </span>
      </div>
    </div>
  );
}

// ─── Calendrier visuel des saisons ───────────────────────────────────────
// Pour chaque saison, on calcule pour chaque mois (1-12) si elle s'applique au moins
// une fois dans n'importe quelle année renseignée dans effectiveDates.
function seasonMonthsCoverage(season) {
  const months = new Array(12).fill(false);
  for (const d of season.effectiveDates || []) {
    if (!d.from || !d.to) continue;
    const from = new Date(d.from);
    const to = new Date(d.to);
    // Si la plage croise plusieurs années (rare), on ne traite que d'année à année.
    let cur = new Date(from);
    while (cur <= to) {
      months[cur.getUTCMonth()] = true;
      cur.setUTCDate(cur.getUTCDate() + 1);
      // Limite de sécurité : on saute au mois suivant pour ne pas itérer jour par jour si la plage est énorme
      if (cur.getUTCDate() === 1) continue;
    }
  }
  return months;
}

function SeasonCalendar({ seasons }) {
  if (seasons.length === 0) return null;
  const palette = ['#B03E00', '#d39478', '#c2622a', '#acb0cd', '#B87333', '#5e7ec9', '#8e44ad', '#27ae60', '#e67e22', '#16a085'];
  return (
    <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] p-4 overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Header months */}
        <div className="grid grid-cols-[200px_repeat(12,1fr)] gap-1 mb-2 text-[10px] uppercase tracking-wider text-[#acb0cd]/60">
          <div></div>
          {MONTHS.map(m => <div key={m} className="text-center">{m}</div>)}
        </div>
        {/* Rows */}
        {seasons.map((s, i) => {
          const coverage = seasonMonthsCoverage(s);
          const color = palette[i % palette.length];
          const total = formatMoney(s.pricing?.total, s.pricing?.currency);
          return (
            <div key={i} className="grid grid-cols-[200px_repeat(12,1fr)] gap-1 mb-1 items-center">
              <div className="text-xs text-[#C0C0C0] pr-2 truncate" title={s.name}>
                <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ backgroundColor: color }} />
                {s.name}
                {total && <span className="text-[#acb0cd]/50 text-[10px] block">{total}/{(s.pricing.unit || '').toLowerCase()}</span>}
              </div>
              {coverage.map((on, m) => (
                <div key={m} className="h-5 rounded-sm" style={{ backgroundColor: on ? color : 'rgba(192,192,192,0.05)' }} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Crew card ───────────────────────────────────────────────────────────
function CrewCard({ c }) {
  const [open, setOpen] = useState(false);
  const avatar = c.avatar ? getAnkorImageUrl(c.avatar, '320w') : null;
  const hasBio = c.bio && c.bio.length > 0;
  const { role, inferred } = inferCrewRole(c);
  return (
    <div className={`rounded-xl border bg-[#26272a] overflow-hidden transition-all ${open ? 'border-[#B03E00] col-span-2 sm:col-span-3 md:col-span-4' : 'border-[#C0C0C0]/30'}`}>
      <button type="button" onClick={() => hasBio && setOpen(o => !o)} disabled={!hasBio}
        className={`w-full text-left ${hasBio ? 'cursor-pointer hover:bg-[#2e2f32]' : 'cursor-default'}`}>
        <div className={`grid ${open ? 'sm:grid-cols-[180px_1fr] gap-3' : 'grid-cols-1'}`}>
          <div className={`relative aspect-square bg-[#26272a] ${open ? 'max-w-[180px]' : ''}`}>
            {avatar ? (
              <Image src={avatar} alt={c.name || 'crew'} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <UserCircle2 className="w-10 h-10 text-[#C0C0C0]/30" />
              </div>
            )}
            {hasBio && !open && (
              <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#B03E00]/80 text-white text-[9px] uppercase">bio</span>
            )}
          </div>
          <div className={`p-2.5 ${open ? 'text-left' : 'text-center'}`}>
            <p className="text-xs font-bold text-[#C0C0C0] truncate">{c.name || <FillerValue>—</FillerValue>}</p>
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#B03E00] mt-0.5"
              title={inferred ? `Ankor renvoie "${c.role}" — déduit de la bio` : undefined}>
              {role}
              {inferred && <span className="ml-1 text-[#B03E00]/60">*</span>}
            </p>
            {open && hasBio && (
              <p className="text-xs text-[#acb0cd] leading-relaxed whitespace-pre-line mt-2">{c.bio}</p>
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
      <div className="min-h-screen bg-[#26272a] flex items-center justify-center text-[#acb0cd] px-4 text-center pt-20">
        <p>Yacht non trouvé en BDD.</p>
      </div>
    );
  }

  const full = yacht.full || {};
  const bp = full.blueprint || {};
  const pricing = full.pricing || {};
  const description = full.description || yacht.description;

  const imgs = (yacht.images || []).filter(Boolean).map(i => getAnkorImageUrl(i, '1280w'));
  const hero = imgs[0] || '/images/yachts/yatch2.jpeg';
  const gallery = imgs.slice(1);
  const yachtType = Array.isArray(full.yachtType) ? full.yachtType.join(', ') : full.yachtType;
  const lastModified = full.lastModified ? new Date(full.lastModified).toLocaleDateString('fr-FR') : null;

  const closeLb = () => setLightbox(-1);
  const prevLb = () => setLightbox(i => (i - 1 + imgs.length) % imgs.length);
  const nextLb = () => setLightbox(i => (i + 1) % imgs.length);

  const cabinLayout = Array.isArray(bp.cabinLayout) ? bp.cabinLayout : [];
  const amenities = Array.isArray(bp.amenities) ? bp.amenities : [];
  const toys = Array.isArray(bp.toys) ? bp.toys : [];
  const entertainment = Array.isArray(bp.entertainment) ? bp.entertainment : [];
  const tenders = Array.isArray(bp.tenders) ? bp.tenders : [];
  const crew = Array.isArray(full.crew) ? full.crew : [];
  const seasons = Array.isArray(pricing.pricingInfo) ? pricing.pricingInfo : [];

  const lat = bp.basePort?.coordinates?.latitude;
  const lng = bp.basePort?.coordinates?.longitude;

  // Pricing aggregates
  const weekFrom = formatMoney(pricing.weekPricingFrom?.price, pricing.weekPricingFrom?.currency);
  const weekTo = formatMoney(pricing.weekPricingTo?.price, pricing.weekPricingTo?.currency);
  const dayFrom = formatMoney(pricing.dayPricingFrom?.price, pricing.dayPricingFrom?.currency);
  const dayTo = formatMoney(pricing.dayPricingTo?.price, pricing.dayPricingTo?.currency);

  // Distinct zones across all seasons
  const allZones = new Set();
  const allCurrencies = new Set();
  const allUnits = new Set();
  let totalLineItems = 0;
  let totalExclusions = 0;
  for (const s of seasons) {
    (s.inclusionZones || []).forEach(z => z.label && allZones.add(z.label));
    if (s.pricing?.currency) allCurrencies.add(s.pricing.currency);
    if (s.pricing?.unit) allUnits.add(s.pricing.unit);
    totalLineItems += (s.pricing?.lineItems || []).length;
    totalExclusions += (s.exclusionZones || []).length;
  }

  // Specs
  const specsTech = [
    [Ruler, 'Length overall', bp.length ? `${bp.length} m` : null, '60 m'],
    [Ruler, 'Beam', bp.beam ? `${bp.beam} m` : null, '10 m'],
    [Ruler, 'Draft', bp.draft ? `${bp.draft} m` : null, '3.2 m'],
    [Gauge, 'Top speed', bp.topSpeed ? `${bp.topSpeed} kn` : null, '18 kn'],
    [Gauge, 'Cruise speed', bp.cruiseSpeed ? `${bp.cruiseSpeed} kn` : null, '14 kn'],
    [Wrench, 'Engines', bp.engines, '2× MTU 4000 hp'],
    [Building2, 'Hull construction', bp.hullConstruction, 'Steel'],
    [Ship, 'Hull type', bp.hullType, 'Monohull'],
    [Layers, 'Decks', bp.decks, '4'],
    [Bath, 'Bathrooms', bp.bathrooms, '7'],
    [Compass, 'Cruising capacity', bp.cruisingCapacity || null, '12'],
    [Users, 'Static capacity', bp.staticCapacity || null, '20'],
    [Fuel, 'Fuel capacity', bp.fuelCapacity || null, '120 000 L'],
    [Droplet, 'Tonnage', bp.tonnage || null, '1200 GT'],
    [Ship, 'Model', bp.model, 'Custom'],
    [Award, 'Architect', bp.architect, 'Espen Øino'],
    [Award, 'Interior designer', bp.interiorDesigner, 'Terence Disdale'],
    [Globe, 'Yacht type', yachtType, 'Motor'],
    [Building2, 'Superstructure', Array.isArray(bp.superStructure) ? bp.superStructure.join(', ') : bp.superStructure, 'Aluminium'],
    [Calendar, 'Built year', bp.builtYear, '2020'],
    [Calendar, 'Refit year', bp.refitYear, '2024'],
    [Users, 'Sleeps', bp.sleeps, '12'],
    [BedDouble, 'Cabins', bp.cabins, '6'],
    [Anchor, 'Max crew', bp.maxCrew, '16'],
    [Anchor, 'Make', bp.make, 'Lürssen'],
  ];

  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">

      {/* ══ Bandeau test ══ */}
      <div className="bg-red-900/30 border-b border-red-700/40 pt-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-2.5 flex items-center justify-between flex-wrap gap-3 text-xs">
          <p className="text-red-300">
            <span className="font-bold uppercase tracking-wider">Inventory dashboard</span> — tout ce qu'Ankor renvoie. Valeurs en <span className="italic text-red-400">rouge [ex.]</span> = absentes pour ce yacht.
          </p>
          {lastModified && (
            <p className="text-red-300/70 flex items-center gap-1.5"><Clock className="w-3 h-3" /> Ankor updated: {lastModified}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 space-y-8">

        {/* ══ HEADER ══ */}
        <div className="grid md:grid-cols-[280px_1fr] gap-5 items-start">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#C0C0C0]/30 bg-[#3a3b3f]">
            <Image src={hero} alt={yacht.name} fill priority className="object-cover" />
          </div>
          <div>
            <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.08em] text-[#C0C0C0]">{yacht.name}</h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap text-sm">
              {yachtType && <span className="px-2 py-0.5 rounded border border-[#C0C0C0]/30 text-[#acb0cd] uppercase tracking-wider text-xs">{yachtType}</span>}
              <span className="text-[#acb0cd]"><Val value={bp.make} filler="Lürssen" /></span>
              <span className="text-[#B03E00]">·</span>
              <span className="text-[#acb0cd]"><Val value={bp.model} filler="Custom" /></span>
            </div>
            <p className="text-xs text-[#acb0cd]/50 mt-1 font-mono break-all">{full.uri || '—'}</p>

            {/* Quick stat row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              <StatCard icon={Receipt} label="Seasons" value={seasons.length} sublabel={`${totalLineItems} line items`} />
              <StatCard icon={Globe} label="Unique zones" value={allZones.size} sublabel={[...allUnits].join(', ') || '—'} />
              <StatCard icon={Users} label="Crew" value={crew.length} sublabel={`${crew.filter(c => c.bio).length} with bio`} />
              <StatCard icon={Database} label="Photos" value={imgs.length} sublabel={`${amenities.length}am · ${toys.length}toys`} />
            </div>
          </div>
        </div>

        {/* ══ PRICING — DEEP DIVE ══ */}
        <section>
          <SectionTitle icon={Receipt} title="Pricing — full inventory" subtitle="pricing.* + pricingInfo[] avec line items, dates, zones et taxes" count={`${seasons.length} season${seasons.length > 1 ? 's' : ''}`} />

          {/* Range cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <StatCard icon={TrendingUp} accent label="Weekly range" value={weekFrom && weekTo ? `${weekFrom} → ${weekTo}` : weekFrom || weekTo || '—'} sublabel="weekPricingFrom / weekPricingTo" />
            <StatCard icon={TrendingUp} label="Daily range" value={dayFrom && dayTo ? `${dayFrom} → ${dayTo}` : dayFrom || dayTo || '—'} sublabel="dayPricingFrom / dayPricingTo" />
            <StatCard icon={Percent} label="Tax modes" value={[...new Set(seasons.map(s => s.pricing?.inputAmountTaxed))].filter(Boolean).join(', ') || '—'} sublabel="EXCLUSIVE/INCLUSIVE/NONE" />
            <StatCard icon={AlertCircle} label="Exclusion zones" value={totalExclusions} sublabel="across all seasons" />
          </div>

          {/* Master table */}
          <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] overflow-hidden mb-5">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-[#26272a] text-[#acb0cd]/60">
                  <tr>
                    <th className="text-left px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Season</th>
                    <th className="text-left px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Unit</th>
                    <th className="text-left px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Curr.</th>
                    <th className="text-right px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Total</th>
                    <th className="text-right px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Charter fee</th>
                    <th className="text-right px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Subtotal</th>
                    <th className="text-right px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Tax</th>
                    <th className="text-left px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Tax mode</th>
                    <th className="text-center px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Pets</th>
                    <th className="text-center px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">LI</th>
                    <th className="text-center px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Dates</th>
                    <th className="text-center px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Zones</th>
                    <th className="text-center px-3 py-2.5 font-normal uppercase tracking-wider text-[10px]">Excl</th>
                  </tr>
                </thead>
                <tbody>
                  {seasons.length > 0 ? seasons.map((s, i) => {
                    const p = s.pricing || {};
                    return (
                      <tr key={i} className="border-t border-[#C0C0C0]/10 hover:bg-[#26272a]/40">
                        <td className="px-3 py-2 text-[#C0C0C0] font-medium">{s.name || <FillerValue>—</FillerValue>}</td>
                        <td className="px-3 py-2 text-[#acb0cd]">{p.unit || '—'}</td>
                        <td className="px-3 py-2 text-[#acb0cd]">{p.currency || '—'}</td>
                        <td className="px-3 py-2 text-[#B03E00] text-right font-mono font-bold">{formatMoney(p.total, p.currency) || '—'}</td>
                        <td className="px-3 py-2 text-[#acb0cd] text-right font-mono">{formatMoney(p.charterFee, p.currency) || '—'}</td>
                        <td className="px-3 py-2 text-[#acb0cd] text-right font-mono">{formatMoney(p.subTotal, p.currency) || '—'}</td>
                        <td className="px-3 py-2 text-[#acb0cd] text-right font-mono">{formatMoney(p.totalTax, p.currency) || '—'}</td>
                        <td className="px-3 py-2 text-[#acb0cd]/70 text-[10px] uppercase">{p.inputAmountTaxed || '—'}</td>
                        <td className="px-3 py-2 text-center">{s.petsAllowed ? <span className="text-green-400">✓</span> : <span className="text-[#acb0cd]/30">✗</span>}</td>
                        <td className="px-3 py-2 text-center text-[#acb0cd] font-mono">{(p.lineItems || []).length}</td>
                        <td className="px-3 py-2 text-center text-[#acb0cd] font-mono">{(s.effectiveDates || []).length}</td>
                        <td className="px-3 py-2 text-center text-[#acb0cd] font-mono">{(s.inclusionZones || []).length}</td>
                        <td className="px-3 py-2 text-center font-mono">{(s.exclusionZones || []).length > 0 ? <span className="text-red-400">{(s.exclusionZones || []).length}</span> : <span className="text-[#acb0cd]/30">0</span>}</td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan={13} className="px-3 py-8 text-center text-red-400 italic">[ex.] no pricingInfo for this yacht</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calendrier */}
          {seasons.length > 0 && (
            <div className="mb-5">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#B03E00] mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Season coverage calendar
              </h3>
              <SeasonCalendar seasons={seasons} />
            </div>
          )}

          {/* Détails par saison */}
          {seasons.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#B03E00] mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Per-season breakdown
              </h3>
              {seasons.map((s, i) => (
                <Collapsible key={i} title={`${i + 1}. ${s.name || 'Unnamed season'}`} badge={formatMoney(s.pricing?.total, s.pricing?.currency) || '—'}>
                  <SeasonDetail season={s} idx={i} />
                </Collapsible>
              ))}
            </div>
          )}
        </section>

        {/* ══ BASE PORT + MAP ══ */}
        <section>
          <SectionTitle icon={MapIcon} title="Base port" subtitle="blueprint.basePort — name, country, coordinates" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] p-4 space-y-2">
              <p className="text-xl text-[#C0C0C0] font-bold"><Val value={bp.basePort?.name} filler="Monaco" /></p>
              <p className="text-sm text-[#acb0cd]"><Val value={bp.basePort?.country} filler="Principality of Monaco" /></p>
              <p className="text-[10px] text-[#acb0cd]/50 font-mono">URI: {bp.basePort?.uri || '—'}</p>
              {(lat != null && lng != null) ? (
                <p className="text-xs text-[#acb0cd]/70 font-mono"><MapPin className="inline w-3 h-3 mr-1" />{lat.toFixed(4)}°, {lng.toFixed(4)}°</p>
              ) : (
                <p className="text-xs text-red-400 font-mono italic">[ex.] 43.7384°, 7.4246°</p>
              )}
            </div>
            <MiniMap lat={lat ?? 43.7384} lng={lng ?? 7.4246} label={bp.basePort?.name || 'Monaco [ex.]'} />
          </div>
        </section>

        {/* ══ SPECIFICATIONS (table dense) ══ */}
        <section>
          <SectionTitle icon={Ship} title="Specifications" subtitle="blueprint.* — 25 champs possibles" count={`${specsTech.filter(([, , v]) => v).length}/${specsTech.length} renseignés`} />
          <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {specsTech.map(([Icon, label, value, filler], i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-[#3a3b3f]' : 'bg-[#26272a]/40'} border-b border-[#C0C0C0]/5 last:border-b-0`}>
                    <td className="px-4 py-2 w-8"><Icon className="w-4 h-4 text-[#B03E00]" /></td>
                    <td className="px-2 py-2 text-[10px] uppercase tracking-[0.15em] text-[#acb0cd]/60 w-1/3">{label}</td>
                    <td className="px-4 py-2 text-sm"><Val value={value} filler={filler} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══ DESCRIPTION ══ */}
        <section>
          <SectionTitle icon={FileText} title="Description" subtitle="full_data.description" count={`${description?.length || 0} chars`} />
          <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] p-5">
            <p className="text-sm leading-relaxed text-[#acb0cd] whitespace-pre-line">
              {description || <FillerValue>Lorem ipsum. Yacht overview text Ankor returns — multi-paragraph.</FillerValue>}
            </p>
          </div>
        </section>

        {/* ══ AMENITIES + TOYS + ENTERTAINMENT + TENDERS (4 col grid dense) ══ */}
        <section>
          <SectionTitle icon={Sparkles} title="On-board offering" subtitle="amenities + entertainment + toys + tenders" />
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#B03E00] mb-3">Amenities · {amenities.length || 'ex.'}</p>
              <ul className="text-xs space-y-1">
                {amenities.length > 0 ? amenities.map((a, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-base">{iconFor(a.label)}</span>
                    <span className="text-[#acb0cd] flex-1">{a.label}</span>
                    {a.quantity && <span className="text-[#B03E00] font-bold text-[10px]">×{a.quantity}</span>}
                  </li>
                )) : ['Jacuzzi', 'Beach Club', 'Gym', 'Cinema'].map((l, i) => (
                  <li key={i} className="flex items-center gap-2 italic">
                    <span className="text-base">{iconFor(l)}</span>
                    <span className="text-red-400">{l} [ex.]</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#B03E00] mb-3">Entertainment · {entertainment.length || 'ex.'}</p>
              <ul className="text-xs space-y-1">
                {entertainment.length > 0 ? entertainment.map((e, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-base">{iconFor(e)}</span>
                    <span className="text-[#acb0cd]">{e}</span>
                  </li>
                )) : ['Wi-Fi', 'Satellite TV', 'Apple TV'].map((l, i) => (
                  <li key={i} className="flex items-center gap-2 italic">
                    <span className="text-base">{iconFor(l)}</span>
                    <span className="text-red-400">{l} [ex.]</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#B03E00] mb-3">Water toys · {toys.length || 'ex.'}</p>
              <ul className="text-xs space-y-1">
                {toys.length > 0 ? toys.map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-base">{iconFor(t.label)}</span>
                    <span className="text-[#acb0cd] flex-1">{t.label}</span>
                    {t.quantity && <span className="text-[#C0C0C0] font-bold text-[10px] border border-[#C0C0C0]/40 rounded-full px-1.5">×{t.quantity}</span>}
                  </li>
                )) : ['Jetski', 'Sea-Bob', 'Paddleboard'].map((l, i) => (
                  <li key={i} className="flex items-center gap-2 italic">
                    <span className="text-base">{iconFor(l)}</span>
                    <span className="text-red-400">{l} [ex.]</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#B03E00] mb-3">Tenders · {tenders.length || 'ex.'}</p>
              <ul className="text-xs space-y-1.5">
                {tenders.length > 0 ? tenders.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-base">🚤</span>
                    <span className="text-[#acb0cd]">{typeof t === 'string' ? t : t.label || JSON.stringify(t)}</span>
                  </li>
                )) : ['8m limousine tender 300hp', '5m rescue tender'].map((l, i) => (
                  <li key={i} className="flex items-start gap-2 italic">
                    <span className="text-base">🚤</span>
                    <span className="text-red-400">{l} [ex.]</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ══ CABIN LAYOUT ══ */}
        <section>
          <SectionTitle icon={BedDouble} title="Cabin layout" subtitle="blueprint.cabinLayout[]" count={`${cabinLayout.length} types`} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {cabinLayout.length > 0 ? cabinLayout.map((c, i) => (
              <div key={i} className="rounded-lg border border-[#C0C0C0]/30 bg-[#3a3b3f] p-3 text-center">
                <p className="text-2xl font-bold text-[#C0C0C0]">{c.value}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#acb0cd]/60 mt-1">{c.label}</p>
              </div>
            )) : [['Master Cabin', 1], ['Double', 4], ['Twin', 2], ['Single', 1]].map(([l, v], i) => (
              <div key={i} className="rounded-lg border border-red-500/40 bg-red-900/10 p-3 text-center italic">
                <p className="text-2xl font-bold text-red-400">{v}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-red-400/80 mt-1">{l} [ex.]</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CREW ══ */}
        <section>
          <SectionTitle icon={Users} title="Crew" subtitle={`crew[] — {name, role*, avatar, bio} · * = déduit (Ankor renvoie souvent "Captain" pour tous)`} count={`${crew.length} members · ${crew.filter(c => c.bio).length} with bio`} />
          {crew.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {crew.map((c, i) => <CrewCard key={i} c={c} />)}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(i => (
                <CrewCard key={i} c={{ name: null, role: null, bio: '[ex.] biography' }} />
              ))}
            </div>
          )}
        </section>

        {/* ══ GALERIE compacte ══ */}
        {imgs.length > 0 && (
          <section>
            <SectionTitle icon={Database} title="Gallery" subtitle="blueprint.images[]" count={`${imgs.length} URLs`} />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5">
              {imgs.map((src, i) => (
                <button key={i} onClick={() => setLightbox(i)} className="relative aspect-square rounded overflow-hidden border border-[#C0C0C0]/20 group">
                  <Image src={src} alt={`${yacht.name} ${i + 1}`} fill className="object-cover transition-transform group-hover:scale-110" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ══ RAW OVERVIEW ══ */}
        <section>
          <SectionTitle icon={Database} title="Raw entity overview" subtitle="Réponse brute /website/entity/{uri}" />
          <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#26272a] p-4 font-mono text-[11px] space-y-0.5">
            {[
              ['uri', full.uri],
              ['yachtType', JSON.stringify(full.yachtType)],
              ['description', `${description?.length || 0} chars`],
              ['blueprint.images', `${(bp.images || []).length} URLs`],
              ['blueprint.amenities', `${amenities.length} items (${amenities.filter(a => a.quantity).length} avec qty)`],
              ['blueprint.toys', `${toys.length} items (${toys.filter(t => t.quantity).length} avec qty)`],
              ['blueprint.entertainment', `${entertainment.length} items`],
              ['blueprint.tenders', `${tenders.length} items`],
              ['blueprint.cabinLayout', `${cabinLayout.length} types`],
              ['blueprint.basePort.coordinates', lat ? `${lat.toFixed(4)}, ${lng.toFixed(4)}` : '—'],
              ['crew', `${crew.length} members (${crew.filter(c => c.bio).length} bio, ${crew.filter(c => c.avatar).length} avatar)`],
              ['pricing.weekPricingFrom→To', `${weekFrom || '—'} → ${weekTo || '—'}`],
              ['pricing.dayPricingFrom→To', `${dayFrom || '—'} → ${dayTo || '—'}`],
              ['pricing.pricingInfo', `${seasons.length} seasons, ${totalLineItems} total line items, ${allZones.size} unique zones`],
              ['lastModified', lastModified || '—'],
            ].map(([k, v]) => (
              <p key={k}><span className="text-[#B03E00]">{k}</span>: <span className="text-[#acb0cd]">{v || '—'}</span></p>
            ))}
          </div>
        </section>

      </div>

      {/* Lightbox */}
      {lightbox >= 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLb}>
          <button onClick={closeLb} className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center">
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button onClick={e => { e.stopPropagation(); prevLb(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <div className="relative w-[88vw] h-[80vh]" onClick={e => e.stopPropagation()}>
            <Image src={imgs[lightbox]} alt="" fill className="object-contain" />
          </div>
          <button onClick={e => { e.stopPropagation(); nextLb(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center">
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}
