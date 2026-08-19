"use client";

import { X } from "lucide-react";
import { getTemplate } from "@/templates/registry";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { MessageKey } from "@/i18n/messages";

interface TemplatePreviewModalProps {
  templateId: string;
  onClose: () => void;
}

export function TemplatePreviewModal({ templateId, onClose }: TemplatePreviewModalProps) {
  const { t } = useLanguage();
  const entry = getTemplate(templateId);
  if (!entry) return null;

  const { Component, config, sampleData } = entry;
  const nameKey = `templates.${config.id}.name` as MessageKey;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-rose-dust/10 bg-ivory">
          <div>
            <h3 className="font-serif text-lg text-wedding-brown">{t(nameKey)}</h3>
            <p className="text-xs text-wedding-muted">{t("templates.previewSample")}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-rose-blush rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-wedding-muted" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Component data={sampleData} preview />
        </div>

        <div className="p-4 border-t border-rose-dust/10 bg-ivory flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            {t("templates.close")}
          </Button>
          <Link href={`/create/${config.id}`} className="flex-1">
            <Button className="w-full">{t("templates.chooseThis")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
