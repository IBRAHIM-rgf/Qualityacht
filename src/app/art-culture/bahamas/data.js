// Donnees de /art-culture/bahamas (client 2026-10-10), calquees sur /art-culture/caribbean.
//  - SUBREGIONS : les 8 groupes d'iles des Bahamas (memes noms/photos que les 8 cases Bahamas).
//  - ART : lieux fournis par le client (« bahamas_art_venues.html »), textes repris tels quels.
//  - CULTURE : pas encore de calendrier fourni (la card Culture est « Coming Soon »).
// AUCUN emoji.

import { GROUPS, CARDS, groupSlug } from '../../charters/destinations/bahamas/bahamasGroups';

export const SUBREGIONS = GROUPS.map((g, i) => ({
  slug: groupSlug(g.name),
  name: g.name,
  img: `${CARDS}/card-${i + 1}-color.jpg`,
}));

// Page bateaux de chaque groupe (bouton « Explore the Fleet », comme les Caraibes).
export const FLEET_BY_SUBREGION = Object.fromEntries(
  SUBREGIONS.map((s) => [s.slug, `/charters/destinations/bahamas/${s.slug}`])
);

// Un bloc par region (meme ordre que les 8 groupes), rattache a son groupe.
const ART_RAW = [
  {
    "island": "Nassau & Paradise Island",
    "index": 0,
    "venues": [
      {
        "type": "Museum",
        "name": "National Art Gallery of The Bahamas — Nassau",
        "signature": true,
        "desc": "The country’s leading art institution, in the restored 1860s Villa Doyle. The national collection of Bahamian art is on the ground floor, with changing exhibitions above."
      },
      {
        "type": "Museum",
        "name": "Pompey Museum of Slavery & Emancipation — Nassau",
        "signature": true,
        "desc": "In the historic Vendue House, a former marketplace. A compact, powerful exhibition on the African experience in the Bahamas, from slavery to emancipation."
      },
      {
        "type": "Gallery",
        "name": "Doongalik Studios — Nassau",
        "signature": false,
        "desc": "A restored traditional home founded in the 1970s by Jackson and Pam Burnside. Revolving shows by established and emerging Bahamian artists, with a Junkanoo spirit."
      },
      {
        "type": "Gallery",
        "name": "Hillside House — Antonius Roberts Studio — Nassau",
        "signature": false,
        "desc": "Studio and gallery of the Bahamian artist Antonius Roberts, with contemporary work shown in a quiet garden setting on Cumberland Street."
      },
      {
        "type": "Museum",
        "name": "Educulture Junkanoo Museum — Nassau",
        "signature": false,
        "desc": "A lively introduction to Junkanoo, the Bahamian festival of music, costume and craft, held every Boxing Day and New Year’s Day."
      },
      {
        "type": "Gallery",
        "name": "D’Aguilar Art Foundation — Nassau",
        "signature": false,
        "desc": "Built around a private collection started by Vincent D’Aguilar in 2008, and open to scholars, collectors and young artists studying Bahamian art."
      }
    ]
  },
  {
    "island": "Grand Bahama",
    "index": 1,
    "venues": [
      {
        "type": "Museum",
        "name": "Bahamas Maritime Museum — Freeport",
        "signature": true,
        "desc": "Opened in 2022. Treasures from the 1656 wreck of Nuestra Señora de las Maravillas, with exhibits on the Lucayan people and the transatlantic slave trade."
      },
      {
        "type": "Garden & Gallery",
        "name": "Garden of the Groves — Freeport",
        "signature": false,
        "desc": "A 12-acre botanical park created in 1973, with a replica of Freeport’s first chapel, a labyrinth and a village with an art gallery and Androsia fabrics."
      },
      {
        "type": "Exhibition",
        "name": "Rand Nature Centre — Freeport",
        "signature": false,
        "desc": "A nature reserve with native trails and plants, whose rotating exhibits bring art and the environment together."
      },
      {
        "type": "Historic Site",
        "name": "Lucayan National Park — East Grand Bahama",
        "signature": false,
        "desc": "A boardwalk through the island’s ecosystems to caves and a long, empty beach, named for the Lucayan people who first lived here."
      }
    ]
  },
  {
    "island": "The Exumas",
    "index": 2,
    "venues": [
      {
        "type": "Historic Site",
        "name": "Rolle Town Tombs — Great Exuma",
        "signature": true,
        "desc": "Three Loyalist tombs in a clearing south of Rolle Town, one dated 1792 and shaped like a stone double bed. A quiet window on the island’s plantation past."
      },
      {
        "type": "Historic Site",
        "name": "Pompey Memorial — Great Exuma",
        "signature": false,
        "desc": "A statue, plaques and ruined jail beside a lookout, honouring Pompey, whose resistance nearly two centuries ago helped spark the Bahamian abolition movement."
      },
      {
        "type": "Gallery",
        "name": "Wenshua Art Gallery — George Town",
        "signature": false,
        "desc": "Described as the first gallery of its kind on Exuma, giving the island’s artists a place to show their work, with a warm welcome tour from the owner."
      },
      {
        "type": "Artisan",
        "name": "Straw Weavers — George Town",
        "signature": false,
        "desc": "Straw plaiting is one of the Bahamas’ oldest crafts. Meet the weavers and see baskets, hats and bags made by hand in the Exuma tradition."
      }
    ]
  },
  {
    "island": "The Abacos",
    "index": 3,
    "venues": [
      {
        "type": "Museum",
        "name": "Albert Lowe Museum — Green Turtle Cay",
        "signature": true,
        "desc": "Founded in 1976 by the Bahamian artist Alton Lowe. Model ships, artifacts, photographs and paintings of Loyalist life in New Plymouth."
      },
      {
        "type": "Historic Site",
        "name": "Loyalist Memorial Sculpture Garden — New Plymouth",
        "signature": true,
        "desc": "Twenty-four bronze busts of prominent Bahamians around two lifesize figures, by the sculptor James Mastin, honouring the Loyalists and their enslaved people."
      },
      {
        "type": "Museum",
        "name": "Wyannie Malone Historical Museum — Hope Town",
        "signature": false,
        "desc": "Opened in 1978 in a Loyalist-style home, telling the story of Hope Town’s founder and the settlement’s first families."
      },
      {
        "type": "Museum",
        "name": "Man-O-War Heritage Museum — Man-O-War Cay",
        "signature": false,
        "desc": "A small wooden house from the 1800s holding records and artifacts from the cay’s boatbuilding heritage."
      },
      {
        "type": "Artisan",
        "name": "Hope Town Canvas — Elbow Cay",
        "signature": false,
        "desc": "An artisan shop that turns recycled sails into one-of-a-kind bags, a craft with deep roots in the Abacos."
      }
    ]
  },
  {
    "island": "Eleuthera & Harbour Island",
    "index": 4,
    "venues": [
      {
        "type": "Gallery",
        "name": "Princess Street Gallery — Harbour Island",
        "signature": true,
        "desc": "Local and international art inspired by the island, in the heart of Dunmore Town. Usually closed in September and October."
      },
      {
        "type": "Gallery",
        "name": "Briland Art — Dunmore Town",
        "signature": false,
        "desc": "A couple-run gallery since 2000, with seascapes, wood carvings, maritime mobiles and vividly painted driftwood."
      },
      {
        "type": "Historic Site",
        "name": "Dunmore Town — Harbour Island",
        "signature": false,
        "desc": "Pastel cottages and white picket fences along quiet lanes, in a village that was once the capital of the Bahamas."
      },
      {
        "type": "Museum",
        "name": "Spanish Wells Museum — Spanish Wells",
        "signature": false,
        "desc": "Artifacts and photographs tracing the history and culture of one of Eleuthera’s oldest fishing communities."
      },
      {
        "type": "Historic Site",
        "name": "Preacher’s Cave — Eleuthera",
        "signature": false,
        "desc": "The natural shelter where the Eleutherian Adventurers took refuge after their shipwreck in 1648, and held some of the first services in the Bahamas."
      }
    ]
  },
  {
    "island": "Andros",
    "index": 5,
    "venues": [
      {
        "type": "Artisan",
        "name": "Androsia Batik Factory — Fresh Creek",
        "signature": true,
        "desc": "Hand-made batik since 1973. Watch artisans wax, cut and dye cotton, and, with a lesson arranged in advance, make your own piece to take home."
      },
      {
        "type": "Historic Site",
        "name": "Red Bays — North Andros",
        "signature": false,
        "desc": "A village founded after 1821 by Seminole and African refugees from Florida, known for its self-reliant way of life and its palm-straw craft."
      },
      {
        "type": "Heritage Site",
        "name": "Morgan’s Bluff — North Andros",
        "signature": false,
        "desc": "A headland at the northern tip of the island, long linked to the legend of the pirate Henry Morgan’s hidden treasure."
      }
    ]
  },
  {
    "island": "Bimini & Berry Islands",
    "index": 6,
    "venues": [
      {
        "type": "Museum",
        "name": "Dolphin House Museum — Alice Town, Bimini",
        "signature": true,
        "desc": "The home of artist and historian Ashley Saunders, begun in 1993 and covered in mosaics of tiles, shells and found objects that honour Bimini’s story."
      },
      {
        "type": "Museum",
        "name": "Bimini Museum — Alice Town, Bimini",
        "signature": false,
        "desc": "Created by the Bimini Historical Society, with photographs, relics and memorabilia of Ernest Hemingway, the island’s most famous former resident."
      }
    ]
  },
  {
    "island": "Southern Bahamas / Out Islands",
    "index": 7,
    "venues": [
      {
        "type": "Historic Site",
        "name": "The Hermitage — Cat Island",
        "signature": true,
        "desc": "Built from 1939 by the architect-priest Father Jerome on Mount Alvernia, the highest point in the Bahamas. A tiny stone chapel and cells, open to visitors."
      },
      {
        "type": "Historic Site",
        "name": "Clarence Town Churches — Long Island",
        "signature": true,
        "desc": "St. Paul’s (Anglican) and St. Peter’s (Catholic), both by Father Jerome, the second admired for its Greco-Celtic design with Moorish influence."
      },
      {
        "type": "Museum",
        "name": "Long Island Library & Museum — Long Island",
        "signature": false,
        "desc": "A small museum that preserves the history, culture and customs of Long Island."
      },
      {
        "type": "Historic Site",
        "name": "Dunmore’s Caves — Long Island",
        "signature": false,
        "desc": "Caves believed to have been inhabited by the Lucayans and later used as a hideaway by buccaneers. Visit with a local guide."
      }
    ]
  }
];

export const ART = ART_RAW.map(({ index, ...a }) => ({ ...a, sub: SUBREGIONS[index].slug }));

export const CULTURE = [];

export const SECTIONS = {
  art: {
    title: 'Art',
    eyebrow: 'Bahamas · Galleries, Artists & Island Expression',
    img: `${CARDS}/card-1-color.jpg`,
  },
  culture: {
    title: 'Culture',
    eyebrow: 'Bahamas · Heritage, Festivals & Island Rhythms',
    img: `${CARDS}/card-3-color.jpg`,
  },
};
