// crewContent — le contenu des deux versions de la direction "A Day Aboard".
//
// La version Halal ne change NI la palette, NI la typo, NI la grille, NI le motion :
// elle change le CASTING et le CALENDRIER. Meme squelette de composants, meme
// echelle de visages, memes cinq heures. C'est la meme page, avec d'autres
// personnes dedans — d'ou ce simple fichier de donnees plutot qu'un second layout.
//
// Regle de contenu absolue : aucun temoignage client, aucun nom, aucune note.
// Les legendes decrivent la SCENE, jamais une personne reelle fictive.

const M = '/media/quality';

// Les deux plats de 13:00 sont identiques dans les deux versions : le poisson
// grille et le festin sont deja compatibles, aucun substitut necessaire.
const DISHES = [
  {
    src: `${M}/food/alexey-demidov-y2rd93n7u7o-unsplash.jpg`,
    alt: 'A chef plating grilled fish on the aft deck, lime and herbs to the side',
  },
  {
    src: `${M}/food/raul-baz-pocjhyin6xs-unsplash.jpg`,
    alt: 'A long table covered with shared dishes, seen from above',
  },
];

// Le ponton du petit matin : commun aux deux versions, il donne le LIEU, pas le sujet.
const JETTY = {
  src: `${M}/beach/jono-hirst-9vnxo0ccr3q-unsplash.jpg`,
  alt: 'A wooden jetty running out over pale, still water at first light',
};

// La silhouette seule sur le sable de 17:30 : conservee dans les deux versions,
// aucune lecture problematique.
const LONE_SHORE = {
  src: `${M}/aerial/vessel-regist.jpg`,
  alt: 'A single figure walking an empty stretch of sand, shadow stretched long',
};

const DINNER = {
  src: `${M}/interiors/stockcake-diner-sur-yacht-au-coucher-du-soleil-3.jpg`,
  alt: 'A table set for dinner on a yacht deck as the sun goes down behind the sea',
};

const CREW_BAND = {
  src: `${M}/interiors/interior-band.mp4`,
  poster: `${M}/interiors/interior-band.jpg`,
  alt: 'Slow pan through the main saloon of a charter yacht, lamps lit, nobody in shot',
};

// Le corps de texte de la cloture est rigoureusement identique dans les deux
// versions : « a morning your father gets to swim with his granddaughter »
// fonctionne a l'identique de part et d'autre, et c'est precisement le propos.
const CLOSING_COPY = {
  label: 'One form, no call centre',
  title: 'Tell us the day. We will find the boat that fits it.',
  body:
    'Not the other way round. Give us a week of the calendar, a number of people, and the one thing that has to happen — a birthday, a first crossing, a morning your father gets to swim with his granddaughter. We come back with three boats, a route, and a real price.',
  ctaPrimary: { label: 'Plan your day', href: '/contact' },
  ctaSecondary: { label: 'Browse the fleet first', href: '/charters' },
  footnote: 'We answer in one working day. If we do not have the right boat, we say so.',
};

const HERO_COPY = {
  kicker: 'The Caribbean — one day, hour by hour',
  title: 'A day aboard',
  lede:
    'Sixteen hours in the Caribbean, told the way you will actually live them. Flat water at 06:40. Salt still in your hair when dinner starts at 21:00.',
  ctaPrimary: { label: 'Plan your day', href: '/contact' },
  ctaSecondary: { label: 'See the fleet', href: '/charters' },
};

const PREMISE_COPY = {
  title: 'We are not going to describe the boat.',
  body:
    'You can read a spec sheet anywhere — length, beam, cabin count, tender garage. None of it tells you what 09:15 feels like when the water is twenty-eight degrees and the engines have been off for an hour. So here is a day instead. One real day, five hours of it, in the order they happen. Read it as a rehearsal.',
};

// ══════════════════════════════════════════════════════════════════════════════
// VERSION CARAIBES
// ══════════════════════════════════════════════════════════════════════════════
export const caribbeanDay = {
  hero: {
    videoLandscape: `${M}/people/hero-people.mp4`,
    posterLandscape: `${M}/people/hero-people.jpg`,
    videoPortrait: `${M}/people/fun-port-1.mp4`,
    posterPortrait: `${M}/people/fun-port-1.jpg`,
    posterAlt: 'Jet skis cutting across flat turquoise water beside an anchored yacht',
    ...HERO_COPY,
  },
  premise: PREMISE_COPY,

  dawn: {
    hour: '06:40',
    label: 'First light — anchorage still asleep',
    title: 'The teak is still cool under your feet',
    body:
      'You are the only one up. The generator went quiet at eleven and nothing has replaced it since — just a halyard tapping the mast, and water moving under the hull at maybe half a knot. Coffee arrives without a question being asked; the crew worked out how you take it on the first morning. The bay has not decided on a colour yet.',
    caption: 'Shoreline at first light. Nobody has spoken yet.',
    main: {
      src: `${M}/people/pexels-mododeolhar-11893066.jpg`,
      alt: 'A man walking alone along the waterline in the first light of the morning',
    },
    second: JETTY,
  },

  swim: {
    hour: '09:15',
    label: 'Swim ladder down — 28°C, no plan',
    title: 'Everyone is in the water before anyone is dressed',
    body:
      'The ladder goes down and that is the entire schedule. Twenty-eight degrees, three metres of it, a sand bottom pale enough that you can watch your own shadow move. There is a bank close enough that the smallest ones can stand. Someone will stay in until their fingers wrinkle. You will not look at your phone before lunch — not out of discipline, but because you will forget it exists.',
    caption: 'Off the swim platform. First one in was not an adult.',
    main: {
      src: `${M}/people/pexels-andersonportella-35541050.jpg`,
      alt: 'A father standing in the shallows with his two daughters, all three facing the incoming waves',
    },
    second: {
      src: `${M}/people/oswald-elsaboath-lhoiwvcommm-unsplash.jpg`,
      alt: 'A father swimming with his young daughter held against his shoulder',
    },
  },

  lunch: {
    hour: '13:00',
    label: 'Aft deck — grilled whatever came up this morning',
    title: 'Lunch is late and nobody minds',
    body:
      'Whatever came out of the water this morning is on the grill by noon — snapper, lime, far too much of it. You eat on the aft deck in a wet swimsuit, holding down a tablecloth that keeps trying to leave. Somebody says something that will not be funny tomorrow and the table goes for a full minute. This is the part people describe badly afterwards and remember perfectly.',
    caption: 'Second helpings are the default setting.',
    main: {
      src: `${M}/people/pexels-rachel-claire-4992857.jpg`,
      alt: 'A woman laughing in warm late-morning light, hair still wet from swimming',
    },
    dishes: DISHES,
  },

  dusk: {
    hour: '17:30',
    label: 'Tenders back on their chocks — wind dropped',
    title: 'The hour nobody puts in the brochure',
    body:
      'The wind drops around five and the whole anchorage goes quiet with it. There is a hundred metres of sand off the bow that no one has walked today, and it is yours until the light goes. Bring nothing. Come back when you are ready — the boat is not going anywhere, and neither is dinner.',
    caption: 'Low tide, long shadows. The only footprints are the ones you left.',
    main: LONE_SHORE,
    second: {
      src: `${M}/people/pexels-kamilarodriguesfoto-33979949.jpg`,
      alt: 'A couple holding each other on the beach as the light drops',
    },
  },

  dinner: {
    hour: '21:00',
    label: 'Candles, because the deck lights are too bright',
    title: 'Dinner runs long because the table is loud',
    body:
      'Candles, because the deck lights are wrong for the conversation that is happening. Salt still in your hair from six hours ago. Ashore, the town has started playing something you do not recognise and will remember for a decade. You could take the tender in. You could also stay exactly where you are, and that choice — being able to not go — is the whole thing.',
    caption: 'Carnival, half a mile across the water. Audible from the aft deck.',
    wide: DINNER,
    second: {
      src: `${M}/people/holger-woizick-78z3qaiyn8i-unsplash.jpg`,
      alt: 'A carnival performer in a vivid purple feathered costume, caught mid-street',
    },
  },

  crew: {
    band: CREW_BAND,
    label: 'The part that is not the boat',
    title: 'The difference is eight people you will never see working',
    body:
      'A charter is not a hotel with a hull. It is a crew of six to twelve who learned your names before you stepped aboard, noticed on the first morning that your daughter will not eat fish, and moved the vessel overnight so you would wake up somewhere quieter. You are not supposed to watch any of it happen. That is the job.',
    facts: [
      { n: '06—12', t: 'Crew aboard, depending on length' },
      { n: '01', t: 'Chef, briefed on every allergy before day one' },
      { n: '24 H', t: 'Notice to change the entire route' },
    ],
  },

  closing: {
    ...CLOSING_COPY,
    photo: {
      src: `${M}/people/pexels-andersonportella-35541050.jpg`,
      alt: 'A father and his two daughters standing together in the shallows, facing the sea',
    },
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// VERSION HALAL — meme journee, meme horloge de page, autre horloge de vie.
// L'observance est enoncee comme un FAIT de la journee, jamais comme un argument
// de vente ni comme un badge. Aucune adoucissement, aucun ton prescriptif.
// ══════════════════════════════════════════════════════════════════════════════
export const halalDay = {
  hero: {
    videoLandscape: `${M}/halal/hero-halal.mp4`,
    posterLandscape: `${M}/halal/hero-halal.jpg`,
    videoPortrait: `${M}/halal/fun-port-1.mp4`,
    posterPortrait: `${M}/halal/fun-port-1.jpg`,
    posterAlt: 'A family at the water’s edge on a Caribbean beach, late afternoon light',
    ...HERO_COPY,
  },
  premise: PREMISE_COPY,

  dawn: {
    hour: '06:40',
    label: 'First light — you were already awake for fajr',
    title: 'The teak is still cool under your feet',
    body:
      'You have been up since before the light, and the deck has been yours ever since. The generator went quiet at eleven and nothing has replaced it — just a halyard tapping the mast, and water moving under the hull at maybe half a knot. Coffee arrives without a question being asked; the crew worked out how you take it on the first morning. The bay has not decided on a colour yet.',
    caption: 'Shoreline at first light. Nobody has spoken yet.',
    main: {
      src: `${M}/halal/nathan-dumlao-qs656qrrpoo-unsplash.jpg`,
      alt: 'A father and his small child walking hand in hand along a pontoon at dawn',
    },
    second: JETTY,
  },

  swim: {
    hour: '09:15',
    label: 'Swim ladder down — 28°C, no shoes for nine hours',
    title: 'Everyone is in the water before anyone is dressed',
    body:
      'The ladder goes down and that is the entire schedule. Twenty-eight degrees, three metres of it, a sand bottom pale enough that you can watch your own shadow move. The aft deck screens off from the anchorage in about ninety seconds, and stays that way as long as you want it to. There is a bank close enough that the smallest ones can stand, and someone will stay in until their fingers wrinkle. You will not look at your phone before lunch — not out of discipline, but because you will forget it exists.',
    caption: 'Off the swim platform. First one in was not an adult.',
    main: {
      src: `${M}/halal/pexels-yassir-draka-2148838902-33803165.jpg`,
      alt: 'A woman in modest blue beachwear carrying a red bucket at the edge of a bright ocean',
    },
    second: {
      src: `${M}/halal/pexels-jmendezrf-4000822.jpg`,
      alt: 'Three boys laughing together on the sand, soaked from the sea',
    },
  },

  lunch: {
    hour: '13:00',
    label: 'Aft deck — grilled whatever came up this morning',
    title: 'Lunch is late and nobody minds',
    body:
      'Whatever came out of the water this morning is on the grill by noon — snapper, lime, far too much of it. You eat on the aft deck in a wet swimsuit, holding down a tablecloth that keeps trying to leave. Somebody says something that will not be funny tomorrow and the table goes for a full minute. This is the part people describe badly afterwards and remember perfectly.',
    caption: 'Second helpings are the default setting.',
    main: {
      src: `${M}/halal/pexels-skylight-views-2151863365-38244090.jpg`,
      alt: 'Two women in printed lemon-yellow kaftans talking in the sun',
    },
    dishes: DISHES,
  },

  dusk: {
    hour: '17:30',
    label: 'Tenders back on their chocks — wind dropped',
    title: 'The hour nobody puts in the brochure',
    body:
      'The wind drops around five and the whole anchorage goes quiet with it. There is a hundred metres of sand off the bow that no one has walked today, and it is yours until the light goes. Bring nothing. Come back when you are ready — the boat is not going anywhere, and neither is dinner.',
    caption: 'Low tide, long shadows. The only footprints are the ones you left.',
    main: LONE_SHORE,
    second: {
      src: `${M}/halal/andrewm1r-couple-6708819-1920.jpg`,
      alt: 'A couple standing close together on the deck of a sailing yacht under a clear sky',
    },
  },

  dinner: {
    hour: '21:00',
    label: 'Candles, because the deck lights are too bright',
    title: 'Dinner runs long because the table is loud',
    body:
      'Candles, because the deck lights are wrong for the conversation that is happening. Mint tea, third pot, and nobody has moved. Salt still in your hair from six hours ago. Ashore, the town has started playing something you do not recognise and will remember for a decade. You could take the tender in. You could also stay exactly where you are, and that choice — being able to not go — is the whole thing.',
    caption: 'Aft deck, third pot of tea. Music from across the water.',
    wide: DINNER,
    second: {
      src: `${M}/halal/pexels-tomris-656234478-32862944.jpg`,
      alt: 'A warm portrait of a woman in a bright orange hijab, turned towards the light',
    },
  },

  crew: {
    band: CREW_BAND,
    label: 'The part that is not the boat',
    title: 'The difference is eight people you will never see working',
    body:
      'A charter is not a hotel with a hull. It is a crew of six to twelve who learned your names before you stepped aboard, noticed on the first morning that your daughter will not eat fish, and moved the vessel overnight so you would wake up somewhere quieter. You are not supposed to watch any of it happen. That is the job.',
    // La conformite se lit comme de la competence d'equipage, dans la meme grille
    // de chiffres que les heures du recit — pas comme un label appose.
    facts: [
      { n: '01', t: 'Chef, halal-certified galley, briefed before day one' },
      { n: '05', t: 'Prayer times held on the ship’s clock, wherever she is anchored' },
      { n: '00', t: 'Alcohol served on board, unless you ask' },
    ],
  },

  closing: {
    ...CLOSING_COPY,
    photo: {
      src: `${M}/halal/nathan-dumlao-qs656qrrpoo-unsplash.jpg`,
      alt: 'A father and his small child hand in hand on the pontoon, seen from behind',
    },
  },
};
