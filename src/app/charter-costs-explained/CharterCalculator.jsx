'use client';

// Calculateur interactif des coûts d'un charter de yacht.
// Couleurs Qualityacht: fond #26272a, cards #3a3b3f, accent #c2622a (orange brûlé clair),
// CTA #B03E00, texte lavande #acb0cd, secondaire cococo #C0C0C0.

import { useEffect, useMemo, useState } from 'react';

const COUNTRIES = [
  { name: 'Greece', region: 'Mediterranean', rate: 13 },
  { name: 'Italy', region: 'Mediterranean', rate: 22 },
  { name: 'France', region: 'Mediterranean', rate: 20 },
  { name: 'Spain', region: 'Mediterranean', rate: 21 },
  { name: 'Croatia', region: 'Mediterranean', rate: 13 },
  { name: 'Montenegro', region: 'Mediterranean', rate: 21 },
  { name: 'Turkey', region: 'Mediterranean', rate: 18 },
  { name: 'Malta', region: 'Mediterranean', rate: 18 },
  { name: 'Portugal', region: 'Mediterranean', rate: 20 },
  { name: 'Cyprus', region: 'Mediterranean', rate: 19 },
  { name: 'Slovenia', region: 'Mediterranean', rate: 22 },
  { name: 'Albania', region: 'Mediterranean', rate: 20 },
  { name: 'Monaco', region: 'Mediterranean', rate: 20 },
  { name: 'Netherlands', region: 'Northern Europe', rate: 21 },
  { name: 'Denmark', region: 'Northern Europe', rate: 25 },
  { name: 'Norway', region: 'Northern Europe', rate: 25 },
  { name: 'Sweden', region: 'Northern Europe', rate: 25 },
  { name: 'Finland', region: 'Northern Europe', rate: 24 },
  { name: 'Germany', region: 'Northern Europe', rate: 19 },
  { name: 'Belgium', region: 'Northern Europe', rate: 21 },
  { name: 'United Kingdom', region: 'Northern Europe', rate: 20 },
  { name: 'Ireland', region: 'Northern Europe', rate: 13.5 },
  { name: 'Canary Islands', region: 'Atlantic / Spain', rate: 7 },
  { name: 'Azores', region: 'Atlantic / Portugal', rate: 18 },
  { name: 'Madeira', region: 'Atlantic / Portugal', rate: 22 },
  { name: 'Bahamas', region: 'Caribbean', rate: 0 },
  { name: 'BVI', region: 'Caribbean', rate: 0 },
  { name: 'USVI', region: 'Caribbean', rate: 0 },
  { name: 'St. Martin', region: 'Caribbean', rate: 0 },
  { name: 'Antigua', region: 'Caribbean', rate: 0 },
  { name: 'St. Barts', region: 'Caribbean', rate: 0 },
  { name: 'Grenada', region: 'Caribbean', rate: 0 },
  { name: 'St. Lucia', region: 'Caribbean', rate: 0 },
  { name: 'Martinique', region: 'Caribbean', rate: 8.5 },
  { name: 'Guadeloupe', region: 'Caribbean', rate: 8.5 },
  { name: 'Thailand', region: 'Asia Pacific', rate: 7 },
  { name: 'Indonesia / Bali', region: 'Asia Pacific', rate: 11 },
  { name: 'Maldives', region: 'Asia Pacific', rate: 16 },
  { name: 'Australia', region: 'Asia Pacific', rate: 10 },
  { name: 'New Zealand', region: 'Asia Pacific', rate: 15 },
  { name: 'United Arab Emirates', region: 'Middle East', rate: 5 },
  { name: 'Oman', region: 'Middle East', rate: 5 },
  { name: 'Saudi Arabia', region: 'Middle East', rate: 15 },
  { name: 'South Africa', region: 'Africa', rate: 15 },
  { name: 'Seychelles', region: 'Africa', rate: 15 },
  { name: 'Mauritius', region: 'Africa', rate: 15 },
  { name: 'Mozambique', region: 'Africa', rate: 17 },
];

const SIM_DESTINATIONS = [
  { name: 'Caribbean (BVI, Bahamas)', rate: 0 },
  { name: 'Greece', rate: 13 },
  { name: 'Croatia', rate: 13 },
  { name: 'France / Monaco', rate: 20 },
  { name: 'Italy', rate: 22 },
  { name: 'Spain', rate: 21 },
  { name: 'Turkey', rate: 18 },
  { name: 'Maldives', rate: 16 },
  { name: 'UAE', rate: 5 },
  { name: 'Thailand', rate: 7 },
  { name: 'Seychelles', rate: 15 },
];

const fmt = (v) => '$' + Math.round(v).toLocaleString('en-US');

function Slider({ min, max, step, value, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(+e.target.value)}
      className="flex-1 h-1 rounded appearance-none cursor-pointer focus:outline-none"
      style={{ background: `linear-gradient(to right, #B03E00 0%, #B03E00 ${pct}%, #26272a ${pct}%)` }}
    />
  );
}

function Toggle({ checked, onChange, id }) {
  return (
    <label htmlFor={id} className="relative inline-block w-9 h-5 cursor-pointer shrink-0">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="opacity-0 w-0 h-0" />
      <span className={`absolute inset-0 rounded-full transition-all border ${checked ? 'border-[#C0C0C0]' : 'border-[#C0C0C0]/30'}`}
            style={{ background: '#26272a' }}>
        <span className={`absolute top-[3px] w-3 h-3 rounded-full transition-all ${checked ? 'left-[19px] bg-[#C0C0C0]' : 'left-[3px] bg-[#C0C0C0]/70'}`} />
      </span>
    </label>
  );
}

export default function CharterCalculator() {
  const [charter, setCharter] = useState(80000);
  const [apaPct, setApaPct] = useState(30);
  const [vatOn, setVatOn] = useState(false);
  const [vatTab, setVatTab] = useState('country'); // 'country' | 'manual'
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [vatPctManual, setVatPctManual] = useState(10);
  const [depositPct, setDepositPct] = useState(10);
  const [tipPct, setTipPct] = useState(10);
  const [repoOn, setRepoOn] = useState(false);
  const [repo, setRepo] = useState(10000);
  const [search, setSearch] = useState('');

  const vatRate = useMemo(() => {
    if (!vatOn) return 0;
    if (vatTab === 'country' && selectedCountry !== null) return COUNTRIES[selectedCountry].rate;
    return vatPctManual;
  }, [vatOn, vatTab, selectedCountry, vatPctManual]);

  const apa = charter * apaPct / 100;
  const vat = vatOn ? charter * vatRate / 100 : 0;
  const deposit = charter * depositPct / 100;
  const tip = charter * tipPct / 100;
  const upfront = charter + apa + vat + (repoOn ? repo : 0);
  const total = upfront + deposit;

  const filteredCountries = useMemo(() => {
    const f = search.toLowerCase();
    if (!f) return COUNTRIES.map((c, i) => ({ ...c, idx: i }));
    return COUNTRIES.map((c, i) => ({ ...c, idx: i })).filter(
      (c) => c.name.toLowerCase().includes(f) || c.region.toLowerCase().includes(f)
    );
  }, [search]);

  return (
    <div className="space-y-6">
      {/* ══ CHARTER PARAMETERS ══ */}
      <div className="rounded-xl border border-[#C0C0C0]/40 bg-[#3a3b3f] p-6 md:p-8">
        <div className="flex items-center justify-center mb-6">
          <span className="text-[10px] tracking-[0.15em] uppercase text-[#c2622a]">Charter Parameters</span>
        </div>

        <Row label="Charter Fee (per week)" hint="Vessel, captain & crew, standard equipment" value={fmt(charter)}>
          <Slider min={20000} max={500000} step={5000} value={charter} onChange={setCharter} />
        </Row>

        <Row label="APA Rate" hint="Advance Provisioning Allowance" value={`${apaPct}%`}>
          <Slider min={25} max={35} step={1} value={apaPct} onChange={setApaPct} />
        </Row>

        <Divider />

        {/* VAT toggle */}
        <div className="flex items-center gap-3 mb-4">
          <Toggle id="vat-toggle" checked={vatOn} onChange={setVatOn} />
          <label htmlFor="vat-toggle" className="text-sm text-[#acb0cd] cursor-pointer">
            Sales Tax / VAT
          </label>
        </div>

        {vatOn && (
          <div className="mb-2">
            <div className="flex border-b border-[#C0C0C0]/20 mb-5">
              {[['country', 'Select by Country'], ['manual', 'Manual Rate']].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setVatTab(key)}
                  className={`text-[11px] tracking-wider uppercase px-4 py-2 -mb-px border-b-2 transition-colors ${vatTab === key ? 'text-[#c2622a] border-[#C0C0C0]' : 'text-[#acb0cd]/60 border-transparent hover:text-[#acb0cd]'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {vatTab === 'country' && (
              <div>
                {selectedCountry !== null && (
                  <div className="flex items-center justify-between rounded border border-[#C0C0C0] px-4 py-2.5 mb-3">
                    <div>
                      <div className="text-sm text-[#c2622a]">{COUNTRIES[selectedCountry].name}</div>
                      <div className="text-[11px] text-[#acb0cd]/60 mt-0.5">{COUNTRIES[selectedCountry].region}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-base text-[#c2622a]">{COUNTRIES[selectedCountry].rate > 0 ? COUNTRIES[selectedCountry].rate + '%' : 'Exempt (0%)'}</span>
                      <button type="button" onClick={() => setSelectedCountry(null)} className="text-[11px] text-[#acb0cd]/60 underline hover:text-[#c2622a]">
                        Clear
                      </button>
                    </div>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Search country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-sm bg-[#26272a] border border-[#C0C0C0]/30 rounded px-3 py-2 text-[#acb0cd] placeholder-[#acb0cd]/30 outline-none focus:border-[#C0C0C0] mb-3"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-72 overflow-y-auto pr-1">
                  {filteredCountries.map((c) => (
                    <button
                      key={c.idx}
                      type="button"
                      onClick={() => setSelectedCountry(c.idx)}
                      className={`flex items-center justify-between px-3 py-2 rounded border text-left transition-all ${selectedCountry === c.idx ? 'border-[#C0C0C0] bg-white/[0.02]' : 'border-[#C0C0C0]/15 bg-white/[0.02] hover:border-[#C0C0C0]/40'}`}
                    >
                      <div>
                        <div className="text-xs text-[#acb0cd]">{c.name}</div>
                        <div className="text-[10px] text-[#acb0cd]/50 mt-0.5">{c.region}</div>
                      </div>
                      <div className="text-sm text-[#c2622a]">{c.rate > 0 ? c.rate + '%' : 'Exempt'}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {vatTab === 'manual' && (
              <Row label="Custom VAT Rate" hint="Enter destination rate manually" value={`${vatPctManual}%`}>
                <Slider min={1} max={25} step={1} value={vatPctManual} onChange={setVatPctManual} />
              </Row>
            )}
          </div>
        )}

        <Divider />

        <Row label="Security Deposit" hint="Refundable — returned post-charter" value={`${depositPct}%`}>
          <Slider min={5} max={25} step={1} value={depositPct} onChange={setDepositPct} />
        </Row>

        <Row label="Crew Gratuity" hint="Industry standard: 10–15% of charter fee" value={`${tipPct}%`}>
          <Slider min={10} max={15} step={1} value={tipPct} onChange={setTipPct} />
        </Row>

        <Divider />

        <div className="flex items-center gap-3 mb-4">
          <Toggle id="repo-toggle" checked={repoOn} onChange={setRepoOn} />
          <label htmlFor="repo-toggle" className="text-sm text-[#acb0cd] cursor-pointer">Delivery & Repositioning Fee</label>
        </div>

        {repoOn && (
          <Row label="Repositioning Cost" hint="Fuel, crew transit, port fees" value={fmt(repo)}>
            <Slider min={1000} max={50000} step={500} value={repo} onChange={setRepo} />
          </Row>
        )}
      </div>

      {/* ══ COST SUMMARY ══ */}
      <div className="rounded-xl border border-[#C0C0C0]/40 bg-[#3a3b3f] p-6 md:p-8">
        <div className="flex items-center justify-center mb-6">
          <span className="text-[10px] tracking-[0.15em] uppercase text-[#c2622a]">Cost Summary</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Metric label="Total Due Upfront" value={fmt(upfront)} />
          <Metric label="APA Budget" value={fmt(apa)} />
          <Metric label="Refundable Deposit" value={fmt(deposit)} />
          <Metric label="Crew Gratuity" value={fmt(tip)} />
        </div>

        <table className="w-full">
          <tbody>
            <BreakdownRow label="Charter Fee" value={fmt(charter)} />
            <BreakdownRow label="Advance Provisioning Allowance (APA)" value={fmt(apa)} />
            {vatOn && (
              <BreakdownRow
                label={selectedCountry !== null ? `VAT — ${COUNTRIES[selectedCountry].name}` : 'Sales Tax / VAT'}
                value={fmt(vat)}
              />
            )}
            {repoOn && <BreakdownRow label="Delivery & Repositioning" value={fmt(repo)} />}
            <BreakdownRow label="Security Deposit (fully refundable)" value={fmt(deposit)} italic />
            <tr className="border-t border-[#C0C0C0]">
              <td className="text-[11px] uppercase tracking-wider text-[#c2622a] pt-4 pb-2">Estimated Total Commitment</td>
              <td className="text-right text-sm text-[#c2622a] pt-4 pb-2">{fmt(total)}</td>
            </tr>
          </tbody>
        </table>

        <p className="text-[11px] italic text-[#acb0cd]/50 mt-4">
          Excludes refundable deposit and crew gratuity. Any unused APA balance is returned at charter conclusion.
        </p>
      </div>

      {/* ══ SIMULATION TABLE ══ */}
      <div className="rounded-xl border border-[#C0C0C0]/40 bg-[#3a3b3f] p-6 md:p-8">
        <div className="flex items-center justify-center mb-3">
          <span className="text-[10px] tracking-[0.15em] uppercase text-[#c2622a]">Multi-Destination VAT Simulation</span>
        </div>
        <p className="text-xs text-[#acb0cd]/60 mb-5">
          Total charter cost across key destinations — based on your current parameters. Highlighted row = active selection.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#C0C0C0]/20">
                <th className="text-left text-[10px] tracking-wider uppercase text-[#acb0cd]/60 py-2 pr-3">Destination</th>
                <th className="text-right text-[10px] tracking-wider uppercase text-[#acb0cd]/60 py-2 px-3">VAT Rate</th>
                <th className="text-right text-[10px] tracking-wider uppercase text-[#acb0cd]/60 py-2 px-3">VAT Amount</th>
                <th className="text-right text-[10px] tracking-wider uppercase text-[#acb0cd]/60 py-2 px-3">Charter + APA</th>
                <th className="text-right text-[10px] tracking-wider uppercase text-[#acb0cd]/60 py-2 pl-3">Total (excl. deposit)</th>
              </tr>
            </thead>
            <tbody>
              {SIM_DESTINATIONS.map((d) => {
                const vatAmt = charter * d.rate / 100;
                const baseNoVat = charter + apa;
                const totalRow = baseNoVat + vatAmt;
                const isCurrent = vatOn && Math.abs(d.rate - vatRate) < 0.01;
                return (
                  <tr key={d.name} className={`border-t border-[#C0C0C0]/10 ${isCurrent ? 'bg-white/5' : ''}`}>
                    <td className={`py-2.5 pr-3 ${isCurrent ? 'text-[#c2622a]' : 'text-[#acb0cd]'}`}>
                      {d.name}
                      {isCurrent && (
                        <span className="ml-2 text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#C0C0C0]/15 text-[#c2622a]">Selected</span>
                      )}
                    </td>
                    <td className={`py-2.5 px-3 text-right ${isCurrent ? 'text-[#c2622a]' : 'text-[#acb0cd]/70'}`}>{d.rate > 0 ? d.rate + '%' : '—'}</td>
                    <td className={`py-2.5 px-3 text-right ${isCurrent ? 'text-[#c2622a]' : 'text-[#acb0cd]/70'}`}>{d.rate > 0 ? fmt(vatAmt) : 'Exempt'}</td>
                    <td className={`py-2.5 px-3 text-right ${isCurrent ? 'text-[#c2622a]' : 'text-[#acb0cd]/70'}`}>{fmt(baseNoVat)}</td>
                    <td className={`py-2.5 pl-3 text-right ${isCurrent ? 'text-[#c2622a]' : 'text-[#acb0cd]'}`}>{fmt(totalRow)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* style hack pour thumb des sliders (cross-browser) */}
      <style jsx global>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px;
          height: 10px;
          background: #B03E00;
          border-radius: 2px;
          transform: rotate(45deg);
          cursor: pointer;
          border: 1px solid #C0C0C0;
        }
        input[type=range]::-moz-range-thumb {
          width: 10px;
          height: 10px;
          background: #B03E00;
          border-radius: 2px;
          transform: rotate(45deg);
          cursor: pointer;
          border: 1px solid #C0C0C0;
        }
      `}</style>
    </div>
  );
}

function Row({ label, hint, value, children }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">
      <div className="w-full md:w-60 shrink-0">
        <div className="text-sm text-[#acb0cd]">{label}</div>
        {hint && <div className="text-[11px] text-[#acb0cd]/50 italic mt-0.5">{hint}</div>}
      </div>
      {children}
      <span className="w-24 text-right text-sm text-[#c2622a]">{value}</span>
    </div>
  );
}

function Divider() {
  return <hr className="border-t border-[#C0C0C0]/15 my-5" />;
}

function Metric({ label, value }) {
  return (
    <div className="rounded border border-[#C0C0C0] px-4 py-3 text-center">
      <div className="text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1.5">{label}</div>
      <div className="text-base md:text-lg text-[#c2622a]">{value}</div>
    </div>
  );
}

function BreakdownRow({ label, value, italic = false }) {
  return (
    <tr className="border-t border-[#C0C0C0]/10 first:border-t-0">
      <td className={`py-2.5 text-sm ${italic ? 'italic text-[#acb0cd]/60' : 'text-[#acb0cd]'}`}>{label}</td>
      <td className="py-2.5 text-right text-sm text-[#acb0cd]">{value}</td>
    </tr>
  );
}
