"use client";

import { getTemplate } from "@/templates/registry";
import type { InvitationData } from "@/types";
import { useLanguage } from "@/i18n/LanguageProvider";

interface LivePreviewProps {
  templateId: string;
  data: InvitationData;
}

export function LivePreview({ templateId, data }: LivePreviewProps) {
  const { t } = useLanguage();
  const entry = getTemplate(templateId);
  if (!entry) return null;

  const { Component } = entry;

  return (
    <div className="sticky top-24 rounded-2xl overflow-hidden border border-rose-dust/10 shadow-lg bg-white">
      <div className="bg-ivory px-4 py-2 border-b border-rose-dust/10">
        <p className="text-xs text-wedding-muted text-center tracking-wide uppercase">
          {t("create.livePreview")}
        </p>
      </div>
      <div className="max-h-[70vh] overflow-y-auto">
        <Component data={data} preview />
      </div>
    </div>
  );
}
