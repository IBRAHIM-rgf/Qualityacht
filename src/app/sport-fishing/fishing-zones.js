// ══ Zones de peche sportive — Caraibes ══
//
// Chaque zone ci-dessous est soutenue par au moins une source officielle : office
// de tourisme national ou autorite territoriale. La tracabilite complete — source,
// URL et affirmation soutenue, ligne par ligne — est dans FISHING_ZONES_SOURCES.md
// a la racine du projet.
//
// Regles appliquees :
//   - un nom geographique verifiable, jamais une appellation forgee ;
//   - `coords` designe une REGION approximative, pas un spot de peche precis ;
//   - `fauna` = especes nommees par la source, presentees comme couramment
//     rencontrees, jamais garanties ;
//   - `flora` = habitat uniquement quand la source le decrit. Vide sinon.
//   - AUCUNE reglementation, licence, quota, taille legale ni saison.
//
// Zones retirees faute de source primaire sur les especes : Grenadines Channels,
// Tobago Shelf. Voir le document de sources.

export const FISHING_ZONES = [
  {
    id: 'blue-marlin-alley',
    name: 'Blue Marlin Alley',
    place: 'Off San Juan — Puerto Rico',
    kind: 'Offshore — deep water close to shore',
    coords: [18.52, -66.05],
    desc: 'The seabed drops away within a few miles of San Juan, so blue water is reached quickly from the harbour.',
    fauna: ['Blue marlin', 'Sailfish', 'Mahi-mahi'],
    flora: ['Deep water close inshore'],
    fleet: '/charters/destinations/carabbean/greater-antilles-v11',
  },
  {
    id: 'twelve-mile-bank',
    name: 'Twelve Mile Bank',
    place: 'West of Grand Cayman',
    kind: 'Offshore — seamount',
    coords: [19.32, -81.62],
    desc: 'An underwater rise west of Grand Cayman, standing well above the surrounding depths.',
    fauna: ['Blue marlin', 'Yellowfin tuna', 'Wahoo'],
    flora: ['Seamount rising from deep water'],
    fleet: '/charters/destinations/carabbean/grand-cayman-v11',
  },
  {
    id: 'caicos-banks',
    name: 'Caicos Banks',
    place: 'South of the Caicos Islands — Turks & Caicos',
    kind: 'Inshore — shallow flats',
    coords: [21.6, -71.9],
    desc: 'Extensive marine flats and wetlands beside the banks, fished in clear shallow water.',
    fauna: ['Bonefish', 'Permit', 'Barracuda'],
    flora: ['Shallow seagrass beds'],
    fleet: '/charters/destinations/carabbean/turks-caicos-v11',
  },
  {
    id: 'anguilla-offshore',
    name: 'Anguilla Offshore Waters',
    place: 'Anguilla — Leeward Islands',
    kind: 'Offshore — big game',
    coords: [18.3, -63.05],
    desc: 'Offshore grounds worked by the island’s sport-fishing fleet, a short run from the anchorages.',
    fauna: ['Wahoo', 'Mahi-mahi', 'Yellowfin tuna'],
    flora: [],
    fleet: '/charters/destinations/carabbean/leeward-islands-v11',
  },
  {
    id: 'aruba-offshore',
    name: 'Aruba Offshore Waters',
    place: 'Aruba — Leeward Antilles',
    kind: 'Offshore — big game',
    coords: [12.45, -70.0],
    desc: 'Game fishing grounds a few miles off the coast, reached on half or full-day outings.',
    fauna: ['Mahi-mahi', 'Amberjack', 'Barracuda'],
    flora: [],
    fleet: '/charters/destinations/carabbean/leeward-antilles-v11',
  },
];
