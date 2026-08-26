// src/components/YachtCardV2.js

"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, MapPin, Calendar, Users, DollarSign, CheckCircle, XCircle, BedDouble, Ruler, Map } from 'lucide-react';
import { isInCart, toggleCart, subscribeCart, toCartEntry } from '@/lib/quoteCart';
import { getAnkorImageUrl } from '@/lib/utils';
import { formatLength } from '@/lib/unitConversion';

/**
 * Icone equipage : reprend le trace de public/casquette-capitaine.svg mais en
 * `currentColor`, pour qu'elle suive l'accent du contexte. Le fichier public
 * reste inchange (il sert ailleurs sur le site).
 */
function CrewIcon({ size = 22, color, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ color }}
    >
      <path d="M10 62 Q50 72 90 62" />
      <path d="M15 62 L20 38 Q50 28 80 38 L85 62 Z" />
      <line x1="15" y1="55" x2="85" y2="55" />
      <circle cx="50" cy="38" r="3" />
      <line x1="50" y1="41" x2="50" y2="50" />
      <path d="M44 46 Q50 52 56 46" />
      <line x1="44" y1="50" x2="47" y2="50" />
      <line x1="53" y1="50" x2="56" y2="50" />
    </svg>
  );
}

/**
 * @param accentColor Couleur des petites icones de caracteristiques. Optionnel.
 *   Omis, la carte reste strictement identique a son rendu historique (#B03E00,
 *   equipage en <img>) : c'est le cas de /yachts et des autres consommateurs.
 *   Fourni, les cinq icones suivent l'accent et l'equipage passe en SVG inline.
 */
export default function YachtCardV2({ yacht, accentColor }) {
  // Selection de devis : meme stockage que la fiche yacht et Request Quote.
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setSaved(isInCart(yacht));
    return subscribeCart(() => setSaved(isInCart(yacht)));
  }, [yacht?.id, yacht?.name]);

  // Sans accent transmis, la carte garde strictement son rendu historique :
  // meme couleur ET meme balise <img> pour l'equipage, donc meme filtre global
  // de saturation. Voir la regle `img { filter: saturate(1.3) }` de globals.css.
  const resolvedAccentColor = accentColor || '#B03E00';
  // Utilise getAnkorImageUrl pour chaque image
  const images = Array.isArray(yacht.images)
    ? yacht.images.filter(Boolean).map(img => getAnkorImageUrl(img, '1280w'))
    : [];
  // Entree de selection : l'image doit etre une URL exploitable telle quelle par
  // la page de devis, pas la cle brute renvoyee par Ankor.
  const entry = toCartEntry(yacht, { image: images[0] || null });
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
          {/* Coeur : ajoute ou retire le yacht de la selection de devis.
              Meme stockage que la fiche yacht et que Request Quote. */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setSaved(toggleCart(entry)); }}
              aria-pressed={saved}
              aria-label={saved
                ? `Remove ${yacht.name || 'this yacht'} from your quote selection`
                : `Add ${yacht.name || 'this yacht'} to your quote selection`}
              title={saved ? 'Remove from selection' : 'Add to selection'}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/80 hover:bg-white rounded-full transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
            >
              <Heart
                aria-hidden
                className={`w-5 h-5 transition-colors ${saved ? 'text-[#c2622a]' : 'text-[#26272a]'}`}
                fill={saved ? '#c2622a' : 'none'}
              />
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
            <span className="flex items-center gap-1"><Ruler className="w-4 h-4" style={{ color: resolvedAccentColor }} />{formatLength(yacht.length, 'both')}</span>
          )}
          {yacht.guests && (
            <span className="flex items-center gap-1"><Users className="w-4 h-4" style={{ color: resolvedAccentColor }} />{yacht.guests} guests</span>
          )}
          {yacht.capacity && !yacht.guests && (
            <span className="flex items-center gap-1"><Users className="w-4 h-4" style={{ color: resolvedAccentColor }} />{yacht.capacity} guests</span>
          )}
          {yacht.cabins && (
            <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" style={{ color: resolvedAccentColor }} />{yacht.cabins} cabins</span>
          )}
          {yacht.crew && (
            <span className="flex items-center gap-1">{accentColor
              ? <CrewIcon size={22} color={resolvedAccentColor} />
              : <Image src="/casquette-capitaine.svg" alt="crew" width={22} height={22} />}{yacht.crew} crew</span>
          )}
          {yacht.location && (
            <span className="flex items-center gap-1"><Map className="w-4 h-4" style={{ color: resolvedAccentColor }} />{yacht.location}</span>
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

        {/* Acces explicite a la fiche : la carte est enveloppee dans un div
            cliquable, ce qui ne donne ni lien reel ni acces clavier. */}
        <Link
          href={`/yacht-detail-v11?name=${encodeURIComponent(yacht.name || '')}`}
          onClick={(e) => e.stopPropagation()}
          aria-label={`View ${yacht.name || 'this yacht'}`}
          className="mt-auto inline-flex min-h-[48px] w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#c2622a] shadow-[0_0_16px_rgba(192,192,192,0.25)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_22px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
        >
          View Yacht
        </Link>
      </div>
    </div>
  );
}
