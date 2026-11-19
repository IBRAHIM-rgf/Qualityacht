'use client';

// Formulaire « Request a Feasibility Study » (client 2026-11-17) : partage par
// Arctic (Russian Arctic) et Central America (Brazil — Special Expeditions).
// Pas de reservation ni de promesse de disponibilite ; envoi via /api/contact.

import { useState } from 'react';
import { X } from 'lucide-react';

const FIELD = 'w-full rounded-lg border border-[#C0C0C0]/30 bg-[#26272a] px-3 py-2.5 text-sm text-[#acb0cd] placeholder:text-[#acb0cd]/40 focus:outline-none focus:border-[#c2622a]';

// Formulaire de demande d'etude (Russian Arctic) : envoie via /api/contact.
export default function FeasibilityEnquiryModal({ place, onClose, subject, badge, intro }) {
  const [status, setStatus] = useState('idle');
  const [notice, setNotice] = useState('');
  if (!place) return null;

  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      reason: 'general',
      fullName: String(f.get('fullName') || '').trim(),
      email: String(f.get('email') || '').trim(),
      phone: String(f.get('phone') || '').trim(),
      message: `${subject}\nDestination: ${place.name}\n\n${String(f.get('message') || '')}`,
      experiences: [],
      consent: f.get('consent') === 'on',
      website: String(f.get('website') || ''),
    };
    if (!payload.fullName || !payload.email || !payload.phone || !payload.consent) {
      setNotice('Please complete all required fields.');
      return;
    }
    setStatus('sending'); setNotice('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok === true && body.delivered === true) { setStatus('sent'); return; }
      setStatus('idle');
      setNotice('Your request could not be sent. Please try again in a moment.');
    } catch {
      setStatus('idle');
      setNotice('Your request could not be sent. Please try again in a moment.');
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#2e2f32] rounded-2xl border border-[#C0C0C0]/30 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="trajan-regular text-[#acb0cd] text-sm md:text-base uppercase tracking-[0.15em]">{place.name}</h3>
          <button onClick={onClose} aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#c2622a] hover:text-[#c2622a] transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-5">
          <div className="text-center mb-4">
            <span className="inline-block rounded-full border border-[#c2622a]/60 px-4 py-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#c2622a]">{badge}</span>
            <p className="mt-3 text-[12px] leading-relaxed text-[#acb0cd]/70">
              {intro}
            </p>
          </div>
          {status === 'sent' ? (
            <p className="text-center text-sm text-[#acb0cd] py-6">Thank you. Your feasibility study request has been received.</p>
          ) : (
            <form onSubmit={submit} className="space-y-3" noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <input name="fullName" required placeholder="Full Name" autoComplete="name" className={FIELD} />
              <input name="email" type="email" required placeholder="Email Address" autoComplete="email" className={FIELD} />
              <input name="phone" type="tel" required placeholder="Phone Number (with country code)" autoComplete="tel" className={FIELD} />
              <textarea name="message" rows={4} placeholder="Dates, guests, preferred yacht and any details" className={`${FIELD} resize-y`} />
              <label className="flex items-start gap-2 text-[11px] text-[#acb0cd]/70">
                <input type="checkbox" name="consent" className="mt-0.5 accent-[#c2622a]" />
                I agree that Qualityacht may use my details to answer this request.
              </label>
              {notice && <p className="text-[12px] text-[#c2622a]">{notice}</p>}
              <button type="submit" disabled={status === 'sending'}
                className="w-full min-h-[46px] rounded-full border border-[#C0C0C0] bg-[#26272a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] transition-colors hover:border-[#c2622a] disabled:opacity-60 cursor-pointer">
                {status === 'sending' ? 'Sending…' : 'Request a Feasibility Study'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

