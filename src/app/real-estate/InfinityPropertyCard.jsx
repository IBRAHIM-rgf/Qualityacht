// ══ Carte partenaire Infinity Property SXM (page Real Estate) ══
// Meme gabarit que la carte Froggy Gourmet (structure, proportions, espacements,
// deux boutons pilule). Logo officiel fourni par la cliente (PDF), marge blanche
// de la page retiree, disque noir conserve tel quel. Textes valides par la cliente,
// repris du site du partenaire (20 ans d'experience, vente / programmes neufs /
// location, les deux cotes de l'ile, bureau a Marigot).

import { whatsappFor } from './partner-data';

const LOGO = '/media/client/lydie/2026-09-18/infinity-sxm/logo.png';
const SITE = 'https://www.infinitypropertysxm.com/en';

export default function InfinityPropertyCard() {
  return (
    <>
      <article className="infinity-card" aria-labelledby="infinity-name">
        <div className="infinity-logo-panel">
          <img
            src={LOGO}
            alt="Infinity Property SXM – Real Estate in Saint-Martin"
            className="infinity-logo"
            width={783}
            height={800}
          />
        </div>

        <p className="infinity-category">Caribbean Real Estate</p>
        <h3 id="infinity-name" className="infinity-name">Infinity Property SXM</h3>
        <p className="infinity-destinations">Marigot · Saint-Martin · Sint Maarten</p>
        <p className="infinity-description">
          Based in Marigot, Infinity Property SXM draws on 20 years of experience to guide
          clients through property sales, new development programs and rentals on both sides
          of Saint-Martin. From primary residences to investment projects, its team advises on
          real estate across Sint Maarten and the Caribbean.
        </p>

        <div className="infinity-actions">
          <a
            href={SITE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Partner — Infinity Property SXM, opens in a new tab"
            className="infinity-button infinity-button--primary"
          >
            Visit Partner
          </a>
          <a
            href={whatsappFor('Infinity Property SXM real estate', 'Saint-Martin')}
            target="_blank"
            rel="noopener noreferrer"
            className="infinity-button infinity-button--secondary"
          >
            Contact Qualityacht
          </a>
        </div>
      </article>

      <style>{`
        .infinity-card {
          box-sizing: border-box;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          padding: 40px;
          background: #303132;
          border: 1px solid #48494C;
          border-radius: 24px;
          color: #C1C0CF;
          font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
          text-align: left;
        }
        .infinity-logo-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 140px;
          background: #252629;
          border: 1px solid #4A4B4F;
          border-radius: 20px;
          overflow: hidden;
        }
        .infinity-logo {
          max-width: 70%;
          max-height: 70%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }
        .infinity-category {
          margin: 32px 0 0;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #B87842;
        }
        .infinity-name {
          margin: 10px 0 0;
          font-family: var(--font-trajan-regular), 'Trajan Pro', 'Cormorant Garamond', Georgia, serif;
          font-weight: 400;
          font-size: 34px;
          line-height: 1.15;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #D7D4D0;
        }
        .infinity-destinations {
          margin: 12px 0 0;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C8AE90;
        }
        .infinity-description {
          margin: 26px 0 0;
          font-size: 16px;
          line-height: 1.75;
          color: #C1C0CF;
        }
        .infinity-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 36px;
        }
        .infinity-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
          min-height: 90px;
          padding: 14px 22px;
          border: 1px solid #D1CFCC;
          border-radius: 999px;
          background: transparent;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          transition: border-color 300ms ease, box-shadow 300ms ease;
        }
        .infinity-button:hover { border-color: #C2743B; }
        .infinity-button:focus { outline: none; }
        .infinity-button:focus-visible {
          outline: 2px solid #C2743B;
          outline-offset: 3px;
        }
        .infinity-button--primary {
          color: #C2743B;
          box-shadow: 0 0 18px rgba(194, 116, 59, 0.18);
        }
        .infinity-button--primary:hover { box-shadow: 0 0 24px rgba(194, 116, 59, 0.3); }
        .infinity-button--secondary { color: #D7D4D0; }
        @media (max-width: 767px) {
          .infinity-card { padding: 24px; }
          .infinity-logo-panel { height: 112px; }
          .infinity-name { font-size: 28px; }
        }
        @media (max-width: 560px) {
          .infinity-actions { grid-template-columns: 1fr; }
          .infinity-button { min-height: 68px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .infinity-button { transition: none; }
        }
      `}</style>
    </>
  );
}
