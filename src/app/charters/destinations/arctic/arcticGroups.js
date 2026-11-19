// Cases « Arctic » (client 2026-11-19) : 14 regions dans l'ordre du client ; chaque case
// ouvre /charters/destinations/arctic/<slug> (page de region, sans bateaux pour l'instant).
// Module sans 'use client' : partage avec les pages serveur.

// Photo provisoire (image Arctic deja sur le site) en attendant les photos du client.
export const ARCTIC_CARD_PHOTO = '/images/destinations/cards/arctic-card.webp';

export const ARCTIC_GROUPS = [
  { name: 'Greenland', slug: 'greenland', places: ['West Greenland — Disko Bay & Ilulissat', 'East Greenland — Scoresby Sund', 'Northwest Greenland'] },
  { name: 'Svalbard', slug: 'svalbard', places: ['Longyearbyen', 'Spitsbergen', 'Svalbard Archipelago'] },
  { name: 'Northern Norway', slug: 'northern-norway', places: ['Tromsø', 'Northern Norway Fjords', 'Norwegian Arctic Coast'] },
  { name: 'Canadian Arctic', slug: 'canadian-arctic', places: ['Baffin Island', 'Pond Inlet', 'Baffin Bay', 'Devon Island', 'Dundas Harbour', 'Beechey Island', 'Resolute', 'Cambridge Bay', 'Amundsen Gulf'] },
  { name: 'Northwest Passage', slug: 'northwest-passage', places: ['Eastern Northwest Passage', 'Pond Inlet – Cambridge Bay', 'Full Northwest Passage'] },
  { name: 'Arctic Alaska', slug: 'arctic-alaska', places: ['Nome — Gateway', 'Bering Strait', 'Chukchi Sea', 'Alaska North Coast', 'Beaufort Sea'] },
  { name: 'Iceland', slug: 'iceland', places: ['Reykjavík', 'Westfjords', 'North Iceland', 'Snæfellsnes', 'Iceland Circumnavigation'] },
  { name: 'Jan Mayen', slug: 'jan-mayen', places: ['Jan Mayen Island'] },
  { name: 'North Atlantic Extensions', slug: 'north-atlantic-extensions', places: ['Faroe Islands', 'Shetland Islands', 'Labrador & Torngat Mountains'] },
  { name: 'Russian Arctic — Special Enquiry', slug: 'russian-arctic', places: ['Franz Josef Land', 'Bell Island', 'Cape Flora', 'Hall Island & Cape Tegetthoff', 'Northeast Passage'] },
  { name: 'Alaska — Yacht Charter Confirmed', slug: 'alaska', places: ['Juneau', 'Glacier Bay', 'Tracy Arm', 'Endicott Arm', 'Inside Passage', 'Admiralty Island', 'Frederick Sound', 'Icy Strait', 'Sitka', 'Petersburg', 'Ketchikan', 'Prince William Sound', 'Kenai Peninsula', 'Misty Fjords'] },
  { name: 'Canada — Yacht Charter Confirmed', slug: 'canada', places: ['British Columbia’s Inside Passage', 'Desolation Sound', 'Great Bear Rainforest', 'Haida Gwaii', 'Vancouver Island', 'Gulf Islands', 'Broughton Archipelago', 'Johnstone Strait', 'Princess Louisa Inlet', 'Clayoquot Sound', 'Barkley Sound', 'Queen Charlotte Strait', 'Discovery Islands'] },
  { name: 'Arctic Canada — Expedition Only', slug: 'arctic-canada', places: ['Northwest Passage, Canada', 'Baffin Island, Nunavut', 'Iqaluit', 'Pond Inlet', 'Clyde River', 'Resolute', 'Cambridge Bay', 'Sirmilik National Park', 'Torngat Mountains National Park', 'Hudson Bay', 'Churchill', 'Nunavik', 'Labrador Coast'] },
  { name: 'Pacific Northwest–Alaska Corridor', slug: 'pacific-northwest-alaska-corridor', places: ['British Columbia’s Inside Passage to Southeast Alaska', 'Vancouver–Juneau–Ketchikan route'] },
];
