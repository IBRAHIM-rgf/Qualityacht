export default function TimelineSection({ title, events = [] }) {
  return (
    <section className="py-16 px-4 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <div className="relative border-l-2 border-gray-300 pl-8">
          {events.map((e, i) => (
            <div key={i} className="mb-10 relative">
              <div className="absolute -left-5 top-1 w-4 h-4 bg-black rounded-full border-2 border-white" />
              <div className="font-bold text-lg">{e.year}</div>
              <div className="text-gray-600">{e.text}</div>
              {e.image && (
                <img src={e.image} alt={e.year} className="w-24 h-24 object-cover rounded mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
