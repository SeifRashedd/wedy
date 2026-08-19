"use client";

import { useState } from "react";
import { Check, X, Copy, ExternalLink } from "lucide-react";
import type { Order } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getTemplate } from "@/templates/registry";

interface ApprovalCardProps {
  order: Order;
  onApprove: (id: string) => Promise<{ invitationUrl: string } | null>;
  onReject: (id: string) => Promise<void>;
}

export function ApprovalCard({ order, onApprove, onReject }: ApprovalCardProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const template = getTemplate(order.template_id);

  const handleApprove = async () => {
    setLoading(true);
    const res = await onApprove(order.id);
    if (res) {
      setResult(res.invitationUrl);
    }
    setLoading(false);
  };

  const handleReject = async () => {
    setLoading(true);
    await onReject(order.id);
    setLoading(false);
  };

  const copyUrl = () => {
    if (result) {
      navigator.clipboard.writeText(`${window.location.origin}${result}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-serif text-lg text-wedding-brown">{order.customer_name}</h3>
              <p className="text-sm text-wedding-muted">{order.customer_email}</p>
              <p className="text-sm text-wedding-muted">{order.customer_phone}</p>
            </div>
            <span className="text-xs bg-champagne/20 text-champagne px-3 py-1 rounded-full uppercase tracking-wide">
              {order.payment_method.replace("_", " ")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-wedding-muted">Template</span>
              <p className="text-wedding-brown font-medium">
                {template?.config.name ?? order.template_id}
              </p>
            </div>
            <div>
              <span className="text-wedding-muted">Amount</span>
              <p className="text-wedding-brown font-medium">{formatCurrency(order.amount)}</p>
            </div>
            <div>
              <span className="text-wedding-muted">Order Date</span>
              <p className="text-wedding-brown">{formatDate(order.created_at)}</p>
            </div>
            <div>
              <span className="text-wedding-muted">Couple</span>
              <p className="text-wedding-brown">
                {order.invitation_data.groomName} & {order.invitation_data.brideName}
              </p>
            </div>
          </div>

          {order.payment_screenshot && (
            <div>
              <p className="text-sm text-wedding-muted mb-2">Payment Screenshot</p>
              <div className="bg-rose-blush/30 rounded-xl p-4 text-center text-sm text-wedding-muted">
                Payment screenshot uploaded
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 lg:w-48">
          {result ? (
            <div className="space-y-3">
              <p className="text-sm text-green-600 font-medium">Approved!</p>
              <div className="bg-rose-blush/30 rounded-xl p-3 text-xs break-all">
                {window.location.origin}
                {result}
              </div>
              <Button size="sm" variant="outline" onClick={copyUrl} className="w-full">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy URL"}
              </Button>
              <a href={result} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost" className="w-full">
                  <ExternalLink className="w-4 h-4" />
                  View Invitation
                </Button>
              </a>
            </div>
          ) : (
            <>
              <Button onClick={handleApprove} disabled={loading} className="w-full">
                <Check className="w-4 h-4" />
                Approve
              </Button>
              <Button
                variant="outline"
                onClick={handleReject}
                disabled={loading}
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
                Reject
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
