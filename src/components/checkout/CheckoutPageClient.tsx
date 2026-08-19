"use client";

import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { useLanguage } from "@/i18n/LanguageProvider";

export function CheckoutPageClient() {
  const { t } = useLanguage();

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-wedding-brown mb-2">{t("checkout.title")}</h1>
          <p className="text-wedding-muted">{t("checkout.sub")}</p>
        </div>
        <CheckoutForm />
      </div>
    </div>
  );
}
