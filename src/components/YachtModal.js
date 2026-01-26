"use client";
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Share2, MapPin, Calendar, Users, BedDouble, Ruler, Map, Anchor, Ship } from 'lucide-react';
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
      <div className="bg-[#1a1a2e] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-800" />
        </button>

        {/* Image Gallery */}
        <div className="relative group">
          <div className="aspect-[16/9] bg-gray-200 overflow-hidden rounded-t-2xl">
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
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImage(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImage ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-[#C0C0C0]">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{yacht.name}</h2>
              {yacht.make && (
                <p className="text-lg text-gray-400 flex items-center gap-2">
                  <Ship className="w-5 h-5" />
                  {yacht.make}
                </p>
              )}
            </div>
            <div className="text-right">
              {yacht.pricePerHour && (
                <p className="text-2xl font-bold text-[#D4AF37]">{yacht.pricePerHour}</p>
              )}
              {yacht.pricePerHour && <p className="text-sm text-gray-400">per week</p>}
              {yacht.price && !yacht.pricePerHour && (
                <p className="text-2xl font-bold text-[#D4AF37]">{yacht.price}</p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-[#252540] rounded-xl">
            {yacht.length && (
              <div className="text-center">
                <Ruler className="w-6 h-6 mx-auto mb-2 text-[#D4AF37]" />
                <p className="text-lg font-semibold text-white">{yacht.length}</p>
                <p className="text-sm text-gray-400">Length</p>
              </div>
            )}
            {(yacht.guests || yacht.capacity) && (
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-[#D4AF37]" />
                <p className="text-lg font-semibold text-white">{yacht.guests || yacht.capacity}</p>
                <p className="text-sm text-gray-400">Guests</p>
              </div>
            )}
            {yacht.cabins && (
              <div className="text-center">
                <BedDouble className="w-6 h-6 mx-auto mb-2 text-[#D4AF37]" />
                <p className="text-lg font-semibold text-white">{yacht.cabins}</p>
                <p className="text-sm text-gray-400">Cabins</p>
              </div>
            )}
            {yacht.year && (
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-[#D4AF37]" />
                <p className="text-lg font-semibold text-white">{yacht.year}</p>
                <p className="text-sm text-gray-400">Built</p>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Location */}
            {yacht.location && (
              <div className="flex items-center gap-3 p-4 bg-[#252540] rounded-xl">
                <Map className="w-6 h-6 text-[#D4AF37]" />
                <div>
                  <p className="text-sm text-gray-400">Base Port</p>
                  <p className="text-white font-medium">{yacht.location}</p>
                </div>
              </div>
            )}

            {/* Refit Year */}
            {yacht.refit && (
              <div className="flex items-center gap-3 p-4 bg-[#252540] rounded-xl">
                <Anchor className="w-6 h-6 text-[#D4AF37]" />
                <div>
                  <p className="text-sm text-gray-400">Last Refit</p>
                  <p className="text-white font-medium">{yacht.refit}</p>
                </div>
              </div>
            )}

            {/* Type */}
            {yacht.type && (
              <div className="flex items-center gap-3 p-4 bg-[#252540] rounded-xl">
                <Ship className="w-6 h-6 text-[#D4AF37]" />
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="text-white font-medium capitalize">{yacht.type}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {yacht.description && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{yacht.description}</p>
            </div>
          )}

          {/* Destinations */}
          {yacht.destinations && yacht.destinations.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Destinations</h3>
              <div className="flex flex-wrap gap-2">
                {yacht.destinations.map((dest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#252540] rounded-full text-sm flex items-center gap-1"
                  >
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    {dest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="flex-1 bg-[#D4AF37] hover:bg-[#C4A030] text-black font-semibold py-3 px-6 rounded-xl transition-colors">
              Request Quote
            </button>
            <button className="p-3 bg-[#252540] hover:bg-[#353560] rounded-xl transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-3 bg-[#252540] hover:bg-[#353560] rounded-xl transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
