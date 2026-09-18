'use client';

// ══ Section Contact — integration du fichier contact-section.html du client ══
// Conserve : le titre, les cartes d'experience cliquables (selection multiple,
// surlignage), le formulaire, les options Mandarin / Cantonais, et la regle
// « au moins une experience avant de continuer ». Le rendu reprend les codes
// des sections destinations du site : fond nuageux, Trajan pour les titres,
// Montserrat pour le reste, palette #26272a / #C0C0C0 / #acb0cd / #c2622a.

import { useId, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  CONTACT_EXPERIENCE_GROUPS as GROUPS,
  CONTACT_LANGUAGES,
  DEFAULT_REASON,
  validateContact,
} from '@/lib/contactForm';

const FLAGS = { mandarin: '🇨🇳', cantonese: '🇭🇰' };
const LANGUAGES = CONTACT_LANGUAGES.map((l) => ({ ...l, flag: FLAGS[l.id] }));

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

// Carte d'experience : meme pilule que les CTA du site, etat selectionne cuivre.
const CARD =
  'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] md:text-[14px] ' +
  'transition-[background-color,border-color,color,transform] duration-300 cursor-pointer ' +
  FOCUS;
const CARD_OFF = 'border-[#C0C0C0]/40 bg-[#26272a]/80 text-[#acb0cd] hover:border-[#c2622a] hover:-translate-y-px';
const CARD_ON = 'border-[#c2622a] bg-[#3A3B3F] text-[#C0C0C0] -translate-y-px';

const INPUT =
  'w-full rounded-md border border-[#C0C0C0]/40 bg-[#26272a]/80 px-4 py-3.5 text-[14px] text-[#C0C0C0] ' +
  'placeholder:text-[#acb0cd]/60 outline-none transition-colors duration-300 focus:border-[#c2622a]';

export default function ContactSection() {
  const [selected, setSelected] = useState(() => new Set());
  const [language, setLanguage] = useState(null);
  const [notice, setNotice] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [consent, setConsent] = useState(false);
  const [sentTo, setSentTo] = useState('');
  const honeypotRef = useRef(null);
  const uid = useId();

  const hasSelection = useMemo(() => selected.size > 0, [selected]);

  const toggle = (item) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
    setNotice('');
  };

  const clearError = (name) => setErrors((p) => (p[name] ? { ...p, [name]: undefined } : p));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!hasSelection) {
      setNotice('Please select at least one experience before continuing.');
      return;
    }

    const form = new FormData(e.currentTarget);
    const firstName = String(form.get('firstName') || '').trim();
    const lastName = String(form.get('lastName') || '').trim();
    const payload = {
      reason: DEFAULT_REASON,
      fullName: [firstName, lastName].filter(Boolean).join(' '),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      message: String(form.get('message') || ''),
      experiences: [...selected],
      language: language || '',
      consent,
    };

    const { ok, errors: found } = validateContact(payload);
    if (!String(payload.message).trim()) found.message = 'Please enter your message.';
    if (!ok || found.message) {
      setErrors(found);
      setNotice('Please complete the highlighted fields.');
      return;
    }

    setErrors({});
    setNotice('');
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
        setSentTo(payload.email.trim());
        setStatus('sent');
        return;
      }
      if (res.status === 400 && body.errors) {
        setErrors(body.errors);
        setNotice('Please complete the highlighted fields.');
      } else if (res.status === 503) {
        setNotice('Our enquiry service is temporarily unavailable. Please contact us on WhatsApp.');
      } else {
        setNotice('Your enquiry could not be sent. Please try again in a moment.');
      }
    } catch {
      setNotice('Your enquiry could not be sent. Please try again in a moment.');
    }
    setStatus('idle');
  };

  const field = (name) =>
    `${INPUT}${errors[name] ? ' border-[#c2622a]' : ''}`;
  const Err = ({ name }) =>
    errors[name] ? (
      <p id={`${uid}-${name}-error`} className="mt-1 text-[12px] text-[#c2622a]" role="alert">{errors[name]}</p>
    ) : null;

  return (
    <section className="relative overflow-hidden bg-[#1b223d]">
      {/* Fond nuageux du site (le meme que les sections destinations), filtre bleu. */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image src="/images/services-bg.png" alt="" fill className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070c73] via-transparent to-[#26272a]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-28 md:pt-36 pb-20 md:pb-28">
        {/* ── Titre ── */}
        <header className="text-center">
          <h1 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.3em] text-[#C0C0C0] pl-[0.3em]">
            Contact
          </h1>
          <div className="relative w-28 md:w-40 h-5 mt-5 mx-auto">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
        </header>

        <p className="mt-8 max-w-2xl mx-auto text-center text-[14px] md:text-[15px] leading-[1.8] text-[#acb0cd]">
          Select the experience that best reflects your request. Your selection will remain
          highlighted, allowing our team to identify your preferred area of assistance at a glance.
          To continue, please select at least one category.
        </p>

        {/* ── Cartes d'experience ── */}
        {GROUPS.map((group) => (
          <div key={group.title} className="mt-10">
            <h2 className="text-center text-[11px] md:text-[12px] uppercase tracking-[0.28em] text-[#c2622a] font-light mb-4">
              {group.title}
            </h2>
            <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label={group.title}>
              {group.items.map((item) => {
                const on = selected.has(item);
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(item)}
                    className={`${CARD} ${on ? CARD_ON : CARD_OFF}`}
                  >
                    <span aria-hidden className="text-[#c2622a] text-lg leading-none">›</span>
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* ── Formulaire ── */}
        <div className="mt-12 pt-10 border-t border-[#C0C0C0]/20 max-w-3xl mx-auto">
          <h2 className="trajan-regular text-center text-lg md:text-2xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            Private Enquiry
          </h2>
          <p className="mt-3 mb-7 text-center text-[14px] leading-[1.7] text-[#acb0cd]">
            Please complete your details below so that our concierge team may prepare a discreet
            and highly personalised response.
          </p>

          {status === 'sent' ? (
            <div className="py-6 text-center" role="status">
              <p className="text-xl text-[#C0C0C0]">Thank you — your private enquiry has been sent.</p>
              <p className="mt-3 text-sm text-[#acb0cd]">
                We will reply to <span className="text-[#c2622a]">{sentTo}</span> shortly.
              </p>
            </div>
          ) : (
          <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Honeypot : hors flux et hors tabulation. */}
            <div aria-hidden className="absolute w-px h-px -left-[9999px] overflow-hidden">
              <label htmlFor={`${uid}-website`}>Leave this field empty</label>
              <input id={`${uid}-website`} ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <div>
              <label className="sr-only" htmlFor="c-first">First Name</label>
              <input id="c-first" name="firstName" required placeholder="First Name" autoComplete="given-name" className={field('fullName')} onChange={() => clearError('fullName')} />
              <Err name="fullName" />
            </div>
            <div>
              <label className="sr-only" htmlFor="c-last">Last Name</label>
              <input id="c-last" name="lastName" required placeholder="Last Name" autoComplete="family-name" className={field('fullName')} onChange={() => clearError('fullName')} />
            </div>
            <div>
              <label className="sr-only" htmlFor="c-email">Email Address</label>
              <input id="c-email" name="email" type="email" required placeholder="Email Address" autoComplete="email" className={field('email')} onChange={() => clearError('email')} />
              <Err name="email" />
            </div>
            <div>
              <label className="sr-only" htmlFor="c-phone">Phone Number</label>
              <input id="c-phone" name="phone" type="tel" required placeholder="Phone Number" autoComplete="tel" className={field('phone')} onChange={() => clearError('phone')} />
              <Err name="phone" />
            </div>
            <div className="sm:col-span-2">
              <label className="sr-only" htmlFor="c-message">Message</label>
              <textarea id="c-message" name="message" required placeholder="Message" rows={5} className={`${field('message')} min-h-[120px] resize-y`} onChange={() => clearError('message')} />
              <Err name="message" />
            </div>

            {/* ── Consentement ── */}
            <div className="sm:col-span-2">
              <label htmlFor={`${uid}-consent`} className="flex items-start gap-3 cursor-pointer text-[13px] leading-[1.6] text-[#acb0cd]">
                <input
                  id={`${uid}-consent`}
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => { setConsent(e.target.checked); clearError('consent'); }}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#c2622a]"
                />
                <span>I agree that Qualityacht may use my details to answer my enquiry.</span>
              </label>
              <Err name="consent" />
            </div>

            {/* ── Langues ── */}
            <div className="sm:col-span-2 mt-4 text-center">
              <p className="text-[14px] leading-[1.7] text-[#acb0cd]">
                If you would prefer to communicate exclusively in Cantonese or Mandarin, please
                select the corresponding option.
              </p>
              <div className="flex flex-wrap justify-center gap-2.5 my-4" role="group" aria-label="Preferred language">
                {LANGUAGES.map((l) => {
                  const on = language === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setLanguage(on ? null : l.id)}
                      className={`${CARD} ${on ? CARD_ON : CARD_OFF}`}
                    >
                      <span aria-hidden className="text-lg leading-none">{l.flag}</span>
                      {l.label} <span className="text-[#acb0cd]/80">{l.native}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="sm:col-span-2 text-center text-[13px] min-h-[18px] text-[#c2622a]" role="status" aria-live="polite">
              {notice}
            </p>

            <div className="sm:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={!hasSelection || status === 'sending'}
                className={`inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-8 py-3.5 text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow,opacity] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#C0C0C0] disabled:hover:shadow-[0_0_18px_rgba(192,192,192,0.35)] ${FOCUS}`}
              >
                {status === 'sending' ? 'Sending…' : 'Begin Your Private Conversation'}
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}
