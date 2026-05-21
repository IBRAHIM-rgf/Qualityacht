'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Users, Ship, Plane, ArrowLeft, Check } from 'lucide-react';

const STEPS = ['Charter Details', 'Contact Info', 'Thank You!'];

const TITLES = ['', 'Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Sir', 'Lady'];

// Drapeau + nom + indicatif (style Global Jet)
const COUNTRIES = [
  { name: 'France', flag: '🇫🇷', code: '+33' },
  { name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
  { name: 'United States', flag: '🇺🇸', code: '+1' },
  { name: 'Switzerland', flag: '🇨🇭', code: '+41' },
  { name: 'Monaco', flag: '🇲🇨', code: '+377' },
  { name: 'Italy', flag: '🇮🇹', code: '+39' },
  { name: 'Spain', flag: '🇪🇸', code: '+34' },
  { name: 'Germany', flag: '🇩🇪', code: '+49' },
  { name: 'Belgium', flag: '🇧🇪', code: '+32' },
  { name: 'Netherlands', flag: '🇳🇱', code: '+31' },
  { name: 'Portugal', flag: '🇵🇹', code: '+351' },
  { name: 'Greece', flag: '🇬🇷', code: '+30' },
  { name: 'Croatia', flag: '🇭🇷', code: '+385' },
  { name: 'Turkey', flag: '🇹🇷', code: '+90' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: '+971' },
  { name: 'Qatar', flag: '🇶🇦', code: '+974' },
  { name: 'Saudi Arabia', flag: '🇸🇦', code: '+966' },
  { name: 'Russia', flag: '🇷🇺', code: '+7' },
  { name: 'Canada', flag: '🇨🇦', code: '+1' },
  { name: 'Brazil', flag: '🇧🇷', code: '+55' },
  { name: 'Australia', flag: '🇦🇺', code: '+61' },
  { name: 'China', flag: '🇨🇳', code: '+86' },
  { name: 'Japan', flag: '🇯🇵', code: '+81' },
  { name: 'India', flag: '🇮🇳', code: '+91' },
  { name: 'Algeria', flag: '🇩🇿', code: '+213' },
  { name: 'Morocco', flag: '🇲🇦', code: '+212' },
  { name: 'South Africa', flag: '🇿🇦', code: '+27' },
];

function StepIndicator({ step }) {
  return (
    <div className="flex items-center justify-center gap-0 max-w-3xl mx-auto px-4 mb-12 md:mb-16">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            {/* Rond : logo transparent (en attente) → logo normal (validé) */}
            <div
              className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center overflow-hidden transition-all duration-500"
              style={{ borderColor: '#C0C0C0' }}
            >
              <Image
                src={i < step ? '/images/logoFondTrans.png' : '/images/trans.png'}
                alt=""
                fill
                className={`object-cover scale-110 transition-opacity duration-500 ${i <= step ? 'opacity-100' : 'opacity-50'}`}
              />
            </div>
            <span
              className={`mt-2 text-[12px] md:text-[14px] uppercase tracking-[0.15em] whitespace-nowrap transition-opacity duration-500 ${i === step ? 'opacity-100' : 'opacity-50'}`}
              style={{ color: '#C0C0C0' }}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="flex-1 h-px mx-2 md:mx-4 -mt-6" style={{ backgroundColor: '#C0C0C0', opacity: i < step ? 1 : 0.3 }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Champs ──────────────────────────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.2em] text-[#acb0cd] mb-2">
        {label}{required && <span className="text-[#B03E00]">*</span>}
      </label>
      {children}
    </div>
  );
}

// Checkbox fond cococo, check orange quand sélectionné
function CocoCheckbox({ checked }) {
  return (
    <span className="w-5 h-5 rounded border border-[#C0C0C0] bg-[#C0C0C0] flex items-center justify-center shrink-0">
      {checked && <Check className="w-3.5 h-3.5 text-[#c2622a]" />}
    </span>
  );
}

// Bouton conforme : contour cococo + texte lavande → tout orange brûlé au survol
function GhostButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border border-[#C0C0C0] text-[#acb0cd] text-sm uppercase tracking-[0.2em] hover:border-[#B03E00] hover:text-[#B03E00] transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

// Bouton primaire identique au "Apply Filters" du filtre mobile /yachts
function PrimaryButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-[#C0C0C0] rounded-xl text-[#B03E00] text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)] ${className}`}
    >
      {children}
    </button>
  );
}

const inputClass =
  'w-full bg-[#3a3b3f] border border-[#C0C0C0] rounded-xl px-4 py-3 text-[#acb0cd] text-sm placeholder-[#6a6b6e] focus:outline-none focus:border-[#c2622a] transition-colors';

// Créneaux de rappel : 30 min de 09:00 à 19:00
const CALLBACK_SLOTS = (() => {
  const slots = [];
  for (let h = 9; h <= 19; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 19) slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
})();

function CountryInput({ country, onCountry, value, onValue, placeholder, type = 'tel', extra = '', options = null }) {
  return (
    <div className="flex">
      <select value={country} onChange={e => onCountry(e.target.value)}
        className="bg-[#3a3b3f] border border-[#C0C0C0] border-r-0 rounded-l-xl px-2 py-3 text-[#acb0cd] text-sm max-w-[120px] focus:outline-none focus:border-[#c2622a]">
        {COUNTRIES.map(c => (
          <option key={c.name} value={c.name} className="bg-[#2e2f32]">{c.flag} {c.name} {c.code}</option>
        ))}
      </select>
      {options ? (
        <select value={value} onChange={e => onValue(e.target.value)}
          className="w-full bg-[#3a3b3f] border border-[#C0C0C0] rounded-r-xl px-4 py-3 text-[#acb0cd] text-sm focus:outline-none focus:border-[#c2622a]">
          <option value="" className="bg-[#2e2f32]">Select a time</option>
          {options.map(o => <option key={o} value={o} className="bg-[#2e2f32]">{o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={e => onValue(e.target.value)} placeholder={placeholder}
          className={`w-full bg-[#3a3b3f] border border-[#C0C0C0] rounded-r-xl px-4 py-3 text-[#acb0cd] text-sm placeholder-[#6a6b6e] focus:outline-none focus:border-[#c2622a] transition-colors ${extra}`} />
      )}
    </div>
  );
}

export default function RequestQuoteWizard() {
  const params = useSearchParams();
  const yacht = {
    name: params.get('name') || 'Selected Yacht',
    image: params.get('image') || '/images/yachts/yatch2.jpeg',
    guests: params.get('guests') || '',
    type: params.get('type') || '',
    region: params.get('region') || '',
    price: params.get('price') || '',
  };

  const [step, setStep] = useState(0);

  const [charter, setCharter] = useState({
    startDate: '', endDate: '', guests: yacht.guests || '', proposeJets: false,
  });

  const [contact, setContact] = useState({
    company: '', title: '', firstName: '', lastName: '',
    email: '', email2: '',
    phoneCountry: 'France', phone: '',
    waCountry: 'France', whatsapp: '',
    callbackCountry: 'France', callbackTime: '',
    contactMethod: 'Email',
    message: '', acceptPolicy: false,
  });

  const goNext = () => setStep(s => Math.min(2, s + 1));
  const goBack = () => setStep(s => Math.max(0, s - 1));

  return (
    <div className="relative min-h-screen text-[#acb0cd] pt-24 pb-20 px-4 overflow-x-hidden">
      {/* Fond de base */}
      <div className="fixed inset-0 -z-20 bg-[#26272a]" />
      {/* Fond plein écran Thank You — photo voilier SANS filtre, défile avec le contenu */}
      {step === 2 && (
        <div className="absolute inset-0 -z-10">
          <Image src="/images/pagesCaraibes/thankyou-sail.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      )}

      <h1 className="trajan-regular font-bold text-2xl md:text-4xl text-center uppercase tracking-[0.15em] mb-10 md:mb-14 text-[#C0C0C0]">
        Request Your Charter
      </h1>

      <StepIndicator step={step} />

      {/* Slider */}
      <div className="overflow-hidden max-w-5xl mx-auto">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${step * 100}%)` }}>

          {/* ══ ÉTAPE 1 — CHARTER DETAILS ══ */}
          <section className="w-full shrink-0 px-1">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Photo yacht choisi */}
              <div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#C0C0C0]">
                  <Image src={yacht.image} alt={yacht.name} fill className="object-cover" />
                </div>
                <h2 className="trajan-regular text-xl md:text-2xl text-[#acb0cd] uppercase tracking-[0.1em] mt-4">{yacht.name}</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {yacht.type && (
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.1em] border border-[#C0C0C0] rounded-lg px-3 py-1 bg-[#3a3b3f] text-[#acb0cd] capitalize">
                      <Ship className="w-3 h-3 text-[#c2622a]" /> {yacht.type}
                    </span>
                  )}
                  {yacht.region && (
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.1em] border border-[#C0C0C0] rounded-lg px-3 py-1 bg-[#3a3b3f] text-[#acb0cd]">
                      {yacht.region}
                    </span>
                  )}
                  {yacht.price && (
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.1em] border border-[#C0C0C0] rounded-lg px-3 py-1 bg-[#3a3b3f] text-[#acb0cd]">
                      {yacht.price}/week
                    </span>
                  )}
                </div>
              </div>

              {/* Détails charter */}
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Departure Date" required>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c2622a] pointer-events-none" />
                      <input type="date" value={charter.startDate} onChange={e => setCharter({ ...charter, startDate: e.target.value })}
                        className={`${inputClass} pl-10 [color-scheme:dark]`} />
                    </div>
                  </Field>
                  <Field label="Return Date" required>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c2622a] pointer-events-none" />
                      <input type="date" value={charter.endDate} onChange={e => setCharter({ ...charter, endDate: e.target.value })}
                        className={`${inputClass} pl-10 [color-scheme:dark]`} />
                    </div>
                  </Field>
                </div>

                <Field label="Number of Guests" required>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c2622a] pointer-events-none" />
                    <input type="number" min="1" max="50" placeholder="e.g. 8" value={charter.guests}
                      onChange={e => setCharter({ ...charter, guests: e.target.value })}
                      className={`${inputClass} pl-10`} />
                  </div>
                </Field>

                {/* Confirmation infos filtre — tout en lavande */}
                <div className="border border-[#C0C0C0] rounded-xl p-4 bg-[#3a3b3f]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-2">Your selection</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#acb0cd]">
                    <span>Yacht: {yacht.name}</span>
                    {yacht.type && <span className="capitalize">Type: {yacht.type}</span>}
                    {yacht.region && <span>Region: {yacht.region}</span>}
                  </div>
                </div>

                {/* Case proposer des jets */}
                <label onClick={() => setCharter({ ...charter, proposeJets: !charter.proposeJets })}
                  className="flex items-center gap-3 cursor-pointer select-none">
                  <CocoCheckbox checked={charter.proposeJets} />
                  <span className="text-sm flex items-center gap-2 text-[#acb0cd]">
                    <Plane className="w-4 h-4 text-[#c2622a]" />
                    Also propose matching private jets for my trip
                  </span>
                </label>

                <div className="pt-2">
                  <PrimaryButton onClick={goNext} className="w-full md:w-auto px-12 py-4">Continue</PrimaryButton>
                </div>
              </div>
            </div>
          </section>

          {/* ══ ÉTAPE 2 — CONTACT INFORMATION ══ */}
          <section className="w-full shrink-0 px-1">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Field label="Company"><input value={contact.company} onChange={e => setContact({ ...contact, company: e.target.value })} placeholder="Company" className={inputClass} /></Field>
                <Field label="Title">
                  <select value={contact.title} onChange={e => setContact({ ...contact, title: e.target.value })} className={inputClass}>
                    {TITLES.map(t => <option key={t} value={t} className="bg-[#2e2f32]">{t || '—'}</option>)}
                  </select>
                </Field>
                <Field label="First Name" required><input value={contact.firstName} onChange={e => setContact({ ...contact, firstName: e.target.value })} placeholder="First name" className={inputClass} /></Field>
                <Field label="Last Name" required><input value={contact.lastName} onChange={e => setContact({ ...contact, lastName: e.target.value })} placeholder="Last name" className={inputClass} /></Field>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Email" required><input type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="Email" className={inputClass} /></Field>
                <Field label="Secondary Email"><input type="email" value={contact.email2} onChange={e => setContact({ ...contact, email2: e.target.value })} placeholder="Secondary email" className={inputClass} /></Field>
              </div>

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

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Preferred Callback Time">
                  <CountryInput country={contact.callbackCountry} onCountry={v => setContact({ ...contact, callbackCountry: v })}
                    value={contact.callbackTime} onValue={v => setContact({ ...contact, callbackTime: v })}
                    options={CALLBACK_SLOTS} />
                </Field>
                <Field label="Preferred Contact Method">
                  <div className="flex gap-2">
                    {['Email', 'Phone', 'WhatsApp'].map(m => (
                      <button key={m} onClick={() => setContact({ ...contact, contactMethod: m })}
                        className={`flex-1 rounded-xl border px-3 py-3 text-xs uppercase tracking-[0.1em] transition-colors ${
                          contact.contactMethod === m
                            ? 'border-[#B03E00] text-[#B03E00]'
                            : 'border-[#C0C0C0] text-[#acb0cd] hover:border-[#B03E00] hover:text-[#B03E00]'
                        }`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <Field label="Message">
                <textarea rows={5} value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })} className={`${inputClass} resize-none`} />
              </Field>

              <label onClick={() => setContact({ ...contact, acceptPolicy: !contact.acceptPolicy })}
                className="flex items-center gap-3 cursor-pointer select-none">
                <CocoCheckbox checked={contact.acceptPolicy} />
                <span className="text-sm text-[#acb0cd]">Accept <a href="#" onClick={e => e.stopPropagation()} className="text-[#c2622a] hover:underline">Privacy Policy</a></span>
              </label>

              <div className="flex items-center justify-between gap-4 pt-4">
                <GhostButton onClick={goBack} className="inline-flex items-center gap-3 px-6 py-3">
                  <ArrowLeft className="w-5 h-5" /> Go Back
                </GhostButton>
                <PrimaryButton onClick={goNext} className="px-12 py-4">Confirm</PrimaryButton>
              </div>
            </div>
          </section>

          {/* ══ ÉTAPE 3 — THANK YOU ══ */}
          <section className="w-full shrink-0 px-1">
            <div className="max-w-2xl mx-auto text-center py-12 md:py-24 px-4">
              <h2 className="trajan-regular font-bold text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0] mb-4">Thank You!</h2>
              <div className="w-12 h-px bg-[#c2622a] mx-auto mb-6" />
              <p className="text-[#acb0cd] leading-relaxed mb-8">
                Your request for <span className="text-[#d39478]">{yacht.name}</span> has been received.
                One of our charter experts will contact you shortly to craft your bespoke itinerary.
              </p>
              <a href="/charters/destinations/caribbean-v15"
                className="inline-block rounded-xl px-10 py-4 border border-[#C0C0C0] bg-black/30 text-[#C0C0C0] text-sm uppercase tracking-[0.2em] hover:text-[#B03E00] hover:border-[#B03E00] transition-colors">
                Back to Caribbean
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
