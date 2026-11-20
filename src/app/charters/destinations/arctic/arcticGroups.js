// Cases « Arctic » (client 2026-11-19) : 14 regions dans l'ordre du client ; chaque case
// ouvre /charters/destinations/arctic/<slug> (page de region, sans bateaux pour l'instant).
// Module sans 'use client' : partage avec les pages serveur.

// Photo provisoire (image Arctic deja sur le site) en attendant les photos du client.
export const ARCTIC_CARD_PHOTO = '/images/destinations/cards/arctic-card.webp';

// Photos client (2026-11-20) : photoFiltered = floue au repos, photo = reelle au survol.
const C = '/media/client/2026-11-20/arctic-cards';
const ph = (slug) => ({ photo: `${C}/${slug}.webp`, photoFiltered: `${C}/${slug}-filtered.webp` });
const C2 = '/media/client/2026-11-20/arctic-cards-2';
const ph2 = (slug) => ({ photo: `${C2}/${slug}.webp`, photoFiltered: `${C2}/${slug}-filtered.webp` });

// Les 7 cases affichees (client 2026-11-20), dans l'ordre de la grille :
// ligne 1 = Svalbard, Canadian Arctic (rectangle), Northern Norway ;
// ligne 2 = Northwest Passage, Greenland, Iceland, North Atlantic Extensions.
export const ARCTIC_CARD_SLUGS = ['svalbard', 'canadian-arctic', 'northern-norway', 'northwest-passage', 'greenland', 'iceland', 'north-atlantic-extensions'];

// 2e grille (client 2026-11-20), a la suite : ligne 1 = 4 carres ; ligne 2 = carre,
// rectangle (Canada), carre. label = nom affiche sur la photo (texte du client).
export const ARCTIC_CARDS_2 = [
  { slug: 'alaska', label: 'Alaska Yacht Charter Confirmed', ...ph2('alaska') },
  { slug: 'russian-arctic', label: 'Russian Arctic Special Enquiry', ...ph2('russian-arctic') },
  { slug: 'jan-mayen', label: 'Jan Mayen', ...ph2('jan-mayen') },
  { slug: 'north-atlantic-extensions', label: 'North Atlantic Extensions', ...ph2('north-atlantic-extensions') },
  { slug: 'arctic-canada', label: 'Arctic Canada Expedition Only', ...ph2('arctic-canada') },
  { slug: 'canada', label: 'Canada — Yacht Charter Confirmed', ...ph2('canada') },
  { slug: 'pacific-northwest-alaska-corridor', label: 'Pacific Northwest–Alaska Corridor', ...ph2('pacific-northwest-alaska-corridor') },
];

export const ARCTIC_GROUPS = [
  { name: 'Greenland', slug: 'greenland', ...ph('greenland'), places: ['West Greenland — Disko Bay & Ilulissat', 'East Greenland — Scoresby Sund', 'Northwest Greenland'] },
  { name: 'Svalbard', slug: 'svalbard', ...ph('svalbard'), places: ['Longyearbyen', 'Spitsbergen', 'Svalbard Archipelago'] },
  { name: 'Northern Norway', slug: 'northern-norway', ...ph('northern-norway'), places: ['Tromsø', 'Northern Norway Fjords', 'Norwegian Arctic Coast'] },
  { name: 'Canadian Arctic', slug: 'canadian-arctic', ...ph('canadian-arctic'), places: ['Baffin Island', 'Pond Inlet', 'Baffin Bay', 'Devon Island', 'Dundas Harbour', 'Beechey Island', 'Resolute', 'Cambridge Bay', 'Amundsen Gulf'] },
  { name: 'Northwest Passage', slug: 'northwest-passage', ...ph('northwest-passage'), places: ['Eastern Northwest Passage', 'Pond Inlet – Cambridge Bay', 'Full Northwest Passage'] },
  { name: 'Arctic Alaska', slug: 'arctic-alaska', places: ['Nome — Gateway', 'Bering Strait', 'Chukchi Sea', 'Alaska North Coast', 'Beaufort Sea'] },
  { name: 'Iceland', slug: 'iceland', ...ph('iceland'), places: ['Reykjavík', 'Westfjords', 'North Iceland', 'Snæfellsnes', 'Iceland Circumnavigation'] },
  { name: 'Jan Mayen', slug: 'jan-mayen', ...ph2('jan-mayen'), places: ['Jan Mayen Island'] },
  { name: 'North Atlantic Extensions', slug: 'north-atlantic-extensions', ...ph('north-atlantic-extensions'), places: ['Faroe Islands', 'Shetland Islands', 'Labrador & Torngat Mountains'] },
  { name: 'Russian Arctic — Special Enquiry', slug: 'russian-arctic', ...ph2('russian-arctic'), places: ['Franz Josef Land', 'Bell Island', 'Cape Flora', 'Hall Island & Cape Tegetthoff', 'Northeast Passage'] },
  { name: 'Alaska — Yacht Charter Confirmed', slug: 'alaska', ...ph2('alaska'), places: ['Juneau', 'Glacier Bay', 'Tracy Arm', 'Endicott Arm', 'Inside Passage', 'Admiralty Island', 'Frederick Sound', 'Icy Strait', 'Sitka', 'Petersburg', 'Ketchikan', 'Prince William Sound', 'Kenai Peninsula', 'Misty Fjords'] },
  { name: 'Canada — Yacht Charter Confirmed', slug: 'canada', ...ph2('canada'), places: ['British Columbia’s Inside Passage', 'Desolation Sound', 'Great Bear Rainforest', 'Haida Gwaii', 'Vancouver Island', 'Gulf Islands', 'Broughton Archipelago', 'Johnstone Strait', 'Princess Louisa Inlet', 'Clayoquot Sound', 'Barkley Sound', 'Queen Charlotte Strait', 'Discovery Islands'] },
  { name: 'Arctic Canada — Expedition Only', slug: 'arctic-canada', ...ph2('arctic-canada'), places: ['Northwest Passage, Canada', 'Baffin Island, Nunavut', 'Iqaluit', 'Pond Inlet', 'Clyde River', 'Resolute', 'Cambridge Bay', 'Sirmilik National Park', 'Torngat Mountains National Park', 'Hudson Bay', 'Churchill', 'Nunavik', 'Labrador Coast'] },
  { name: 'Pacific Northwest–Alaska Corridor', slug: 'pacific-northwest-alaska-corridor', ...ph2('pacific-northwest-alaska-corridor'), places: ['British Columbia’s Inside Passage to Southeast Alaska', 'Vancouver–Juneau–Ketchikan route'] },
];
