"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Users, BedDouble, Ruler, Map, Anchor, Ship } from 'lucide-react';
import { getAnkorImageUrl } from '@/lib/utils';

export default function YachtModal({ yacht, isOpen, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !yacht) return null;

  const images = Array.isArray(yacht.images)
    ? yacht.images.filter(Boolean).map(img => getAnkorImageUrl(img, '1280w'))
    : [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#2e2f32] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-800" />
        </button>

        {/* Image Gallery */}
        <div className="relative group p-4 pb-2">
          <div className="aspect-[16/9] bg-gray-200 overflow-hidden rounded-2xl">
            {images.length === 0 && (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
            )}
            {images.length > 0 && (
              <>
                <img
                  src={images[currentImage]}
                  alt={yacht.name || 'Yacht'}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-opacity"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-opacity"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/60 text-[#C0C0C0] text-sm font-medium px-3 py-1 rounded-lg">
                      {currentImage + 1}/{images.length}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-[#C0C0C0]">
          {/* Header - Name and Price */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#C0C0C0] mb-2">{yacht.name}</h2>
            {yacht.make && (
              <p className="text-lg text-gray-400 flex items-center gap-2 mb-2">
                <Ship className="w-5 h-5" />
                {yacht.make}
              </p>
            )}
            {/* Price under name - all in orange */}
            {(yacht.pricePerHour || yacht.price) && (
              <p className="text-xl font-bold text-[#f97316]">
                Price {yacht.pricePerHour || yacht.price}/week
              </p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-[#3a3b3f] rounded-xl">
            {yacht.length && (
              <div className="text-center">
                <Ruler className="w-6 h-6 mx-auto mb-2 text-[#f97316]" />
                <p className="text-lg font-semibold text-[#C0C0C0]">{yacht.length}</p>
                <p className="text-sm text-[#acb0cd]">Length</p>
              </div>
            )}
            {(yacht.guests || yacht.capacity) && (
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-[#f97316]" />
                <p className="text-lg font-semibold text-[#C0C0C0]">{yacht.guests || yacht.capacity}</p>
                <p className="text-sm text-[#acb0cd]">Guests</p>
              </div>
            )}
            {yacht.cabins && (
              <div className="text-center">
                <BedDouble className="w-6 h-6 mx-auto mb-2 text-[#f97316]" />
                <p className="text-lg font-semibold text-[#C0C0C0]">{yacht.cabins}</p>
                <p className="text-sm text-[#acb0cd]">Cabins</p>
              </div>
            )}
            {yacht.year && (
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-[#f97316]" />
                <p className="text-lg font-semibold text-[#C0C0C0]">{yacht.year}</p>
                <p className="text-sm text-[#acb0cd]">Built</p>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Location */}
            {yacht.location && (
              <div className="flex items-center gap-3 p-4 bg-[#3a3b3f] rounded-xl">
                <Map className="w-6 h-6 text-[#f97316]" />
                <div>
                  <p className="text-sm text-[#acb0cd]">Base Port</p>
                  <p className="text-[#C0C0C0] font-medium">{yacht.location}</p>
                </div>
              </div>
            )}

            {/* Refit Year */}
            {yacht.refit && (
              <div className="flex items-center gap-3 p-4 bg-[#3a3b3f] rounded-xl">
                <Anchor className="w-6 h-6 text-[#f97316]" />
                <div>
                  <p className="text-sm text-[#acb0cd]">Last Refit</p>
                  <p className="text-[#C0C0C0] font-medium">{yacht.refit}</p>
                </div>
              </div>
            )}

            {/* Type */}
            {yacht.type && (
              <div className="flex items-center gap-3 p-4 bg-[#3a3b3f] rounded-xl">
                <Ship className="w-6 h-6 text-[#f97316]" />
                <div>
                  <p className="text-sm text-[#acb0cd]">Type</p>
                  <p className="text-[#C0C0C0] font-medium capitalize">{yacht.type}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description - centered */}
          {yacht.description && (
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold text-[#C0C0C0] mb-3">Description</h3>
              <p className="text-[#acb0cd] leading-relaxed">{yacht.description}</p>
            </div>
          )}

          {/* Destinations - centered */}
          {yacht.destinations && yacht.destinations.length > 0 && (
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold text-[#C0C0C0] mb-3">Destinations</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {yacht.destinations.map((dest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#3a3b3f] rounded-full text-sm flex items-center gap-1"
                  >
                    <MapPin className="w-4 h-4 text-[#f97316]" />
                    {dest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8">
            <button className="w-full bg-orange-500/20 hover:bg-orange-500/30 rounded-xl p-4 border border-orange-700/50 flex items-center justify-center gap-3 transition-all shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)]">
              <Image
                src="/images/trans.png"
                alt="Qualityacht"
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="text-[#C0C0C0] text-sm font-medium">Request Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
