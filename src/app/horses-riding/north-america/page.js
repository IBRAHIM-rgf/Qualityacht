// /horses-riding/north-america — Horses & Riding America 2027 (client 2026-10-23), calquee sur
// /horses-riding/bahamas : hero photo + titre, stats, Seasonal Circuits (20 sous-regions, fichier
// « America_Horses_Riding_20_Regions_Complete »), puis regions -> sous-regions avec Riding /
// Family / Shows (fichier « America_Horses_Riding_Family_Shows_20_Regions »). Deux niveaux :
// 4 regions (East Coast US, West Coast US, Canada, Mexico) contenant les 20 sous-regions.
// Demande client : les lignes « Shows » sans spectacle verifie (« No ... show verified ») sont
// retirees ; seules les lignes Shows positives (YES / option) sont affichees.
// Fin de page : sections de /charters/destinations/north-america (cases, regions, fleurs, CTA).
import Image from 'next/image';
import { CircuitCard, RegionGroupCard } from '../caribbean-v2/HorsesCards';
import { media } from '@/lib/quality-media';
import NorthAmericaRegionCards from '../../charters/destinations/north-america/NorthAmericaRegionCards';
import NorthAmericaRegions from '../../charters/destinations/north-america/NorthAmericaRegions';
import NorthAmericaCta from '../../charters/destinations/north-america/NorthAmericaCta';
import BahamasPopularDestinations from '../../charters/destinations/bahamas/BahamasPopularDestinations';

export const metadata = {
  title: 'Horses & Riding 2027 — North America Private Guide | Qualityacht',
  description: 'A private client guide to riding across the United States, Canada and Mexico in 2027: seasonal circuits and private riding experiences, region by region.',
};

// Photo provisoire (mediatheque du site) en attendant celle du client.
const HERO = '/media/quality/horses/robglenister-horse-4475581_1920.jpg';

const stats = [
  { value: '20', label: 'Regions covered' },
  { value: '20', label: 'Private riding experiences' },
  { value: '20', label: 'Seasonal circuits' },
];

// [nom, mois, depart → arrivee, etapes, texte] — fichier « Horses & Riding · Seasonal Circuits ».
const circuits = [
  ['Seabrook Island Beach & Trails', 'Mar–May / Sep–Nov', 'Charleston yacht base → Seabrook Island', '1 riding stop', 'Ride with Seabrook Island Equestrian Center on a guided trail or an operator-approved beach outing. Select the format for the guests’ ability and the tide, with road transfers from the Charleston area.'],
  ['Wellington Sport & Saddle', 'Jan–Apr', 'Palm Beach yacht base → Wellington / Loxahatchee', '2 venues', 'Combine a scheduled spectator session at Wellington International with a separately arranged lesson or morning ride at Casperey Stables. Travel between the show venue and riding center by private vehicle.'],
  ['Myakka Countryside Ride', 'Nov–Apr', 'Sarasota yacht base → Myakka City', '1 riding stop', 'A guided horseback outing on the private countryside trails of Myakka River Trail Rides. Leave the Gulf Coast by road for a rural riding experience, then return to the yacht after the session.'],
  ['Cudjoe Key Riding Session', 'Nov–Apr', 'Lower Keys yacht base → Cudjoe Key', '1 lesson stop', 'Arrange an English riding lesson at Southernmost Riding Club, tailored to the rider’s experience and the instructor’s assessment. This is a stable-based equestrian session, not a beach trail or an inter-island horseback circuit.'],
  ['Jekyll Island Forest & Beach', 'Mar–May / Sep–Nov', 'Golden Isles yacht base → Jekyll Island', '1 riding stop', 'Join Golden Isles Carriage and Trail / Three Oaks Farm for a guided ride through maritime forest and onto an authorized beach section. A private format may be requested where the operator offers it.'],
  ['New York Parkland Riding', 'May–Oct', 'New York yacht base → Pelham Bay Park, Bronx', '1 riding stop', 'A guided trail ride or a separately selected lesson with City Island Stables in Pelham Bay Park. Reach the equestrian center by road from the yacht and return after the reserved riding session.'],
  ['Rhode Island Polo & Trails', 'Jun–Sep', 'Portsmouth → Goddard State Park, Warwick', '2 venues', 'Pair a scheduled Newport International Polo Series match with a separately arranged ride at C and L Stables in Goddard State Park. The two experiences are connected by road, not by a continuous horseback trail.'],
  ['Half Moon Bay Coastal Ride', 'May–Oct', 'San Francisco Bay yacht base → Half Moon Bay', '1 riding stop', 'Ride with Sea Horse Ranch on a guided route using the Coastal Equestrian Trail and an authorized Poplar Beach section. A Pacific Coast shore excursion reached by road from the San Francisco Bay area.'],
  ['Cascade Foothills Trail Ride', 'Jun–Sep', 'Seattle yacht base → operator-confirmed trailhead', '1 riding stop', 'A guided horseback outing with Equine Escapes in the Cascade foothills. Choose the available Maple Valley / Hobart or Eatonville location with the operator, then arrange road transfers from the Seattle area.'],
  ['Vancouver Island Forest Ride', 'Jun–Sep', 'Victoria-area yacht base → Alpine Stables', '1 riding stop', 'A guided outing with Alpine Stables introduces Vancouver Island forest scenery and, on the selected route, ocean or valley views. Road transfers connect the yacht base with the operator’s confirmed meeting point.'],
  ['Toronto & Oakville Trail Escape', 'May–Oct', 'Toronto / western Lake Ontario → Oakville', '1 riding stop', 'A guided western trail ride at The Ranch in Oakville, using the operator’s countryside routes. Request its advertised private-ride format where appropriate, with road transport from a Toronto or western Lake Ontario yacht base.'],
  ['Mont-Saint-Hilaire Woodland Ride', 'May–Oct', 'Montreal yacht base → Saint-Jean-Baptiste', '1 riding stop', 'Ride wooded trails at the foot of Mont-Saint-Hilaire with Centre d’équitation Nouvelle-France. A guided outing in the Montérégie countryside, reached by road from Montreal and adjusted to the group’s riding level.'],
  ['Stanley Countryside Trail Ride', 'Jun–Sep', 'Halifax-area yacht base → Stanley, Hants County', '1 riding stop', 'A guided countryside outing with Evangeline Trail Rides, reached by a planned inland road transfer. Request a private format in advance where available, then return to the Halifax-area yacht base after the ride.'],
  ['Loreto Desert & Arroyo Ride', 'Nov–May', 'Loreto yacht base → confirmed desert trailhead', '1 riding stop', 'Join Wild Loreto Tours for a guided desert ride with views toward the Sierra de la Giganta and the Sea of Cortez. The outing follows local desert routes, with a riding introduction before departure.'],
  ['Los Cabos Beach & Canyon', 'Nov–May', 'Los Cabos yacht base → Cuadra San Francisco', '1 riding center', 'Select a beach or canyon outing with Cuadra San Francisco, with the format matched to the guests and available conditions. If both experiences are requested, reserve separate sessions with road transfers to the stable.'],
  ['Riviera Maya Jungle Riding', 'Dec–Apr', 'Cancun / Riviera Maya yacht base → Rancho Bonanza', '1 riding stop', 'A guided horseback experience at Rancho Bonanza through a jungle setting. Arrange the ranch’s current itinerary in advance; any cenote visit is a separate element of the selected product, not part of the horseback route itself.'],
  ['Holbox Island Riding', 'Dec–Apr', 'Holbox shore landing → Los Potrillos', '1 riding stop', 'Arrange a guided island ride with Los Potrillos through the operator’s approved paths. Any shoreline section depends on current permissions and conditions; shore transport and timing are coordinated locally with the captain.'],
  ['Sierra Madre Ranch Circuit', 'Nov–May', 'Puerto Vallarta yacht base → Las Palmas', '1 riding stop', 'A guided rainforest ride with Rancho Capomo, reached by road from Puerto Vallarta. The selected outing may combine riding with a walk toward a waterfall; confirm the exact balance of saddle time and walking before booking.'],
  ['Careyes Polo & Coastal Riding', 'Nov–Apr', 'Costalegre yacht base → Careyes Polo Club', '1 equestrian venue', 'Request a guided trail ride or a riding lesson through Careyes Polo Club. The operator describes shoreline and hill routes; a scheduled polo match can be considered separately when the club’s calendar allows.'],
  ['Manialtepec Ranch & River Ride', 'Nov–Apr', 'Puerto Escondido shore base → San Jose Manialtepec', '1 riding stop', 'A guided outing with Eco Adventures Puerto Escondido follows the countryside near San José Manialtepec. Select an operator-approved horseback itinerary; river crossings and any hot-spring visit depend on current conditions and the chosen product.'],
].map(([name, dates, route, stopsLabel, detail]) => ({ name, dates, route, stopsLabel, detail }));

// Regions -> sous-regions — fichier « Horses & Riding · Riding · Family · Shows ».
// [nom de la sous-region (lieu), saison, [[etiquette, texte], ...]]
const REGION_DATA = [
  ['East Coast United States', 'east-coast-united-states', [
    ['Carolinas (Charleston · Seabrook Island)', 'Mar–May / Sep–Nov', [
      ['Riding', 'Seabrook Island Equestrian Center: guided inland trails and selected beach rides, with the format matched to ability and tides.'],
      ['Family', 'Pony rides are available for younger children. A local visitor guide lists beginner trails for ages 8+ and pony rides through age 7; reconfirm these age limits with the center.'],
    ]],
    ['Florida — East Coast (Palm Beach · Wellington)', 'Nov–Apr', [
      ['Riding', 'Casperey Stables in Loxahatchee: lessons and an advertised morning riding option, booked separately from the competition venue.'],
      ['Family', 'Children’s riding and camp programs are advertised at Casperey. Wellington International explicitly welcomes families; confirm the age and ability required for any riding session.'],
      ['Shows', 'YES — Wellington International hosts public spectator competitions and Saturday Night Lights. Choose dates from the published calendar; show admission is separate from riding.'],
    ]],
    ['Florida — West Coast (Sarasota · Myakka City)', 'Nov–Apr', [
      ['Riding', 'Myakka River Trail Rides: guided countryside riding on the operator’s private property, reached by road from Sarasota.'],
      ['Family', 'Family participation must be approved for the chosen ride. A current minimum riding age was not verified; supply each child’s age and experience before reserving.'],
      ['Shows', 'YES — nearby TerraNova Equestrian Center welcomes spectators on scheduled public show days. Children are welcome under supervision; this is a separate venue from the trail ride.'],
    ]],
    ['Florida Keys (Cudjoe Key)', 'Nov–Apr', [
      ['Riding', 'Southernmost Riding Club: English hunter/jumper lessons. This is an instructor-led stable session, not a verified beach trail.'],
      ['Family', 'The club advertises lessons for children and adults. Minimum age, visitor availability and whether family members can ride in the same session require direct confirmation.'],
    ]],
    ['Georgia (Jekyll Island · Golden Isles)', 'Mar–May / Sep–Nov', [
      ['Riding', 'Golden Isles Carriage and Trail: guided riding through maritime forest and onto an authorized beach section.'],
      ['Family', 'Horse-drawn carriage tours are a separate family alternative for non-riders. Confirm minimum age and restrictions for mounted rides; no numeric child age was verified.'],
    ]],
    ['Middle Atlantic (New York · Pelham Bay Park)', 'May–Oct', [
      ['Riding', 'City Island Stables in the Bronx: guided trails, English or Western lessons, and hand-led riding formats. Road transfers from a New York yacht base.'],
      ['Family', 'YES — lessons from age 5. Pony rides have an operator-stated 90 lb limit; confirm fit and the appropriate format. Trail-ride rules may differ from lesson rules.'],
    ]],
    ['New England (Newport · Warwick, Rhode Island)', 'Jun–Sep', [
      ['Riding', 'C and L Stables in Goddard State Park: guided trail riding. Choose an operator-approved route; beach options require separate checks.'],
      ['Family', 'Operator material advertises Goddard Park riding for ages 7+. Reconfirm the chosen product and experience requirements; a beach ride is not automatically suitable for beginners.'],
      ['Shows', 'YES — Newport International Polo Series in Portsmouth, on scheduled match days. Polo spectating is a separate activity, reached by road from Warwick or Newport.'],
    ]],
  ]],
  ['West Coast United States', 'west-coast-united-states', [
    ['California (Half Moon Bay · San Francisco Bay)', 'May–Oct', [
      ['Riding', 'Sea Horse Ranch: guided Coastal Equestrian Trail and Poplar Beach riding, reached by road from the San Francisco Bay area.'],
      ['Family', 'YES — the published 1.5-hour trail-and-beach ride accepts ages 7+. Check height, weight and health restrictions for each rider; younger children cannot be assumed eligible.'],
    ]],
    ['Pacific Northwest (Seattle · Cascade Foothills)', 'Jun–Sep', [
      ['Riding', 'Equine Escapes: guided countryside trail riding at the operator-confirmed location. Exact departure area and road transfer depend on the chosen outing.'],
      ['Family', 'Child eligibility must be confirmed directly. No reliable current minimum age was captured; do not label the outing suitable for toddlers or all ages.'],
    ]],
  ]],
  ['Canada', 'canada', [
    ['British Columbia (Vancouver Island · Langley Option)', 'Jun–Sep', [
      ['Riding', 'Alpine Stables on Vancouver Island: guided forest trail rides, plus separately booked riding lessons.'],
      ['Family', 'Lessons are advertised from age 10; youth lessons for ages 10–12 begin privately. Trail-ride age rules require separate confirmation.'],
      ['Shows', 'YES — Thunderbird Show Park in Langley welcomes families at its main spectator events. This is on the mainland, not beside Victoria; plan a separate mainland call or a properly timed crossing.'],
    ]],
    ['Ontario (Toronto · Oakville)', 'May–Oct / Nov shows', [
      ['Riding', 'The Ranch in Oakville: guided Western trail rides, with private formats offered separately. Road transfers from Toronto or western Lake Ontario.'],
      ['Family', 'Children’s lessons are published for ages 10+. Confirm trail-ride eligibility separately; lesson minimum ages are not automatically a trail-ride policy.'],
      ['Shows', 'YES — the Royal Horse Show in Toronto takes place in November, with competitions and entertainment. This falls outside the main summer yacht season and needs a separate calendar plan.'],
    ]],
    ['Quebec (Montreal · Mont-Saint-Hilaire)', 'May–Oct', [
      ['Riding', 'Centre d’équitation Nouvelle-France: guided woodland rides near Mont-Saint-Hilaire, reached by road from Montreal.'],
      ['Family', 'YES, with limits — age 10+ for the one-hour walking ride, published June–August; age 12+ for the two-hour walk/trot ride. No under-10 activity and no child sharing an adult’s horse.'],
      ['Shows', 'COMPETITION OPTION — Bromont Olympic Equestrian Park hosts scheduled equestrian events. Confirm visitor admission and the chosen event before offering tickets or a spectator day.'],
    ]],
    ['Nova Scotia (Halifax Region · Stanley)', 'Jun–Sep', [
      ['Riding', 'Evangeline Trail Rides in Stanley: guided countryside riding, reached by a planned inland road transfer from the Halifax area.'],
      ['Family', 'YES — operator states a minimum age of 9 on the riding date. Private rides need advance arrangements; reconfirm booking notice and each child’s suitability.'],
    ]],
  ]],
  ['Mexico', 'mexico', [
    ['Sea of Cortez (Loreto)', 'Nov–May', [
      ['Riding', 'Wild Loreto Tours: guided desert horseback riding with regional landscape views. The operator confirms the trailhead and route before departure.'],
      ['Family', 'Children’s pricing is advertised, but a current minimum age was not verified. Obtain written acceptance for each child; a child fare does not mean all ages can ride.'],
    ]],
    ['Baja California Sur (Los Cabos)', 'Nov–May', [
      ['Riding', 'Cuadra San Francisco: private trail rides matched to the group’s ability, with beach or canyon options subject to the current operator program.'],
      ['Family', 'YES — the operator advertises special horses for children age 4+. Final approval depends on the child and selected route; do not assume parent-and-child double riding.'],
    ]],
    ['Mexican Caribbean (Riviera Maya)', 'Dec–Apr', [
      ['Riding', 'Rancho Bonanza: a guided jungle ride. Cenote activities belong to the selected tour package and are not a horseback crossing or a guaranteed swim.'],
      ['Family', 'Family bookings are advertised for children age 8+ accompanied by an adult in tour listings. Reconfirm this limit, child capacity and rules directly with the Riviera Maya ranch.'],
    ]],
    ['Yucatan — North Coast (Holbox Island)', 'Dec–Apr', [
      ['Riding', 'Los Potrillos: locally arranged guided riding on approved island paths. Any shoreline section depends on permissions and conditions.'],
      ['Family', 'Family eligibility and minimum age are NOT verified. Confirm current operations, child-specific horses, helmets and route suitability before recommending to a family.'],
    ]],
    ['Pacific Mainland (Puerto Vallarta · Las Palmas)', 'Nov–May', [
      ['Riding', 'Rancho Capomo: guided mountain and forest riding, potentially combined with walking toward a waterfall according to the selected product.'],
      ['Family', 'Family participation needs direct approval. No current official minimum age was verified; older reseller age bands are not reliable enough to publish as an operator rule.'],
    ]],
    ['Costa Alegre (Careyes)', 'Nov–Apr', [
      ['Riding', 'Request a riding lesson or an approved trail ride through Careyes’ equestrian offering. Each activity requires advance confirmation.'],
      ['Family', 'Child riding eligibility is not verified. For a family visit, ask for an age-appropriate supervised format and confirm spectator access separately from riding.'],
      ['Shows', 'POLO OPTION — Careyes Polo Club is a verified venue. Request the current match calendar and visitor permission; a public performance on any given day is not guaranteed.'],
    ]],
    ['Oaxaca — Pacific Coast (Puerto Escondido · Manialtepec)', 'Nov–Apr', [
      ['Riding', 'Eco Adventures Puerto Escondido: guided countryside horseback riding near San José Manialtepec. Select a route appropriate to current river and weather conditions.'],
      ['Family', 'Family eligibility and a current minimum age are not verified. Multiple river crossings are not automatically suitable for children; require specific operator approval or choose another outing.'],
    ]],
  ]],
];

// Photos des cartes : photos de chevaux de la mediatheque (comme Bahamas).
const horsePhotos = media({ cat: 'horses', kind: 'image' }).map((m) => m.src);
const regions = REGION_DATA.map(([name, slug, subs], i) => ({
  name,
  photo: horsePhotos[i % horsePhotos.length],
  unit: ['subregion', 'subregions'],
  href: `/charters/destinations/north-america/${slug}`,
  islands: subs.map(([sname, season, lines]) => ({ name: sname, season, lines })),
}));

const NOTE_CIRCUITS = 'Months are indicative planning windows, not confirmed 2027 operating calendars. Reservations required. Stop counts refer to named riding venues; yacht bases and road transfers are not counted as riding stops.';
const NOTE_REGIONS = 'Published child-age rules apply to the stated product only. Reconfirm eligibility, availability and the current show calendar. Month badges are indicative.';

// Ronds fleurs : memes que /charters/destinations/north-america.
const F = '/media/client/2026-10-19/north-america-flowers';
const NA_FLOWERS = [
  { name: 'East Coast United States', slug: 'rose', rest: `${F}/rose-filtered.jpg`, hover: `${F}/rose-color.jpg` },
  { name: 'West Coast United States', slug: 'poppy', rest: `${F}/poppy-filtered.jpg`, hover: `${F}/poppy-color.jpg` },
  { name: 'Canada', slug: 'dogwood', rest: `${F}/dogwood-filtered.jpg`, hover: `${F}/dogwood-color.jpg` },
  { name: 'Miami', slug: 'orange-blossom', rest: `${F}/orange-blossom-filtered.jpg`, hover: `${F}/orange-blossom-color.jpg` },
  { name: 'Mexico', slug: 'dahlia', rest: `${F}/dahlia-filtered.jpg`, hover: `${F}/dahlia-color.jpg` },
];

export default function NorthAmericaHorsesRidingPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      <style>{`
        .hero-rise { opacity: 0; animation: heroRise 2.2s cubic-bezier(0.22,1,0.36,1) 0.15s forwards; }
        @keyframes heroRise { from { opacity: 0; transform: translateY(48px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* HERO — photo entiere (ratio naturel) + titre qui monte du bas, comme Bahamas */}
      <section className="pt-[70px]">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={encodeURI(HERO)} alt="Horses & Riding — North America" className="block w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-[#26272a]/45 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-4 md:pb-6">
            <div className="hero-rise flex flex-col items-center">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
                America 2027 · Private Client Guide
              </p>
              <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
                Horses &amp; Riding
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <div className="bg-[#26272a] px-6 md:px-14 py-5 md:py-6 border-b border-[#C0C0C0]/10">
        <div className="flex flex-wrap justify-center gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-1 bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-lg px-1.5 py-0.5">
              <span className="trajan-regular text-lg md:text-xl font-bold text-[#C0C0C0] leading-none">{s.value}</span>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.06em] text-[#8b90a0] leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SEASONAL CIRCUITS */}
      <section className="relative px-6 md:px-14 py-14 md:py-20 bg-[#26272a]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/nuagesAncien.png" alt="" fill className="object-cover opacity-55" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="trajan-regular text-lg md:text-2xl text-[#C0C0C0] whitespace-nowrap">Seasonal Circuits</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {circuits.map((c) => (
              <div key={c.name} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] max-w-md">
                <CircuitCard circuit={c} />
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl mx-auto text-center text-[11px] md:text-xs leading-relaxed text-[#acb0cd]/60">{NOTE_CIRCUITS}</p>
        </div>
      </section>

      {/* REGIONS -> SOUS-REGIONS */}
      <section className="relative px-6 md:px-14 py-14 md:py-20 bg-[#26272a]">
        <div
          className="absolute inset-0 z-0 opacity-55"
          style={{ backgroundImage: "url('/images/nuagesAncien.png')", backgroundSize: '100% auto', backgroundRepeat: 'repeat-y', backgroundPosition: 'top center' }}
        />
        <div className="absolute inset-0 z-0 bg-[#26272a]/20" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h2 className="trajan-regular text-lg md:text-2xl text-[#C0C0C0] whitespace-nowrap">Riding · Family · Shows</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto items-start">
            {regions.map((region) => (
              <RegionGroupCard key={region.name} region={region} />
            ))}
          </div>
          <p className="mt-8 max-w-3xl mx-auto text-center text-[11px] md:text-xs leading-relaxed text-[#acb0cd]/60">{NOTE_REGIONS}</p>
        </div>
      </section>

      {/* Sections North America (comme les sections Bahamas en bas de la page Bahamas). */}
      <NorthAmericaRegionCards />
      <NorthAmericaRegions />
      <BahamasPopularDestinations items={NA_FLOWERS} />
      <NorthAmericaCta />
    </div>
  );
}
