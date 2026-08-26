'use client';

import { useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  INTENTS,
  LISTING_CATEGORIES,
  CONTACT_METHODS,
  MAX_LENGTHS,
  phoneIsRequired,
  validateEnquiry,
} from '@/lib/salesEnquiry';

/* ── Primitives de champ, alignees sur la charte de /sales/motor ───────────── */

const inputClass =
  'w-full rounded-lg bg-gray-900/60 border border-[#C0C0C0]/25 px-4 py-3 text-sm text-[#C0C0C0] ' +
  'placeholder:text-[#8b90a0]/70 outline-none transition-colors duration-200 ' +
  'focus:border-[#c2622a] focus:ring-2 focus:ring-[#c2622a]/40';

const labelClass = 'block text-[10px] uppercase tracking-[0.22em] text-[#B87333] mb-2';

function Field({ id, label, error, required, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span aria-hidden className="text-[#c2622a]"> *</span>}
        {!required && <span className="text-[#8b90a0]/70 normal-case tracking-normal"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[11px] text-[#8b90a0]">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[11px] text-[#e08a5a]">
          {error}
        </p>
      )}
    </div>
  );
}

function TextField({ id, label, name, value, onChange, error, required, type = 'text', hint, autoComplete }) {
  return (
    <Field id={id} label={label} error={error} required={required} hint={hint}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        maxLength={MAX_LENGTHS[name]}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
      />
    </Field>
  );
}

/* ── Formulaire ────────────────────────────────────────────────────────────── */

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '', country: '',
  contactMethod: 'email', message: '',
  yachtType: '', lengthWanted: '', budget: '', buyTimeframe: '',
  yachtName: '', builderModel: '', buildYear: '', lengthOverall: '',
  currentLocation: '', sellTimeframe: '', offerAmount: '',
};

export default function SalesEnquiryForm({ intent, yacht }) {
  const uid = useId();
  const config = INTENTS[intent];
  const extras = config.extraFields;

  const [values, setValues] = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | unavailable | error
  const honeypotRef = useRef(null);
  const summaryRef = useRef(null);

  const set = (name) => (e) => {
    const next = e.target.value;
    setValues((v) => ({ ...v, [name]: next }));
    setErrors((prev) => {
      if (!prev[name] && !(name === 'contactMethod' && prev.phone)) return prev;
      const cleared = { ...prev, [name]: undefined };
      // Repasser sur "Email" rend l'erreur de telephone caduque.
      if (name === 'contactMethod' && !phoneIsRequired(next)) cleared.phone = undefined;
      return cleared;
    });
  };

  const phoneRequired = phoneIsRequired(values.contactMethod);

  const toggleCategory = (value) =>
    setCategories((c) => (c.includes(value) ? c.filter((x) => x !== value) : [...c, value]));

  const payload = useMemo(
    () => ({
      intent,
      ...values,
      ...(extras.includes('categories') ? { categories } : {}),
      ...(yacht ? { yachtId: yacht.id } : {}),
      consent,
    }),
    [intent, values, categories, consent, yacht, extras],
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const { ok, errors: found } = validateEnquiry(payload);
    if (!ok) {
      setErrors(found);
      setStatus('idle');
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus('sending');

    try {
      const res = await fetch('/api/sales-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, website: honeypotRef.current?.value || '' }),
      });
      const body = await res.json().catch(() => ({}));

      // La confirmation exige `delivered` : une reponse honeypot (ok sans delivered)
      // ne doit jamais faire croire a un envoi.
      if (res.ok && body.ok === true && body.delivered === true) {
        setStatus('sent');
      } else if (res.status === 503) {
        setStatus('unavailable');
      } else if (res.ok) {
        // 200 sans `delivered` : rien n'a ete transmis, on ne confirme rien.
        setStatus('error');
      } else if (res.status === 400 && body.errors) {
        setErrors(body.errors);
        setStatus('idle');
        requestAnimationFrame(() => summaryRef.current?.focus());
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  /* ── Confirmation : affichee uniquement apres un succes serveur reel ─────── */
  if (status === 'sent') {
    return (
      <div className="max-w-2xl mx-auto text-center py-10" role="status">
        <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
          Enquiry sent
        </h2>
        <p className="mt-5 text-sm md:text-base leading-relaxed text-[#acb0cd]">
          Thank you. Your enquiry has reached our sales desk and a broker will reply to{' '}
          <span className="text-[#c2622a]">{values.email}</span> shortly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/sales/motor" className={secondaryBtn}>
            Back to yachts for sale
          </Link>
        </div>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v);

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-3xl mx-auto">
      {/* Honeypot : hors flux et hors ordre de tabulation, invisible pour un humain. */}
      <div aria-hidden className="absolute w-px h-px -left-[9999px] overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Recapitulatif des erreurs, cible du focus apres un envoi invalide. */}
      <div ref={summaryRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {errorList.length > 0 && (
          <div role="alert" className="mb-8 rounded-lg border border-[#e08a5a]/50 bg-[#e08a5a]/10 px-5 py-4">
            <p className="text-sm text-[#e08a5a]">
              Please correct {errorList.length} field{errorList.length > 1 ? 's' : ''} below.
            </p>
          </div>
        )}
        {status === 'unavailable' && (
          <div role="alert" className="mb-8 rounded-lg border border-[#e08a5a]/50 bg-[#e08a5a]/10 px-5 py-4">
            <p className="text-sm text-[#e08a5a]">
              Our enquiry service is temporarily unavailable, so your message was <strong>not</strong> sent.
              Please try again later.
            </p>
          </div>
        )}
        {status === 'error' && (
          <div role="alert" className="mb-8 rounded-lg border border-[#e08a5a]/50 bg-[#e08a5a]/10 px-5 py-4">
            <p className="text-sm text-[#e08a5a]">
              Something went wrong and your message was <strong>not</strong> sent. Please try again in a moment.
            </p>
          </div>
        )}
      </div>

      {/* Yacht concerne : resolu cote serveur, affiche en lecture seule. */}
      {yacht && (
        <div className="mb-10 rounded-lg border border-[#C0C0C0]/20 bg-gray-900/50 px-6 py-5">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#B87333] mb-2">Your enquiry concerns</p>
          <p className="trajan-regular text-lg uppercase tracking-[0.1em] text-[#C0C0C0]">{yacht.name}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#8b90a0]">
            {yacht.builder} {yacht.model} &middot; {yacht.year} &middot; Ref. {yacht.ref}
          </p>
          <Link
            href={`/sales/motor/${yacht.id}`}
            className="mt-3 inline-block text-[11px] uppercase tracking-[0.16em] text-[#acb0cd] underline underline-offset-4 transition-colors hover:text-[#c2622a]"
          >
            View the listing
          </Link>
        </div>
      )}

      <fieldset className="border-0 p-0 m-0">
        <legend className="sr-only">Your details</legend>
        <div className="grid sm:grid-cols-2 gap-6">
          <TextField id={`${uid}-firstName`} name="firstName" label="First name" required
            autoComplete="given-name" value={values.firstName} onChange={set('firstName')} error={errors.firstName} />
          <TextField id={`${uid}-lastName`} name="lastName" label="Last name" required
            autoComplete="family-name" value={values.lastName} onChange={set('lastName')} error={errors.lastName} />
          <TextField id={`${uid}-email`} name="email" label="Email" type="email" required
            autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} />
          <TextField id={`${uid}-phone`} name="phone" label="Phone / WhatsApp"
            required={phoneRequired}
            hint={phoneRequired ? 'Required because you asked to be contacted this way.' : undefined}
            autoComplete="tel" value={values.phone} onChange={set('phone')} error={errors.phone} />
          <TextField id={`${uid}-country`} name="country" label="Country"
            autoComplete="country-name" value={values.country} onChange={set('country')} error={errors.country} />
          <Field id={`${uid}-contactMethod`} label="Preferred contact method" error={errors.contactMethod}>
            <select id={`${uid}-contactMethod`} name="contactMethod" value={values.contactMethod}
              onChange={set('contactMethod')} className={inputClass}>
              {CONTACT_METHODS.map((m) => (
                <option key={m.value} value={m.value} className="bg-gray-900">{m.label}</option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      {/* ── Champs propres a l'intention ──────────────────────────────────── */}

      {extras.includes('categories') && (
        <fieldset className="border-0 p-0 m-0 mt-10">
          <legend className={labelClass}>Categories you are interested in</legend>
          <div className="flex flex-wrap gap-3">
            {LISTING_CATEGORIES.map((c) => {
              const checked = categories.includes(c.value);
              return (
                <label key={c.value}
                  className={`cursor-pointer rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 focus-within:ring-2 focus-within:ring-[#c2622a]/50 ${
                    checked ? 'border-[#c2622a] text-[#c2622a]' : 'border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#C0C0C0]/60'
                  }`}>
                  <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleCategory(c.value)} />
                  {c.label}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {intent === 'buy' && (
        <fieldset className="border-0 p-0 m-0 mt-10">
          <legend className="trajan-regular text-base uppercase tracking-[0.12em] text-[#C0C0C0] mb-6">
            What you are looking for
          </legend>
          <div className="grid sm:grid-cols-2 gap-6">
            <TextField id={`${uid}-yachtType`} name="yachtType" label="Type of yacht"
              hint="Motor, sailing, explorer…" value={values.yachtType} onChange={set('yachtType')} error={errors.yachtType} />
            <TextField id={`${uid}-lengthWanted`} name="lengthWanted" label="Desired length"
              hint="e.g. 25–35 m" value={values.lengthWanted} onChange={set('lengthWanted')} error={errors.lengthWanted} />
            <TextField id={`${uid}-budget`} name="budget" label="Indicative budget"
              hint="e.g. € 2–3 M" value={values.budget} onChange={set('budget')} error={errors.budget} />
            <TextField id={`${uid}-buyTimeframe`} name="buyTimeframe" label="Acquisition timeframe"
              hint="e.g. within 6 months" value={values.buyTimeframe} onChange={set('buyTimeframe')} error={errors.buyTimeframe} />
          </div>
        </fieldset>
      )}

      {intent === 'sell' && (
        <fieldset className="border-0 p-0 m-0 mt-10">
          <legend className="trajan-regular text-base uppercase tracking-[0.12em] text-[#C0C0C0] mb-6">
            About your yacht
          </legend>
          <div className="grid sm:grid-cols-2 gap-6">
            <TextField id={`${uid}-yachtName`} name="yachtName" label="Yacht name"
              value={values.yachtName} onChange={set('yachtName')} error={errors.yachtName} />
            <TextField id={`${uid}-builderModel`} name="builderModel" label="Builder / model"
              value={values.builderModel} onChange={set('builderModel')} error={errors.builderModel} />
            <TextField id={`${uid}-buildYear`} name="buildYear" label="Year"
              value={values.buildYear} onChange={set('buildYear')} error={errors.buildYear} />
            <TextField id={`${uid}-lengthOverall`} name="lengthOverall" label="Length overall"
              value={values.lengthOverall} onChange={set('lengthOverall')} error={errors.lengthOverall} />
            <TextField id={`${uid}-currentLocation`} name="currentLocation" label="Current location"
              value={values.currentLocation} onChange={set('currentLocation')} error={errors.currentLocation} />
            <TextField id={`${uid}-sellTimeframe`} name="sellTimeframe" label="Desired selling timeframe"
              value={values.sellTimeframe} onChange={set('sellTimeframe')} error={errors.sellTimeframe} />
          </div>
        </fieldset>
      )}

      {intent === 'offer' && (
        <div className="mt-10">
          <TextField id={`${uid}-offerAmount`} name="offerAmount" label="Offer amount"
            hint="You can leave this blank and discuss it with your broker."
            value={values.offerAmount} onChange={set('offerAmount')} error={errors.offerAmount} />
        </div>
      )}

      <div className="mt-10">
        <Field id={`${uid}-message`} label="Message" error={errors.message}>
          <textarea id={`${uid}-message`} name="message" rows={6} value={values.message} onChange={set('message')}
            maxLength={MAX_LENGTHS.message}
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? `${uid}-message-error` : undefined}
            className={`${inputClass} resize-y`} />
        </Field>
      </div>

      {/* ── Consentement ──────────────────────────────────────────────────── */}
      <div className="mt-10">
        <label htmlFor={`${uid}-consent`} className="flex items-start gap-3 cursor-pointer">
          <input id={`${uid}-consent`} type="checkbox" checked={consent}
            onChange={(e) => { setConsent(e.target.checked); setErrors((p) => ({ ...p, consent: undefined })); }}
            aria-invalid={errors.consent ? 'true' : undefined}
            aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#c2622a] focus:ring-2 focus:ring-[#c2622a]/50" />
          <span className="text-sm leading-relaxed text-[#acb0cd]">
            I agree that Qualityacht may use the details above to respond to this enquiry, as described
            in the{' '}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#c2622a] underline focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
            >
              Privacy Policy
            </a>.
            <span aria-hidden className="text-[#c2622a]"> *</span>
          </span>
        </label>
        {errors.consent && (
          <p id={`${uid}-consent-error`} role="alert" className="mt-2 text-[11px] text-[#e08a5a]">{errors.consent}</p>
        )}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
        <button type="submit" disabled={status === 'sending'}
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0] bg-[#26272a] text-[11px] uppercase tracking-[0.2em] text-[#c2622a] font-semibold shadow-[0_0_16px_rgba(192,192,192,0.25)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_22px_rgba(194,98,42,0.4)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a] px-9 py-3 disabled:opacity-60 disabled:cursor-not-allowed">
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
        <Link href="/sales/motor" className={secondaryBtn}>Back to yachts for sale</Link>
      </div>
    </form>
  );
}

const secondaryBtn =
  'inline-flex items-center justify-center px-8 py-3 rounded-full border border-[#C0C0C0] text-[11px] ' +
  'uppercase tracking-[0.2em] text-[#acb0cd] transition-colors duration-300 hover:border-[#c2622a] ' +
  'hover:text-[#c2622a] focus:outline-none focus:ring-2 focus:ring-[#c2622a] focus:ring-offset-2 focus:ring-offset-gray-900';
