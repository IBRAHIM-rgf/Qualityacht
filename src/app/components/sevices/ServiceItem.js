import Image from "next/image";
import Link from "next/link";

export default function ServiceItem({ title, image, className, href }) {
  const content = (
    <div
      className="w-40 h-40 md:w-96 md:h-96 relative transform rotate-45 overflow-hidden"
      style={{
        boxShadow: "#ffffff4f 20px 19px 20px 0px",
        perspective: "1000px",
      }}
    >
      <div className="absolute inset-0 transform -rotate-45 scale-150">
        <Image src={image} alt={title.join(" ")} fill className="object-cover" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 transform -rotate-45">
        {title.map((word, index) => (
          <span
            key={index}
            className="text-[#C0C0C0] px-3 py-1 rounded-full pt-2 bg-black/40 text-sm md:text-4xl trajan-regular font-semibold tracking-wider"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`absolute ${className}`}>
      {href ? (
        <Link href={href} className="block hover:scale-105 transition-transform duration-300 ease-in-out">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
