'use client';

import { useState, useRef, useEffect } from 'react';
// Restauration 2026-09-10 : mise en page reprise de request-quote-test-v10
// (demande client), logique de selection conservee via lib/quoteCart (panier
// partage avec les coeurs des cartes et le CTA des fiches). Sans faux captcha,
// sans « Restart yachts ».
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Users, Ship, Plane, ArrowLeft, ChevronDown, X as XIcon, PawPrint, Accessibility, Plus } from 'lucide-react';
import MonthPicker from '@/components/MonthPicker';
import JetBookingWidget from '@/components/JetBookingWidget';
import { readCart, removeFromCart, subscribeCart } from '@/lib/quoteCart';

const STEPS = ['Charter Details', 'Enhancements & Details', 'Thank You!'];

const TITLES = [
  '',
  'Mr', 'Mrs', 'Ms', 'Miss', 'Captain', 'Dr', 'Monsieur', 'Mme',
  'Ambassador', 'Avv.', 'Baron', 'Baroness', 'Chief', 'Colonel', 'Commander',
  'Count', 'Countess', 'Crown Prince', 'Dame', 'Dott.', 'Dott.ssa',
  'Duke', 'Earl', 'Frau', 'HE Dr', 'HE Sheikh', 'HE Sheikha', 'Herr',
  'HH Prince', 'HH Princess', 'HH Sheikh', 'HH Sheikha',
  'His Excellency', 'His Highness',
  'HRH', 'HRH Prince', 'HRH Princess', 'HRH Sheikh', 'HRH Sheikha',
  'Khun', 'Lady', 'Lord', 'M. et Mme', 'Maître', 'Major', 'Messieurs', 'Mlle',
  'Mr & Mrs', 'President', 'Prince', 'Professor',
  'Senor', 'Senora', 'Sheikh', 'Sheikha', 'Signor', 'Signora', 'Sir',
];

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
  const containerRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    const c = containerRef.current;
    const a = activeRef.current;
    if (!c) return;
    // Charter (1ère étape) reste calé à gauche ; sinon on centre l'étape active
    if (step === 0 || !a) {
      c.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    const offset = a.offsetLeft - c.clientWidth / 2 + a.clientWidth / 2;
    c.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
  }, [step]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-start md:justify-center gap-0 max-w-3xl mx-auto px-4 mb-12 md:mb-16 overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {STEPS.map((label, i) => {
        // Une étape est "validée" si elle est avant l'étape courante,
        // OU si on est sur la dernière étape (Thank You) → tout est complété (suite logique)
        const done = i < step || step === STEPS.length - 1;
        return (
        <div key={i} ref={i === step ? activeRef : null} className="flex items-center shrink-0 md:flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            {/* Rond : logo transparent (en attente) → médaillon (validé) */}
            <div
              className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center overflow-hidden transition-all duration-500"
              style={{ borderColor: done ? '#C0C0C0' : 'transparent' }}
            >
              <Image
                src={done ? '/images/logoFondTrans.png' : '/images/trans.png'}
                alt=""
                fill
                className={`object-cover transition-opacity duration-500 ${done ? 'scale-110' : 'scale-150'} ${i <= step ? 'opacity-100' : 'opacity-50'}`}
              />
            </div>
            <span
              className={`mt-2 text-[12px] md:text-[14px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-500 ${i === step ? 'opacity-100' : 'opacity-50'}`}
              style={{ color: i === step ? '#acb0cd' : '#C0C0C0' }}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="w-10 md:flex-1 h-px mx-2 md:mx-4 -mt-6" style={{ backgroundColor: '#C0C0C0', opacity: done ? 1 : 0.3 }} />
          )}
        </div>
        );
      })}
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
  // Yacht transmis par l'URL : conserve comme repli pour les liens directs.
  const fromUrl = params.get('name')
    ? {
        id: params.get('id') || null,
        name: params.get('name'),
        image: params.get('image') || '/images/yachts/yatch2.jpeg',
        guests: params.get('guests') || '',
        type: params.get('type') || '',
        region: params.get('region') || '',
        price: params.get('price') || '',
      }
    : null;

  // Support ?step=1 (Contact Info direct) ou ?step=2 — utilisé par "Contact broker".
  // Mode accessible (?accessible=1) — variante demandee par le client le
  // 2026-09-10 pour le parcours /charters/accessible : titre dedie, Reduced
  // mobility verrouillee, pas de Pet friendly ni de jets, bouton principal
  // « Begin your accessible charter journey », pas de message « quote is empty ».
  const accessibleMode = params.get('accessible') === '1';
  // Message pre-rempli (ex. besoins d'accessibilite transmis par le guide).
  const initialMessage = params.get('message') || '';

  const initialStep = (() => {
    const s = Number(params.get('step'));
    return Number.isFinite(s) && s >= 0 && s <= 2 ? s : 0;
  })();
  const [step, setStep] = useState(initialStep);

  // La selection stockee fait foi : elle peut contenir PLUSIEURS yachts, ajoutes
  // depuis les coeurs des cartes ou depuis le CTA d'une fiche (lib/quoteCart).
  const [boats, setBoats] = useState([]);
  useEffect(() => {
    const lire = () => {
      const c = readCart();
      setBoats(c.length ? c : fromUrl ? [fromUrl] : []);
    };
    lire();
    return subscribeCart(lire);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retirer = (b) => {
    removeFromCart(b);
    setBoats((prev) => prev.filter((x) => x !== b));
  };

  // Le premier yacht alimente les champs pre-remplis, comme auparavant.
  const yacht = boats[0] || fromUrl || {
    name: 'Selected Yacht', image: '/images/yachts/yatch2.jpeg',
    guests: '', type: '', region: '', price: '',
  };

  const [charter, setCharter] = useState({
    startMonth: '', endMonth: '', guests: yacht.guests || '',
    proposeJets: false, pets: false, accessible: accessibleMode,
  });

  // 24 mois glissants pour les selects Departure / Return
  const months = (() => {
    const out = [];
    const now = new Date();
    for (let i = 0; i < 24; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
      out.push({ value, label });
    }
    return out;
  })();

  const [contact, setContact] = useState({
    company: '', title: '', firstName: '', lastName: '',
    email: '', email2: '',
    phoneCountry: 'Switzerland', phone: '',
    waCountry: 'Switzerland', whatsapp: '',
    callbackCountry: 'Switzerland', callbackTime: '',
    contactMethod: 'Email',
    message: initialMessage, acceptPolicy: false,
  });

  // Remonter en haut de page à chaque changement d'étape
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const goNext = () => setStep(s => Math.min(2, s + 1));
// Les trois etapes restent cote a cote dans le DOM et le carrousel se contente
  // de les decaler. L'etape voisine frole alors le bord du overflow-hidden, et son
  // liseré argente laisse passer une bande verticale claire (signalee par la
  // cliente sur /request-quote-test-v10, "une bande lumineuse a cote du phone").
  // On rend donc les etapes inactives reellement impeignables : visibility:hidden
  // ne peut fuir sous aucun arrondi de sous-pixel, contrairement a un simple clip.
  // Le masquage est RETARDE de la duree du glissement (500ms) pour que l'etape
  // sortante reste visible pendant l'animation ; l'apparition, elle, est immediate.
  // Effet de bord souhaitable : les champs hors ecran sortent de l'ordre de
  // tabulation, alors qu'aujourd'hui le clavier y entre a l'aveugle.
  const paneClass = (i) =>
    `w-full shrink-0 px-1 transition-[visibility] duration-0 ${step === i ? '' : 'invisible delay-500'}`;

  const goBack = () => setStep(s => Math.max(0, s - 1));

  return (
    <div className="relative min-h-screen text-[#acb0cd] pt-24 pb-20 px-4 overflow-x-hidden">
      {/* Fond de base */}
      <div className="fixed inset-0 -z-20 bg-[#26272a]" />
      {/* Fond plein écran Thank You — la photo arrive APRES un temps de lecture (transition douce) */}
      {step === 2 && (
        <>
          <style>{`@keyframes thankPhotoIn{0%{opacity:0;filter:blur(10px);transform:scale(1.08)}100%{opacity:1;filter:blur(0);transform:scale(1)}}`}</style>
          <div className="absolute inset-0 -z-10" style={{ animation: 'thankPhotoIn 2s ease-out forwards' }}>
            <Image src="/images/pagesCaraibes/thankyou-sail.jpg" alt="" fill className="object-cover object-top md:object-contain" />
            <div className="absolute inset-0 bg-black/35" />
          </div>
        </>
      )}

      <h1 className={`trajan-regular font-bold text-2xl md:text-4xl text-center uppercase tracking-[0.15em] mb-10 md:mb-14 text-[#C0C0C0] [-webkit-text-stroke:0.6px_#C0C0C0] ${step === 2 ? 'mt-[10vh]' : ''}`}>
        {accessibleMode ? 'Design Your Next Accessible Charter' : 'Request Your Next Charter'}
      </h1>

      <StepIndicator step={step} />

      {/* Slider */}
      <div className="overflow-hidden max-w-5xl mx-auto">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${step * 100}%)` }}>

          {/* ══ ÉTAPE 1 — CHARTER DETAILS (vignettes panier + mois + checkboxes) ══ */}
          <section className={paneClass(0)}>
            <div className="space-y-6">
              {/* Vignettes des yachts du panier */}
              {boats.length === 0 ? (
                !accessibleMode && <p className="text-center text-sm text-[#acb0cd]/70">Your quote is empty.</p>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {boats.map((b, i) => (
                    <div key={`${b.id || b.name}-${i}`} data-testid="quote-boat" className="relative rounded-xl overflow-hidden border border-[#C0C0C0]">
                      <div className="relative aspect-[3/4]">
                        <Image src={b.image} alt={b.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <button type="button" onClick={() => retirer(b)} title="Remove from quote" aria-label={`Remove ${b.name || 'this yacht'} from your selection`}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full border border-[#C0C0C0] bg-black/40 text-[#C0C0C0] flex items-center justify-center hover:text-[#B03E00] hover:border-[#B03E00] transition-colors">
                          <XIcon className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-2.5">
                          <h3 className="trajan-regular text-sm text-[#C0C0C0] uppercase tracking-[0.1em]">{b.name}</h3>
                          <p className="text-[10px] text-[#acb0cd]/80 mt-1">
                            {[b.length, b.guests && `${b.guests} guests`, b.type].filter(Boolean).join(' · ')}
                          </p>
                          {b.price && <p className="text-[10px] text-[#acb0cd]">{b.price}/wk</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}


              {/* Trip details : mois uniquement (24 mois glissants) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Departure month" required>
                  <MonthPicker value={charter.startMonth} onChange={(v) => setCharter({ ...charter, startMonth: v })} placeholder="Select month" />
                </Field>
                <Field label="Return month" required>
                  <MonthPicker value={charter.endMonth} onChange={(v) => setCharter({ ...charter, endMonth: v })} placeholder="Select month" />
                </Field>
                <Field label="Number of Guests" required>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c2622a] pointer-events-none" />
                    <input type="number" min="1" max="50" placeholder="e.g. 8" value={charter.guests}
                      onChange={e => setCharter({ ...charter, guests: e.target.value })}
                      className={`${inputClass} pl-10`} />
                  </div>
                </Field>
              </div>

              {/* Checkboxes options — style CocoCheckbox (logo Qualityacht quand coché) */}
              <div className="space-y-2.5">
                {!accessibleMode && (
                  <label onClick={() => setCharter({ ...charter, pets: !charter.pets })}
                    className="flex items-center gap-3 cursor-pointer select-none">
                    <CocoCheckbox checked={charter.pets} />
                    <span className="text-sm flex items-center gap-2 text-[#acb0cd]">
                      <PawPrint className="w-4 h-4 text-[#c2622a]" />
                      Pet friendly
                    </span>
                  </label>
                )}
                {accessibleMode ? (
                  /* Verrouillee : activee par notre equipe, non modifiable par le client. */
                  <div role="checkbox" aria-checked="true" aria-disabled="true"
                    className="flex items-center gap-3 select-none rounded-xl border border-[#B03E00]/60 bg-[#3a3b3f] px-4 py-3">
                    <CocoCheckbox checked />
                    <span className="text-base flex items-center gap-2 text-[#C0C0C0]">
                      <Accessibility className="w-5 h-5 text-[#B03E00]" />
                      Reduced mobility access required
                    </span>
                    <span className="ml-auto text-[11px] uppercase tracking-[0.18em] text-[#B03E00]">Included</span>
                  </div>
                ) : (
                  <label onClick={() => setCharter({ ...charter, accessible: !charter.accessible })}
                    className="flex items-center gap-3 cursor-pointer select-none">
                    <CocoCheckbox checked={charter.accessible} />
                    <span className="text-sm flex items-center gap-2 text-[#acb0cd]">
                      <Accessibility className="w-4 h-4 text-[#c2622a]" />
                      Reduced mobility access required
                    </span>
                  </label>
                )}
                {!accessibleMode && (
                  <label onClick={() => setCharter({ ...charter, proposeJets: !charter.proposeJets })}
                    className="flex items-center gap-3 cursor-pointer select-none">
                    <CocoCheckbox checked={charter.proposeJets} />
                    <span className="text-sm flex items-center gap-2 text-[#acb0cd]">
                      <Plane className="w-4 h-4 text-[#c2622a]" />
                      Also propose matching private jets for my trip
                    </span>
                  </label>
                )}
              </div>

              {/* Ajouter un bateau a la selection : renvoie sur la LISTE et non
                  sur une fiche, pour que le client reparte du catalogue complet
                  (demande client). Place au-dessus de Go Back. */}
              <a
                href="/yachts"
                className="mt-4 flex items-center justify-center gap-3 w-full rounded-xl border-2 border-[#C0C0C0] px-6 py-3 text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]"
              >
                <Plus className="w-4 h-4 md:w-5 md:h-5" />
                Secure Another Yacht
              </a>

              <div className="pt-2 flex items-center justify-between gap-2 md:gap-4">
                <GhostButton onClick={() => { if (typeof window !== 'undefined') window.history.back(); }} className="inline-flex items-center gap-2 px-3 py-2 md:gap-3 md:px-6 md:py-3 text-xs md:text-sm font-bold shrink-0">
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Go Back
                </GhostButton>
                <PrimaryButton onClick={goNext} className="px-6 py-2.5 md:px-12 md:py-4 text-xs md:text-sm">{accessibleMode ? 'Begin your accessible charter journey' : 'Secure My Charter'}</PrimaryButton>
              </div>
            </div>
          </section>

          {/* ══ ÉTAPE 2 — CONTACT INFORMATION ══ */}
          <section className={paneClass(1)}>
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Si l'utilisateur a coché "private jets" en step 0 et n'a pas encore confirmé, on lui propose le widget de réservation jet juste avant la note */}
              {charter.proposeJets && step === 1 && (
                <div>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-3">
                    Book your private jet
                  </p>
                  <JetBookingWidget />
                </div>
              )}

              {/* Note d'introduction (bleu lavande) */}
              <p className="text-sm italic leading-relaxed text-[#acb0cd]">
                A yacht is the pinnacle of personalization—your desires, your destinations, your legacy. Share your vision, and we will craft an experience beyond imagination.
              </p>
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
                Your preferred time for the call and your current country?
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Preferred Time for the Call">
                  <select value={contact.callbackTime} onChange={e => setContact({ ...contact, callbackTime: e.target.value })}
                    className={inputClass}>
                    <option value="" className="bg-[#2e2f32]">Select a time</option>
                    {CALLBACK_SLOTS.map(o => <option key={o} value={o} className="bg-[#2e2f32]">{o}</option>)}
                  </select>
                </Field>
                <Field label="Country">
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
                <span className="text-sm text-[#acb0cd]">Accept <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-[#c2622a] hover:underline focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">Privacy Policy</a></span>
              </label>

              <div className="flex items-center justify-between gap-2 md:gap-4 pt-4">
                <GhostButton onClick={goBack} className="inline-flex items-center gap-2 px-3 py-2 md:gap-3 md:px-6 md:py-3 text-xs md:text-sm shrink-0">
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Go Back
                </GhostButton>
                <PrimaryButton onClick={goNext} className="px-6 py-2.5 md:px-12 md:py-4 text-xs md:text-sm">Secure My Reservation</PrimaryButton>
              </div>
            </div>
          </section>

          {/* ══ ÉTAPE 3 — THANK YOU ══ */}
          <section className={paneClass(2)}>
            <div className="max-w-2xl mx-auto text-center px-2 md:px-4 pt-24 pb-10 md:py-24 min-h-[80vh] md:min-h-0 flex flex-col items-center justify-between md:justify-center gap-20 md:gap-0">
              <div className="flex flex-col items-center w-full">
                <div className="trajan-bold font-bold text-2xl md:text-3xl uppercase tracking-[0.12em] mb-8 md:mb-4" style={{ color: '#B03E00', WebkitTextStroke: '0.8px #B03E00' }}>Grateful</div>
                <div className="relative w-44 h-10 mx-auto mb-10 md:mb-6 overflow-hidden">
                  <Image src="/images/title-line.png" alt="" fill className="object-contain scale-x-150 scale-y-[3]" />
                </div>
                <div className="w-full rounded-xl border border-[#C0C0C0] bg-black/40 px-5 py-8 md:px-8 md:py-6 md:mb-16">
                  <p className="text-[#acb0cd] text-base md:text-lg leading-loose">
                    Your request for{' '}
                    {/* Tous les yachts selectionnes sont nommes, pas seulement le premier
                        (demande client 2026-09-12). Quatre au maximum, comme le panier. */}
                    {(boats.length ? boats : [yacht]).slice(0, 4).map((b, i, arr) => (
                      <span key={`${b.id || b.name}-${i}`}>
                        <span className="text-[#B03E00] uppercase">{b.name}</span>
                        {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' and ' : ''}
                      </span>
                    ))}{' '}
                    has been received.
                    One of our charter experts will contact you shortly to craft your bespoke itinerary.
                  </p>

                  {/* Rappel visuel de la selection complete (4 maximum). */}
                  {boats.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                      {boats.slice(0, 4).map((b, i) => (
                        <div
                          key={`recap-${b.id || b.name}-${i}`}
                          data-testid="quote-recap-boat"
                          className="relative rounded-lg overflow-hidden border border-[#C0C0C0]/70"
                        >
                          <div className="relative aspect-[3/4]">
                            <Image src={b.image} alt={b.name} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                              <h3 className="trajan-regular text-[11px] md:text-xs text-[#C0C0C0] uppercase tracking-[0.08em] leading-tight">
                                {b.name}
                              </h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full">
                {/* Carte fine posee au-dessus du retour a l'accueil : elle rattrape
                    le client qui voudrait un second bateau, et le renvoie sur la
                    LISTE plutot que sur une fiche. Deux lignes, lavande puis
                    orange brule, l'ensemble cliquable. */}
                <a
                  href="/yachts"
                  className="block w-full rounded-xl border border-[#C0C0C0] bg-black/30 px-6 py-4 mb-4 text-center transition-colors hover:border-[#B03E00]"
                >
                  <span className="block text-[#acb0cd] text-base md:text-lg leading-snug">
                    Would you like to secure an additional yacht?
                  </span>
                  <span className="mt-2 block text-[#B03E00] text-sm md:text-base uppercase tracking-[0.2em] font-medium">
                    Revisit Your Yacht Portfolio
                  </span>
                </a>
                <a href="/#discovery"
                  className="block w-full text-center rounded-xl px-10 py-4 border-2 border-[#C0C0C0] bg-black/40 text-[#B03E00] text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]">
                  Back to Homepage
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
