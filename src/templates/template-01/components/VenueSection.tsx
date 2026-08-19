"use client";

import { MapPin, ExternalLink } from "lucide-react";

interface VenueSectionProps {
  venue?: string;
  location?: string;
  googleMapsUrl?: string;
}

export function VenueSection({ venue, location, googleMapsUrl }: VenueSectionProps) {
  return (
    <section className="py-16 px-6 bg-white/50">
      <div className="max-w-md mx-auto text-center">
        <MapPin className="w-8 h-8 text-[#C9A962] mx-auto mb-4" />
        <p className="text-[#A8927A] text-sm tracking-[0.3em] uppercase mb-4">Venue</p>
        {venue && (
          <h3 className="font-serif text-2xl text-[#5C4A3A] mb-2">{venue}</h3>
        )}
        {location && <p className="text-[#8B7355] mb-6">{location}</p>}
        {googleMapsUrl && (
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C9A962] hover:text-[#B8994F] transition-colors text-sm tracking-wide uppercase"
          >
            View on Maps
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </section>
  );
}
