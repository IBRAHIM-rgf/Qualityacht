// src/components/DestinationPage.jsx

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, MapPin, Anchor, Waves } from 'lucide-react';

export default function DestinationPage({
  title,
  subtitle,
  heroImage,
  description,
  regions,
  highlights,
  destinationSlug,
}) {
  return (
    <div className="min-h-screen bg-[#1a1b1e]">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px]">
        <Image
          src={heroImage}
          alt={`${title} Luxury Yacht Charter`}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#1a1b1e]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#C0C0C0]">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="absolute bottom-8 left-8">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-[#B03E00] transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/charters/destinations" className="hover:text-[#B03E00] transition">Destinations</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#B03E00]">{title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Description */}
        <div className="prose prose-invert prose-lg max-w-none mb-20">
          <div className="text-[#C0C0C0] leading-relaxed space-y-6">
            {description.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? "text-xl" : "text-lg text-gray-300"}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon || MapPin;
              return (
                <div
                  key={index}
                  className="bg-[#2e2f32] border border-white/10 rounded-2xl p-8 text-center hover:border-[#B03E00]/30 transition-all"
                >
                  <IconComponent className="w-12 h-12 text-[#B03E00] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#C0C0C0] mb-2">{highlight.title}</h3>
                  <p className="text-gray-400">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Regions */}
        {regions && regions.length > 0 && (
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-[#C0C0C0] mb-12 text-center">
              Explore {title} Regions
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {regions.map((region, index) => (
                <div
                  key={index}
                  className="bg-[#2e2f32] border border-white/10 rounded-2xl overflow-hidden hover:border-[#B03E00]/30 transition-all group"
                >
                  <div className="relative h-64">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2e2f32] via-transparent to-transparent z-10" />
                    {region.image ? (
                      <Image
                        src={region.image}
                        alt={region.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#B03E00]/20 to-[#9333ea]/20" />
                    )}
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#C0C0C0] mb-4 group-hover:text-[#B03E00] transition">
                      {region.name}
                    </h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {region.description}
                    </p>

                    {region.islands && region.islands.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {region.islands.map((island, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-[#3a3b3f] border border-white/20 rounded-lg text-sm text-gray-300"
                          >
                            {island}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/yachts?destination=${region.slug || region.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center gap-2 text-[#B03E00] hover:text-[#B03E00]/80 transition font-medium"
                    >
                      View Available Yachts
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#B03E00]/10 to-[#9333ea]/10 border border-[#B03E00]/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#C0C0C0] mb-6">
            Ready to Explore {title}?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our exclusive collection of luxury yachts available for charter in {title.toLowerCase()}'s most prestigious destinations.
          </p>
          <Link
            href={`/yachts?destination=${destinationSlug}`}
            className="inline-block bg-[#B03E00] hover:bg-[#B03E00]/90 text-white px-8 py-4 rounded-xl font-medium transition text-lg"
          >
            Browse {title} Yachts
          </Link>
        </div>
      </div>
    </div>
  );
}
