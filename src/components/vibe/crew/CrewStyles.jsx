'use client';

// CrewStyles — toute la CSS scopee de la direction "A Day Aboard" (slot v19).
// Rien ici ne fuit hors de .crew-day : globals.css et layout.js ne sont pas touches.
//
// DEUX NEUTRALISATIONS OBLIGATOIRES :
//  1. globals.css impose "header, footer, h1..h4 { font-family: var(--font-trajan-regular) }"
//     par selecteur d'ELEMENT (specificite 0,0,1) — donc TOUS les titres du site sont en
//     capitales romaines. Ici ".crew-day h1" pese 0,1,1 et gagne quel que soit l'ordre de
//     cascade : on recupere une serif de lecture AVEC bas-de-casse, en casse de phrase.
//  2. globals.css impose "img { filter: saturate(1.3) }". ".crew-day .crew-photo img"
//     pese 0,2,1 et remet filter:none : les photos ne recoivent AUCUN traitement.
export default function CrewStyles() {
  return (
    <style>{`
/* ── Jetons de la direction ────────────────────────────────────────────────
   Un seul accent : la braise #CE7136 (chiffres d'heure, filet, point).
   Le #B03E00 de marque ne sert qu'au remplissage du CTA au survol.
   Contrastes WCAG sur #1C1A19 : texte 13.07:1 / secondaire 6.64:1 / braise 4.99:1.
   Aucun blanc pur : la valeur la plus claire de la page est #EDE4DA (survol du bouton). */
.crew-day{
  --ground:#1C1A19;
  --ground2:#262220;
  --ink:#E8DED4;
  --ink2:#AC9E90;
  --ember:#CE7136;
  --cta:#B03E00;
  --rim:#C0C0C0;
  background:var(--ground);
  color:var(--ink);
  font-family:var(--font-crew-display),Georgia,"Times New Roman",serif;
  overflow-x:clip;
  -webkit-font-smoothing:antialiased;
}

/* 1. Neutralisation Trajan — 0,1,1 bat 0,0,1 */
.crew-day h1,.crew-day h2,.crew-day h3,.crew-day h4{
  font-family:var(--font-crew-display),Georgia,serif;
  color:var(--ink);
  text-transform:none;
  font-weight:400;
  letter-spacing:-0.015em;
  margin:0;
}

/* 2. Neutralisation du filtre de saturation global — 0,2,1 bat 0,0,1 */
.crew-day .crew-photo img{filter:none;}

/* ── Echelle typographique ───────────────────────────────────────────────── */
.crew-day .crew-h1{
  font-weight:300;
  font-size:clamp(2.75rem,7vw,5.25rem);
  line-height:1.04;
  letter-spacing:-0.02em;
}
.crew-day .crew-h2{
  font-weight:400;
  font-size:clamp(1.9rem,3.6vw,3.15rem);
  line-height:1.12;
  letter-spacing:-0.015em;
  max-width:16em;
}
.crew-day .crew-body{
  font-family:var(--font-crew-display),Georgia,serif;
  font-weight:400;
  font-size:17px;
  line-height:1.62;
  max-width:34em;
  color:var(--ink);
}
.crew-day .crew-lede{
  font-family:var(--font-crew-display),Georgia,serif;
  font-weight:300;
  font-size:clamp(1.05rem,1.5vw,1.3rem);
  line-height:1.55;
  max-width:30em;
  color:var(--ink);
}
.crew-day .crew-cap{
  font-family:var(--font-crew-display),Georgia,serif;
  font-weight:300;
  font-style:italic;
  font-size:15px;
  line-height:1.5;
  color:var(--ink2);
  max-width:30em;
}
/* Geist : UNIQUEMENT les heures, les labels et les boutons. Jamais le recit. */
.crew-day .crew-label{
  font-family:var(--font-crew-ui),system-ui,sans-serif;
  font-weight:500;
  font-size:11px;
  line-height:1.5;
  text-transform:uppercase;
  letter-spacing:0.26em;
  color:var(--ink2);
  font-variant-numeric:tabular-nums;
  font-feature-settings:'tnum' 1;
}
.crew-day .crew-hour{
  font-family:var(--font-crew-ui),system-ui,sans-serif;
  font-weight:500;
  font-size:clamp(2.6rem,6vw,4.5rem);
  line-height:1;
  letter-spacing:-0.02em;
  color:var(--ember);
  font-variant-numeric:tabular-nums;
  font-feature-settings:'tnum' 1;
}
@media (min-width:768px){
  .crew-day .crew-body{font-size:20px;}
}

/* ── Grille 12 colonnes ──────────────────────────────────────────────────────
   Pas de padding lateral sur la grille : c'est ce qui permet le full-bleed.
   Sur mobile, TOUTES les photos sont bord a bord et seul le texte est padde. */
.crew-day .crew-grid{
  display:grid;
  grid-template-columns:1fr;
  gap:clamp(30px,7vw,52px);
  width:100%;
}
.crew-day .crew-txt{padding-inline:20px;}
@media (min-width:768px){
  .crew-day .crew-grid{grid-template-columns:repeat(12,1fr);gap:0;align-items:start;}
  .crew-day .crew-txt{padding-inline:0;padding-right:clamp(24px,4vw,72px);}
  .crew-day .crew-txt--l{padding-left:clamp(24px,4vw,72px);}
  .crew-day .gc-1-5{grid-column:1 / 5;}
  .crew-day .gc-1-6{grid-column:1 / 6;}
  .crew-day .gc-1-7{grid-column:1 / 7;}
  .crew-day .gc-1-8{grid-column:1 / 8;}
  .crew-day .gc-2-7{grid-column:2 / 7;}
  .crew-day .gc-2-8{grid-column:2 / 8;}
  .crew-day .gc-2-9{grid-column:2 / 9;}
  .crew-day .gc-3-10{grid-column:3 / 10;}
  .crew-day .gc-6-13{grid-column:6 / 13;}
  .crew-day .gc-7-13{grid-column:7 / 13;}
  .crew-day .gc-8-13{grid-column:8 / 13;}
  .crew-day .gc-9-13{grid-column:9 / 13;}
  /* Decalages verticaux des photos SECONDAIRES : desktop uniquement.
     Deux visages ne doivent jamais etre a la meme altitude — une grille
     reguliere tuerait le documentaire. Sur mobile tout se remet en pile. */
  .crew-day .crew-off-18{margin-top:18vh;}
  .crew-day .crew-off-22{margin-top:22vh;}
  .crew-day .crew-off-30{margin-top:30vh;}
}

/* Remet une photo en tete sur mobile sans casser l'auto-placement desktop. */
.crew-day .crew-m-first{order:-1;}
@media (min-width:768px){
  .crew-day .crew-m-first{order:0;}
}

/* Les deux plats de 13:00 : empiles a droite sur desktop, cote a cote sur mobile. */
.crew-day .crew-duo{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
@media (min-width:768px){
  .crew-day .crew-duo{grid-template-columns:1fr;gap:24px;}
}

/* ── Rythme vertical ─────────────────────────────────────────────────────── */
.crew-day .crew-sec{position:relative;padding-block:clamp(74px,16vh,190px);}
.crew-day .crew-sec--premise{padding-block:clamp(96px,22vh,260px);}
.crew-day .crew-sec--slow{padding-block:clamp(104px,26vh,300px);}   /* 17:30, le creux */
.crew-day .crew-sec--warm{background:var(--ground);transition:background-color 600ms ease;}
.crew-day .crew-sec--warm.is-warm{background:var(--ground2);}       /* 13:00, la nappe */

/* ── Cadres photo ────────────────────────────────────────────────────────── */
.crew-day .crew-photo{
  position:relative;
  display:block;
  margin:0;
  overflow:hidden;
  height:var(--h-m,60svh);
  background:var(--ground2);
}
@media (min-width:768px){
  .crew-day .crew-photo{height:var(--h-d,70vh);}
}
.crew-day .crew-photo__shift{position:absolute;inset:0;}
.crew-day .crew-photo__shift--px{inset:-2% 0;will-change:transform;}
.crew-day .crew-photo__in{position:absolute;inset:0;}

/* ── Timeline : filet vertical + point plein, colonne 8 ──────────────────── */
.crew-day .crew-rail{
  position:absolute;
  top:0;bottom:0;left:20px;
  width:1px;
  background:rgba(206,113,54,0.22);
  transform-origin:top;
  transform:scaleY(0);
  transition:transform 900ms cubic-bezier(.16,1,.3,1);
  z-index:0;
  pointer-events:none;
}
.crew-day .crew-rail.is-drawn{transform:scaleY(1);}
@media (min-width:768px){
  /* --rail-x est pose par la section : le filet se cale sur la colonne de texte
     du moment, pour que le point de l'heure tombe pile dessus. */
  .crew-day .crew-rail{left:var(--rail-x,58.3333%);}
}
.crew-day .crew-hourblock{position:relative;padding-left:34px;z-index:1;}
.crew-day .crew-hourblock--flush{padding-left:0;}

/* Photos SECONDAIRES : decalees d'une colonne vers l'interieur, pour que la
   colonne de texte et la photo qui la suit ne s'alignent jamais a plat. */
@media (min-width:768px){
  .crew-day .crew-sub-r{margin-left:20%;}   /* zone de 5 colonnes, on rentre d'une */
  .crew-day .crew-sub-l{margin-right:20%;}
}
.crew-day .crew-dot{
  position:absolute;
  left:-4.5px;
  top:clamp(1.05rem,2.4vw,1.85rem);
  width:9px;height:9px;
  border-radius:50%;
  background:var(--ember);
  opacity:0;
  transform:scale(.4);
  transition:opacity 600ms ease 120ms, transform 600ms cubic-bezier(.16,1,.3,1) 120ms;
}
.crew-day .crew-dot.is-lit{opacity:1;transform:scale(1);}

/* Filet horizontal (section 2) : premiere apparition de la timeline. */
.crew-day .crew-hairline{
  display:block;
  width:64px;height:1px;
  background:rgba(206,113,54,0.45);
  transform-origin:left;
  transform:scaleX(0);
  transition:transform 700ms cubic-bezier(.16,1,.3,1) 200ms;
}
.crew-day .crew-hairline.is-drawn{transform:scaleX(1);}

/* ── Boutons : contour argent au repos, orange de marque au survol ───────── */
.crew-day .crew-btn{
  display:inline-flex;align-items:center;justify-content:center;
  min-height:52px;padding:0 30px;
  border-radius:999px;
  border:1px solid var(--rim);
  background:transparent;
  color:var(--ink);
  font-family:var(--font-crew-ui),system-ui,sans-serif;
  font-weight:500;font-size:13px;
  text-transform:uppercase;letter-spacing:0.14em;
  text-decoration:none;
  transition:background-color 350ms ease,border-color 350ms ease,color 350ms ease;
}
.crew-day .crew-btn:hover{background:var(--cta);border-color:var(--cta);color:#EDE4DA;}
.crew-day .crew-link{
  display:inline-flex;align-items:center;
  min-height:44px;
  font-family:var(--font-crew-ui),system-ui,sans-serif;
  font-weight:500;font-size:13px;
  text-transform:uppercase;letter-spacing:0.14em;
  color:var(--ink);
  text-decoration:underline;
  text-underline-offset:7px;
  text-decoration-thickness:1px;
  text-decoration-color:rgba(172,158,144,0.55);
  transition:text-decoration-color 350ms ease,color 350ms ease;
}
.crew-day .crew-link:hover{color:var(--ember);text-decoration-color:var(--ember);}
.crew-day a:focus-visible,.crew-day button:focus-visible{
  outline:2px solid var(--ember);
  outline-offset:3px;
}

/* ── Hero : un unique scrim LOCAL en bas, jamais de voile plein cadre ────── */
.crew-day .crew-hero{position:relative;height:100svh;min-height:620px;overflow:hidden;background:var(--ground);}
.crew-day .crew-hero__scrim{
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(28,26,25,.88) 0%,rgba(28,26,25,.55) 22%,rgba(28,26,25,0) 46%);
  pointer-events:none;
}
.crew-day .crew-tick{width:1px;height:40px;background:rgba(206,113,54,0.4);}

/* ── Faits d'equipage (section 8) : chiffres alignes sur les heures du recit ── */
.crew-day .crew-fact{
  display:flex;gap:16px;align-items:baseline;
  padding-block:14px;
  border-top:1px solid rgba(172,158,144,0.18);
}
.crew-day .crew-fact:last-child{border-bottom:1px solid rgba(172,158,144,0.18);}
.crew-day .crew-fact__n{
  font-family:var(--font-crew-ui),system-ui,sans-serif;
  font-weight:500;font-size:15px;
  color:var(--ember);
  font-variant-numeric:tabular-nums;
  font-feature-settings:'tnum' 1;
  min-width:4.5ch;
}

/* ── Accessibilite : on coupe TOUT le mouvement ──────────────────────────── */
@media (prefers-reduced-motion: reduce){
  .crew-day *,.crew-day *::before,.crew-day *::after{
    animation-duration:0.001ms !important;
    animation-iteration-count:1 !important;
    transition-duration:0.001ms !important;
    scroll-behavior:auto !important;
  }
  .crew-day .crew-reveal{opacity:1 !important;transform:none !important;}
  .crew-day .crew-photo__in{opacity:1 !important;transform:none !important;}
  .crew-day .crew-photo__shift{transform:none !important;}
  .crew-day .crew-rail{transform:scaleY(1) !important;}
  .crew-day .crew-hairline{transform:scaleX(1) !important;}
  .crew-day .crew-dot{opacity:1 !important;transform:scale(1) !important;}
}
    `}</style>
  );
}
