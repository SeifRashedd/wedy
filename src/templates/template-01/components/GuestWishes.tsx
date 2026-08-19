"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

const SAMPLE_WISHES = [
  { name: "Sara", message: "Wishing you a lifetime of happiness!" },
  { name: "Mohamed", message: "May your love grow stronger every day." },
];

export function GuestWishes() {
  const [wishes, setWishes] = useState(SAMPLE_WISHES);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setWishes([...wishes, { name: name.trim(), message: message.trim() }]);
    setName("");
    setMessage("");
  };

  return (
    <section className="py-16 px-6 bg-[#F5EDE3]/30">
      <div className="max-w-md mx-auto">
        <p className="text-center text-[#A8927A] text-sm tracking-[0.3em] uppercase mb-2">
          Guest Wishes
        </p>
        <p className="text-center font-serif text-xl text-[#5C4A3A] mb-8">
          Leave your blessings
        </p>

        <div className="space-y-4 mb-8">
          {wishes.map((wish, i) => (
            <div
              key={i}
              className="bg-white/80 rounded-xl p-4 border border-[#E8DFD0]"
            >
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-[#C9A962]" />
                <span className="font-medium text-[#5C4A3A]">{wish.name}</span>
              </div>
              <p className="text-[#8B7355] text-sm italic">&ldquo;{wish.message}&rdquo;</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border border-[#E8DFD0] bg-white text-[#5C4A3A] placeholder:text-[#C4B5A5] focus:outline-none focus:border-[#C9A962]"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your wish for the couple"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#E8DFD0] bg-white text-[#5C4A3A] placeholder:text-[#C4B5A5] focus:outline-none focus:border-[#C9A962] resize-none"
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#C9A962] text-white rounded-xl hover:bg-[#B8994F] transition-colors"
          >
            Send Wish
          </button>
        </form>
      </div>
    </section>
  );
}
