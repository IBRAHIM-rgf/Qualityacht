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
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#C0C0C0] mb-2">{yacht.name}</h2>
              {yacht.make && (
                <p className="text-lg text-gray-400 flex items-center gap-2">
                  <Ship className="w-5 h-5" />
                  {yacht.make}
                </p>
              )}
            </div>
            <div className="text-right">
              {yacht.pricePerHour && (
                <p className="text-2xl font-bold text-[#f97316]">{yacht.pricePerHour}</p>
              )}
              {yacht.pricePerHour && <p className="text-sm text-gray-400">per week</p>}
              {yacht.price && !yacht.pricePerHour && (
                <p className="text-2xl font-bold text-[#f97316]">{yacht.price}</p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-[#3a3b3f] rounded-xl">
            {yacht.length && (
              <div className="text-center">
                <Ruler className="w-6 h-6 mx-auto mb-2 text-[#f97316]" />
                <p className="text-lg font-semibold text-[#C0C0C0]">{yacht.length}</p>
                <p className="text-sm text-gray-400">Length</p>
              </div>
            )}
            {(yacht.guests || yacht.capacity) && (
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-[#f97316]" />
                <p className="text-lg font-semibold text-[#C0C0C0]">{yacht.guests || yacht.capacity}</p>
                <p className="text-sm text-gray-400">Guests</p>
              </div>
            )}
            {yacht.cabins && (
              <div className="text-center">
                <BedDouble className="w-6 h-6 mx-auto mb-2 text-[#f97316]" />
                <p className="text-lg font-semibold text-[#C0C0C0]">{yacht.cabins}</p>
                <p className="text-sm text-gray-400">Cabins</p>
              </div>
            )}
            {yacht.year && (
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-[#f97316]" />
                <p className="text-lg font-semibold text-[#C0C0C0]">{yacht.year}</p>
                <p className="text-sm text-gray-400">Built</p>
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
                  <p className="text-sm text-gray-400">Base Port</p>
                  <p className="text-[#C0C0C0] font-medium">{yacht.location}</p>
                </div>
              </div>
            )}

            {/* Refit Year */}
            {yacht.refit && (
              <div className="flex items-center gap-3 p-4 bg-[#3a3b3f] rounded-xl">
                <Anchor className="w-6 h-6 text-[#f97316]" />
                <div>
                  <p className="text-sm text-gray-400">Last Refit</p>
                  <p className="text-[#C0C0C0] font-medium">{yacht.refit}</p>
                </div>
              </div>
            )}

            {/* Type */}
            {yacht.type && (
              <div className="flex items-center gap-3 p-4 bg-[#3a3b3f] rounded-xl">
                <Ship className="w-6 h-6 text-[#f97316]" />
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="text-[#C0C0C0] font-medium capitalize">{yacht.type}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {yacht.description && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#C0C0C0] mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{yacht.description}</p>
            </div>
          )}

          {/* Destinations */}
          {yacht.destinations && yacht.destinations.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#C0C0C0] mb-3">Destinations</h3>
              <div className="flex flex-wrap gap-2">
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

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="flex-1 relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-[#C0C0C0] font-semibold py-3 px-6 rounded-xl transition-all group">
              {/* Sparkle effects */}
              <span className="absolute top-1 left-4 w-1 h-1 bg-white rounded-full animate-ping opacity-75" style={{ animationDuration: '1.5s' }} />
              <span className="absolute top-2 right-8 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping opacity-60" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
              <span className="absolute bottom-2 left-12 w-1 h-1 bg-white rounded-full animate-ping opacity-50" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }} />
              <span className="absolute top-3 left-1/2 w-0.5 h-0.5 bg-yellow-100 rounded-full animate-ping opacity-70" style={{ animationDuration: '2.2s', animationDelay: '0.7s' }} />

              {/* Boat and text container */}
              <span className="relative flex items-center justify-center gap-2">
                {/* Animated boat - vue latérale */}
                <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-300">
                  <svg className="w-6 h-5" viewBox="0 0 32 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Coque du bateau */}
                    <path d="M2 14 L6 18 L26 18 L30 14 L24 14 L22 12 L10 12 L8 14 Z" fill="currentColor" opacity="0.3"/>
                    <path d="M2 14 L6 18 L26 18 L30 14" />
                    {/* Cabine */}
                    <rect x="14" y="8" width="8" height="4" rx="1" fill="currentColor" opacity="0.2"/>
                    <path d="M14 12 L14 8 L22 8 L22 12" />
                    {/* Mât et voile */}
                    <path d="M12 12 L12 2" />
                    <path d="M12 2 L12 10 L4 10 Z" fill="currentColor" opacity="0.15"/>
                    <path d="M12 2 L12 10 L4 10" />
                    {/* Drapeau */}
                    <path d="M12 2 L15 3.5 L12 5" fill="currentColor" opacity="0.4"/>
                    {/* Vagues animées */}
                    <path className="animate-pulse" style={{ animationDuration: '1.5s' }} d="M0 16 Q4 14 8 16 T16 16 T24 16 T32 16" strokeOpacity="0.4"/>
                  </svg>
                </span>
                {/* Rope connecting boat to text */}
                <span className="inline-block w-4 border-t-2 border-dashed border-white/50 group-hover:w-6 transition-all duration-300" />
                {/* Text */}
                <span className="tracking-wide">Request Quote</span>
              </span>

              {/* Wave effect at bottom */}
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            </button>
            <button className="p-3 bg-[#3a3b3f] hover:bg-[#4a4b4f] rounded-xl transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-3 bg-[#3a3b3f] hover:bg-[#4a4b4f] rounded-xl transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
