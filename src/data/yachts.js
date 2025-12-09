// src/data/yachts.js

export const yachts = [
  {
    id: 1,
    name: "Majestic 80ft",
    description: "Yacht moderne avec intérieur luxueux, parfait pour croisières privées.",
    type: "motor",
    groupFriendly: true,
    petFriendly: false,
    destinations: ["mediterranean", "bahamas"],
    capacity: 25,
    guests: 25,
    cabins: 4,
    length: "80ft",
    pricePerHour: 3500,
    price: "25,000 €",
    year: 2018,
    refit: 2022,
    location: "mediterranean",
    available: true,
    image: "/images/yachts/yacht1.jpeg",
    images: [
      "/images/yachts/yacht1.jpeg",
      "/images/yachts/yacht1.jpeg",
      "/images/gridLosange/cheval.png"
    ]
  },
  {
    id: 2,
    name: "Ocean Pearl 60ft",
    description: "Idéal pour des sorties en famille ou entre amis.",
    type: "sail",
    groupFriendly: true,
    petFriendly: true,
    destinations: ["bahamas", "world-islands"],
    capacity: 15,
    guests: 15,
    cabins: 2,
    length: "60ft",
    pricePerHour: 2200,
    price: "15,000 €",
    year: 2015,
    refit: null,
    location: "bahamas",
    available: true,
    image: "/images/yachts/yacht1.jpeg",
    images: ["/images/yachts/yacht1.jpeg"]
  },
  {
    id: 3,
    name: "Corporate Mega Yacht 120ft",
    description: "Événements corporatifs, mariages et grandes fêtes privées.",
    type: "motor",
    groupFriendly: true,
    petFriendly: false,
    destinations: ["mediterranean", "doha"],
    capacity: 60,
    guests: 60,
    cabins: 8,
    length: "120ft",
    pricePerHour: 7500,
    price: "50,000 €",
    year: 2020,
    refit: null,
    location: "mediterranean",
    available: false,
    image: "/images/yachts/yacht1.jpeg",
    images: [
      "/images/yachts/yacht1.jpeg",
      "/images/gridLosange/cheval.png"
    ]
  }
];
