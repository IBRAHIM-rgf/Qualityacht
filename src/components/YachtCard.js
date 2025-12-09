import { User, MapPin, DollarSign, Anchor, CheckCircle, XCircle, BedDouble, Ruler, Calendar, Map } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

export default function YachtCard({ yacht }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      {/* Image */}
      {yacht.image ? (
        <img src={yacht.image} alt={yacht.name} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">No image</div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        {yacht.name && (
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Anchor className="w-5 h-5 text-blue-600" />
            {yacht.name}
          </h2>
        )}
        {/* Description */}
        {yacht.description && (
          <p className="text-sm text-gray-600 mb-2 flex-1">{yacht.description}</p>
        )}
        {/* Details */}
        <div className="flex flex-wrap gap-2 text-sm mb-2 items-center">
          {yacht.length && (
            <span className="flex items-center gap-1"><Ruler className="w-4 h-4" />{yacht.length}</span>
          )}
          {yacht.guests && (
            <span className="flex items-center gap-1"><User className="w-4 h-4" />{yacht.guests} guests</span>
          )}
          {yacht.capacity && !yacht.guests && (
            <span className="flex items-center gap-1"><User className="w-4 h-4" />{yacht.capacity} guests</span>
          )}
          {yacht.cabins && (
            <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" />{yacht.cabins} cabins</span>
          )}
          {yacht.year && (
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{yacht.year}</span>
          )}
          {yacht.refit && (
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Refit {yacht.refit}</span>
          )}
          {yacht.location && (
            <span className="flex items-center gap-1"><Map className="w-4 h-4" />{yacht.location}</span>
          )}
        </div>
        {/* Price */}
        <div className="flex flex-wrap gap-2 text-sm mb-2 items-center">
          {yacht.pricePerHour && (
            <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{yacht.pricePerHour} €/h</span>
          )}
          {yacht.price && (
            <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{yacht.price}</span>
          )}
        </div>
        {/* Destinations */}
        {yacht.destinations && yacht.destinations.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2 items-center">
            <MapPin className="w-4 h-4" />
            {yacht.destinations.join(", ")}
          </div>
        )}
        {/* Availability */}
        {typeof yacht.available === 'boolean' && (
          <Badge variant={yacht.available ? "success" : "destructive"} className="mb-2 w-fit">
            {yacht.available ? (
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" />Available</span>
            ) : (
              <span className="flex items-center gap-1"><XCircle className="w-4 h-4" />Unavailable</span>
            )}
          </Badge>
        )}
        {/* Book Button */}
        <Button className="mt-auto w-full" disabled={!yacht.available}>
          Book Now
        </Button>
      </div>
    </div>
  );
}
