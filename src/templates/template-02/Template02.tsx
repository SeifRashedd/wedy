"use client";

import { motion } from "framer-motion";
import type { InvitationData } from "@/types";
import { formatDate } from "@/lib/utils";
import { Sparkles, MapPin } from "lucide-react";

interface Template02Props {
  data: InvitationData;
  preview?: boolean;
}

export default function Template02({ data, preview = false }: Template02Props) {
  const groom = data.groomName || "Groom";
  const bride = data.brideName || "Bride";
  const mainImage =
    data.mainImage ||
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80";

  return (
    <div className="template-02 min-h-screen bg-[#0D0D0D] text-[#F5F0E8] overflow-x-hidden">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1510] via-[#0D0D0D] to-[#0D0D0D]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center max-w-lg"
        >
          <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-8">
            You are invited
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-2">
            <span className="text-[#D4AF37]">{groom}</span>
          </h1>
          <p className="font-serif text-3xl text-[#8B7355] my-4">&</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">
            <span className="text-[#D4AF37]">{bride}</span>
          </h1>

          {data.weddingDate && (
            <p className="text-xl tracking-widest text-[#C4B5A5] mb-2">
              {formatDate(data.weddingDate)}
            </p>
          )}
          {data.weddingTime && (
            <p className="text-[#D4AF37] tracking-[0.3em]">{data.weddingTime}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 w-full max-w-md mt-16 aspect-[4/5] rounded-sm overflow-hidden border border-[#D4AF37]/30"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mainImage} alt={`${groom} & ${bride}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
        </motion.div>
      </section>

      {data.story && (
        <section className="py-20 px-6 text-center border-t border-[#D4AF37]/20">
          <p className="font-serif text-2xl text-[#D4AF37] italic max-w-md mx-auto">
            &ldquo;{data.story}&rdquo;
          </p>
        </section>
      )}

      {(data.venue || data.location) && (
        <section className="py-20 px-6 border-t border-[#D4AF37]/20">
          <div className="max-w-md mx-auto text-center">
            <MapPin className="w-6 h-6 text-[#D4AF37] mx-auto mb-4" />
            {data.venue && (
              <h3 className="font-serif text-2xl text-[#D4AF37] mb-2">{data.venue}</h3>
            )}
            {data.location && <p className="text-[#C4B5A5]">{data.location}</p>}
            {data.googleMapsUrl && (
              <a
                href={data.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-8 py-3 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all"
              >
                Get Directions
              </a>
            )}
          </div>
        </section>
      )}

      <section className="py-16 text-center border-t border-[#D4AF37]/20">
        <p className="text-[#8B7355] text-sm tracking-[0.4em] uppercase">
          {preview ? "Preview Mode" : "We await your presence"}
        </p>
      </section>
    </div>
  );
}
