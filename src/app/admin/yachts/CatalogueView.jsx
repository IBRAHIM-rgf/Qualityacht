'use client';

// ══ Catalogue des yachts — design « Calque Central Agent » (client 2026-10-31, etape 1) ══
// Filtres, barre d'outils, vues Table / Cards, fiche detail (avec les fiches de tarifs).
// Branche sur les vrais bateaux de la base. Elements prevus a l'etape 2 (non affiches
// tant que leurs donnees n'existent pas) : disponibilites / Timeline / calendrier,
// contact du central agent, colonnes d'emails, brochure / pieces jointes.

import { Fragment, useEffect, useMemo, useState } from 'react';
import { getAnkorImageUrl } from '@/lib/utils';
import { normalizeCharterPrices, formatPriceAmount, hasAnyPrice } from '@/lib/charterPrices';
import { mergeSourceAndOverrides } from '@/lib/yachtOverrides';
import CharterPricesEditor, { pricesToForm } from './CharterPricesEditor';
import { ADMIN_CATEGORIES, ICON_COLUMNS, isCategoryOn } from '@/lib/adminCategories';
import { HANDICAPS_BY_CAT } from '@/lib/handicaps';

// Sous-categories affichees seulement dans la case deployee de leur categorie (client 2026-11-01).
const SUB_OF = Object.fromEntries(ADMIN_CATEGORIES.filter((c) => c.key.startsWith('only-for-you/')).map((c) => [c.key, 'only-for-you']));
// Cases sorties de la grille dans leur propre cadre (client 2026-11-01).
const OWN_FRAME = new Set(['last-minute']);

// Icones d'en-tete de la table admin (client 2026-11-01) : oreiller vert olive = Sleeps,
// porte claire = Cabins. Page d'administration uniquement.
const ICO_PILLOW = (
  <svg width="17" height="17" viewBox="0 0 24 24" aria-label="Sleeps"><rect x="3" y="6" width="18" height="12" rx="5.5" fill="#6b8e23" stroke="#556b2f" strokeWidth="1.5" /><path d="M5 8.5 Q12 11.5 19 8.5" stroke="#a9c25d" strokeWidth="1.5" fill="none" /></svg>
);
const ICO_DOOR = (
  <svg width="17" height="17" viewBox="0 0 24 24" aria-label="Cabins"><rect x="6" y="2.5" width="12" height="19" rx="1.5" fill="#e8d9ae" stroke="#a08c5a" strokeWidth="1.5" /><rect x="4" y="2.5" width="16" height="19" rx="1.5" fill="none" stroke="#a08c5a" strokeWidth="1.5" /><circle cx="14.8" cy="12" r="1" fill="#a08c5a" /></svg>
);
const ENV = (
  <svg className="env" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 7l10 6L22 7" /></svg>
);

// Section du site ouverte par chaque case (texte d'aide sous le libelle).
const ROUTE_OF = (c) => (c.noSection ? '— (aucune section, icône présente)' : c.label);

// Date-picker « clic uniquement » (aucune saisie clavier), comme le calque.
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
function DatePicker({ at, onPick, onClear, onClose }) {
  const now = new Date();
  const [y, setY] = useState(now.getFullYear());
  const [m, setM] = useState(now.getMonth());
  useEffect(() => {
    const h = (e) => { if (!e.target.closest('.dp') && !e.target.closest('.date')) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);
  const first = new Date(y, m, 1).getDay();
  const dim = new Date(y, m + 1, 0).getDate();
  const prev = () => { if (m === 0) { setM(11); setY(y - 1); } else setM(m - 1); };
  const next = () => { if (m === 11) { setM(0); setY(y + 1); } else setM(m + 1); };
  return (
    <div className="dp fixed" style={{ left: Math.max(10, Math.min(at.left, window.innerWidth - 270)), top: at.top }}>
      <div className="dp-top"><button type="button" onClick={prev}>‹</button><span className="lbl">{MOIS[m]} {y}</span><button type="button" onClick={next}>›</button></div>
      <div className="dp-grid">
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => <div key={i} className="dp-dow">{d}</div>)}
        {Array.from({ length: first }, (_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: dim }, (_, i) => i + 1).map((d) => {
          const isT = now.getFullYear() === y && now.getMonth() === m && now.getDate() === d;
          return <div key={d} className={`dp-d ${isT ? 'today' : ''}`} onClick={() => onPick(`${String(d).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}/${y}`)}>{d}</div>;
        })}
      </div>
      <div className="dp-foot">
        <button type="button" onClick={() => { setY(now.getFullYear()); setM(now.getMonth()); }}>Today</button>
        <button type="button" onClick={onClear}>Effacer</button>
      </div>
    </div>
  );
}

const num = (v) => {
  const n = parseFloat(String(v ?? '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
};

function lowest(rates) {
  return (rates || []).reduce((m, r) => (m == null || r.price < m.price ? r : m), null);
}

// Donnees calculees pour la liste (prix, charters, longueur).
function enrich(y) {
  const prices = normalizeCharterPrices(y.custom_pricing, y.day_charter);
  const term = lowest(prices.weekly.rates);
  const day = lowest(prices.day.rates);
  const charters = [
    prices.weekly.rates.length ? 'WEEK' : null,
    prices.day.rates.length || prices.halfday.rates.length ? 'DAY' : null,
    prices.hours.rates.length ? 'HOUR' : null,
  ].filter(Boolean);
  const lenM = num(y.length);
  return {
    ...y,
    prices,
    term,
    day,
    charters,
    lenM,
    lenFt: lenM ? Math.round(lenM * 3.28) : null,
    sleeps: num(y.guests),
    cabinsN: num(y.cabins),
  };
}

const CMAP = { WEEK: 'w', DAY: 'd', HOUR: 'h' };
const chStr = (y) => ['WEEK', 'DAY', 'HOUR'].filter((c) => y.charters.includes(c)).map((c) => CMAP[c]).join('');
const priceTxt = (r) => (r ? formatPriceAmount(r.price, r.currency) : '—');
const lenTxt = (y) => (y.lenM ? `${y.lenM}m (${y.lenFt}ft)` : (y.length || '—'));

const EMPTY_ADV = { lmin: '', lmax: '', cmin: '', cmax: '', bmin: '', bmax: '', kmin: '', kmax: '' };

export default function CatalogueView({
  yachts: rawList, pubOnly, stateFilter, setStateFilter, regionLabels, subRegionLabels, subRegionsByRegion = {},
  onToggleVisible, onToggleFeatured, onDelete, onEdit, onSaveFiche,
}) {
  const list0 = useMemo(() => rawList.map(enrich), [rawList]);

  // ── Filtres ──
  const [charter, setCharter] = useState('');
  const [gmin, setGmin] = useState('');
  const [gmax, setGmax] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [pmin, setPmin] = useState('');
  const [pmax, setPmax] = useState('');
  const [areas, setAreas] = useState([]);
  const [areaDraft, setAreaDraft] = useState('');
  const [kw, setKw] = useState('');
  const [region, setRegion] = useState('');
  const [subFilter, setSubFilter] = useState('');
  const [feat, setFeat] = useState('');
  const [adv, setAdv] = useState(EMPTY_ADV);
  const [advOpen, setAdvOpen] = useState(false);
  const [advDraft, setAdvDraft] = useState(EMPTY_ADV);
  const [openColl, setOpenColl] = useState({});
  // « Find Yachts » applique les filtres saisis (comme le calque).
  const [applied, setApplied] = useState({});
  const [sort, setSort] = useState('rel');
  const [view, setView] = useState('table');
  const [expanded, setExpanded] = useState(null);
  const [detailId, setDetailId] = useState(null);

  const regLabel = (r) => regionLabels[r] || r;
  const subLabel = (s) => subRegionLabels[s] || s;
  const areaOf = (y) => (y.sub_regions[0] ? subLabel(y.sub_regions[0]) : (y.regions[0] ? regLabel(y.regions[0]) : ''));

  const find = () => setApplied({ charter, gmin: num(gmin), gmax: num(gmax), currency, pmin: num(pmin), pmax: num(pmax), kw: kw.trim().toLowerCase() });
  const clearAll = () => {
    setCharter(''); setGmin(''); setGmax(''); setPmin(''); setPmax(''); setKw(''); setAreas([]);
    setRegion(''); setSubFilter(''); setFeat(''); setAdv(EMPTY_ADV); setApplied({}); setStateFilter('');
  };
  const advCount = Object.values(adv).filter((v) => v !== '').length;

  const filtered = useMemo(() => list0.filter((y) => {
    if (pubOnly && !y.is_visible) return false;
    const a = applied;
    if (a.charter && !y.charters.includes(a.charter)) return false;
    if (a.gmin != null && !(y.sleeps >= a.gmin)) return false;
    if (a.gmax != null && !(y.sleeps <= a.gmax)) return false;
    if (a.pmin != null || a.pmax != null) {
      const p = y.term || y.day;
      if (!p || p.currency !== a.currency) return false;
      if (a.pmin != null && p.price < a.pmin) return false;
      if (a.pmax != null && p.price > a.pmax) return false;
    }
    if (a.kw && !String(y.name || '').toLowerCase().includes(a.kw)) return false;
    if (stateFilter === 'pub' && !y.is_visible) return false;
    if (stateFilter === 'stock' && y.is_visible) return false;
    if (stateFilter === 'feat' && !y.is_featured) return false;
    if (feat === 'yes' && !y.is_featured) return false;
    if (feat === 'no' && y.is_featured) return false;
    if (region && !y.regions.includes(region)) return false;
    if (region === '_none' && y.regions.length) return false;
    if (subFilter && !y.sub_regions.includes(subFilter)) return false;
    if (areas.length && !areas.some((ar) => [...y.sub_regions.map(subLabel), ...y.regions.map(regLabel)].some((l) => l.toLowerCase().includes(ar.toLowerCase())))) return false;
    const d = adv;
    if (d.lmin !== '' && !(y.lenM >= +d.lmin)) return false;
    if (d.lmax !== '' && !(y.lenM <= +d.lmax)) return false;
    if (d.cmin !== '' && !(y.cabinsN >= +d.cmin)) return false;
    if (d.cmax !== '' && !(y.cabinsN <= +d.cmax)) return false;
    if (d.bmin !== '' && !(num(y.year) >= +d.bmin)) return false;
    if (d.bmax !== '' && !(num(y.year) <= +d.bmax)) return false;
    if (d.kmin !== '' && !(num(y.crew) >= +d.kmin)) return false;
    if (d.kmax !== '' && !(num(y.crew) <= +d.kmax)) return false;
    return true;
  }), [list0, pubOnly, applied, stateFilter, feat, region, subFilter, areas, adv]); // eslint-disable-line react-hooks/exhaustive-deps

  const sorted = useMemo(() => {
    const l = [...filtered];
    if (sort === 'name') l.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    if (sort === 'len') l.sort((a, b) => (b.lenM || 0) - (a.lenM || 0));
    if (sort === 'price') l.sort((a, b) => ((b.term || b.day)?.price || 0) - ((a.term || a.day)?.price || 0));
    if (sort === 'guests') l.sort((a, b) => (b.sleeps || 0) - (a.sleeps || 0));
    if (sort === 'rel') l.sort((a, b) => (b.is_featured - a.is_featured) || (b.is_visible - a.is_visible));
    return l;
  }, [filtered, sort]);

  const regionCounts = useMemo(() => {
    const c = {};
    for (const y of list0) { const r = y.regions[0] || '_none'; c[r] = (c[r] || 0) + 1; }
    return c;
  }, [list0]);
  const subCounts = useMemo(() => {
    const c = {};
    for (const y of list0) for (const s of y.sub_regions) c[s] = (c[s] || 0) + 1;
    return c;
  }, [list0]);

  const detailYacht = detailId ? list0.find((y) => y.id === detailId) : null;
  if (detailYacht) {
    return (
      <DetailPage y={detailYacht} regLabel={regLabel} subLabel={subLabel} onBack={() => setDetailId(null)}
        regionLabels={regionLabels} subRegionsByRegion={subRegionsByRegion}
        onEdit={onEdit} onToggleVisible={onToggleVisible} onSaveFiche={onSaveFiche} />
    );
  }

  const addArea = () => {
    const v = areaDraft.trim();
    if (v && !areas.includes(v)) setAreas([...areas, v]);
    setAreaDraft('');
  };

  return (
    <>
      {/* ===== FILTERS ===== */}
      <div className="filters">
        <div className="frow">
          <div className="f">
            <label>Charter Type</label>
            <select value={charter} onChange={(e) => setCharter(e.target.value)}>
              <option value="">Any</option><option>DAY</option><option>WEEK</option><option>HOUR</option>
            </select>
          </div>
          <div className="f">
            <label>Guests</label>
            <div className="minmax">
              <input type="number" placeholder="Min" style={{ width: 74 }} value={gmin} onChange={(e) => setGmin(e.target.value)} />
              <span className="t">to</span>
              <input type="number" placeholder="Max" style={{ width: 74 }} value={gmax} onChange={(e) => setGmax(e.target.value)} />
            </div>
          </div>
          <div className="f">
            <label>Price</label>
            <div className="minmax">
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option>EUR</option><option>USD</option><option>GBP</option><option>AED</option><option>AUD</option><option>CHF</option>
              </select>
              <input type="number" placeholder="Min" style={{ width: 88 }} value={pmin} onChange={(e) => setPmin(e.target.value)} />
              <span className="t">to</span>
              <input type="number" placeholder="Max" style={{ width: 88 }} value={pmax} onChange={(e) => setPmax(e.target.value)} />
            </div>
          </div>
          <div className="f" style={{ flex: 1, minWidth: 260 }}>
            <label>Operating Area</label>
            <div className="tags">
              {areas.map((a) => (
                <span key={a} className="tag purple" onClick={() => setAreas(areas.filter((x) => x !== a))}>{a} <span style={{ opacity: 0.7 }}>✕</span></span>
              ))}
              <input placeholder="Location…" value={areaDraft} onChange={(e) => setAreaDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addArea(); } }} />
            </div>
          </div>
        </div>
        <div className="frow">
          <div className="f" style={{ flex: 1, minWidth: 220 }}>
            <label>Keyword</label>
            <input placeholder="Keyword Search…" style={{ width: '100%' }} value={kw} onChange={(e) => setKw(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') find(); }} />
          </div>
          <div className="f" style={{ alignItems: 'flex-end' }}>
            <button type="button" className="btn-adv" onClick={() => { setAdvDraft(adv); setAdvOpen(true); }}>⚙ Advanced <span className="adv-count">Filters ({advCount})</span></button>
          </div>
          <div className="f" style={{ alignItems: 'flex-end' }}>
            <button type="button" className="btn-clear" onClick={clearAll}>Clear Filters</button>
          </div>
          <div className="f" style={{ alignItems: 'flex-end' }}>
            <button type="button" className="btn-primary" onClick={find}>🔍 Find Yachts</button>
          </div>
        </div>
        <div className="frow" style={{ marginTop: 14, paddingTop: 12, borderTop: '1px dashed var(--border-soft)' }}>
          <div className="f">
            <label>Région</label>
            <select value={region} onChange={(e) => { setRegion(e.target.value); setSubFilter(''); }}>
              <option value="">Toutes régions</option>
              {Object.keys(regionCounts).filter((r) => r !== '_none').map((r) => <option key={r} value={r}>{regLabel(r)}</option>)}
            </select>
          </div>
          <div className="f">
            <label>Statut</label>
            <select value={stateFilter === 'feat' ? '' : stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
              <option value="">Tous</option><option value="pub">Visibles</option><option value="stock">Cachés</option>
            </select>
          </div>
          <div className="f">
            <label>Featured</label>
            <select value={feat} onChange={(e) => setFeat(e.target.value)}>
              <option value="">Tous</option><option value="yes">Featured</option><option value="no">Non featured</option>
            </select>
          </div>
        </div>
        <div className={`coll ${openColl.region ? 'open' : ''}`}>
          <div className="coll-h" onClick={() => setOpenColl((o) => ({ ...o, region: !o.region }))}>RÉPARTITION PAR RÉGION — CLIQUEZ POUR FILTRER <span>▼</span></div>
          <div className="coll-b"><div className="badges">
            {Object.entries(regionCounts).map(([r, c]) => (
              <span key={r} className={`tag ${region === r ? 'purple' : ''}`} onClick={() => { setRegion(region === r ? '' : r); setSubFilter(''); }}>
                {r === '_none' ? 'Sans région' : regLabel(r)} ({c})
              </span>
            ))}
          </div></div>
        </div>
        <div className={`coll ${openColl.sub ? 'open' : ''}`}>
          <div className="coll-h" onClick={() => setOpenColl((o) => ({ ...o, sub: !o.sub }))}>RÉPARTITION PAR SOUS-RÉGION — CLIQUEZ POUR FILTRER <span>▼</span></div>
          <div className="coll-b"><div className="badges">
            {Object.entries(subCounts).map(([s, c]) => (
              <span key={s} className={`tag ${subFilter === s ? 'purple' : ''}`} onClick={() => { setSubFilter(subFilter === s ? '' : s); setRegion(''); }}>
                {subLabel(s)} ({c})
              </span>
            ))}
          </div></div>
        </div>
      </div>

      {/* ===== TOOLBAR ===== */}
      <div className="toolbar">
        <div className="lft">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="rel">Most Relevant</option>
            <option value="name">Name (A→Z)</option>
            <option value="len">Length (desc)</option>
            <option value="price">Price (desc)</option>
            <option value="guests">Sleeps (desc)</option>
          </select>
          <div className="views">
            <button type="button" className={view === 'table' ? 'on' : ''} onClick={() => setView('table')}>Table</button>
            <button type="button" className={view === 'cards' ? 'on' : ''} onClick={() => setView('cards')}>Cards</button>
          </div>
        </div>
        <div className="count"><b>{sorted.length}</b> yacht{sorted.length > 1 ? 's' : ''} affichés sur <b>{list0.length}</b></div>
      </div>

      {/* ===== VUE TABLE ===== */}
      {view === 'table' && (
        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 20 }} /><th>Yacht Name</th><th>Charter</th><th>Term Price</th><th>Day Price</th>
                <th>Length</th><th className="fi">{ICO_PILLOW}</th><th className="fi">{ICO_DOOR}</th>
                {ICON_COLUMNS.map((c) => <th key={c.key} className="fi" title={c.label} style={c.key === 'only-for-couple' ? { color: '#f27bb4' } : undefined}>{c.icon}</th>)}
                <th>Statut</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (<tr><td colSpan={10 + ICON_COLUMNS.length} className="empty">Aucun yacht ne correspond aux filtres.</td></tr>)}
              {sorted.map((y) => (
                <FragmentRow key={y.id} y={y} expanded={expanded === y.id}
                  onExpand={() => setExpanded(expanded === y.id ? null : y.id)}
                  onOpen={() => setDetailId(y.id)} regLabel={regLabel} subLabel={subLabel}
                  onToggleVisible={onToggleVisible} onToggleFeatured={onToggleFeatured} onDelete={onDelete} onEdit={onEdit} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== VUE CARDS ===== */}
      {view === 'cards' && (
        <div className="cards" style={{ display: 'grid' }}>
          {sorted.map((y) => (
            <div key={y.id} className="yc">
              <div className="ph" style={{ backgroundImage: `url("${y.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="bd">
                <h3 onClick={() => setDetailId(y.id)}>{y.name}{y.is_featured && <span style={{ color: '#f5b942' }}> ★</span>}</h3>
                <div className="loc">{areaOf(y) || '—'}</div>
                <div className="meta">{lenTxt(y)} · {y.sleeps ?? '—'} guests · {y.cabinsN ?? '—'} cabins{y.term ? ` · ${priceTxt(y.term)}` : ''}</div>
                <div className="ft">
                  <span className={`pill ${y.is_visible ? 'pub' : 'stock'}`} onClick={() => onToggleVisible(y)}>{y.is_visible ? 'PUBLIÉ' : 'EN STOCK'}</span>
                  <div>
                    <button type="button" className={`ic star ${y.is_featured ? 'on' : ''}`} title="Featured" onClick={() => onToggleFeatured(y)}>★</button>
                    <button type="button" className="ic" title="Modifier" onClick={() => onEdit(y)}>✏️</button>
                    <button type="button" className="ic del" title="Supprimer" onClick={() => onDelete(y)}>🗑️</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== MODALE FILTRES AVANCÉS ===== */}
      {advOpen && (
        <div className="ovl open" onClick={() => setAdvOpen(false)}>
          <div className="modal" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3>Advanced Filters</h3>
              <button type="button" className="ic" onClick={() => setAdvOpen(false)}>✕</button>
            </div>
            <div className="mgrid">
              {[['lmin', 'Length (m) Min'], ['lmax', 'Length (m) Max'], ['cmin', 'Cabins Min'], ['cmax', 'Cabins Max'],
                ['bmin', 'Built Year Min'], ['bmax', 'Built Year Max'], ['kmin', 'Crew Min'], ['kmax', 'Crew Max']].map(([k, l]) => (
                <div key={k} className="mf"><label>{l}</label>
                  <input type="number" value={advDraft[k]} onChange={(e) => setAdvDraft({ ...advDraft, [k]: e.target.value })} /></div>
              ))}
            </div>
            <div className="mfoot">
              <button type="button" className="btn-clear" onClick={() => setAdvDraft(EMPTY_ADV)}>Clear All</button>
              <button type="button" className="btn-primary" onClick={() => { setAdv(advDraft); setAdvOpen(false); }}>Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FragmentRow({ y, expanded, onExpand, onOpen, regLabel, subLabel, onToggleVisible, onToggleFeatured, onDelete, onEdit }) {
  return (
    <>
      <tr className="mrow">
        <td className="chev" onClick={onExpand}>{expanded ? '▼' : '▶'}</td>
        <td>
          <div className="yname" onClick={onOpen}>
            <div className="ph" style={{ backgroundImage: `url("${y.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            {y.name}{y.is_featured && <span style={{ color: '#f5b942' }}>★</span>}
          </div>
        </td>
        <td className="muted" style={{ fontWeight: 700, letterSpacing: 1 }}>{chStr(y) || '—'}</td>
        <td>{priceTxt(y.term)}</td>
        <td>{priceTxt(y.day)}</td>
        <td>{lenTxt(y)}</td>
        <td>{y.sleeps ?? '—'}</td>
        <td>{y.cabinsN ?? '—'}</td>
        {ICON_COLUMNS.map((c) => (
          <td key={c.key} className="fc" title={y.admin_extra?.mails?.[c.key] ? `${c.label} — ${y.admin_extra.mails[c.key]}` : c.label}>
            {isCategoryOn(y, c) ? <>{c.icon} {ENV}</> : ''}
          </td>
        ))}
        <td><span className={`pill ${y.is_visible ? 'pub' : 'stock'}`} onClick={() => onToggleVisible(y)}>{y.is_visible ? 'PUBLIÉ' : 'EN STOCK'}</span></td>
        <td>
          <button type="button" className={`ic star ${y.is_featured ? 'on' : ''}`} title="Featured" onClick={() => onToggleFeatured(y)}>★</button>
          <button type="button" className="ic" title="Modifier" onClick={() => onEdit(y)}>✏️</button>
          <button type="button" className="ic del" title="Supprimer" onClick={() => onDelete(y)}>🗑️</button>
        </td>
      </tr>
      {expanded && (
        <tr className="expand">
          <td colSpan={10 + ICON_COLUMNS.length}>
            <div className="in">
              <div className="xgrid">
                <div><div className="k">Région</div><div className="v">{y.regions.map(regLabel).join(', ') || '—'}</div></div>
                <div><div className="k">Sous-région</div><div className="v">{y.sub_regions.map(subLabel).join(', ') || '—'}</div></div>
                <div><div className="k">Build Year</div><div className="v">{y.year || '—'}</div></div>
                <div><div className="k">Crew</div><div className="v">{y.crew || '—'}</div></div>
                <div><div className="k">Builder</div><div className="v">{y.make || '—'}</div></div>
                <div style={{ gridColumn: '1/-1', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', paddingTop: 6, borderTop: '1px dashed var(--border-soft)' }}>
                  <span style={{ fontSize: 10, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Suivi des envois</span>
                  {ICON_COLUMNS.map((c) => (
                    <span key={c.key} className="mailchip" title={c.label}>{c.icon} {ENV} {y.admin_extra?.mails?.[c.key] || '—'}</span>
                  ))}
                </div>
              </div>
              <div className="xact">
                <button type="button" className="btn-sec blue" onClick={onOpen}>Fiche détail</button>
                <button type="button" className="btn-sec" onClick={() => onEdit(y)}>✏️ Modifier</button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ── Fiche detail ──
function DetailPage({ y, regLabel, subLabel, regionLabels = {}, subRegionsByRegion = {}, onBack, onEdit, onToggleVisible, onSaveFiche }) {
  const [info, setInfo] = useState(null);
  const [hero, setHero] = useState(0);
  const [open, setOpen] = useState({ desc: false, spec: true });
  const [prices, setPrices] = useState(() => pricesToForm(y.custom_pricing, y.day_charter));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  // Categories charter (cases = ajout automatique a la section du site) + suivi des envois
  // + contact central agent (interne). Client 2026-11-01.
  const [catOn, setCatOn] = useState(() => {
    const o = {};
    for (const c of ADMIN_CATEGORIES) o[c.key] = isCategoryOn(y, c);
    return o;
  });
  const [mails, setMails] = useState(() => ({ ...(y.admin_extra?.mails || {}) }));
  const [ca, setCa] = useState(() => ({ ...(y.admin_extra?.ca || {}) }));
  // Regions / sous-regions du bateau (liste unique, la meme que la fenetre « Modifier »)
  // et handicaps : modifiables depuis les cases deployees Only for You / Accessible.
  const [regs, setRegs] = useState(() => ({ regions: [...(y.regions || [])], sub_regions: [...(y.sub_regions || [])] }));
  const [handis, setHandis] = useState(() => [...(y.handicaps || [])]);
  const [catsOpen, setCatsOpen] = useState(true);
  const [regsOpen, setRegsOpen] = useState(true);
  const [caOpen, setCaOpen] = useState(false);
  const [dp, setDp] = useState(null); // { key, left, top }

  useEffect(() => {
    let alive = true;
    window.scrollTo({ top: 0 });
    (async () => {
      try {
        const res = await fetch(`/api/admin/yachts/details?yacht_id=${encodeURIComponent(y.id)}`);
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (!alive) return;
        setInfo(mergeSourceAndOverrides(data.source, data.overrides));
        // Tarifs Ankor pre-remplis quand aucun tarif n'est saisi (enregistres seulement sur « Enregistrer »).
        if (!hasAnyPrice(normalizeCharterPrices(y.custom_pricing, y.day_charter)) && Array.isArray(data.ankorRates) && data.ankorRates.length) {
          setPrices(pricesToForm(data.ankorRates));
        }
      } catch {
        if (alive) setInfo({});
      }
    })();
    return () => { alive = false; };
  }, [y.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const imgs = (info?.images?.length ? info.images : (y.image ? [y.image] : [])).map((i) => getAnkorImageUrl(i, '1280w') || i);
  const save = async () => {
    setSaving(true);
    const others = (y.categories || []).filter((k) => !ADMIN_CATEGORIES.some((c) => c.key === k));
    const categories = [...others, ...ADMIN_CATEGORIES.filter((c) => c.kind === 'cat' && catOn[c.key]).map((c) => c.key)];
    await onSaveFiche(y.id, {
      custom_pricing: { version: 2, types: prices },
      categories,
      pets_allowed: !!catOn.pets,
      groups_allowed: !!catOn.group,
      admin_extra: { mails, ca },
      regions: regs.regions,
      sub_regions: regs.sub_regions,
      handicaps: handis,
    });
    setSaving(false);
    setDirty(false);
  };
  // Enveloppe = case a cocher a part (client 2026-11-01) : toujours visible, independante
  // de la case de categorie ; cochee, elle affiche la date d'envoi (mails[key], '' = sans date).
  const envTick = (key) => {
    const on = key in mails;
    return (
      <span className={`envtick ${on ? 'on' : ''}`} title="Envoi" onClick={(e) => {
        e.preventDefault(); e.stopPropagation();
        const m = { ...mails };
        if (on) delete m[key]; else m[key] = '';
        setMails(m); setDirty(true);
      }}>
        <input type="checkbox" checked={on} readOnly tabIndex={-1} />{ENV}
      </span>
    );
  };
  // Case de categorie (grille et cadre Last Minute).
  const renderCase = (c) => (
    <label key={c.key} className={`cat ${catOn[c.key] ? 'on' : ''}`}>
      <input type="checkbox" checked={!!catOn[c.key]} onChange={(e) => { setCatOn({ ...catOn, [c.key]: e.target.checked }); setDirty(true); }} />
      <span className="ico">{c.icon}</span>
      <span className="lb">{c.label}<small>{ROUTE_OF(c)}</small></span>
      {c.env && (
        <span className="suivi">
          {envTick(c.key)}
          {c.key in mails && (
            <span className="date" onClick={(e) => {
              e.preventDefault(); e.stopPropagation();
              const r = e.currentTarget.getBoundingClientRect();
              setDp({ key: c.key, left: r.left, top: r.bottom + 6 });
            }}><span style={{ marginRight: 4 }}>📅</span>{mails[c.key] || '—'}</span>
          )}
        </span>
      )}
    </label>
  );
  const nbOn = ADMIN_CATEGORIES.filter((c) => catOn[c.key]).length;
  const kv = (k, v) => (v ? <div className="kv" key={k}><span className="k">{k}</span><span className="v">{v}</span></div> : null);
  const i = info || {};

  return (
    <div style={{ display: 'block' }}>
      <button type="button" className="btn-back" onClick={onBack}>← Retour à la liste</button>
      <div className="d-head">
        <div>
          <h2>{y.name}</h2>
          <div className="sub">{[...y.sub_regions.map(subLabel), ...y.regions.map(regLabel)].join(' · ')}</div>
          {y.is_featured && <div style={{ marginTop: 8 }}><span className="badge-ev">★ FEATURED</span></div>}
        </div>
        <div className="d-actions">
          <button type="button" className="btn-primary" onClick={() => onEdit(y)}>✏️ Modifier</button>
          <button type="button" className="btn-sec" onClick={() => onToggleVisible(y)}>{y.is_visible ? 'Publié sur le site' : 'Cacher'}</button>
        </div>
      </div>
      <div className="hero" style={imgs[hero] ? { backgroundImage: `url("${imgs[hero]}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined} />
      {imgs.length > 1 && (
        <div className="thumbs">
          {imgs.slice(0, 8).map((src, k) => (
            <div key={k} onClick={() => setHero(k)} style={{ backgroundImage: `url("${src}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          ))}
        </div>
      )}
      <div className="kbar">
        {(y.lenM || i.length) && <div className="it"><span>{y.lenM ? `${y.lenM}m/${y.lenFt}ft` : i.length}</span></div>}
        {(y.sleeps || i.guests) && <div className="it"><span>{y.sleeps || i.guests} guests</span></div>}
        {i.cruiseSpeed && <div className="it"><span>{i.cruiseSpeed} kn</span></div>}
      </div>

      {i.description && (
        <div className={`acc ${open.desc ? 'open' : ''}`}>
          <div className="ah" onClick={() => setOpen((o) => ({ ...o, desc: !o.desc }))}>Description <span>{open.desc ? '▲' : '▼'}</span></div>
          <div className="ab" style={{ whiteSpace: 'pre-line' }}>{i.description}</div>
        </div>
      )}
      <div className={`acc ${open.spec ? 'open' : ''}`}>
        <div className="ah" onClick={() => setOpen((o) => ({ ...o, spec: !o.spec }))}>Specifications <span>{open.spec ? '▲' : '▼'}</span></div>
        <div className="ab">
          {!info ? 'Chargement…' : (
            <div className="two">
              <div>
                {kv('Type', i.type)}
                {kv('Sleeps', i.guests)}
                {kv('Crew', i.crew)}
                {kv('Builder', i.make)}
                {kv('Model', i.model)}
                {kv('Build Year', i.year)}
                {kv('Refit Year', i.refit)}
                {kv('Base Port', i.location)}
              </div>
              <div>
                {kv('Top Speed', i.topSpeed && `${i.topSpeed} kn`)}
                {kv('Cruising Speed', i.cruiseSpeed && `${i.cruiseSpeed} kn`)}
                {kv('Engines', i.engines)}
                {kv('Total cabins', i.cabins)}
                {kv('Length / Beam', [i.length && `${i.length}m`, i.beam && `${i.beam}m`].filter(Boolean).join(' / '))}
                {kv('Draft', i.draft && `${i.draft}m`)}
                {kv('Hull', i.hullConstruction)}
                {kv('Tonnage', i.tonnage)}
              </div>
            </div>
          )}
        </div>
      </div>

      <CharterPricesEditor value={prices} onChange={(v) => { setPrices(v); setDirty(true); }} />

      {/* Categories Charter — case cochee = ajout automatique a la section du site */}
      <div className={`acc ${catsOpen ? 'open' : ''}`}>
        <div className="ah" onClick={() => setCatsOpen((o) => !o)}>
          <span>🏷️ Categories Charter — site sections</span>
          <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span className="tagcount">{nbOn} cochée(s)</span><span className="fl">▼</span></span>
        </div>
        <div className="ab">
          <div className="catgrid">
            {ADMIN_CATEGORIES.filter((c) => !SUB_OF[c.key] && !OWN_FRAME.has(c.key)).map((c) => (
              <Fragment key={c.key}>
              {renderCase(c)}
              {/* Only for You / Accessible : case deployee (sous-categories), client 2026-11-01 */}
              {catOn[c.key] && (c.key === 'only-for-you' || c.key === 'accessible') && (
                <div className="catx">
                  {c.key === 'only-for-you' && (
                    <div className="catx-b">
                      <div className="catx-t">Sous-catégories</div>
                      <div className="catx-g">
                        {ADMIN_CATEGORIES.filter((s) => SUB_OF[s.key] === 'only-for-you').map((s) => (
                          <label key={s.key} className={`chk ${catOn[s.key] ? 'on' : ''}`}>
                            <input type="checkbox" checked={!!catOn[s.key]} onChange={(e) => { setCatOn({ ...catOn, [s.key]: e.target.checked }); setDirty(true); }} />
                            {s.icon ? `${s.icon} ` : ''}{s.label}
                            {s.env && envTick(s.key)}
                            {s.env && s.key in mails && (
                              <span className="date" onClick={(e) => {
                                e.preventDefault(); e.stopPropagation();
                                const r = e.currentTarget.getBoundingClientRect();
                                setDp({ key: s.key, left: r.left, top: r.bottom + 6 });
                              }}>📅 {mails[s.key] || '—'}</span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  {c.key === 'accessible' && (
                    <div className="catx-b">
                      <div className="catx-t">Sous-catégories — handicaps accommodés</div>
                      {HANDICAPS_BY_CAT.map((sec) => (
                        <div key={sec.id} className="catx-sec">
                          <div className="catx-st">{sec.label}</div>
                          <div className="catx-g">
                            {sec.items.map((h) => {
                              const on = handis.includes(h.id);
                              return (
                                <label key={h.id} className={`chk ${on ? 'on' : ''}`}>
                                  <input type="checkbox" checked={on} onChange={() => { setHandis(on ? handis.filter((x) => x !== h.id) : [...handis, h.id]); setDirty(true); }} />
                                  {h.type}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              </Fragment>
            ))}
          </div>
          <div className="note">Case cochée = ajout automatique à la section. ✉ + 📅 = date du dernier envoi (clic, aucune saisie). 👻 présente sans section.</div>
        </div>
      </div>
      {/* Last Minute Charter — cadre a part (client 2026-11-01) */}
      <div className="acc open">
        <div className="ah"><span>⌚ Last Minute Charter</span></div>
        <div className="ab">
          <div className="catgrid">
            {ADMIN_CATEGORIES.filter((c) => OWN_FRAME.has(c.key)).map((c) => renderCase(c))}
          </div>
        </div>
      </div>

      {/* Regions et sous-regions du bateau — cadre a part (client 2026-11-01). Meme liste
          que la fenetre « Modifier » : le bateau apparait sur chaque zone cochee. */}
      <div className={`acc ${regsOpen ? 'open' : ''}`}>
        <div className="ah" onClick={() => setRegsOpen((o) => !o)}>
          <span>🌍 Régions et sous-régions</span>
          <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span className="tagcount">{regs.regions.length + regs.sub_regions.length} cochée(s)</span><span className="fl">▼</span></span>
        </div>
        <div className="ab">
          <div className="catx-b regframe">
            <div className="catx-g">
              {Object.entries(regionLabels).map(([rid, rl]) => {
                const on = regs.regions.includes(rid);
                const subs = subRegionsByRegion[rid] || [];
                return (
                  <div key={rid} className={on && subs.length ? 'catx-full' : ''}>
                    <label className={`chk ${on ? 'on' : ''}`}>
                      <input type="checkbox" checked={on} onChange={() => {
                        // Region decochee -> ses sous-regions aussi (comme la fenetre « Modifier »).
                        setRegs(on
                          ? { regions: regs.regions.filter((r) => r !== rid), sub_regions: regs.sub_regions.filter((sr) => !subs.includes(sr)) }
                          : { ...regs, regions: [...regs.regions, rid] });
                        setDirty(true);
                      }} />
                      {rl}
                    </label>
                    {on && subs.length > 0 && (
                      <div className="catx-g catx-subs">
                        {subs.map((sid) => {
                          const son = regs.sub_regions.includes(sid);
                          return (
                            <label key={sid} className={`chk ${son ? 'on' : ''}`}>
                              <input type="checkbox" checked={son} onChange={() => {
                                setRegs({ ...regs, sub_regions: son ? regs.sub_regions.filter((x) => x !== sid) : [...regs.sub_regions, sid] });
                                setDirty(true);
                              }} />
                              {subLabel(sid)}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {dp && (
        <DatePicker at={dp} onClose={() => setDp(null)}
          onPick={(d) => { setMails({ ...mails, [dp.key]: d }); setDirty(true); setDp(null); }}
          onClear={() => { setMails({ ...mails, [dp.key]: '' }); setDirty(true); setDp(null); }} />
      )}

      {/* Contact du central agent — section repliee, sans titre, strictement interne */}
      <div className={`acc ${caOpen ? 'open' : ''}`}>
        <div className="ah" onClick={() => setCaOpen((o) => !o)}><span /><span className="fl">▼</span></div>
        <div className="ab">
          <div className="priv-note">⛔ Jamais publié pour les clients sur le site — interne uniquement.</div>
          {[['name', '👤 Name'], ['company', '🏢 Company'], ['location', '📍 Location'], ['phone', '📞 Phone'], ['website', '🌐 Website']].map(([k, l]) => (
            <div key={k} className="kv"><span className="k">{l}</span>
              <input value={ca[k] || ''} onChange={(e) => { setCa({ ...ca, [k]: e.target.value }); setDirty(true); }} /></div>
          ))}
        </div>
      </div>

      <div className="mfoot" style={{ justifyContent: 'flex-end' }}>
        <button type="button" className="btn-primary" disabled={saving || !dirty} style={!dirty ? { opacity: 0.5 } : undefined} onClick={save}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  );
}
