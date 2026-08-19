"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, CreditCard } from "lucide-react";
import { formatCurrency, isValidImageFile } from "@/lib/utils";
import { PAYMENT_ACCOUNTS } from "@/types";
import type { PaymentMethod, InvitationData } from "@/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { MessageKey } from "@/i18n/messages";

export function CheckoutForm() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("instapay");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);

  const orderData = (() => {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem("wedy_order");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as {
        templateId: string;
        data: InvitationData;
        amount: number;
      };
    } catch {
      return null;
    }
  })();

  if (!orderData) {
    return (
      <Card className="p-8 text-center max-w-lg mx-auto">
        <p className="text-wedding-muted mb-4">{t("checkout.noOrder")}</p>
        <Button onClick={() => router.push("/templates")}>{t("checkout.browse")}</Button>
      </Card>
    );
  }

  const account = PAYMENT_ACCOUNTS[paymentMethod];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!screenshot) {
      setError(t("checkout.needScreenshot"));
      return;
    }

    if (!isValidImageFile(screenshot)) {
      setError(t("checkout.badFile"));
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("customer_name", customerName);
      formData.append("customer_phone", customerPhone);
      formData.append("customer_email", customerEmail);
      formData.append("template_id", orderData.templateId);
      formData.append("amount", orderData.amount.toString());
      formData.append("payment_method", paymentMethod);
      formData.append("invitation_data", JSON.stringify(orderData.data));
      formData.append("screenshot", screenshot);

      const res = await fetch("/api/orders", { method: "POST", body: formData });
      const result = await res.json();

      if (!res.ok) {
        setError(result.error ?? t("checkout.failed"));
        setLoading(false);
        return;
      }

      sessionStorage.removeItem("wedy_order");
      router.push(`/checkout/success?orderId=${result.id}`);
    } catch {
      setError(t("checkout.error"));
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="font-serif text-xl text-wedding-brown mb-4">{t("checkout.summary")}</h2>
          <div className="flex justify-between items-center py-3 border-b border-rose-dust/10">
            <div>
              <p className="font-medium text-wedding-brown">
                {t(`templates.${orderData.templateId}.name` as MessageKey)}
              </p>
              <p className="text-sm text-wedding-muted">
                {orderData.data.groomName} & {orderData.data.brideName}
              </p>
            </div>
            <p className="font-serif text-xl text-rose-dust">
              {formatCurrency(orderData.amount, locale)}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-xl text-wedding-brown mb-4">{t("checkout.details")}</h2>
          <div className="space-y-4">
            <Input
              id="name"
              label={t("checkout.fullName")}
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Input
              id="phone"
              label={t("checkout.phone")}
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="01xxxxxxxxx"
            />
            <Input
              id="email"
              label={t("checkout.email")}
              type="email"
              required
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="font-serif text-xl text-wedding-brown mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-champagne" />
            {t("checkout.payment")}
          </h2>

          <div className="flex gap-3 mb-6">
            {(Object.keys(PAYMENT_ACCOUNTS) as PaymentMethod[]).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                  paymentMethod === method
                    ? "border-rose-dust bg-rose-blush text-wedding-brown"
                    : "border-rose-dust/20 text-wedding-muted hover:border-rose-dust/40"
                }`}
              >
                {PAYMENT_ACCOUNTS[method].label}
              </button>
            ))}
          </div>

          <div className="bg-champagne/10 rounded-xl p-4 mb-6 space-y-2">
            <p className="text-sm text-wedding-muted">{t("checkout.transferTo")}</p>
            <p className="font-medium text-wedding-brown">{account.name}</p>
            <p className="font-serif text-lg text-rose-dust">{account.account}</p>
            <p className="text-sm text-wedding-muted">
              {t("checkout.amount")} <strong>{formatCurrency(orderData.amount, locale)}</strong>
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-wedding-brown">
              {t("checkout.upload")} <span className="text-rose-dust">*</span>
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-rose-dust/30 rounded-xl cursor-pointer hover:border-rose-dust/50 transition-colors bg-rose-blush/20">
              <Upload className="w-8 h-8 text-rose-dust mb-2" />
              <span className="text-sm text-wedding-muted">
                {screenshot ? screenshot.name : t("checkout.uploadHint")}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
        </Card>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? t("checkout.submitting") : t("checkout.submit")}
        </Button>

        <p className="text-xs text-wedding-muted text-center">{t("checkout.note")}</p>
      </div>
    </form>
  );
}
