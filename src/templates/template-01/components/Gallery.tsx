"use client";

import { motion } from "framer-motion";

interface GalleryProps {
  images: string[];
}

export function Gallery({ images }: GalleryProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-lg mx-auto">
        <p className="text-center text-[#A8927A] text-sm tracking-[0.3em] uppercase mb-8">
          Our Moments
        </p>
        <div className="grid grid-cols-2 gap-3">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl overflow-hidden ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
