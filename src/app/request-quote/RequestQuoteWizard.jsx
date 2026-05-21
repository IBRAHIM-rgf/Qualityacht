'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Users, Ship, Plane, ArrowLeft, Check, ChevronDown } from 'lucide-react';

const STEPS = ['Charter Details', 'Contact Info', 'Thank You!'];

const TITLES = ['', 'Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Sir', 'Lady'];

// Drapeau + nom + indicatif (style Global Jet) — liste complète des pays
const COUNTRIES = [
  { name: 'Afghanistan', flag: '🇦🇫', code: '+93' },
  { name: 'Albania', flag: '🇦🇱', code: '+355' },
  { name: 'Algeria', flag: '🇩🇿', code: '+213' },
  { name: 'Andorra', flag: '🇦🇩', code: '+376' },
  { name: 'Angola', flag: '🇦🇴', code: '+244' },
  { name: 'Argentina', flag: '🇦🇷', code: '+54' },
  { name: 'Armenia', flag: '🇦🇲', code: '+374' },
  { name: 'Australia', flag: '🇦🇺', code: '+61' },
  { name: 'Austria', flag: '🇦🇹', code: '+43' },
  { name: 'Azerbaijan', flag: '🇦🇿', code: '+994' },
  { name: 'Bahamas', flag: '🇧🇸', code: '+1242' },
  { name: 'Bahrain', flag: '🇧🇭', code: '+973' },
  { name: 'Bangladesh', flag: '🇧🇩', code: '+880' },
  { name: 'Barbados', flag: '🇧🇧', code: '+1246' },
  { name: 'Belarus', flag: '🇧🇾', code: '+375' },
  { name: 'Belgium', flag: '🇧🇪', code: '+32' },
  { name: 'Belize', flag: '🇧🇿', code: '+501' },
  { name: 'Benin', flag: '🇧🇯', code: '+229' },
  { name: 'Bolivia', flag: '🇧🇴', code: '+591' },
  { name: 'Bosnia and Herzegovina', flag: '🇧🇦', code: '+387' },
  { name: 'Botswana', flag: '🇧🇼', code: '+267' },
  { name: 'Brazil', flag: '🇧🇷', code: '+55' },
  { name: 'Brunei', flag: '🇧🇳', code: '+673' },
  { name: 'Bulgaria', flag: '🇧🇬', code: '+359' },
  { name: 'Burkina Faso', flag: '🇧🇫', code: '+226' },
  { name: 'Cambodia', flag: '🇰🇭', code: '+855' },
  { name: 'Cameroon', flag: '🇨🇲', code: '+237' },
  { name: 'Canada', flag: '🇨🇦', code: '+1' },
  { name: 'Cape Verde', flag: '🇨🇻', code: '+238' },
  { name: 'Chile', flag: '🇨🇱', code: '+56' },
  { name: 'China', flag: '🇨🇳', code: '+86' },
  { name: 'Colombia', flag: '🇨🇴', code: '+57' },
  { name: 'Costa Rica', flag: '🇨🇷', code: '+506' },
  { name: 'Croatia', flag: '🇭🇷', code: '+385' },
  { name: 'Cuba', flag: '🇨🇺', code: '+53' },
  { name: 'Cyprus', flag: '🇨🇾', code: '+357' },
  { name: 'Czech Republic', flag: '🇨🇿', code: '+420' },
  { name: 'Denmark', flag: '🇩🇰', code: '+45' },
  { name: 'Dominican Republic', flag: '🇩🇴', code: '+1809' },
  { name: 'Ecuador', flag: '🇪🇨', code: '+593' },
  { name: 'Egypt', flag: '🇪🇬', code: '+20' },
  { name: 'El Salvador', flag: '🇸🇻', code: '+503' },
  { name: 'Estonia', flag: '🇪🇪', code: '+372' },
  { name: 'Ethiopia', flag: '🇪🇹', code: '+251' },
  { name: 'Fiji', flag: '🇫🇯', code: '+679' },
  { name: 'Finland', flag: '🇫🇮', code: '+358' },
  { name: 'France', flag: '🇫🇷', code: '+33' },
  { name: 'Gabon', flag: '🇬🇦', code: '+241' },
  { name: 'Georgia', flag: '🇬🇪', code: '+995' },
  { name: 'Germany', flag: '🇩🇪', code: '+49' },
  { name: 'Ghana', flag: '🇬🇭', code: '+233' },
  { name: 'Greece', flag: '🇬🇷', code: '+30' },
  { name: 'Grenada', flag: '🇬🇩', code: '+1473' },
  { name: 'Guatemala', flag: '🇬🇹', code: '+502' },
  { name: 'Honduras', flag: '🇭🇳', code: '+504' },
  { name: 'Hong Kong', flag: '🇭🇰', code: '+852' },
  { name: 'Hungary', flag: '🇭🇺', code: '+36' },
  { name: 'Iceland', flag: '🇮🇸', code: '+354' },
  { name: 'India', flag: '🇮🇳', code: '+91' },
  { name: 'Indonesia', flag: '🇮🇩', code: '+62' },
  { name: 'Iran', flag: '🇮🇷', code: '+98' },
  { name: 'Iraq', flag: '🇮🇶', code: '+964' },
  { name: 'Ireland', flag: '🇮🇪', code: '+353' },
  { name: 'Israel', flag: '🇮🇱', code: '+972' },
  { name: 'Italy', flag: '🇮🇹', code: '+39' },
  { name: 'Ivory Coast', flag: '🇨🇮', code: '+225' },
  { name: 'Jamaica', flag: '🇯🇲', code: '+1876' },
  { name: 'Japan', flag: '🇯🇵', code: '+81' },
  { name: 'Jordan', flag: '🇯🇴', code: '+962' },
  { name: 'Kazakhstan', flag: '🇰🇿', code: '+7' },
  { name: 'Kenya', flag: '🇰🇪', code: '+254' },
  { name: 'Kuwait', flag: '🇰🇼', code: '+965' },
  { name: 'Latvia', flag: '🇱🇻', code: '+371' },
  { name: 'Lebanon', flag: '🇱🇧', code: '+961' },
  { name: 'Libya', flag: '🇱🇾', code: '+218' },
  { name: 'Liechtenstein', flag: '🇱🇮', code: '+423' },
  { name: 'Lithuania', flag: '🇱🇹', code: '+370' },
  { name: 'Luxembourg', flag: '🇱🇺', code: '+352' },
  { name: 'Madagascar', flag: '🇲🇬', code: '+261' },
  { name: 'Malaysia', flag: '🇲🇾', code: '+60' },
  { name: 'Maldives', flag: '🇲🇻', code: '+960' },
  { name: 'Malta', flag: '🇲🇹', code: '+356' },
  { name: 'Mauritius', flag: '🇲🇺', code: '+230' },
  { name: 'Mexico', flag: '🇲🇽', code: '+52' },
  { name: 'Monaco', flag: '🇲🇨', code: '+377' },
  { name: 'Montenegro', flag: '🇲🇪', code: '+382' },
  { name: 'Morocco', flag: '🇲🇦', code: '+212' },
  { name: 'Mozambique', flag: '🇲🇿', code: '+258' },
  { name: 'Namibia', flag: '🇳🇦', code: '+264' },
  { name: 'Nepal', flag: '🇳🇵', code: '+977' },
  { name: 'Netherlands', flag: '🇳🇱', code: '+31' },
  { name: 'New Zealand', flag: '🇳🇿', code: '+64' },
  { name: 'Nigeria', flag: '🇳🇬', code: '+234' },
  { name: 'Norway', flag: '🇳🇴', code: '+47' },
  { name: 'Oman', flag: '🇴🇲', code: '+968' },
  { name: 'Pakistan', flag: '🇵🇰', code: '+92' },
  { name: 'Panama', flag: '🇵🇦', code: '+507' },
  { name: 'Paraguay', flag: '🇵🇾', code: '+595' },
  { name: 'Peru', flag: '🇵🇪', code: '+51' },
  { name: 'Philippines', flag: '🇵🇭', code: '+63' },
  { name: 'Poland', flag: '🇵🇱', code: '+48' },
  { name: 'Portugal', flag: '🇵🇹', code: '+351' },
  { name: 'Qatar', flag: '🇶🇦', code: '+974' },
  { name: 'Romania', flag: '🇷🇴', code: '+40' },
  { name: 'Russia', flag: '🇷🇺', code: '+7' },
  { name: 'Saudi Arabia', flag: '🇸🇦', code: '+966' },
  { name: 'Senegal', flag: '🇸🇳', code: '+221' },
  { name: 'Serbia', flag: '🇷🇸', code: '+381' },
  { name: 'Seychelles', flag: '🇸🇨', code: '+248' },
  { name: 'Singapore', flag: '🇸🇬', code: '+65' },
  { name: 'Slovakia', flag: '🇸🇰', code: '+421' },
  { name: 'Slovenia', flag: '🇸🇮', code: '+386' },
  { name: 'South Africa', flag: '🇿🇦', code: '+27' },
  { name: 'South Korea', flag: '🇰🇷', code: '+82' },
  { name: 'Spain', flag: '🇪🇸', code: '+34' },
  { name: 'Sri Lanka', flag: '🇱🇰', code: '+94' },
  { name: 'Sweden', flag: '🇸🇪', code: '+46' },
  { name: 'Switzerland', flag: '🇨🇭', code: '+41' },
  { name: 'Taiwan', flag: '🇹🇼', code: '+886' },
  { name: 'Tanzania', flag: '🇹🇿', code: '+255' },
  { name: 'Thailand', flag: '🇹🇭', code: '+66' },
  { name: 'Trinidad and Tobago', flag: '🇹🇹', code: '+1868' },
  { name: 'Tunisia', flag: '🇹🇳', code: '+216' },
  { name: 'Turkey', flag: '🇹🇷', code: '+90' },
  { name: 'Ukraine', flag: '🇺🇦', code: '+380' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: '+971' },
  { name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
  { name: 'United States', flag: '🇺🇸', code: '+1' },
  { name: 'Uruguay', flag: '🇺🇾', code: '+598' },
  { name: 'Venezuela', flag: '🇻🇪', code: '+58' },
  { name: 'Vietnam', flag: '🇻🇳', code: '+84' },
  { name: 'Zimbabwe', flag: '🇿🇼', code: '+263' },
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
              className={`mt-2 text-[12px] md:text-[14px] uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-500 ${i === step ? 'opacity-100' : 'opacity-50'}`}
              style={{ color: i === step ? '#acb0cd' : '#C0C0C0' }}
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
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selected = COUNTRIES.find(c => c.name === country) || COUNTRIES[0];
  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search)
  );

  return (
    <div className="relative">
      <div className="flex">
        {/* Déclencheur sélecteur pays */}
        <button type="button" onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1 bg-[#3a3b3f] border border-[#C0C0C0] border-r-0 rounded-l-xl px-3 py-3 text-[#acb0cd] text-sm whitespace-nowrap focus:outline-none hover:border-[#c2622a]">
          <span className="text-base leading-none">{selected.flag}</span>
          <span>{selected.code}</span>
          <ChevronDown className={`w-3 h-3 ml-0.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

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

      {/* Panneau plein-largeur de la card pendant la sélection */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setSearch(''); }} />
          <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-[#2e2f32] border border-[#C0C0C0] rounded-xl shadow-2xl overflow-hidden">
            <div className="p-2 border-b border-[#C0C0C0]/40">
              <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Search country…"
                className="w-full bg-[#3a3b3f] border border-[#C0C0C0] rounded-lg px-3 py-2 text-[#acb0cd] text-sm placeholder-[#6a6b6e] focus:outline-none focus:border-[#c2622a]" />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filtered.map(c => (
                <button key={c.name} type="button"
                  onClick={() => { onCountry(c.name); setOpen(false); setSearch(''); }}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[#3a3b3f] ${c.name === country ? 'text-[#c2622a]' : 'text-[#acb0cd]'}`}>
                  <span className="flex items-center gap-2"><span className="text-base leading-none">{c.flag}</span> {c.name}</span>
                  <span className="text-[#acb0cd]/60">{c.code}</span>
                </button>
              ))}
              {filtered.length === 0 && <p className="px-4 py-3 text-sm text-[#acb0cd]/60">No country found</p>}
            </div>
          </div>
        </>
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
        Request Your Next Charter
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
