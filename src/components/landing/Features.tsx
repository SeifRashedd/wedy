"use client";

import {
  Smartphone,
  MapPin,
  Camera,
  Clock,
  MessageCircle,
  Heart,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { MessageKey } from "@/i18n/messages";

const featureIcons = [
  Sparkles,
  Smartphone,
  Heart,
  MapPin,
  Camera,
  Clock,
  MessageCircle,
  Sparkles,
];

export function Features() {
  const { t } = useLanguage();

  const features = [
    { title: "features.1.title", desc: "features.1.desc" },
    { title: "features.2.title", desc: "features.2.desc" },
    { title: "features.3.title", desc: "features.3.desc" },
    { title: "features.4.title", desc: "features.4.desc" },
    { title: "features.5.title", desc: "features.5.desc" },
    { title: "features.6.title", desc: "features.6.desc" },
    { title: "features.7.title", desc: "features.7.desc" },
    { title: "features.8.title", desc: "features.8.desc" },
  ] as const satisfies { title: MessageKey; desc: MessageKey }[];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 bg-rose-blush/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-rose-dust text-sm tracking-[0.3em] uppercase mb-3">
            {t("features.kicker")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-wedding-brown">
            {t("features.heading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <div
                key={feature.title}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-dust/10 hover:border-rose-dust/20 transition-colors"
              >
                <Icon className="w-8 h-8 text-champagne mb-4" />
                <h3 className="font-serif text-lg text-wedding-brown mb-2">{t(feature.title)}</h3>
                <p className="text-wedding-muted text-sm">{t(feature.desc)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
