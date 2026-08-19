import { getOrders, filterOrders } from "@/services/orders";
import { getTemplate } from "@/templates/registry";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Suspense } from "react";
import { OrdersSearch } from "@/components/admin/OrdersSearch";

export const metadata = { title: "Orders — Wedy Admin" };

interface OrdersPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { search } = await searchParams;
  const allOrders = await getOrders();
  const orders = search ? filterOrders(allOrders, { search }) : allOrders;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl text-wedding-brown">Orders</h1>
          <p className="text-wedding-muted text-sm">{orders.length} orders</p>
        </div>
        <Suspense fallback={null}>
          <OrdersSearch />
        </Suspense>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-rose-dust/10 bg-rose-blush/20">
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Order ID</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Template</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Amount</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Payment</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Status</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-rose-dust/5 hover:bg-rose-blush/10">
                  <td className="px-4 py-3 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-wedding-brown">{order.customer_name}</p>
                    <p className="text-xs text-wedding-muted">{order.customer_email}</p>
                  </td>
                  <td className="px-4 py-3">
                    {getTemplate(order.template_id)?.config.name ?? order.template_id}
                  </td>
                  <td className="px-4 py-3">{formatCurrency(order.amount)}</td>
                  <td className="px-4 py-3 capitalize">
                    {order.payment_method.replace("_", " ")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                        order.order_status === "approved"
                          ? "bg-green-100 text-green-700"
                          : order.order_status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-wedding-muted">{formatDate(order.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
