// Sites historiques des iles des Caraibes (documents client, 2026-10-09) : une entree
// par ile, affichee par le choix d'ile de /historic-sites/caribbean/monuments.
// Format identique aux sites de la Jamaique (data.js) : name, meta, desc, experience.
// Periode historique : dans meta si elle est courte, sinon a la fin de la description.

export const CARIBBEAN_HERITAGE_ISLANDS = [
  {
    "key": "anguilla",
    "name": "Anguilla",
    "items": [
      {
        "name": "Wallblake House",
        "meta": "Yacht access",
        "desc": "Wallblake House is the oldest standing residence in Anguilla, established by sugar planter Will Blake in 1787. The estate includes the main house, the original outdoor kitchens, the stables, and the workers' quarters, offering a unique window into colonial plantation life. It is the only intact plantation estate on the island, designated a national heritage site and open to the public by appointment. Built in 1787; Anguilla's only intact colonial plantation. Designated a national historic monument under the protection of the Catholic Church and the Anguilla National Trust. Restored in the 2000s.",
        "experience": "An exclusive private tour outside public hours with an accredited historian guide, a champagne welcome in the colonial courtyard, a personalized account of the Blake family history and the Anguillian resistance, followed by an outdoor gourmet lunch beneath the mango trees."
      },
      {
        "name": "The Fountain Cavern",
        "meta": "Yacht access",
        "desc": "The Fountain Cavern is an underground cave descending roughly 9 meters below the surface near Shoal Bay. It contains a permanent freshwater spring, 33 remarkable Amerindian petroglyphs — including a stalactite carved in the likeness of Jocahu, the supreme Taíno deity — and thousands of votive ceramic shards. It is the most intact Amerindian ceremonial site in the Eastern Caribbean, of exceptional archaeological and spiritual significance. Amerindian use beginning around A.D. 400, with peak occupation between A.D. 600 and 1200. Designated a protected national archaeological site and recognized as one of the best-preserved Amerindian ceremonial sites in the Eastern Caribbean. Visits have been suspended for several years for preservation purposes and are accessible only through the Anguilla National Trust.",
        "experience": "A private descent into the cavern with an archaeologist from the Anguilla Archaeological and Historical Society (AAHS), specialized lighting for viewing the petroglyphs, a briefing on recent research, and access to areas normally closed to the general public."
      },
      {
        "name": "Big Spring Heritage Site (Island Harbour Petroglyphs)",
        "meta": "Yacht access",
        "desc": "Big Spring is a large collapsed sinkhole roughly 40 meters in diameter at Island Harbour, home to more than 60 Amerindian petroglyphs — primarily anthropomorphic faces known as Spirit Eyes — carved into the limestone beside an underground freshwater spring. This sacred site, once used for ceremonies and for recording births and deaths, also served as a vital water source for local residents until the 1970s. It is Anguilla's second most important Amerindian site after the Fountain Cavern. Amerindian use during the Late Ceramic Age, A.D. 600–1500. Recognized as an archaeological site in 1988; opened to the public in 2003 with an elevated boardwalk and interpretive signage. Designated a protected national area since 2001.",
        "experience": "A private sunrise tour with an Anguilla National Trust guide and an AAHS archaeology expert, a detailed interpretation of the petroglyphs, followed by a private breakfast on the Island Harbour waterfront with panoramic views of the cays."
      },
      {
        "name": "Heritage Collection Museum (Colville Petty Museum)",
        "meta": "Yacht access",
        "desc": "A true museum of the Anguillian soul, the Heritage Collection brings together thousands of artifacts carefully assembled by its founder, Colville Petty: Arawak pottery over a thousand years old, objects from the era of slavery, tools and implements from a period of resourceful poverty, photographs from Queen Elizabeth II's 1994 royal visit, and pieces chronicling the famous 1967 Anguillian Revolution. Tours are led personally by Colville Petty, whose storytelling brings every object to life. Founded and opened in 1996 by Colville Petty, OBE, historian and archaeologist of Anguilla. The collection spans 4,000 years of history, from the Arawaks to the 1967–1969 Anguillian Revolution. Anguilla's only official museum. The oldest artifacts date to A.D. 800–1000. Located in East End Village.",
        "experience": "A private session with Colville Petty outside public hours, a personalized walk through the collections with previously unshared anecdotes, access to unexhibited photographic archives, and the option of lunch with the historian for an in-depth conversation on Anguillian identity."
      },
      {
        "name": "Road Salt Pond (Sandy Ground) — Amerindian and Colonial Salt Site",
        "meta": "Yacht access",
        "desc": "The Road Salt Pond in Sandy Ground was the cradle of Anguilla's historic economy. Already used by the Amerindians, British settlers made it the foundation of their survival from the 17th century onward, exporting salt to the fisheries of Holland, Canada, Guyana, and Trinidad. The dikes, channels, and extraction structures are partially preserved, and the site is today a remarkable bird-watching ecosystem set against a backdrop of deep collective memory. Used as a salt source from Amerindian times (before 1650) through the 1960s–70s. Peak commercial production in the 20th century: up to 71,000 barrels per year recorded in 1967. The salt industry collapsed in the 1980s. Designated a natural and historic heritage site by the Anguilla Archaeological and Historical Society (AAHS).",
        "experience": "A private sunrise tour with an AAHS guide and a salt-heritage expert, a historical re-enactment of salt-extraction techniques, bird-watching for flamingos and shorebirds from the restored dikes, followed by a private Creole brunch on the Sandy Ground beachfront."
      },
      {
        "name": "Warden's Place and the Old Courthouse (Historic The Valley)",
        "meta": "Yacht access",
        "desc": "Warden's Place is one of the few 18th-century colonial residences still standing in The Valley, bearing witness to the historic ties between Anguilla and Sint Maarten. The neighboring Old Courthouse is Anguilla's oldest government building (circa 1750) and is slated to reopen as a national museum and archive center. Together, the two buildings form the heart of the historic Coronation Avenue district atop Crocus Hill, with panoramic views over the bay. Warden's Place was built in the 1700s by a Dutch family from Sint Maarten, with a cotton and sugar plantation extending to Crocus Bay; it later became the residence of the magistrate and chief of police. The Old Courthouse was built around 1750 — the only original government building still standing in Anguilla. Restoration is underway to establish it as a national archives museum.",
        "experience": "A private architectural tour with a local historian, access to the Old Courthouse archives currently under restoration, an account of Anguilla's political history from the Dutch period to independence, and a sunset cocktail on the Crocus Hill terrace with 360-degree views."
      },
      {
        "name": "Ebeneezer Methodist Church and Cemetery (Crocus Hill)",
        "meta": "Yacht access",
        "desc": "Built in 1830 atop Crocus Hill in The Valley, Ebeneezer Methodist Church is Anguilla's oldest church still in active use. Its white facade in the British colonial style overlooks the sea and the town, surrounded by a cemetery whose headstones tell the story of the island's founding families. It embodies the Methodist faith that served as the social and moral pillar of post-emancipation Anguillian society, and stands as a living link to the island's colonial and religious history. Built in 1830; Anguilla's oldest church still in use. Designated a national historic monument. The cemetery holds the headstones of Anguilla's founding families dating back to the 18th century.",
        "experience": "A private tour of the church and cemetery with the pastor and a historian, an account of Anguilla's founding families, a private gospel concert held inside the church, and panoramic sunset views over the sea from the cemetery grounds."
      },
      {
        "name": "Old Valley Well and the Historic Village of Old Valley",
        "meta": "Yacht access",
        "desc": "Located at the entrance to the old village of Old Valley, this monumental well — more than 20 meters deep and 1.5 meters wide, entirely hand-dug — dates back to the Amerindians and served as a vital water source for Anguilla's earliest colonial communities. Old Valley is one of the island's best-preserved historic villages, with several colonial buildings dating from the 17th to the 19th century, the former hospital, and the island's oldest house. It is an essential stop on the Anguilla Heritage Trail. The Old Valley well dates to the Amerindian period (before 1650) and was in continuous use through the 20th century. Listed on the Anguilla Heritage Trail. Surrounding colonial structures date from the 17th–19th centuries.",
        "experience": "A privatized Heritage Trail circuit by luxury 4x4 with an accredited Anguilla National Trust guide, a stop at the historic well, an account of the earliest settlers, exploration of the surrounding colonial ruins, and an elaborate gourmet picnic inspired by Amerindian and Creole recipes."
      },
      {
        "name": "Katouche Cavern and the Arawak Stairs (Katouche Bay)",
        "meta": "Yacht access",
        "desc": "Katouche Cavern is a coastal cave reached via a forest trail descending toward the stunning Katouche Bay on Anguilla's north coast. The path passes a historic well and a limestone staircase carved into the rock — the 'Arawak Stairs' — testifying to the island's Amerindian presence. The cave overlooks a wild, exceptionally beautiful beach nestled at the foot of the cliffs, accessible only on foot or by sea. The natural cave and the so-called 'Arawak Stairs' are associated with Amerindian occupation (A.D. 600–1500). A 19th-century well marks the trailhead. Listed as a natural-historic site by the AAHS and the Anguilla National Trust.",
        "experience": "Arrival by tender or RIB directly onto the pristine beach of Katouche Bay, a private gourmet picnic on the sand with champagne, a guided exploration of the cave and the Arawak Stairs with an Anguilla National Trust expert, and exclusive swimming in the secluded cove."
      },
      {
        "name": "East End Salt Pond and the Historic Village of East End",
        "meta": "Yacht access",
        "desc": "The East End Salt Pond is a large natural salt pond bordering East End Village, Anguilla's oldest Afro-Caribbean village, whose community of fishermen and free farmers formed following the 1834 emancipation. The village retains numerous traditional colonial houses, ancestral fishing boats, and the living memory of Anguillian identity. The Heritage Collection Museum (site No. 4) sits directly across from the pond, making this area the crossroads of the island's historic and natural heritage. Salt extraction dates from the Amerindian and colonial eras. The Heritage Collection Museum has stood across from the pond since the 2000s. East End Village is one of Anguilla's oldest villages, settled by free Afro-Caribbean people after emancipation (1834). Listed as a heritage site and protected ecosystem.",
        "experience": "A private East End circuit combining a visit to the Heritage Collection Museum with Colville Petty, a heritage walk through the historic fishing village with a local guide, an introduction to ancestral Anguillian fishing techniques, and a sunset lobster dinner on a local fisherman's terrace."
      }
    ]
  },
  {
    "key": "aruba",
    "name": "Aruba",
    "items": [
      {
        "name": "Fort Zoutman & Willem III Tower",
        "meta": "1796–1868 · Yacht access",
        "desc": "Built between 1796 and 1798 by order of the Dutch Military Committee, Fort Zoutman is Aruba's oldest surviving building. Originally armed with four cannons to defend Paardenbaai Bay against pirates and enemy fleets, it was named in honor of Rear Admiral Johan Arnold Zoutman. The Willem III Tower, added in 1868 at the request of Lieutenant Governor Ferguson, served simultaneously as a lighthouse, public clock, and police post. Restored between 1974 and 1980, the complex has housed the Aruba Historical Museum since 1983, an exceptional testament to Dutch military architecture in the Caribbean.",
        "experience": "A private tour outside opening hours with exclusive access to the museum's archives and collections not on public display, led by an expert in Dutch colonial history alongside a curator. A privatized candlelit evening in the fort's courtyard with live traditional Aruban music (steelpan and tumba) and local rum cocktails. Access to original 18th-century historical documents."
      },
      {
        "name": "California Lighthouse",
        "meta": "1910–1916 · No yacht access",
        "desc": "Erected on the island's northwestern tip between 1910 and 1916, the California Lighthouse takes its name from the steamship SS California, which sank off these rocky shores in 1891. Built of local limestone quarried on site, it was constructed to prevent further shipwrecks along this particularly dangerous coastline. Standing 30 meters tall, it offers a panoramic view over the entire north coast and the Caribbean Sea. Transferred to the Stichting Monumentenfonds Aruba in 2015, it is now a designated national monument and symbolizes the Dutch authorities' efforts to secure Aruban waters.",
        "experience": "A private climb to the top of the lighthouse with access to the lantern room (normally closed to visitors), briefed by the Monuments Foundation's heritage architect. A privatized sunset on the terrace with champagne and canapés service. Optional gourmet dinner arranged at the foot of the lighthouse under the stars, overlooking the illuminated shipwrecks along the coast."
      },
      {
        "name": "Bushiribana Gold Mill Ruins",
        "meta": "1824–1882 · No yacht access",
        "desc": "Gold was discovered in Aruba in 1824 and mined until 1882; the Bushiribana mill, built in 1874 by an English mining company on the north coast, was designed to process ore extracted from the surrounding hills. Assembled by hand by local masons using primitive wooden cranes, the building displays a unique industrial architecture that stands in stark contrast to the desert landscape. The thick limestone walls, partially eroded by sea spray, still bear witness to the intense mining activity that briefly enriched the island before the veins ran dry.",
        "experience": "A private evening archaeological tour with a historian specializing in Caribbean mining history. Access to unmarked areas reserved for VIP guests. Cocktails served amid the ruins, lit by lanterns. Option to combine with a visit to Arikok National Park for an exclusive 'gold and nature' day."
      },
      {
        "name": "Balashi Gold Mill Ruins and Spanish Lagoon",
        "meta": "1879–1916 · Yacht access",
        "desc": "The Balashi mill, built in 1879 and operational until 1916, represents the second pillar of Aruba's gold-mining industry; it processed ore extracted from the hills around Frenchman's Pass. Its remains, now part of Arikok National Park, stand at the edge of the mudflats and mangrove forests of Spanish Lagoon, a wetland of historic significance frequented by Amerindian fishermen as early as 1000 B.C. Charcoal deposits dating to 1000 B.C. have been discovered in the lagoon's sediment layers, evidence of continuous pre-Columbian occupation.",
        "experience": "A private birdwatching and archaeological expedition by dugout canoe through the lagoon with an expert naturalist guide, followed by a tour of the ruins with a historian. A gourmet lunch atop the promontory overlooking the mudflats and the ruins. An illustrated geological briefing on the island's mining and pre-Columbian history."
      },
      {
        "name": "Alto Vista Chapel",
        "meta": "18th century (1750) · No yacht access",
        "desc": "Built in 1750 on a hill overlooking Aruba's northeast coast, Alto Vista Chapel is the island's first Roman Catholic church, erected on the gathering site of a community of indigenous Catholics who had assembled there to pray since the early 18th century. Its winding access road is lined with the fourteen Stations of the Cross, making the annual pilgrimage one of the region's oldest religious traditions. This place of prayer and remembrance, repainted in white and yellow, is one of the few surviving colonial religious buildings in the Dutch Caribbean.",
        "experience": "A private Mass in Papiamento celebrated by a local priest for the group, followed by an exclusive Stations of the Cross procession at sunset. A personalized blessing and access to the island's oldest parish archives. A tasting of traditional local dishes ('pan bati,' 'keshi yena') served outdoors overlooking the north coast."
      },
      {
        "name": "Ayo Rock Formations and Arawak Petroglyphs",
        "meta": "No yacht access",
        "desc": "The Ayo site, with its massive diorite boulders rising from Aruba's central desert, was a sacred place for the Arawak (Caquetío) Amerindians, who left rock carvings (petroglyphs) and paintings of great archaeological value here. These boulders, considered a geological anomaly, are believed to have formed during an exceptional tectonic event; their sacred nature for prehistoric peoples is confirmed by the concentration of anthropomorphic and zoomorphic figures carved into the rock faces. The site is protected by the Aruba National Parks Foundation and ranks among the most important archaeological sites in the Dutch Caribbean. Pre-Columbian — roughly 11th–15th century.",
        "experience": "An exclusive sunrise archaeological tour with Aruba University's lead archaeologist, with access to areas closed to the general public. A demonstration of Arawak petroglyph-reading techniques with personalized photographic documentation. A gourmet lunch served on the rocks overlooking the desert and the formations."
      },
      {
        "name": "Fontein Cave and Arawak Rock Art",
        "meta": "Yacht access",
        "desc": "Located in Arikok National Park on the windward coast, Fontein Cave holds one of the best-preserved collections of Arawak rock paintings in the Caribbean, consisting of red-ochre figures depicting gods, spirits, and ritual scenes. The cave takes its name from a freshwater spring that flows within it, making it a vital gathering point for the island's prehistoric peoples. Its size allows for exploration on foot, and its paintings, sheltered by the rock walls, have survived for centuries with little alteration. The site is also home to numerous fruit bats, an ecological element inseparable from the cave's identity. Pre-Columbian — roughly 11th–15th century.",
        "experience": "A torchlit visit at dawn with a specialist in Caribbean rock art, before the site opens to the public. Soft artificial lighting to reveal the paintings' details. The option to create high-quality tracings or artistic impressions as a keepsake. A private lunch arranged at the cave entrance overlooking the park."
      },
      {
        "name": "Savaneta — First Dutch Colonial Village",
        "meta": "17th–19th century · Yacht access",
        "desc": "Savaneta is Aruba's first permanent Dutch settlement, founded in the 17th century; for two centuries it served as the island's principal administrative and military center before Oranjestad took over that role. Its ruined colonial houses built of local limestone (cunucu houses), former warehouses, and remnants of colonial infrastructure offer a rare architectural record of the earliest decades of Dutch presence in the Caribbean. Savaneta's lagoon, used for fishing since antiquity, was also the anchoring point for the earliest Dutch and Spanish vessels.",
        "experience": "A private daytime excursion through the village with a local historian-guide specializing in colonial architecture, visiting still-inhabited cunucu houses and recent excavation sites. A traditional Aruban fishermen's lunch served in a private space by the lagoon. A rigid-hull tender transfer from the yacht for a VIP arrival by sea."
      },
      {
        "name": "Hato Aloe Plantation — Aruba Aloe Museum and Factory",
        "meta": "1840–1920 (industrial peak) · No yacht access",
        "desc": "Introduced to Aruba in 1840 by Dutch Governor Van Raders, aloe vera transformed the island's economy so profoundly that two-thirds of the territory was covered in plantations at its peak around 1920, earning Aruba the nickname 'Aloe Island.' The Hato plantation, founded in 1890 by Cornelis Eman under the name Aruba Aloe Balm NV, became the world's largest exporter of aloe resin (aloin) for the European and American pharmaceutical industries. The aloin content of Aruban plants (22%) was half again as high as that of any other producer in the world, giving the island an exceptional competitive edge. The site now includes a museum with authentic historical tools and a specialized library.",
        "experience": "A private tour of the factory and aloe fields outside opening hours, accompanied by Royal Aruba Aloe's heritage director, with a historical demonstration of the traditional copper-cauldron cooking process. A private high-end aloe cosmetics workshop. Personalized gifts: a limited-edition product set monogrammed with the client's initials."
      },
      {
        "name": "Oranjestad Protestant Church and the Colonial Architecture of the Historic Center",
        "meta": "1846 (19th-century colonial) · Yacht access",
        "desc": "Built in 1846, Oranjestad's Protestant Church on Wilhelminastraat is the oldest original house of worship still standing in Aruba, with its traditional wooden shutters, square Dutch-style bell tower, Delft-tile artwork in the portico, and pews, organ, and chandeliers imported from Holland. It forms part of a remarkably well-preserved Dutch colonial complex in Oranjestad's historic center, with its colorful houses, 19th-century warehouses, and waterfront. This district is one of the best-preserved Dutch colonial centers anywhere in the Caribbean.",
        "experience": "A private tour with the pastor of the historic Protestant congregation, with access to parish archives and period documents. A European baroque music concert (on the historic organ) arranged exclusively for the group. A gala dinner in the colonial community hall with sommelier service and a private chef specializing in Dutch-Caribbean fusion cuisine."
      }
    ]
  },
  {
    "key": "bonaire",
    "name": "Bonaire",
    "items": [
      {
        "name": "Fort Oranje",
        "meta": "1639 (rebuilt 1816) · Yacht access",
        "desc": "Built in 1639 by the Dutch West India Company (WIC), Fort Oranje is Bonaire's oldest masonry structure and one of only ten forts in the world named for the Dutch royal House of Orange. Its four-meter-thick local limestone walls still house four British cannons dating from the English occupation (1804–1816), which were the only ones never fired in war, used only for honorary salutes. Rebuilt in 1816 upon the Dutch return following the Treaty of Paris, it served until 1837 as the official residence of Bonaire's commander before becoming, in turn, a prison, a fire station, and a police post.",
        "experience": "An exclusive nighttime tour in the presence of Bonaire's official historian, with access to the fort's colonial archives. A reenacted cannon-salute ceremony at sunset for the group. A privatized candlelit gala dinner in the fort's historic courtyard overlooking Kralendijk harbor and Klein Bonaire, with premium catering."
      },
      {
        "name": "Slave Huts and Salt Pans of Witte Pan & Rode Pan",
        "meta": "1850 (broader context 1636–1863) · Yacht access",
        "desc": "Built in 1850 by the Dutch West India Company beside the Pekelmeer in southern Bonaire, these tiny coral huts (barely 90 cm high) represent one of the world's rare fully preserved examples of slave housing. The enslaved workers who labored in the salt pans walked 14 hours a day from Rincon to the pans, prompting the construction of the huts to keep them on site. This tragic heritage, paired with obelisks painted red, white, blue, and orange in 1837 to guide loading ships, stands as a unique architectural record of the colonial economy and the condition of enslavement in the Dutch Caribbean.",
        "experience": "An exclusive historiographical tour with a descendant of enslaved Bonaireans and an academic specializing in the history of Dutch Caribbean slavery. A private commemorative ceremony at the huts, with the presentation of an exclusive illustrated publication on the salt pans' history. A sunset in the presence of flamingos, with champagne service on the beach. Dinner back aboard the yacht or at a premium restaurant in Kralendijk."
      },
      {
        "name": "Boca Onima Petroglyphs",
        "meta": "No yacht access",
        "desc": "On Bonaire's wild north coast, the Boca Onima rock paintings form the island's most iconic pre-Columbian archaeological site. Created in the 15th century by the Caquetío Indians, an Arawak group who came from Venezuela, these red-ochre and black figures depict ritual scenes, deities, and cosmic symbols still undeciphered. Some researchers attribute the oldest layers to the Dabajuroid culture (3480–2325 B.C.). The limestone cliff, facing the Atlantic, was likely a ceremonial site of major importance for the island's prehistoric peoples. Pre-Columbian — 15th century (Caquetío-Arawak)",
        "experience": "An exclusive dawn visit with Bonaire's lead archaeologist, ahead of tourist groups. Professional HD photographic documentation of the petroglyphs included. An academic briefing on the pre-Columbian cultures of the ABC islands. A gourmet lunch overlooking the north coast, prepared by a private chef."
      },
      {
        "name": "Rincon — the Oldest Village in the Dutch Caribbean",
        "meta": "16th century (founded c. 1527) · No yacht access",
        "desc": "Founded by the Spanish around 1527, Rincon is Bonaire's oldest village and the oldest permanent settlement anywhere in the Dutch Caribbean. Tucked into a sheltered valley on the windward coast to guard against pirates, it served as the center of life for enslaved people and their families throughout the WIC period and Dutch colonial rule. This is where the wives and children of enslaved men lived while the men worked in the salt pans to the south; Rincon is thus considered the first slave village in the Dutch Antilles. Its vernacular architecture of yellow-ochre limestone, its narrow lanes, its old church, and its Simadan (harvest festival) traditions are inscribed as part of Bonaire's intangible cultural heritage.",
        "experience": "A private village tour with Rincon's community leader (gezaghebber) and an official chronicler of Bonaire's oral history. Participation in a traditional Aruban and Bonairean cooking demonstration (piska ku funchi, kabritu stoba). Private access to the old colonial church. An exclusive presentation of the community's craft and folk collections."
      },
      {
        "name": "Landhuis Karpata — Plantation and Aloe Kiln",
        "meta": "Yacht access",
        "desc": "Built in 1870 on the foundations of a WIC fort dating to 1639, Landhuis Karpata is one of Bonaire's most important surviving examples of 19th-century plantation economy. Beneath its characteristic ochre-yellow facade in the neo-colonial Dutch Antillean style, the plantation produced, for nearly a century, aloe vera of exceptional quality, along with charcoal, dyewood, and goats exported to Curaçao. Karpata aloe was renowned as the finest in the entire Caribbean region. The site preserves its original aloe kiln, outbuildings, and the remains of its agricultural infrastructure, designated a national monument of Bonaire. 17th century–1955 (fort 1639, landhuis 1870)",
        "experience": "A private architectural tour with Bonaire's heritage curator and a descendant of the Hart family (former owners). A historical demonstration of the aloe-resin production process at the original kiln. A gourmet lunch in the plantation gardens overlooking the coast. Option for a private dive session on the adjacent reef."
      },
      {
        "name": "Historic Salt Pans and Obelisks of the Pekelmeer",
        "meta": "1636–19th century (obelisks 1837) · Yacht access",
        "desc": "The Pekelmeer salt pans have been the economic heart of Bonaire's colonial history since the WIC's arrival in 1636; the salt produced there was used to preserve Dutch herring on long sea voyages. In 1837, four obelisks were erected and painted in the colors of the Dutch flag and royal house (red, white, blue, orange) to signal the correct pan to loading ships; three remain visible today. These salt pans, which stretch for several kilometers, also form one of the most important flamingo sanctuaries in the Caribbean, first observed by the privateer William Dampier as early as 1681.",
        "experience": "A private sunrise birdwatching safari across the salt pans to observe nesting flamingos, led by STINAPA (National Park) 's official ornithologist. A 4x4 vehicle tour into areas of the Pekelmeer normally closed to the public. Professional photography of the flamingos and the obelisks. A gourmet lunch with panoramic views over the salt pans."
      },
      {
        "name": "Bolivia Plantation and Prehistoric Caves",
        "meta": "Yacht access",
        "desc": "The Bolivia plantation, on Bonaire's east coast, embodies 3,600 years of continuous history: the earliest human traces at the site date to around 1350 B.C., left by prehistoric groups from Venezuela. The surrounding caves preserve hundreds of Amerindian petroglyphs, some attributed to the Caquetío culture, others older still and unidentified. The colonial plantation was later established by the WIC beginning in 1636 for goat herding and charcoal production; its still-visible slave wall bears witness to the living conditions of enslaved people. The site is currently being restored by the Save Plantation Bolivia Foundation. Pre-Columbian (~1350 B.C.) through the 19th century.",
        "experience": "A private archaeological expedition into the Bolivia caves with the Foundation's archaeologist and the plantation's owner. Viewing of previously undocumented petroglyphs with exclusive photographic documentation. A tour of the slave wall and an in-depth historical briefing. A gourmet picnic in the shade of the colonial ruins. Swimming possible in Lac Bay afterward."
      },
      {
        "name": "Rincon — Spelonk Caves and Caquetío Petroglyphs",
        "meta": "Pre-Columbian (~5th–15th century A.D.) · No yacht access",
        "desc": "The Spelonk Caves, on the limestone plateau of northern Bonaire not far from Rincon, hold, according to Father Brenneker, more than 300 figures painted by the Caquetío Indians, making it the island's largest rock-art complex. These red and black paintings, associated with polished stone tools found on site, document the presence of Bonaire's earliest inhabitants from around A.D. 500 onward. The Spelonk cave was likely a communal sanctuary where rituals and spiritual ceremonies were performed. Recent excavations have uncovered an intact burial complex dated to A.D. 800, with graves accompanied by jewelry and tools.",
        "experience": "An exclusive speleo-archaeological tour with an expert in Dutch Caribbean rock art. Special low-UV lighting to protect the artwork while revealing its details. Access to uncharted sections of the cave. An illustrated paleoanthropological briefing held privately in Rincon before the excursion. A traditional Bonairean lunch following the visit."
      },
      {
        "name": "Gotomeer (Lake Goto) — Bonaire's Archaeological and Ecological Heart",
        "meta": "No yacht access",
        "desc": "Gotomeer is Bonaire's largest saltwater lake and the island's densest archaeological zone: more than 50% of Bonaire's archaeological sites lie within a 5-kilometer radius of the lake. The earliest human settlements in this area date back roughly 3,600 years; in 2018, an intact burial complex dated to A.D. 800 was uncovered there, with skeletons adorned with jewelry whose DNA confirmed Venezuelan Arawak origin. The lake has also been observed since colonial times as one of the nesting sites for Caribbean flamingos, already noted by the privateer William Dampier in 1681. Pre-Columbian (~3,600 years ago) through the colonial era.",
        "experience": "A private archaeological and ornithological safari at Gotomeer at dawn, jointly led by an archaeologist and a STINAPA ornithologist. Access to recent excavation areas and a presentation of the latest discoveries. Observation of nesting flamingos from an exclusive viewing platform. An outdoor gourmet breakfast facing the lake with views of the limestone formations."
      },
      {
        "name": "Landhuis Bolivia — Plantation and Slave Wall",
        "meta": "Yacht access",
        "desc": "Landhuis Bolivia, on Bonaire's east coast, is one of the island's most imposing colonial plantation complexes; its ruins include the master's house, agricultural outbuildings, and the famous 'slave wall' — a long dry-stone wall built by enslaved people that marked the boundary of the WIC plantation. It stands as one of the most tangible architectural records of forced labor in the Dutch Antilles. The property also preserves traces of pre-Columbian petroglyphs in its caves, making Bolivia a site of memory spanning 3,600 years of human history, from the earliest Amerindians to the abolition of slavery in 1863. 17th century–1863 (post-abolition 19th century)",
        "experience": "A memory-and-heritage tour in the presence of the plantation's owner and restorer, accompanied by a historian specializing in Dutch colonial slavery. A commemorative ceremony at the slave wall. Exploration of the estate's pre-Columbian caves. A gourmet lunch served in the gardens of the partially restored master's house, with fine wine service. Swimming and snorkeling in the turquoise waters of Lac Bay after the visit."
      }
    ]
  },
  {
    "key": "curacao",
    "name": "Curaçao",
    "items": [
      {
        "name": "Fort Amsterdam",
        "meta": "Yacht access",
        "desc": "The first fort built by the Dutch West India Company, a year after Curaçao was seized from the Spanish in 1634, Fort Amsterdam is the oldest standing building on the island. Its thick coral and stone walls, up to three meters wide, protected the strategic entrance to Saint Anna Bay. Inside stands the Fortkerk (the fort's Protestant church, 1769), famous for the British cannonball still lodged in its facade — a memento of Captain John Bligh's attack aboard the Bounty. The fort today houses the Governor of Curaçao and several government offices, illustrating a remarkable institutional continuity spanning more than three centuries. Dutch colonial period, 17th century (built in 1635)",
        "experience": "A private tour outside official opening hours with access to the Governor's chambers and the fort's church; guided by an expert in Dutch colonial history; a privatized candlelit gala dinner in the historic courtyard; access to the museum's archives for a presentation of previously unseen collections."
      },
      {
        "name": "Mikvé Israel-Emanuel Synagogue",
        "meta": "Yacht access",
        "desc": "The Mikvé Israel-Emanuel Synagogue is the oldest continuously operating synagogue in the Western Hemisphere, founded by twelve Sephardic families from Amsterdam. Its current building, consecrated in 1732, retains unique architectural features, including a white sand floor — symbolically evoking the desert exodus — and period Dutch brass chandeliers. Part of Willemstad's UNESCO World Heritage boundary, it bears witness to the extraordinary religious tolerance of Curaçao under Dutch rule and to the Jewish community's decisive influence on 17th-century international trade. An adjoining Jewish museum displays archives, ritual objects, and documents chronicling five centuries of Caribbean community life. Colonial era, 17th–18th century (congregation founded in 1651, building consecrated in 1732)",
        "experience": "A private tour outside opening hours with the rabbi or an appointed historian; access to the Jewish museum's confidential archives and pieces not on public display; a private Havdalah ceremony on request; a supervised viewing of the original 18th-century Torah scrolls."
      },
      {
        "name": "Fort Nassau (Fort Oranje Nassau)",
        "meta": "Yacht access",
        "desc": "Perched 68 meters above Willemstad and the Schottegat, Fort Nassau — officially Fort Oranje Nassau — was built in 1797 to protect the inner harbor from enemy invasion. Briefly captured by the British in 1807 and renamed Fort George, it was returned to the Netherlands in 1816 and declared a national monument in 1959. From its ramparts, a 360-degree view takes in the whole of Willemstad, its forts, its colorful wharves, and the silhouettes of oil tankers at anchor. Now converted into a fine-dining restaurant, it retains its original cannons, its original jail, and the remains of its barracks, offering a unique record of turn-of-the-19th-century military architecture. Late Dutch colonial period, late 18th century (built in 1797)",
        "experience": "A privatized gala dinner on the fortified terraces at sunset; a welcome cocktail served at the foot of the period cannons; a historical presentation by an expert with access to the former dungeon and command rooms; live musical entertainment in a uniquely panoramic setting."
      },
      {
        "name": "Kura Hulanda Museum",
        "meta": "Yacht access",
        "desc": "Housed in a complex of twenty-five historic buildings in the UNESCO-listed Otrobanda district, Kura Hulanda ('Dutch Courtyard' in Papiamentu) is the Caribbean's most comprehensive museum devoted to the transatlantic slave trade. Its main exhibit chronicles, with striking documentary force, the triangular trade and the conditions of the Atlantic crossings, displaying chains, slave documents, slave-ship manifests, and testimonies. The African collection — the largest in the Antilles — also includes objects from West African empires, pre-Columbian gold, Mesopotamian art, and Antillean artifacts. This site carries a universal memory embedded at the very heart of the merchant city that Willemstad was in the 17th and 18th centuries. Slave-trade heritage, 19th century (museum founded in 2001 on an 18th-century historic site)",
        "experience": "A private after-hours tour with the collections curator and a historian specializing in the African diaspora; access to storage areas and unpublished pieces; an evening of reflection with a contemporary artistic performance (traditional storyteller or musician); a privatized African-Caribbean dinner in the historic courtyard."
      },
      {
        "name": "Queen Emma Bridge (Koningin Emmabrug)",
        "meta": "Yacht access",
        "desc": "The ultimate icon of Willemstad, the Queen Emma pontoon bridge has linked the Punda and Otrobanda districts since 1888, swinging open across Saint Anna Bay to let ships pass. Designed by American businessman Leonard Burlington Smith, it was the Caribbean's first toll bridge — crossing was free for those without shoes, and paid for those wearing them. Its current structure, made up of sixteen steel pontoons hinged on a hydraulic pivot, is unique in the Antilles and spectacular to watch as it swings open at night for oil tankers. Part of Willemstad's UNESCO World Heritage boundary, it symbolizes the living link between the capital's two historic shores and remains an essential feature of the Caribbean urban landscape. Late 19th century (inaugurated in 1888, current reconstruction from 1939)",
        "experience": "A private nighttime viewing of the bridge swinging open for a passing oil tanker, from a tender or an illuminated yacht, with champagne and a guide; a walk across the bridge outside peak hours with an official photographer; access to the hydraulic mechanisms for an exclusive demonstration."
      },
      {
        "name": "Landhuis Chobolobo — Senior & Co. Distillery",
        "meta": "No yacht access",
        "desc": "Landhuis Chobolobo is a stately early-19th-century plantation house tucked into Salinha Ariba on Willemstad's eastern outskirts. Since 1896, the Senior family has distilled authentic Curaçao liqueur here from the dried peels of the laraha, a local variety of bitter orange descended from Spanish orange trees introduced in the 16th century. The distillation process, unchanged for 130 years, uses copper stills and traditional maceration, making this the sole producer of the original Blue Curaçao recipe. The colonial house itself, with its shaded galleries, brick vaults, and tropical gardens, is a rare example of agro-industrial heritage in the Dutch Antilles. 19th century (landhuis built in the early 1800s, distillery operating since 1896)",
        "experience": "An exclusive back-of-house distillation session with the Senior family's master distiller; a private cocktail-making workshop in the historic courtyard; a tasting of collector cuvées not sold commercially; a candlelit dinner in the plantation gardens with liqueur pairings; the option of a personalized limited-edition bottling monogrammed with the client's initials."
      },
      {
        "name": "Klein Curaçao — Lighthouse and Historic Island",
        "meta": "Yacht access",
        "desc": "An uninhabited islet of 1.7 square kilometers, located 11 km southeast of Curaçao, Klein Curaçao was one of the darkest cogs in the triangular trade: the Dutch West India Company quarantined sick enslaved people here before their arrival on the main island, and those who died were buried there — several graves remain. Phosphate deposits were also discovered in 1871 and mined until 1886. Its 20-meter coral-pink lighthouse, built in 1850 to mark the dangerous surrounding reefs, is now abandoned but intact, the island's only permanent structure alongside a maritime cemetery. Nearby, the wrecks of the Magdalena (1934) and the oil tanker Maria Bianca Guidesman make these waters a benchmark for heritage diving. 17th century (Dutch West India Company); lighthouse built in 1850.",
        "experience": "A privatized superyacht excursion with an onboard chef and a gourmet picnic on an untouched beach; a guided dive on the wrecks with an underwater archaeologist; access to the enslaved people's cemetery with a historian specializing in the slave trade, for a private memorial visit; an optional luxury bivouac (fully equipped tents delivered by helicopter on request)."
      },
      {
        "name": "Landhuis Jan Kok and Its Salt Pans",
        "meta": "No yacht access",
        "desc": "Landhuis Jan Kok is one of Curaçao's best-preserved plantation houses, built in 1704 on a 345-hectare property along the salt pans of Santa Maria Bay. These salt basins were central to a vital colonial economy — more than 16,000 barrels of salt were produced there annually to supply the Dutch herring industry. The house was rebuilt in 1840 after a devastating fire; only the storerooms (magasina) dating to 1704 survived. Today it houses the studio and gallery of Nena Sanchez, Curaçao's iconic artist, whose vividly colored works are exhibited around the world. At dawn and dusk, flamingos gather in the adjacent salt pans, offering a breathtaking natural spectacle. 17th–18th century (original construction in 1704, later rebuilding)",
        "experience": "A private tour of the Nena Sanchez gallery with the artist herself or a representative of her studio; a sunrise electric-buggy excursion across the salt pans to observe nesting flamingos; a hands-on painting workshop on site; a sunset dinner in the plantation gardens with private catering."
      },
      {
        "name": "Landhuis Brievengat",
        "meta": "18th century (built around 1750) · No yacht access",
        "desc": "Landhuis Brievengat — also known as Plantage 'Hoop' ('Hope') — is one of Curaçao's largest and most striking plantation houses, dating to 1750 and once the seat of a 500-hectare estate devoted to aloe cultivation and cattle raising. Its two square corner towers, built as lookout posts and disciplinary cells for enslaved people — locally nicknamed casa di palomba, or 'love nests' — form a unique and history-laden architectural feature. Devastated by the hurricane of 1877 and saved from demolition by a 1955 donation from Shell to the Stichting Monumentenzorg, it was restored with scrupulous historical fidelity. Today a national monument, Brievengat hosts internationally renowned concerts and cultural events in a colonial setting of exceptional character.",
        "experience": "A privatized evening in the plantation gardens with a live Caribbean music concert or a jazz recital under the stars; a torchlit nighttime tour with a historian specializing in colonial heritage; an outdoor gala dinner with Michelin-caliber catering; exclusive access to both corner towers for a panoramic sunset view."
      },
      {
        "name": "Historic Pietermaai District",
        "meta": "Yacht access",
        "desc": "Pietermaai is Willemstad's most vibrant and best-preserved neighborhood outside the conventional tourist areas, made up of a succession of 18th- and 19th-century Dutch colonial houses with restored pastel facades facing directly onto the Caribbean Sea. Part of Willemstad's UNESCO World Heritage boundary, it was left to decline for decades before a remarkable revival in the mid-2010s, led by private investors who transformed its residences into boutique hotels, fine-dining restaurants, and art galleries. The district now concentrates the best of Curaçao's intellectual and creative nightlife, offering an authentic immersion in living tropical colonial architecture. Its waterfront is a short walk from Punda and forms one of the most photographed urban skylines in the Caribbean. 18th–19th century (colonial development, heritage revival in the 2010s)",
        "experience": "A private nighttime walking tour of the district with an architect specializing in colonial heritage; a privatized terrace dinner in a renovated 18th-century residence overlooking the sea; an art workshop with a renowned local artist in a private gallery; access to historic residences not open to the public, with a guided architectural tour."
      }
    ]
  },
  {
    "key": "st-john",
    "name": "St. John (USVI)",
    "items": [
      {
        "name": "Annaberg Sugar Plantation Ruins — Virgin Islands National Park",
        "meta": "Yacht access",
        "desc": "The Annaberg ruins are the best-preserved remnants of St. John's sugar and rum industry, standing majestically above Leinster Bay and the Sir Francis Drake Channel. Windmills, cast-iron cauldrons, restored slave quarters, and dry-stone terraces bear witness to the plantation system that shaped the Danish Caribbean. Costumed demonstrators regularly perform traditional craft reenactments on site. Plantation founded around 1718–1731; named by Solomon Zeeger (owner c. 1758) in honor of his wife, Anna deWindt. One of St. John's largest plantations in the 19th century (roughly 1,300 acres in 1808). Abandoned in 1871. Included within Virgin Islands National Park (established 1956); listed on the National Register of Historic Places (NRHP).",
        "experience": "A sunrise excursion with a National Park archaeologist, a private demonstration of traditional cane-sugar making, followed by brunch on the panoramic terraces overlooking the British Virgin Islands."
      },
      {
        "name": "Reef Bay Trail & Taíno Petroglyphs",
        "meta": "Yacht access",
        "desc": "The Reef Bay Trail is the most spectacular trail in Virgin Islands National Park: it descends 2.6 miles through lush rainforest to the ruins of the Reef Bay sugar factory, then on to a freshwater pool whose rock walls are carved with petroglyphs made by the Taíno more than a thousand years ago. The blend of Amerindian archaeology, 19th-century industrial architecture, and untouched forest makes for a memorable, sensory experience. The pre-Columbian Taíno petroglyphs date from roughly A.D. 700 to the late 15th century; they form one of the few rock-carving sites in the Lesser Antilles. The trail also passes the ruins of the Reef Bay sugar factory (18th–19th century), the last still operating on the island. Included within Virgin Islands National Park (NRHP); the petroglyphs are a protected archaeological site.",
        "experience": "An exclusive private hike with an NPS ranger-archaeologist, a gourmet Caribbean lunch served beside the petroglyph pool, and a VIP return by private catamaran to the superyacht."
      },
      {
        "name": "Catherineberg Sugar Mill Ruins",
        "meta": "Yacht access",
        "desc": "Standing beside the road at the heart of St. John, the stone windmill at Catherineberg is one of the island's most photogenic ruins. Its rough volcanic-stone masonry walls, arches, and wild lime trees lend it the romantic, melancholic atmosphere typical of Caribbean plantation ruins. The site offers a contemplative pause off the beaten path, far from the crowded beaches. An 18th-century sugar plantation (established c. 1733–1740); windmill and sugar-processing infrastructure built of volcanic stone. The site is now part of Virgin Islands National Park (NRHP). Accessible from Centerline Road, St. John's main thoroughfare.",
        "experience": "A private twilight tour with an archaeologist guide, champagne amid the torch-lit ruins, and a fine-art photo session with a professional photographer."
      },
      {
        "name": "Cinnamon Bay Archaeological Site",
        "meta": "Yacht access",
        "desc": "Cinnamon Bay reveals to its attentive visitors several layers of history: carved Taíno stones, 18th-century Danish plantation foundations, and archaeological exhibits at the park's visitor center. The crescent-shaped beach, lined with palm trees and a coastal seagrape forest, is one of the most beautiful on St. John, offering direct access to one of the best-documented prehistoric sites in the Lesser Antilles. Taíno presence documented from A.D. 700 to the late 15th century; Amerindian artifacts uncovered during NPS excavations. The Danish established a sugar plantation on this site in the 18th century. Active archaeological excavations under the NPS since the 1960s. Beach and campground included within Virgin Islands National Park.",
        "experience": "A morning dive with an underwater archaeologist, a private presentation of recent discoveries at the excavation camp, followed by VIP snorkeling on the Cinnamon Bay reef with a certified guide."
      },
      {
        "name": "Peace Hill & Denis Bay — Windmill and the Christ of the Caribbean Statue",
        "meta": "Yacht access",
        "desc": "Peace Hill is a spectacular promontory overlooking Denis Bay and St. John's north coast, crowned by an 18th-century volcanic-stone windmill and the remains of the Christ of the Caribbean statue, destroyed by Hurricane Marilyn in 1995. This site, rich in history and symbolism — from Danish plantation to world-peace sanctuary — offers one of the most striking panoramas in the Virgin Islands. The Denis Bay plantation was established in 1718; its 18th-century windmill is one of the best-preserved on the island. Colonel Wadsworth, a world-peace advocate, acquired the estate in the 20th century and erected a Christ of the Caribbean statue in 1953 (toppled by Hurricane Marilyn in 1995). The land was donated to Virgin Islands National Park in 1975.",
        "experience": "An exclusive sunrise on Peace Hill with beach yoga, a champagne breakfast served at the foot of the historic windmill, and a briefing from an NPS historian on the estate's history."
      },
      {
        "name": "Bordeaux Mountain Estates",
        "meta": "No yacht access",
        "desc": "Bordeaux Mountain is St. John's highest point, its wooded slopes home to the remains of 18th-century Danish plantation estates: dry-stone walls, terraced agricultural fields, and the ruins of great houses. The 1.2-mile trail offers a rare botanical and archaeological experience, winding through rainforest home to wild mangoes and fruit trees descended from the old plantations. An area of 18th-century Danish plantations established on St. John's highest ground (peak elevation approximately 476 m/1,562 ft). The dry-stone walls, agricultural terraces, and colonial house remains date to 1718–1850. The Bordeaux Mountain Trail is part of Virgin Islands National Park; listed on the NRHP.",
        "experience": "A private hike with a botanist-historian, a gourmet Caribbean picnic in a panoramic clearing at the summit, followed by a tasting of tropical fruits descended from the Danish plantations."
      },
      {
        "name": "Emmaus Moravian Church — Coral Bay",
        "meta": "Yacht access",
        "desc": "The Emmaus Moravian Church in Coral Bay is one of St. John's oldest buildings and an outstanding example of 18th-century Moravian missionary architecture. Its manse dates to 1750 and reflects the unique role of this congregation, the only one authorized to evangelize enslaved people in the Danish West Indies. The master mason Cornelius, a freed formerly enslaved man, built the church with his own hands and is buried in the adjoining cemetery. The manse dates to 1750, one of the oldest buildings on St. John. The original church was built in 1782, destroyed by a hurricane in 1790 and by fire in 1892; the current building dates to 1919, built on the original foundations. Established on land that had belonged to Governor Suhm (Danish West India Company, 1717). Listed on the National Register of Historic Places (NRHP). The Moravians were the first Protestants to evangelize enslaved people in the Antilles, beginning in 1732.",
        "experience": "A private tour of the church with the pastor or a St. John Historical Society historian, followed by an a cappella Moravian hymn concert in the nave, and dinner in the 18th-century manse gardens."
      },
      {
        "name": "Fortsberg — Fort Frederikssvaern & the 1733 Slave Revolt",
        "meta": "Yacht access",
        "desc": "Perched on Fortsberg Hill above Coral Bay, this 18th-century Danish fort was the site of the most significant event in St. John's history: the 1733 slave revolt, the first successful insurrection in American colonial history. Akwamu enslaved people, concealing knives in firewood, seized the fort on November 23, 1733, and held the island for six months. This site is a major place of remembrance for African resistance. Fort built in 1717–1718 during Denmark's official taking of possession of St. John. On November 23, 1733, Akwamu enslaved people led by Queen Breffu seized the fort, launching the first successful colonial revolt in the Western Hemisphere, which lasted until May 1734. Listed on the National Register of Historic Places (NRHP). Managed by Virgin Islands National Park.",
        "experience": "A sunset excursion to Fortsberg with a historian specializing in the 1733 revolution, an intimate torchlit commemoration with readings from historical testimonies, followed by a traditional Creole dinner served in Coral Bay."
      },
      {
        "name": "America Hill Ruins",
        "meta": "Yacht access",
        "desc": "America Hill holds a quiet but moving complex of Danish colonial plantation ruins perched on the heights above Coral Bay: great-house foundations, slave-quarter walls, agricultural terraces, and the remains of stone presses. Less visited than Annaberg, this site offers a more intimate and authentic archaeological experience, its encroaching tropical vegetation making the ruins all the more striking. The remains of a sugar plantation and its outbuildings date to the 18th–19th centuries, located in the Coral Bay area on a natural terrace overlooking the bay. An archaeological site documented by the National Park Service as part of the Virgin Islands National Park inventory (NRHP). Periodic excavations conducted by the NPS and university partners since the 2000s.",
        "experience": "A private off-trail exploration with an NPS archaeologist, interactive mapping of the ruins, and a colonial-style gourmet lunch served outdoors among the remains."
      },
      {
        "name": "Leinster Bay & Waterlemon Cay — Plantation Ruins and Marine Reef",
        "meta": "Yacht access",
        "desc": "Leinster Bay, accessible from the Annaberg ruins, combines an exceptional stretch of historic shoreline — dock ruins, plantation walls, and 18th-century warehouses right at the water's edge — with the natural beauty of Waterlemon Cay and its crystal-clear waters, home to sea turtles and rays. This dual natural and historic heritage, protected by the national park, is one of the most sought-after destinations for yachtsmen in the Caribbean. The Leinster Bay plantation ruins date to the 18th century (the era of the great Danish sugar plantations, 1718–1871). The bay and Waterlemon Cay (a coral islet) have been part of Virgin Islands National Park since 1956. The site is listed on the NRHP. Waterlemon Cay is renowned as one of the best snorkeling spots in the Caribbean, with sea turtles, rays, and spectacular coral.",
        "experience": "A privatized anchorage in the bay at dawn, exclusive snorkeling guided by a marine biologist around Waterlemon Cay, a fresh-seafood lunch served aboard the superyacht or on the beach, and a tour of the plantation ruins with an archaeologist."
      }
    ]
  },
  {
    "key": "anegada",
    "name": "Anegada",
    "items": [
      {
        "name": "Horseshoe Reef — A Graveyard of Ships",
        "meta": "Yacht access",
        "desc": "Horseshoe Reef is the largest barrier reef in the Caribbean and the fourth-largest in the world, stretching 29 km around Anegada. Its treacherous configuration has claimed more than 300 ships since 1523 — Spanish galleons, British frigates, merchant sailing ships, and steamers. Wooden wrecks have left little behind but stone ballast and cannon on the seabed, while steel-hulled vessels remain more visible. Anegada — whose Spanish name means \"drowned island\" — was practically invisible from the masts of tall ships, and many captains mistook it for Puerto Rico. The BVI government has banned anchoring on the reef to protect it. 16th century to present (wrecks documented as early as 1523)",
        "experience": "A private sunrise dive over a five-century underwater graveyard, with a consulting marine archaeologist; exclusive access to wrecks never dived in a group setting, followed by a gourmet lunch served aboard the superyacht featuring Anegada lobster caught that same morning."
      },
      {
        "name": "The Settlement — Anegada's Historic Village",
        "meta": "Yacht access",
        "desc": "The Settlement is Anegada's only village, tucked into the southeastern part of the island near Lower Bay. Long a refuge for buccaneers and pirates who exploited the channels behind the reef, the island was incorporated into the British colony of Antigua in 1672. After the abolition of slavery on August 1, 1834, a community of free fishermen and farmers settled here permanently. Economic life long depended on lobster and conch fishing, along with shipwreck salvage. The Pomato Point Museum, housed in a former restaurant, displays a map marking over 200 wrecks, along with cannon, cannonballs, pottery, coins, and Amerindian artifacts. The breeding program for the critically endangered Anegada rock iguana is also based here. Permanent European settlement from the 17th century; post-emancipation growth from 1834.",
        "experience": "A private after-hours visit to the Pomato Point Museum, guided by the local historian, with access to previously unpublished photographic archives and a tasting of traditional Anegadian cuisine (grilled lobster, conch escabeche) in a setting reserved exclusively for the group."
      },
      {
        "name": "Famous Wrecks: HMS Astraea (1808), Paramatta (1859) & Rocus (1929)",
        "meta": "Yacht access",
        "desc": "Three iconic wrecks sum up five centuries of shipwrecks on Horseshoe Reef. The British frigate HMS Astraea (32 guns, 1781), commanded by Captain Heywood, ran aground on March 23, 1808, after her captain mistook Anegada for Puerto Rico; only four men died, and her cannon still lie at 3–10m depth. She was rediscovered in 1967 by Bert Kilbride, appointed \"Receiver of Wrecks\" by Queen Elizabeth II. The Royal Mail Line's paddle steamer Paramatta wrecked on June 30, 1859, during her maiden voyage from Southampton to Colombia; all 180 passengers were saved, and her hull now lies at 6m on the windward reef, covered in coral and patrolled by barracuda. The Rocus, a 115-meter Greek cargo ship, ran aground in 1929 carrying a cargo of cattle bones destined for fertilizer production; the scattered bones gave Cow Wreck Beach its name. Her sinking also gave the British government the final push to install the Sombrero lighthouse in 1868. 19th–20th century (major wrecks: 1808, 1859, 1929)",
        "experience": "A small private group dive (maximum 4 people) over all three wrecks in a single day, led by an underwater archaeologist, with professional free-diving photography and access to previously unpublished historic Bert Kilbride photographs, presented as a personalized art book."
      },
      {
        "name": "Loblolly Bay — Historic Bay & Inner Reef",
        "meta": "Yacht access",
        "desc": "Loblolly Bay, on Anegada's north coast, is a vast pale-pink sand bay sheltered by the inner lagoon formed behind Horseshoe Reef. Historically used as a temporary anchorage and fishing ground, it owes part of its fame to the legend of the Cow Wreck: cattle bones from the cargo ship Rocus (1929) regularly washed up on the adjacent beaches, giving rise to Cow Wreck Beach and its famous beach bar. In 1989, hurricanes Gabrielle and Hugo washed away 15 meters of beach on the north side. The \"Flash of Beauty\" dive and snorkel site lies at the eastern end of the bay, renowned for its exceptional coral formations in crystal-clear water 2–3m deep. Access remains challenging: daytime anchoring only, full northern exposure to Atlantic swell, and no overnight stays permitted. 17th century to present (historically used as a refuge point and fishing ground)",
        "experience": "An exclusive beach day: a pop-up beach club with luxury furnishings, a private chef, a bartender, premium snorkel equipment, and a naturalist guide to explore Flash of Beauty and its sea turtles in a pristine setting."
      },
      {
        "name": "Flamingo Pond — Flamingos & Conservation",
        "meta": "Yacht access",
        "desc": "Flamingo Pond is the largest of Anegada's four salt ponds, which together cover roughly a quarter of the island's area. In the 19th century, Caribbean flamingos (Phoenicopterus ruber) populated these waters by the tens of thousands, as described by naturalist Robert Schomburgk during his 1831 visit. Intensive hunting for meat, feathers, and trade gradually drove them out, until their complete disappearance in the 1960s. In 1992, 18 birds were repatriated from the Bermuda Aquarium through the BVI National Parks Trust, The Conservation Agency, and the Falconwood Corporation. The first captive hatching took place in 1995, and the January 2022 annual count recorded 433 flamingos. The western ponds were designated a Ramsar wetland site on May 11, 1999, and are recognized as an Important Bird Area by BirdLife International. Historic populations recorded from the 1830s; local extinction around 1960; reintroduction from 1992 to present.",
        "experience": "Dawn observation from a reserved private platform, with an expert ornithologist and a professional wildlife photographer, followed by a champagne breakfast on the lagoon shore in an exclusively privatized setting."
      },
      {
        "name": "Sombrero Lighthouse & the Historic Marking of Anegada Passage",
        "meta": "Yacht access",
        "desc": "For centuries, the complete absence of markers on Horseshoe Reef made Anegada one of the deadliest reefs in the Atlantic. The wreck of the steamer Paramatta on her maiden voyage in 1859 generated enough diplomatic pressure for the British government to finally build a lighthouse. Erected on Sombrero islet, 55 km northwest of Anegada, the Sombrero lighthouse (built by the Thames Ironworks and Shipbuilding Company — the same yard that had launched the Paramatta) was inaugurated on January 1, 1868. Its white light, flashing every 60 seconds, secured the Anegada Passage, a major shipping route between the Caribbean and the Atlantic. On Anegada itself, a modest end-of-channel light (Anegada West End Light, fl. W 10s) was later installed to mark the entrance to the main channel. Today, markers and buoys form the only safe access to the island. Lighthouse first requested in 1848; the Paramatta wreck in 1859 as catalyst; lighthouse inaugurated January 1, 1868.",
        "experience": "A private sunset cruise toward the Anegada Passage, with a gourmet dinner served in the cockpit by torchlight, a talk by a maritime historian on the wrecks that led to the building of the Sombrero lighthouse, and a passage alongside it at dawn."
      },
      {
        "name": "Conch Shell Mounds — Shell Middens & the Fishing Industry",
        "meta": "Yacht access",
        "desc": "At Anegada's eastern tip stand mounds of giant conch shells (Strombus gigas) reaching up to 3.5 meters in height and covering as much as 200 square meters, radiocarbon-dated to the 13th century. First mapped in 1824 (the Noyce chart for the Quartermaster's Office) under the caption \"Pyramids of conch shells left by the Indians.\" Explorer Schomburgk described them as early as 1831, dismissing the burial-mound theory: each shell bears a perforation at the base of the siphon, made to extract the animal more easily. The tradition has continued unbroken: Amerindian fishermen first, then British colonists, deposited their shells in the same spot for centuries, creating a site that is at once an archaeological record and an active fishermen's midden. Accessible only by sea, with a local guide familiar with the shoals. Prehistoric accumulation from 300 BC; radiocarbon dating to 1245 ± 80 AD; continuous use to the present day.",
        "experience": "A private archaeological expedition at dawn by ultralight speedboat, guided by archaeologist Mitch Kent (author of the island's environmental profile), with the possibility of meeting local fisherman Kelwyn \"Kelly\" Faulkner Lindsay, whose family has carried on the tradition for generations."
      },
      {
        "name": "Amerindian Sites & Early Settlement — Anegada I & II",
        "meta": "Yacht access",
        "desc": "Archaeological excavations by the University of Florida (Davis & Oldfield) have identified two pre-Columbian midden sites on Anegada. The Anegada I site, east of Budrock Pond (eastern part of the island), contains pottery shards tempered with plagioclase feldspar — a rock absent from Anegada and imported from Virgin Gorda or beyond — a diorite pestle fragment, and the bones of fish, turtles, and birds (likely flamingos). The Anegada II site, on the outskirts of The Settlement, contains a manatee bone and undecorated pottery shards. Together they attest to a seasonal presence of Ceramic Age peoples, likely tied to salt harvesting from the ponds, conch gathering, and reef fishing. The island was probably depopulated after 1550 during the Spanish campaigns to exterminate the indigenous peoples of the Lesser Antilles. Amerindian occupation from 300 BC; ceramics dated to the Late Ceramic Age (Virgin Islands/Puerto Rico); likely abandonment mid-16th century.",
        "experience": "A private visit to both pre-Columbian sites with the lead archaeologist, including access to the Creque Collection (original pottery and stone axes), followed by a reconstructed Amerindian meal prepared by a local Caribbean chef aboard the superyacht."
      },
      {
        "name": "Historic Salt Ponds — Flamingo Pond & the Western Salinas",
        "meta": "Yacht access",
        "desc": "Anegada's four large western salt ponds — including Flamingo Pond, the largest — cover roughly a quarter of the island's area. Historically, these salinas were worked for sea salt production, a vital resource for preserving fish in the pre-industrial Caribbean. They also served as nurseries for Curry Mole mullet (Mugil cephalus), fished for local consumption. Archaeological research suggests salt harvesting dates back to Amerindian prehistory, with both known pre-Columbian sites located less than 100 meters from the ponds' banks. The hydrology and variable salinity of the basins have been studied scientifically (Saline Systems, 2006). Designated a Wetland of International Importance (Ramsar) in 1999 and an Important Bird Area by BirdLife International, these ponds form the most extensive wetland ecosystem in the BVI. Probable prehistoric exploitation; colonial-era use documented through the 19th century; Ramsar designation May 11, 1999.",
        "experience": "A private dawn tour of all four salt ponds by open-air Moke, with a naturalist guide from the National Parks Trust of the Virgin Islands, an extended stop at the historic salinas for a tasting of reconstructed artisanal sea salt, and a Caribbean cooking lesson using traditional preservation methods aboard the superyacht."
      },
      {
        "name": "Anegada's Wreckers — The Story of the Salvagers & Bert Kilbride",
        "meta": "Yacht access",
        "desc": "For nearly two centuries, Anegada's inhabitants developed a parallel economy built on the salvage — legal or otherwise — of cargoes from ships wrecked on Horseshoe Reef. The practice ranged from official salvage to outright plundering (\"wrecking\"). Period accounts report that lanterns were sometimes deliberately moved to lure ships onto the reef. In 1851, the St. Thomas press denounced \"the unscrupulous plunderers of this part of the British Virgin Islands\" following the wreck of the Dutch galliot Detroop, whose cargo of gin and cheese was partly diverted before the arrival of the frigate HMS Helena. This informal industry declined as nautical charts improved and the Sombrero lighthouse was installed in 1868. In the 20th century, Bert Kilbride (1914–2008), appointed \"Receiver of Wrecks\" by Queen Elizabeth II in 1967, restored the tradition's reputation by locating 138 wrecks around Anegada, including HMS Astraea. Nicknamed \"the last pirate of the Caribbean,\" he always refused to hand over to the BVI government the complete map of his discoveries. 17th–19th century (peak 1780–1880); a living legacy today.",
        "experience": "A dinner talk aboard the superyacht hosted by a maritime historian specializing in the BVI, with a tasting of an aged rum carrying maritime notes, a screening of previously unpublished Bert Kilbride archive photographs, and a facsimile of the legendary map of the 138 wrecks presented to each guest."
      }
    ]
  },
  {
    "key": "jost-van-dyke",
    "name": "Jost Van Dyke",
    "items": [
      {
        "name": "Great Harbour — Historic Village, Port of Entry & the Joost van Dyk Legacy",
        "meta": "17th century to present · Yacht access",
        "desc": "Great Harbour is the administrative and historical heart of Jost Van Dyke. The island still bears the name of Joost van Dyk, a Dutch privateer of the early 17th century who, after his settlement at Soper's Hole was destroyed by the Spanish in 1625, took refuge on this small island of hidden coves. The village houses the island's only official customs office (BVI port of entry), a historic Methodist church, and legendary beach bars. The bay was frequented by the Arawak and Carib peoples long before the arrival of Europeans.",
        "experience": "VIP welcome with expedited customs clearance, guided tour of the historic village with insight into the descendants of the first Dutch settlers, gourmet waterfront dinner with the chef from Foxy's."
      },
      {
        "name": "White Bay — Pirate Refuge & Birthplace of the Painkiller",
        "meta": "Yacht access",
        "desc": "White Bay is a crescent-shaped bay of turquoise water and white sand, once used as a discreet anchorage by pirates and buccaneers who took advantage of its shallow waters to careen their ships and resupply away from colonial patrols. In the early 1970s, Daphne Henderson invented the \"Painkiller\" cocktail at the Soggy Dollar Bar, which became the signature drink of the BVI. Two distinct areas separated by the Black Point rocks offer different anchorages and beaches. 17th–18th centuries (piracy); 1970s (birth of the cocktail)",
        "experience": "Private access to White Bay outside peak hours, a Painkiller bar opened exclusively for the group with the original recipe's founder, gourmet lunch served at the water's edge."
      },
      {
        "name": "Little Jost Van Dyke — Lettsom Plantation & Quaker Ruins",
        "meta": "18th century (circa 1700–1780) · Yacht access",
        "desc": "On this small islet attached to Jost Van Dyke lie the ruins of the Lettsom family plantation, whose walls and foundations are still visible amid the vegetation. It was here in 1744 that Dr. John Coakley Lettsom was born, into a Quaker community founded around 1720. He went on to become one of London's most renowned physicians and founder of the Medical Society of London (1773). His father Edward grew sugar on Little Jost and cotton on Sandy Cay. Beneath a large tamarind tree lie the graves of his parents. The plantation is one of the Caribbean's rare tangible Quaker remains.",
        "experience": "Private archaeological tour of the Lettsom plantation ruins with a researcher from the University of the Virgin Islands, a reenacted Quaker tea ceremony beneath the tamarind trees, presentation of the family's historical archives."
      },
      {
        "name": "Sandy Cay — National Park & 18th-Century Lettsom Cotton Field",
        "meta": "Yacht access",
        "desc": "Sandy Cay is a tiny islet of roughly 8 hectares belonging to the BVI National Parks, located between Jost Van Dyke and Tortola. In the 18th century it formed part of the Lettsom estate and was cultivated for cotton. Philanthropist billionaire Laurance Rockefeller acquired the island and donated it to the BVI authorities to be preserved as a nature reserve. Its rocks show a distinctive greenish tint from copper ore deposits. The surrounding coral reef offers exceptional snorkeling. 18th century (cotton cultivation); national park since the 1960s.",
        "experience": "Exclusive access to the uninhabited islet at dawn, before day-trip boats arrive; gourmet beach picnic served by the superyacht's butler on the pristine sand; private snorkeling with a marine biologist guide."
      },
      {
        "name": "Bubbly Pool — Natural Jacuzzi on the Atlantic Shore",
        "meta": "Yacht access",
        "desc": "The Bubbly Pool is a natural basin 1.2 meters deep, carved by Atlantic wave action on the northeastern flank of Jost Van Dyke, near Diamond Cay. Chaotic rock formations create a pool where Atlantic swells surge through a narrow fissure, producing a spectacular natural effervescence. Reached via a coastal trail from Foxy's Taboo (15 minutes), it is one of the Caribbean's most original natural phenomena. Best visited at mid-rising tide during moderate northerly swell. Ancient geological formation; open to visitors since the 1980s.",
        "experience": "Access to the Bubbly Pool at dawn, before public opening; a bottle of rosé champagne enjoyed in the natural pool; breakfast served in the open air by the onboard chef on the rocks overlooking the Atlantic."
      },
      {
        "name": "Little Harbour — Buccaneers' Anchorage & Fishing Community",
        "meta": "17th–19th centuries · Yacht access",
        "desc": "Little Harbour is a small sheltered bay on the southeastern side of Jost Van Dyke, historically used as a secondary anchorage by privateers and smugglers operating between the BVI and the US Virgin Islands. The fishing community that settled here after the abolition of slavery in 1834 carries on a subsistence tradition two centuries old. Harris' Place and Sydney's Peace & Love, two family-run restaurants, are living testaments to this surviving authentic culture.",
        "experience": "Exclusive gourmet fresh-fish lunch at Harris' Place, a meeting with local fishermen, and a hands-on conch-fritter preparation lesson with the Harris family chef."
      },
      {
        "name": "Great Harbour Methodist Church — Post-Emancipation Religious Heritage",
        "meta": "19th century (post-emancipation, 1834) · Yacht access",
        "desc": "The Methodist church of Great Harbour is one of the few historic buildings on Jost Van Dyke to have survived repeated hurricanes. Built after the 1834 emancipation, it symbolizes the cultural and spiritual resilience of the Afro-Caribbean community that succeeded the Quaker planters on the island. Methodism took root here in the wake of the earlier Quaker presence, embodying the continuity between dissenting British religious traditions and the enslaved population's aspiration for freedom.",
        "experience": "Private visit to the church with the local pastor, an exclusive gospel concert for the group in this historic setting, an account of the history of abolition in the BVI and the Quakers' role, followed by a welcome cocktail in the village."
      },
      {
        "name": "Jost Van Dyke Sugar Mill Ruins — Plantation Heritage",
        "meta": "Yacht access",
        "desc": "Like most of the BVI, Jost Van Dyke had an economy built on sugarcane plantations worked by enslaved Africans. Remains of sugar mills and plantation houses survive at several points on the island, notably in the hills above Great Harbour. Recent archaeological research (University of Connecticut, Chapter 5 of the JVD Environmental Profile) has mapped several sites. The 1834 abolition ended this system, leaving the island to subsistence farmers. 18th – early 19th centuries (sugar economy)",
        "experience": "Private guided hike with an archaeologist specializing in Caribbean plantations, a visit to the ruined sugar mills and former slave quarters, an illustrated account of the history of abolition in the BVI, and a sunset aged-rum cocktail on the terrace."
      },
      {
        "name": "Fort Recovery — First Dutch Fortification in the BVI (Joost van Dyk Legacy)",
        "meta": "Circa 1615–1625 · Yacht access",
        "desc": "Although located on Tortola (West End), Fort Recovery is intrinsically linked to the history of Jost Van Dyke, as it was here that Joost van Dyk built the BVI's first permanent fortification before being driven out by the Spanish and taking refuge on the island that now bears his name. The cylindrical stone tower, still standing, is the oldest European structure in the Eastern Caribbean and ranks among the BVI's most significant heritage sites. A superyacht itinerary linking Fort Recovery to Great Harbour (JVD) traces the full saga of the Dutch privateer.",
        "experience": "Historic superyacht itinerary \"In the Footsteps of Joost van Dyk\": a visit to Fort Recovery at Soper's Hole, crossing to Great Harbour, lunch on JVD, with an onboard historian."
      },
      {
        "name": "Diamond Cay — Natural Heritage & Foxy's Taboo, the Last Pirate Stronghold",
        "meta": "17th century to present · Yacht access",
        "desc": "Diamond Cay is a small islet off the eastern tip of Jost Van Dyke. Its rough waters and steep cliffs once served as a natural watchpoint for buccaneers monitoring merchant ships crossing the passage between the BVI and the USVI. Today it is home to Foxy's Taboo, founded by Foxy Callwood — a legendary figure of Caribbean folklore, folk singer, and central personality of Jost Van Dyke since the 1960s. The coastal trail leads on to the Bubbly Pool, a unique Atlantic geological site.",
        "experience": "Private gourmet dinner at Foxy's Taboo with an exclusive acoustic performance by Foxy Callwood or his son Justis, an oral history of the pirates and settlers of Jost Van Dyke, and local rum cocktails under the stars."
      }
    ]
  },
  {
    "key": "peter-island",
    "name": "Peter Island",
    "items": [
      {
        "name": "Deadman's Bay — The Blackbeard Legend & Dead Chest Island",
        "meta": "Yacht access",
        "desc": "An iconic bay whose ominous name is tied to the legend of the pirate Blackbeard, said to have marooned fifteen mutineers on the neighboring islet of Dead Chest Island. Tradition holds that those who tried to swim to Peter Island drowned, their bodies washing ashore on this beach. The tale inspired the refrain \"Fifteen men on the Dead Man's Chest,\" immortalized in Stevenson's Treasure Island. The mile-long crescent beach is today the resort's main beach. 17th–18th centuries, Golden Age of Piracy.",
        "experience": "Private sunset beach lunch with the resort's chef exclusively, onboard sommelier service, and a guided discovery of pirate legends with a local historian."
      },
      {
        "name": "Sprat Bay — Dutch Foundation & Pieter Adriaensz's Fort",
        "meta": "Early 17th century (circa 1615–1625) · Yacht access",
        "desc": "Sprat Bay is the historical heart of Peter Island. It was here that Pieter Adriaensz, known as \"The Commander,\" a member of the Dutch West India Company, built a fort and slave enclosures around 1615–1625 to facilitate privateering and the slave trade from Angola. The island was named in his honor. The bay was later dredged and filled during the development of the Norwegian-owned resort in the 1960s, becoming its main marina.",
        "experience": "Private guided tour of the Dutch historical site, access to the resort's archives, and a gala dinner in the historic hall of the former club with a rare Caribbean rum tasting."
      },
      {
        "name": "Great Harbour — Colonial Anchorage & Plantation Ruins",
        "meta": "17th–19th centuries · Yacht access",
        "desc": "Great Harbour is Peter Island's most sheltered bay, used as a strategic anchorage since the era of Dutch colonization. Hikers have reported ruins of an old Great House and a Quaker chapel hidden in the coastal vegetation, remnants of 18th-century cotton and tobacco plantations. A footpath from Sprat Bay crosses a salt pond and leads to the ruins, with an unobstructed view over the Sir Francis Drake Channel.",
        "experience": "Private hike guided by a local archaeologist to the colonial ruins, a gourmet picnic on the heights overlooking the channel, and a tender return to the superyacht."
      },
      {
        "name": "Norman Island — Stevenson's Treasure Island & Pirate Caves",
        "meta": "Yacht access",
        "desc": "Adjacent to Peter Island to the northwest, Norman Island is widely recognized as the principal inspiration for Robert Louis Stevenson's Treasure Island (1883). In 1750, a cache of pirate treasure — Spanish pieces of eight — was discovered in a cave on the island's southern peninsula (Treasure Point). Sir Francis Drake is said to have anchored in The Bight in 1585 with 1,800 men before attacking Santo Domingo. The three caves, reachable by kayak or swimming, host exceptional underwater life. 17th–18th centuries; novel published in 1883.",
        "experience": "Exclusive private tender excursion with a historian guide, snorkeling in the illuminated caves, and an onboard gourmet lunch featuring a facsimile presentation of Stevenson's manuscript."
      },
      {
        "name": "Dead Chest Island — Blackbeard's Mutineer Islet",
        "meta": "Early 18th century (1715–1718) · Yacht access",
        "desc": "A small coffin-shaped islet (hence its name — \"dead man's chest\" referred to a sea chest in buccaneer times) located east of Peter Island. Legend holds that Blackbeard marooned fifteen mutineers here with only a bottle of rum and a cutlass, with no water or food. The islet appears on a Jeffreys nautical chart from the late 1700s, attesting to the antiquity of the name. It lies within Dead Chest National Park, and its waters hold notable dive sites.",
        "experience": "Tender tour around the islet with historical narration from a specialist guide, a \"Dead Man's Chest\" cocktail served onboard at sunset, and private diving or snorkeling on the national park reef."
      },
      {
        "name": "Peter Island Resort — History of the Private Island & the Van Andel/Smedvig Dynasties",
        "meta": "Yacht access",
        "desc": "Peter Island is the largest private island in the BVI (730 hectares). Its history spans Dutch colonization (1615), 18th-century cotton plantations, the tobacco era of the 1930s under John Charles Brudenell-Bruce, its purchase by Norwegian shipowner Torolf Smedvig in 1968 — who had prefabricated Norwegian chalets shipped in — and finally the Van Andel family (co-founders of Amway), who have owned the island since 1978. Following hurricanes Irma and Maria (2017), a six-year transformation project led to the resort's reopening in December 2024. 1615 to present (resort development: 1968–2024)",
        "experience": "Private tour of the island's archives and history with a member of the Van Andel family or the general manager, and a dinner in the owner's private villa with panoramic views over the channel."
      },
      {
        "name": "White Bay (Peter Island) — Freebooters' Anchorage & Sea Turtles",
        "meta": "Yacht access",
        "desc": "White Bay, on the southern coast of Peter Island, was historically used as an anchorage by freebooters and privateers sailing the Sir Francis Drake Channel. The clarity of its shallow waters and its coral reefs made it a natural haven for ship repairs (careening). Now reserved exclusively for resort guests, the bay is home to sea turtles, stingrays, and lobsters within a preserved natural setting. 17th–18th centuries, used in the age of freebooters.",
        "experience": "Private snorkeling guided by a marine biologist over the historic reefs, a white-sand lunch served by the yacht's butler, and free-swimming green turtle observation."
      },
      {
        "name": "Big Reef Bay — Buccaneers' Secret Anchorages & Snorkeling",
        "meta": "17th–18th centuries · Yacht access",
        "desc": "Big Reef Bay, on the southern coast of Peter Island, is a semi-wild bay whose rocky bottom and dense reefs once formed a discreet haven favored by buccaneers to conceal their vessels and carry out ship maintenance. Dense vegetation just inland hides the remains of stone structures (plantation walls) that recent expeditions have located. Marine life here is especially rich thanks to the absence of heavy anchoring.",
        "experience": "Discovery expedition by kayak or tender with an archaeologist guide, exploration of plantation ruins hidden in the vegetation, and a sundowner cocktail at sea overlooking the illuminated reefs."
      },
      {
        "name": "Little Harbour (Peter Island) — Secret Anchorage & Turtle Watching",
        "meta": "Yacht access",
        "desc": "Little Harbour is a deeply recessed cove on the southeastern face of Peter Island, reputed to be the island's most protected anchorage. Virtually unknown to passing tourists, this haven was used by privateers and merchants of the colonial era as a secure overnight anchorage. Its seagrass beds are today a nesting site for green turtles, and the seabed holds old anchors and shipwreck debris. 17th century to present (historic anchorage intact)",
        "experience": "An exclusive overnight stay in this untouched anchorage with a gourmet dinner served under the stars onboard, and dawn turtle watching by private clear-bottom kayak."
      },
      {
        "name": "RMS Rhone — Royal Wreck & Marine National Park (Salt Island)",
        "meta": "Yacht access",
        "desc": "The RMS Rhone, a steamship of the Royal Mail Steam Packet Company, sank in a hurricane on October 29, 1867, off Salt Island, east of Peter Island, claiming 123 lives. The wreck rests at depths of 6 to 24 meters and was designated a national park in 1980. Regularly ranked among the ten finest wreck dives in the Caribbean by specialist publications, it is reachable by tender from Peter Island in 20 minutes. Its Victorian iron hull is entirely encrusted with coral. October 29, 1867 (sinking); national park since 1980.",
        "experience": "Privatized dive with a certified DAN instructor and a maritime historian, a visit to the wreck's two illuminated sections, and champagne on the tender afterward with a presentation of the sinking's historical archives."
      }
    ]
  },
  {
    "key": "virgin-gorda",
    "name": "Virgin Gorda",
    "items": [
      {
        "name": "The Baths National Park — Geological Formation & Historical Context",
        "meta": "Yacht access",
        "desc": "The Caribbean's most iconic natural site, a national park since 1990 at the southwestern tip of Virgin Gorda. The Baths (short for \"batholiths\") are a spectacular accumulation of granite boulders up to 12 meters high, formed by the slow cooling of magma deep underground 70–80 million years ago. Subsequent erosion — from rain, sea, and wind — has carved a labyrinth of caves, tunnels, arches, and crystal-clear tidal pools. The indigenous Arawak and Carib peoples frequented this site long before the arrival of Europeans; pottery shards dated to 800 AD have been found at nearby Cam Bay. Legend links the hidden coves to pirate hideouts (Captain Kidd, Blackbeard). Geological formation roughly 70–80 million years ago (Tertiary); national park since 1990; area: 7 acres.",
        "experience": "Private exploration of the Baths at first light, before the public opening at 9am, with a certified naturalist guide; snorkeling in clear water within secret caves; and a continental breakfast served on one of the panoramic flat rocks with a view over the Sir Francis Drake Channel."
      },
      {
        "name": "Copper Mine National Park — 19th-Century Copper Mine (Cornish)",
        "meta": "Yacht access",
        "desc": "Spectacular ruins of an industrial copper mine on the cliffs of Coppermine Point, southeast Virgin Gorda. The Virgin Gorda Mining Company was founded in 1835 by English investors led by Liverpool lawyer John Whitley; the first shaft was sunk in 1838. About 36 Cornish miners and 140–150 Afro-Caribbean laborers worked here, extracting over 10,000 tons of copper shipped to Wales. The mine reached a depth of 73 meters below sea level. Remains include the engine house, the chimney stack, the cistern, mine shafts, and the foundations of miners' housing. Veins of malachite (green copper oxide) are still visible in the rock. The mine closed in 1862 amid falling copper prices. Undocumented early Spanish extraction (local legend); rediscovered in 1725; industrial operations 1837–1862 led by Cornish miners; national park since 2003.",
        "experience": "A private twilight visit to the ruins with a historian specializing in Caribbean mining history, observation of copper veins glinting in the setting sun, cocktails served on the rocks overlooking the Caribbean Sea, and a presentation of period Cornish engravings in reproduction."
      },
      {
        "name": "Spanish Town / The Valley — Former Capital of the BVI (1680–1741)",
        "meta": "Yacht access",
        "desc": "Spanish Town, also known as \"The Valley,\" is Virgin Gorda's main town and the second-largest settlement in the entire BVI. It was the first capital of the British Virgin Islands from 1680 to 1741, before administration moved to Road Town (Tortola). Archaeological excavations have uncovered traces of Taíno/Arawak presence in the valley plain. The town was settled by families from Anguilla, explaining the similarity in dialects and surnames (Harrigan, George, Vanterpool, Hodge). A 17th-century plantation-era cemetery survives near the St Thomas Bay dock, with the graves of white Quaker planters. The modern Virgin Gorda Yacht Harbour is today's economic heart. First European settlement around 1680 by colonists from St. Kitts, Nevis, and Anguilla (including Quaker families); capital of the BVI from 1680 to 1741; Cornish miners settled in the 19th century.",
        "experience": "A private historical tour of Spanish Town with a local historian: a visit to the 17th-century colonial cemetery, a presentation of the former capital's archives, and lunch at a privatized waterfront gourmet restaurant overlooking the Yacht Harbour."
      },
      {
        "name": "Little Fort National Park — Spanish Fort Remains",
        "meta": "Yacht access",
        "desc": "A few minutes from Spanish Town's harbor, Little Fort National Park preserves the masonry remains of an early colonial fortification, attributed by local tradition to the Spanish — said to be the source of the town's name — though Spanish documentary sources do not confirm a permanent settlement here. Stone walls and the ruins of the Powder House are the main visible features. The park is also a dry-forest ecosystem home to iguanas and local birds. According to Smithsonian Magazine, the site \"was once the location of a Spanish fortress, of which some masonry walls remain, along with the ruins of the Powder House.\" Fort likely of Spanish origin (16th–17th century); colonial masonry; present-day national park (area: 36 acres) in Spanish Town.",
        "experience": "A private lantern-lit evening visit to the fort ruins, with a dramatized account of the history of Spanish and British fortifications in the Caribbean, followed by a moonlit cocktail in the park."
      },
      {
        "name": "Gorda Peak National Park — Virgin Gorda's Highest Point",
        "meta": "Yacht access",
        "desc": "Gorda Peak (417m) is Virgin Gorda's highest point, offering a 360° view over the entire BVI archipelago, the USVI, Puerto Rico, and neighboring islands. The national park protects one of the island's few remaining patches of rainforest, with remarkable plant and bird biodiversity. Hiking trails follow old colonial paths once used by planters and miners to cross the island. Remains of dry-stone walls marking former farmland can be seen along the trails. Arawak and Carib peoples once frequented the highlands of Virgin Gorda; pottery shards have been found in this area. Summit at 417 meters; national park established for rainforest conservation; network of old colonial trails reused by present-day hikers.",
        "experience": "A private sunrise hike with a certified naturalist guide, endemic bird watching, a panoramic breakfast at the summit, followed by a recovery massage aboard the yacht."
      },
      {
        "name": "Taíno / Amerindian Sites of Virgin Gorda",
        "meta": "Yacht access",
        "desc": "Virgin Gorda was inhabited by the indigenous Taíno people (also called Arawak) long before the arrival of Europeans in 1493. Archaeological digs in the Spanish Town plain and around Cam Bay have uncovered pottery shards carbon-dated to 800 AD. Christopher Columbus sighted the island in 1493 during his second voyage. The Caribs displaced the Taíno by the 15th century. The Coppermine mine is thought to have been known to the Amerindians, who used copper to make tools and jewelry for inter-island trade. Virgin Gorda's Taíno practiced fishing, farming, and pottery-making in the valley and coastal areas. Taíno (Arawak) presence from roughly 100–300 AD; archaeological sites notably at Spanish Town and Cam Bay; pottery at Cam Bay dated to 800 AD.",
        "experience": "A private archaeological tour with a specialist in Eastern Caribbean Taíno culture, including a presentation of artifacts discovered on the island and a tasting of dishes inspired by contemporary Taíno cuisine (cassava, fish, local fruit) aboard the yacht."
      },
      {
        "name": "Nail Bay Sugar Works — Plantation Sugar Mill Ruins",
        "meta": "Yacht access",
        "desc": "The ruins of Nail Bay Sugar Works are the remains of a 19th-century plantation sugar mill, located on the former Nail Bay estate, a 148-acre property on the Sir Francis Drake Channel along Virgin Gorda's northwest coast. This former sugar plantation has since been developed into a luxury villa complex (Nail Bay Resort). The stone sugar mill ruins are accessible within the estate grounds. The site offers spectacular views over the Sir Francis Drake Channel and neighboring islands, with roughly 1,500 meters of coastline. The estate illustrates Virgin Gorda's sugar-slave economy prior to 1834. 19th-century sugar plantation (before the abolition of slavery in 1834); protected ruins; former 148-acre estate on Virgin Gorda's northwest slope.",
        "experience": "A private visit to the Nail Bay ruins with a gourmet lunch at a luxury Nail Bay Resort villa overlooking the Sir Francis Drake Channel, combined with a presentation of the plantation's history by a historian."
      },
      {
        "name": "Virgin Gorda Colonial Cemetery (St Thomas Bay) — 17th Century",
        "meta": "Yacht access",
        "desc": "A discreet but precious historic plot, located between the white-sand beach and the dock parking area of St Thomas Bay in Spanish Town. This plantation-era cemetery dates to the 17th century and holds the graves of white Quaker planters, likely among the earliest settlers to arrive from St. Kitts, Nevis, and Anguilla around 1680. Two triangular brick structures still protrude from the ground. In 2019, a clean-up by the Virgin Gorda Garden Club uncovered a large 4-by-3-foot gravestone with a legible name and date. Thousands of ferry passengers pass the site daily without it being properly interpreted; funds have since been allocated for its enhancement. Plantation-era cemetery dated to the 17th century; Quaker planters' graves likely predating 1700; site under restoration since 2019.",
        "experience": "A private guided visit with a historian and genealogist specializing in BVI colonial history, with a detailed explanation of the inscriptions and the genealogy of the Quaker planter families, followed by an aperitif at the Yacht Harbour."
      },
      {
        "name": "North Sound — Historic Anchorage of Sir Francis Drake & the English Fleet",
        "meta": "Yacht access",
        "desc": "Virgin Gorda's North Sound played a major strategic role in Caribbean maritime history. Sir John Hawkins and a young Francis Drake called here in the 1560s. In 1585, Drake anchored in North Sound before his raid on Santo Domingo. In 1595, a fleet of 26 ships under Hawkins and Drake staged here to prepare an attack on San Juan, Puerto Rico. Both admirals died on that voyage; Bitter End Hill may be the last British soil either man ever stood on. North Sound is today one of the most sought-after anchorages in the Caribbean for yachts and superyachts. Used as a strategic anchorage by the British navy in the 16th century; Sir John Hawkins and the young Francis Drake visited the island in the 1560s; in 1595, 26 English ships anchored here to prepare the attack on San Juan (Puerto Rico)",
        "experience": "A private narrated luxury tender cruise across North Sound, following the routes of Drake and Hawkins, with a historical presentation and period map, followed by lunch onboard overlooking Prickly Pear Island and Eustatia Reef."
      },
      {
        "name": "Coppermine Point — Geological Panorama & Mine Site Overview",
        "meta": "Yacht access",
        "desc": "Coppermine Point is the dramatic cliff on which the ruins of Virgin Gorda's copper mine stand. The point offers one of the most striking views in all of the BVI: the blue horizon of the Sir Francis Drake Channel and the Caribbean Sea, with granite outcrops still streaked with green malachite and native copper. Scattered rocks bear specimens of malachite, copper carbonate, copper-iron sulfide quartz, and molybdenite. A Cornish beam engine, built in 1836 by the Perran Foundry in Cornwall, was used to pump water and process ore; its beam is said to still lie on the beach at Handsome Bay. The site combines geology, industrial history, and an exceptional maritime landscape. Southeastern headland of Virgin Gorda, site of copper mining since the 17th century (legend), 19th century (confirmed); workings reached 73m below sea level by 1869.",
        "experience": "A private geological and historical visit with a geologist and a historian, observation of copper and malachite veins with field loupes, authorized specimen collecting, followed by a mineral-themed cocktail (gin infused with local herbs) on the rocks overlooking the sea, in the golden light of sunset."
      }
    ]
  },
  {
    "key": "barbados",
    "name": "Barbados",
    "items": [
      {
        "name": "Historic Bridgetown and Its Garrison & St. Ann’s Fort",
        "meta": "Yacht access",
        "desc": "Historic Bridgetown and Its Garrison is one of the best-preserved colonial ensembles in the Western Hemisphere and was inscribed on the UNESCO World Heritage List in 2011. The site centers on the Garrison Savannah, the oldest continuously used racetrack in the Caribbean, surrounded by 18th-century military fortifications including St. Ann’s Fort and the Main Guard. It also includes the George Washington House, the only residence outside North America known to have hosted the first U.S. president. 17th to 19th centuries; UNESCO World Heritage Site since 2011.",
        "experience": "Exclusive privatization of the Garrison Savannah for a sunset cocktail reception with illuminated fortifications, a private night tour led by an official Barbados National Trust historian, access to normally restricted rooms at St. Ann’s Fort, premium rum tasting in the restored Main Guard with a Bajan jazz quartet, and priority access to the George Washington House with the chief curator."
      },
      {
        "name": "Nidhe Israel Synagogue & Mikvah",
        "meta": "Yacht access",
        "desc": "Founded in 1654 by Sephardic Jews fleeing persecution in Brazil, Nidhe Israel is the oldest synagogue in continuous use in the Western Hemisphere and one of the most important Jewish heritage sites in the Caribbean. It forms part of Historic Bridgetown and Its Garrison, a UNESCO World Heritage Site since 2011, and includes an interactive museum documenting four centuries of Jewish life in Barbados. A 17th-century mikvah uncovered during archaeological excavations in 2008 is among the rarest preserved ritual baths in the New World. 1654; UNESCO site since 2011.",
        "experience": "Private after-hours visit with a docent from the Barbados Jewish community, exclusive access to the 17th-century mikvah and historical archives, presentation of Torah scrolls and ritual objects normally held in reserve, and a candlelit kabbalistic dinner in the synagogue courtyard with live Sephardic music."
      },
      {
        "name": "Parliament Buildings & National Heroes Square",
        "meta": "Yacht access",
        "desc": "Built in 1871 from hand-cut coral limestone, the neo-Gothic Parliament Buildings house the third-oldest Parliament in the Commonwealth, established in 1639. Their stained-glass windows depicting British sovereigns from James I to Queen Victoria are among the Caribbean’s most distinctive iconographic ensembles. National Heroes Square, directly opposite, is the symbolic civic heart of Bridgetown and lies within the UNESCO perimeter. 1871; Parliament founded in 1639.",
        "experience": "Private parliamentary session from the honor gallery with a pre-brief by the Clerk of Parliament, exclusive access to historic chambers and ceremonial robes, a protocol lunch with the Speaker or a senator, and a personalized sunset welcome ceremony on National Heroes Square."
      },
      {
        "name": "St. Nicholas Abbey & Rum Distillery",
        "meta": "Yacht access",
        "desc": "St. Nicholas Abbey is one of only three remaining Jacobean manor houses in the Western Hemisphere, built around 1658 on a former sugar plantation in St. Peter. The house preserves more than 350 years of Barbadian history through its antiques and period interiors, while the on-site rum distillery continues a 19th-century artisanal tradition. Cherry Tree Hill and its mahogany avenue add one of the island’s most elegant landscapes to the estate. Around 1658; rum distillery active since the 19th century.",
        "experience": "Private visit with Larry Warren, owner and master distiller, including a vertical tasting of never-commercialized vintage rums from the private cellar, access to reserve areas and the historic rum shop, a plantation lunch in the Jacobean dining hall, and a private screening of the 1935 archival film in the manor house."
      },
      {
        "name": "Sunbury Plantation House",
        "meta": "No yacht access",
        "desc": "Built between 1660 and 1670 in St. Philip, Sunbury Plantation House is the only Barbados plantation house where every room is open to visitors, offering a complete immersion into the life of the island’s sugar aristocracy. Restored after a 1995 fire and fully renewed in 2018, it contains mahogany furniture, porcelain, silverware, and period horse-drawn carriages. The house sits in a mature estate of old mahogany trees that gives the site a particularly authentic atmosphere. 1660–1670; restored after 1995, major renovation in 2018.",
        "experience": "Full estate privatization for the day, with lunch served in the main dining room on antique plantation tableware, a sugar-history specialist guide, access to the private 19th-century carriage collection, a photography session in the restored rooms and gardens, and sunset cocktails with Bajan rum mixology."
      },
      {
        "name": "Codrington College",
        "meta": "No yacht access",
        "desc": "Codrington College, founded through the will of Christopher Codrington in 1710 and opened in 1745, is the oldest Anglican theological college in the Caribbean and one of Barbados’s most beautiful architectural estates. Its royal palm avenue, coral-limestone Georgian arches, and natural lake create a serene setting overlooking the island’s rugged east coast. The active chapel of St. Barnabas remains a venue for concerts and services with exceptional acoustics. 1745; endowed in 1710.",
        "experience": "Private after-hours visit with the College Principal, access to the 18th-century library and manuscript archives, a chamber concert in St. Barnabas Chapel, a garden luncheon on the lawn by the palm avenue, and the option of attending evening service followed by a private reception."
      },
      {
        "name": "Morgan Lewis Windmill",
        "meta": "No yacht access",
        "desc": "Erected in 1727 in the hills of St. Andrew, Morgan Lewis Windmill is the only fully preserved and operational sugar windmill in the Caribbean. Its coral-stone walls, bound with egg white and coral dust instead of cement, are a striking reminder of 18th-century engineering ingenuity. During the harvest season, the sails are still turned and the mill crushes cane, making it one of the most exceptional living heritage experiences in the region. 1727; operated until 1947; restored in 1999.",
        "experience": "Private cane-crushing demonstration with a Barbados National Trust historian and mill technician, fresh cane juice tasting, a presentation of 18th-century sugar artifacts, private ascent for a panoramic sunset over the Scotland District, and a gourmet picnic on the surrounding grounds."
      },
      {
        "name": "Gun Hill Signal Station",
        "meta": "No yacht access",
        "desc": "Built in 1818 on the heights of St. George, Gun Hill Signal Station was part of an island-wide military communication network designed to warn of enemy ships or approaching cargo vessels. Restored by the Barbados National Trust in 1982, it holds a notable collection of 19th-century British military memorabilia. Its elevated position offers one of the most dramatic 360-degree views in Barbados, and the famous coral lion carved by a British officer in 1868 is a unique local curiosity. 1818; restored in 1982.",
        "experience": "Exclusive site privatization with sunset dinner at Fusiliers Bar & Café, a private presentation of rare military artifacts, a lantern-lit nighttime tour, and a cocktail ceremony around the illuminated coral lion."
      },
      {
        "name": "Arlington House Museum – Speightstown",
        "meta": "Yacht access",
        "desc": "Housed in a restored 18th-century building in Speightstown, once nicknamed “Little Bristol” for its commercial importance, Arlington House Museum is a three-floor interactive museum focused on colonial memory, plantation history, and the port life of northern Barbados. The building itself is one of the oldest in Speightstown and sits close to the sea on the Platinum Coast. 18th century; museum opened in the modern era.",
        "experience": "Private evening reception in the museum with a gourmet Bajan dinner, access to the curator’s reserve collections, a period-costumed reenactment of an 18th-century Speightstown market, and sunset sea views from the third-floor windows."
      },
      {
        "name": "St. James Parish Church & Holetown Monument",
        "meta": "Yacht access",
        "desc": "St. James Parish Church, built in 1628 on the island’s oldest consecrated ground known as “God’s Acre,” is Barbados’s oldest church and a living witness to the island’s earliest English settlement. Its 1696 bell, inscribed “God bless King William,” and the memorial plaques of early settlers make it an exceptional seventeenth-century heritage site. Nearby, the Holetown Monument commemorates the landing of Captain John Powell in 1627, which marked the beginning of English colonization in Barbados. Church founded in 1628; Holetown Monument commemorates the 1627 landing.",
        "experience": "Private dawn service, guided meditation in the old settlers’ cemetery with a colonial historian, exclusive access to the bell tower and the 1696 bell, a champagne breakfast in the frangipani gardens, and a ceremonial reenactment of the first landing with period-costumed performers."
      }
    ]
  },
  {
    "key": "martinique",
    "name": "Martinique",
    "items": [
      {
        "name": "Saint-Pierre Ruins & Cyparis Dungeon",
        "meta": "Yacht access",
        "desc": "Known as the “Little Paris of the Caribbean,” Saint-Pierre was Martinique’s economic and cultural capital until it was destroyed in under 90 seconds by the pyroclastic surge from Mount Pelée on May 8, 1902, killing nearly 30,000 people. Among the surviving historic landmarks are the theater, a replica of the Bordeaux opera house with seating for 800, the intact prison cell of Cyparis, the only civilian survivor, the ruins of the former colonial hospital, the first psychiatric asylum in the French West Indies founded in 1839, and the 18th-century Fort church. The city has been classified as a Town of Art and History since 1990 and contains 15 protected monuments, the highest concentration of heritage sites in Martinique. 1635 to May 8, 1902, the Mount Pelée eruption.",
        "experience": "Exclusive night archaeological tour of the ruins with an archaeologist from the Earth Sciences Discovery Center; special after-hours access to Cyparis’ cell. Private historical minitram tour with champagne on board. Gourmet candlelit dinner in the ruins of the municipal theater under the stars. Private sunrise dive on the wrecks of Roraima, Gabrielle, and Tamaya with a certified guide."
      },
      {
        "name": "Fort Saint-Louis – Fort-de-France",
        "meta": "Yacht access",
        "desc": "Founded in 1638 by Governor Jacques du Parquet to defend the harbor of Fort-de-France, then called Fort Royal, Fort Saint-Louis is a masterpiece of Vauban-style military architecture overlooking one of the world’s most beautiful bays. Classified as a historic monument since 1973, it still houses the French Navy command for the Antilles-Guyana zone, giving it the exceptional status of a living military fortress. Its bastions, curtain walls, underground passages, and 360-degree rampart walk reveal three centuries of Franco-British conflict for Caribbean dominance. It is the founding symbol of Fort-de-France. 1638 to the present, active French naval base.",
        "experience": "Private guided visit with military archaeologist Jonathan Vidal of the French Navy, outside public hours. Access to underground passages and defensive levels normally closed to visitors. Welcome cocktail in Navy colors on the bastion terrace overlooking the bay. Exclusive possibility of privatizing the fort for a gala dinner at sunset on the ramparts."
      },
      {
        "name": "Schœlcher Library & La Savane Square – Fort-de-France",
        "meta": "1883 to 1893, 19th-century façade · Yacht access",
        "desc": "A neo-Baroque and colonial architectural masterpiece, the Schœlcher Library was designed by architect Henri Picq and first presented at the 1889 Paris Universal Exhibition before being dismantled, shipped by sea, and rebuilt in Fort-de-France in 1893 to house the gift of 10,000 books from abolitionist Victor Schœlcher. Its polychrome façade, topped by a colorful Byzantine dome, makes it one of the most visited buildings in Martinique. It symbolizes public education and the abolition of slavery in the French Caribbean, facing La Savane Square, where the decapitated statue of Empress Joséphine stands.",
        "experience": "Private after-hours visit with the collection curator. Access to the rare-books reserve and unpublished colonial maps from the 17th century. Illustrated lecture on Victor Schœlcher and abolition, followed by a Martinican punch cocktail in the historic reading room. Exclusive photo session inside the Byzantine rotunda."
      },
      {
        "name": "Habitation Clément – Domaine de l’Acajou, Le François",
        "meta": "Yacht access",
        "desc": "Habitation Clément, the jewel of the Fondation Clément on the Domaine de l’Acajou in Le François, is one of the most remarkable preserved sugar and rum estates in the French Caribbean. Its 18th-century Creole manor house, surrounded by French-style tropical gardens, hosts an internationally significant permanent collection of Caribbean and African-American contemporary art. The estate also hosted the historic 1991 meeting between President George Bush and President François Mitterrand, securing its place in modern history. The site reflects three centuries of sugar production and Martinique’s great rum-making tradition. 17th century to the present, agricultural rum AOC heritage.",
        "experience": "Private after-hours visit with the director of Fondation Clément. Comparative tasting of rare aged rums, including vintage bottlings from the 1970s, in the exceptional aging cellar. Cocktail dinner in the torch-lit French gardens with a traditional Bèlè performance. Privileged access to the non-public art reserves."
      },
      {
        "name": "Depaz Distillery & Château Depaz – Saint-Pierre",
        "meta": "Yacht access",
        "desc": "Founded in 1635 by Jacques du Parquet at the foot of Mount Pelée, the estate known as La Montagne was completely destroyed in the 1902 eruption, which wiped out the Depaz family. Victor Depaz, the only survivor because he was studying in Bordeaux, returned in 1917 to rebuild the château and create the distillery that bears his name on 80 hectares of volcanic land between sea and mountain. The long avenue of royal palms, the vast sugarcane fields with Mount Pelée in the background, and the reconstructed colonial-style château make Depaz one of the most spectacular and historically charged rum estates in the Caribbean. The island’s oldest steam machine and a traditional animal-powered mill are still visible. 1635, with the distillery rebuilt in 1917 after the 1902 eruption.",
        "experience": "Exclusive visit to Château Depaz, including the ground floor and barrel-aging cellars, with the cellar master. Vertical tasting of the estate’s great vintage cuvées in Victor Depaz’s historic office. Gourmet Creole picnic prepared by a Martinican chef in the sugarcane gardens with views of Mount Pelée. Private visit to the distillery museum and original steam engine."
      },
      {
        "name": "Château Dubuc – Caravelle Peninsula",
        "meta": "Yacht access",
        "desc": "Perched above the Caravelle Nature Reserve, Château Dubuc is Martinique’s most romantically ruined sugar estate. Abandoned after the devastating 1766 cyclone and ravaged again over time, its recently restored ruins overlook Treasure Bay from an Atlantic coastal promontory. A museum integrated into the ruins traces the history of the château and its owners through 19th-century artifacts, a lime kiln, a water cistern, and fragments of colonial walls. Local legend also associates the site with 18th-century smuggling and clandestine slave trafficking. 17th to 18th centuries; classified as a historic monument in 1992.",
        "experience": "Private visit with a park guide from the Martinique Regional Natural Park outside public hours. Access to recently excavated archaeological areas not open to the public. Candlelit dinner in the château ruins with a night view over Treasure Bay. Discovery of the Caravelle mangroves by kayak with a naturalist, then return by RIB to the yacht."
      },
      {
        "name": "Anse Cafard Memorial – Cap 110, Le Diamant",
        "meta": "Yacht access",
        "desc": "The Anse Cafard Memorial, or Cap 110, pays tribute to the victims of a clandestine slave ship that struck the reefs off Anse Cafard on April 8, 1830, during severe swells, killing hundreds of enslaved Africans chained in the hold. The twenty white concrete figures created by Martinican sculptor Laurent Valère in 1998, all leaning at a 110-degree angle toward Africa, form one of the most powerful and photographed memorials to slavery in the world. The open-air site, freely accessible, overlooks the Caribbean Sea in a solemn and dramatic natural setting. April 8, 1830, slave shipwreck; memorial inaugurated in 1998.",
        "experience": "Private sunrise or sunset visit with an expert in the history of slavery in Martinique. Poetry and musical performance facing the statues by a Martinican artist. Gourmet dinner aboard the yacht at anchor facing Diamond Rock, with a Michelin-level Martinican chef. Optional private commemorative ceremony with floral offerings at sea."
      },
      {
        "name": "Diamond Rock – HMS Diamond Rock",
        "meta": "1804 to 1805, Franco-British war · Yacht access",
        "desc": "Diamond Rock, a 175-meter limestone islet rising from the Caribbean Sea two kilometers off Le Diamant, was armed by the Royal Navy and officially commissioned as HMS Diamond Rock in January 1804, the only rock ever to receive the designation of a warship in British naval history. For seventeen months, a garrison of 107 sailors held the rock against the forces of Admiral Villeneuve before surrendering in June 1805. Admiral Nelson personally oversaw the operation, placing the site firmly within the great Napoleonic Caribbean campaign. The site now belongs to the Conservatoire du Littoral and cannot be visited on land.",
        "experience": "Private RIB or charter sail excursion to the foot of the rock with a maritime historian. Exclusive scuba dive along the walls of Diamond Rock, for PADI Level 2+ divers, with visibility up to 30 meters and giant gorgonians. Yacht-deck picnic with direct views of the rock and an illustrated historical presentation. Optional private drone overflight and aerial photography."
      },
      {
        "name": "Balata Gardens & Sacré-Cœur Church of Balata",
        "meta": "No yacht access",
        "desc": "The Sacré-Cœur Church of Balata, built in 1915 by architect Wuifflef at the request of Bishop Lequien after the 1902 eruption, is a one-fifth-scale replica of the Basilica of Montmartre. Perched at 100 meters above sea level on Morne Savon, it offers breathtaking views over Fort-de-France Bay and remains Martinique’s most visited religious monument, welcoming 250,000 to 300,000 visitors per year. A few hundred meters away, Balata Gardens, created in 1982 by landscape designer Jean-Philippe Thoze around a 19th-century Creole family house, feature more than 3,000 tropical plant species along the Route de la Trace. Its canopy walkways at 15 meters above the ground offer one of the Caribbean’s most spectacular botanical experiences. Church built in 1915; gardens created in 1982, with a late 19th-century Creole house.",
        "experience": "Private pre-opening access to Balata Gardens with the owner or director; exclusive dawn canopy walk with a dedicated naturalist. Private visit to the furnished Creole house outside public hours. Violin recital inside the church nave, known for its exceptional acoustics. Gourmet lunch at La Luciole restaurant with a reserved honorary table."
      },
      {
        "name": "Saint James Distillery & Rum Museum – Sainte-Marie",
        "meta": "Yacht access",
        "desc": "Founded in 1765 by Recollect friars and located in Sainte-Marie on Martinique’s Atlantic coast, Saint James Distillery is one of the island’s oldest and most renowned distilleries and a pioneer of Martinique’s agricultural rum AOC. Its Rum Museum, housed in a former Creole manor house, traces the history of sugarcane since 1765 through an exceptional collection of machinery, stills, and archival documents. The estate’s architecture—aging cellars, vats, and column stills—remains in operation each year from February to June during the sugarcane harvest, making it one of the most fascinating industrial heritage experiences in the French Caribbean. 1765 to the present; rum museum opened in 1979.",
        "experience": "Exclusive distillery visit during production season, February to June, with the cellar master; access to distillation rooms normally closed to the public and explanations of the historic column stills. Comparative tasting of rare vintages directly from the barrel in the cellars. Gourmet lunch in the museum’s Creole house with food-and-rum pairings by a sommelier. Access to the estate’s historical archives dating back to 1765."
      }
    ]
  },
  {
    "key": "mustique",
    "name": "Mustique",
    "items": [
      {
        "name": "Cotton House — Original Plantation Manor",
        "meta": "18th century / 1968 · Yacht access",
        "desc": "Originally an 18th-century cotton warehouse and sugar mill on the Endeavour plantation, the building was transformed into a boutique hotel by theatrical designer Oliver Messel at the direction of Colin Tennant. Its cathedral-ceilinged Great Room, sweeping verandas, and neo-Caribbean plantation style speak to a vanished era. Recognized as the social heart of the island, Cotton House hosts the celebrated Tuesday-night cocktail party that draws every resident and houseguest on Mustique.",
        "experience": "Private candlelit dinner on Endeavour Bay beach with a personal chef. The Tuesday cocktail party in the Great Room. Bamford spa with four treatment rooms. Exclusive equestrian access and a PADI dive center. Full-hotel buyout available for private functions — all 17 rooms."
      },
      {
        "name": "The Mustique Company — Headquarters and Bamboo Airport",
        "meta": "1968 / 1969 · Yacht access",
        "desc": "The Mustique Company is the founding institution of the modern island, established in 1968 by the Scottish aristocrat Colin Tennant, 3rd Baron Glenconner, to transform 1,400 acres of abandoned plantation into a private paradise for the world's elite. It still governs the entire island today — its 100 villas, its sole hotel, all air transport, and the 300-meter protected marine zone surrounding the coastline. The Bamboo Airport, a tiny thatched-roof terminal opened in 1969, embodies Mustique's deliberate rejection of scale and its singular island aesthetic.",
        "experience": "Island access is exclusively by villa-owner invitation or direct booking through the Mustique Company. Chartered private Twin Otter flights from Barbados, St. Lucia, Martinique, or St. Vincent. Bespoke private events arranged within the island's institutional framework — anniversaries, launches — with full residential access."
      },
      {
        "name": "Les Jolies Eaux — Princess Margaret's Villa",
        "meta": "1967 – 1972 · Yacht access",
        "desc": "A royal residence built on a promontory at the island's southern tip for Princess Margaret, a wedding gift from Colin Tennant. Designed by Oliver Messel, uncle to Lord Snowdon, in a single-story neo-Caribbean baroque style, the villa commands a 270-degree panorama over the Atlantic and the Caribbean Sea. Five stone bedrooms, expansive glass walls, citrus gardens, two lodges, and an infinity pool form an ensemble of genuine royal intimacy. Made internationally familiar by Netflix's The Crown, it remains one of Mustique's most sought-after and historically resonant villas.",
        "experience": "Exclusive villa rental for 10 to 12 guests with private chef, butler, and house staff. Access to the private promontory pool. An exceptional dinner facing two oceans. Royal-style picnics arranged on Gelliceaux Bay, Princess Margaret's favorite beach."
      },
      {
        "name": "Basil's Bar — Historic Institution of Britannia Bay",
        "meta": "1974 · Yacht access",
        "desc": "An iconic bar founded in 1974 by Basil Charles OBE, a legendary figure in Mustique's history, built directly on the boardwalk of Britannia Bay's jetty. It has been the historic gathering point for five decades of celebrities, rock stars, and royalty who have made Mustique their own, embodying the island's warm, unpretentious soul. Its \"Wednesday Jump Up\" — a sunset jazz and cocktail evening — is a globally recognized Caribbean institution, featured in dozens of documentaries and travel features.",
        "experience": "Full privatization of Basil's Bar for an exclusive evening — lobster dinner, sunset cocktails, live band. Arrangement of the annual Basil's Blues Festival with international artists. Reserved access to the bar's iconic stage setting for private waterside events."
      },
      {
        "name": "SS Antilles Wreck — The Legendary 1971 Shipwreck",
        "meta": "1971 · Yacht access",
        "desc": "The SS Antilles, a luxury ocean liner of the Compagnie des Messageries Maritimes launched in 1952, ran aground on January 8, 1971, on a reef in Lansecoy Bay off Mustique's north coast after misjudging the shallow, reef-strewn waters. Unable to be refloated, the burning hull broke in two and was partially salvaged on site before being shifted into the channel off Lansecoy Bay, where it rests submerged today. Its mast still breaks the surface at low tide — a dramatic relic visible from shore. The wreck made world headlines at the time and, somewhat ironically, helped put Mustique on the map.",
        "experience": "VIP dive or snorkel excursion guided by a PADI-certified divemaster from Cotton House. Private RIB transfer from Britannia Bay. Illustrated historical briefing aboard with archival photographs of the wreck. A picnic at sea on the return."
      },
      {
        "name": "Endeavour Sugar Mill and Colonial Plantation Ruins",
        "meta": "18th century – 1834 · Yacht access",
        "desc": "Mustique held seven sugar and cotton plantations at its colonial peak, purchased in 1763 by British settlers Alexander Campbell and John Aitcheson. Only the sugar mill of the Endeavour plantation, near today's Cotton House, survived the island's gradual abandonment through the 19th century. This stone architectural relic, a direct witness to the enslaved economy that shaped the Grenadines, stands as the island's most significant colonial monument. The Hazell plantation, which absorbed the last remaining lands in 1865, marked the close of this chapter before Colin Tennant's purchase of the island in 1958.",
        "experience": "Private guided tour of the sugar mill and the Endeavour plantation site with the island historian, followed by a sunset cocktail in the Cotton House Great Room. A bespoke mule-back \"plantation trail\" through all seven historic plantation sites, with the full account of the Grenadines' sugar and slave-era history."
      },
      {
        "name": "Macaroni Beach — Legendary Atlantic Shore",
        "meta": "1970s onward · Beach access by transfer",
        "desc": "Macaroni Beach, on Mustique's Atlantic coast, is the island's most celebrated beach and one of the most photographed in the Caribbean. It was here that Colin Tennant, Lord Glenconner, threw his legendary parties through the 1970s, most famously the 1976 Golden Ball. Its Atlantic swell makes it Mustique's only surf beach, and its seafront coconut palms form one of the most iconic Caribbean landscapes anywhere. The beach is woven into Mustique's intimate history — royal picnics, private rock-star parties, and scenes from The Crown.",
        "experience": "Luxury beach picnics staged in the Lord Glenconner tradition — linen-dressed tables, private chef, champagne service, live acoustic music. A private surf day with instruction for beginners and experts alike. Exclusive sunset photography session."
      },
      {
        "name": "The Oliver Messel Villas — Architectural Heritage of the Island",
        "meta": "1968 – 1978 · Yacht access",
        "desc": "Oliver Messel, the great British theatrical designer and uncle to Lord Snowdon, is the founding architect of Mustique's entire aesthetic. He created the island's first villas from 1968 onward for the Mustique Company, including the \"Messel houses\" that still define the island's inimitable style today — baroque columns, thatched roofs, tropical palettes, spaces opened entirely to the sea. Among the surviving original villas are exceptional architectural witnesses, several now designated as the island's private heritage. Messel relocated to Barbados, having left Europe's climate for health reasons.",
        "experience": "Private architectural tour of the Messel villas with a specialist architect or historian. Access to photographic archives of the original 1960s–70s construction. Dinner in a Messel villa rented for the occasion, with authentic period decor."
      },
      {
        "name": "Britannia Bay and Lovell Village — The Island's Maritime Heart",
        "meta": "17th century / 1964 · Yacht access",
        "desc": "Britannia Bay is Mustique's only historic anchorage, used since the 17th century by the pirates who gave the Grenadines their name, drawn by its protected waters. Island life still centers here: the main jetty, the harbourmaster's office, Basil's Bar, and Colin Tennant's earliest infrastructure. Lovell Village, established in 1964 by Tennant to rehouse Mustique's original inhabitants — fishermen and farmers — was the island's first planned village, a unique record of the transition from pre-modern island to today's exclusive paradise.",
        "experience": "A narrated mule-back historical walk through Lovell Village and the Britannia Bay waterfront with the island governor or a local historian. Access to the Lord Glenconner portrait gallery at Cotton House. Sunset from the main jetty with private cocktails."
      },
      {
        "name": "British Colonial Fortifications and Amerindian Archaeological Sites",
        "meta": "2500 BC – 18th c. · Yacht access",
        "desc": "Mustique ranks among the richest of the Grenadines in heritage sites: an academic survey by the University of the West Indies (DeGraff and Baldwin, 2013) catalogued 35 historic sites on the island, including five Amerindian archaeological sites, two notable geological formations, and the ruins of colonial fortifications. The British built three forts after 1763 to defend the island against the French. Carib and Arawak tools, dating from roughly 250 BC to 1000 AD, attest to a human presence on the island long predating European colonization. Scattered across Mustique's heights and coastline, these sites form a singular historical circuit.",
        "experience": "Private archaeological expedition with an expert guide in pre-Columbian Grenadines history. Access to the archives of the University of the West Indies heritage survey. A complete private mule-back \"Deep History\" circuit covering the fortifications, plantation ruins, and Amerindian sites in a single day. A personalized illustrated report presented to each participant."
      }
    ]
  },
  {
    "key": "tobago-cays",
    "name": "Tobago Cays",
    "items": [
      {
        "name": "Tobago Cays Marine Park (TCMP) — Creation and History of the Protected Area",
        "meta": "Yacht access",
        "desc": "The Tobago Cays Marine Park encompasses five uninhabited islets — Petit Rameau, Petit Bateau, Baradal, Jamesby, and Petit Tabac — a 565-hectare white-sand-bottomed lagoon, and the 4-kilometer Horseshoe Reef, one of the longest barrier reefs in the southern Lesser Antilles. Privately owned since at least the 16th century, the Cays were purchased by the government of Saint Vincent and the Grenadines in 1999, after lengthy negotiations, to be preserved in perpetuity as a national park. Designated a Ramsar wetland, the park is the natural jewel of the Grenadines, once visited by Jacques Cousteau himself, who praised its exceptional underwater landscapes in reports to the SVG government. The park's creation stands as a founding act of Caribbean marine conservation. Privately owned since the 16th century; designated a conservation area in 1987; became an official marine park in 1997; acquired by the SVG government on April 12, 1999.",
        "experience": "Privileged park access with a private ranger for a historical briefing on the park's creation, guided snorkeling on Horseshoe Reef with species identification, and an exclusive gourmet picnic on the beach of a deserted islet. Luxury mooring on a reserved private buoy, booked in advance. A nighttime coastal sail beneath the starlit skies of the Grenadines."
      },
      {
        "name": "Horseshoe Reef — Historic Barrier Reef of Navigation",
        "meta": "Yacht access",
        "desc": "At 4 kilometers long, Horseshoe Reef is the country's largest reef and one of the longest barrier reefs in the southern Grenadines. Its horseshoe shape has shaped maritime routes for centuries — first for the Caribs, then for buccaneers and colonial navigators who sought the shelter of the lagoon to careen their ships or escape storms. Today, the reef's ocean-facing side — reserved for experienced divers — offers spectacular drop-offs, while the lagoon-facing side is accessible to snorkelers. This reef served as an essential natural landmark for navigation throughout the Grenadines and appears on the earliest Dutch and English nautical charts of the region. A geological formation of Holocene origin; has played a role in regional navigation since the 16th century.",
        "experience": "A private guided dive on the reef's ocean-facing wall with a PADI 5-star certified divemaster, exploring drop-offs blanketed in branching corals, sea fans, and giant sponges. Observation of stingrays, nurse sharks, and barracudas in the channels. A night under the stars moored on a private buoy facing the reef."
      },
      {
        "name": "Petit Tabac — Filming Location for Pirates of the Caribbean",
        "meta": "Yacht access",
        "desc": "Petit Tabac is the fifth islet of the Tobago Cays group, set slightly apart from the other four, east of Horseshoe Reef. Flat, fringed with pristine white sand, and almost entirely free of vegetation, it was chosen to portray the deserted island where Captain Jack Sparrow (Johnny Depp) and Elizabeth Swann (Keira Knightley) are marooned in Pirates of the Caribbean: The Curse of the Black Pearl (2003). The authenticity of the setting — its wild beach and absolute isolation — made the scene unforgettable. Uninhabited and untouched, the islet can be visited today in exactly the state it was in during filming, offering a beach of pure cinematic beauty, perfect for a private picnic at the edge of the world. The island has been known to navigators since the 16th century; the film was shot here in 2002 (released in 2003).",
        "experience": "An ultra-private gourmet picnic on the beach of Petit Tabac, with catering delivered by tender, set in the exact scenery of the iconic Pirates of the Caribbean scene. Caribbean rum cocktails, hammocks and parasols set up on request, and professional group photography on the untouched white sand. Private swimming and snorkeling around the islet."
      },
      {
        "name": "Baradal Turtle Sanctuary",
        "meta": "Yacht access",
        "desc": "The islet of Baradal, inside the Tobago Cays lagoon, is home to one of the most accessible green and hawksbill turtle sanctuaries in the Eastern Caribbean. The turtles, considered sacred by the Carib peoples who frequented these waters for millennia, come daily to feed in the lagoon's seagrass beds. Since the marine park's creation, their protection has been strict and their natural behavior carefully preserved. Swimming freely among a dozen giant turtles in a crystal-clear lagoon is an experience that even the most well-traveled clients call unforgettable. Baradal is also a hawksbill turtle nesting site, with its beaches under strict protection. Protected since the marine park's creation (1997–1999); the site has been frequented by turtles for millennia.",
        "experience": "A private snorkeling session supervised by a marine park ranger dedicated to the group, allowing total immersion with the turtles in Baradal's seagrass beds. An exclusive naturalist briefing on sea turtle behavior, their Atlantic migrations, and conservation programs. Professional underwater photography and video included."
      },
      {
        "name": "Wreck of the HMT Puruni — British World War I Gunboat",
        "meta": "Yacht access",
        "desc": "The HMT Puruni is one of the most fascinating wrecks in the Lesser Antilles: this 42-meter British gunboat, originally built as a trawler on the Tyne in 1905, was requisitioned by the British Admiralty in March 1917 and fitted with two 13-pounder guns to patrol Caribbean waters against German U-boats. She sank on August 29, 1918, after breaking free of her anchor in a storm on the reef at Saline Bay, off Mayreau's northwest coast. The wreck lies at 11 meters, her bow separated from the rest of the ship and standing photogenically on the seabed. Fully colonized by coral and sponges, she is home to rare nudibranchs, giant lobsters, and countless tropical fish, and is accessible even to beginner divers. Built in 1905 on the Tyne (England); requisitioned in March 1917; sank on August 29, 1918.",
        "experience": "An exclusive private dive on the wreck with a PADI divemaster and a professional underwater photographer, a full exploration of the ship (central boiler, collapsed hold, upright bow), and guided viewing of visible artifacts. A historical briefing on the role of British gunboats in the Caribbean during the Great War. A return to the surface for cocktails aboard the yacht with an underwater photo slideshow."
      },
      {
        "name": "Catholic Rock Bird Sanctuary — Roost of Boobies and Frigatebirds",
        "meta": "Yacht access",
        "desc": "Catholic Rock is a solitary, steep outcrop within the waters of the Tobago Cays Marine Park, serving as a nesting and resting colony for hundreds of seabirds — brown boobies, magnificent frigatebirds, terns, and cattle egrets. Its name recalls the earliest colonial charts of the region, where it served as a landmark for navigators before the era of modern instruments. The rock appeared on 17th-century Dutch and British charts as a hazard marker and navigational aid through the Grenadines passages. Observed from a yacht's deck with binoculars, the sight of frigatebirds gliding above the wave crests is a display of timeless, wild beauty. A natural site frequented for centuries; designated as part of the marine park in 1997.",
        "experience": "A private birdwatching tour by silent tender or kayak with a naturalist, a discreet approach to the rock for spotting-scope observation of the nesting colonies. A briefing on seabird migration routes across the Atlantic and their historic role as navigational landmarks for Caribbean sailors."
      },
      {
        "name": "World's End Reef",
        "meta": "No yacht access",
        "desc": "World's End Reef is the deepest and wildest dive site in the Tobago Cays Marine Park — an extreme drop-off on the park's exposed Atlantic side, where the Caribbean Sea meets the Atlantic Ocean. Its poetic name captures exactly the experience of sailors who braved this hazardous passage to cross into the southern Antilles. Navigators of the 17th and 18th centuries feared these strong-current passes, which marked the eastern edge of the known world in the Grenadines. Underwater, the site rewards experienced divers with passing lemon sharks, schools of jacks, and giant sea fans blanketing the drop-offs. Above the surface, the unbroken Atlantic swell creates a display of dramatic power. A reef of centuries-old geological formation; designated as part of the marine park in 1997.",
        "experience": "An exclusive dive on World's End Reef with a divemaster expert in Atlantic currents, exploring drop-offs lined with giant sea fans and, in season, passing manta rays. A historical briefing on wreckers and the legendary passages through these waters. A return to the yacht after diving for a gourmet lunch and a photographic presentation of the species encountered."
      }
    ]
  },
  {
    "key": "carriacou",
    "name": "Carriacou",
    "items": [
      {
        "name": "Hillsborough Waterfront District",
        "meta": "Yacht access",
        "desc": "Hillsborough, the capital of Carriacou, is a small coastal town with an authentic Caribbean character, where the colonial waterfront preserves stone warehouses, a historic jetty, wooden gallery houses, and British-era administrative buildings. First settled permanently around 1750 and later developed under British administration after 1763, it became the island’s economic center through sugar and cotton. Today, Hillsborough remains the natural starting point for discovering Carriacou and its heritage landscape. Founded during the French period around 1750; developed under British rule from 1763; capital of Carriacou since Grenada’s independence in 1974.",
        "experience": "Private waterfront walk with local historian Angus Martin or an archivist from the Carriacou Historical Society, followed by traditional Creole dining in a private 18th-century colonial house. Exclusive access to historical archives can also be arranged for guests interested in plantation records and original colonial maps. Arrival by tender adds a refined ceremonial entrance."
      },
      {
        "name": "Carriacou Museum",
        "meta": "Yacht access",
        "desc": "The Carriacou Museum, operated by the Carriacou Historical Society, is a cultural institution whose importance far exceeds the island’s size. Housed in a former cotton ginnery on Paterson Street, it holds one of the Caribbean’s most representative Amerindian collections, alongside colonial maps, furniture, glassware, pottery, Big Drum material, and a dedicated space on artist Canute Caliste. The museum was badly damaged by Hurricane Beryl in July 2024 and is currently under rehabilitation. Former cotton ginnery, in use until 1979; museum founded in 1976.",
        "experience": "Private guided visit with the museum director or a Historical Society archivist, including access to reserve storage containing objects not normally displayed. A founding-level sponsorship gesture toward the post-Beryl restoration can be paired with a dedicated visit and commemorative plaque."
      },
      {
        "name": "Belair Estate Ruins & Windmill Tower",
        "meta": "Yacht access",
        "desc": "Belair Estate, set on the central hills of Carriacou, is one of the island’s most complete historic built landscapes, with remains from both French and British colonial phases. The site includes the foundations of an earlier French structure, an English great house completed in 1809, and a remarkably preserved windmill tower. From Belair, the views over Hillsborough, the bay, and the surrounding cays are among the most spectacular on the island. 1784 property of John Reid, Esq.; English great house completed in 1809; sugar and cotton estate from the 18th to early 20th century.",
        "experience": "Private visit with a specialist guide from the Carriacou Historical Society, exploring the great house ruins, French foundations, windmill tower, and historic cistern. A gourmet picnic on the ruins with panoramic island views and New World wine pairings creates a refined heritage experience."
      },
      {
        "name": "Windward Boatbuilding Village",
        "meta": "Yacht access",
        "desc": "Windward, in Watering Bay on Carriacou’s northeast coast, is the last village in the Caribbean where craftsmen still build wooden sailing vessels entirely by hand using methods that have remained largely unchanged since the 18th century. Scottish naval carpenters settled here after 1783 to construct sloops and schooners for plantation trade, and their descendants continue the tradition with hand tools and an eye-measured building method. Every boat launch remains a community celebration with blessing rituals and rum offerings to the ancestors of the shipbuilding craft. Since 1783, with Scottish shipbuilding families established in the late 18th century.",
        "experience": "Private meeting with a master shipwright from one of the traditional families, workshop visit during an active build, hands-on demonstration of wood shaping and caulking, and the option to sign a keel or place a symbolic bolt. A visit to the adjacent cemetery and, if scheduled, a ceremonial boat launch can be arranged."
      },
      {
        "name": "Tyrrel Bay",
        "meta": "Yacht access",
        "desc": "Tyrrel Bay is one of the most respected natural anchorages in the southeastern Caribbean, with a sheltered inner mangrove lagoon that once served as a cyclone refuge for merchant sailing vessels traveling between Grenada and Britain. It later developed into Carriacou’s official port of entry and now combines maritime heritage with modern technical facilities, including shipyards and heavy-lift equipment. The nearby village of Harvey Vale preserves typical 19th-century Creole houses. Used as an anchorage since the colonial period; port infrastructure developed from the 1990s; official port of entry for Carriacou.",
        "experience": "Exclusive private berth with full onboard service, including provisioning, fuel, and concierge support. A sunset dinner on board or at a waterfront restaurant, a private walk through historic Harvey Vale, and a dawn fish-market visit can all be organized."
      },
      {
        "name": "Sandy Island & L’Esterre Bay",
        "meta": "Yacht access",
        "desc": "Sandy Island is a pristine coral sand cay long regarded by Caribbean sailors as the ideal desert-island fantasy, surrounded by vibrant reefs and clear shallow water. Used for generations as a navigation marker and traditional fishing ground, it remains one of Carriacou’s most exclusive natural escapes. Access is only by boat, which helps preserve its wild character. Natural barrier island used for navigation and traditional fishing since the colonial era.",
        "experience": "Private full-day island setup with teak furniture, a canopy pavilion, and a champagne bar. A lobster-and-fresh-fish barbecue prepared by an onboard chef, plus exclusive snorkeling with a marine biologist, creates a high-end barefoot-luxury experience."
      },
      {
        "name": "Sabazan Indigenous Site",
        "meta": "Yacht access",
        "desc": "Sabazan, in south-central Carriacou, is the island’s most important pre-Columbian archaeological site and one of the most significant in the Grenadines. Excavations have revealed ceramics, burials, ornaments, and rock-cut cisterns dating to a continuous Indigenous occupation between roughly 390 and 1250 CE, alongside the ruins of a later plantation great house built on the same strategic promontory. The site is protected by the Grenada National Trust. Indigenous occupation c. 390–1250 CE; colonial plantation remains from the late 18th to early 19th century.",
        "experience": "Private archaeological visit led by a researcher from the University of Florida or the University of the West Indies, with access to confidential excavation reports and a supervised screening session. A private artifact presentation and deeper ethnoarchaeological commentary can be arranged."
      },
      {
        "name": "Tibo Cemetery & Ningo Well",
        "meta": "No yacht access",
        "desc": "In northeastern Carriacou, Ningo Well and Tibo Cemetery form one of the island’s most haunting heritage pairings. Ningo Well, built by enslaved laborers in the 1740s, was used for indigo production under dangerous conditions, while Tibo Cemetery’s 18th-century gravestones are being slowly returned to the sea by coastal erosion. Together, they offer a powerful lens on slavery, labor, and memory in the Grenadines. Ningo Well: built in the 1740s; Tibo Cemetery: gravestones from 1757 onward.",
        "experience": "Dawn or late-afternoon visit with a specialist historian of Caribbean slavery, followed by a quiet commemorative ceremony. Access to the Carriacou Historical Society archives can help reconstruct plantation records and family histories linked to Ningo."
      },
      {
        "name": "Petite Martinique",
        "meta": "Yacht access",
        "desc": "Petite Martinique is a tiny volcanic island of 2.4 km² and one of the Caribbean’s most distinctive maritime communities. Settled in the 1760s, it developed a seafaring economy based on fishing, coastal trading, and informal commerce that still shapes daily life today. Its boatbuilders, fishers, and coastal families preserve a strong independent maritime culture. French settlement around 1760; maritime economy since the 18th century.",
        "experience": "Private island visit with a local guide, boatbuilding workshop tour, meeting with fishing families, fresh seafood lunch cooked over an open flame, and a visit to the Sacred Heart Catholic Church."
      },
      {
        "name": "Grand Bay Cemetery & Plantation Remains",
        "meta": "Yacht access",
        "desc": "Grand Bay in southeastern Carriacou contains one of the island’s oldest plantation landscapes, along with a colonial cemetery whose limestone gravestones date to the early 19th century. The tombs preserve family names from both French and British colonial society, and some bear Masonic symbols that point to the island’s social networks during the plantation era. The cemetery remains active, which gives it a rare sense of historical continuity. Late 18th-century plantation landscape; 19th-century cemetery stones.",
        "experience": "Private visit with a genealogist or Carriacou Historical Society historian, including inscription analysis and family-tree reconstruction from tombstones and parish archives. A gourmet Creole picnic on the plantation ruins can be added for a discreet high-end heritage day."
      }
    ]
  },
  {
    "key": "grand-turk",
    "name": "Grand Turk",
    "items": [
      {
        "name": "St. Thomas Anglican Church",
        "meta": "1823 · Yacht access",
        "desc": "Built in 1823 by Bermudian settlers on the edge of Cockburn Town's Town Salina, St. Thomas Anglican is the oldest church on Grand Turk and one of the oldest buildings in the entire archipelago. Its thick limestone walls, imported from Bermuda, its cedar roof, and a parish register kept continuously since 1799 make it a living monument to Atlantic colonial culture. The adjoining cemetery holds graves spanning 1770 to 1997 — effectively a who's who of the great salt-era families. A bicentennial procession in December 2023 marked the church's central place in the island's identity.",
        "experience": "Private organ or gospel choir concert in the historic nave, arranged with the parish rector. Access to the original parish registers (1799–1922) with a local genealogist for research into the island's salt dynasties. Torchlit guided tour of the cemetery with the stories of leading salt-trading families. Light lunch in the courtyard beneath the flamboyant trees."
      },
      {
        "name": "St. Mary's Pro-Cathedral",
        "meta": "1900 · Yacht access",
        "desc": "Built in 1900 in the heart of Cockburn Town to serve a congregation closer than the distant St. Thomas, St. Mary's became the Pro-Cathedral of the Anglican Diocese of the Bahamas and Turks and Caicos Islands in the 1990s — meaning it can serve as the bishop's seat. Its white facade and bell tower form one of the most photographed silhouettes on Front Street. Together with St. Thomas's, it embodies Grand Turk's twin Bermudian religious inheritance: a memory of the salt trade and a testament to over two centuries of continuous Anglican worship.",
        "experience": "Private ceremony and nautical blessing for yacht crews, arranged with the Pro-Cathedral's dean — a long-standing maritime tradition. Exclusive bell-tower access for a panoramic view over Front Street, the coastline, and the salinas. Comparative architectural presentation of the two historic churches by a colonial heritage specialist."
      },
      {
        "name": "Columbus Landfall National Park",
        "meta": "1492 / 1992 · Yacht access",
        "desc": "Designated a national park in 1992, Columbus Landfall encompasses Grand Turk's west coast and its outer coral wall, resting on a persistent academic claim: that Grand Turk is the island Columbus named Guanahani on October 12, 1492. Recent studies on magnetic variation and caravel sailing speeds support the theory, championed by historian Josiah Marvel and a Woods Hole Oceanographic Institution analysis. A stone monument and commemorative plaque stand on the park's white beach. Whether or not the scholarly debate is ever settled, the site carries an unmatched symbolic depth for a discerning audience, fronting a coral wall that drops to 200 feet just 100 feet from shore.",
        "experience": "Private dive along the Columbus Landfall wall with a diver-historian guide from Grand Turk Diving Co, with filmed underwater presentation. A symbolic private ceremony at the monument — champagne and a reading from Columbus's October 12, 1492 logbook. Sunset dinner on the park beach facing the Atlantic, with private chef."
      },
      {
        "name": "Salt House — Salt Industry Museum and Colonial Warehouse",
        "meta": "19th century · Yacht access",
        "desc": "Salt House is a newly built structure at Church Folly, Grand Turk, designed in faithful Bermudian colonial style and set steps from the Town Salina. Conceived as a museum, artisan shop, and café devoted to the island's centuries-old salt industry, it once housed an exhibition on the cedar-hulled Bermuda Sloops that carried salt to North American markets, alongside an outlet for the artisanal Salt Cay Salt Works. Its immediate proximity to the Town Salina canals and a working windmill replica makes the hydraulic system that built Grand Turk's prosperity legible in person. Currently closed but accessible by special arrangement through the National Trust.",
        "experience": "Exceptional private access to the building and its collections, arranged with the National Trust, presented by a maritime salt-history specialist. Live demonstration of the reconstructed windmill in operation on the adjacent canals. A reenacted salt-raking ceremony using period tools. Tasting of artisanal Salt Cay products — soaps, bath salts, cooking salt — with a premium gift hamper."
      }
    ]
  },
  {
    "key": "south-caicos",
    "name": "South Caicos",
    "items": [
      {
        "name": "Cockburn Harbour — Historic Salt-Era Port",
        "meta": "18th – 20th century · Yacht access",
        "desc": "Once the commercial and administrative heart of South Caicos, Cockburn Harbour was the principal salt export port of the entire Turks and Caicos archipelago. Schooners and sloops docked here to load millions of pounds of sea salt hand-raked from the surrounding salinas. The waterfront retains its Bermudian colonial architecture — partially restored salt warehouses, stone quays, and cobbled lanes. It remains South Caicos's only official port of entry, and its rare authenticity offers a living window onto 19th-century island economy.",
        "experience": "Private torchlit evening tour of the colonial waterfront, followed by a dinner of fresh-caught fish prepared by a local chef in the former commissioner's house. Exclusive access to the fishermen's cooperative photographic archives, tracing the island's living history. A meeting with the last master conch and lobster fishermen, heirs to a century-old tradition."
      },
      {
        "name": "Historic Salinas and Bermudian Dykes",
        "meta": "17th – 20th century · Yacht access",
        "desc": "South Caicos held the most productive network of salt pans in the entire archipelago, surpassing Grand Turk and Salt Cay combined with over 100 million pounds of salt exported annually at the turn of the 20th century. The hydraulic system inherited from Bermudian settlers — canals, limestone dykes, sluice gates, and windmills whose foundations remain visible — still shapes the island's southern landscape, now home to flamingos and wading birds. The industrial logic of this heritage — seawater pumped in, sun-dried, hand-raked — remains legible in the land itself.",
        "experience": "Private dawn walk through the salinas with a local ornithologist to observe flamingos at sunrise, followed by a hands-on lesson in traditional Bermudian salt-making methods. A countryside lunch set on the dykes overlooking the iridescent pans. Professional sunset photography from the island's highest vantage points."
      },
      {
        "name": "The Boiling Hole — Sacred Salt Cave",
        "meta": "Pre-Columbian – 19th c. · Yacht access",
        "desc": "The Boiling Hole is a natural karst cavity connected to the sea through submarine fractures, its water appearing to \"boil\" with tidal fluctuations and hydrostatic pressure. Bermudian settlers harnessed this geological curiosity to feed certain salt pans through natural flow — one of the few documented examples of salt engineering exploiting the island's own geology. The phenomenon is most dramatic during spring tides. Protected within the Admiral Cockburn Land and Sea National Park, the site bridges geology, archaeology, and industry in a single stop.",
        "experience": "Visit timed to spring tides with a geologist-guide specializing in Caribbean karst formations, to witness the boiling phenomenon at its peak intensity. Tasting of artisanal salt crystals harvested on site, packaged in a crystal souvenir vial. Sunset access with cocktails served on the overlooking rock."
      },
      {
        "name": "Commissioner's House — 18th-Century Colonial Residence",
        "meta": "c. 1780 – 1800 · Yacht access",
        "desc": "The Commissioner's House is one of the few Bermudian colonial buildings still standing on South Caicos, a witness to the era when the island served as the administrative and economic capital of salt production in the Caicos. Built of local limestone with the separate Bermudian-style kitchen typical of the period — an independent stone structure to limit fire risk — the residence hosted Queen Elizabeth II during her historic 1966 visit. Abandoned after Hurricanes Frances (2004) and Ike (2008), it remains a majestic ruin overlooking the Cockburn Harbour waterfront — the island's single most powerful heritage symbol.",
        "experience": "Exclusive private tour with the official Turks and Caicos historian through the reception rooms where the Queen was received, followed by a presentation of archival photographs from the 1966 royal visit. English afternoon tea served in the Bermudian kitchen garden with porcelain service. Access to an architectural model reconstructing the building in its original state."
      },
      {
        "name": "Highlands House (Heritage House) — Plantation Ruins",
        "meta": "18th – 19th century · Yacht access",
        "desc": "The ruins of Highlands House, set on the heights of South Caicos, are the remains of a colonial-era great house associated with the salt industry and possibly with early sea-island cotton cultivation. Its elevated position gave the owner a commanding view over the salinas, the bay, and the open sea. The site is enclosed by dry-stone walls and the remnants of terraced gardens. Designated a Heritage Site by Turks and Caicos authorities, it also serves as an exceptional birding vantage point over the surrounding wetlands, frequented by flamingos and herons.",
        "experience": "Private sunrise hike to the ruins with champagne served overlooking the Caicos Bank panorama. Tablet-based multimedia presentation on 18th-century daily life at the house, with a 3D reconstruction of the original building. High-quality optic binocular observation of flamingos in the salinas below."
      },
      {
        "name": "Long Cay and Dove Cay — Guardian Islets of the Harbor",
        "meta": "17th – 20th century · Yacht access",
        "desc": "Long Cay and Dove Cay flank the entrance channel to Cockburn Harbour, forming a natural strait that Bermudian sailors used as early as the 17th century to shelter their salt fleet. Long Cay, covered in dense coastal vegetation, hosts one of the most photographed flamingo colonies in the Caicos, alongside egrets and frigatebirds. Both islets fall within the Admiral Cockburn Land and Sea National Park. Long Cay's shallow, crystalline waters are ideal for snorkeling, with seagrass meadows frequented by manatees and an exceptional population of parrotfish.",
        "experience": "Private gourmet picnic on Long Cay's white sand beach with an onboard chef, followed by guided snorkeling in the manatee seagrass beds. Flamingo observation from a discreet floating platform anchored at the mangrove's edge. Sunset return aboard a luxury catamaran with rosé champagne."
      },
      {
        "name": "Admiral's Aquarium — Historic Natural Reef",
        "meta": "Protected since 1992 · Yacht access",
        "desc": "Admiral's Aquarium is an exceptionally rich shallow reef immediately offshore from Cockburn Harbour, within the waters of the Admiral Cockburn Land and Sea National Park. Its name honors Admiral Sir George Cockburn, the 19th-century British naval figure for whom the port and park are named. Divers and snorkelers find some of the highest densities of tropical reef fish in the Caicos, in clear water with 65 to 100 feet of visibility. The reef has sustained South Caicos fishing families for generations, central to the island's maritime identity.",
        "experience": "Paired snorkeling or diving session with a marine biologist from the Caribbean Marine Institute, with real-time species identification via waterproof tablet. Lunch aboard a nearby anchored catamaran with conch carpaccio and local lobster salad. Presentation of a coral head sponsorship certificate in the client's name."
      },
      {
        "name": "St. George's Anglican Church — Colonial Church of Cockburn Harbour",
        "meta": "c. 1840 – 1860 · Yacht access",
        "desc": "St. George's Anglican is South Caicos's principal religious building, built of local coral limestone at the height of the salt industry. Its white bell tower, visible from the sea, doubled as a navigational landmark for schooner captains approaching port. The interior retains mahogany pews, period stained glass, and memorial plaques to the great Bermudian salt-trading families. The church has long anchored the community's annual Regatta celebrations, inaugurated in 1967 to commemorate the 1966 royal visit. Its adjoining cemetery holds generations of salt merchants and sailing captains.",
        "experience": "Private tour with the pastor and parish archivist, followed by an a cappella gospel concert performed exclusively for the group by the local choir. Access to the original parish registers dating to the 1860s — birth, marriage, and death records of the island's salt families. Dinner in the community hall featuring traditional South Caicos creole cuisine."
      },
      {
        "name": "Belle Sound (Bell Sound) — Manatee Bay and Fishing Heritage",
        "meta": "18th – 20th century · Shallow draft only — max 4 ft",
        "desc": "Belle Sound is a broad, protected shallow lagoon on the western flank of South Caicos, designated a nature reserve for its seagrass meadows and populations of manatees, sea turtles, and shorebirds. Through the centuries of the salt era, these calm waters served as a mooring ground for the dugout canoes and small fishing boats of the salt workers. South Caicos fishermen, regarded as the most skilled in the entire archipelago, used these waters for trap and trolling fishing of Caribbean spiny lobster and queen conch. The seagrass beds of turtle grass (Thalassia testudinum) form one of the best-preserved ecosystems in the British Antilles.",
        "experience": "Sunrise clear-kayak excursion across Belle Sound, guided by a marine naturalist, observing manatees and seahorses in the seagrass beds. Gourmet bivouac on an emergent sandbar with a nautical brunch served on a floating table. Accompanied free-diving snorkel through the seagrass meadows with a naturalist."
      },
      {
        "name": "South Caicos Lighthouse and the Convair CV-440 Wreck",
        "meta": "1890 / 1978 · Yacht access",
        "desc": "South Caicos Lighthouse, built in 1890 on the island's southeastern point, guided salt schooners through the treacherous channel of the Caicos Bank. Its continuous white beam, visible at a 15-meter focal range, served as the final landmark before open sea. A short distance offshore, the wreck of a twin-engine Convair CV-440, which went down in 1978 in 56 feet of water, has become one of the most accessible wreck dive sites in the Turks and Caicos. Together — one protective, one fallen — the lighthouse and the wreck capture the historic danger of these waters and South Caicos's role as a commercial port.",
        "experience": "Sunset cocktails on the rocky outcrop at the lighthouse's base, overlooking the Atlantic horizon, followed by an exclusive night dive on the Convair wreck with a PADI divemaster. Historical briefing on the 1978 crash and the lighthouse's history, illustrated with period nautical charts. Presentation of a framed underwater photograph of the wreck, taken by the onboard photographer."
      }
    ]
  },
  {
    "key": "west-caicos",
    "name": "West Caicos",
    "items": [
      {
        "name": "Yankee Town — Abandoned City of the Sisal Era",
        "meta": "1891 – 1916 · Yacht access",
        "desc": "Yankee Town is among the best-preserved historic sites in the entire Turks and Caicos archipelago. Founded by the West Caicos Sisal Company in 1891 on the site of an earlier 1860s salt venture, this industrial outpost comprised seven cut-stone buildings, cisterns, wells, worker barracks, and fiber-processing workshops. Its brief lifespan — barely a decade of intense activity before abandonment in 1903 — gives it the striking quality of a sealed time capsule. The open-air ruins, overrun by wild sisal and nesting ospreys, stand as one of the finest pieces of industrial archaeology in the Caribbean. The site is protected, and removal of artifacts is strictly prohibited.",
        "experience": "Private guided exploration with an archaeologist affiliated with the Turks and Caicos National Museum, with exclusive access to the excavation photographic archives. Gourmet lunch served on the adjacent beach overlooking the ruins, prepared aboard the yacht. Holographic tablet reconstruction of Yankee Town circa 1900. Tour of the decortication workshops with a demonstration of the original machinery still on site."
      },
      {
        "name": "The Burrell Steam Traction Engine — Iron Hercules of Yankee Town",
        "meta": "c. 1900 – 1904 · Yacht access",
        "desc": "The centerpiece of the Yankee Town site, the Burrell steam traction engine (double-crank, 6–7 NHP) is among the best-preserved Victorian steam machines in the Antilles. Weighing roughly 12 tons, it was commissioned to haul loads of sisal leaf across the island — persistent island legend holds it was delivered to West Caicos by mistake, originally bound for the mainland \"West Indies.\" Its 1904 manufacture date suggests it arrived just as Yankee Town was already in decline, which would explain its exceptional state of preservation through minimal use. Designated a historic monument by Turks and Caicos authorities, it is untouchable and priceless.",
        "experience": "Private sunrise photography session around the locomotive with an internationally recognized wildlife and industrial photographer. Continental breakfast served on the shore by the yacht crew. Onboard video presentation on the history of Charles Burrell & Co. and the mystery of the engine's delivery. Presentation of a framed, gallery-format photographic print."
      },
      {
        "name": "Narrow-Gauge Railway and Lake Catherine Causeway",
        "meta": "1891 – 1916 · Yacht access",
        "desc": "The narrow-gauge railway causeway crossing Lake Catherine is one of the most unusual pieces of 19th-century industrial infrastructure in the Caribbean. Built on a limestone embankment with stamped steel sleepers — a more modern technique than the timber ties used on East Caicos — the line carried donkey-drawn wagons hauling sisal leaf from the eastern fields to the Yankee Town workshops in the west. The stamped rails and sleepers remain partially in place, crossing several hundred meters through the middle of the lagoon — a surreal sight on an otherwise untouched island.",
        "experience": "Private walk along the historic causeway with an expert guide to the center of the lake, followed by flamingo observation from the rail line using a high-precision birding scope. Aged local rum tasting on the causeway at sunset, with nautical lanterns lit for the occasion. Exclusive access to a private collection of West Caicos Sisal Company tokens (numismatic reproductions). Return by catamaran at dusk."
      },
      {
        "name": "Lake Catherine — Nature Reserve and Colonial-Era Salt Works",
        "meta": "17th – 20th c. · Inland lake — no direct access",
        "desc": "Lake Catherine is a vast brackish lagoon occupying the heart of West Caicos, designated a national conservation zone. Its shores host one of the country's largest flamingo colonies, direct descendants of the birds Captain John White of the Roanoke expedition observed and illustrated when he passed through in 1587. In the 1850s, the Belle Isle Salt Manufacturing Company attempted to exploit the lake's salt potential, leaving behind dykes and canals now invisible beneath the vegetation. The purity of its water, the richness of its wildlife, and its total isolation make it one of the best-preserved lacustrine habitats in the British Antilles.",
        "experience": "Private flamingo observation at dawn from a timber platform installed the evening before by the guides, with an ornithologist and long-lens camera provided. Outdoor brunch served facing the lake. Introduction to identifying endemic species — iguanas, land crabs, Caribbean scorpions — with an accredited naturalist."
      },
      {
        "name": "Historic Sisal Shipping Dock and Abandoned Salt Pans",
        "meta": "1860s – 1916 · Yacht access",
        "desc": "On Yankee Town's ironshore coastline, the remains of the stone dock once used to load sisal bales onto schooners bound for New York are nearly invisible from the sea, fused into the coralline limestone. Archaeological studies reveal the dock originally extended well beyond its current visible footprint, traced today by a series of dark submerged patches beneath the water. Nearby, the old salt pans of the Belle Isle Salt Manufacturing Company (1863) remain frequented by flamingos whose ancestors survived every aborted industrial venture on the island. Together, this dock and salina pairing embody the two successive industries that attempted to settle West Caicos.",
        "experience": "Guided snorkel along the submerged dock with an underwater archaeologist, observing the submerged stone structures and protected artifacts in situ. Countryside lunch on the shore prepared by the yacht's chef, overlooking the flamingo-filled salt pans. Sunset talk on the diplomatic correspondence between the American consul and Washington (1863) that reveals the origin of the name Yankee Town."
      },
      {
        "name": "Molasses Reef Wreck — The Oldest Excavated European Ship in the New World",
        "meta": "c. 1513 · Yacht access",
        "desc": "The Molasses Reef wreck, located between French Cay and West Caicos on the southern edge of the Caicos Bank, is universally recognized as the oldest excavated European vessel in the Western Hemisphere. A probable Spanish caravel, it sank around 1513 carrying armaments, tools, and ceramics. Excavated over eight years by the Institute of Nautical Archaeology under Donald Keith, the site no longer shows visible timber structure — entirely consumed by shipworm — but the recovered cannonballs, anchors, and metal fittings are on display at the Turks and Caicos National Museum in Grand Turk. The reef itself is today a dive and snorkel destination of exceptional beauty, with visibility exceeding 100 feet.",
        "experience": "Exclusive paired dive on Molasses Reef with an IANTD-certified nautical archaeologist, followed by an onboard talk on the 1982–1989 excavation illustrated with the original Institute of Nautical Archaeology reports. Gourmet lunch served aboard, anchored over the reef. Next-day visit to the Turks and Caicos National Museum to see the recovered artifacts. Priority access to previously unpublished excavation photographic archives."
      },
      {
        "name": "Maravedí Cove — Pre-Columbian and 16th-Century Spanish Site",
        "meta": "c. 700 AD – 16th c. · Yacht access",
        "desc": "Maravedí Cove, set into the ironshore of West Caicos's west coast, is an archaeological site of exceptional stratified importance: Lucayan pottery fragments from the island's pre-Columbian inhabitants, a Spanish copper coin of the \"Carlos y Juana\" series (minted between 1542 and 1558 in Santo Domingo), and 19th-century rock carvings have all been found within a single small perimeter. This five-century human palimpsest — Lucayan islanders, Spanish salt-seeking navigators, shipwreck survivors, and passing sailors — is documented by the Turks and Caicos National Museum. Natural freshwater pools in the limestone offered a precious resource to sailors. Author Peter Benchley drew on West Caicos for his 1979 novel Island, whose haunting atmosphere finds its truest expression here.",
        "experience": "Private archaeological tour with Grethe Seim, or a successor designated by the TC Museum, tracing the discoveries layer by layer with an on-site projected photographic reconstruction. Tasting of reconstructed Lucayan cuisine, prepared from historic recipes, served in the cove. Optional dive on the adjacent wall site, accompanied by an underwater archaeologist guide."
      },
      {
        "name": "Spanish Anchor — A 17th-Century Galleon's Anchor",
        "meta": "17th century · Yacht access",
        "desc": "The Spanish Anchor dive site, on West Caicos's western wall, holds a monumental galleon anchor embedded in the reef at 72 feet, encrusted in colorful coral and sponges. The sole surviving trace of a lost colonial ship — whose wreck was never documented — the anchor stands as a silent record of the Spanish maritime routes that crossed these waters for centuries, between Havana, Seville, and Santo Domingo. Divers following the path to the anchor pass through a dramatic swim-through before emerging onto the vertical wall. Seahorses, frogfish, and spotted drums shelter in the surrounding crevices.",
        "experience": "Private paired dive on the Spanish anchor with a divemaster expert in underwater archaeology, followed by a tasting of aged colonial-era Cuban rum (1970s vintage) aboard the yacht, anchored outside the park boundary. Presentation of historic cartographic archives tracing the 16th- and 17th-century Spanish routes through Turks and Caicos. Professional framed photographic print of the anchor."
      },
      {
        "name": "Remains of the Ritz-Carlton Molasses Reef Project — 21st-Century Industrial Heritage",
        "meta": "2006 – 2021 · Yacht access",
        "desc": "The West Caicos Reserve, developed under the Ritz-Carlton Reserve brand, was one of the most ambitious resort developments attempted in the Caribbean in the early 21st century: 125 luxury villas, a 125-room resort, a spa, and a private marina basin, financed by Lehman Brothers. The bank's collapse in September 2008 halted construction overnight, leaving an untouched island scattered with unfinished infrastructure. The resort buildings were carefully demolished in 2021, but the marina basin with its docks, the airstrip, and certain foundations remain. This ultra-modern ruin — an ironic echo of every aborted industrial venture on the island since 1850 — has become a symbol of West Caicos's resilience against human ambition, and now features on the island's eco-historical circuits.",
        "experience": "Tour of the abandoned infrastructure guided by the original architect or developer, where available through private arrangement, with the resort's original architectural plans projected on site. Gourmet lunch served on a floating dock transformed into an exceptional dining table. Talk on the lessons of the Lehman Brothers collapse and the future of sustainable development in the Caicos. Sunset from the terrace of the last building left standing."
      },
      {
        "name": "West Harbour Bluff — Rock Carvings and Pirate Hideaway",
        "meta": "17th – 19th c. · Yacht access",
        "desc": "West Harbour Bluff, a limestone promontory on West Caicos's northwestern tip, holds rock inscriptions carved by sailors, pirates, and shipwreck survivors between the 17th and 19th centuries. Historical records confirm the presence of the French pirate Jean Thomas Dulaien, who established a base on the island, and West Caicos was regularly frequented by privateers exploiting its deserted coastline to restock freshwater and salt. A small coastal cave accessible at low tide holds natural freshwater pools that drew sailors for centuries. The site directly inspired Peter Benchley's atmosphere for his 1979 novel Island, adapted for film in 1980 with Michael Caine.",
        "experience": "Nighttime torch and lantern exploration of the rock inscriptions with a historian specializing in Caribbean piracy, followed by a themed pirate-era dinner aboard the yacht, anchored beneath the stars. A vivid retelling of Jean Thomas Dulaien's exploits with readings from archival documents. Low-tide access to the cave's natural freshwater pools, with an exclusive nighttime swim."
      }
    ]
  },
  {
    "key": "tobago",
    "name": "Tobago",
    "items": [
      {
        "name": "Fort King George Heritage Park",
        "meta": "Yacht access",
        "desc": "Perched 137 meters above Scarborough, Fort King George is Tobago's best-preserved colonial fort and one of the most complete in the Eastern Caribbean, a witness to the thirty-one times the island changed hands over two centuries. Its original cannons, still trained on the Atlantic, its officers' barracks converted into the Tobago Museum, its Bell Tank cistern, and its powder magazine form a remarkably cohesive military complex. The museum, housed in the former barrack guard house, traces the island's Amerindian presence, the slave trade, and its post-emancipation history through artifacts of the first order of rarity. The panoramic views from the ramparts sweep across the Atlantic, Bacolet Bay, and the windward coast for dozens of kilometers. Authorized in October 1777 by Governor Lord George Macartney; nearly completed by 1779; captured by the French in 1781 (renamed Fort Castries); retaken by the British in 1793; named Fort King George in honor of George III in 1804; abandoned in 1854; restored during the 20th–21st centuries.",
        "experience": "An exclusive evening tour with a costumed storyteller-guide, access to the condemned prisoners' cell and the powder magazine (normally closed to visitors), sunset champagne on the ramparts overlooking the Atlantic, and a steel-pan concert in the fort's inner courtyard."
      },
      {
        "name": "Fort James and the Courland Monument, Plymouth",
        "meta": "Yacht access",
        "desc": "Fort James, on the coral promontory of Plymouth overlooking Great Courland Bay, is Tobago's oldest fortified site, the legacy of the first Europeans to establish a lasting settlement on the island: the Couronians (Latvians), who founded the town of Jacobstadt here in 1642 — Tobago's first capital. The limestone ruins still bear the British royal 'GR' markings and the double Tudor rose carved into the stone. Two minutes' walk away stands the Courland Monument (1976), a modernist stele dedicated to the Latvian settlers and forming a singular historic link between the Caribbean and the Baltic. This Plymouth–Fort James–Monument triangle also holds the famous mystery tombstone of Betty Stiven, just a few meters away. Fort James: Couronian origins around 1642 (Latvian settlers from Courland, Tobago's first lasting European settlement); permanent British barracks in 1768; battery reinforced in 1777; captured by the French in 1781; current infrastructure dates to the early 19th century. Courland Monument: erected in 1976 to commemorate the 17th-century Couronian settlers.",
        "experience": "A tender arrival from the yacht directly within view of the cannons, a private guided tour with a historian specializing in the Couronian colonies, a Latvian-Creole sunset cocktail on the promontory, and the fascinating story of the Baltic settlers' fate in the tropical Americas."
      },
      {
        "name": "The Mystery Tombstone of Betty Stiven",
        "meta": "Yacht access",
        "desc": "In the Plymouth cemetery, an 18th-century tombstone bears an inscription that has puzzled historians, linguists, and cryptographers for two hundred and forty years: it reads that she was remarkable for being a mother without knowing it, and a wife without letting her husband know it, save through her kind indulgence toward him. Betty Stiven's exact identity, her connection to Tobago's Couronian, British, or French colonies, and the true meaning of the epitaph remain fascinating enigmas. This modest tomb has become one of Tobago's most visited landmarks, drawing journalists, academics, and mystery enthusiasts from around the world. Atlas Obscura has ranked it among the most intriguing sites in the Caribbean. Dated 1783; an enigmatic inscription carved on the tomb of a woman named Betty Stiven in Plymouth; an unsolved historical mystery for more than two centuries.",
        "experience": "An evening visit by torchlight with a storyteller-guide specializing in Caribbean folklore, a dramatized re-enactment of the leading historical theories, an aged Creole rum-punch aperitif served beside the tomb, and a reflection on the role of women in Caribbean colonial society."
      },
      {
        "name": "Arnos Vale — Water Wheel and Sugar Estate",
        "meta": "Yacht access",
        "desc": "The Arnos Vale water wheel, a remnant of a Victorian-era sugar estate tucked into a lush valley on Tobago's Caribbean coast, is one of the few stone water wheels from the slavery era still standing in the Lesser Antilles. Its moss-covered stones and rusted gears, wrapped in tropical vegetation, evoke with poetic intensity the labor of the enslaved workers who built the island's fortunes. The former estate also includes a contemporary eco-sanctuary with medicinal-plant gardens, streams, and secondary forest, offering a striking transition between colonial history and untamed nature. The Arnos Vale reef, just offshore, ranks among Tobago's most popular dive sites. Sugar estate established in the 18th century; stone water wheel built around 1857 to crush sugarcane; designated a heritage monument by the National Trust; adjacent nature reserve and eco-sanctuary.",
        "experience": "A landing from the yacht directly onto Arnos Vale beach, a private tour of the water wheel with an industrial archaeologist, luxury snorkeling on the reef (among the best-preserved in Tobago), and a tropical lunch at the adjacent Adventure Farm & Nature Reserve restaurant."
      },
      {
        "name": "Tobago Museum (Barrack Guard House, Fort King George)",
        "meta": "Yacht access",
        "desc": "The Tobago Museum, housed in the venerable barrack guard house of Fort King George, is the island's principal repository of material history, spanning from the earliest Amerindians to the postcolonial era. Its collections include Arauquinoid and Saladoid pottery, rare colonial maps, 18th- and 19th-century military weapons and uniforms, documents on the slave trade, and an impressive series of period photographs. An exhibit on natural history and the island's endemic flora and fauna rounds out the picture of an island whose heritage riches remain vastly underappreciated. The recently renovated conservation and curation make this museum a regional reference point for research on Eastern Caribbean history. Building constructed within the Fort King George complex (late 18th–early 19th century); converted into a museum within the former barrack guard house; the permanent collection was inaugurated as part of the fort's 20th-century restoration.",
        "experience": "A private after-hours tour with the museum's curator, guided hands-on viewing of original artifacts, a presentation of pieces held in storage and not on public display, heritage coffee served in the barracks courtyard overlooking the cannons, and access to the colonial photographic archive."
      },
      {
        "name": "Main Ridge Forest Reserve (the Oldest Protected Reserve in the Western Hemisphere)",
        "meta": "No yacht access",
        "desc": "The Main Ridge Forest Reserve, Tobago's green backbone spanning 3,937 hectares, is the oldest legally protected forest in the Western Hemisphere and, according to Scientific American, one of humanity's earliest acts of environmental conservation. Proclaimed in 1776 at the initiative of British parliamentarian Soame Jenyns after eleven years of lobbying, it predates the creation of Yellowstone by more than a century. Its trails wind through primary rainforest home to 261 bird species, including the white-tailed sabrewing hummingbird (an endangered endemic species) and the Bloody Bay poison frog (endemic). Inscribed in UNESCO's Man and the Biosphere Programme in 2020, it represents conservation in its purest form. Established by an ordinance of the British Parliament on April 13, 1776 — the same year as the American Declaration of Independence — to 'attract the frequent rains on which the fertility of the land depends'; declared a UNESCO Biosphere Reserve in 2020; its 250th anniversary was celebrated in April 2026.",
        "experience": "A private dawn hike with a certified ornithologist, a search for the white-tailed sabrewing hummingbird (an extremely rare species found nowhere else in the world), a tropical breakfast in the primary forest, a visit to the reserve's biodiversity center, and a luxury 4x4 transfer from the anchorage."
      },
      {
        "name": "Speyside — Sugar Estate and Water Wheel",
        "meta": "Yacht access",
        "desc": "Speyside, a picturesque village on Tobago's windward coast, preserves the ruins of an 18th-century sugar estate, its imposing stone water wheel still standing amid the community gardens. This corner of the island, the last to be colonized and among the first to develop agrotourism, saw a succession of Barbadian, Georgian, and Scottish owners who built their fortunes on sugar and rum. Speyside is world-renowned today for its crystal-clear waters and its dives at Little Tobago and Angel Reef, but its colonial ruins add a fascinating historical dimension. Jemma's Treehouse Restaurant, perched in a tropical almond tree, is the perfect spot for lunch overlooking the water wheel ruins. Land in the area was purchased by William Nash in April 1768 (500-acre parcels); the Speyside Estate operated until 1862; the water wheel was built to crush sugarcane; the ruins are designated by the National Trust.",
        "experience": "A tender arrival at the Speyside jetty from the yacht, a guided tour of the estate ruins with a local historian, private diving at Angel Reef (one of the best-preserved reefs in the Caribbean), a gourmet Creole lunch at Jemma's Treehouse overlooking the bay, and a transfer by traditional boat to Little Tobago (a bird sanctuary)."
      },
      {
        "name": "The Kimme Museum (Kimme Museum Institute)",
        "meta": "No yacht access",
        "desc": "The Kimme Museum is the life's work and home of an extraordinary German artist, Luise Kimme, who left Europe to devote herself to Tobago, infusing her monumental tropical-wood sculptures with Yoruba mythology, Caribbean dance, and Hindu deities she observed over thirty years on the island. Her swirling figures, some rising several meters tall, emerge from the gardens of her estate above the Mount Irvine golf course like a forest of spirits. This one-of-a-kind museum — part studio, part jungle, part sanctuary — offers one of the most original and intimate artistic experiences in the Caribbean, accessible only by appointment for private visits. Since Kimme's death, preserving her body of work has become a heritage priority for Tobago. Founded by German sculptor Luise Kimme (1939–2013), who settled in Tobago in 1979; the museum-studio gradually opened to the public beginning in the 1990s; Luise Kimme lived and worked on the island until her death in 2013; the permanent collection remains accessible.",
        "experience": "An exclusive private tour of the museum-garden with the curator of Kimme's work, a viewing of the monumental tropical-wood sculptures in the morning light, access to Luise Kimme's studios and previously unpublished notebooks, a talk on contemporary Caribbean art, and an aperitif in the tropical gardens."
      },
      {
        "name": "Buccoo Reef and the Nylon Pool",
        "meta": "Yacht access",
        "desc": "Buccoo Reef, designated a wetland of international importance under the Ramsar Convention, is one of the world's last great living coral complexes, sheltering extraordinary marine biodiversity across its 457 hectares. Just offshore, the Nylon Pool is a shallow natural sea pool (less than a meter deep) with iridescent turquoise water, whose calcareous sediments have been prized for centuries for their supposed therapeutic and rejuvenating properties — a legend popularized by visits from royal dignitaries. Tobago's maritime history is inseparable from this reef, which guided, and sometimes wrecked, colonial ships bound for Scarborough. The reef's growing vulnerability to climate change also makes it one of the most iconic, and most threatened, dive sites in the Caribbean. A coral reef documented as early as the 18th century during British colonization; the Nylon Pool (a shallow sandbank in the sea) has been celebrated since 20th-century royal visits, including that of Princess Margaret in 1962; a protected Ramsar wetland site.",
        "experience": "A private glass-bottom boat cruise with a certified marine naturalist guide, exclusive snorkeling before public hours (at sunrise), a luxurious dip in the Nylon Pool with champagne served at sea, and an account of the reef's maritime history from the Kalinago to the British cartographers."
      },
      {
        "name": "Argyle Waterfall and Tobago's Natural Heritage Cascade",
        "meta": "Yacht access",
        "desc": "Argyle Falls, Tobago's tallest waterfall (roughly 54 meters across three successive pools), is nestled in primary forest on the windward coast, reached via a thirty-minute trail through lush tropical vegetation. The falls were considered sacred by the descendants of enslaved Africans, who carried on purification rituals in its pure, cool pools during the 19th century, giving rise to a syncretism between Yoruba beliefs and Catholic practices that persists in the region today. The site is now part of the UNESCO Northeast Tobago Biosphere Reserve (2020), ensuring its long-term protection. Endemic wildlife — glass frogs, rare butterflies, crested birds — reveals itself at every turn of the trail. A natural site on the Argyle River, Tobago's windward coast; mentioned in planters' records as early as the 18th century as a sacred site for enslaved and freed people; protected under the Main Ridge Forest Reserve (1776) and UNESCO buffer zones (2020).",
        "experience": "An exclusive private hike with a naturalist guide and local porters (no bags to carry), a private swim in the upper falls pool before tourists arrive at dawn, a yoga or meditation session beside the cascades, an organic, locally sourced gourmet picnic served in the forest, and an air-conditioned 4x4 transfer from the anchorage."
      }
    ]
  }
];
