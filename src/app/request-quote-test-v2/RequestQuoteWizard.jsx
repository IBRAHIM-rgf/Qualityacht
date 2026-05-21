'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Users, Ship, Plane, ArrowLeft, ChevronDown } from 'lucide-react';

const STEPS = ['Charter Details', 'Contact Info', 'Thank You!'];

const TITLES = ['', 'Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Sir', 'Lady'];

// Drapeau dérivé du code ISO2 (impossible d'avoir un drapeau qui ne matche pas le pays)
const flagFromIso = (iso) =>
  iso.toUpperCase().replace(/./g, (c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65));

// Liste exhaustive : tous les pays + territoires, indicatifs ITU. { name, iso, code }
const COUNTRIES = [
  { name: 'Afghanistan', iso: 'AF', code: '+93' },
  { name: 'Albania', iso: 'AL', code: '+355' },
  { name: 'Algeria', iso: 'DZ', code: '+213' },
  { name: 'Andorra', iso: 'AD', code: '+376' },
  { name: 'Angola', iso: 'AO', code: '+244' },
  { name: 'Anguilla', iso: 'AI', code: '+1264' },
  { name: 'Antigua and Barbuda', iso: 'AG', code: '+1268' },
  { name: 'Argentina', iso: 'AR', code: '+54' },
  { name: 'Armenia', iso: 'AM', code: '+374' },
  { name: 'Aruba', iso: 'AW', code: '+297' },
  { name: 'Australia', iso: 'AU', code: '+61' },
  { name: 'Austria', iso: 'AT', code: '+43' },
  { name: 'Azerbaijan', iso: 'AZ', code: '+994' },
  { name: 'Bahamas', iso: 'BS', code: '+1242' },
  { name: 'Bahrain', iso: 'BH', code: '+973' },
  { name: 'Bangladesh', iso: 'BD', code: '+880' },
  { name: 'Barbados', iso: 'BB', code: '+1246' },
  { name: 'Belarus', iso: 'BY', code: '+375' },
  { name: 'Belgium', iso: 'BE', code: '+32' },
  { name: 'Belize', iso: 'BZ', code: '+501' },
  { name: 'Benin', iso: 'BJ', code: '+229' },
  { name: 'Bermuda', iso: 'BM', code: '+1441' },
  { name: 'Bhutan', iso: 'BT', code: '+975' },
  { name: 'Bolivia', iso: 'BO', code: '+591' },
  { name: 'Bonaire', iso: 'BQ', code: '+599' },
  { name: 'Bosnia and Herzegovina', iso: 'BA', code: '+387' },
  { name: 'Botswana', iso: 'BW', code: '+267' },
  { name: 'Brazil', iso: 'BR', code: '+55' },
  { name: 'British Virgin Islands', iso: 'VG', code: '+1284' },
  { name: 'Brunei', iso: 'BN', code: '+673' },
  { name: 'Bulgaria', iso: 'BG', code: '+359' },
  { name: 'Burkina Faso', iso: 'BF', code: '+226' },
  { name: 'Burundi', iso: 'BI', code: '+257' },
  { name: 'Cambodia', iso: 'KH', code: '+855' },
  { name: 'Cameroon', iso: 'CM', code: '+237' },
  { name: 'Canada', iso: 'CA', code: '+1' },
  { name: 'Cape Verde', iso: 'CV', code: '+238' },
  { name: 'Cayman Islands', iso: 'KY', code: '+1345' },
  { name: 'Central African Republic', iso: 'CF', code: '+236' },
  { name: 'Chad', iso: 'TD', code: '+235' },
  { name: 'Chile', iso: 'CL', code: '+56' },
  { name: 'China', iso: 'CN', code: '+86' },
  { name: 'Colombia', iso: 'CO', code: '+57' },
  { name: 'Comoros', iso: 'KM', code: '+269' },
  { name: 'Congo (Brazzaville)', iso: 'CG', code: '+242' },
  { name: 'Congo (Kinshasa)', iso: 'CD', code: '+243' },
  { name: 'Cook Islands', iso: 'CK', code: '+682' },
  { name: 'Costa Rica', iso: 'CR', code: '+506' },
  { name: "Côte d'Ivoire", iso: 'CI', code: '+225' },
  { name: 'Croatia', iso: 'HR', code: '+385' },
  { name: 'Cuba', iso: 'CU', code: '+53' },
  { name: 'Curaçao', iso: 'CW', code: '+599' },
  { name: 'Cyprus', iso: 'CY', code: '+357' },
  { name: 'Czech Republic', iso: 'CZ', code: '+420' },
  { name: 'Denmark', iso: 'DK', code: '+45' },
  { name: 'Djibouti', iso: 'DJ', code: '+253' },
  { name: 'Dominica', iso: 'DM', code: '+1767' },
  { name: 'Dominican Republic', iso: 'DO', code: '+1809' },
  { name: 'Ecuador', iso: 'EC', code: '+593' },
  { name: 'Egypt', iso: 'EG', code: '+20' },
  { name: 'El Salvador', iso: 'SV', code: '+503' },
  { name: 'Equatorial Guinea', iso: 'GQ', code: '+240' },
  { name: 'Eritrea', iso: 'ER', code: '+291' },
  { name: 'Estonia', iso: 'EE', code: '+372' },
  { name: 'Eswatini', iso: 'SZ', code: '+268' },
  { name: 'Ethiopia', iso: 'ET', code: '+251' },
  { name: 'Fiji', iso: 'FJ', code: '+679' },
  { name: 'Finland', iso: 'FI', code: '+358' },
  { name: 'France', iso: 'FR', code: '+33' },
  { name: 'French Guiana', iso: 'GF', code: '+594' },
  { name: 'French Polynesia', iso: 'PF', code: '+689' },
  { name: 'Gabon', iso: 'GA', code: '+241' },
  { name: 'Gambia', iso: 'GM', code: '+220' },
  { name: 'Georgia', iso: 'GE', code: '+995' },
  { name: 'Germany', iso: 'DE', code: '+49' },
  { name: 'Ghana', iso: 'GH', code: '+233' },
  { name: 'Gibraltar', iso: 'GI', code: '+350' },
  { name: 'Greece', iso: 'GR', code: '+30' },
  { name: 'Greenland', iso: 'GL', code: '+299' },
  { name: 'Grenada', iso: 'GD', code: '+1473' },
  { name: 'Guadeloupe', iso: 'GP', code: '+590' },
  { name: 'Guam', iso: 'GU', code: '+1671' },
  { name: 'Guatemala', iso: 'GT', code: '+502' },
  { name: 'Guernsey', iso: 'GG', code: '+44' },
  { name: 'Guinea', iso: 'GN', code: '+224' },
  { name: 'Guinea-Bissau', iso: 'GW', code: '+245' },
  { name: 'Guyana', iso: 'GY', code: '+592' },
  { name: 'Haiti', iso: 'HT', code: '+509' },
  { name: 'Honduras', iso: 'HN', code: '+504' },
  { name: 'Hong Kong', iso: 'HK', code: '+852' },
  { name: 'Hungary', iso: 'HU', code: '+36' },
  { name: 'Iceland', iso: 'IS', code: '+354' },
  { name: 'India', iso: 'IN', code: '+91' },
  { name: 'Indonesia', iso: 'ID', code: '+62' },
  { name: 'Iran', iso: 'IR', code: '+98' },
  { name: 'Iraq', iso: 'IQ', code: '+964' },
  { name: 'Ireland', iso: 'IE', code: '+353' },
  { name: 'Isle of Man', iso: 'IM', code: '+44' },
  { name: 'Israel', iso: 'IL', code: '+972' },
  { name: 'Italy', iso: 'IT', code: '+39' },
  { name: 'Jamaica', iso: 'JM', code: '+1876' },
  { name: 'Japan', iso: 'JP', code: '+81' },
  { name: 'Jersey', iso: 'JE', code: '+44' },
  { name: 'Jordan', iso: 'JO', code: '+962' },
  { name: 'Kazakhstan', iso: 'KZ', code: '+7' },
  { name: 'Kenya', iso: 'KE', code: '+254' },
  { name: 'Kiribati', iso: 'KI', code: '+686' },
  { name: 'Kosovo', iso: 'XK', code: '+383' },
  { name: 'Kuwait', iso: 'KW', code: '+965' },
  { name: 'Kyrgyzstan', iso: 'KG', code: '+996' },
  { name: 'Laos', iso: 'LA', code: '+856' },
  { name: 'Latvia', iso: 'LV', code: '+371' },
  { name: 'Lebanon', iso: 'LB', code: '+961' },
  { name: 'Lesotho', iso: 'LS', code: '+266' },
  { name: 'Liberia', iso: 'LR', code: '+231' },
  { name: 'Libya', iso: 'LY', code: '+218' },
  { name: 'Liechtenstein', iso: 'LI', code: '+423' },
  { name: 'Lithuania', iso: 'LT', code: '+370' },
  { name: 'Luxembourg', iso: 'LU', code: '+352' },
  { name: 'Macau', iso: 'MO', code: '+853' },
  { name: 'Madagascar', iso: 'MG', code: '+261' },
  { name: 'Malawi', iso: 'MW', code: '+265' },
  { name: 'Malaysia', iso: 'MY', code: '+60' },
  { name: 'Maldives', iso: 'MV', code: '+960' },
  { name: 'Mali', iso: 'ML', code: '+223' },
  { name: 'Malta', iso: 'MT', code: '+356' },
  { name: 'Marshall Islands', iso: 'MH', code: '+692' },
  { name: 'Martinique', iso: 'MQ', code: '+596' },
  { name: 'Mauritania', iso: 'MR', code: '+222' },
  { name: 'Mauritius', iso: 'MU', code: '+230' },
  { name: 'Mayotte', iso: 'YT', code: '+262' },
  { name: 'Mexico', iso: 'MX', code: '+52' },
  { name: 'Micronesia', iso: 'FM', code: '+691' },
  { name: 'Moldova', iso: 'MD', code: '+373' },
  { name: 'Monaco', iso: 'MC', code: '+377' },
  { name: 'Mongolia', iso: 'MN', code: '+976' },
  { name: 'Montenegro', iso: 'ME', code: '+382' },
  { name: 'Montserrat', iso: 'MS', code: '+1664' },
  { name: 'Morocco', iso: 'MA', code: '+212' },
  { name: 'Mozambique', iso: 'MZ', code: '+258' },
  { name: 'Myanmar', iso: 'MM', code: '+95' },
  { name: 'Namibia', iso: 'NA', code: '+264' },
  { name: 'Nauru', iso: 'NR', code: '+674' },
  { name: 'Nepal', iso: 'NP', code: '+977' },
  { name: 'Netherlands', iso: 'NL', code: '+31' },
  { name: 'New Caledonia', iso: 'NC', code: '+687' },
  { name: 'New Zealand', iso: 'NZ', code: '+64' },
  { name: 'Nicaragua', iso: 'NI', code: '+505' },
  { name: 'Niger', iso: 'NE', code: '+227' },
  { name: 'Nigeria', iso: 'NG', code: '+234' },
  { name: 'North Korea', iso: 'KP', code: '+850' },
  { name: 'North Macedonia', iso: 'MK', code: '+389' },
  { name: 'Norway', iso: 'NO', code: '+47' },
  { name: 'Oman', iso: 'OM', code: '+968' },
  { name: 'Pakistan', iso: 'PK', code: '+92' },
  { name: 'Palau', iso: 'PW', code: '+680' },
  { name: 'Palestine', iso: 'PS', code: '+970' },
  { name: 'Panama', iso: 'PA', code: '+507' },
  { name: 'Papua New Guinea', iso: 'PG', code: '+675' },
  { name: 'Paraguay', iso: 'PY', code: '+595' },
  { name: 'Peru', iso: 'PE', code: '+51' },
  { name: 'Philippines', iso: 'PH', code: '+63' },
  { name: 'Poland', iso: 'PL', code: '+48' },
  { name: 'Portugal', iso: 'PT', code: '+351' },
  { name: 'Puerto Rico', iso: 'PR', code: '+1787' },
  { name: 'Qatar', iso: 'QA', code: '+974' },
  { name: 'Réunion', iso: 'RE', code: '+262' },
  { name: 'Romania', iso: 'RO', code: '+40' },
  { name: 'Russia', iso: 'RU', code: '+7' },
  { name: 'Rwanda', iso: 'RW', code: '+250' },
  { name: 'Saint Barthélemy', iso: 'BL', code: '+590' },
  { name: 'Saint Kitts and Nevis', iso: 'KN', code: '+1869' },
  { name: 'Saint Lucia', iso: 'LC', code: '+1758' },
  { name: 'Saint Martin', iso: 'MF', code: '+590' },
  { name: 'Saint Vincent and the Grenadines', iso: 'VC', code: '+1784' },
  { name: 'Samoa', iso: 'WS', code: '+685' },
  { name: 'San Marino', iso: 'SM', code: '+378' },
  { name: 'São Tomé and Príncipe', iso: 'ST', code: '+239' },
  { name: 'Saudi Arabia', iso: 'SA', code: '+966' },
  { name: 'Senegal', iso: 'SN', code: '+221' },
  { name: 'Serbia', iso: 'RS', code: '+381' },
  { name: 'Seychelles', iso: 'SC', code: '+248' },
  { name: 'Sierra Leone', iso: 'SL', code: '+232' },
  { name: 'Singapore', iso: 'SG', code: '+65' },
  { name: 'Slovakia', iso: 'SK', code: '+421' },
  { name: 'Slovenia', iso: 'SI', code: '+386' },
  { name: 'Solomon Islands', iso: 'SB', code: '+677' },
  { name: 'Somalia', iso: 'SO', code: '+252' },
  { name: 'South Africa', iso: 'ZA', code: '+27' },
  { name: 'South Korea', iso: 'KR', code: '+82' },
  { name: 'South Sudan', iso: 'SS', code: '+211' },
  { name: 'Spain', iso: 'ES', code: '+34' },
  { name: 'Sri Lanka', iso: 'LK', code: '+94' },
  { name: 'Sudan', iso: 'SD', code: '+249' },
  { name: 'Suriname', iso: 'SR', code: '+597' },
  { name: 'Sweden', iso: 'SE', code: '+46' },
  { name: 'Switzerland', iso: 'CH', code: '+41' },
  { name: 'Syria', iso: 'SY', code: '+963' },
  { name: 'Taiwan', iso: 'TW', code: '+886' },
  { name: 'Tajikistan', iso: 'TJ', code: '+992' },
  { name: 'Tanzania', iso: 'TZ', code: '+255' },
  { name: 'Thailand', iso: 'TH', code: '+66' },
  { name: 'Timor-Leste', iso: 'TL', code: '+670' },
  { name: 'Togo', iso: 'TG', code: '+228' },
  { name: 'Tonga', iso: 'TO', code: '+676' },
  { name: 'Trinidad and Tobago', iso: 'TT', code: '+1868' },
  { name: 'Tunisia', iso: 'TN', code: '+216' },
  { name: 'Turkey', iso: 'TR', code: '+90' },
  { name: 'Turkmenistan', iso: 'TM', code: '+993' },
  { name: 'Turks and Caicos', iso: 'TC', code: '+1649' },
  { name: 'Tuvalu', iso: 'TV', code: '+688' },
  { name: 'Uganda', iso: 'UG', code: '+256' },
  { name: 'Ukraine', iso: 'UA', code: '+380' },
  { name: 'United Arab Emirates', iso: 'AE', code: '+971' },
  { name: 'United Kingdom', iso: 'GB', code: '+44' },
  { name: 'United States', iso: 'US', code: '+1' },
  { name: 'Uruguay', iso: 'UY', code: '+598' },
  { name: 'Uzbekistan', iso: 'UZ', code: '+998' },
  { name: 'Vanuatu', iso: 'VU', code: '+678' },
  { name: 'Vatican City', iso: 'VA', code: '+379' },
  { name: 'Venezuela', iso: 'VE', code: '+58' },
  { name: 'Vietnam', iso: 'VN', code: '+84' },
  { name: 'Yemen', iso: 'YE', code: '+967' },
  { name: 'Zambia', iso: 'ZM', code: '+260' },
  { name: 'Zimbabwe', iso: 'ZW', code: '+263' },
].sort((a, b) => a.name.localeCompare(b.name));

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
                className={`object-cover transition-opacity duration-500 ${i < step ? 'scale-110' : 'scale-150'} ${i <= step ? 'opacity-100' : 'opacity-50'}`}
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

// Checkbox intérieur gris #3a3b3f, contour cococo, logo Qualityacht quand sélectionné
function CocoCheckbox({ checked }) {
  return (
    <span className="relative w-6 h-6 rounded border border-[#C0C0C0] bg-[#3a3b3f] flex items-center justify-center shrink-0 overflow-hidden">
      {checked && <Image src="/images/trans.png" alt="" fill className="object-cover scale-110" />}
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

// Sélecteur de pays autonome (pleine largeur, drapeau + nom, sans indicatif) — pour le fuseau/lieu
function CountryPicker({ country, onCountry }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selected = COUNTRIES.find(c => c.name === country) || COUNTRIES[0];
  const filtered = COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-2 bg-[#3a3b3f] border border-[#C0C0C0] rounded-xl px-4 py-3 text-[#acb0cd] text-sm focus:outline-none hover:border-[#c2622a]">
        <span className="flex items-center gap-2"><span className="text-base leading-none">{flagFromIso(selected.iso)}</span> {selected.name}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
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
                <button key={c.name} type="button" onClick={() => { onCountry(c.name); setOpen(false); setSearch(''); }}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-[#3a3b3f] ${c.name === country ? 'text-[#c2622a]' : 'text-[#acb0cd]'}`}>
                  <span className="text-base leading-none">{flagFromIso(c.iso)}</span> {c.name}
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

function CountryInput({ country, onCountry, value, onValue, placeholder, type = 'tel', extra = '', options = null, showCode = true }) {
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
          <span className="text-base leading-none">{flagFromIso(selected.iso)}</span>
          {showCode && <span>{selected.code}</span>}
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
                  <span className="flex items-center gap-2"><span className="text-base leading-none">{flagFromIso(c.iso)}</span> {c.name}</span>
                  {showCode && <span className="text-[#acb0cd]/60">{c.code}</span>}
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

              <p className="text-sm italic text-[#acb0cd]/80 pt-1 leading-relaxed">
                To ensure precise coordination of our schedules, could you please provide:<br />
                1. Your preferred time for the call?<br />
                2. Your current location / country?
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Preferred Time for the Call">
                  <select value={contact.callbackTime} onChange={e => setContact({ ...contact, callbackTime: e.target.value })}
                    className={inputClass}>
                    <option value="" className="bg-[#2e2f32]">Select a time</option>
                    {CALLBACK_SLOTS.map(o => <option key={o} value={o} className="bg-[#2e2f32]">{o}</option>)}
                  </select>
                </Field>
                <Field label="Location / Country">
                  <CountryPicker country={contact.callbackCountry} onCountry={v => setContact({ ...contact, callbackCountry: v })} />
                </Field>
              </div>

              <Field label="Preferred Contact Method">
                <div className="flex gap-2">
                  {['Email', 'Phone', 'WhatsApp'].map(m => (
                    <button key={m} onClick={() => setContact({ ...contact, contactMethod: m })}
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
