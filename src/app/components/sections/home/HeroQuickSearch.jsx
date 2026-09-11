'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Users, Ship, ArrowRight, ChevronDown } from 'lucide-react';

/**
 * Configurateur du hero. Chaque champ correspond a un parametre que /yachts lit
 * REELLEMENT dans l'URL (voir YachtPageClient : destination, capacity, type).
 * Aucun critere decoratif : pas de dates, /yachts ne sait pas les filtrer.
 *
 * Les options proposees sont limitees a celles qui renvoient des resultats dans le
 * catalogue actuel. Ajouter une destination ici des qu'elle contient des yachts
 * dans l'admin suffit a l'activer.
 */

const DESTINATIONS = [
  { value: '', label: 'All destinations' },
  { value: 'caribbean', label: 'Caribbean' },
];

const GUESTS = [
  { value: '', label: 'Any number' },
  { value: '2', label: '2 guests or more' },
  { value: '4', label: '4 guests or more' },
  { value: '6', label: '6 guests or more' },
  { value: '8', label: '8 guests or more' },
  { value: '10', label: '10 guests or more' },
  { value: '12', label: '12 guests or more' },
];

const TYPES = [
  { value: '', label: 'Any type' },
  { value: 'motor', label: 'Motor yacht' },
  { value: 'sailing', label: 'Sailing yacht' },
];

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c2622a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#3a3b3f]';

// Le select est transparent et sans chrome : c'est la capsule qui porte le style.
// Couleur de la valeur separee : sur mobile la capsule est sombre (#26272a),
// sur desktop la barre est claire et floutee, la valeur doit donc etre sombre
// pour rester lisible (demande client 2026-09-11).
const selectClass =
  'w-full bg-transparent border-0 p-0 text-[16px] font-medium cursor-pointer appearance-none ' +
  'focus:outline-none focus-visible:underline focus-visible:underline-offset-4';
const selectColorMobile = 'text-[#ACB0CD]';
const selectColorDesktop = 'text-[#e6e8f0]';

const eyebrowClass = 'block text-[12px] font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]';

function buildHref({ destination, capacity, type }) {
  const params = new URLSearchParams();
  if (destination) params.set('destination', destination);
  if (capacity) params.set('capacity', capacity);
  if (type) params.set('type', type);
  const q = params.toString();
  return q ? `/yachts?${q}` : '/yachts';
}

export default function HeroQuickSearch({ variant = 'desktop' }) {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [capacity, setCapacity] = useState('');
  const [type, setType] = useState('');

  const href = useMemo(() => buildHref({ destination, capacity, type }), [destination, capacity, type]);

  // `action`/`method` assurent un repli natif si le JavaScript ne s'execute pas :
  // le navigateur envoie alors les memes parametres en GET vers /yachts.
  const onSubmit = (e) => {
    e.preventDefault();
    router.push(href);
  };

  // Les deux variantes sont presentes simultanement dans le HTML (l'une masquee en CSS) :
  // les identifiants doivent donc rester uniques a l'echelle du document.
  const idFor = (field) => `home-quick-search-${variant}-${field}`;

  const fields = [
    {
      id: idFor('destination'), eyebrow: 'Where?', Icon: MapPin, name: 'destination',
      value: destination, onChange: setDestination, options: DESTINATIONS, label: 'Destination',
    },
    {
      id: idFor('capacity'), eyebrow: 'Who?', Icon: Users, name: 'capacity',
      value: capacity, onChange: setCapacity, options: GUESTS, label: 'Number of guests',
    },
    {
      id: idFor('type'), eyebrow: 'What?', Icon: Ship, name: 'type',
      value: type, onChange: setType, options: TYPES, label: 'Type of yacht',
    },
  ];

  if (variant === 'mobile') {
    return (
      <form action="/yachts" method="get" onSubmit={onSubmit} aria-label="Find your yacht">
        <div className="flex flex-col gap-2.5">
          {fields.map(({ id, eyebrow, Icon, name, value, onChange, options, label }) => (
            <label
              key={id}
              htmlFor={id}
              className="flex min-h-[56px] cursor-pointer items-center gap-3.5 rounded-2xl border border-[#C0C0C0] bg-[#26272a] px-4 py-2.5"
            >
              <Icon aria-hidden className="w-5 h-5 shrink-0 text-[#C2622A] pointer-events-none" />
              <div className="min-w-0 flex-1">
                <span className={eyebrowClass}>
                  {eyebrow} <span className="sr-only">{label}</span>
                </span>
                <select
                  id={id}
                  name={name}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  aria-label={`${eyebrow} ${label}`}
                  className={`${selectClass} ${selectColorMobile} text-[16px] leading-snug`}
                >
                  {options.map((o) => (
                    <option key={o.value} value={o.value} className="bg-[#26272a]">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <ChevronDown aria-hidden className="w-4 h-4 shrink-0 text-[#C0C0C0]/55 pointer-events-none" />
            </label>
          ))}
        </div>

        <button
          type="submit"
          className={`mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-[#C0C0C0] bg-[#353739] px-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C2622A] shadow-[0_0_16px_rgba(192,192,192,0.25)] active:bg-[#3f4245] ${focusRing}`}
        >
          Share Your Vision
          <ArrowRight aria-hidden className="w-4 h-4" />
        </button>
      </form>
    );
  }

  return (
    <form
      action="/yachts"
      method="get"
      onSubmit={onSubmit}
      aria-label="Find your yacht"
      className="w-full max-w-5xl rounded-full border border-[#C0C0C0]/70 bg-[#26272a]/75 backdrop-blur-md shadow-[0_0_24px_rgba(192,192,192,0.18),0_18px_48px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-stretch">
        {fields.map(({ id, eyebrow, Icon, name, value, onChange, options, label }, i) => (
          <div key={id} className="flex-1 flex items-stretch min-w-0">
            {/* Separateur discret : une simple ligne argent tres pale. */}
            {i > 0 && <span aria-hidden className="my-4 w-px bg-[#C0C0C0]/30 shrink-0" />}
            <label
              htmlFor={id}
              className="group flex-1 min-w-0 flex cursor-pointer items-center gap-3 rounded-full px-6 py-4 transition-colors duration-300 hover:bg-[#C0C0C0]/5"
            >
              <Icon
                aria-hidden
                className="w-5 h-5 shrink-0 text-[#C2622A] transition-colors duration-300 group-hover:text-[#d4783c] pointer-events-none"
              />
              <div className="min-w-0 flex-1">
                <span className={eyebrowClass}>
                  {eyebrow} <span className="sr-only">{label}</span>
                </span>
                <select
                  id={id}
                  name={name}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  aria-label={`${eyebrow} ${label}`}
                  className={`${selectClass} ${selectColorDesktop}`}
                >
                  {options.map((o) => (
                    <option key={o.value} value={o.value} className="bg-[#26272a]">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <ChevronDown
                aria-hidden
                className="w-4 h-4 shrink-0 text-[#C0C0C0]/55 transition-colors duration-300 group-hover:text-[#C0C0C0] pointer-events-none"
              />
            </label>
          </div>
        ))}

        <div className="flex items-center pl-2 pr-2 py-2 shrink-0">
          <button
            type="submit"
            className={`inline-flex items-center gap-2 rounded-full border border-[#C0C0C0] bg-[#353739] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C2622A] shadow-[0_0_16px_rgba(192,192,192,0.25)] transition-colors duration-300 hover:bg-[#3f4245] ${focusRing}`}
          >
            Share Your Vision
            <ArrowRight aria-hidden className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
