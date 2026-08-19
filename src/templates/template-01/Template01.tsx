"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { InvitationData } from "@/types";
import { formatDate } from "@/lib/utils";
import { Countdown } from "./components/Countdown";
import { FloralDecoration } from "./components/FloralDecoration";
import { Gallery } from "./components/Gallery";
import { RsvpSection } from "./components/RsvpSection";
import { GuestWishes } from "./components/GuestWishes";
import { VenueSection } from "./components/VenueSection";

interface Template01Props {
  data: InvitationData;
  preview?: boolean;
}

export default function Template01({ data, preview = false }: Template01Props) {
  const [opened, setOpened] = useState(preview);

  useEffect(() => {
    if (preview) setOpened(true);
  }, [preview]);

  const groom = data.groomName || "Groom";
  const bride = data.brideName || "Bride";
  const mainImage =
    data.mainImage ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80";

  if (!opened && !preview) {
    return (
      <div className="template-01 min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6">
        <motion.button
          onClick={() => setOpened(true)}
          className="group relative"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative w-72 h-48 bg-gradient-to-br from-[#F5EDE3] to-[#E8DFD0] rounded-lg shadow-2xl border border-[#D4C4A8]/50 overflow-hidden">
            <FloralDecoration className="absolute inset-0 opacity-30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <p className="font-serif text-[#8B7355] text-sm tracking-[0.3em] uppercase mb-2">
                Wedding Invitation
              </p>
              <p className="font-serif text-2xl text-[#5C4A3A]">
                {groom} & {bride}
              </p>
              <p className="text-[#A8927A] text-xs mt-4 tracking-widest uppercase">
                Tap to open
              </p>
            </div>
          </div>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="template-01 min-h-screen bg-[#FAF7F2] text-[#4A4035] overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-end pb-16 px-6">
        <FloralDecoration className="absolute top-0 left-0 w-full h-32 opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt={`${groom} and ${bride}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#A8927A] text-sm tracking-[0.4em] uppercase mb-4"
        >
          Together with their families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-serif text-5xl md:text-6xl text-[#5C4A3A] text-center leading-tight"
        >
          {groom}
          <span className="block text-3xl md:text-4xl text-[#C9A962] my-2 font-light">&</span>
          {bride}
        </motion.h1>

        {data.weddingDate && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 font-serif text-xl text-[#8B7355] tracking-wide"
          >
            {formatDate(data.weddingDate)}
          </motion.p>
        )}

        {data.weddingTime && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-2 text-[#A8927A]"
          >
            {data.weddingTime}
          </motion.p>
        )}
      </section>

      {/* Countdown */}
      {data.weddingDate && (
        <section className="py-16 px-6 bg-[#F5EDE3]/50">
          <div className="max-w-md mx-auto text-center">
            <p className="text-[#A8927A] text-sm tracking-[0.3em] uppercase mb-6">
              Counting down to our day
            </p>
            <Countdown targetDate={data.weddingDate} />
          </div>
        </section>
      )}

      {/* Invitation message */}
      <section className="py-20 px-6 text-center">
        <FloralDecoration className="w-24 h-24 mx-auto mb-8 opacity-40" />
        <p className="font-serif text-2xl md:text-3xl text-[#5C4A3A] leading-relaxed max-w-lg mx-auto">
          We invite you to celebrate our wedding and share in the joy of our special day
        </p>
      </section>

      {/* Venue */}
      {(data.venue || data.location) && (
        <VenueSection
          venue={data.venue}
          location={data.location}
          googleMapsUrl={data.googleMapsUrl}
        />
      )}

      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && <Gallery images={data.gallery} />}

      {/* Story */}
      {data.story && (
        <section className="py-20 px-6 bg-[#F5EDE3]/30">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-[#C9A962] text-sm tracking-[0.3em] uppercase mb-4">Our Story</p>
            <p className="font-serif text-lg text-[#5C4A3A] leading-relaxed italic">
              &ldquo;{data.story}&rdquo;
            </p>
          </div>
        </section>
      )}

      {/* RSVP */}
      {data.rsvpEnabled && <RsvpSection />}

      {/* Guest Wishes */}
      {data.guestWishesEnabled && <GuestWishes />}

      {/* Closing */}
      <section className="py-24 px-6 text-center">
        <p className="font-serif text-3xl text-[#5C4A3A] mb-4">With Love</p>
        <p className="text-[#C9A962] text-lg">
          {groom} & {bride}
        </p>
        <FloralDecoration className="w-16 h-16 mx-auto mt-10 opacity-30" />
      </section>
    </div>
  );
}
