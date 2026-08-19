"use client";

import { useEffect, useState } from "react";
import { ApprovalCard } from "@/components/admin/ApprovalCard";
import type { Order } from "@/types";

export default function ApprovalsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders?status=pending");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleApprove = async (id: string) => {
    const res = await fetch("/api/admin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: id }),
    });
    const data = await res.json();
    if (data.invitationUrl) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
      return { invitationUrl: data.invitationUrl };
    }
    return null;
  };

  const handleReject = async (id: string) => {
    await fetch("/api/admin/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: id }),
    });
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div>
      <h1 className="font-serif text-2xl text-wedding-brown mb-2">Pending Approvals</h1>
      <p className="text-wedding-muted text-sm mb-8">
        Review payment screenshots and approve or reject orders
      </p>

      {loading ? (
        <p className="text-wedding-muted">Loading...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 text-wedding-muted">
          No pending orders to review
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <ApprovalCard
              key={order.id}
              order={order}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
