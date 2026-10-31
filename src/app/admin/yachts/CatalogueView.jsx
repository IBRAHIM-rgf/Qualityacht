'use client';

// ══ Catalogue des yachts — design « Calque Central Agent » (client 2026-10-31, etape 1) ══
// Filtres, barre d'outils, vues Table / Cards, fiche detail (avec les fiches de tarifs).
// Branche sur les vrais bateaux de la base. Elements prevus a l'etape 2 (non affiches
// tant que leurs donnees n'existent pas) : disponibilites / Timeline / calendrier,
// contact du central agent, colonnes d'emails, brochure / pieces jointes.

import { useEffect, useMemo, useState } from 'react';
import { getAnkorImageUrl } from '@/lib/utils';
import { normalizeCharterPrices, formatPriceAmount, hasAnyPrice } from '@/lib/charterPrices';
import { mergeSourceAndOverrides } from '@/lib/yachtOverrides';
import CharterPricesEditor, { pricesToForm } from './CharterPricesEditor';

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
  yachts: rawList, pubOnly, stateFilter, setStateFilter, regionLabels, subRegionLabels,
  onToggleVisible, onToggleFeatured, onDelete, onEdit, onSavePricing,
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
        onEdit={onEdit} onToggleVisible={onToggleVisible} onSavePricing={onSavePricing} />
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
                <th>Length</th><th>Sleeps</th><th>Cabins</th><th>Statut</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (<tr><td colSpan={10} className="empty">Aucun yacht ne correspond aux filtres.</td></tr>)}
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
        <td><span className={`pill ${y.is_visible ? 'pub' : 'stock'}`} onClick={() => onToggleVisible(y)}>{y.is_visible ? 'PUBLIÉ' : 'EN STOCK'}</span></td>
        <td>
          <button type="button" className={`ic star ${y.is_featured ? 'on' : ''}`} title="Featured" onClick={() => onToggleFeatured(y)}>★</button>
          <button type="button" className="ic" title="Modifier" onClick={() => onEdit(y)}>✏️</button>
          <button type="button" className="ic del" title="Supprimer" onClick={() => onDelete(y)}>🗑️</button>
        </td>
      </tr>
      {expanded && (
        <tr className="expand">
          <td colSpan={10}>
            <div className="in">
              <div className="xgrid">
                <div><div className="k">Région</div><div className="v">{y.regions.map(regLabel).join(', ') || '—'}</div></div>
                <div><div className="k">Sous-région</div><div className="v">{y.sub_regions.map(subLabel).join(', ') || '—'}</div></div>
                <div><div className="k">Build Year</div><div className="v">{y.year || '—'}</div></div>
                <div><div className="k">Crew</div><div className="v">{y.crew || '—'}</div></div>
                <div><div className="k">Builder</div><div className="v">{y.make || '—'}</div></div>
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
function DetailPage({ y, regLabel, subLabel, onBack, onEdit, onToggleVisible, onSavePricing }) {
  const [info, setInfo] = useState(null);
  const [hero, setHero] = useState(0);
  const [open, setOpen] = useState({ desc: false, spec: true });
  const [prices, setPrices] = useState(() => pricesToForm(y.custom_pricing, y.day_charter));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

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
    await onSavePricing(y.id, { version: 2, types: prices });
    setSaving(false);
    setDirty(false);
  };
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
      <div className="mfoot" style={{ justifyContent: 'flex-end' }}>
        <button type="button" className="btn-primary" disabled={saving || !dirty} style={!dirty ? { opacity: 0.5 } : undefined} onClick={save}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  );
}
