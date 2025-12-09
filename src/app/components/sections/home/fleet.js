export default function Fleet() {
  const fleetTags = [
    "On-demand",
    "Group Charter",
    "Pet-Friendly",
    "Accessible",
    "Sport Yachts",
    "Helicopter Yachts",
  ];

  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Types de Flotte</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {fleetTags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <button className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800">
          Voir toute la flotte
        </button>
      </div>
    </section>
  );
}