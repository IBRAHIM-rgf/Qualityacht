'use client';

// ── SALT — feuille de style locale ────────────────────────────────────────────
// Tout est scope sous .salt-root. Deux combats a gagner dans la cascade contre
// src/app/globals.css (fichier PARTAGE, jamais modifie ici) :
//   1. `header, footer, h1, h2, h3, h4, .trajan-regular { font-family: Trajan; color:#C0C0C0 }`
//      -> Trajan est une capitale romaine SANS bas-de-casse : impossible d'ecrire
//      une phrase chaleureuse. `.salt-root h1` a une specificite (0,1,1) contre
//      (0,0,1) pour le selecteur d'element seul : notre regle passe, couleur comprise.
//   2. `img { filter: saturate(1.3) }` -> on desature puis on resature = rendu boueux.
//      `.salt-root img` (0,1,1) remet filter:none : le turquoise des photos reste
//      exactement celui des photos.
// Palette SALT (ratios WCAG calcules sur le fond #0B1A1E) :
//   texte  #E9E3D9 -> 13.94:1 (AAA)   secondaire #A8B7B4 -> 8.55:1 (AAA)
//   teal   #2FD6C4 -> 9.77:1  (AAA)   argent     #C0C0C0 -> 9.78:1
//   libelle #E9E3D9 sur CTA rempli #B03E00 -> 4.65:1 (AA)
//   BANNI : #B03E00 en texte sur le fond (2.97:1) et tout titre orange.

const CSS = `
.salt-root {
  --sg: #0B1A1E;      /* fond profond, biais cyan/petrole */
  --sg2: #11262B;     /* surfaces en relief */
  --st: #E9E3D9;      /* le sel seche — neutre CHAUD, jamais #fff */
  --sd: #A8B7B4;      /* pierre mouillee */
  --sc: #2FD6C4;      /* LE turquoise, pris tel quel dans les photos */
  --so: #B03E00;      /* orange de marque — remplissage du CTA uniquement */
  --ssil: #C0C0C0;    /* argent de marque — contour du CTA au repos */
  --sEase: cubic-bezier(0.16, 1, 0.3, 1);
  background: var(--sg);
  color: var(--sd);
  font-family: var(--salt-display), system-ui, sans-serif;
  font-variation-settings: 'wght' 400, 'wdth' 100;
  -webkit-font-smoothing: antialiased;
  overflow-x: clip; /* clip et non hidden : ne casse pas position:sticky */
}

/* 1. Reprise de la main sur Trajan (voir en-tete) */
.salt-root h1,
.salt-root h2,
.salt-root h3,
.salt-root h4 {
  font-family: var(--salt-display), system-ui, sans-serif;
  text-transform: none;
  color: var(--st);
  letter-spacing: -0.03em;
  line-height: 0.92;
  margin: 0;
  text-wrap: balance;
}

/* 2. Aucune resaturation globale sur nos medias */
.salt-root img,
.salt-root video { filter: none; }

/* ── Typographie ────────────────────────────────────────────────────────────── */
.salt-root .salt-h1 {
  font-size: clamp(2.05rem, 7.4vw, 8.2rem);
  font-variation-settings: 'wght' 900, 'wdth' 112;
  letter-spacing: -0.035em;
  line-height: 0.88;
}
/* A partir de sm:, chaque ligne du H1 est insecable : c'est ce qui permet a la
   derniere de deborder et de se faire mordre par le bord droit du cadre. Geste
   d'affiche assume. En dessous, on laisse le titre passer a la ligne — un mot
   coupe par le bord sur un telephone n'est plus un geste, c'est un bug. */
.salt-root .salt-h1 > span { display: block; }
@media (min-width: 640px) {
  .salt-root .salt-h1 > span { white-space: nowrap; }
}
.salt-root .salt-h2 {
  font-size: clamp(2rem, 6.2vw, 5.5rem);
  font-variation-settings: 'wght' 900, 'wdth' 105;
  line-height: 0.92;
}
.salt-root .salt-h3 {
  font-size: clamp(1.5rem, 3vw, 2.6rem);
  font-variation-settings: 'wght' 800, 'wdth' 100;
  letter-spacing: -0.02em;
  line-height: 1;
}
.salt-root .salt-h4 {
  font-size: clamp(1.15rem, 1.9vw, 1.6rem);
  font-variation-settings: 'wght' 800, 'wdth' 100;
  letter-spacing: -0.015em;
  line-height: 1.05;
}
.salt-root .salt-lead {
  color: var(--st);
  font-size: clamp(1.05rem, 2.2vw, 1.45rem);
  line-height: 1.45;
  max-width: 46ch;
}
.salt-root .salt-body {
  color: var(--sd);
  font-size: 17px;
  line-height: 1.6;
  max-width: 62ch;
}
@media (min-width: 1024px) { .salt-root .salt-body { font-size: 19px; } }

.salt-root .salt-mono {
  font-family: var(--salt-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  line-height: 1.5;
}
@media (min-width: 768px) { .salt-root .salt-mono { font-size: 12.5px; } }
.salt-root .salt-mono--data { color: var(--sc); }
.salt-root .salt-mono--ctx { color: var(--sd); }
.salt-root .salt-num {
  font-variant-numeric: tabular-nums lining-nums;
  font-variation-settings: 'wght' 900, 'wdth' 118;
  color: var(--sc);
  line-height: 0.85;
  font-size: clamp(2.6rem, 7vw, 6rem);
}

/* Filet turquoise : la seule matiere qui separe les blocs. */
.salt-root .salt-rule { display: block; height: 1px; background: var(--sc); border: 0; }
.salt-root .salt-rule--soft { background: rgba(47, 214, 196, 0.28); }

/* ── Bouton CTA : contour argent au repos, remplissage orange au survol ─────── */
.salt-root .salt-btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 56px; padding: 18px 36px;
  border: 1px solid var(--ssil);
  background: transparent;
  color: var(--st);
  font-family: var(--salt-display), system-ui, sans-serif;
  font-variation-settings: 'wght' 700, 'wdth' 100;
  font-size: 14px; letter-spacing: 0.08em;
  transition: background-color .28s ease, border-color .28s ease, transform .28s ease;
}
.salt-root .salt-btn:hover,
.salt-root .salt-btn:focus-visible {
  background: var(--so);
  border-color: var(--so);
  color: var(--st);
}
.salt-root .salt-btn:focus-visible { outline: 2px solid var(--sc); outline-offset: 3px; }

.salt-root .salt-link {
  display: inline-flex; align-items: center; min-height: 44px;
  color: var(--st);
  font-variation-settings: 'wght' 600, 'wdth' 100;
  font-size: 14px; letter-spacing: 0.04em;
  text-decoration: underline;
  text-decoration-color: var(--sc);
  text-decoration-thickness: 1px;
  text-underline-offset: 7px;
  transition: text-decoration-color .2s ease;
}
.salt-root .salt-link:hover { text-decoration-color: var(--st); }
.salt-root .salt-link:focus-visible { outline: 2px solid var(--sc); outline-offset: 3px; }

/* Boutons prev/next du rail : 48x48 (zone tactile), coins droits, jamais oranges. */
.salt-root .salt-nav {
  width: 48px; height: 48px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid rgba(47, 214, 196, 0.4);
  background: transparent;
  color: var(--st);
  font-size: 22px; line-height: 1;
  transition: border-color .2s ease, color .2s ease;
}
.salt-root .salt-nav:hover { border-color: var(--sc); color: var(--sc); }
.salt-root .salt-nav:focus-visible { outline: 2px solid var(--sc); outline-offset: 3px; }

/* ── Scrims LOCAUX ──────────────────────────────────────────────────────────── */
/* Jamais de voile plein cadre : on n'assombrit QUE la zone qui porte du texte. */
.salt-root .salt-scrim-b::after,
.salt-root .salt-scrim-t::after,
.salt-root .salt-scrim-s::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
}
.salt-root .salt-scrim-b::after {
  background: linear-gradient(to top, rgba(11,26,30,.92) 0%, rgba(11,26,30,.62) 20%, rgba(11,26,30,0) 46%);
}
.salt-root .salt-scrim-t::after {
  background: linear-gradient(to bottom, rgba(11,26,30,.86) 0%, rgba(11,26,30,0) 40%);
}
.salt-root .salt-scrim-s::after {
  background: linear-gradient(to top, rgba(11,26,30,.88) 0%, rgba(11,26,30,0) 34%);
}

/* ── Reveals : courts et nets (400-600ms), jamais rejoues ───────────────────── */
.salt-root .sr { opacity: 0; transition: opacity .48s var(--sEase), transform .48s var(--sEase), clip-path .52s var(--sEase); }
.salt-root .sr--up { transform: translateY(20px); }
.salt-root .sr--down { transform: translateY(-20px); }
.salt-root .sr--scale { transform: scale(.96); }
.salt-root .sr--clip { opacity: 1; clip-path: inset(0 0 100% 0); }
.salt-root .sr--wipe { opacity: 1; clip-path: inset(0 100% 0 0); }
.salt-root .sr--fromleft { opacity: 1; clip-path: inset(0 100% 0 0); }
.salt-root .sr.is-in { opacity: 1; transform: none; clip-path: inset(0 0 0 0); }

/* Rail horizontal : scrollbar native masquee, remplacee par une piste custom. */
.salt-root .salt-rail { scrollbar-width: none; -ms-overflow-style: none; }
.salt-root .salt-rail::-webkit-scrollbar { display: none; }

/* Carte du toybox : coins droits (SALT est dur), bordure qui s'allume. */
.salt-root .salt-card {
  border: 1px solid rgba(47, 214, 196, 0.30);
  transition: border-color .3s ease;
}
.salt-root .salt-card:hover,
.salt-root .salt-card:focus-within { border-color: var(--sc); }
.salt-root .salt-card:focus-within { outline: 2px solid var(--sc); outline-offset: 3px; }
.salt-root .salt-card__img { transition: transform .5s var(--sEase); }
.salt-root .salt-card:hover .salt-card__img,
.salt-root .salt-card:focus-within .salt-card__img { transform: scale(1.04); }

/* ── Mouvement reduit : on coupe TOUT (transitions, parallax inline, zooms) ─── */
@media (prefers-reduced-motion: reduce) {
  .salt-root *,
  .salt-root *::before,
  .salt-root *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
  .salt-root .sr { opacity: 1 !important; transform: none !important; clip-path: none !important; }
  /* !important bat le style inline des parallax pilotes au scroll. */
  .salt-root [data-parallax] { transform: none !important; }
  .salt-root .salt-card__img { transform: none !important; }
}
`;

export default function SaltStyles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}
