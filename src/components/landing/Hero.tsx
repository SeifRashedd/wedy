"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-blush via-ivory to-cream" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-rose-dust/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-champagne/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-rose-dust/10">
            <Sparkles className="w-4 h-4 text-champagne" />
            <span className="text-xs tracking-widest uppercase text-wedding-muted">
              Premium Digital Invitations
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-wedding-brown leading-tight mb-6">
            Your Story.
            <br />
            <span className="text-rose-dust">Your Moment.</span>
            <br />
            Your Invitation.
          </h1>

          <p className="text-wedding-muted text-lg leading-relaxed mb-8 max-w-md">
            Create a stunning digital wedding invitation in minutes. Beautiful designs,
            unique links, and everything your guests need to celebrate with you.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/templates">
              <Button size="lg">
                Explore Templates
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button variant="outline" size="lg">
                How It Works
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative aspect-[3/4] max-w-sm mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-dust/20 to-champagne/20 rounded-3xl rotate-3" />
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-dust/10 -rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
                alt="Wedding invitation preview"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wedding-brown/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-white">
                <p className="text-xs tracking-[0.3em] uppercase mb-2 opacity-80">Together Forever</p>
                <p className="font-serif text-2xl">Ahmed & Nour</p>
                <p className="text-sm mt-2 opacity-80">September 20, 2026</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
