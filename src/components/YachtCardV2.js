// src/components/YachtCardV2.js

"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, MapPin, Calendar, Users, DollarSign, CheckCircle, XCircle, BedDouble, Ruler, Map } from 'lucide-react';
import Image from 'next/image';
import { getAnkorImageUrl } from '@/lib/utils';
import { formatLength } from '@/lib/unitConversion';

export default function YachtCardV2({ yacht }) {
  // Utilise getAnkorImageUrl pour chaque image
  const images = Array.isArray(yacht.images)
    ? yacht.images.filter(Boolean).map(img => getAnkorImageUrl(img, '1280w'))
    : [];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden flex flex-col text-[#C0C0C0]">
      {/* Image Carousel Container */}
      <div className="relative group mb-4">
        <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative flex items-center justify-center rounded-2xl">
          {images.length === 0 && (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
          )}
          {images.length === 1 && (
            <img
              src={images[0]}
              alt={yacht.name || 'Yacht'}
              className="w-full h-full object-cover"
            />
          )}
          {images.length > 1 && (
            <>
              <img
                src={images[currentImage]}
                alt={yacht.name || 'Yacht'}
                className="w-full h-full object-cover"
              />
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              >
                <ChevronLeft className="w-5 h-5 " />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              >
                <ChevronRight className="w-5 h-5 " />
              </button>
              {/* Image Counter */}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-lg">
                {currentImage + 1}/{images.length}
              </div>
            </>
          )}
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
              <Heart className="w-5 h-5 " />
            </button>
          </div>
        </div>
      </div>
      {/* Card Content */}
      <div className="space-y-3 px-4 pb-4 flex-1 flex flex-col">
        {/* Title and Price */}
        <div>
          {yacht.name && (
            <h3 className="text-xl font-bold  mb-1 flex items-center gap-2">
              {yacht.name}
            </h3>
          )}
          {yacht.pricePerHour && (
            <p className=" text-sm mb-1">Price : <span className="font-semibold">{yacht.pricePerHour}/week</span></p>
          )}
          {yacht.price && !yacht.pricePerHour && (
            <p className=" text-sm mb-1">Prix : <span className="font-semibold">{yacht.price}</span></p>
          )}
        </div>
        {/* Description */}
        {/* {yacht.description && <p className=" text-sm mb-2">{yacht.description}</p>} */}
        {/* Details */}
        <div className="flex flex-wrap gap-4 text-sm  mb-2 items-center">
          {yacht.length && (
            <span className="flex items-center gap-1"><Ruler className="w-4 h-4 text-[#B03E00]" />{formatLength(yacht.length, 'both')}</span>
          )}
          {yacht.guests && (
            <span className="flex items-center gap-1"><Users className="w-4 h-4 text-[#B03E00]" />{yacht.guests} guests</span>
          )}
          {yacht.capacity && !yacht.guests && (
            <span className="flex items-center gap-1"><Users className="w-4 h-4 text-[#B03E00]" />{yacht.capacity} guests</span>
          )}
          {yacht.cabins && (
            <span className="flex items-center gap-1"><BedDouble className="w-4 h-4 text-[#B03E00]" />{yacht.cabins} cabins</span>
          )}
          {yacht.crew && (
            <span className="flex items-center gap-1"><Image src="/casquette-capitaine.svg" alt="crew" width={22} height={22} />{yacht.crew} crew</span>
          )}
          {yacht.location && (
            <span className="flex items-center gap-1"><Map className="w-4 h-4 text-[#B03E00]" />{yacht.location}</span>
          )}
        </div>
        {/* Destinations */}
        {/* {yacht.destinations && yacht.destinations.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2 items-center">
            <MapPin className="w-4 h-4" />
            {yacht.destinations.join(", ")}
          </div>
        )} */}
        {/* Availability */}
        {/* {typeof yacht.available === 'boolean' && (
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium mb-2 w-fit ${yacht.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {yacht.available ? <><CheckCircle className="w-4 h-4" />Disponible</> : <><XCircle className="w-4 h-4" />Indisponible</>}
          </span>
        )} */}
      </div>
    </div>
  );
}
