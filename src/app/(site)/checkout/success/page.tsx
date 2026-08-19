import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { orderId } = await searchParams;

  return (
    <div className="py-20 px-4 sm:px-6">
      <Card className="max-w-lg mx-auto p-10 text-center">
        <CheckCircle className="w-16 h-16 text-champagne mx-auto mb-6" />
        <h1 className="font-serif text-2xl text-wedding-brown mb-3">Order Submitted!</h1>
        <p className="text-wedding-muted mb-2">
          Thank you for your order. We&apos;ll review your payment and activate your invitation
          within 24 hours.
        </p>
        {orderId && (
          <p className="text-sm text-wedding-muted mb-6">
            Order ID: <code className="bg-rose-blush/50 px-2 py-0.5 rounded">{orderId}</code>
          </p>
        )}
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </Card>
    </div>
  );
}
