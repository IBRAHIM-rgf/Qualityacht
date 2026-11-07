'use client';

// Fiches de tarifs par type de charter (client 2026-10-31), au design « Calque Central
// Agent » de l'admin (classes de admin-calque.css). 5 onglets, meme structure :
// 02 — RATES, Included / Extras, Taxes & Gratuity. Donnees : lib/charterPrices.js.
// Utilise dans la fiche detail et dans la modale « Modifier ».

import { useState } from 'react';
import {
  CHARTER_TYPES, RATE_PERIODS, RATE_TITLES_1, RATE_TITLES_2, RATE_CURRENCIES, RATE_UNITS,
  TAX_FIELDS, defaultUnitFor, normalizeCharterPrices, HOURS_CHOICES, cleanPriceInput,
} from '@/lib/charterPrices';

function emptyRateFor(typeKey) {
  return { period: 'Summer', title1: '', title2: '', subtitle: '', price: '', currency: 'EUR', unit: defaultUnitFor(typeKey), zones: '', apa: false, vat: false };
}

/** Valeur stockee (ou anciennes donnees) -> formulaire (textes le temps de la saisie). */
export function pricesToForm(raw, legacyDayRaw = null) {
  const n = normalizeCharterPrices(raw, legacyDayRaw);
  const out = {};
  for (const t of CHARTER_TYPES) {
    const v = n[t.key];
    out[t.key] = {
      rates: v.rates.map((r) => ({ ...r, price: String(r.price), zones: r.zones.join(', ') })),
      included: v.included.join('; '),
      extras: v.extras.join('; '),
      taxes: { ...v.taxes },
    };
  }
  return out;
}

function Chips({ options, value, onChange, allowNone }) {
  return (
    <div className="pr-chips">
      {options.map((o) => (
        <span key={o} className={`cal-chip ${value === o ? 'on' : ''}`}
          onClick={() => onChange(value === o && allowNone ? '' : o)}>{o}</span>
      ))}
    </div>
  );
}

function RateCard({ r, index, typeKey, onChange, onRemove }) {
  const set = (patch) => onChange({ ...r, ...patch });
  return (
    <div className="pr-card">
      <div className="pr-card-h">
        <span className="pr-pill">Rate {index + 1}</span>
        <button type="button" className="ic del" onClick={onRemove} title="Remove">✕</button>
      </div>
      <div className="mf">
        <label>Period</label>
        <select value={r.period || 'Summer'} onChange={(e) => set({ period: e.target.value })}>
          {RATE_PERIODS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="mf">
        <label>Title — 1 (required)</label>
        <Chips options={RATE_TITLES_1} value={r.title1} onChange={(title1) => set({ title1, legacyTitle: '' })} />
        {!r.title1 && r.legacyTitle && <span className="pr-note">« {r.legacyTitle} »</span>}
      </div>
      <div className="mf">
        <label>Title — 2 (Region)</label>
        <Chips options={RATE_TITLES_2} value={r.title2} onChange={(title2) => set({ title2 })} allowNone />
      </div>
      <div className="mf">
        <label>Sub-title (optional)</label>
        <input value={r.subtitle || ''} onChange={(e) => set({ subtitle: e.target.value })} placeholder="May" />
      </div>
      {typeKey === 'hours' && (
        <div className="mf">
          <label>Hours</label>
          {/* Nombre d'heures, de 1 h a 10 h (client 2026-11-07). */}
          <Chips options={HOURS_CHOICES.map((h) => `${h} h`)} value={r.hours ? `${r.hours} h` : ''}
            onChange={(v) => set({ hours: v ? Number(v.replace(' h', '')) : '' })} allowNone />
        </div>
      )}
      <div className="pr-row3">
        <div className="mf">
          <label>Price</label>
          {/* Montant colle : sans virgule, sans point, sans centimes (client 2026-11-07). */}
          <input type="text" inputMode="numeric" value={r.price ?? ''} onChange={(e) => set({ price: cleanPriceInput(e.target.value) })} />
        </div>
        <div className="mf">
          <label>Currency</label>
          <select value={r.currency || 'EUR'} onChange={(e) => set({ currency: e.target.value })}>
            {RATE_CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
          </select>
        </div>
        <div className="mf">
          <label>Unit</label>
          <select value={r.unit || defaultUnitFor(typeKey)} onChange={(e) => set({ unit: e.target.value })}>
            {RATE_UNITS.map((u) => <option key={u.code} value={u.code}>{u.label}</option>)}
          </select>
        </div>
      </div>
      <div className="mf">
        <label>Zones (comma-separated)</label>
        <input value={r.zones || ''} onChange={(e) => set({ zones: e.target.value })} />
      </div>
      <div className="pr-checks">
        <label><input type="checkbox" checked={!!r.apa} onChange={(e) => set({ apa: e.target.checked })} />+ APA <span className="h">(excluded, shown on the card)</span></label>
        <label><input type="checkbox" checked={!!r.vat} onChange={(e) => set({ vat: e.target.checked })} />+ VAT <span className="h">(excluded, shown on the card)</span></label>
      </div>
    </div>
  );
}

export default function CharterPricesEditor({ value, onChange }) {
  const [tab, setTab] = useState(CHARTER_TYPES[0].key);
  const cur = value[tab];
  const setCur = (patch) => onChange({ ...value, [tab]: { ...cur, ...patch } });
  const rates = cur.rates;
  return (
    <div className="pr-box">
      <div className="pr-tabs">
        {CHARTER_TYPES.map((t) => (
          <div key={t.key} className={`tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
            <div className="n">{t.label}</div>
          </div>
        ))}
      </div>
      <div className="pr-sh">02 — Rates <span className="cnt">{rates.length} rate(s)</span></div>
      <div className="pr-cards">
        {rates.map((r, i) => (
          <RateCard key={i} r={r} index={i} typeKey={tab}
            onChange={(nr) => setCur({ rates: rates.map((x, idx) => (idx === i ? nr : x)) })}
            onRemove={() => setCur({ rates: rates.filter((_, idx) => idx !== i) })} />
        ))}
      </div>
      <button type="button" className="btn-primary pr-add" onClick={() => setCur({ rates: [...rates, emptyRateFor(tab)] })}>+ Add a rate</button>
      <div className="pr-cards">
        <div className="pr-card">
          <div className="pr-sh" style={{ marginBottom: 0 }}>Included / Extras</div>
          <div className="mf"><label>✔ Included (separated by ;)</label>
            <textarea value={cur.included} onChange={(e) => setCur({ included: e.target.value })} /></div>
          <div className="mf"><label>+ Extras (separated by ;)</label>
            <textarea value={cur.extras} onChange={(e) => setCur({ extras: e.target.value })} /></div>
        </div>
        <div className="pr-card">
          <div className="pr-sh" style={{ marginBottom: 0 }}>Taxes &amp; Gratuity</div>
          {TAX_FIELDS.map((tf) => (
            <div key={tf.key} className="pr-tax">
              <span>{tf.label} :</span>
              <input type="text" inputMode="decimal" value={cur.taxes[tf.key] ?? ''}
                onChange={(e) => setCur({ taxes: { ...cur.taxes, [tf.key]: e.target.value } })} />
              <span>%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
