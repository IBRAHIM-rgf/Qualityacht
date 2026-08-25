// ══ /partners — liste des partenaires ══
//
// Structure extensible, mais volontairement limitee a ce qui est CONFIRME.
// A ce jour un seul partenaire officiel : Gustave Immo, valide par la cliente
// et deja utilise sur /real-estate.
//
// N'ajoute une entree ici QUE si tu disposes, pour ce partenaire :
//   - de son nom exact et de sa categorie ;
//   - de son logo, fourni ou autorise, stocke localement ;
//   - de l'URL officielle de son site ;
//   - de l'accord explicite de la cliente pour l'afficher comme partenaire.
//
// Les hotels, restaurants, marinas et marques cites dans les pages editoriales
// du site ne sont PAS des partenaires : ce sont des selections editoriales sans
// affiliation, comme le rappelle la page Fine Food & Dining.

import { PARTNER } from '../real-estate/partner-data';

export const PARTNERS = [
  {
    id: 'gustave-immo',
    name: PARTNER.name,
    category: 'International Real Estate',
    logo: PARTNER.logo,
    markets: 'Dubai · Marrakech · Batumi',
    description:
      'Our real-estate partner for international markets. They source and follow the residential programmes presented on this site, while Qualityacht remains your point of contact throughout.',
    internalHref: '/real-estate',
    internalCta: 'Explore Real Estate',
    externalHref: PARTNER.site,
    externalCta: 'Visit Partner',
  },
];
