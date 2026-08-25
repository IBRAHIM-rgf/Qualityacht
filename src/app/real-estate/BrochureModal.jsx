'use client';

// ══ Real Estate — demande de brochure ══
// Modal Qualityacht. Les donnees partent vers /api/brochure, donc chez
// Qualityacht : aucune requete n'est faite vers le partenaire. La brochure, qui
// est un fichier public, n'est ouverte qu'APRES un envoi reellement confirme.

import { useEffect, useId, useRef, useState } from 'react';
import { MAX_LENGTHS, validateBrochureRequest } from '@/lib/brochureRequest';

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const CHAMP =
  'w-full bg-transparent border-b border-[#C0C0C0]/45 py-2 text-[#ACB0CD] ' +
  'placeholder:text-[#ACB0CD]/60 outline-none transition-colors focus:border-[#C2622A] ' + FOCUS;

const CTA =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] ' +
  'transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] ' +
  'hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] disabled:opacity-60 disabled:cursor-not-allowed ' + FOCUS;

const VIDE = { firstName: '', lastName: '', email: '', phone: '', country: '', message: '' };

function Erreur({ id, children }) {
  return <p id={id} role="alert" className="mt-1.5 text-[11px] text-[#e08a5a]">{children}</p>;
}

export default function BrochureModal({ programme, onClose }) {
  const uid = useId();
  const [values, setValues] = useState(VIDE);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | unavailable | error
  const honeypotRef = useRef(null);
  const dialogRef = useRef(null);
  const firstRef = useRef(null);

  // Focus a l'ouverture, fermeture au clavier.
  useEffect(() => {
    firstRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const set = (name) => (e) => {
    const v = e.target.value;
    setValues((s) => ({ ...s, [name]: v }));
    setErrors((p) => (p[name] ? { ...p, [name]: undefined } : p));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const payload = { project: programme.id, ...values, consent };
    const { ok, errors: found } = validateBrochureRequest(payload);
    if (!ok) { setErrors(found); return; }

    setErrors({});
    setStatus('sending');
    try {
      const res = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, website: honeypotRef.current?.value || '' }),
      });
      const body = await res.json().catch(() => ({}));

      // La brochure ne s'ouvre QUE si l'envoi a reellement abouti.
      if (res.ok && body.ok === true && body.delivered === true) {
        setStatus('sent');
        window.open(programme.brochure, '_blank', 'noopener,noreferrer');
      } else if (res.status === 503) {
        setStatus('unavailable');
      } else if (res.status === 400 && body.errors) {
        setErrors(body.errors);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setStatus((s) => (s === 'sending' ? 'error' : s));
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto p-4 md:p-8"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        className="w-full max-w-lg rounded-2xl border border-[#C0C0C0]/40 bg-[#2e2f32] p-6 md:p-8 my-auto"
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#B87333]">Request the Brochure</p>
            <h2 id={`${uid}-title`} className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.08em] text-[#C0C0C0] mt-1">
              {programme.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close the brochure request"
            className={`shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-[#C0C0C0] text-[#acb0cd] transition-colors hover:border-[#c2622a] hover:text-[#c2622a] ${FOCUS}`}
          >
            <span aria-hidden className="text-lg leading-none">&times;</span>
          </button>
        </div>

        {status === 'sent' ? (
          <div role="status" className="py-6 text-center">
            <p className="text-lg text-[#C0C0C0]">Thank you — your request has been sent.</p>
            <p className="mt-3 text-sm text-[#ACB0CD]">
              The brochure opens in a new tab. If your browser blocked it,{' '}
              <a href={programme.brochure} target="_blank" rel="noopener noreferrer" className={`underline text-[#c2622a] ${FOCUS}`}>
                open it here
              </a>.
            </p>
            <button type="button" onClick={onClose} className={`${CTA} mt-6`}>Close</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            {/* Honeypot : hors flux et hors tabulation. */}
            <div aria-hidden className="absolute w-px h-px -left-[9999px] overflow-hidden">
              <label htmlFor={`${uid}-website`}>Leave this field empty</label>
              <input id={`${uid}-website`} ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {status === 'unavailable' && (
              <div role="alert" className="mb-5 rounded-lg border border-[#e08a5a]/50 bg-[#e08a5a]/10 px-4 py-3">
                <p className="text-sm text-[#e08a5a]">
                  Our enquiry service is temporarily unavailable, so your request was <strong>not</strong> sent. Please try again later.
                </p>
              </div>
            )}
            {status === 'error' && (
              <div role="alert" className="mb-5 rounded-lg border border-[#e08a5a]/50 bg-[#e08a5a]/10 px-4 py-3">
                <p className="text-sm text-[#e08a5a]">
                  Something went wrong and your request was <strong>not</strong> sent. Please try again.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${uid}-firstName`} className="sr-only">First name</label>
                <input ref={firstRef} id={`${uid}-firstName`} type="text" placeholder="First Name *" autoComplete="given-name"
                  maxLength={MAX_LENGTHS.firstName} value={values.firstName} onChange={set('firstName')}
                  aria-invalid={errors.firstName ? 'true' : undefined} className={CHAMP} />
                {errors.firstName && <Erreur id={`${uid}-firstName-e`}>{errors.firstName}</Erreur>}
              </div>
              <div>
                <label htmlFor={`${uid}-lastName`} className="sr-only">Last name</label>
                <input id={`${uid}-lastName`} type="text" placeholder="Last Name *" autoComplete="family-name"
                  maxLength={MAX_LENGTHS.lastName} value={values.lastName} onChange={set('lastName')}
                  aria-invalid={errors.lastName ? 'true' : undefined} className={CHAMP} />
                {errors.lastName && <Erreur id={`${uid}-lastName-e`}>{errors.lastName}</Erreur>}
              </div>
              <div>
                <label htmlFor={`${uid}-email`} className="sr-only">Email address</label>
                <input id={`${uid}-email`} type="email" placeholder="Email Address *" autoComplete="email"
                  maxLength={MAX_LENGTHS.email} value={values.email} onChange={set('email')}
                  aria-invalid={errors.email ? 'true' : undefined} className={CHAMP} />
                {errors.email && <Erreur id={`${uid}-email-e`}>{errors.email}</Erreur>}
              </div>
              <div>
                <label htmlFor={`${uid}-phone`} className="sr-only">Phone or WhatsApp</label>
                <input id={`${uid}-phone`} type="tel" placeholder="Phone / WhatsApp *" autoComplete="tel"
                  maxLength={MAX_LENGTHS.phone} value={values.phone} onChange={set('phone')}
                  aria-invalid={errors.phone ? 'true' : undefined} className={CHAMP} />
                {errors.phone && <Erreur id={`${uid}-phone-e`}>{errors.phone}</Erreur>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-country`} className="sr-only">Country</label>
                <input id={`${uid}-country`} type="text" placeholder="Country *" autoComplete="country-name"
                  maxLength={MAX_LENGTHS.country} value={values.country} onChange={set('country')}
                  aria-invalid={errors.country ? 'true' : undefined} className={CHAMP} />
                {errors.country && <Erreur id={`${uid}-country-e`}>{errors.country}</Erreur>}
              </div>
            </div>

            {/* Projet d'interet : prerempli et non modifiable, il vient du catalogue. */}
            <div className="mt-5">
              <label htmlFor={`${uid}-project`} className="block text-[10px] uppercase tracking-[0.2em] text-[#B87333] mb-2">
                Project of interest
              </label>
              <input id={`${uid}-project`} type="text" readOnly value={programme.name}
                className="w-full bg-[#26272a] border border-[#C0C0C0]/40 rounded-lg px-3 py-2 text-[#ACB0CD]" />
            </div>

            <label htmlFor={`${uid}-message`} className="sr-only">Your message</label>
            <textarea id={`${uid}-message`} rows={3} placeholder="Your Message (optional)"
              maxLength={MAX_LENGTHS.message} value={values.message} onChange={set('message')}
              className={`${CHAMP} mt-4 resize-y`} />

            <div className="mt-5">
              <label htmlFor={`${uid}-consent`} className="flex items-start gap-3 cursor-pointer">
                <input id={`${uid}-consent`} type="checkbox" checked={consent}
                  onChange={(e) => { setConsent(e.target.checked); setErrors((p) => ({ ...p, consent: undefined })); }}
                  aria-invalid={errors.consent ? 'true' : undefined}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#C2622A]" />
                <span className="text-sm leading-relaxed text-[#ACB0CD]">
                  I agree that Qualityacht may contact me about this request, as described in the{' '}
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
              {errors.consent && <Erreur id={`${uid}-consent-e`}>{errors.consent}</Erreur>}
            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit" disabled={status === 'sending'} className={CTA}>
                {status === 'sending' ? 'Sending…' : 'Send Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
