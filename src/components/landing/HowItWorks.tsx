"use client";

import { Palette, Edit3, CreditCard, Link2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { MessageKey } from "@/i18n/messages";

const stepIcons = [Palette, Edit3, CreditCard, Link2];

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { title: "how.1.title", desc: "how.1.desc" },
    { title: "how.2.title", desc: "how.2.desc" },
    { title: "how.3.title", desc: "how.3.desc" },
    { title: "how.4.title", desc: "how.4.desc" },
  ] as const satisfies { title: MessageKey; desc: MessageKey }[];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-rose-dust text-sm tracking-[0.3em] uppercase mb-3">{t("how.kicker")}</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-wedding-brown">{t("how.heading")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={step.title} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 start-[60%] w-[80%] h-px bg-rose-dust/20" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-rose-blush flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-rose-dust" />
                </div>
                <span className="text-champagne text-sm font-medium">
                  {t("how.step")} {i + 1}
                </span>
                <h3 className="font-serif text-lg text-wedding-brown mt-2 mb-2">{t(step.title)}</h3>
                <p className="text-wedding-muted text-sm leading-relaxed">{t(step.desc)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
