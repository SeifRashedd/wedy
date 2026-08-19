"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("lang.switchTo")}
      className="flex items-center rounded-full border border-rose-dust/20 bg-white/70 p-0.5 text-xs font-medium"
    >
      <button
        type="button"
        onClick={() => setLocale("ar")}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          locale === "ar"
            ? "bg-rose-dust text-white"
            : "text-wedding-muted hover:text-wedding-brown"
        }`}
      >
        {t("lang.ar")}
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          locale === "en"
            ? "bg-rose-dust text-white"
            : "text-wedding-muted hover:text-wedding-brown"
        }`}
      >
        {t("lang.en")}
      </button>
    </div>
  );
}
