export default function ThreeColumnFeatures({ title, features = [] }) {
  return (
    <section className="py-16 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {f.icon && <div className="mb-4">{f.icon}</div>}
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-500">{f.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
