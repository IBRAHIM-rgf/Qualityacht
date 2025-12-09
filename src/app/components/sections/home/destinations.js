export default function Destinations() {
  const destinations = [
    "Monaco",
    "St Barth",
    "Cannes",
    "Ibiza",
    "Maldives",
    "Dubai",
  ];

  return (
    <section className="py-16 bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-semibold">{destination}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}