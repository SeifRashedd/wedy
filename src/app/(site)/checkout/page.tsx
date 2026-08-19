import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout — Wedy",
};

export default function CheckoutPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-wedding-brown mb-2">Checkout</h1>
          <p className="text-wedding-muted">Complete your payment to activate your invitation</p>
        </div>
        <CheckoutForm />
      </div>
    </div>
  );
}
