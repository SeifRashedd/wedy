"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, CreditCard } from "lucide-react";
import { getTemplate } from "@/templates/registry";
import { formatCurrency } from "@/lib/utils";
import { PAYMENT_ACCOUNTS } from "@/types";
import type { PaymentMethod, InvitationData } from "@/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { isValidImageFile } from "@/lib/utils";

export function CheckoutForm() {
  const router = useRouter();
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
        <p className="text-wedding-muted mb-4">No order data found. Please start from a template.</p>
        <Button onClick={() => router.push("/templates")}>Browse Templates</Button>
      </Card>
    );
  }

  const template = getTemplate(orderData.templateId);
  const account = PAYMENT_ACCOUNTS[paymentMethod];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!screenshot) {
      setError("Please upload your payment screenshot");
      return;
    }

    if (!isValidImageFile(screenshot)) {
      setError("Screenshot must be JPEG, PNG, or WebP under 5MB");
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
        setError(result.error ?? "Failed to create order");
        setLoading(false);
        return;
      }

      sessionStorage.removeItem("wedy_order");
      router.push(`/checkout/success?orderId=${result.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="font-serif text-xl text-wedding-brown mb-4">Order Summary</h2>
          <div className="flex justify-between items-center py-3 border-b border-rose-dust/10">
            <div>
              <p className="font-medium text-wedding-brown">{template?.config.name}</p>
              <p className="text-sm text-wedding-muted">
                {orderData.data.groomName} & {orderData.data.brideName}
              </p>
            </div>
            <p className="font-serif text-xl text-rose-dust">
              {formatCurrency(orderData.amount)}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-xl text-wedding-brown mb-4">Your Details</h2>
          <div className="space-y-4">
            <Input
              id="name"
              label="Full Name"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Input
              id="phone"
              label="Phone Number"
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="01xxxxxxxxx"
            />
            <Input
              id="email"
              label="Email"
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
            Payment
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
            <p className="text-sm text-wedding-muted">Transfer to:</p>
            <p className="font-medium text-wedding-brown">{account.name}</p>
            <p className="font-serif text-lg text-rose-dust">{account.account}</p>
            <p className="text-sm text-wedding-muted">
              Amount: <strong>{formatCurrency(orderData.amount)}</strong>
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-wedding-brown">
              Upload Payment Screenshot <span className="text-rose-dust">*</span>
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-rose-dust/30 rounded-xl cursor-pointer hover:border-rose-dust/50 transition-colors bg-rose-blush/20">
              <Upload className="w-8 h-8 text-rose-dust mb-2" />
              <span className="text-sm text-wedding-muted">
                {screenshot ? screenshot.name : "Click to upload screenshot"}
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
          {loading ? "Submitting..." : "Submit Order"}
        </Button>

        <p className="text-xs text-wedding-muted text-center">
          Your order will be reviewed within 24 hours. You will receive your invitation link after
          approval.
        </p>
      </div>
    </form>
  );
}
