'use client';

// Page contact-broker — broker "Private Jet" sous-route de /privat-jet/[slug].
// Bloc 1 : header de réservation (One Way / Round Trip / Multi + FROM/TO/Date/Time/Pax/Aircraft)
// Bloc 2 : formulaire Contact Info (depuis le wizard) + Subject + Emergency button
//
// TO ne propose QUE les aéroports listés dans la page Caraïbes (seule région avec un parc actif).

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import JetBookingWidget from '@/components/JetBookingWidget';
import {
  TITLES,
  CALLBACK_SLOTS,
  inputClass,
  Field,
  CocoCheckbox,
  CountryPicker,
  CountryInput,
} from './sharedUI';

export default function ContactBrokerPage() {
  // ── Contact Info state ──
  const [contact, setContact] = useState({
    company: '', title: '', firstName: '', lastName: '',
    email: '', email2: '',
    phoneCountry: 'Switzerland', phone: '',
    waCountry: 'Switzerland', whatsapp: '',
    callbackCountry: 'Switzerland', callbackTime: '',
    contactMethod: 'Email',
    message: '', acceptPolicy: false, notRobot: false,
    petsFriendly: false, group: false, prm: false, emergency: false,
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    setSent(true);
    // Remonte tout en haut pour voir le titre + message de confirmation
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  // ══ État SENT : reproduit le Thank You du wizard /request-quote-test-v10 ══
  if (sent) {
    return (
      <div className="relative min-h-screen text-[#acb0cd] pt-24 pb-20 px-4 overflow-x-hidden">
        {/* Fond de base + photo "Thank You" avec fade-in 2s */}
        <div className="fixed inset-0 -z-20 bg-[#26272a]" />
        <style>{`@keyframes thankPhotoIn{0%{opacity:0;filter:blur(10px);transform:scale(1.08)}100%{opacity:1;filter:blur(0);transform:scale(1)}}`}</style>
        <div className="absolute inset-0 -z-10" style={{ animation: 'thankPhotoIn 2s ease-out forwards' }}>
          <Image src="/images/private_jet/private-jet_thankyou.jpg" alt="" fill className="object-cover object-top md:object-contain" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-[#e8b44a] mix-blend-multiply opacity-40" />
        </div>

        <h1 className="trajan-regular font-bold text-2xl md:text-4xl text-center uppercase tracking-[0.15em] mb-10 md:mb-14 text-[#C0C0C0] [-webkit-text-stroke:0.6px_#C0C0C0] mt-[10vh]">
          Contact Broker Jet
        </h1>

        <div className="max-w-2xl mx-auto text-center px-2 md:px-4 pt-6 pb-10 md:py-10 min-h-[60vh] md:min-h-0 flex flex-col items-center justify-between md:justify-center gap-20 md:gap-12">
          <div className="flex flex-col items-center w-full">
            {contact.emergency && (
              <div className="inline-flex items-center gap-2 mb-6 text-[#B03E00]">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold">Emergency request</span>
              </div>
            )}
            <div className="trajan-bold font-bold text-2xl md:text-3xl uppercase tracking-[0.12em] mb-8 md:mb-4" style={{ color: '#B03E00', WebkitTextStroke: '0.8px #B03E00' }}>
              Grateful
            </div>
            <div className="relative w-44 h-10 mx-auto mb-10 md:mb-6 overflow-hidden">
              <Image src="/images/title-line.png" alt="" fill className="object-contain scale-x-150 scale-y-[3]" />
            </div>
            <div className="w-full rounded-xl border border-[#C0C0C0] bg-black/40 px-5 py-8 md:px-8 md:py-6 md:mb-16">
              <p className="text-[#acb0cd] text-base md:text-lg leading-loose">
                Your request has been received.
                One of our brokers will contact you within 24 hours to craft your bespoke private jet experience.
              </p>
            </div>
          </div>
          <Link href="/"
            className="block w-full text-center rounded-xl px-10 py-4 border-2 border-[#C0C0C0] bg-black/40 text-[#B03E00] text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]">
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen pt-[70px] md:pt-24">
      {/* ══ TITRE ══ */}
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-12 text-center">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-3">
          Get in touch
        </p>
        <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#C0C0C0]">
          Contact Broker Jet
        </h1>
        <div className="relative w-32 h-6 mx-auto mt-4 mb-6">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
        <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-[#7cb88a]">
          Our brokers are available 24/7 to handle all your requests — yacht charter, private jet, transfers.
          Describe your project in a few lines, we&apos;ll get back to you within 24 hours.
        </p>
      </div>

      {/* ══ BOOKING HEADER PRIVATE JET — composant partage ══ */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 mb-10 md:mb-14">
        <JetBookingWidget />
      </div>

      {/* ══ FORMULAIRE Contact Info ══ */}
      <div id="contact-form-anchor" className="max-w-4xl mx-auto px-5 md:px-8 pb-20">
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

            {/* Request type — cases a cocher au-dessus de Message */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#acb0cd] mb-3">Request type</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                  { key: 'petsFriendly', label: 'Pets friendly' },
                  { key: 'group', label: 'Group' },
                  { key: 'prm', label: 'PRM (Person with Reduced Mobility)' },
                  { key: 'emergency', label: 'Emergency' },
                ].map(({ key, label }) => (
                  <label key={key} onClick={() => setContact({ ...contact, [key]: !contact[key] })}
                    className="flex items-center gap-2 cursor-pointer select-none">
                    <CocoCheckbox checked={contact[key]} />
                    <span className="text-sm text-[#acb0cd]">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <Field label="Message">
              <textarea rows={5} value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })} className={`${inputClass} resize-none`} />
            </Field>

            {/* Privacy + captcha */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <label onClick={() => setContact({ ...contact, acceptPolicy: !contact.acceptPolicy })}
                className="flex items-center gap-3 cursor-pointer select-none">
                <CocoCheckbox checked={contact.acceptPolicy} />
                <span className="text-sm text-[#acb0cd]">Accept <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-[#c2622a] hover:underline focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">Privacy Policy</a></span>
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
            <div className="flex items-center justify-between gap-2 md:gap-4 pt-4">
              <Link href="/" className="rounded-xl border border-[#C0C0C0] text-[#acb0cd] text-sm uppercase tracking-[0.2em] hover:border-[#B03E00] hover:text-[#B03E00] transition-colors inline-flex items-center gap-2 px-3 py-2 md:gap-3 md:px-6 md:py-3 text-xs md:text-sm shrink-0">
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Go Back
              </Link>

              <button type="submit"
                className="border-2 border-[#C0C0C0] rounded-xl text-[#B03E00] text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)] px-6 py-2.5 md:px-12 md:py-4 text-xs md:text-sm">
                Confirm
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}
