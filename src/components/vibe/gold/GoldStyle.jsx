'use client';

// ══ GOLDEN HOUR — feuille de style locale (direction A, slot v17) ══════════════
// Tout est SCOPE sous .gh-root. Deux reprises de main indispensables sur globals.css,
// qui cible par selecteur d'ELEMENT (specificite 0,0,1) :
//   1. `img { filter: saturate(1.3) }`  -> annule par `.gh-root img` (0,1,1). Sans ca,
//      on desature/resature les photos et le turquoise devient boueux (point 3 du diag).
//   2. `header, footer, h1..h4 { font-family: trajan; color:#C0C0C0 }` -> annule par
//      `.gh-root h1..h4` (0,1,1). Trajan Pro n'a PAS de bas-de-casse : impossible
//      d'ecrire une phrase chaleureuse en casse de phrase (point 1 du diag).
// Aucune modification de globals.css / layout.js : trois directions travaillent en parallele.

const CSS = `
.gh-root{
  --gh-ground:#1A1512;      /* presque-noir a biais rouge-brun : "ombre sous un palmier" */
  --gh-ground2:#241C17;     /* meme valeur, un cran plus chaud : changement de chapitre */
  --gh-text:#E7DACB;        /* sable chaud desature — jamais de blanc pur */
  --gh-text2:#B9A896;       /* corps de texte */
  --gh-accent:#E3A857;      /* UNE seule couleur d'accent environnemental : la lumiere de 17h */
  --gh-cta:#CE6E33;         /* orange de marque remonte de 5% pour passer AA en texte */
  --gh-fill:#B03E00;        /* orange de marque, EXCLUSIVEMENT en remplissage */
  --gh-label:#F1E7DB;
  background:var(--gh-ground);
  color:var(--gh-text2);
  font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif;
  overflow-x:clip;
}

/* 1. Les photos redeviennent elles-memes */
.gh-root img{filter:none;}

/* 2. Reprise de main sur Trajan : bas-de-casse obligatoire, jamais de capitales */
.gh-root h1,.gh-root h2,.gh-root h3,.gh-root h4{
  font-family:var(--font-gh-display),Georgia,"Times New Roman",serif;
  color:var(--gh-text);
  text-transform:none;
  font-weight:300;
  margin:0;
}

/* ── Echelle typographique ─────────────────────────────────────────────────── */
.gh-h1{
  font-size:clamp(2.6rem,6.2vw,5.25rem);
  line-height:1.06; letter-spacing:-0.018em;
  font-variation-settings:'opsz' 120,'SOFT' 60,'WONK' 1;
}
.gh-h2{
  font-size:clamp(2rem,4vw,3.4rem);
  line-height:1.12; letter-spacing:-0.012em; font-weight:400;
  font-variation-settings:'opsz' 84,'SOFT' 55,'WONK' 1;
}
.gh-h2--sm{font-size:clamp(1.55rem,2.6vw,2.1rem);letter-spacing:-0.008em;}
.gh-serif{font-family:var(--font-gh-display),Georgia,serif;color:var(--gh-text);font-weight:300;}
/* L'axe WONK de Fraunces se lit surtout en italique : on le montre une fois (section 5) */
.gh-italic{font-style:italic;font-variation-settings:'opsz' 40,'SOFT' 60,'WONK' 1;}

.gh-kicker{
  font-family:var(--font-geist-sans),sans-serif;font-weight:500;
  font-size:0.6875rem;text-transform:uppercase;letter-spacing:0.26em;
  color:var(--gh-accent);
}
.gh-kicker--mute{color:var(--gh-text2);}

.gh-body{font-size:1.0625rem;line-height:1.75;color:var(--gh-text2);}
@media(min-width:768px){.gh-body{font-size:1.1875rem;line-height:1.8;}}

/* Chapo : Fraunces 300, grande taille, casse de phrase */
.gh-stand{
  font-family:var(--font-gh-display),Georgia,serif;font-weight:300;
  font-size:clamp(1.3rem,2.1vw,1.9rem);line-height:1.45;color:var(--gh-text);
  font-variation-settings:'opsz' 40,'SOFT' 60,'WONK' 1;
}

.gh-rule{display:block;height:1px;width:72px;background:var(--gh-text2);opacity:.28;}

/* Colonne UNIQUE : la meme gouttiere gauche du hero jusqu'au CTA final. */
.gh-col{padding-left:clamp(1.25rem,6vw,5.5rem);padding-right:clamp(1.25rem,6vw,5.5rem);}
.gh-measure{max-width:34rem;}   /* ~65 caracteres */

/* ── CTA (regle de marque : contour argent -> orange au survol) ─────────────── */
.gh-btn{
  display:inline-flex;align-items:center;justify-content:center;
  min-height:48px;padding:1rem 2.5rem;border-radius:9999px;
  border:1px solid rgba(192,192,192,.55);color:var(--gh-text);background:transparent;
  font-family:var(--font-geist-sans),sans-serif;font-weight:500;font-size:.8125rem;
  text-transform:uppercase;letter-spacing:.2em;text-align:center;
  transition:background-color 320ms ease,border-color 320ms ease,color 320ms ease;
}
.gh-btn:hover,.gh-btn:focus-visible{border-color:var(--gh-cta);background:var(--gh-fill);color:var(--gh-label);}
.gh-link{
  display:inline-flex;align-items:center;min-height:44px;
  color:var(--gh-cta);text-decoration:underline;text-underline-offset:6px;text-decoration-thickness:1px;
  font-size:.8125rem;text-transform:uppercase;letter-spacing:.2em;font-weight:500;
  transition:color 320ms ease;
}
.gh-link:hover{color:var(--gh-accent);}
.gh-root a:focus-visible,.gh-root button:focus-visible{outline:2px solid var(--gh-accent);outline-offset:3px;}

/* ── Motion : lent et rare ──────────────────────────────────────────────────── */
@keyframes gh-kb-in{from{transform:scale(1);}to{transform:scale(1.07);}}
@keyframes gh-kb-out{from{transform:scale(1.06);}to{transform:scale(1);}}
.gh-kb{animation:gh-kb-in var(--gh-kb,26s) linear infinite alternate;will-change:transform;}
.gh-kb--out{animation-name:gh-kb-out;}

/* Filet de scroll qui se remplit UNE fois — remplace l'indicateur qui rebondit */
@keyframes gh-tick{from{height:0;}to{height:56px;}}
.gh-tick{animation:gh-tick 2400ms cubic-bezier(0.16,1,0.3,1) 1200ms both;}
@keyframes gh-rule-draw{from{width:0;}to{width:72px;}}
.gh-rule--draw{animation:gh-rule-draw 900ms cubic-bezier(0.16,1,0.3,1) 700ms both;}

/* Accessibilite : on neutralise TOUT le mouvement (le parallax est coupe en JS) */
@media (prefers-reduced-motion: reduce){
  .gh-root *,.gh-root *::before,.gh-root *::after{
    animation:none !important;
    transition:none !important;
  }
  .gh-root .gh-kb{transform:none !important;}
}
`;

export default function GoldStyle() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}
