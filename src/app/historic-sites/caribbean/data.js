// Donnees des 3 categories "The Caribbean by Land" (Monuments / Hiking / Cycling).
// Contenu reel repris de l'ancienne /historic-sites/caribbean-v2 (ExperienceColumns) ;
// reutilise ici par /historic-sites/caribbean (panneaux) et /historic-sites/caribbean/[section].

export const columns = [
  {
    key: 'monuments',
    title: 'Historic Monuments',
    subtitle: 'Jamaica — Ten Sites of Consequence',
    items: [
      { name: 'Port Royal', meta: '17th c. · Yacht access · UNESCO 2025', tone: 'navy' },
      { name: 'Fort Charles', meta: '1655–1660 · Yacht access', tone: 'slate' },
      { name: 'Spanish Town', meta: '1534–1872 · Inland transfer', tone: 'copper' },
      { name: 'Rose Hall Great House', meta: '1770s · Yacht access', tone: 'slate' },
      { name: 'Greenwood Great House', meta: '1780–1800 · Yacht access', tone: 'navy' },
      { name: 'Falmouth', meta: '1769–1840s · Yacht access', tone: 'saumon' },
      { name: 'Seville Heritage Park', meta: 'Since 650 AD · Yacht access', tone: 'slate' },
      { name: 'Devon House', meta: '1881 · Kingston', tone: 'copper' },
      { name: 'Good Hope Plantation', meta: '1755 · Yacht access', tone: 'navy' },
      { name: 'Port Antonio', meta: 'Superyacht marina', tone: 'saumon' },
    ],
  },
  {
    key: 'hiking',
    title: 'Hiking',
    subtitle: '20 exceptional hikes · VIP access from the yacht',
    variant: 'hike',
    items: [
      { name: 'La Soufrière', location: 'Guadeloupe', level: 'Difficult', distance: '12 km', elevation: '+1,467 m', duration: '6–8 h', yacht: true, vip: 'Private volcanologist guide (BRGM). Helicopter transfer from yacht to Saint-Claude, gourmet picnic at altitude with champagne, return flight at sunset.', access: 'Basse-Terre or Pigeon Island. Helicopter 15 min.' },
      { name: 'Blue Mountains', location: 'Jamaica', level: 'Difficult', distance: '16 km', elevation: '+2,256 m', duration: '7–9 h', yacht: true, vip: 'Luxury high-altitude bivouac (Frette bedding), Blue Mountain Coffee breakfast at summit, helicopter return with coastal flyover.', access: 'Kingston Harbour or Port Antonio. Private 4x4 (1h30).' },
      { name: 'Boiling Lake', location: 'Dominica', level: 'Very difficult', distance: '13 km', elevation: '+600 m', duration: '6–8 h', yacht: true, vip: 'Certified forest guide, VIP porters, private thermal bath en route, Creole lunch in the forest, on-board massage after return.', access: 'Portsmouth or Roseau. Private 4x4 30 min to Titou Gorge.' },
      { name: 'Petit Piton Summit', location: 'St Lucia', level: 'Difficult', distance: '8 km', elevation: '+743 m', duration: '4–6 h', yacht: true, vip: 'Sunrise ascent, professional photographer, gourmet breakfast at the summit, optional rappel descent, volcanic spa at Sulphur Springs.', access: 'Direct anchorage in Soufrière Bay. Tender 5 min.' },
      { name: 'El Yunque', location: 'Puerto Rico', level: 'Moderate', distance: '8 km', elevation: '+350 m', duration: '3–5 h', yacht: false, vip: 'Pre-dawn private access, US Forest Service naturalist, private swim under La Mina Falls, helicopter return along east coast.', access: 'Fajardo marina. Private SUV 35 min to park.' },
      { name: 'Mount Scenery', location: 'Saba', level: 'Moderate', distance: '5 km', elevation: '+877 m', duration: '3–4 h', yacht: false, vip: 'Charter flight Sint Maarten → Saba (12 min), private botanist guide, cloud forest picnic, Saba Marine Park dive on return.', access: 'Charter flight from Sint Maarten (12 min).' },
      { name: 'Montagne Pelée', location: 'Martinique', level: 'Difficult', distance: '14 km', elevation: '+1,397 m', duration: '6–8 h', yacht: true, vip: 'Expert volcanologist, helicopter to trailhead, inner crater access (off-trail), gastronomic lunch in Saint-Pierre ruins.', access: 'Saint-Pierre anchorage. Private 4x4 30 min.' },
      { name: 'The Quill', location: 'Sint Eustatius', level: 'Moderate', distance: '6 km', elevation: '+600 m', duration: '3–4 h', yacht: false, vip: 'Private hike + historic museum, Creole lunch in a colonial house, wreck diving in Oranjestad Bay.', access: 'Charter flight from Sint Maarten (15 min).' },
      { name: 'Waitukubuli Trail §7', location: 'Dominica', level: 'Difficult', distance: '12 km', elevation: '+800 m', duration: '5–7 h', yacht: true, vip: '2 days at Jungle Bay Resort eco-lodge, dawn parrot watching, certified Waitukubuli guide, tropical massage at dusk.', access: 'Prince Rupert Bay or Roseau. Private 4x4 45 min.' },
      { name: 'Grand Etang & Seven Sisters Falls', location: 'Grenada', level: 'Moderate', distance: '10 km', elevation: '+450 m', duration: '4–6 h', yacht: true, vip: 'Naturalist guide, fresh cacao tasting, swim in natural pools, lunch at Belmont Estate, rum tasting at River Antoine Distillery.', access: "St George's Harbour or Grand Anse. Private 4x4 30 min." },
      { name: 'Nevis Peak', location: 'Nevis', level: 'Difficult', distance: '10 km', elevation: '+985 m', duration: '5–7 h', yacht: true, isNew: true, vip: "Private mountain guide, champagne at cloud-shrouded summit, plantation lunch at Montpelier Estate, tender pickup from Pinney's Beach.", access: 'Charlestown anchorage. Tender to pier + 4x4 20 min.' },
      { name: 'Soufrière Hills Exclusion Zone', location: 'Montserrat', level: 'Moderate', distance: '6 km', elevation: '+300 m', duration: '3–4 h', yacht: true, isNew: true, vip: 'Volcanologist escort into the exclusion zone, helicopter overflight of the active dome, Plymouth ruins visit, rum punch on return.', access: 'Little Bay anchorage. Helicopter from yacht deck (10 min).' },
      { name: 'Morne Trois Pitons', location: 'Dominica', level: 'Difficult', distance: '14 km', elevation: '+1,342 m', duration: '7–9 h', yacht: true, isNew: true, vip: 'UNESCO World Heritage hike, private guide, boiling springs en route, secluded waterfall swim, helicopter extraction at dusk.', access: 'Roseau anchorage. Private 4x4 40 min to Laudat.' },
      { name: 'Pic Paradis', location: 'St Martin', level: 'Moderate', distance: '8 km', elevation: '+424 m', duration: '3–4 h', yacht: true, isNew: true, vip: 'Dawn ornithologist guide, hummingbird spotting, French-Creole gourmet brunch at a hillside villa, champagne at the viewpoint.', access: 'Marigot or Simpson Bay. Private car 25 min.' },
      { name: 'Mount Obama (Boggy Peak)', location: 'Antigua', level: 'Moderate', distance: '7 km', elevation: '+402 m', duration: '3–4 h', yacht: true, isNew: true, vip: 'Views of 365 beaches, post-hike sailing tour of the south coast, sundowners at English Harbour on a vintage sloop.', access: 'Falmouth or English Harbour. Private vehicle 30 min.' },
      { name: 'Gros Morne (Signal Hill)', location: 'St Vincent', level: 'Difficult', distance: '12 km', elevation: '+1,234 m', duration: '6–8 h', yacht: true, isNew: true, vip: 'Rare St Vincent parrot encounter at dawn, gourmet Vincentian ridge picnic, tender pickup on the leeward coast.', access: 'Kingstown anchorage. Private 4x4 45 min to Vermont Trails.' },
      { name: 'Soufrière Volcano', location: 'St Vincent', level: 'Difficult', distance: '13 km', elevation: '+1,234 m', duration: '6–8 h', yacht: true, isNew: true, vip: 'Specialist volcanologist, pre-dawn departure for crater sunrise, helicopter overflight of caldera lake, spa on the yacht.', access: 'Georgetown anchorage or helicopter from yacht deck.' },
      { name: 'Mount Hillaby Ridge', location: 'Barbados', level: 'Moderate', distance: '9 km', elevation: '+340 m', duration: '3–5 h', yacht: true, isNew: true, vip: 'Heritage guide through the Scotland District, colonial chattel house visit, fine dining at The Cliff restaurant at sunset.', access: 'Bridgetown or Carlisle Bay. Private car 35 min.' },
      { name: 'El Toro Peak', location: 'Puerto Rico (SW)', level: 'Difficult', distance: '14 km', elevation: '+1,075 m', duration: '6–7 h', yacht: false, isNew: true, vip: 'Helicopter to trailhead, USFWS ranger escort to the restricted summit, flyover return along the karst coast.', access: 'San Juan marina. Helicopter to trailhead (25 min).' },
      { name: 'Blue Mountains – Cuna Cuna Pass', location: 'Jamaica (east)', level: 'Difficult', distance: '18 km', elevation: '+1,800 m', duration: '8–10 h', yacht: true, isNew: true, vip: 'Wilderness traverse with a Maroon cultural guide, overnight at private off-grid mountain lodge, coffee ceremony at dawn, helicopter return.', access: 'Port Antonio anchorage. Private 4x4 1h to Rio Grande Valley.' },
    ],
  },
  {
    key: 'cycling',
    title: 'Cycling',
    subtitle: 'Routes & rides',
    placeholder: true,
    items: [
      { name: 'Blue Mountain Descent' },
      { name: 'North Coast Coastal Ride' },
      { name: 'Negril — Seven Mile' },
      { name: 'Cockpit Country Gravel' },
      { name: 'Port Antonio Hills' },
      { name: 'Kingston — St. Thomas Loop' },
    ],
  },
];

export const SECTION_META = {
  monuments: { eyebrow: 'Caribbean · Private Client Guide', title: 'Historic Monuments' },
  hiking: { eyebrow: 'Caribbean · Private Client Guide', title: 'Hiking' },
  cycling: { eyebrow: 'Caribbean · Private Client Guide', title: 'Cycling' },
};
