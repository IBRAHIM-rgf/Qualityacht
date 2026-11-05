// ══ Journal Qualityacht (client 2026-11-05) ══
// Articles du blog /journal : sujets generaux de yachting, sans halal ni religion
// (decision client 2026-11-05). Textes rediges par Claude, valides par le client avant
// publication. Un paragraphe = un tableau de segments : texte simple, { b } (gras),
// { text, href } (lien).

export const ARTICLES = [
  {
    slug: 'yacht-charter-etiquette',
    date: '2026-11-05',
    title: 'Yacht Charter Etiquette: What First-Time Guests Should Know',
    seoTitle: 'Yacht Charter Etiquette: What First-Time Guests Should Know | Qualityacht',
    description:
      'Shoes off, soft luggage, crew areas, gratuity: the unwritten rules of a crewed yacht charter, explained by an independent broker.',
    excerpt:
      'Shoes off, soft luggage, crew areas and gratuity: the unwritten rules of a crewed yacht charter, explained by an independent broker.',
    kicker: 'Charter Guide',
    hero: '/media/journal/yacht-charter-etiquette-hero.jpg',
    heroAlt: 'Shaded deck with a dining table set on a private yacht',
    intro: [
      ['A crewed yacht is a private home, a working vessel and a five-star hotel at the same time. Most of its rules are never written down, yet every captain and crew member expects guests to know them.'],
      ['None of them are complicated. They exist for three reasons: safety, the care of the yacht, and the comfort of everyone on board. Here is what first-time guests should know before they step aboard.'],
    ],
    sections: [
      {
        title: 'Before You Board',
        paragraphs: [
          [{ b: 'Fill in your preference sheet.' }, ' A few weeks before the charter, your broker will send a preference sheet: allergies, favorite dishes, drinks, daily rhythm, activities. The more detail you give, the more the crew can prepare in advance. The chef provisions from it, and the captain plans the itinerary around it.'],
          [{ b: 'Pack soft luggage.' }, ' Storage on board is designed around soft bags that can be folded away. Hard suitcases are difficult to store, even on large yachts. Bring a soft duffel, or plan to send hard cases back with your driver.'],
          [{ b: 'Share your plans early.' }, ' A birthday, a special dinner, a day you would like to spend ashore: tell your broker before the charter. The crew can prepare much more when they know in advance than when they learn on the day.'],
        ],
      },
      {
        title: 'On Board',
        paragraphs: [
          [{ b: 'Shoes off.' }, ' Teak decks are delicate and easily marked. Most yachts are barefoot on deck, and the crew will store your shoes on arrival. Some yachts provide deck shoes or slippers for the interior.'],
          [{ b: 'Crew areas are their home.' }, ' The galley, the bridge and the crew quarters are working spaces. Guests are welcome there by invitation, and a visit to the bridge with the captain is often a highlight of the week. Simply ask first.'],
          [{ b: 'The captain has the final word on safety.' }, ' You decide the plan; the captain decides how and when to carry it out safely. If the wind shifts or the sea builds, an anchorage may change. A good captain always explains why and offers an alternative.'],
          [{ b: 'Water toys come out when the anchorage is safe.' }, " Jet skis, paddleboards and tenders are launched once the yacht is settled and the crew has checked the area. Guests use them under the crew's supervision."],
        ],
      },
      {
        title: 'At Anchor and Ashore',
        paragraphs: [
          [{ b: 'Respect the anchorage.' }, ' Sound carries far over calm water. Other yachts and nearby homes share the bay, so music stays at a reasonable level, especially in the evening.'],
          [{ b: 'Be on time for the tender.' }, ' When the crew drops you ashore, they agree on a pickup time. Being punctual matters: the tender may be needed for other guests, and the crew plans the day around it.'],
          [{ b: 'Dress for the destination.' }, ' Swimwear is for the yacht and the beach. In town, in restaurants and in marinas, a light layer is expected in most destinations.'],
        ],
      },
      {
        title: 'Working with the Crew',
        paragraphs: [
          [{ b: 'One point of contact.' }, ' On most yachts, the captain and the chief stewardess coordinate everything. Requests go to them, and they share them with the rest of the crew. It keeps the week running smoothly.'],
          [{ b: 'Discretion goes both ways.' }, " A professional crew is discreet about everything it sees and hears on board. In return, guests respect the crew's rest periods and private areas."],
        ],
      },
      {
        title: 'At the End of the Charter',
        paragraphs: [
          [
            { b: 'Gratuity comes at the end.' },
            ' It is customary to leave a gratuity for the crew on the last day, usually handed to the captain, who shares it with the whole team. The amount is at your discretion and is not included in the charter fee. Your broker can advise on what is usual for the yacht and the region. Our guide to ',
            { text: 'charter costs', href: '/charter-costs-explained' },
            ' explains how it fits into the overall budget.',
          ],
        ],
      },
    ],
    faq: [
      { q: 'Do I have to leave a gratuity?', a: 'It is not mandatory, but it is customary in the yacht charter industry when the service has met your expectations. Your broker can tell you what is usual.' },
      { q: 'Can I wear shoes on board?', a: 'On deck, most yachts ask guests to go barefoot to protect the teak. Some yachts provide soft-soled shoes for the interior.' },
      { q: 'Are children welcome on a crewed yacht?', a: 'Most crewed yachts welcome children. Mention their ages on the preference sheet so the crew can prepare safety equipment and activities.' },
      { q: 'Can we change the itinerary during the week?', a: 'Yes, within reason. The captain adapts the plan to your wishes, the weather and the distances involved.' },
      { q: 'How far in advance should we fill in the preference sheet?', a: 'Ideally a few weeks before the charter, so the chef and the captain have time to prepare.' },
    ],
    conclusion: {
      title: 'Plan Your First Charter with Confidence',
      paragraphs: [
        ['Yacht charter etiquette is simple: respect the yacht, trust the captain, and let the crew prepare. The rest is time on the water.'],
        [
          'As an independent broker based in Zurich, Qualityacht prepares every charter with you before you board, from the preference sheet to the last day. ',
          { text: 'Request a quote', href: '/request-quote' },
          ' or contact us at ',
          { text: 'info@qualityacht.ch', href: 'mailto:info@qualityacht.ch', external: true },
          '.',
        ],
      ],
    },
  },
];

export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug);

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[m - 1]} ${d}, ${y}`;
}
