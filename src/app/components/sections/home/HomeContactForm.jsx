'use client';

import { useId, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { REASONS, DEFAULT_REASON, MAX_LENGTHS, validateContact } from '@/lib/contactForm';

// Styles repris tels quels de la version validee : capsule transparente du
// configurateur, argent pour les intitules, lavande pour les valeurs, cuivre
// pour les accents.
const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const CHAMP =
  'w-full bg-transparent border-b border-[#C0C0C0]/45 py-2 text-[#ACB0CD] ' +
  'placeholder:text-[#ACB0CD]/60 outline-none transition-colors focus:border-[#C2622A] ' +
  FOCUS;

const EMPTY = { fullName: '', email: '', phone: '', company: '', message: '' };

function Erreur({ id, children }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-[11px] text-[#e08a5a]">
      {children}
    </p>
  );
}

export default function HomeContactForm() {
  const uid = useId();
  const [reason, setReason] = useState(DEFAULT_REASON);
  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | unavailable | error
  const honeypotRef = useRef(null);
  const resumeRef = useRef(null);

  const set = (name) => (e) => {
    const v = e.target.value;
    setValues((s) => ({ ...s, [name]: v }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const payload = { reason, ...values, consent };
    const { ok, errors: found } = validateContact(payload);
    if (!ok) {
      setErrors(found);
      setStatus('idle');
      requestAnimationFrame(() => resumeRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, website: honeypotRef.current?.value || '' }),
      });
      const body = await res.json().catch(() => ({}));

      // La confirmation exige `delivered` : une reponse honeypot ne doit jamais
      // faire croire a un envoi.
      if (res.ok && body.ok === true && body.delivered === true) {
        setStatus('sent');
      } else if (res.status === 503) {
        setStatus('unavailable');
      } else if (res.status === 400 && body.errors) {
        setErrors(body.errors);
        setStatus('idle');
        requestAnimationFrame(() => resumeRef.current?.focus());
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setStatus((s) => (s === 'sending' ? 'error' : s));
    }
  };

  if (status === 'sent') {
    return (
      <div className="lg:col-span-2 py-6 text-center" role="status">
        <p className="text-xl text-[#C0C0C0]">Thank you — your enquiry has been sent.</p>
        <p className="mt-3 text-sm text-[#ACB0CD]">
          We will reply to <span className="text-[#C2622A]">{values.email}</span> shortly.
        </p>
      </div>
    );
  }

  const listeErreurs = Object.entries(errors).filter(([, v]) => v);

  return (
    <form onSubmit={onSubmit} noValidate className="contents" aria-label="Contact Qualityacht">
      {/* Colonne gauche : les champs, disposition d'origine inchangee. */}
      <div>
        {/* Honeypot : hors flux et hors tabulation. */}
        <div aria-hidden className="absolute w-px h-px -left-[9999px] overflow-hidden">
          <label htmlFor={`${uid}-website`}>Leave this field empty</label>
          <input id={`${uid}-website`} ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div ref={resumeRef} tabIndex={-1} aria-live="polite" className="outline-none">
          {listeErreurs.length > 0 && (
            <div role="alert" className="mb-6 rounded-lg border border-[#e08a5a]/50 bg-[#e08a5a]/10 px-4 py-3">
              <p className="text-sm text-[#e08a5a]">
                Please correct {listeErreurs.length} field{listeErreurs.length > 1 ? 's' : ''} below.
              </p>
            </div>
          )}
        </div>

        <fieldset className="border-0 p-0 m-0">
          <legend className="mb-4 font-semibold text-[#C0C0C0]">
            Please select the reason for your enquiry <span className="text-[#C2622A]">*</span>
          </legend>
          <div className="flex flex-wrap gap-4 mb-6">
            {REASONS.map((r) => {
              const actif = reason === r.value;
              return (
                <label
                  key={r.value}
                  className={`cursor-pointer px-6 py-2 rounded-full border text-sm transition-colors ${FOCUS} ${
                    actif
                      ? 'border-[#C2622A] text-[#C2622A]'
                      : 'border-[#C0C0C0]/70 text-[#ACB0CD] hover:border-[#C2622A] hover:text-[#C2622A]'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r.value}
                    checked={actif}
                    onChange={() => { setReason(r.value); setErrors((p) => ({ ...p, reason: undefined })); }}
                    className="sr-only"
                  />
                  {r.label}
                </label>
              );
            })}
          </div>
          {errors.reason && <Erreur id={`${uid}-reason-error`}>{errors.reason}</Erreur>}
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${uid}-fullName`} className="sr-only">Full name</label>
            <input id={`${uid}-fullName`} name="fullName" type="text" placeholder="Full Name *"
              autoComplete="name" maxLength={MAX_LENGTHS.fullName}
              value={values.fullName} onChange={set('fullName')}
              aria-invalid={errors.fullName ? 'true' : undefined}
              aria-describedby={errors.fullName ? `${uid}-fullName-error` : undefined}
              className={CHAMP} />
            {errors.fullName && <Erreur id={`${uid}-fullName-error`}>{errors.fullName}</Erreur>}
          </div>
          <div>
            <label htmlFor={`${uid}-email`} className="sr-only">Email address</label>
            <input id={`${uid}-email`} name="email" type="email" placeholder="Email Address *"
              autoComplete="email" maxLength={MAX_LENGTHS.email}
              value={values.email} onChange={set('email')}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? `${uid}-email-error` : undefined}
              className={CHAMP} />
            {errors.email && <Erreur id={`${uid}-email-error`}>{errors.email}</Erreur>}
          </div>
          <div>
            <label htmlFor={`${uid}-phone`} className="sr-only">Phone number</label>
            <input id={`${uid}-phone`} name="phone" type="tel" placeholder="Phone Number *"
              autoComplete="tel" maxLength={MAX_LENGTHS.phone}
              value={values.phone} onChange={set('phone')}
              aria-invalid={errors.phone ? 'true' : undefined}
              aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
              className={CHAMP} />
            {errors.phone && <Erreur id={`${uid}-phone-error`}>{errors.phone}</Erreur>}
          </div>
          <div>
            <label htmlFor={`${uid}-company`} className="sr-only">Company</label>
            <input id={`${uid}-company`} name="company" type="text" placeholder="Company"
              autoComplete="organization" maxLength={MAX_LENGTHS.company}
              value={values.company} onChange={set('company')} className={CHAMP} />
          </div>
        </div>

        <label htmlFor={`${uid}-message`} className="sr-only">Your message</label>
        <textarea id={`${uid}-message`} name="message" rows={3} placeholder="Your Message"
          maxLength={MAX_LENGTHS.message}
          value={values.message} onChange={set('message')}
          className={`${CHAMP} mt-4 resize-y`} />
      </div>

      {/* Colonne droite : consentement, etat d'envoi et bouton en bas a droite. */}
      <div className="flex flex-col justify-end">
        {status === 'unavailable' && (
          <div role="alert" className="mb-6 rounded-lg border border-[#e08a5a]/50 bg-[#e08a5a]/10 px-4 py-3">
            <p className="text-sm text-[#e08a5a]">
              Our enquiry service is temporarily unavailable, so your message was <strong>not</strong> sent.
              Please try again later.
            </p>
          </div>
        )}
        {status === 'error' && (
          <div role="alert" className="mb-6 rounded-lg border border-[#e08a5a]/50 bg-[#e08a5a]/10 px-4 py-3">
            <p className="text-sm text-[#e08a5a]">
              Something went wrong and your message was <strong>not</strong> sent. Please try again.
            </p>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor={`${uid}-consent`} className="flex items-start gap-3 cursor-pointer">
            <input id={`${uid}-consent`} type="checkbox" checked={consent}
              onChange={(e) => { setConsent(e.target.checked); setErrors((p) => ({ ...p, consent: undefined })); }}
              aria-invalid={errors.consent ? 'true' : undefined}
              aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#C2622A]" />
            <span className="text-sm leading-relaxed text-[#ACB0CD]">
              I agree that Qualityacht may use the details above to respond to this enquiry, as described
              in the{' '}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`text-[#C2622A] underline ${FOCUS}`}
              >
                Privacy Policy
              </a>.
              <span aria-hidden className="text-[#C2622A]"> *</span>
            </span>
          </label>
          {errors.consent && <Erreur id={`${uid}-consent-error`}>{errors.consent}</Erreur>}
        </div>

        <div className="flex justify-start lg:justify-end">
          <button
            type="submit"
            disabled={status === 'sending'}
            className={`inline-flex items-center gap-2 rounded-full border border-[#C0C0C0] bg-[#353739] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C2622A] shadow-[0_0_16px_rgba(192,192,192,0.25)] transition-colors duration-300 hover:bg-[#3f4245] disabled:opacity-60 disabled:cursor-not-allowed ${FOCUS}`}
          >
            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            <ArrowRight aria-hidden className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
