import { getOrders, filterOrders, getRevenueSummary, getMonthlyRevenue } from "@/services/orders";
import { getTemplate } from "@/templates/registry";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { SalesFilters } from "@/components/admin/SalesFilters";

export const metadata = { title: "Sales — Wedy Admin" };

interface SalesPageProps {
  searchParams: Promise<{
    year?: string;
    month?: string;
    paymentStatus?: string;
    templateId?: string;
  }>;
}

export default async function SalesPage({ searchParams }: SalesPageProps) {
  const filters = await searchParams;
  const allOrders = await getOrders();
  const orders = filterOrders(allOrders, filters);
  const approvedOrders = orders.filter((o) => o.order_status === "approved");
  const revenue = await getRevenueSummary();
  const chartData = getMonthlyRevenue(allOrders);

  return (
    <div>
      <h1 className="font-serif text-2xl text-wedding-brown mb-2">Sales History</h1>
      <p className="text-wedding-muted text-sm mb-8">Revenue and order analytics</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Today", value: revenue.today },
          { label: "This Month", value: revenue.thisMonth },
          { label: "This Year", value: revenue.thisYear },
          { label: "All Time", value: revenue.allTime },
        ].map((item) => (
          <Card key={item.label} className="p-5 text-center">
            <p className="font-serif text-2xl text-wedding-brown">{formatCurrency(item.value)}</p>
            <p className="text-sm text-wedding-muted mt-1">{item.label}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6 mb-8">
        <h2 className="font-serif text-lg text-wedding-brown mb-4">Monthly Revenue</h2>
        <RevenueChart data={chartData} />
      </Card>

      <SalesFilters />

      <Card className="overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-rose-dust/10 bg-rose-blush/20">
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Order ID</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Template</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Amount</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Method</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Status</th>
                <th className="text-left px-4 py-3 font-medium text-wedding-muted">Date</th>
              </tr>
            </thead>
            <tbody>
              {approvedOrders.map((order) => (
                <tr key={order.id} className="border-b border-rose-dust/5">
                  <td className="px-4 py-3 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                  <td className="px-4 py-3">{order.customer_name}</td>
                  <td className="px-4 py-3">
                    {getTemplate(order.template_id)?.config.name ?? order.template_id}
                  </td>
                  <td className="px-4 py-3">{formatCurrency(order.amount)}</td>
                  <td className="px-4 py-3 capitalize">
                    {order.payment_method.replace("_", " ")}
                  </td>
                  <td className="px-4 py-3 capitalize">{order.payment_status}</td>
                  <td className="px-4 py-3">{formatDate(order.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
