// Calendrier des regates aux Bahamas 2026, par zone de charter (fichier client
// « bahamas_regatta_calendar_2026_by_zone.html », 2026-10-09). Textes repris tels quels.

export const BAHAMAS_REGATTA_TYPES = ['Traditional Sloop', 'Open Regatta', 'Offshore Race', 'International', 'Youth'];

export const BAHAMAS_REGATTA_ZONES = [
  {
    "id": "exuma",
    "title": "Exumas",
    "sub": "Elizabeth Harbour · Staniel Cay · George Town · Stocking Island",
    "events": [
      {
        "name": "Steventon, Harts & Roker's Point Regatta",
        "loc": "Great Exuma",
        "dates": "Early January 2026",
        "type": "Traditional Sloop",
        "level": "Beginner",
        "boats": "Bahamian wooden sloops (Class C & E)",
        "audience": "Local sailors & community",
        "desc": "Season opener in the Exumas. Small community regatta in the settlements of Steventon, Harts and Roker's Point on Great Exuma. Live music, Bahamian food, family atmosphere.",
        "course": [
          "Short coastal courses off Great Exuma",
          "Class C & E sloop races"
        ],
        "url": "https://www.bahamas.com"
      },
      {
        "name": "Farmer's Cay Regatta",
        "loc": "Little Farmer's Cay, Exuma Cays",
        "dates": "Early February 2026",
        "type": "Traditional Sloop",
        "level": "Beginner to Medium",
        "boats": "Bahamian wooden sloops (Class C)",
        "audience": "Local sailors & visitors",
        "desc": "One of the most beloved small-island regattas. Takes place during the First Friday in February festival at Little Farmer's Cay — a tiny settlement with outsized energy. Traditional sloop racing, fire dancing, and Bahamian barbecue.",
        "course": [
          "Coastal sloop courses off Farmer's Cay",
          "Class C races in the Exuma Cays"
        ],
        "url": "https://www.bahamas.com"
      },
      {
        "name": "George Town Cruising Regatta",
        "loc": "Stocking Island & Elizabeth Harbour",
        "dates": "February 2026",
        "type": "Open Regatta",
        "level": "Beginner to Medium",
        "boats": "Cruising yachts of all types",
        "audience": "Charter sailors & cruisers",
        "desc": "Annual cruiser event based at Stocking Island, next to the legendary Chat 'n Chill beach bar. Fun races, dinghy contests, and a true off-the-beaten-path vibe in Elizabeth Harbour.",
        "course": [
          "Inshore courses in Elizabeth Harbour",
          "Dinghy races around Stocking Island"
        ],
        "url": "https://www.bahamas.com"
      },
      {
        "name": "National Family Island Regatta",
        "loc": "Elizabeth Harbour, George Town, Great Exuma",
        "dates": "Late April 2026",
        "type": "Traditional Sloop",
        "level": "High (competitive)",
        "boats": "Bahamian wooden sloops — Classes A, B, C, D, E (wood-built in Bahamas, Egyptian cotton sails)",
        "audience": "All of the Bahamas + international visitors",
        "desc": "THE flagship event. The oldest and largest wooden sloop regatta in the Bahamas, held every year since 1954. George Town transforms into the nation's biggest sailing carnival: 60–77 sloops, a dozen islands represented, prize money, cultural shows, parades, Junkanoo and live music every night. The pry board (human ballast plank) is iconic.",
        "course": [
          "Multiple aller-retour courses on Elizabeth Harbour",
          "Classes A–E race on separate days",
          "Windward marks and leeward gates off George Town waterfront"
        ],
        "url": "https://www.bahamas.com/events/national-family-island-regatta"
      },
      {
        "name": "Bahamas Optimist National Championship",
        "loc": "Elbow Cay, Abaco (Exuma hub)",
        "dates": "Oct 1–4, 2026",
        "type": "Youth",
        "level": "Medium (youth competitive)",
        "boats": "Optimist dinghies",
        "audience": "Young Bahamian sailors",
        "desc": "The national youth championship for Optimist class, hosted by Hope Town Junior Sailing on Elbow Cay. Key development event for the next generation of Bahamian sailors.",
        "course": [
          "Windward-leeward buoy courses",
          "Elbow Cay, Abacos waters"
        ],
        "url": "https://www.bahamas.com"
      }
    ]
  },
  {
    "id": "abacos",
    "title": "Abacos",
    "sub": "Marsh Harbour · Elbow Cay (Hope Town) · Green Turtle Cay · Great Guana Cay · Little Harbour",
    "events": [
      {
        "name": "Regattas in The Abacos",
        "loc": "Green Turtle Cay → Great Guana Cay → Marsh Harbour → Elbow Cay → Little Harbour",
        "dates": "June 20–28, 2026",
        "type": "Open Regatta",
        "level": "All levels",
        "boats": "Sailboats and powerboats of all sizes",
        "audience": "All sailors, families, spectators",
        "desc": "A week-long island-hopping regatta and festival through the most scenic cays of the Abacos. The event moves each day to a new venue — starting at Green Turtle Cay and finishing at Little Harbour. Live music, Bahamian cuisine, and a true community celebration at every stop.",
        "course": [
          "Green Turtle Cay (day 1)",
          "Great Guana Cay (day 2)",
          "Marsh Harbour (day 3)",
          "Elbow Cay / Hope Town (day 4)",
          "Little Harbour (day 5+)"
        ],
        "url": "https://www.bahamas.com/events/regattas-in-the-abacos"
      },
      {
        "name": "Annual Racing Time in Abaco (All Abaco Sailing Regatta)",
        "loc": "Marsh Harbour, Great Abaco",
        "dates": "July 2026 (week-long)",
        "type": "Traditional Sloop",
        "level": "Medium",
        "boats": "American sloops + Bahamian sloops",
        "audience": "Local sailors & sailing enthusiasts",
        "desc": "A weeklong regatta featuring primarily American sloops — a unique class rarely seen elsewhere. Draws dozens of enthusiasts to the Abacos to witness these distinctive vessels compete.",
        "course": [
          "Coastal courses off Marsh Harbour",
          "Races around Elbow Cay and Man-O-War Cay"
        ],
        "url": "https://www.bahamas.com"
      },
      {
        "name": "All Abaco Sailing Regatta",
        "loc": "Abaco",
        "dates": "September 2026",
        "type": "Traditional Sloop",
        "level": "Medium",
        "boats": "Bahamian wooden sloops",
        "audience": "Local sailors",
        "desc": "End-of-season traditional sloop regatta in the Abacos. Celebrates Bahamian sailing heritage as the hurricane season winds down.",
        "course": [
          "Coastal sloop courses, Abaco Sea"
        ],
        "url": "https://www.bahamas.com"
      }
    ]
  },
  {
    "id": "nassau",
    "title": "Nassau / New Providence",
    "sub": "Nassau Harbour · Paradise Island · Nassau Yacht Club",
    "events": [
      {
        "name": "Nassau Ocean Race (Miami → Nassau)",
        "loc": "Government Cut, Miami → Nassau Harbour",
        "dates": "Feb 26–28, 2026",
        "type": "Offshore Race",
        "level": "High",
        "boats": "Offshore monohulls 30+ ft (IRC, PHRF)",
        "audience": "Advanced racers & offshore sailors",
        "desc": "One of the oldest ocean races in the western hemisphere, first held in 1934. Starts at Government Cut in Miami and finishes at the western entrance of Nassau Harbour, crossing the Gulf Stream. Record: 13h 31min. Known for its navigational challenge and the thrill of arriving in Nassau.",
        "course": [
          "Start: Government Cut, Miami",
          "Cross the Gulf Stream NE",
          "Round Great Isaac Light to port",
          "Round Ocean Cay mark to port",
          "Finish: Western entrance of Nassau Harbour"
        ],
        "url": "https://nassaucup.org"
      },
      {
        "name": "National Junior Sailing Regatta",
        "loc": "Nassau, New Providence",
        "dates": "February 2026",
        "type": "Youth",
        "level": "Youth competitive",
        "boats": "Optimist, Laser, small dinghies",
        "audience": "Young Bahamian sailors (national program)",
        "desc": "The national development regatta for youth sailors across all islands. Organized by the Bahamas National Sailing School — a key institutional event in the island's sailing calendar.",
        "course": [
          "Buoy and windward-leeward courses, Nassau waters"
        ],
        "url": "https://www.bahamas.com"
      }
    ]
  },
  {
    "id": "eleuthera",
    "title": "Eleuthera & Harbour Island",
    "sub": "Dunmore Town (Harbour Island) · Spanish Wells · North Eleuthera",
    "events": [
      {
        "name": "North Eleuthera Sailing Regatta",
        "loc": "Dunmore Town, Harbour Island / Spanish Wells",
        "dates": "October 2026 (mid-month)",
        "type": "Traditional Sloop",
        "level": "Medium",
        "boats": "Bahamian wooden sloops — Classes A, B, C",
        "audience": "Local sailors & visitors",
        "desc": "One of the largest traditional racing events in The Bahamas. Sloops race in the waters off North Eleuthera, Harbour Island and Spanish Wells. Onshore: church service, cultural shows, live band performances, Bahamian food and drinks every evening.",
        "course": [
          "Coastal sloop courses off Harbour Island (Bay Street waterfront)",
          "Classes A, B & C race in separate heats",
          "Spectators line the waterfront of Dunmore Town"
        ],
        "url": "https://tourismtoday.com/events/north-eleuthera-sailing-regatta"
      }
    ]
  },
  {
    "id": "andros",
    "title": "Andros & Berry Islands",
    "sub": "Morgan's Bluff (North Andros) · Fresh Creek · Mangrove Cay · Great Harbour Cay",
    "events": [
      {
        "name": "All Andros & Berry Islands Regatta",
        "loc": "Morgan's Bluff, North Andros",
        "dates": "July 2026 (annually, ~July 10–12)",
        "type": "Traditional Sloop",
        "level": "Beginner to Medium",
        "boats": "Bahamian wooden sloops — Classes A, B, C",
        "audience": "Local sailors, visitors from Berry Islands",
        "desc": "A two-day annual regatta combining sailors from Andros and the Berry Islands. Traditional wooden sloops race in three classes. Alongside the racing: Bahamian food stalls, live music and a genuine Out Islands homecoming atmosphere.",
        "course": [
          "Short coastal races off Morgan's Bluff, North Andros",
          "Windward-leeward courses in the Northwest Providence Channel area"
        ],
        "url": "https://bahamas.com/events/all-andros-and-berry-islands"
      }
    ]
  },
  {
    "id": "catlong",
    "title": "Cat Island & Long Island",
    "sub": "New Bight (Cat Island) · Salt Pond / Thompson Bay (Long Island)",
    "events": [
      {
        "name": "Long Island Regatta",
        "loc": "Salt Pond, Long Island",
        "dates": "Labor Day weekend, June 2026",
        "type": "Traditional Sloop",
        "level": "Medium to High",
        "boats": "Bahamian wooden sloops — Classes A, B, C (built on Long Island, Mangrove Bush)",
        "audience": "All Bahamas + sailing fans",
        "desc": "The second largest regatta in The Bahamas, right after the National Family Island. A major island fundraiser. Many of the competing sloops are built by hand right on Long Island in the settlement of Mangrove Bush. Shallow venue — Thompson Bay leaves just inches under most keels. Native mutton dishes, kids' corner, live bands.",
        "course": [
          "Aller-retour coastal courses, Salt Pond / Thompson Bay",
          "Classes A, B & C over multiple days",
          "Spectators watch from the shoreline and anchored yachts"
        ],
        "url": "https://tourismtoday.com/events/long-island-regatta"
      },
      {
        "name": "Long Island Mini Regattas",
        "loc": "Long Island",
        "dates": "Pre-season (spring 2026)",
        "type": "Traditional Sloop",
        "level": "All levels",
        "boats": "Bahamian wooden sloops (Class C)",
        "audience": "Local community",
        "desc": "A spin-off series leading up to the main Long Island Regatta. Smaller community races that serve as a festive warm-up with competitive sloop racing, music and local food.",
        "course": [
          "Short Class C sloop courses, Long Island coastline"
        ],
        "url": "https://tourismtoday.com/events/regattas-homecoming"
      },
      {
        "name": "Cat Island Regatta",
        "loc": "New Bight, Cat Island",
        "dates": "July 30 – Aug 4, 2026",
        "type": "Traditional Sloop",
        "level": "Medium",
        "boats": "Bahamian wooden sloops (traditional classes)",
        "audience": "Cat Island community & visitors",
        "desc": "A beloved cultural regatta on one of the most unspoiled islands of the Bahamas. So popular in 2026 that Bahamasair launched special direct flights Nassau → New Bight specifically for the event. Traditional sloop racing at the heart of a homecoming festival.",
        "course": [
          "Coastal sloop courses off New Bight, Cat Island",
          "Windward-leeward heats near the settlement waterfront"
        ],
        "url": "https://nomadlawyer.org/bahamasair-direct-flights-cat-island-regatta-2026"
      },
      {
        "name": "Long Island Sailing Club Regatta (Heroes Day)",
        "loc": "Long Island Sailing Club",
        "dates": "Oct 10–12, 2026",
        "type": "Traditional Sloop",
        "level": "All levels",
        "boats": "Bahamian wooden sloops (Class C & E)",
        "audience": "Local community & sailing fans",
        "desc": "National Heroes Day weekend regatta. Class C & E sloop sailing with food, drinks, live Bahamian performances and island vibes.",
        "course": [
          "Short coastal sloop courses, Long Island"
        ],
        "url": "https://www.bahamas.com"
      }
    ]
  },
  {
    "id": "bimini",
    "title": "Bimini",
    "sub": "North Bimini · South Bimini · Gun Cay",
    "events": [
      {
        "name": "Bimini Regatta",
        "loc": "Bimini",
        "dates": "Annual (dates TBC for 2026)",
        "type": "Traditional Sloop",
        "level": "Beginner to Medium",
        "boats": "Bahamian wooden sloops",
        "audience": "Local sailors & Miami-based visitors",
        "desc": "Annual sloop regatta on Bimini, the closest Bahamian island to Miami (48 nautical miles). Short getaway option for Florida-based sailors. Combined with the fishing culture that defines Bimini.",
        "course": [
          "Short coastal courses in Bimini waters",
          "Easy access from Miami for spectator day trips"
        ],
        "url": "https://www.bahamas.com"
      },
      {
        "name": "SORC Ocean Race (Fort Lauderdale → Bahamas loop)",
        "loc": "Fort Lauderdale, FL → Western Bahamas",
        "dates": "Nov 19–21, 2026",
        "type": "Offshore Race",
        "level": "High",
        "boats": "Offshore racing yachts (IRC, PHRF)",
        "audience": "Offshore racing fleet",
        "desc": "Season-opener for the SORC offshore circuit. Racers start and finish in Fort Lauderdale, sailing around a series of physical and virtual marks in the western Bahamas and the Florida east coast. A fun, accessible introduction to offshore Bahamas racing.",
        "course": [
          "Start/Finish: Fort Lauderdale",
          "Virtual & physical marks in western Bahamas",
          "Eastern Florida coastline marks"
        ],
        "url": "https://www.sorcsailing.org/sorc-ocean-race"
      }
    ]
  },
  {
    "id": "grandbah",
    "title": "Grand Bahama",
    "sub": "Freeport / Lucaya · Taino Beach",
    "events": [
      {
        "name": "Grand Bahama Sloop Regatta",
        "loc": "Taino Beach, Lucaya",
        "dates": "Annual (summer 2026, exact dates TBC)",
        "type": "Traditional Sloop",
        "level": "Medium",
        "boats": "Bahamian wooden sloops — Classes B & C",
        "audience": "Local sailors & Grand Bahama community",
        "desc": "Well-known Class B and C sloops from across the Bahamas compete off Taino Beach in Lucaya. Part of the national sloop regatta circuit, with the vibrant backdrop of the Freeport/Lucaya waterfront.",
        "course": [
          "Coastal sloop races off Taino Beach, Lucaya",
          "Classes B & C in separate heats"
        ],
        "url": "https://www.bahamas.com"
      }
    ]
  }
];
