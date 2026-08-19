"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function RsvpSection() {
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState<boolean | null>(null);

  if (submitted) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-md mx-auto text-center bg-white/80 rounded-2xl p-8 border border-[#E8DFD0]">
          <Check className="w-10 h-10 text-[#C9A962] mx-auto mb-4" />
          <p className="font-serif text-xl text-[#5C4A3A]">Thank you for your response!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6">
      <div className="max-w-md mx-auto bg-white/80 rounded-2xl p-8 border border-[#E8DFD0]">
        <p className="text-center text-[#A8927A] text-sm tracking-[0.3em] uppercase mb-2">
          RSVP
        </p>
        <p className="text-center font-serif text-xl text-[#5C4A3A] mb-6">
          Will you join us?
        </p>
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setAttending(true)}
            className={`flex-1 py-3 rounded-xl border transition-all ${
              attending === true
                ? "bg-[#C9A962] text-white border-[#C9A962]"
                : "border-[#E8DFD0] text-[#5C4A3A] hover:border-[#C9A962]"
            }`}
          >
            Joyfully Accept
          </button>
          <button
            onClick={() => setAttending(false)}
            className={`flex-1 py-3 rounded-xl border transition-all ${
              attending === false
                ? "bg-[#8B7355] text-white border-[#8B7355]"
                : "border-[#E8DFD0] text-[#5C4A3A] hover:border-[#8B7355]"
            }`}
          >
            Regretfully Decline
          </button>
        </div>
        <input
          type="text"
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-xl border border-[#E8DFD0] bg-white mb-3 text-[#5C4A3A] placeholder:text-[#C4B5A5] focus:outline-none focus:border-[#C9A962]"
        />
        <button
          onClick={() => attending !== null && setSubmitted(true)}
          disabled={attending === null}
          className="w-full py-3 bg-[#5C4A3A] text-white rounded-xl hover:bg-[#4A4035] transition-colors disabled:opacity-50"
        >
          Send Response
        </button>
      </div>
    </section>
  );
}
