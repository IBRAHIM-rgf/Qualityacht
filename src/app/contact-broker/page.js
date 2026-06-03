'use client';

// Page contact-broker — propose désormais TOUS les champs de l'étape "Contact Info"
// du wizard /request-quote-test-v10. Helpers/constants importés depuis ./sharedUI.

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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
  const [contact, setContact] = useState({
    company: '', title: '', firstName: '', lastName: '',
    email: '', email2: '',
    phoneCountry: 'Switzerland', phone: '',
    waCountry: 'Switzerland', whatsapp: '',
    callbackCountry: 'Switzerland', callbackTime: '',
    contactMethod: 'Email',
    message: '', acceptPolicy: false, notRobot: false,
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO : brancher sur l'endpoint d'envoi mail
    setSent(true);
  };

  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen pt-[70px] md:pt-24">
      {/* ══ HEADER ══ */}
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-16 text-center">
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

{/* ══ FORMULAIRE — mêmes champs que /request-quote-test-v10 step "Contact Info" ══ */}
      <div className="max-w-4xl mx-auto px-5 md:px-8 pb-20">
        {sent ? (
          <div className="rounded-xl border border-[#B03E00] bg-[#B03E00]/10 p-8 text-center">
            <p className="trajan-regular text-xl md:text-2xl text-[#C0C0C0] mb-2">Message sent</p>
            <p className="text-sm text-[#7cb88a]">A broker will get back to you within 24 hours.</p>
            <Link href="/" className="inline-flex items-center gap-2 mt-6 text-sm text-[#7cb88a] hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Note d'introduction (bleu lavande, italique) */}
            <p className="text-sm italic leading-relaxed text-[#acb0cd]">
              A yacht is the pinnacle of personalization—your desires, your destinations, your legacy. Share your vision, and we will craft an experience beyond imagination.
            </p>

            {/* Company / Title / First Name / Last Name */}
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

            {/* Email / Secondary email */}
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

            {/* Note coordination */}
            <p className="text-sm italic text-[#acb0cd]/80 pt-1 leading-relaxed">
              To ensure precise coordination of our schedules, could you please provide:<br />
              Your preferred time for the call and your current country?
            </p>

            {/* Preferred Time / Country */}
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

            {/* Preferred Contact Method */}
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
            <div className="flex items-center justify-between gap-2 md:gap-4 pt-4">
              <Link href="/" className="rounded-xl border border-[#C0C0C0] text-[#acb0cd] text-sm uppercase tracking-[0.2em] hover:border-[#B03E00] hover:text-[#B03E00] transition-colors inline-flex items-center gap-2 px-3 py-2 md:gap-3 md:px-6 md:py-3 text-xs md:text-sm shrink-0">
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Go Back
              </Link>
              <button type="submit"
                className="border-2 border-[#C0C0C0] rounded-xl text-[#B03E00] text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)] px-6 py-2.5 md:px-12 md:py-4 text-xs md:text-sm">
                Send
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
