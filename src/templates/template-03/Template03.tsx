"use client";

import { motion } from "framer-motion";
import type { InvitationData } from "@/types";
import { formatDate } from "@/lib/utils";
import { Flower2, MapPin } from "lucide-react";

interface Template03Props {
  data: InvitationData;
  preview?: boolean;
}

export default function Template03({ data, preview = false }: Template03Props) {
  const groom = data.groomName || "Groom";
  const bride = data.brideName || "Bride";
  const mainImage =
    data.mainImage ||
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80";

  return (
    <div className="template-03 min-h-screen bg-gradient-to-b from-[#FFF5F5] to-[#FFF0F3] text-[#6B4C5A] overflow-x-hidden">
      <section className="relative px-6 pt-16 pb-12 text-center">
        <Flower2 className="w-10 h-10 text-[#E8A0BF] mx-auto mb-6" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#D4849A] text-sm tracking-[0.3em] uppercase mb-4"
        >
          Save the Date
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-4xl md:text-5xl text-[#6B4C5A] mb-2"
        >
          {groom} & {bride}
        </motion.h1>
        {data.weddingDate && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[#D4849A] mt-4"
          >
            {formatDate(data.weddingDate)}
            {data.weddingTime && ` · ${data.weddingTime}`}
          </motion.p>
        )}
      </section>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-12"
      >
        <div className="max-w-md mx-auto rounded-3xl overflow-hidden shadow-lg shadow-[#E8A0BF]/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mainImage} alt={`${groom} & ${bride}`} className="w-full aspect-[4/5] object-cover" />
        </div>
      </motion.div>

      {data.story && (
        <section className="px-6 py-12 text-center max-w-md mx-auto">
          <p className="font-serif text-lg italic text-[#8B6B7A] leading-relaxed">
            &ldquo;{data.story}&rdquo;
          </p>
        </section>
      )}

      {data.gallery && data.gallery.length > 0 && (
        <section className="px-6 py-8">
          <div className="max-w-md mx-auto flex gap-2 overflow-x-auto pb-4">
            {data.gallery.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-32 h-40 rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Memory ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {(data.venue || data.location) && (
        <section className="px-6 py-12 bg-white/60 mx-4 rounded-3xl mb-12">
          <div className="max-w-md mx-auto text-center">
            <MapPin className="w-6 h-6 text-[#E8A0BF] mx-auto mb-3" />
            {data.venue && (
              <h3 className="font-serif text-xl text-[#6B4C5A] mb-1">{data.venue}</h3>
            )}
            {data.location && <p className="text-[#8B6B7A] text-sm">{data.location}</p>}
          </div>
        </section>
      )}

      <section className="py-12 text-center">
        <p className="text-[#D4849A] font-serif text-lg">With all our love</p>
      </section>
    </div>
  );
}
