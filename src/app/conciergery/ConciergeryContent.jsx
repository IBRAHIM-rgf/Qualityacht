'use client';

// ══ /conciergery — contenu (client 2026-09-11) ══
//
// Textes fournis tels quels par le client (anglais americain, non modifies).
// Mise en forme : aucun gras (font-weight 400), corps en #ACB0CD et expressions
// mises en avant en #D39478. Demande client 2026-09-11 : tout le texte en 18 px
// et en Liberation Sans (Arial/Helvetica en secours, metriquement identiques,
// pour les machines ou la police n'est pas installee).
// Le titre d'origine de la page ("Exclusive Concierge Services") est remis en
// place au-dessus du texte, avec sa mise en forme d'origine.
// Les deux photos sont posees a droite, avec l'effet "revelation + zoom lent"
// (conciergery.module.css) valide par le client.

import { useEffect, useRef } from 'react';
import styles from './conciergery.module.css';

// Expression mise en avant : couleur seule, sans gras (demande client).
function H({ children }) {
  return <span style={{ color: '#D39478', fontWeight: 400 }}>{children}</span>;
}

// Revelation a l'entree dans l'ecran, une seule fois.
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add(styles.visible);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add(styles.visible);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Photo({ src, alt, ratio }) {
  const ref = useReveal();
  return (
    <div className="mt-8 md:mt-10 flex justify-end">
      <figure
        ref={ref}
        className={`${styles.figure} w-full md:w-[52%] lg:w-[46%]`}
        style={{ aspectRatio: ratio }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" />
      </figure>
    </div>
  );
}

const MEDIA = '/media/client/lydie/2026-09-11/conciergery';

export default function ConciergeryContent() {
  return (
    <>
      {/* ══ HERO — extrait video 0–9 s fourni par le client ══ */}
      <section className={styles.heroWrap}>
        <video
          className={styles.heroVideo}
          src={`${MEDIA}/hero-conciergery.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        <div aria-hidden className={styles.heroVeil} />
      </section>

      {/* ══ TEXTE + PHOTOS ══ */}
      <section className="px-6 md:px-14 py-14 md:py-20">
        <div
          className="max-w-4xl mx-auto"
          style={{
            color: '#ACB0CD',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: 1.75,
            fontFamily: "'Liberation Sans', Arial, Helvetica, sans-serif",
          }}
        >
          {/* Titre d'origine de la page, remis a la demande du client. */}
          <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-gray-400">
            Exclusive Concierge Services
          </h2>
          <p>
            We don&rsquo;t just manage yachts. We turn every voyage into a{' '}
            <H>private playground</H>, right where the maps get blurry and everything is still up for
            grabs.
          </p>
          <p className="mt-5">
            Through a <H>tight circle of insiders</H> across every continent, we open doors that
            don&rsquo;t appear online: <H>secret anchorages, forgotten islands</H>, tables set at the
            edge of the world, encounters with artisans, keepers of places, local voices.{' '}
            <H>No circuits, no crowds</H>&mdash;just your instincts pushed all the way.
          </p>

          <Photo
            src={`${MEDIA}/conciergery.jpg`}
            alt="Guest stepping out of a chauffeured car with a bouquet of white roses"
            ratio="4 / 5"
          />

          <p className="mt-8 md:mt-10">
            We live for ideas that <H>shift the lines</H>: dinner in an inaccessible cove, tracking a
            marine herd with a biologist, helicoptering onto an extinct volcano for a private picnic,
            drifting from one archipelago to the next on a whim.{' '}
            <H>You imagine it; we make it real</H>&mdash;even the slightly wild stuff.
          </p>

          <Photo
            src={`${MEDIA}/helicopter.jpg`}
            alt="Private helicopter waiting on a meadow at golden hour"
            ratio="16 / 9"
          />

          <p className="mt-8 md:mt-10">
            Our team is reachable at <H>any hour, from any timezone</H>, to turn the smallest impulse
            into reality. No forms, no rigid protocol:{' '}
            <H>a conversation, a decision, and it&rsquo;s done</H>.
          </p>
        </div>
      </section>
    </>
  );
}
