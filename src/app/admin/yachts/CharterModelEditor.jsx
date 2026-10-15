'use client';

// ══ Éditeur « Modèle tarifaire charter » (client 2026-10-15) ══
// Les 11 blocs de la maquette client « administration-charter-standard-multidevises »,
// avec les composants de l'admin (fond sombre, accent cuivre). Données : lib/charterModel.js.
// ÉTAPE 1 : saisie et enregistrement uniquement — rien n'est publié sur le site.

import { useState } from 'react';
import { ChevronDown, Plus, X, AlertTriangle } from 'lucide-react';
import {
  CM_CURRENCIES, CM_CURRENCY_LABELS, CM_CURRENCY_SHORT, CM_STATUSES, cmId, charterModelWarnings, normalizeCharterModel,
} from '@/lib/charterModel';

const INPUT = 'w-full px-3 py-2 bg-[#2a2a30] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] text-sm focus:border-[#B03E00] outline-none';
const LBL = 'block text-[10px] uppercase tracking-wider text-[#acb0cd]/50 mb-1';
const v = (x) => (x === null || x === undefined ? '' : x);

function Field({ label, children, wide = false }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <label className={LBL}>{label}</label>
      {children}
    </div>
  );
}
function Text({ label, value, onChange, wide, type = 'text' }) {
  return (
    <Field label={label} wide={wide}>
      <input type={type} value={v(value)} onChange={(e) => onChange(e.target.value)} className={INPUT} />
    </Field>
  );
}
function Num({ label, value, onChange, wide }) {
  return (
    <Field label={label} wide={wide}>
      <input type="number" min="0" step="any" value={v(value)} onChange={(e) => onChange(e.target.value)} className={INPUT} />
    </Field>
  );
}
function Area({ label, value, onChange }) {
  return (
    <Field label={label} wide>
      <textarea rows={3} value={v(value)} onChange={(e) => onChange(e.target.value)} className={`${INPUT} resize-y`} />
    </Field>
  );
}
function Check({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 accent-[#B03E00]" />
      <span className={checked ? 'text-[#B03E00] font-medium' : 'text-[#acb0cd]'}>{label}</span>
    </label>
  );
}
// Trois montants manuels distincts (aucune conversion). Les devises non activées
// restent saisissables (donnée conservée) mais sont signalées.
function Money({ value, onChange, currencies }) {
  const p = value || {};
  return (
    <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
      {CM_CURRENCIES.map((c) => (
        <div key={c}>
          <label className={LBL}>
            Montant {CM_CURRENCY_SHORT[c]}{!currencies[c] && <span className="normal-case tracking-normal text-[#acb0cd]/40"> · non activée</span>}
          </label>
          <input type="number" min="0" step="any" value={v(p[c])} onChange={(e) => onChange({ ...p, [c]: e.target.value })}
            className={`${INPUT} ${currencies[c] ? '' : 'opacity-50'}`} />
        </div>
      ))}
    </div>
  );
}
function Block({ n, title, children }) {
  return (
    <div className="rounded-lg border border-[#C0C0C0]/20 bg-[#323238] p-3 space-y-3">
      <h4 className="text-xs uppercase tracking-[0.18em] text-[#c2622a]">{n} · {title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}
function Row({ onRemove, children }) {
  return (
    <div className="sm:col-span-2 rounded-lg border border-[#C0C0C0]/20 p-3 relative">
      <button type="button" onClick={onRemove} title="Supprimer cette ligne"
        className="absolute top-2 right-2 text-[#acb0cd]/50 hover:text-[#e3a892]"><X className="w-4 h-4" /></button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">{children}</div>
    </div>
  );
}
function AddBtn({ label, onClick }) {
  return (
    <div className="sm:col-span-2">
      <button type="button" onClick={onClick}
        className="px-4 py-2 rounded-lg border border-[#B03E00] text-[#B03E00] hover:bg-[#B03E00]/15 text-sm font-medium flex items-center gap-1">
        <Plus className="w-4 h-4" /> {label}
      </button>
    </div>
  );
}
function StatusSelect({ value, onChange }) {
  return (
    <Field label="Statut">
      <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={INPUT}>
        <option value="">Statut non renseigné</option>
        {CM_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    </Field>
  );
}

export default function CharterModelEditor({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const m = value;
  const cur = m.currencies;
  const set = (patch) => onChange({ ...m, ...patch });
  const setIn = (key, patch) => onChange({ ...m, [key]: { ...m[key], ...patch } });
  const updList = (key, id, patch) => set({ [key]: m[key].map((x) => (x.id === id ? { ...x, ...patch } : x)) });
  const delList = (key, id) => set({ [key]: m[key].filter((x) => x.id !== id) });
  const setCat = (patch) => setIn('catering', patch);
  const updMeal = (id, patch) => setCat({ rates: m.catering.rates.map((x) => (x.id === id ? { ...x, ...patch } : x)) });
  const warnings = charterModelWarnings(normalizeCharterModel(m));

  return (
    <div className="bg-[#3a3b3f] rounded-lg">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between p-3 text-left">
        <span className="text-sm text-[#acb0cd] font-medium">Modèle tarifaire charter — EUR / USD / GBP</span>
        <ChevronDown className={`w-4 h-4 text-[#B03E00] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-3">
          <p className="text-[#acb0cd]/60 text-xs">
            Document interne, enregistré pour ce bateau uniquement. Rien n’est encore affiché sur le site :
            les sections « Tarifs par saison » et « Day Charter » restent utilisées en attendant l’étape 2.
            Un prix laissé vide = non renseigné (jamais gratuit).
          </p>

          <Block n="01" title="Devises et modes de location">
            <div className="sm:col-span-2 flex flex-wrap gap-x-5 gap-y-2">
              {CM_CURRENCIES.map((c) => (
                <Check key={c} label={CM_CURRENCY_LABELS[c]} checked={cur[c]} onChange={(x) => setIn('currencies', { [c]: x })} />
              ))}
            </div>
            <div className="sm:col-span-2 flex flex-wrap gap-x-5 gap-y-2">
              <Check label="Charter avec nuitées" checked={m.modes.overnight} onChange={(x) => setIn('modes', { overnight: x })} />
              <Check label="Day Charter" checked={m.modes.day} onChange={(x) => setIn('modes', { day: x })} />
              <Check label="Hours Charter" checked={m.modes.hours} onChange={(x) => setIn('modes', { hours: x })} />
            </div>
            <Field label="Devise principale (parmi les devises activées)">
              <select value={m.mainCurrency} onChange={(e) => set({ mainCurrency: e.target.value })} className={INPUT}>
                <option value="">— Choisir —</option>
                {CM_CURRENCIES.filter((c) => cur[c]).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Area label="Description générale" value={m.description} onChange={(x) => set({ description: x })} />
          </Block>

          <Block n="02" title="Charter avec nuitées">
            <Area label="Description" value={m.overnight.description} onChange={(x) => setIn('overnight', { description: x })} />
            <Text label="Unité tarifaire (jour / nuit / semaine / forfait)" value={m.overnight.unit} onChange={(x) => setIn('overnight', { unit: x })} />
            <Num label="Durée minimale — nuits" value={m.overnight.minNights} onChange={(x) => setIn('overnight', { minNights: x })} />
            <Money value={m.overnight.prices} currencies={cur} onChange={(x) => setIn('overnight', { prices: x })} />
            <Area label="Jours partiels / jours facturés / changement de saison" value={m.overnight.partialDays} onChange={(x) => setIn('overnight', { partialDays: x })} />
          </Block>

          <Block n="03" title="Day Charter">
            <Area label="Description Day Charter" value={m.day.description} onChange={(x) => setIn('day', { description: x })} />
            <Num label="Durée incluse — heures" value={m.day.includedHours} onChange={(x) => setIn('day', { includedHours: x })} />
            <Num label="Durée minimale — jours" value={m.day.minDays} onChange={(x) => setIn('day', { minDays: x })} />
            <Text type="time" label="Heure de départ" value={m.day.departure} onChange={(x) => setIn('day', { departure: x })} />
            <Text type="time" label="Heure de retour" value={m.day.return} onChange={(x) => setIn('day', { return: x })} />
            <Money value={m.day.prices} currencies={cur} onChange={(x) => setIn('day', { prices: x })} />
            <Area label="Conditions et heures supplémentaires" value={m.day.conditions} onChange={(x) => setIn('day', { conditions: x })} />
          </Block>

          <Block n="04" title="Hours Charter">
            <Area label="Description Hours Charter" value={m.hours.description} onChange={(x) => setIn('hours', { description: x })} />
            <Num label="Durée minimale — heures" value={m.hours.minHours} onChange={(x) => setIn('hours', { minHours: x })} />
            <Num label="Pas de réservation — minutes" value={m.hours.stepMinutes} onChange={(x) => setIn('hours', { stepMinutes: x })} />
            <Text label="Unité (par heure / forfait)" value={m.hours.unit} onChange={(x) => setIn('hours', { unit: x })} />
            <Money value={m.hours.prices} currencies={cur} onChange={(x) => setIn('hours', { prices: x })} />
            <Area label="Forfaits horaires et dépassements" value={m.hours.packages} onChange={(x) => setIn('hours', { packages: x })} />
          </Block>

          <Block n="05" title="Saisons et périodes">
            {m.seasons.map((s) => (
              <Row key={s.id} onRemove={() => delList('seasons', s.id)}>
                <Text label="Nom de saison" value={s.name} onChange={(x) => updList('seasons', s.id, { name: x })} />
                <Field label="Mode">
                  <select value={s.mode} onChange={(e) => updList('seasons', s.id, { mode: e.target.value })} className={INPUT}>
                    <option value="">— Choisir —</option>
                    <option value="overnight">Charter avec nuitées</option>
                    <option value="day">Day Charter</option>
                    <option value="hours">Hours Charter</option>
                  </select>
                </Field>
                <Text type="date" label="Début" value={s.start} onChange={(x) => updList('seasons', s.id, { start: x })} />
                <Text type="date" label="Fin" value={s.end} onChange={(x) => updList('seasons', s.id, { end: x })} />
                <Text label="Unité tarifaire" value={s.unit} onChange={(x) => updList('seasons', s.id, { unit: x })} />
                <Num label="Priorité" value={s.priority} onChange={(x) => updList('seasons', s.id, { priority: x })} />
                <Money value={s.prices} currencies={cur} onChange={(x) => updList('seasons', s.id, { prices: x })} />
              </Row>
            ))}
            <AddBtn label="Ajouter une période tarifaire" onClick={() => set({ seasons: [...m.seasons, { id: cmId(), name: '', start: '', end: '', mode: '', unit: '', priority: '', prices: {} }] })} />
            <Area label="Règle de ventilation entre périodes" value={m.seasonRule} onChange={(x) => set({ seasonRule: x })} />
          </Block>

          <Block n="06" title="Embarquement et accueil">
            <Text label="Port / point de départ" value={m.boarding.departurePort} onChange={(x) => setIn('boarding', { departurePort: x })} />
            <Text label="Port / point de retour" value={m.boarding.returnPort} onChange={(x) => setIn('boarding', { returnPort: x })} />
            <Text type="time" label="Heure d’embarquement" value={m.boarding.boardingTime} onChange={(x) => setIn('boarding', { boardingTime: x })} />
            <Text type="time" label="Heure de débarquement" value={m.boarding.disembarkTime} onChange={(x) => setIn('boarding', { disembarkTime: x })} />
            <Text label="Fuseau horaire" value={m.boarding.timezone} onChange={(x) => setIn('boarding', { timezone: x })} />
            <Num label="Capacité avec nuitées — guests" value={m.boarding.capacityOvernight} onChange={(x) => setIn('boarding', { capacityOvernight: x })} />
            <Num label="Capacité à la journée — guests" value={m.boarding.capacityDay} onChange={(x) => setIn('boarding', { capacityDay: x })} />
            <Num label="Nombre de cabines" value={m.boarding.cabins} onChange={(x) => setIn('boarding', { cabins: x })} />
            <Area label="Livraison, départ différent et conditions d’accueil" value={m.boarding.notes} onChange={(x) => setIn('boarding', { notes: x })} />
          </Block>

          <Block n="07" title="Réductions">
            {m.discounts.map((d) => (
              <Row key={d.id} onRemove={() => delList('discounts', d.id)}>
                <Text label="Type de réduction" value={d.type} onChange={(x) => updList('discounts', d.id, { type: x })} />
                <Num label="Pourcentage" value={d.percent} onChange={(x) => updList('discounts', d.id, { percent: x })} />
                <Text type="date" label="Date limite" value={d.deadline} onChange={(x) => updList('discounts', d.id, { deadline: x })} />
                <Num label="Seuil" value={d.threshold} onChange={(x) => updList('discounts', d.id, { threshold: x })} />
                <Text label="Unité du seuil (jours / nuits / mois)" value={d.thresholdUnit} onChange={(x) => updList('discounts', d.id, { thresholdUnit: x })} />
                <Text label="Condition / cumul" value={d.condition} onChange={(x) => updList('discounts', d.id, { condition: x })} />
              </Row>
            ))}
            <AddBtn label="Ajouter une réduction" onClick={() => set({ discounts: [...m.discounts, { id: cmId(), type: '', percent: '', deadline: '', threshold: '', thresholdUnit: '', condition: '' }] })} />
            <Num label="Plafond des remises cumulées — %" value={m.discountCap} onChange={(x) => set({ discountCap: x })} />
            <Area label="Base et méthode de cumul" value={m.discountMethod} onChange={(x) => set({ discountMethod: x })} />
          </Block>

          <Block n="08" title="Prestations et frais">
            <p className="sm:col-span-2 text-[#acb0cd]/60 text-xs">Pour chaque prestation : un seul statut. Aucun pays ou zone prédéfini.</p>
            {m.services.map((s) => (
              s.standard ? (
                <div key={s.id} className="sm:col-span-2 rounded-lg border border-[#C0C0C0]/20 p-3">
                  <p className="text-sm text-[#C0C0C0] mb-2">{s.name}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <StatusSelect value={s.status} onChange={(x) => updList('services', s.id, { status: x })} />
                    <Text label="Limite / quantité / condition" value={s.condition} onChange={(x) => updList('services', s.id, { condition: x })} />
                    <Money value={s.prices} currencies={cur} onChange={(x) => updList('services', s.id, { prices: x })} />
                  </div>
                </div>
              ) : (
                <Row key={s.id} onRemove={() => delList('services', s.id)}>
                  <Text label="Prestation" value={s.name} onChange={(x) => updList('services', s.id, { name: x })} />
                  <StatusSelect value={s.status} onChange={(x) => updList('services', s.id, { status: x })} />
                  <Text label="Condition / mode de calcul" value={s.calc} onChange={(x) => updList('services', s.id, { calc: x })} wide />
                  <Money value={s.prices} currencies={cur} onChange={(x) => updList('services', s.id, { prices: x })} />
                </Row>
              )
            ))}
            <AddBtn label="Ajouter une prestation" onClick={() => set({ services: [...m.services, { id: cmId(), standard: false, name: '', status: '', condition: '', calc: '', prices: {} }] })} />
          </Block>

          <Block n="09" title="Restauration et catégories">
            <div className="sm:col-span-2 flex flex-wrap gap-x-5 gap-y-2">
              <Check label="Pension complète proposée" checked={m.catering.fullBoard} onChange={(x) => setCat({ fullBoard: x })} />
              <Check label="Demi-pension proposée" checked={m.catering.halfBoard} onChange={(x) => setCat({ halfBoard: x })} />
              <Check label="Dépenses au réel proposées" checked={m.catering.actual} onChange={(x) => setCat({ actual: x })} />
            </div>
            <Area label="Prestations pension complète" value={m.catering.fullBoardText} onChange={(x) => setCat({ fullBoardText: x })} />
            <Area label="Prestations demi-pension" value={m.catering.halfBoardText} onChange={(x) => setCat({ halfBoardText: x })} />
            <Area label="Prestations dépenses au réel" value={m.catering.actualText} onChange={(x) => setCat({ actualText: x })} />
            <Num label="Âge minimum enfant" value={m.catering.childMinAge} onChange={(x) => setCat({ childMinAge: x })} />
            <Num label="Âge maximum enfant" value={m.catering.childMaxAge} onChange={(x) => setCat({ childMaxAge: x })} />
            <Num label="Gratuité en dessous de — ans" value={m.catering.freeUnder} onChange={(x) => setCat({ freeUnder: x })} />
            <Area label="Comptage du groupe et jours de restauration facturés" value={m.catering.counting} onChange={(x) => setCat({ counting: x })} />
            {m.catering.rates.map((r) => (
              <Row key={r.id} onRemove={() => setCat({ rates: m.catering.rates.filter((x) => x.id !== r.id) })}>
                <Text label="Formule" value={r.formula} onChange={(x) => updMeal(r.id, { formula: x })} />
                <Text label="Catégorie adulte / enfant / autre" value={r.category} onChange={(x) => updMeal(r.id, { category: x })} />
                <Num label="Groupe minimum" value={r.groupMin} onChange={(x) => updMeal(r.id, { groupMin: x })} />
                <Num label="Groupe maximum" value={r.groupMax} onChange={(x) => updMeal(r.id, { groupMax: x })} />
                <Text label="Unité (personne / jour)" value={r.unit} onChange={(x) => updMeal(r.id, { unit: x })} wide />
                <Money value={r.prices} currencies={cur} onChange={(x) => updMeal(r.id, { prices: x })} />
              </Row>
            ))}
            <AddBtn label="Ajouter un tarif restauration" onClick={() => setCat({ rates: [...m.catering.rates, { id: cmId(), formula: '', category: '', groupMin: '', groupMax: '', unit: '', prices: {} }] })} />
          </Block>

          <Block n="10" title="APA, caution et pourboires">
            <div className="sm:col-span-2"><Check label="APA applicable" checked={m.apa.enabled} onChange={(x) => setIn('apa', { enabled: x })} /></div>
            <Num label="APA — pourcentage" value={m.apa.percent} onChange={(x) => setIn('apa', { percent: x })} />
            <Text label="APA — montant fixe, si applicable" value={m.apa.fixed} onChange={(x) => setIn('apa', { fixed: x })} />
            <Money value={m.apa.prices} currencies={cur} onChange={(x) => setIn('apa', { prices: x })} />
            <Area label="Base, paiement et régularisation APA" value={m.apa.terms} onChange={(x) => setIn('apa', { terms: x })} />
            <div className="sm:col-span-2"><Check label="Caution applicable" checked={m.deposit.enabled} onChange={(x) => setIn('deposit', { enabled: x })} /></div>
            <Money value={m.deposit.prices} currencies={cur} onChange={(x) => setIn('deposit', { prices: x })} />
            <Num label="Pourboire indicatif minimum — %" value={m.tipMin} onChange={(x) => set({ tipMin: x })} />
            <Num label="Pourboire indicatif maximum — %" value={m.tipMax} onChange={(x) => set({ tipMax: x })} />
            <Area label="Modalités caution et pourboire" value={m.depositTerms} onChange={(x) => set({ depositTerms: x })} />
          </Block>

          <Block n="11" title="Conditions et contrôle">
            <div className="sm:col-span-2"><Check label="TVA incluse" checked={m.terms.vatIncluded} onChange={(x) => setIn('terms', { vatIncluded: x })} /></div>
            <Num label="Taux TVA — %" value={m.terms.vatRate} onChange={(x) => setIn('terms', { vatRate: x })} />
            <Num label="Acompte — %" value={m.terms.downPayment} onChange={(x) => setIn('terms', { downPayment: x })} />
            <Area label="Échéances acompte / solde" value={m.terms.schedule} onChange={(x) => setIn('terms', { schedule: x })} />
            <Area label="Annulation / remboursement / report" value={m.terms.cancellation} onChange={(x) => setIn('terms', { cancellation: x })} />
            <Area label="Autres conditions" value={m.terms.other} onChange={(x) => setIn('terms', { other: x })} />
            <Area label="Notes internes — jamais publiques" value={m.terms.internalNotes} onChange={(x) => setIn('terms', { internalNotes: x })} />
            <div className="sm:col-span-2"><Check label="Conditions validées par le fournisseur" checked={m.terms.validated} onChange={(x) => setIn('terms', { validated: x })} /></div>
          </Block>

          {warnings.length > 0 && (
            <div className="rounded-lg border border-[#B03E00]/50 bg-[#B03E00]/10 p-3">
              <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#e3a892] mb-1"><AlertTriangle className="w-3.5 h-3.5" /> À vérifier</p>
              <ul className="list-disc ml-5 text-xs text-[#acb0cd]/80 space-y-0.5">
                {warnings.map((w) => <li key={w}>{w}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
