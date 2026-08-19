"use client";

import { formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { MessageKey } from "@/i18n/messages";

export function CreatePageHeader({
  templateId,
  description,
  price,
}: {
  templateId: string;
  description: string;
  price: number;
}) {
  const { t, locale } = useLanguage();
  const nameKey = `templates.${templateId}.name` as MessageKey;
  const descKey = `templates.${templateId}.desc` as MessageKey;

  return (
    <div className="mb-8">
      <p className="text-rose-dust text-sm tracking-[0.2em] uppercase mb-2">{t("create.kicker")}</p>
      <h1 className="font-serif text-3xl text-wedding-brown">{t(nameKey)}</h1>
      <p className="text-wedding-muted mt-2">
        {t(descKey) || description} · {formatCurrency(price, locale)}
      </p>
    </div>
  );
}
