// ══ Journal Qualityacht (client 2026-11-05) ══
// Articles du blog /journal. Textes rediges par Claude, valides par le client avant
// publication. Un paragraphe = un tableau de segments : texte simple, { b } (gras),
// { text, href } (lien).

export const ARTICLES = [
  {
    slug: 'what-is-a-halal-yacht-charter',
    date: '2026-11-05',
    title: 'What Is a Halal Yacht Charter? A Practical Definition',
    seoTitle: 'What Is a Halal Yacht Charter? A Practical Definition | Qualityacht',
    description:
      'A halal yacht charter is more than a yacht without alcohol. Here are the seven decisions behind it, where it works best, and when to book.',
    excerpt:
      'A halal yacht charter is more than a yacht without alcohol. The seven decisions behind it, where it works best, and when to book for the 2027 season.',
    kicker: 'Halal Yacht Charter',
    hero: '/media/journal/halal-yacht-charter-hero.jpg',
    heroAlt: 'Private yacht cruising in open water',
    intro: [
      [
        'Ask most charter brokers what a halal yacht charter is, and you will hear the same answer: "a yacht without alcohol." It is a start, but it is not a definition. Families who have tried it know the difference between a yacht where the bar was simply emptied and a week that was actually planned around their values.',
      ],
      [
        'Muslim travel is one of the fastest-growing segments in tourism. Mastercard and CrescentRating ',
        {
          text: 'estimate international Muslim arrivals at 196 million in 2025, projected to reach 262 million by 2030',
          href: 'https://www.tradearabia.com/News/464735/Global-Muslim-travel-to-reach-208m-arrivals-in-2026-report',
          external: true,
        },
        '. Yet the yacht charter industry has prepared very little for these guests. Few brokers can explain, in detail, what a halal charter requires.',
      ],
      ['This article sets out a practical definition, the decisions it involves, where it works best, and when to book.'],
    ],
    sections: [
      {
        title: 'A Definition That Goes Beyond "No Alcohol"',
        paragraphs: [
          [
            'A ',
            { text: 'halal yacht charter', href: '/halal-yacht-charter' },
            ' is a private crewed charter prepared so that a family can spend the entire week on board without compromise on food, drinks, conduct or privacy.',
          ],
          [
            'In practice, that means every element of the week has been checked before the guests board: the crew, the galley, the provisioning, the layout of the yacht, the daily rhythm on board, the itinerary, and the commitments made by the captain. None of these happens by default. Each one is a decision someone has to make, and confirm, in advance.',
          ],
          ['There is no official halal certification for yachts. What exists is preparation, and a broker who knows which questions to ask.'],
        ],
      },
      {
        title: 'The Seven Decisions Behind a Halal Charter',
        paragraphs: [
          [{ b: '1. Crew briefing.' }, " The captain and crew are briefed before the charter: an alcohol-free week, including the crew's own areas, and discreet conduct around the family. The crew also knows when guest areas are theirs and when they should step away."],
          [{ b: '2. Galley reset.' }, ' Before the guests board, the galley is reset: no pork, no alcohol-based ingredients, and no cross-contamination from previous charters. The chef walks the family through the galley on arrival if they wish.'],
          [{ b: '3. Halal provisioning.' }, ' Meat is sourced from halal suppliers, with documentation available on request. Provisioning is arranged before departure, so the family never depends on what happens to be available in a small port.'],
          [{ b: '4. Privacy layout.' }, ' Not every yacht suits a family that values privacy. An enclosed sundeck, a swim platform facing open water, crew quarters away from guest areas and a tender for private shore visits make a real difference. This is a selection criterion, not a detail.'],
          [{ b: '5. A calm daily rhythm.' }, " Meal times, quiet hours and moments of rest are agreed with the captain in advance, so the week follows the family's pace rather than the yacht's routine."],
          [{ b: '6. Destination and itinerary.' }, " Anchorages are chosen with the family's needs in mind: halal food within reach ashore, calm bays away from the crowds, and destinations that welcome families."],
          [{ b: '7. Confirmation.' }, ' Every point above is confirmed with the captain before the family commits. A halal charter built on verbal assurances is a risk; one built on confirmed details is a plan.'],
          ['Together, these seven decisions are what separates a halal charter from a regular charter with the minibar removed.'],
        ],
      },
      {
        title: 'Where Halal Charters Work Best',
        paragraphs: [
          ['Some destinations make a halal charter easy; others make it possible with good planning.'],
          [{ b: 'Turkey (Bodrum, Göcek, Fethiye).' }, ' The most natural choice in the Mediterranean. Halal is the norm ashore, and the coastline offers pine-lined coves and calm water, with short hops between anchorages.'],
          [{ b: 'Croatia and Greece.' }, ' Beautiful, private and well suited to families, but halal provisioning must be arranged ahead rather than sourced on the way. With a well-prepared galley and a carefully chosen itinerary, both work very well.'],
          [{ b: 'The Red Sea and the Maldives.' }, ' Halal is the default in these regions, and the water does the rest. Both are strong options outside the Mediterranean summer season.'],
          [{ b: 'The UAE and Oman.' }, ' For winter, the Gulf offers warm water, quiet anchorages and a halal environment throughout, from the Musandam fjords to the Omani coast.'],
        ],
      },
      {
        title: 'When to Book: The Early Season',
        paragraphs: [
          ['For a Mediterranean charter, late May and June are close to ideal: the water is warming, anchorages are quieter than in July and August, and families can enjoy the coast before the summer peak.'],
          ['The best yachts for early-season weeks are often committed months in advance. Families planning a charter for late spring usually decide between December and February, which leaves time to prepare every detail with the captain.'],
        ],
      },
      {
        title: 'Why an Independent Broker Matters',
        paragraphs: [
          ['A broker who owns or represents a yacht has a reason to recommend it, whether or not it suits your family. An independent broker does not.'],
          ["At Qualityacht, we don't own a single yacht. We choose among the entire market, ask the captain the questions that matter for a halal charter, and only propose yachts whose setup has been confirmed. If a yacht is not right for your family, we say so and look for another one."],
        ],
      },
    ],
    faq: [
      { q: 'Is a halal yacht charter more expensive than a regular charter?', a: "The yacht costs the same. What changes is the preparation: briefing the crew, resetting the galley, sourcing halal provisions and selecting the right itinerary. That work is part of the broker's role." },
      { q: 'Will the crew really respect an alcohol-free week?', a: 'Professional crews are used to adapting to their guests. The key is to brief them before the charter and to have the captain confirm the setup before you commit.' },
      { q: 'When should we book an early-season charter?', a: 'Ideally between December and February for late May or June. The best yachts are committed early, and it leaves time to confirm every detail with the captain.' },
      { q: 'Which destinations are easiest for a first halal charter?', a: 'Turkey is the simplest in the Mediterranean, since halal is the norm ashore. For winter, the UAE, Oman, the Red Sea and the Maldives are strong options.' },
      { q: 'Is there a halal certification for yachts?', a: 'No official certification exists. What matters is preparation: confirmed details on the crew, the galley, the provisioning and privacy.' },
    ],
    conclusion: {
      title: 'Plan Your Halal Charter',
      paragraphs: [
        ['A halal yacht charter is not a yacht without alcohol. It is seven decisions made before you board, and each one deserves to be confirmed in advance.'],
        [
          'If you are planning a charter for 2027, our ',
          { text: 'Tailored Halal Private Charter', href: '/halal-yacht-charter' },
          ' service starts with a short brief: your dates, your guests, your preferred region and what matters most to your family. We come back within a few days with three yachts that fit.',
        ],
        [
          { text: 'Contact us', href: '/contact' },
          ' on WhatsApp or at ',
          { text: 'info@qualityacht.ch', href: 'mailto:info@qualityacht.ch', external: true },
          ", or ask for our 12-question checklist to compare any broker's answers with ours.",
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
