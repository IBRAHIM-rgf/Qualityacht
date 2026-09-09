'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Fait APPARAITRE LATERALEMENT tous les textes du site quand ils entrent dans le champ
// (balayage gauche->droite, facon destinyhousebahamas.com). Monte une seule fois dans le
// layout racine : aucune page a modifier, tout nouveau texte est pris en charge
// automatiquement. Pour changer la DIRECTION de l'effet sur tout le site, il suffit de
// modifier KEYFRAMES ci-dessous (un seul endroit).
//
// POURQUOI la Web Animations API et NON des classes CSS :
// poser une classe (ou un style) sur un noeud rendu par le serveur declenche
// "A tree hydrated but some attributes of the server rendered HTML didn't match" :
// React hydrate l'arbre par tranches (streaming) et voit l'attribut modifie sur un noeud
// qu'il n'a pas encore hydrate. Mesure : 2 erreurs d'hydratation sur la page d'accueil,
// et repousser l'ecriture (macrotask, puis evenement load) ne suffisait pas — l'hydratation
// se poursuit apres. el.animate() ne modifie AUCUN attribut : le probleme disparait, et on
// peut animer des le premier rendu, y compris les textes deja a l'ecran.
//
// POURQUOI PAS IntersectionObserver : avec IO, un texte qui se retrouve dans le bas du
// viewport ALORS QUE LA PAGE NE PEUT PLUS SCROLLER (bas du footer) n'entre jamais dans la
// zone d'observation et reste invisible A VIE. Un balayage au scroll est deterministe.
// AUCUN emoji.

const TEXT_SELECTOR = 'h1, h2, h3, h4, h5, h6, p, li, blockquote, figcaption';

// Ce qu'on NE touche pas :
//  - [data-no-rise]      : echappatoire pour desactiver l'effet sur un bloc precis
//  - .reveal, .reveal-up : blocs qui ont DEJA leur propre animation d'apparition
const SKIP_CLOSEST = '[data-no-rise], .reveal, .reveal-up';

// Apparition LATERALE (facon destinyhousebahamas.com) : le texte se devoile de GAUCHE a
// DROITE par un balayage (clip-path), et non plus en montant d'en bas. clip-path ne
// deborde JAMAIS la boite -> aucun risque de scrollbar horizontale, contrairement a un
// translateX. Le petit fondu adoucit le bord du balayage.
// Les marges NEGATIVES sont essentielles, pas cosmetiques. inset(0 0 0 0) ne
// signifie pas "aucune decoupe" : c'est une decoupe pile sur la boite de
// l'element. Or les capitales Trajan debordent de leur boite par le haut, et
// l'animation tranchait donc le sommet des lettres sur TOUS les titres du site
// — signale par le client sur les noms de yachts, "tronques sur le haut".
// En elargissant la zone de decoupe au-dela de la boite, plus rien n'est rogne,
// tandis que le balayage de gauche a droite reste identique : seul l'inset de
// DROITE passe de 100% a sa valeur finale.
const KEYFRAMES = [
  { opacity: 0, clipPath: 'inset(-30% 100% -30% -10%)' },
  { opacity: 1, clipPath: 'inset(-30% -10% -30% -10%)' },
];
const TIMING = { duration: 1600, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' };

const STAGGER_MS = 110; // decalage entre textes voisins
const MAX_STAGGER = 4; // au-dela, plus de decalage (evite les longues listes en cascade)

export default function ScrollRise() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof Element.prototype.animate !== 'function') return;
    // Accessibilite : aucun mouvement si le visiteur le demande.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pending = new Set(); // textes prets (animation en pause), pas encore montes

    const inView = (el) => {
      const r = el.getBoundingClientRect();
      if (r.height === 0 && r.width === 0) return false;
      // hors-champ horizontal aussi : les rails a scroll lateral (halal, v16) posent
      // leurs slides a droite de l'ecran ; ils ne doivent monter qu'en arrivant.
      return r.top < window.innerHeight && r.bottom > 0 && r.left < window.innerWidth && r.right > 0;
    };

    const reveal = (el) => {
      el.__qaAnim?.play();
      pending.delete(el);
    };

    // Header exclu : il est fixe et toujours visible, l'animer n'aurait pas de sens.
    const scan = () => {
      document.querySelectorAll('main, footer').forEach((root) => {
        let i = 0;
        root.querySelectorAll(TEXT_SELECTOR).forEach((el) => {
          if (el.__qaRise) return; // deja pris en charge
          if (el.closest(SKIP_CLOSEST)) return;
          if (el.parentElement?.closest('[data-qa-rise]')) return; // un parent monte deja
          if (!el.textContent.trim()) return; // pas de texte : rien a monter

          const anim = el.animate(KEYFRAMES, {
            ...TIMING,
            delay: Math.min(i, MAX_STAGGER) * STAGGER_MS,
          });
          anim.pause(); // fige le texte a l'etat de depart : invisible, 26px plus bas
          el.__qaAnim = anim;
          el.__qaRise = true;
          i += 1;

          // Deja dans le champ -> on lance tout de suite : le texte monte, il ne
          // clignote pas (il n'a jamais ete affiche a l'etat final).
          if (inView(el)) reveal(el);
          else pending.add(el);
        });
      });
    };

    const sweep = () => {
      pending.forEach((el) => {
        if (!el.isConnected) return pending.delete(el); // retire du DOM entre-temps
        if (inView(el)) reveal(el);
      });
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sweep();
      });
    };

    scan();
    sweep();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Un texte peut entrer dans le champ SANS AUCUN SCROLL : une image finit de charger,
    // une liste s'insere, un tiroir se translate. Sans ces filets, ce texte-la restait
    // invisible jusqu'au prochain scroll — parfois jamais.
    window.addEventListener('load', onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);

    // Contenus ajoutes apres coup (accordeons, listes filtrees) et panneaux ramenes dans
    // le champ par un simple changement de classe/style (tiroir Filters de /yachts).
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
        sweep();
      });
    });
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    // Filet de securite : un texte ne doit JAMAIS rester invisible parce qu'un evenement
    // n'a pas ete emis. La liste d'attente ne fait que retrecir ; des qu'elle est vide,
    // le minuteur s'arrete et le cout tombe a zero.
    const safety = setInterval(() => {
      if (pending.size === 0) return clearInterval(safety);
      sweep();
    }, 400);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('load', onScroll);
      ro.disconnect();
      mo.disconnect();
      clearInterval(safety);
      if (frame) cancelAnimationFrame(frame);
      // On quitte la page : plus personne ne surveillera ces textes, on les remet
      // visibles pour qu'aucun ne reste bloque invisible.
      pending.forEach((el) => el.__qaAnim?.finish());
    };
  }, [pathname]); // re-scan a chaque changement de page

  return null;
}
