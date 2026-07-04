import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Historic Sites — Jamaica | Qualityacht',
  description:
    "A private client guide to ten of Jamaica's sites of historic consequence, from the sunken city of Port Royal to untouched Georgian great houses, with exclusive access arranged at each.",
};

const sites = [
  {
    n: '01.',
    name: 'Port Royal — 17th-Century Archaeological Site',
    meta: '17th century · Yacht access · UNESCO 2025',
    desc: 'For four decades, Port Royal was the most important English city in the Western Hemisphere and the dominant commercial hub of the Caribbean — known as "the wickedest city on earth" for its pirates, privateers, and buccaneers. On June 7, 1692, a catastrophic earthquake swallowed two-thirds of the city beneath the harbor, creating the only submerged urban site in the Americas. The result is an extraordinarily preserved snapshot of 17th-century colonial life: six forts, streets, residences, churches, and administrative buildings visible both above ground and on the seabed. Inscribed as a UNESCO World Heritage Site in July 2025.',
    experience:
      'Pre-opening exclusive access with the lead archaeologist of the Jamaica National Heritage Trust (JNHT), guided dive on the 17th-century underwater ruins, candlelit dinner within the ramparts of Fort Charles with a historical reenactment performed by costumed actors.',
  },
  {
    n: '02.',
    name: 'Fort Charles and the Maritime Museum, Port Royal',
    meta: '1655–1660 · Yacht access',
    desc: "Fort Charles is the best-preserved colonial military building in Jamaica and one of the oldest in the Caribbean. Built in the shape of a ship, its brick walls — up to six feet thick, fired in England and shipped across the Atlantic — once mounted 104 cannons and housed a garrison of 500 men. The young Horatio Nelson commanded the fort's defenses in 1779; his quarterdeck is now an emblematic landmark. The interior Maritime Museum displays 17th-century artifacts recovered from the seabed, including objects from everyday life at Port Royal before the earthquake. The only surviving fort of the six that once defended Port Royal.",
    experience:
      "Exclusive torchlit evening visit with full battlements illuminated, a historian-narrated reenactment of the 1692 earthquake, and a gourmet dinner served on Nelson's quarterdeck overlooking Kingston Harbour.",
  },
  {
    n: '03.',
    name: 'Spanish Town — Former Capital and Emancipation Square',
    meta: '1534–1872 · Inland — transfer required',
    desc: "Spanish Town contains one of the finest Georgian squares in the world — Emancipation Square — enclosed by a cohesive set of 18th-century civic buildings: the Former King's House (1762), the Georgian Courthouse, the Cathedral of St. Jago de la Vega (founded 1525, rebuilt 1714), and the Archaeological Museum housed in the former governor's residence. Beneath the square, Spanish tunnels run from the colonial era — remnants of the Spanish resistance to the British conquest of 1655. Jamaica's capital for over 300 years and a contender for UNESCO inscription, Spanish Town is described as the oldest continuously inhabited city in the Western Hemisphere.",
    experience:
      "Pre-opening private access to the Spanish underground tunnels with a JNHT archaeologist, exclusive after-hours tour of the Archaeological Museum, gala dinner in the courtyard of the Former King's House with a live traditional Jamaican music concert.",
  },
  {
    n: '04.',
    name: "Rose Hall Great House — The White Witch's Estate",
    meta: '1770s · Yacht access',
    desc: 'Rose Hall is Jamaica\'s most celebrated colonial great house, set on a hill above the Caribbean Sea amid a working sugar plantation. Built in the Georgian style in the 1770s — three wings, twelve rooms — it is forever linked to the legend of Annie Palmer, the "White Witch," said to have murdered three husbands. Fully restored with period furnishings and artifacts, it stands as an exceptional example of Caribbean plantation architecture at its apex, 15 kilometers east of Montego Bay.',
    experience:
      'Exclusive pre-dawn opening with access to the private apartments normally sealed to the public, guided tour by a Georgian-era specialist historian in period costume, candlelit dinner on the grand terrace overlooking the sea with a menu inspired by 18th-century colonial cuisine.',
  },
  {
    n: '05.',
    name: 'Greenwood Great House — The Intact Barrett Treasure',
    meta: '1780–1800 · Yacht access',
    desc: 'Greenwood is considered the best-preserved great house in Jamaica, having survived the 1831 slave uprisings that devastated Rose Hall and dozens of other estates entirely intact — furnishings, decor, and all. The two-story stone and timber house retains its original Georgian furniture, a remarkable library of 2,000 antique volumes, and a collection of rare 18th-century instruments — a harp, a fortepiano, a court clarinet — alongside original Barrett family portraits. The 360-degree panorama over the north coast and the Jamaican interior is breathtaking. The Barrett family: Richard Barrett was cousin to the poet Elizabeth Barrett Browning.',
    experience:
      'Private evening visit with the current owners, access to rooms not open to the public, a recital of period music performed on the original instruments by a specialist musicologist, cocktails on the veranda as the Caribbean lights up at sunset.',
  },
  {
    n: '06.',
    name: 'Falmouth — Historic Georgian Town of Trelawny',
    meta: '1769–1840s · Yacht access',
    desc: "Falmouth is an open-air museum, preserving the most complete and coherent Georgian townscape in the entire Caribbean: a grid of streets, 18th-century brick and timber buildings, the Albert George Market (1798), the Courthouse (1815), the William Knibb Memorial Baptist Church (1837, directly tied to the abolition of slavery), and Water Square — home to an 1798 reservoir that was the first running-water system in the Americas, predating New York's. The town embodies the full arc of Jamaican sugar wealth, its skyline of steeples and colonial facades intact above the harbor.",
    experience:
      "Private evening architectural tour with the World Monuments Fund's Georgian heritage specialist, candlelit dinner in one of the restored private historic houses, exclusive access to the interior of the William Knibb Museum and the original archives of the Jamaican abolition movement.",
  },
  {
    n: '07.',
    name: 'Seville Heritage Park (Sevilla la Nueva) — Birthplace of Modern Jamaica',
    meta: '650 AD–19th century · Yacht access',
    desc: "Seville Heritage Park is considered the birthplace of modern Jamaica: across 300 acres of St. Ann coastline, four civilizations overlap in a single landscape — the Taino village of Maima where Columbus landed in 1494, the first European city in Jamaica (Sevilla la Nueva, 1509), the first sugar mill in the Americas, and the British sugar plantation of the 17th through 19th centuries. The estate preserves the Spanish Governor's castle, the island's first stone church (Peter Martyr, 16th century), reconstructed slave villages, a monumental waterwheel, and 16th-century Spanish craftsmen's workshops. On the UNESCO tentative list since 2009.",
    experience:
      'Private archaeological tour with the JNHT operations director and a Taino specialist archaeologist, exclusive access to active excavation zones closed to the public, sunset horseback ride across all 300 acres with a gourmet picnic facing the Caribbean Sea.',
  },
  {
    n: '08.',
    name: "Devon House — Mansion of Jamaica's First Black Millionaire",
    meta: '1881 · Kingston — transfer required',
    desc: "Devon House is Kingston's architectural jewel and the defining monument of Victorian Jamaica. This Caribbean-Georgian manor, set on 11 landscaped acres at the heart of the capital, was built by George Stiebel — son of a German Jewish merchant and a Jamaican domestic worker — who became the island's first man of color to achieve millionaire status, through Venezuelan gold mining. The interior preserves an exceptional collection of 19th-century Jamaican, English, and French antiques, an original English crystal chandelier, a grand ballroom, and nine sumptuously furnished state rooms. Queen Elizabeth II and Prince Philip visited in 1982.",
    experience:
      'Exclusive gala dinner in the grand ballroom, closed to the public for the occasion, with Victorian-era decor, a menu created by a celebrated Jamaican chef, a chamber music recital on the original fortepiano, and a private tour by the estate historian.',
  },
  {
    n: '09.',
    name: 'Good Hope Great House and Plantation — Heart of Rural Jamaica',
    meta: '1755 · Yacht access',
    desc: "Good Hope is one of the most spectacular and best-preserved plantation estates in Jamaica, set in the hills of Trelawny on the edge of the Cockpit Country at 1,600 feet above the Queen of Spain's Valley. The 1755 Georgian great house, surrounded by 2,000 acres of tropical landscape, retains its original furniture and stables. The estate also preserves the ruins of the sugar works and slave quarters, and commands extraordinary views over the surrounding mountains. It was made famous by John Tharp, who assembled his vast fortune here during the era of slavery, at one point controlling 84,000 acres and more than 2,000 enslaved people — the richest sugar planter in the Caribbean.",
    experience:
      'Arrival on horseback across the plantation grounds, private guided tour of the great house with a Trelawny historian, a "planter style" gourmet luncheon in the formal dining room with produce from the estate, private swimming in the Martha Brae River.',
  },
  {
    n: '10.',
    name: "Errol Flynn Marina and Port Antonio — Jamaica's Hidden Jewel",
    meta: '19th–20th century · Superyacht marina',
    desc: "Port Antonio, on Jamaica's northeastern coast, is considered one of the most beautiful natural harbors in the Caribbean — sheltered between twin bays enclosed by mountains that drop directly into the Atlantic. The Errol Flynn Marina is the only facility in the Caribbean capable of accommodating the world's largest yacht (up to 606 feet, 32-foot draft). The Titchfield Peninsula Historic District preserves some of the finest Victorian and colonial architecture in Jamaica: the DeMontevin Lodge (1880), Christ Church (1840), and the ruins of 18th-century Fort George. Errol Flynn, Greta Garbo, and Ian Fleming all made Port Antonio their own.",
    experience:
      "Personalized VIP welcome at the marina, private architectural tour of the Titchfield Peninsula Historic District with a Victorian specialist guide, gourmet lunch at Norma's at the Marina, private tender excursion to the Blue Lagoon against the backdrop of the Blue Mountains.",
  },
];

export default function HistoricSitesCaribbeanPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* MASTHEAD */}
      <div className="bg-[#1b223d] border-b border-[#B87333]/30 px-6 md:px-14 pt-28 md:pt-32 pb-10">
        <div className="w-7 h-px bg-[#B87333] mb-5" />
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
          Caribbean · Private Client Guide
        </p>
        <h1 className="trajan-regular text-3xl md:text-5xl text-[#C0C0C0] leading-tight mb-2">
          Historic Sites
        </h1>
        <p className="text-[13px] text-[#8b90a0]">
          Jamaica — Ten Sites of Historic Consequence
        </p>
      </div>

      {/* INTRO */}
      <div className="bg-[#26272a] px-6 md:px-14 py-12 md:py-16">
        <p className="max-w-3xl mx-auto text-center text-[15px] md:text-[16px] italic leading-relaxed text-[#acb0cd]">
          From the sunken streets of the Caribbean&apos;s most notorious city to
          untouched Georgian plantation houses — a private route through
          Jamaica&apos;s heritage, with exclusive access arranged at each.
        </p>
      </div>

      {/* CONTENT — cloud background */}
      <div
        className="px-6 md:px-14 py-14 md:py-20"
        style={{
          backgroundImage: "url('/images/nuagesAncien.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundColor: '#2e2f32',
        }}
      >
        <div className="max-w-4xl mx-auto space-y-10">
          {sites.map((site) => (
            <article
              key={site.n}
              className="bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-2xl p-5 md:p-7 flex flex-col"
            >
              <h2 className="trajan-regular text-xl md:text-2xl text-[#C0C0C0] leading-snug">
                <span className="text-[#c2622a] mr-2">{site.n}</span>
                {site.name}
              </h2>

              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#B87333] font-medium">
                {site.meta}
              </p>

              <p className="mt-4 text-[#acb0cd] text-[13px] md:text-[14px] leading-relaxed">
                {site.desc}
              </p>

              <div className="mt-5 border-l-2 border-[#B87333]/50 bg-[#26272a]/60 pl-4 py-3 rounded-r">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#B87333] font-semibold mb-1.5">
                  Private Experience
                </p>
                <p className="italic text-[#acb0cd] text-[13px] leading-relaxed">
                  {site.experience}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CLOSING NOTE BAND */}
      <div className="bg-[#1b223d] border-t border-white/10 px-6 md:px-14 py-5">
        <p className="text-[11px] text-[#7a8094] max-w-4xl mx-auto leading-relaxed">
          All VIP experiences are arranged on request through your concierge.
          Site access, after-hours permissions, and private dining require
          advance coordination of 2–8 weeks depending on site and season. Inland
          sites require private ground transfer from Kingston or Montego Bay.
        </p>
      </div>
    </div>
  );
}
