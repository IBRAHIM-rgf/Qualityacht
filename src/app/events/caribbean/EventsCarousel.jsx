// ══ Carrousel Events Caraibes — fichier dedie (client 2026-09-14) ══
//
// Le carrousel vit dans son propre fichier, hors de la page : il n'est pas pose
// sur le hero, il prend place dessous, dans le fondu qui relie le hero au
// contenu. Aucune numerotation n'est affichee.
//
// Defilement : une seule piste, dupliquee une fois, translatee de -50 % en
// boucle lineaire — le raccord tombe exactement sur la copie, donc le mouvement
// est continu, sans a-coup ni retour en arriere. Le survol ralentit la piste.
//
// Photos fournies par le client, dans l'ordre recu.

import Image from 'next/image';
import styles from './events-carousel.module.css';

const D = '/media/client/lydie/2026-09-14/events-carousel';

const PHOTOS = [
  { src: `${D}/ev-01.jpg`, alt: 'Beachfront dinner set for a private charter evening' },
  { src: `${D}/ev-02.jpg`, alt: 'Carnival queen in a shell and crystal headdress' },
  { src: `${D}/ev-03.jpg`, alt: 'Marching band drummer during an island parade' },
  { src: `${D}/ev-04.jpg`, alt: 'Crowd and stage lights at an open-air concert' },
  { src: `${D}/ev-05.jpg`, alt: 'Carnival dancer in feathered costume against stage light' },
  { src: `${D}/ev-06.jpg`, alt: 'Carnival king in a gold and crimson headdress' },
  { src: `${D}/ev-07.jpg`, alt: 'Island vendor carrying cocoa pods and tropical flowers' },
  { src: `${D}/ev-08.jpg`, alt: 'Surfers waiting on turquoise water off the beach' },
  { src: `${D}/ev-09.jpg`, alt: 'Guest in the late afternoon light of the islands' },
  { src: `${D}/ev-10.jpg`, alt: 'Aerial view of a tender crossing a turquoise channel' },
  { src: `${D}/ev-11.jpg`, alt: 'Crew raising the sail of a traditional Caribbean yole' },
];

export default function EventsCarousel() {
  // La piste est rendue deux fois : la copie n'est la que pour la boucle, elle
  // est retiree aux lecteurs d'ecran.
  const serie = (copie) =>
    PHOTOS.map((p, i) => (
      <figure key={`${copie}-${p.src}`} className={styles.vignette}>
        <Image
          src={p.src}
          alt={copie ? '' : p.alt}
          width={780}
          height={1040}
          sizes="(max-width: 767px) 176px, 260px"
          className={styles.image}
          aria-hidden={copie ? true : undefined}
        />
        <span aria-hidden className={styles.voile} />
      </figure>
    ));

  return (
    <section className={`${styles.zone} bg-[#26272a] py-14 md:py-20`} aria-label="Caribbean events in pictures">
      <div aria-hidden className={styles.fondu} />
      <div className={styles.masque}>
        <div className={styles.piste}>
          {serie(0)}
          {serie(1)}
        </div>
      </div>
    </section>
  );
}
