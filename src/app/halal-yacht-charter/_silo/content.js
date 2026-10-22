// ══ Silo SEO halal (client 2026-10-23) ══
// Une page = une requete principale. Textes rediges par Claude, valides par le client
// avant publication. Les services marques « on request » sont confirmes par le client
// (equipage feminin, Ramadan/Eid, espace de priere, departs New York / Toronto,
// Miami -> Bahamas, catamarans, motor yachts).
// regions : regions admin dont on affiche les yachts « Halal Charter ».

const NA = '/media/client/halal-north-america/2026-10-22';
const NA2 = '/media/client/halal-north-america/2026-10-23';
const CARDS = '/media/client/2026-10-16/north-america-cards';
const HB = '/media/client/halal-bahamas/2026-10-02';
const ECLAT_B = '/media/client/lydie/2026-09-28/bahamas-eclat';
const Q = '/media/quality';

export const SILO = {
  miami: {
    keyword: 'private halal yacht charter Miami',
    title: 'Private Halal Yacht Charter Miami | Qualityacht',
    description: 'Private halal yacht charter in Miami: Muslim-friendly, alcohol-free yachts with a halal chef, discreet crew and prayer space on request.',
    kicker: 'Miami · Florida',
    h1: 'Private Halal Yacht Charter Miami',
    hero: `${CARDS}/miami.jpg`,
    image: `${NA2}/slide-1b.jpg`,
    regions: ['north-america'],
    intro: [
      'A private halal yacht charter in Miami combines the energy of one of America’s most glamorous waterfronts with the calm, discreet atmosphere your family expects. From Biscayne Bay to the turquoise shallows off Key Biscayne, every hour on board is shaped around your values and your pace.',
      'We select the yacht, the crew and the menu with you in advance. Halal catering, an alcohol-free environment and a quiet space for prayer are arranged before you step aboard, so nothing needs to be explained twice.',
    ],
    sections: [
      { title: 'Biscayne Bay, Your Way', text: 'Cruise past the Miami skyline, anchor off the sandbars of Biscayne Bay or spend a slow afternoon near Key Biscayne. Day charters suit a family outing or a business gathering; longer charters can continue south to the Florida Keys or east to the Bahamas.' },
      { title: 'Halal on Board', text: 'A private halal chef prepares every meal on board, from Middle Eastern classics to refined international cuisine, with certified halal sourcing arranged in Miami. Alcohol can be removed from the yacht on request and replaced with fresh juices, mocktails and specialty coffees.' },
      { title: 'Discretion as Standard', text: 'Our crews are briefed on your preferences before departure: modest swimwear areas, privacy at anchor, prayer times respected and, on request, female crew members. Miami’s marinas are busy; your charter will not feel that way.' },
      { title: 'Planning Your Miami Charter', text: 'Tell us your dates, the size of your group and the experience you have in mind. We shortlist suitable yachts, confirm halal catering and crew preferences, and send a clear proposal. Once confirmed, every detail is ready before you arrive at the marina.' },
    ],
    faq: [
      { q: 'How long is a private halal yacht charter in Miami?', a: 'From a few hours on Biscayne Bay to a full week along the Florida coast or across to the Bahamas. We tailor the duration to your plans.' },
      { q: 'Can we have a halal chef on a Miami day charter?', a: 'Yes, on request. A halal chef or halal catering can be arranged even for a short day charter.' },
      { q: 'Where do Miami halal yacht charters depart from?', a: 'Most charters depart from marinas in Miami Beach, downtown Miami or Coconut Grove, depending on the yacht you choose.' },
      { q: 'Can we combine a Miami charter with the Florida Keys?', a: 'Yes, on request. Multi-day itineraries can continue south through the Keys toward Key West.' },
      { q: 'Is a Miami halal yacht charter suitable for business guests?', a: 'Yes. A private yacht offers a discreet, alcohol-free setting for meetings and client hospitality.' },
    ],
  },

  'new-york': {
    keyword: 'halal yacht charter from New York',
    title: 'Halal Yacht Charter from New York | Qualityacht',
    description: 'Halal yacht charter from New York: private, alcohol-free cruises on the Hudson, Long Island Sound and the Hamptons, with a halal chef on request.',
    kicker: 'New York · East Coast',
    h1: 'Halal Yacht Charter from New York',
    hero: `${CARDS}/east-coast.jpg`,
    image: `${NA}/gallery-3.jpg`,
    regions: ['north-america'],
    intro: [
      'A halal yacht charter from New York turns the city’s skyline into a private backdrop. Leave Manhattan behind for the Hudson River, Long Island Sound or the beaches of the Hamptons, aboard a yacht prepared around your values.',
      'Halal catering, an alcohol-free environment and a calm space for prayer are arranged in advance, so your time on the water is entirely your own.',
    ],
    sections: [
      { title: 'From Manhattan to the Hamptons', text: 'An evening cruise around the Statue of Liberty, a day on Long Island Sound or a longer journey to the Hamptons and New England — each itinerary is drawn up around your guests, your schedule and the season.' },
      { title: 'A Halal Table in New York', text: 'New York offers some of the finest halal catering in the country. On request, we place a private halal chef on board or arrange catering from trusted halal kitchens in the city, served with alcohol-free beverages.' },
      { title: 'Ideal for Families and Business', text: 'A private yacht is a discreet setting for a family celebration or a business meeting. Our crews respect privacy, prayer times and dress preferences, and the yacht can be fully alcohol-free on request.' },
      { title: 'Planning Your New York Charter', text: 'Share your dates, guest list and preferred route. We propose yachts that match your group, confirm halal catering and crew preferences, and coordinate boarding at a convenient Manhattan or Long Island marina.' },
    ],
    faq: [
      { q: 'When is the best season for a yacht charter from New York?', a: 'The main season runs from late spring to early autumn, when the weather is warm and the waters around Manhattan and Long Island are calm.' },
      { q: 'Can a New York charter continue to New England?', a: 'Yes, on request. Longer charters can continue along the coast toward Rhode Island, Massachusetts and Maine.' },
      { q: 'Is a halal yacht charter from New York available as a day charter?', a: 'Yes. Day and evening charters are available, as well as multi-day itineraries.' },
      { q: 'Can we board in Manhattan?', a: 'Yes. Many charters board at marinas in Manhattan, depending on the yacht.' },
      { q: 'Can we hold a family celebration on a New York yacht?', a: 'Yes, on request. Birthdays, engagements and Eid gatherings can be organized on board.' },
    ],
  },

  toronto: {
    keyword: 'halal yacht charter from Toronto',
    title: 'Halal Yacht Charter from Toronto | Qualityacht',
    description: 'Halal yacht charter from Toronto: private, alcohol-free cruises on Lake Ontario and to the Thousand Islands, with halal catering on request.',
    kicker: 'Toronto · Canada',
    h1: 'Halal Yacht Charter from Toronto',
    hero: `${CARDS}/canada.jpg`,
    image: `${NA}/gallery-2.jpg`,
    regions: ['north-america'],
    intro: [
      'A halal yacht charter from Toronto opens Lake Ontario to you and your guests — the city skyline, the Toronto Islands and, further east, the Thousand Islands. Every detail on board is aligned with your values.',
      'Halal catering, an alcohol-free environment and a quiet space for prayer are prepared before departure, with a crew briefed on your preferences.',
    ],
    sections: [
      { title: 'Lake Ontario and Beyond', text: 'Spend an afternoon around the Toronto Islands, watch the sunset behind the CN Tower, or plan a longer journey toward the Thousand Islands and Georgian Bay during the summer season.' },
      { title: 'Halal, Prepared in Advance', text: 'Toronto has a rich halal food scene. On request, we arrange a private halal chef or catering from trusted halal kitchens, with fresh juices and alcohol-free drinks served throughout.' },
      { title: 'Private Moments for Families', text: 'A Toronto charter is a relaxed setting for family gatherings, Eid celebrations or a quiet day away from the city. Prayer times are respected and, on request, female crew members can be arranged.' },
      { title: 'Planning Your Toronto Charter', text: 'Send us your preferred dates and group size. We propose suitable yachts on Lake Ontario, confirm halal catering and crew preferences, and arrange boarding at a marina close to downtown Toronto.' },
    ],
    faq: [
      { q: 'When can we charter a yacht from Toronto?', a: 'The boating season on Lake Ontario generally runs from late spring to early autumn.' },
      { q: 'Can we visit the Thousand Islands from Toronto?', a: 'Yes, on request, as part of a multi-day itinerary during the summer season.' },
      { q: 'Is alcohol removed from the yacht?', a: 'On request, no alcohol is served on board and alcohol-free beverages are arranged in its place.' },
      { q: 'Can we charter a yacht from Toronto for a day?', a: 'Yes. Half-day, full-day and evening charters are available during the season.' },
      { q: 'Is a prayer space available on Toronto charters?', a: 'Yes, on request. A quiet, clean space is prepared for prayer on board.' },
    ],
  },

  'miami-to-bahamas': {
    keyword: 'halal yacht charter from Miami to Bahamas',
    title: 'Halal Yacht Charter from Miami to Bahamas | Qualityacht',
    description: 'Halal yacht charter from Miami to the Bahamas: cross the Gulf Stream to Bimini and the Exumas aboard a private, alcohol-free yacht with a halal chef.',
    kicker: 'Miami · The Bahamas',
    h1: 'Halal Yacht Charter from Miami to the Bahamas',
    hero: `${ECLAT_B}/atlantis.jpg`,
    image: `${HB}/hero-poster.jpg`,
    regions: ['north-america', 'bahamas'],
    intro: [
      'A halal yacht charter from Miami to the Bahamas is one of the most rewarding journeys on the East Coast. Only about fifty nautical miles separate Miami from Bimini — a short crossing to crystal-clear water and quiet anchorages.',
      'We prepare the yacht, the route and the paperwork in advance, with halal catering, an alcohol-free environment and a space for prayer arranged around you.',
    ],
    sections: [
      { title: 'Across the Gulf Stream', text: 'Depart from Miami in the morning and reach Bimini the same day, weather permitting. From there, the itinerary can continue to the Berry Islands, Nassau and the Exumas, at the pace you choose.' },
      { title: 'Formalities Handled for You', text: 'Entering the Bahamas requires clearing customs and immigration on arrival. Our team and the captain prepare the documents and guide you through each step, so the crossing stays effortless.' },
      { title: 'Halal from Departure to Return', text: 'Provisions are prepared in Miami before departure: halal meat, fresh produce and alcohol-free beverages. On request, a private halal chef travels with you for the entire charter.' },
      { title: 'Choosing the Right Yacht', text: 'For the crossing, we recommend a yacht with the range and comfort to handle open water. Motor yachts reach Bimini quickly, while catamarans offer stability and space for families. We advise you based on your group and your schedule.' },
    ],
    faq: [
      { q: 'How long does the crossing from Miami to Bimini take?', a: 'Depending on the yacht and the weather, the crossing usually takes a few hours.' },
      { q: 'Do we need a passport to sail from Miami to the Bahamas?', a: 'Yes. All guests need a valid passport and any visa required for their nationality.' },
      { q: 'How many days do we need for a Miami to Bahamas charter?', a: 'A long weekend is enough for Bimini; a week allows you to reach the Exumas.' },
      { q: 'Can we fly back from the Bahamas instead of sailing?', a: 'Yes, on request. One-way itineraries can end in Nassau or another island with flights home.' },
      { q: 'Is the crossing suitable for children?', a: 'Yes, in good weather. The captain chooses the departure window to keep the crossing comfortable.' },
    ],
  },

  'motor-yacht': {
    keyword: 'halal motor yacht charter',
    title: 'Halal Motor Yacht Charter | Qualityacht',
    description: 'Halal motor yacht charter in the Caribbean, the Bahamas and the USA: speed, space and privacy, with a halal chef and alcohol-free service on board.',
    kicker: 'Motor Yachts',
    h1: 'Halal Motor Yacht Charter',
    hero: `${Q}/boats/sporthearts-yacht-4993408-1920.jpg`,
    image: `${NA2}/slide-1b.jpg`,
    regions: ['caribbean', 'bahamas', 'north-america'],
    intro: [
      'A halal motor yacht charter offers speed, generous living space and the comfort of a floating residence. Cover more islands in less time, then settle into calm anchorages with your family and guests.',
      'Every motor yacht can be prepared with halal catering, an alcohol-free environment and a quiet space for prayer, arranged before you board.',
    ],
    sections: [
      { title: 'More Islands, Less Time', text: 'Motor yachts cruise faster than sailing yachts, which makes island-hopping across the Caribbean or the Bahamas effortless. Spend less time at sea and more time at the beaches and anchorages you love.' },
      { title: 'Space for Everyone', text: 'Large salons, shaded decks and separate cabins give each family member privacy. Many motor yachts carry water toys, tenders and swim platforms for relaxed days at anchor.' },
      { title: 'A Halal Experience Throughout', text: 'From the galley to the bar, the yacht is prepared around your values: halal menus by a private chef, alcohol-free beverages and prayer times respected by a discreet crew.' },
      { title: 'Choosing Your Motor Yacht', text: 'Tell us the number of guests, your destination and the experience you want. We shortlist motor yachts by size, layout and amenities, and confirm halal catering and crew preferences before you book.' },
    ],
    faq: [
      { q: 'What size are your halal motor yachts?', a: 'From compact day-cruisers to large motor yachts and superyachts. We match the yacht to your group and itinerary.' },
      { q: 'Where can we charter a halal motor yacht?', a: 'In the Caribbean, the Bahamas and the USA, including Miami, among other destinations.' },
      { q: 'Can the motor yacht be fully alcohol-free?', a: 'Yes, on request. No alcohol is served on board and alcohol-free beverages are arranged in its place.' },
      { q: 'Do halal motor yachts include water toys?', a: 'Many do, including tenders, paddleboards and snorkeling gear, depending on the yacht.' },
      { q: 'Is a crew included on a halal motor yacht charter?', a: 'Yes. Our motor yachts are offered with a professional crew.' },
    ],
  },

  catamaran: {
    keyword: 'halal catamaran charter',
    title: 'Halal Catamaran Charter | Qualityacht',
    description: 'Halal catamaran charter in the Bahamas and the Caribbean: stable, spacious and private, with a halal chef and an alcohol-free environment on request.',
    kicker: 'Catamarans',
    h1: 'Halal Catamaran Charter',
    hero: `${HB}/hero-poster.jpg`,
    image: `${NA}/gallery-5.jpg`,
    regions: ['bahamas', 'caribbean'],
    intro: [
      'A halal catamaran charter is ideal for families: two hulls mean more stability, more space on deck and easy access to shallow, turquoise anchorages — especially in the Bahamas.',
      'Halal catering, an alcohol-free environment and a calm space for prayer are prepared before departure, with a crew briefed on your preferences.',
    ],
    sections: [
      { title: 'Stable and Comfortable', text: 'Catamarans sail flat and steady, which makes them comfortable for children, elderly guests and anyone new to life at sea. Wide decks and trampolines become natural gathering places.' },
      { title: 'Made for Shallow Waters', text: 'Their shallow draft lets catamarans anchor close to the beach in the Bahamas and the Caribbean, where larger yachts cannot go — perfect for sandbars, quiet coves and private swims.' },
      { title: 'Halal, Simply Arranged', text: 'A private chef or halal provisioning, alcohol-free beverages and prayer times respected: everything is agreed in advance, so your days on board flow naturally.' },
      { title: 'Choosing Your Catamaran', text: 'From intimate catamarans for a small family to large luxury catamarans for extended groups, we match the yacht to your party and itinerary, and confirm halal catering and crew preferences in advance.' },
    ],
    faq: [
      { q: 'Is a catamaran good for a family halal charter?', a: 'Yes. Catamarans are stable, spacious and offer separate cabins, which makes them well suited to families.' },
      { q: 'Where do you offer halal catamaran charters?', a: 'Mainly in the Bahamas and the Caribbean, on request.' },
      { q: 'Does a halal catamaran charter include a crew?', a: 'Yes. Our catamarans are offered with a professional crew, and a halal chef can be added on request.' },
      { q: 'Are catamarans faster than motor yachts?', a: 'No. Catamarans are generally slower, but more stable and economical, which suits relaxed island-hopping.' },
      { q: 'Can we charter a halal catamaran for a single day?', a: 'Yes, on request, depending on the destination and availability.' },
    ],
  },

  superyacht: {
    keyword: 'halal superyacht charter',
    title: 'Halal Superyacht Charter | Qualityacht',
    description: 'Halal superyacht charter: the ultimate private yacht experience, with a halal chef, alcohol-free service, prayer space and full discretion on request.',
    kicker: 'Superyachts',
    h1: 'Halal Superyacht Charter',
    hero: `${Q}/boats/sporthearts-yacht-4993408-1920.jpg`,
    image: `${NA}/slide-2.jpg`,
    regions: ['caribbean', 'bahamas', 'north-america'],
    intro: [
      'A halal superyacht charter is the most private way to travel by sea: a large crewed yacht, often over 24 meters, with spacious suites, wellness areas and a crew entirely dedicated to your party.',
      'Every element — cuisine, beverages, prayer space, privacy and crew — is prepared around your values and personal standards.',
    ],
    sections: [
      { title: 'A Residence at Sea', text: 'Superyachts offer master suites, family cabins, lounges, dining areas and, on many yachts, a spa, a gym and a beach club. Each space can be arranged for privacy between families or generations.' },
      { title: 'A Dedicated Halal Galley', text: 'On request, the galley is prepared to halal standards and a private halal chef designs every menu with you, served with refined alcohol-free beverages.' },
      { title: 'Absolute Discretion', text: 'Superyacht crews are trained for discretion. Prayer times, modest dress, privacy at anchor and, on request, female crew members are arranged before you board.' },
      { title: 'Planning a Superyacht Charter', text: 'Superyachts are often reserved months in advance. Share your dates, guest list and expectations early, and we will shortlist available yachts, confirm halal arrangements and prepare a detailed proposal.' },
    ],
    faq: [
      { q: 'What is considered a superyacht?', a: 'A superyacht is generally a professionally crewed yacht over 24 meters (about 80 feet) in length.' },
      { q: 'Can the galley of a superyacht be fully halal?', a: 'Yes, on request. Provisioning and cooking are arranged to halal standards by a private chef.' },
      { q: 'Where can we charter a halal superyacht?', a: 'In the Caribbean, the Bahamas and the USA, among other destinations.' },
      { q: 'How far in advance should we book a halal superyacht?', a: 'As early as possible, especially for peak seasons and holiday periods.' },
      { q: 'Can a superyacht host several families?', a: 'Yes. Many superyachts have multiple suites and separate living areas for each family.' },
    ],
  },

  'halal-chef': {
    keyword: 'yacht charter with halal chef',
    title: 'Yacht Charter with Halal Chef | Qualityacht',
    description: 'Yacht charter with a halal chef: private halal catering on board, certified halal sourcing, refined menus and alcohol-free pairings on request.',
    kicker: 'Halal Cuisine',
    h1: 'Yacht Charter with Halal Chef',
    hero: `${NA}/gallery-1.jpg`,
    image: `${Q}/food/alexey-demidov-y2rd93n7u7o-unsplash.jpg`,
    regions: ['caribbean', 'bahamas', 'north-america'],
    intro: [
      'A yacht charter with a halal chef turns every meal into a highlight of your journey. From breakfast on deck to dinner at anchor, your menus are designed around your tastes, your family and your values.',
      'Halal sourcing, preparation and service are agreed with you before departure, so you can enjoy every table with complete peace of mind.',
    ],
    sections: [
      { title: 'Menus Designed with You', text: 'Before the charter, the chef discusses your preferences: Middle Eastern, Asian, Mediterranean or international cuisine, children’s menus, allergies and special occasions.' },
      { title: 'Halal Sourcing', text: 'Meat and poultry are sourced from halal suppliers, and the galley is organized to keep halal preparation separate. On request, alcohol is removed from the yacht and from all recipes.' },
      { title: 'Celebrations at the Table', text: 'Birthdays, Eid celebrations or a family reunion: the chef prepares dedicated menus, desserts and alcohol-free pairings for every moment you wish to mark.' },
      { title: 'How It Works', text: 'Share your preferences when you book. The chef prepares a menu proposal before your charter, adjusts it as the days go by and keeps you informed of the halal sourcing for each meal.' },
    ],
    faq: [
      { q: 'Is the halal chef included in the charter price?', a: 'It depends on the yacht. Many crewed yachts include a chef; a dedicated halal chef can be added on request.' },
      { q: 'Can the chef cook for children and dietary needs?', a: 'Yes. Children’s menus, allergies and dietary preferences are planned with you in advance.' },
      { q: 'Can we bring our own halal products on board?', a: 'Yes, on request. Your preferred products can be added to the provisioning list.' },
      { q: 'Can the chef prepare food for Ramadan or Eid?', a: 'Yes, on request. Suhoor, iftar and festive Eid menus can be prepared on board.' },
      { q: 'Is halal certification available for the meat on board?', a: 'On request, we source meat from certified halal suppliers wherever available.' },
    ],
  },

  'alcohol-free': {
    keyword: 'alcohol-free yacht charter',
    title: 'Alcohol-Free Yacht Charter | Qualityacht',
    description: 'Alcohol-free yacht charter: no alcohol on board on request, refined mocktails, fresh juices and specialty coffees, for a private and serene experience.',
    kicker: 'Alcohol-Free',
    h1: 'Alcohol-Free Yacht Charter',
    hero: `${NA}/slide-2.jpg`,
    image: `${Q}/food/fruits-1440x800.jpg`,
    regions: ['caribbean', 'bahamas', 'north-america'],
    intro: [
      'An alcohol-free yacht charter offers a calm, serene atmosphere for families, faith-conscious guests and anyone who prefers to celebrate without alcohol.',
      'On request, no alcohol is served or offered on board, and a refined selection of alcohol-free beverages is prepared in its place.',
    ],
    sections: [
      { title: 'No Alcohol on Board', text: 'Before departure, we agree with the yacht how alcohol will be handled. On request, the bar is cleared and no alcohol is served or offered during your charter.' },
      { title: 'A Refined Alcohol-Free Bar', text: 'Fresh juices, mocktails, infused waters, Arabic coffee, teas and premium soft drinks are selected in advance and served with the same care as any fine bar.' },
      { title: 'Combined with Halal Catering', text: 'An alcohol-free charter is often paired with a halal chef and prayer-friendly arrangements, creating a fully halal experience on board.' },
      { title: 'Planning an Alcohol-Free Charter', text: 'Mention your preference when you enquire. We confirm with the yacht how the bar will be handled and send you a beverage list to approve before departure.' },
    ],
    faq: [
      { q: 'Can alcohol be completely removed from the yacht?', a: 'Yes, on request. We agree this with the yacht before your charter.' },
      { q: 'Do you serve mocktails on an alcohol-free charter?', a: 'Yes. Mocktails, fresh juices and specialty drinks are prepared on board.' },
      { q: 'Is an alcohol-free yacht charter more expensive?', a: 'Not necessarily. Beverages are provisioned according to your choices, like any other preference.' },
      { q: 'Can guests still order drinks freely on an alcohol-free charter?', a: 'Yes. The alcohol-free bar is open throughout your charter, as on any crewed yacht.' },
      { q: 'Is an alcohol-free charter available for a single day?', a: 'Yes, on request, for day charters as well as longer stays.' },
    ],
  },

  'muslim-family': {
    keyword: 'halal yacht charter for Muslim families',
    title: 'Halal Yacht Charter for Muslim Families | Qualityacht',
    description: 'Halal yacht charter for Muslim families: privacy, halal catering, alcohol-free environment, prayer space and activities for all ages, on request.',
    kicker: 'Muslim Families',
    h1: 'Halal Yacht Charter for Muslim Families',
    hero: '/images/halal/vecteezy_woman-in-hijab-gazes-thoughtfully-at-the-ocean-while_69947790.jpg',
    image: `${NA}/gallery-5.jpg`,
    regions: ['caribbean', 'bahamas', 'north-america'],
    intro: [
      'A halal yacht charter for Muslim families brings parents, children and grandparents together in a private, peaceful setting — far from crowded beaches and hotels.',
      'Halal meals, an alcohol-free environment, privacy for women and a quiet space for prayer are prepared before you board, so everyone can relax from the first day.',
    ],
    sections: [
      { title: 'Privacy for Every Generation', text: 'Separate cabins, shaded decks and private anchorages allow each family member to enjoy the sea comfortably. Modest swimming areas and privacy at anchor are arranged on request.' },
      { title: 'Days Made for Children', text: 'Calm bays, snorkeling, paddleboards and beach picnics keep children happy, while experienced crews keep safety at the center of every activity.' },
      { title: 'Faith Respected Naturally', text: 'Prayer times are respected, a clean space is prepared for prayer, and halal meals are served throughout. On request, female crew members can be arranged.' },
      { title: 'Planning Your Family Charter', text: 'Tell us the ages of your children, your preferred destination and your family traditions. We shortlist suitable yachts, confirm halal catering and privacy arrangements, and prepare an itinerary that suits every generation.' },
    ],
    faq: [
      { q: 'Is a yacht charter safe for young children?', a: 'Yes. Crews are experienced with families, and life jackets for children can be provided on request.' },
      { q: 'Can women swim privately during the charter?', a: 'Yes, on request. We choose secluded anchorages and arrange privacy on deck and at the swim platform.' },
      { q: 'How many family members can join a halal yacht charter?', a: 'It depends on the yacht, from small family groups to large extended families on bigger yachts.' },
      { q: 'Can we have a halal chef on a family charter?', a: 'Yes, on request. A private halal chef can prepare meals for the whole family, including children’s menus.' },
      { q: 'Is the yacht alcohol-free during a family charter?', a: 'On request, no alcohol is served on board and alcohol-free beverages are arranged in its place.' },
    ],
  },

  eid: {
    keyword: 'halal yacht charter for Eid',
    title: 'Halal Yacht Charter for Eid | Qualityacht',
    description: 'Halal yacht charter for Eid: celebrate Eid al-Fitr or Eid al-Adha at sea with family, a halal chef, festive menus and an alcohol-free environment.',
    kicker: 'Eid Celebrations',
    h1: 'Halal Yacht Charter for Eid',
    hero: `${Q}/halal/hero-halal.jpg`,
    image: `${NA}/gallery-1.jpg`,
    regions: ['caribbean', 'bahamas', 'north-america'],
    intro: [
      'A halal yacht charter for Eid is an unforgettable way to celebrate Eid al-Fitr or Eid al-Adha with the people closest to you — privately, at sea, in a setting shaped around your traditions.',
      'Festive halal menus, an alcohol-free environment and a quiet space for prayer are arranged in advance, so the day belongs entirely to your family.',
    ],
    sections: [
      { title: 'Eid Morning at Sea', text: 'On request, your itinerary is planned so the family can attend Eid prayer ashore or pray together on board before the celebrations begin.' },
      { title: 'A Festive Halal Table', text: 'A private halal chef prepares traditional dishes, sweets and a festive lunch or dinner for your guests, with alcohol-free drinks served throughout the day.' },
      { title: 'Book Early', text: 'Eid dates follow the lunar calendar and are popular periods for charters. We recommend reserving well in advance to secure the yacht and crew you prefer.' },
      { title: 'Where to Celebrate Eid', text: 'Eid at sea can be celebrated in the Caribbean, the Bahamas or along the coast of the USA, depending on the season. We suggest the destination best suited to your dates and your family.' },
    ],
    faq: [
      { q: 'Can we celebrate both Eid al-Fitr and Eid al-Adha on a yacht?', a: 'Yes. Charters can be arranged for either celebration, on request.' },
      { q: 'Can the chef prepare traditional Eid dishes?', a: 'Yes. Menus are designed with you, including traditional dishes and sweets.' },
      { q: 'How early should we book an Eid yacht charter?', a: 'As early as possible, as Eid periods are in high demand.' },
      { q: 'Can we invite guests on board for an Eid lunch?', a: 'Yes, on request, within the capacity of the yacht.' },
      { q: 'Is a prayer space available on an Eid charter?', a: 'Yes, on request. A clean space is prepared for prayer, with the qibla direction indicated.' },
    ],
  },

  ramadan: {
    keyword: 'halal yacht charter for Ramadan',
    title: 'Halal Yacht Charter for Ramadan | Qualityacht',
    description: 'Halal yacht charter for Ramadan: suhoor and iftar timings respected on board, halal chef, prayer space and a calm, alcohol-free environment, on request.',
    kicker: 'Ramadan',
    h1: 'Halal Yacht Charter for Ramadan',
    hero: '/images/halal/7945425-portrait-3138562.jpg',
    image: `${NA}/slide-2.jpg`,
    regions: ['caribbean', 'bahamas', 'north-america'],
    intro: [
      'A halal yacht charter for Ramadan offers a peaceful setting to fast, pray and gather with family, away from the rush of daily life.',
      'On request, the crew adapts the rhythm of the yacht to your fast: suhoor before dawn, iftar at sunset and quiet moments for prayer and reflection.',
    ],
    sections: [
      { title: 'Suhoor and Iftar on Board', text: 'The chef prepares suhoor before dawn and a generous iftar at sunset, often with dates, soups and family dishes. Meal times follow the local prayer schedule.' },
      { title: 'A Calm Rhythm', text: 'Itineraries during Ramadan are gentle, with short passages and long stays at quiet anchorages, leaving room for rest, prayer and reading.' },
      { title: 'Space for Prayer', text: 'A clean, quiet space is prepared for prayer, with the qibla direction indicated. Taraweeh prayers can be held on deck in the evening calm.' },
      { title: 'Planning a Ramadan Charter', text: 'Ramadan dates follow the lunar calendar. Share your preferred dates early; we confirm the yacht, the chef and the crew briefing so that your fast is fully respected from the first day.' },
    ],
    faq: [
      { q: 'Does the crew respect our fasting schedule?', a: 'Yes, on request. Meal service and activities are organized around suhoor, iftar and prayer times.' },
      { q: 'Can we break our fast at sunset on deck?', a: 'Yes. Iftar can be served on deck at sunset, weather permitting.' },
      { q: 'Is a Ramadan charter suitable for families?', a: 'Yes. The calm itinerary and private setting make it well suited to families.' },
      { q: 'Can we spend the last nights of Ramadan at sea?', a: 'Yes, on request. Itineraries can be planned around the last ten nights.' },
      { q: 'Can the charter continue into Eid?', a: 'Yes. Many guests extend their charter to celebrate Eid al-Fitr on board.' },
    ],
  },

  'female-crew': {
    keyword: 'halal yacht charter with female crew',
    title: 'Halal Yacht Charter with Female Crew | Qualityacht',
    description: 'Halal yacht charter with female crew members on request: privacy and comfort for women and families, halal chef and alcohol-free environment.',
    kicker: 'Female Crew',
    h1: 'Halal Yacht Charter with Female Crew',
    hero: '/images/halal/vecteezy_woman-in-hijab-gazes-thoughtfully-at-the-ocean-while_69947790.jpg',
    image: `${NA}/slide-2.jpg`,
    regions: ['caribbean', 'bahamas', 'north-america'],
    intro: [
      'A halal yacht charter with female crew members offers additional comfort and privacy for women, families and groups who prefer to be served by women on board.',
      'On request and subject to availability, we arrange yachts with female stewardesses and, where possible, female hosts, alongside halal catering and an alcohol-free environment.',
    ],
    sections: [
      { title: 'Comfort and Privacy', text: 'Female crew members can take care of cabins, service and guest relations, allowing women to feel at ease throughout the charter, on deck as well as in private areas.' },
      { title: 'Planned in Advance', text: 'Female crew arrangements depend on the yacht and the season. We confirm them with you before booking, so there are no surprises on arrival.' },
      { title: 'A Fully Halal Experience', text: 'Female crew can be combined with a halal chef, an alcohol-free bar, prayer space and secluded anchorages for a charter entirely aligned with your values.' },
      { title: 'Requesting a Female Crew', text: 'Mention your preference as early as possible. We check availability with suitable yachts, confirm the crew composition in writing and brief the crew on your expectations before departure.' },
    ],
    faq: [
      { q: 'Can the entire crew be female?', a: 'It depends on the yacht and availability. We confirm the exact crew composition with you before booking.' },
      { q: 'Is a female crew available in every destination?', a: 'On request and subject to availability, in our main destinations including the Caribbean, the Bahamas and the USA.' },
      { q: 'Does requesting a female crew change the price?', a: 'It may, depending on the yacht. We provide a clear quote before you confirm.' },
      { q: 'Can a female crew be combined with a halal chef?', a: 'Yes, on request, depending on the yacht and availability.' },
      { q: 'Is a female crew available for day charters?', a: 'On request and subject to availability.' },
    ],
  },

  wedding: {
    keyword: 'halal wedding yacht charter',
    title: 'Halal Wedding Yacht Charter | Qualityacht',
    description: 'Halal wedding yacht charter: nikah, walima or honeymoon at sea, with halal catering, an alcohol-free celebration and full privacy for your guests.',
    kicker: 'Weddings',
    h1: 'Halal Wedding Yacht Charter',
    hero: `${NA}/gallery-2.jpg`,
    image: `${NA}/gallery-4.jpg`,
    regions: ['caribbean', 'bahamas', 'north-america'],
    intro: [
      'A halal wedding yacht charter creates a private, elegant setting for your nikah, your walima or your honeymoon — surrounded by the sea and the people who matter most.',
      'Halal catering, an alcohol-free celebration, separate areas for guests if you wish and a space for prayer are planned with you from the first conversation.',
    ],
    sections: [
      { title: 'Nikah and Walima at Sea', text: 'On request, we arrange a yacht large enough for your guests, with decoration, music according to your preferences and a celebratory halal menu prepared by a private chef.' },
      { title: 'Privacy for the Families', text: 'Separate lounges or decks can be arranged for men and women, and the yacht can be reserved exclusively for your celebration.' },
      { title: 'A Halal Honeymoon', text: 'After the celebration, continue with a private honeymoon charter to secluded anchorages in the Caribbean or the Bahamas, with halal meals and complete discretion.' },
      { title: 'Planning Your Wedding Charter', text: 'Weddings require early planning. Share your date, the number of guests and your traditions; we coordinate the yacht, the menu, the decoration and the timing with you and your families.' },
    ],
    faq: [
      { q: 'Can an imam perform the nikah on board?', a: 'On request, we can help coordinate the ceremony with an officiant of your choice.' },
      { q: 'How many guests can attend a wedding on a yacht?', a: 'From an intimate gathering to larger events on bigger yachts, depending on local rules and the vessel.' },
      { q: 'Can the wedding be fully alcohol-free?', a: 'Yes, on request. No alcohol is served and a refined alcohol-free bar is arranged.' },
      { q: 'Can we hold a mehndi or henna evening on a yacht?', a: 'Yes, on request, depending on the yacht and the number of guests.' },
      { q: 'Can the yacht be decorated for the wedding?', a: 'Yes. Flowers and decoration can be arranged according to your preferences.' },
    ],
  },
};

// Pages du silo (ordre de la section « Explore » sur /halal-yacht-charter).
export const SILO_GROUPS = [
  { title: 'Destinations', items: [
    ['miami', 'Miami'], ['usa', 'USA'], ['new-york', 'New York'], ['toronto', 'Toronto'],
    ['miami-to-bahamas', 'Miami to Bahamas'], ['bahamas', 'Bahamas'], ['caribbean', 'Caribbean'],
  ] },
  { title: 'Yachts', items: [['motor-yacht', 'Motor Yacht'], ['catamaran', 'Catamaran'], ['superyacht', 'Superyacht']] },
  { title: 'Experiences', items: [
    ['halal-chef', 'Halal Chef'], ['alcohol-free', 'Alcohol-Free'], ['muslim-family', 'Muslim Families'],
    ['eid', 'Eid'], ['ramadan', 'Ramadan'], ['female-crew', 'Female Crew'], ['wedding', 'Weddings'], ['faq', 'FAQ'],
  ] },
];
