'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Users, Ship, Plane, ArrowLeft, Check } from 'lucide-react';

const STEPS = ['Charter Details', 'Contact Information', 'Thank You!'];

const COUNTRY_CODES = ['+1', '+33', '+44', '+41', '+39', '+34', '+49', '+971', '+377'];

function StepIndicator({ step }) {
  return (
    <div className="flex items-center justify-center gap-0 max-w-3xl mx-auto px-4 mb-12 md:mb-16">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center text-sm transition-all duration-500"
              style={{
                borderColor: i <= step ? '#c2622a' : '#5a5b5e',
                backgroundColor: i < step ? '#c2622a' : 'transparent',
                color: i < step ? '#fff' : (i === step ? '#c2622a' : '#7a7b7e'),
              }}
            >
              {i < step ? <Check className="w-5 h-5" /> : i + 1}
            </div>
            <span
              className="mt-2 text-[9px] md:text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-500"
              style={{ color: i === step ? '#acb0cd' : '#6a6b6e' }}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="flex-1 h-px mx-2 md:mx-4 -mt-6" style={{ backgroundColor: i < step ? '#c2622a' : '#4a4b4e' }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Champs réutilisables ───────────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.2em] text-[#acb0cd] mb-2">
        {label}{required && <span className="text-[#c2622a]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full bg-transparent border border-[#5a5b5e] rounded-none px-4 py-3 text-[#acb0cd] text-sm placeholder-[#6a6b6e] focus:outline-none focus:border-[#c2622a] transition-colors';

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
    startDate: '',
    endDate: '',
    guests: yacht.guests || '',
    proposeJets: false,
  });

  const [contact, setContact] = useState({
    company: '', title: '', firstName: '', lastName: '',
    email: '', countryCode: '+33', phone: '', message: '', acceptPolicy: false,
  });

  const goNext = () => setStep(s => Math.min(2, s + 1));
  const goBack = () => setStep(s => Math.max(0, s - 1));

  return (
    <div className="relative min-h-screen text-[#acb0cd] pt-24 pb-20 px-4 overflow-x-hidden">
      {/* Fond de base */}
      <div className="fixed inset-0 -z-20 bg-[#26272a]" />
      {/* Fond plein écran Thank You — photo voilier filtre sépia (esprit Global Jet) */}
      {step === 2 && (
        <div className="fixed inset-0 -z-10">
          <Image src="/images/pagesCaraibes/thankyou-sail.jpg" alt="" fill className="object-cover"
            style={{ filter: 'grayscale(1) sepia(0.85) contrast(1.05) brightness(0.85)' }} />
          <div className="absolute inset-0 bg-black/45" />
        </div>
      )}

      <h1 className="trajan-regular text-2xl md:text-4xl text-center uppercase tracking-[0.15em] mb-10 md:mb-14" style={{ color: '#c2622a' }}>
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[#5a5b5e]">
                  <Image src={yacht.image} alt={yacht.name} fill className="object-cover" />
                </div>
                <h2 className="trajan-regular text-xl md:text-2xl text-[#acb0cd] uppercase tracking-[0.1em] mt-4">{yacht.name}</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {yacht.type && (
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.1em] border border-[#5a5b5e] px-3 py-1 text-[#acb0cd] capitalize">
                      <Ship className="w-3 h-3 text-[#c2622a]" /> {yacht.type}
                    </span>
                  )}
                  {yacht.region && (
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.1em] border border-[#5a5b5e] px-3 py-1 text-[#acb0cd]">
                      {yacht.region}
                    </span>
                  )}
                  {yacht.price && (
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.1em] border border-[#c2622a] px-3 py-1 text-[#c2622a]">
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
                  <Field label="Return Date">
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

                {/* Confirmation infos filtre */}
                <div className="border border-[#5a5b5e] p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#6a6b6e] mb-2">Your selection</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#acb0cd]">
                    <span><span className="text-[#6a6b6e]">Yacht:</span> {yacht.name}</span>
                    {yacht.type && <span><span className="text-[#6a6b6e]">Type:</span> <span className="capitalize">{yacht.type}</span></span>}
                    {yacht.region && <span><span className="text-[#6a6b6e]">Region:</span> {yacht.region}</span>}
                  </div>
                </div>

                {/* Case proposer des jets */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input type="checkbox" checked={charter.proposeJets}
                    onChange={e => setCharter({ ...charter, proposeJets: e.target.checked })}
                    className="w-5 h-5 accent-[#c2622a]" />
                  <span className="text-sm flex items-center gap-2">
                    <Plane className="w-4 h-4 text-[#c2622a]" />
                    Also propose matching private jets for my trip
                  </span>
                </label>

                <div className="pt-2">
                  <button onClick={goNext}
                    className="w-full md:w-auto px-12 py-4 bg-[#c2622a] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#B03E00] transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ══ ÉTAPE 2 — CONTACT INFORMATION ══ */}
          <section className="w-full shrink-0 px-1">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Field label="Company"><input value={contact.company} onChange={e => setContact({ ...contact, company: e.target.value })} placeholder="Company" className={inputClass} /></Field>
                <Field label="Title"><input value={contact.title} onChange={e => setContact({ ...contact, title: e.target.value })} className={inputClass} /></Field>
                <Field label="First Name" required><input value={contact.firstName} onChange={e => setContact({ ...contact, firstName: e.target.value })} placeholder="First name" className={inputClass} /></Field>
                <Field label="Last Name" required><input value={contact.lastName} onChange={e => setContact({ ...contact, lastName: e.target.value })} placeholder="Last name" className={inputClass} /></Field>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Email" required><input type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="Email" className={inputClass} /></Field>
                <Field label="Phone" required>
                  <div className="flex">
                    <select value={contact.countryCode} onChange={e => setContact({ ...contact, countryCode: e.target.value })}
                      className="bg-transparent border border-[#5a5b5e] border-r-0 px-2 py-3 text-[#acb0cd] text-sm focus:outline-none focus:border-[#c2622a]">
                      {COUNTRY_CODES.map(c => <option key={c} value={c} className="bg-[#2e2f32]">{c}</option>)}
                    </select>
                    <input type="tel" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} placeholder="1234567890" className={inputClass} />
                  </div>
                </Field>
              </div>

              <Field label="Message">
                <textarea rows={5} value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })} className={`${inputClass} resize-none`} />
              </Field>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" checked={contact.acceptPolicy} onChange={e => setContact({ ...contact, acceptPolicy: e.target.checked })} className="w-5 h-5 accent-[#c2622a]" />
                <span className="text-sm">Accept <a href="#" className="text-[#c2622a] hover:underline">Privacy Policy</a></span>
              </label>

              <div className="flex items-center justify-between gap-4 pt-4">
                <button onClick={goBack} className="flex items-center gap-3 text-[#acb0cd] hover:text-[#c2622a] transition-colors">
                  <span className="w-12 h-12 rounded-full border border-[#5a5b5e] flex items-center justify-center"><ArrowLeft className="w-5 h-5" /></span>
                  <span className="text-sm uppercase tracking-[0.2em]">Go Back</span>
                </button>
                <button onClick={goNext}
                  className="px-12 py-4 bg-[#c2622a] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#B03E00] transition-colors">
                  Confirm
                </button>
              </div>
            </div>
          </section>

          {/* ══ ÉTAPE 3 — THANK YOU (fond plein écran géré au niveau page) ══ */}
          <section className="w-full shrink-0 px-1">
            <div className="max-w-2xl mx-auto text-center py-12 md:py-24 px-4">
              <div className="w-16 h-16 rounded-full border border-[#c2622a] bg-black/30 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-[#c2622a]" />
              </div>
              <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-white mb-4">Thank You!</h2>
              <div className="w-12 h-px bg-[#c2622a] mx-auto mb-6" />
              <p className="text-white/90 leading-relaxed mb-8">
                Your request for <span className="text-[#d39478]">{yacht.name}</span> has been received.
                One of our charter experts will contact you shortly to craft your bespoke itinerary.
              </p>
              <a href="/charters/destinations/caribbean-v15"
                className="inline-block px-10 py-4 border border-[#C0C0C0] bg-black/30 text-[#c2622a] text-sm uppercase tracking-[0.2em] hover:bg-[#c2622a] hover:text-white hover:border-[#c2622a] transition-colors">
                Back to Caribbean
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
