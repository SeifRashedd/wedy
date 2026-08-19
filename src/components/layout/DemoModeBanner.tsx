"use client";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function DemoModeBanner() {
  const { t } = useLanguage();
  if (isSupabaseConfigured()) return null;

  return (
    <div className="bg-champagne/20 border-b border-champagne/30 px-4 py-2">
      <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-wedding-brown">
        <AlertCircle className="w-4 h-4 text-champagne shrink-0" />
        <span>
          <strong>{t("demo.prefix")}</strong> {t("demo.body")}
        </span>
      </div>
    </div>
  );
}
