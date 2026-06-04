'use client';

// Page contact-broker — broker "Private Jet" sous-route de /privat-jet/[slug].
// Bloc 1 : header de réservation (One Way / Round Trip / Multi + FROM/TO/Date/Time/Pax/Aircraft)
// Bloc 2 : formulaire Contact Info (depuis le wizard) + Subject + Emergency button
//
// TO ne propose QUE les aéroports listés dans la page Caraïbes (seule région avec un parc actif).

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Plane, Plus, X as XIcon, AlertTriangle } from 'lucide-react';
import { caribbeanJetGroups } from '../../data';
import {
  TITLES,
  CALLBACK_SLOTS,
  inputClass,
  Field,
  CocoCheckbox,
  CountryPicker,
  CountryInput,
} from './sharedUI';

// ── Liste des aéroports caraïbes (à partir de data.js) — uniquement ceux ayant un code IATA ──
function parseAirport(str) {
  const m = str.match(/^(.+?)\s*\(([A-Z]{2,4})\)\s*[—-]\s*(.+)$/);
  if (m) return { name: m[1].trim(), code: m[2], size: m[3].trim() };
  return null;
}
const CARIBBEAN_AIRPORTS = caribbeanJetGroups.flatMap(({ island, airports }) =>
  airports.map(parseAirport).filter(Boolean).map(a => ({ island, ...a }))
);

const AIRCRAFT_TYPES = [
  'Any',
  'Light jet',
  'Medium jet',
  'Medium/Large jet',
  'Large jet',
  'STOL aircraft',
];

const SUBJECTS = [
  'Private Jet',
  'Pets / Animals',
  'Emergency',
  'PMR (Reduced Mobility)',
  'Group',
];

export default function ContactBrokerPage() {
  // ── Booking header state ──
  const [tripType, setTripType] = useState('one-way'); // 'one-way' | 'round-trip' | 'multi'
  const [legs, setLegs] = useState([{ from: '', to: '', date: '', time: '' }]);
  const [passengers, setPassengers] = useState(1);
  const [aircraft, setAircraft] = useState('');

  const updateLeg = (i, key, val) => setLegs(prev => {
    const next = [...prev];
    while (next.length <= i) next.push({ from: '', to: '', date: '', time: '' });
    next[i] = { ...next[i], [key]: val };
    return next;
  });
  const addLeg = () => setLegs(prev => [...prev, { from: '', to: '', date: '', time: '' }]);
  const removeLeg = (i) => setLegs(prev => prev.filter((_, idx) => idx !== i));

  // Quand on bascule en round-trip, s'assurer qu'il y a bien 2 legs en state
  // (sinon updateLeg(1, ...) marche mais le 2e leg restait absent jusqu'à modif)
  const handleTripType = (type) => {
    setTripType(type);
    if (type === 'round-trip') {
      setLegs(prev => {
        if (prev.length >= 2) return prev;
        return [...prev, { from: '', to: '', date: '', time: '' }];
      });
    }
  };

  // ── Contact Info state ──
  const [contact, setContact] = useState({
    company: '', title: '', firstName: '', lastName: '',
    email: '', email2: '',
    phoneCountry: 'Switzerland', phone: '',
    waCountry: 'Switzerland', whatsapp: '',
    callbackCountry: 'Switzerland', callbackTime: '',
    contactMethod: 'Email',
    subject: 'Private Jet',
    message: '', acceptPolicy: false, notRobot: false,
  });
  const [sent, setSent] = useState(false);
  const [emergency, setEmergency] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    setSent(true);
    setEmergency(false);
  };
  const handleEmergency = () => {
    setContact(c => ({ ...c, subject: 'Emergency' }));
    setEmergency(true);
    setSent(true);
  };

  // Visible legs selon trip type. Round-trip force 2 lignes (retour auto si absent).
  const visibleLegs = useMemo(() => {
    if (tripType === 'one-way') return legs.slice(0, 1);
    if (tripType === 'round-trip') {
      const out = [...legs];
      while (out.length < 2) out.push({ from: '', to: '', date: '', time: '' });
      return out.slice(0, 2);
    }
    return legs;
  }, [legs, tripType]);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen pt-[70px] md:pt-24">
      {/* ══ TITRE ══ */}
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-12 text-center">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-3">
          Get in touch
        </p>
        <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#C0C0C0]">
          Contact a Broker
        </h1>
        <div className="relative w-32 h-6 mx-auto mt-4 mb-6">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
        <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-[#7cb88a]">
          Our brokers are available 24/7 to handle all your requests — yacht charter, private jet, transfers.
          Describe your project in a few lines, we&apos;ll get back to you within 24 hours.
        </p>
      </div>

      {/* ══ BOOKING HEADER PRIVATE JET ══ */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 mb-10 md:mb-14">
        {/* Tabs One Way / Round Trip / Multi */}
        <div className="flex gap-px mb-3 max-w-2xl">
          {[
            { key: 'one-way', label: 'One Way' },
            { key: 'round-trip', label: 'Round Trip' },
            { key: 'multi', label: 'Multiple Destinations' },
          ].map(({ key, label }) => (
            <button key={key} type="button" onClick={() => handleTripType(key)}
              className={`flex-1 px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-[0.15em] font-medium border transition-colors ${
                tripType === key
                  ? 'bg-[#c2622a] text-[#26272a] border-[#c2622a]'
                  : 'bg-[#3a3b3f]/40 text-[#acb0cd] border-[#C0C0C0]/30 hover:border-[#c2622a]'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* Rangée(s) de réservation — single row toujours, scroll horizontal si besoin */}
        <div className="space-y-3">
          {visibleLegs.map((leg, i) => (
            <div key={i} className="flex flex-nowrap gap-px bg-[#3a3b3f]/40 border border-[#C0C0C0]/30 overflow-x-auto">
              {/* FROM — restreint aux aéroports caraïbes sur les legs ≥ 2 (retour) */}
              <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 flex-1 min-w-[160px]">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#acb0cd]/60 mb-1">From</p>
                {i === 0 ? (
                  <input value={leg.from} onChange={e => updateLeg(i, 'from', e.target.value)}
                    placeholder="City or airport"
                    className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none placeholder-[#6a6b6e]" />
                ) : (
                  <select value={leg.from} onChange={e => updateLeg(i, 'from', e.target.value)}
                    className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none">
                    <option value="" className="bg-[#2e2f32]">Select airport…</option>
                    {CARIBBEAN_AIRPORTS.map((a, idx) => (
                      <option key={`${a.island}-${a.code}-${idx}`} value={`${a.code}|${a.island}`} className="bg-[#2e2f32]">
                        {a.island} — {a.name} ({a.code})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* TO — restreint aux aéroports caraïbes sur le 1er leg (aller) ; libre sur les suivants (retour) */}
              <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 flex-1 min-w-[160px]">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#acb0cd]/60 mb-1">To</p>
                {i === 0 ? (
                  <select value={leg.to} onChange={e => updateLeg(i, 'to', e.target.value)}
                    className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none">
                    <option value="" className="bg-[#2e2f32]">Select airport…</option>
                    {CARIBBEAN_AIRPORTS.map((a, idx) => (
                      <option key={`${a.island}-${a.code}-${idx}`} value={`${a.code}|${a.island}`} className="bg-[#2e2f32]">
                        {a.island} — {a.name} ({a.code})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input value={leg.to} onChange={e => updateLeg(i, 'to', e.target.value)}
                    placeholder="City or airport"
                    className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none placeholder-[#6a6b6e]" />
                )}
              </div>

              {/* Date */}
              <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 flex items-center gap-2 min-w-[150px]">
                <Calendar className="w-4 h-4 text-[#c2622a] shrink-0" />
                <input type="date" value={leg.date} onChange={e => updateLeg(i, 'date', e.target.value)}
                  className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none [color-scheme:dark]" />
              </div>

              {/* Time */}
              <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 flex items-center gap-2 min-w-[120px]">
                <Clock className="w-4 h-4 text-[#c2622a] shrink-0" />
                <input type="time" value={leg.time} onChange={e => updateLeg(i, 'time', e.target.value)}
                  className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none [color-scheme:dark]" />
              </div>

              {/* Pax + Aircraft (uniquement sur la 1ère ligne) */}
              {i === 0 ? (
                <>
                  <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 flex items-center gap-2 min-w-[90px]">
                    <User className="w-4 h-4 text-[#c2622a] shrink-0" />
                    <input type="number" min="1" max="50" value={passengers}
                      onChange={e => setPassengers(Math.max(1, Number(e.target.value) || 1))}
                      className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none" />
                  </div>
                  <div className="px-4 py-3 bg-[#26272a] flex items-center gap-2 min-w-[170px]">
                    <Plane className="w-4 h-4 text-[#c2622a] shrink-0" />
                    <select value={aircraft} onChange={e => setAircraft(e.target.value)}
                      className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none">
                      <option value="" className="bg-[#2e2f32]">Type of aircraft</option>
                      {AIRCRAFT_TYPES.map(a => <option key={a} value={a} className="bg-[#2e2f32]">{a}</option>)}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-[#26272a]" />
                  <div className="px-4 py-3 bg-[#26272a] flex items-center justify-end">
                    {tripType === 'multi' && (
                      <button type="button" onClick={() => removeLeg(i)}
                        aria-label="Remove leg"
                        className="text-[#acb0cd]/70 hover:text-[#B03E00] transition-colors">
                        <XIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Add leg (multi-destination only) */}
          {tripType === 'multi' && (
            <button type="button" onClick={addLeg}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c2622a] hover:text-[#B03E00] transition-colors">
              <Plus className="w-4 h-4" /> Add destination
            </button>
          )}
        </div>
      </div>

      {/* ══ FORMULAIRE Contact Info ══ */}
      <div id="contact-form-anchor" className="max-w-4xl mx-auto px-5 md:px-8 pb-20">
        {sent ? (
          <div className={`rounded-xl border p-8 text-center ${emergency ? 'border-[#B03E00] bg-[#B03E00]/15' : 'border-[#B03E00] bg-[#B03E00]/10'}`}>
            {emergency && (
              <div className="inline-flex items-center gap-2 mb-3 text-[#B03E00]">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold">Emergency request</span>
              </div>
            )}
            <p className="trajan-regular text-xl md:text-2xl text-[#C0C0C0] mb-2">Message sent</p>
            <p className="text-sm text-[#7cb88a]">
              {emergency
                ? 'A broker is being notified right now. Expect a call within minutes.'
                : 'A broker will get back to you within 24 hours.'}
            </p>

            {/* Bouton Emergency avec logo Qualityacht — visible après validation */}
            {!emergency && (
              <button type="button" onClick={handleEmergency}
                className="mt-6 inline-flex items-center gap-3 rounded-xl border-2 border-[#B03E00] bg-[#B03E00]/10 px-6 py-3 text-sm uppercase tracking-[0.2em] font-bold text-[#B03E00] hover:bg-[#B03E00]/25 transition-colors">
                <span className="relative w-6 h-6 rounded-full overflow-hidden border border-[#C0C0C0]">
                  <Image src="/images/logoFondTrans.png" alt="" fill className="object-cover scale-110" />
                </span>
                Emergency
              </button>
            )}

            <div className="mt-6">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#7cb88a] hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Note d'introduction */}
            <p className="text-sm italic leading-relaxed text-[#acb0cd]">
              A private jet is the pinnacle of personalization—your desires, your destinations, your legacy. Share your vision, and we will craft an experience beyond imagination.
            </p>

            {/* Company / Title / First / Last */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Field label="Company">
                <input value={contact.company} onChange={e => setContact({ ...contact, company: e.target.value })} placeholder="Company" className={inputClass} />
              </Field>
              <Field label="Title">
                <select value={contact.title} onChange={e => setContact({ ...contact, title: e.target.value })} className={inputClass}>
                  {TITLES.map(t => <option key={t} value={t} className="bg-[#2e2f32]">{t || '—'}</option>)}
                </select>
              </Field>
              <Field label="First Name" required>
                <input value={contact.firstName} onChange={e => setContact({ ...contact, firstName: e.target.value })} placeholder="First name" className={inputClass} />
              </Field>
              <Field label="Last Name" required>
                <input value={contact.lastName} onChange={e => setContact({ ...contact, lastName: e.target.value })} placeholder="Last name" className={inputClass} />
              </Field>
            </div>

            {/* Emails */}
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Email" required>
                <input type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="Email" className={inputClass} />
              </Field>
              <Field label="Secondary Email">
                <input type="email" value={contact.email2} onChange={e => setContact({ ...contact, email2: e.target.value })} placeholder="Secondary email" className={inputClass} />
              </Field>
            </div>

            {/* Phone / WhatsApp */}
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Phone" required>
                <CountryInput country={contact.phoneCountry} onCountry={v => setContact({ ...contact, phoneCountry: v })}
                  value={contact.phone} onValue={v => setContact({ ...contact, phone: v })} placeholder="Phone number" />
              </Field>
              <Field label="WhatsApp Number">
                <CountryInput country={contact.waCountry} onCountry={v => setContact({ ...contact, waCountry: v })}
                  value={contact.whatsapp} onValue={v => setContact({ ...contact, whatsapp: v })} placeholder="WhatsApp number" />
              </Field>
            </div>

            {/* Coordination note */}
            <p className="text-sm italic text-[#acb0cd]/80 pt-1 leading-relaxed">
              To ensure precise coordination of our schedules, could you please provide:<br />
              Your preferred time for the call and your current country?
            </p>

            {/* Preferred time / country */}
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Preferred Time for the Call">
                <select value={contact.callbackTime} onChange={e => setContact({ ...contact, callbackTime: e.target.value })} className={inputClass}>
                  <option value="" className="bg-[#2e2f32]">Select a time</option>
                  {CALLBACK_SLOTS.map(o => <option key={o} value={o} className="bg-[#2e2f32]">{o}</option>)}
                </select>
              </Field>
              <Field label="Country">
                <CountryPicker country={contact.callbackCountry} onCountry={v => setContact({ ...contact, callbackCountry: v })} />
              </Field>
            </div>

            {/* Contact method */}
            <Field label="Preferred Contact Method">
              <div className="flex gap-2">
                {['Email', 'Phone', 'WhatsApp'].map(m => (
                  <button key={m} type="button" onClick={() => setContact({ ...contact, contactMethod: m })}
                    className={`flex-1 rounded-xl border px-3 py-3 text-xs uppercase tracking-[0.1em] bg-[#3a3b3f] transition-colors ${
                      contact.contactMethod === m
                        ? 'border-[#B03E00] text-[#B03E00]'
                        : 'border-[#C0C0C0] text-[#acb0cd] hover:border-[#B03E00] hover:text-[#B03E00]'
                    }`}>
                    {m}
                  </button>
                ))}
              </div>
            </Field>

            {/* Subject (au-dessus de Message) */}
            <Field label="Subject" required>
              <select value={contact.subject} onChange={e => setContact({ ...contact, subject: e.target.value })} className={inputClass}>
                {SUBJECTS.map(s => <option key={s} value={s} className="bg-[#2e2f32]">{s}</option>)}
              </select>
            </Field>

            {/* Message */}
            <Field label="Message">
              <textarea rows={5} value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })} className={`${inputClass} resize-none`} />
            </Field>

            {/* Privacy + captcha */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <label onClick={() => setContact({ ...contact, acceptPolicy: !contact.acceptPolicy })}
                className="flex items-center gap-3 cursor-pointer select-none">
                <CocoCheckbox checked={contact.acceptPolicy} />
                <span className="text-sm text-[#acb0cd]">Accept <a href="#" onClick={e => e.stopPropagation()} className="text-[#c2622a] hover:underline">Privacy Policy</a></span>
              </label>

              <div
                onClick={() => setContact({ ...contact, notRobot: !contact.notRobot })}
                className="flex items-center gap-3 bg-white rounded-md border border-[#d3d3d3] px-3 py-2.5 w-fit cursor-pointer hover:shadow-md transition-shadow"
              >
                <span className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors ${contact.notRobot ? 'border-[#1c7430] bg-[#1c7430]' : 'border-[#c1c1c1] bg-white'}`}>
                  {contact.notRobot && (
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  )}
                </span>
                <span className="text-sm text-[#333] select-none">I&rsquo;m not a robot</span>
                <div className="flex flex-col items-center justify-center pl-3 ml-1 border-l border-[#e4e4e4] text-[8px] uppercase tracking-wider text-[#777] leading-tight">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#4285f4]" fill="currentColor"><circle cx="12" cy="12" r="10" fillOpacity="0.15"/><path d="M12 6a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z"/></svg>
                  <span>verify</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-4 pt-4">
              <Link href="/" className="rounded-xl border border-[#C0C0C0] text-[#acb0cd] text-sm uppercase tracking-[0.2em] hover:border-[#B03E00] hover:text-[#B03E00] transition-colors inline-flex items-center justify-center gap-2 px-3 py-2 md:gap-3 md:px-6 md:py-3 text-xs md:text-sm shrink-0">
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Go Back
              </Link>

              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
                {/* Bouton Emergency — logo Qualityacht + bordure orange #B03E00 */}
                <button type="button" onClick={handleEmergency}
                  className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-[#B03E00] bg-[#B03E00]/10 px-6 py-2.5 md:px-8 md:py-3 text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#B03E00] hover:bg-[#B03E00]/25 transition-colors shadow-[0_4px_15px_rgba(176,62,0,0.25)]">
                  <span className="relative w-6 h-6 rounded-full overflow-hidden border border-[#C0C0C0]">
                    <Image src="/images/logoFondTrans.png" alt="" fill className="object-cover scale-110" />
                  </span>
                  Emergency
                </button>

                <button type="submit"
                  className="border-2 border-[#C0C0C0] rounded-xl text-[#B03E00] text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)] px-6 py-2.5 md:px-12 md:py-4 text-xs md:text-sm">
                  Send
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
