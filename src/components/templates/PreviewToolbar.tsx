"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { MessageKey } from "@/i18n/messages";

export function PreviewToolbar({
  templateId,
  templateName,
}: {
  templateId: string;
  templateName: string;
}) {
  const { t } = useLanguage();
  const nameKey = `templates.${templateId}.name` as MessageKey;

  return (
    <div className="sticky top-16 z-40 bg-ivory/90 backdrop-blur-md border-b border-rose-dust/10 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <p className="font-serif text-lg text-wedding-brown">{t(nameKey) || templateName}</p>
          <p className="text-xs text-wedding-muted">{t("templates.previewSample")}</p>
        </div>
        <Link href={`/create/${templateId}`}>
          <Button size="sm">
            <Heart className="w-4 h-4" />
            {t("templates.chooseTemplate")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
