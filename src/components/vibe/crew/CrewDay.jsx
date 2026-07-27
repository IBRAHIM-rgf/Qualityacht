'use client';

// CrewDay — la direction "A Day Aboard" (slot v19), montee de bout en bout.
// Les deux pages (Caraibes et Halal) rendent CE composant : meme grille, meme
// typo, meme motion, meme palette. Seul le `content` change — c'est la meme
// journee, avec d'autres personnes dedans.
//
// Les cinq heures sequencent reellement le recit (06:40 / 09:15 / 13:00 / 17:30 /
// 21:00) : la numerotation par l'heure n'est pas un ornement, c'est la structure.
import CrewStyles from './CrewStyles';
import CrewHero from './CrewHero';
import CrewSection from './CrewSection';
import CrewRail from './CrewRail';
import CrewHourBlock from './CrewHourBlock';
import CrewPhoto from './CrewPhoto';
import CrewReveal from './CrewReveal';
import CrewHairline from './CrewHairline';
import CrewVideoBand from './CrewVideoBand';

// Legende sensorielle : Newsreader 300 italique, le seul italique de la page.
function Caption({ children, className = '', style }) {
  return (
    <CrewReveal as="figcaption" y={14} duration={800} delay={260}
      className={`crew-cap ${className}`}
      style={{ marginTop: '18px', paddingInline: '20px', ...style }}>
      {children}
    </CrewReveal>
  );
}

export default function CrewDay({ fontClass, content }) {
  const { hero, premise, dawn, swim, lunch, dusk, dinner, crew, closing } = content;

  return (
    <div className={`crew-day ${fontClass}`}>
      <CrewStyles />

      {/* ── 1 — Hero : poser le contrat en 4 secondes. Ce n'est pas une
             destination, c'est une DUREE. Seul endroit ou du texte se pose
             sur une image, seul plan avec de l'action humaine. ───────────── */}
      <CrewHero {...hero} />

      {/* ── 2 — The premise : le refus. Aucune image. Apres un plein ecran
             video, du charbon nu est un evenement visuel a lui seul. ─────── */}
      <CrewSection pace="premise">
        <div className="crew-grid">
          <div className="gc-3-10 crew-txt">
            <CrewHairline style={{ marginBottom: '40px' }} />
            <CrewReveal as="h2" className="crew-h2" y={24} duration={900}>
              {premise.title}
            </CrewReveal>
            <CrewReveal as="p" className="crew-body" y={24} duration={900} delay={140}
              style={{ marginTop: '30px' }}>
              {premise.body}
            </CrewReveal>
          </div>
        </div>
      </CrewSection>

      {/* ── 3 — 06:40 : le teck froid. Premiere fois qu'un visage occupe la
             moitie de l'ecran. Photo full-bleed a gauche, texte a droite. ── */}
      <CrewSection rail railLeft="58.3333%">
        <div className="crew-grid">
          <figure className="gc-1-7" style={{ margin: 0 }}>
            <CrewPhoto
              src={dawn.main.src} alt={dawn.main.alt}
              sizes="(max-width: 768px) 100vw, 58vw"
              objectPosition="center 40%"
              hMobile="68svh" hDesktop="clamp(62vh, 74vh, 880px)"
            />
            <Caption>{dawn.caption}</Caption>
          </figure>

          <div className="gc-8-13 crew-txt" style={{ paddingTop: 'clamp(28px, 10vh, 140px)' }}>
            <CrewHourBlock hour={dawn.hour} label={dawn.label} title={dawn.title} body={dawn.body} />
            {/* La seconde image donne le LIEU, pas le sujet : plus petite, plus bas. */}
            <div className="crew-sub-r crew-off-18" style={{ marginTop: '48px' }}>
              <CrewPhoto
                src={dawn.second.src} alt={dawn.second.alt}
                sizes="(max-width: 768px) 100vw, 30vw"
                hMobile="30svh" hDesktop="34vh"
                delay={120}
              />
            </div>
          </div>
        </div>
      </CrewSection>

      {/* ── 4 — 09:15 : tout le monde a l'eau. Inversion du rythme, photo a
             droite, et la PLUS GRANDE image de la page. La timeline est
             avalee par l'eau : ni filet ni point sur cette heure. ────────── */}
      <CrewSection>
        <div className="crew-grid">
          <div className="gc-1-6 crew-txt crew-txt--l">
            <CrewHourBlock
              hour={swim.hour} label={swim.label} title={swim.title} body={swim.body}
              dot={false}
            />
            <div className="crew-sub-l crew-off-22" style={{ marginTop: '48px' }}>
              <CrewPhoto
                src={swim.second.src} alt={swim.second.alt}
                sizes="(max-width: 768px) 100vw, 32vw"
                hMobile="44svh" hDesktop="46vh"
                delay={200}
              />
            </div>
          </div>

          {/* crew-m-first : sur mobile la grande photo repasse en tete, comme dans
              toutes les autres sections. Sur desktop l'ordre DOM doit rester
              "colonne de gauche d'abord", sinon l'auto-placement de la grille
              renvoie le texte a la ligne suivante. */}
          <figure className="gc-6-13 crew-m-first" style={{ margin: 0 }}>
            <CrewPhoto
              src={swim.main.src} alt={swim.main.alt}
              sizes="(max-width: 768px) 100vw, 58vw"
              objectPosition="center 45%"
              hMobile="70svh" hDesktop="clamp(66vh, 80vh, 940px)"
              parallax
            />
            <Caption>{swim.caption}</Caption>
          </figure>
        </div>
      </CrewSection>

      {/* ── 5 — 13:00 : le dejeuner tardif. Seule section en triptyque, et
             seul fond qui se rechauffe vers #262220 — comme une nappe. ───── */}
      <CrewSection tone="warm" rail railLeft="50%">
        <div className="crew-grid">
          <figure className="gc-1-7" style={{ margin: 0 }}>
            <CrewPhoto
              src={lunch.main.src} alt={lunch.main.alt}
              sizes="(max-width: 768px) 100vw, 50vw"
              objectPosition="center 35%"
              hMobile="66svh" hDesktop="clamp(60vh, 72vh, 820px)"
            />
            <Caption>{lunch.caption}</Caption>
          </figure>

          <div className="gc-7-13 crew-txt">
            <CrewHourBlock hour={lunch.hour} label={lunch.label} title={lunch.title} body={lunch.body} />
            {/* Cascade courte et serree : pas de scale sur les vignettes,
                un scale sur des petites images ferait carrousel. */}
            <div className="crew-duo" style={{ marginTop: '52px' }}>
              {lunch.dishes.map((d, i) => (
                <CrewPhoto
                  key={d.src} src={d.src} alt={d.alt}
                  sizes="(max-width: 768px) 50vw, 40vw"
                  hMobile="26svh" hDesktop="32vh"
                  scaleFrom={1} duration={900} delay={120 + i * 120}
                />
              ))}
            </div>
          </div>
        </div>
      </CrewSection>

      {/* ── 6 — 17:30 : le creux volontaire. La photo est detachee des deux
             bords, entouree de charbon : la mise en page DIT la solitude.
             Respiration doublee, animations ralenties de 40%. ────────────── */}
      <CrewSection pace="slow" rail railLeft="58.3333%">
        <div className="crew-grid">
          <figure className="gc-2-8" style={{ margin: 0 }}>
            <CrewPhoto
              src={dusk.main.src} alt={dusk.main.alt}
              sizes="(max-width: 768px) 100vw, 50vw"
              hMobile="60svh" hDesktop="clamp(64vh, 76vh, 900px)"
              duration={1600}
            />
            <Caption>{dusk.caption}</Caption>
          </figure>

          <div className="gc-8-13 crew-txt">
            <CrewHourBlock
              hour={dusk.hour} label={dusk.label} title={dusk.title} body={dusk.body}
              duration={1100} delay={220}
            />
            {/* Il arrive apres, comme la personne qui vous rejoint. */}
            <div className="crew-sub-r crew-off-30" style={{ marginTop: '48px' }}>
              <CrewPhoto
                src={dusk.second.src} alt={dusk.second.alt}
                sizes="(max-width: 768px) 100vw, 30vw"
                hMobile="42svh" hDesktop="44vh"
                duration={1600} delay={500}
              />
            </div>
          </div>
        </div>
      </CrewSection>

      {/* ── 7 — 21:00 : le diner qui s'eternise. Premiere image pleine largeur
             depuis le hero — apres 5 sections en grille asymetrique, le plein
             cadre agit comme une porte qui s'ouvre. Aucun scrim dessus. ──── */}
      <CrewSection>
        <CrewPhoto
          src={dinner.wide.src} alt={dinner.wide.alt}
          sizes="100vw"
          objectPosition="center 55%"
          hMobile="52svh" hDesktop="clamp(58vh, 78vh, 900px)"
          duration={1500} scaleFrom={1.02}
        />

        {/* Le filet se termine ici, sur le dernier point plein. Sans fleche. */}
        <div style={{ position: 'relative', paddingTop: '12vh' }}>
          <CrewRail left="16.6666%" />
          <div className="crew-grid">
            <div className="gc-3-10 crew-txt">
              <CrewHourBlock
                hour={dinner.hour} label={dinner.label} title={dinner.title} body={dinner.body}
                delay={250}
              />
            </div>
          </div>
        </div>

        {/* Le seul aplat de couleur saturee non-oceanique de la page, place au
            moment ou le texte parle de la ville. C'est de la couleur, pas du
            mouvement : le seul endroit ou l'on s'autorise un peu d'emphase. */}
        <div className="crew-grid" style={{ marginTop: 'clamp(56px, 10vh, 120px)' }}>
          <figure className="gc-6-13" style={{ margin: 0 }}>
            <CrewPhoto
              src={dinner.second.src} alt={dinner.second.alt}
              sizes="(max-width: 768px) 100vw, 58vw"
              hMobile="46svh" hDesktop="52vh"
              duration={1600} scaleFrom={1.05} delay={400}
            />
            <Caption>{dinner.caption}</Caption>
          </figure>
        </div>
      </CrewSection>

      {/* ── 8 — The crew : on bascule du recit a la preuve, sans changer de ton.
             Aucun temoignage, aucun nom, aucune note — que des faits de metier.
             Les chiffres sont en tabular-nums : ils s'alignent avec les heures
             du recit, et c'est ce detail qui relie les deux moities de page. ── */}
      <CrewVideoBand {...crew.band} />
      <CrewSection>
        <div className="crew-grid">
          <div className="gc-2-8 crew-txt crew-txt--l">
            <CrewReveal as="p" className="crew-label" y={20} duration={900}>{crew.label}</CrewReveal>
            <CrewReveal as="h2" className="crew-h2" y={24} duration={900} delay={100}
              style={{ marginTop: '18px' }}>
              {crew.title}
            </CrewReveal>
            <CrewReveal as="p" className="crew-body" y={24} duration={900} delay={200}
              style={{ marginTop: '28px' }}>
              {crew.body}
            </CrewReveal>
          </div>

          <div className="gc-8-13 crew-txt">
            {crew.facts.map((f, i) => (
              <CrewReveal key={f.t} className="crew-fact" y={18} duration={800} delay={260 + i * 110}>
                <span className="crew-fact__n">{f.n}</span>
                <span className="crew-label">{f.t}</span>
              </CrewReveal>
            ))}
          </div>
        </div>
      </CrewSection>

      {/* ── 9 — Closing : on boucle sur le meme registre de visage que 09:15.
             Le lecteur reconnait la photo sans qu'on le lui dise. CTA empiles,
             aucun pulse, aucun rebond : un bouton qui clignote trahirait tout
             le parti pris de retenue. ─────────────────────────────────────── */}
      <CrewSection>
        <div className="crew-grid">
          <div className="gc-1-7">
            <CrewPhoto
              src={closing.photo.src} alt={closing.photo.alt}
              sizes="(max-width: 768px) 100vw, 50vw"
              objectPosition="center 35%"
              hMobile="62svh" hDesktop="clamp(64vh, 80vh, 920px)"
            />
          </div>

          <div className="gc-8-13 crew-txt" style={{ alignSelf: 'center' }}>
            <CrewReveal as="p" className="crew-label" y={20} duration={900}>{closing.label}</CrewReveal>
            <CrewReveal as="h2" className="crew-h2" y={24} duration={900} delay={200}
              style={{ marginTop: '18px' }}>
              {closing.title}
            </CrewReveal>
            <CrewReveal as="p" className="crew-body" y={24} duration={900} delay={280}
              style={{ marginTop: '28px' }}>
              {closing.body}
            </CrewReveal>
            <CrewReveal y={20} duration={900} delay={400}
              style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '18px' }}>
              <a className="crew-btn" href={closing.ctaPrimary.href}>{closing.ctaPrimary.label}</a>
              <a className="crew-btn" href={closing.ctaSecondary.href}>{closing.ctaSecondary.label}</a>
            </CrewReveal>
            <CrewReveal as="p" className="crew-cap" y={16} duration={900} delay={500}
              style={{ marginTop: '30px' }}>
              {closing.footnote}
            </CrewReveal>
          </div>
        </div>
      </CrewSection>

      {/* Fin de page sur du charbon nu : pas de bandeau, pas de logo geant. */}
      <div style={{ height: '18vh' }} aria-hidden="true" />
    </div>
  );
}
