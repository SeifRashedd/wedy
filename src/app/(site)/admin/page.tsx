import { getDashboardStats, getMonthlyRevenue, getOrders } from "@/services/orders";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { RevenueChart } from "@/components/admin/RevenueChart";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  Mail,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

export const metadata = { title: "Dashboard — Wedy Admin" };

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const orders = await getOrders();
  const chartData = getMonthlyRevenue(orders);

  const statCards = [
    { label: "Total Sales", value: formatCurrency(stats.totalSales), icon: DollarSign },
    { label: "Total Orders", value: stats.totalOrders.toString(), icon: ShoppingBag },
    { label: "Pending Orders", value: stats.pendingOrders.toString(), icon: Clock },
    { label: "Active Invitations", value: stats.activeInvitations.toString(), icon: Mail },
    { label: "Expired Invitations", value: stats.expiredInvitations.toString(), icon: AlertCircle },
    { label: "This Month", value: formatCurrency(stats.monthRevenue), icon: TrendingUp },
    { label: "This Year", value: formatCurrency(stats.yearRevenue), icon: TrendingUp },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl text-wedding-brown mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-5 h-5 text-champagne" />
            </div>
            <p className="text-2xl font-serif text-wedding-brown">{stat.value}</p>
            <p className="text-sm text-wedding-muted mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="font-serif text-lg text-wedding-brown mb-4">Monthly Revenue ({new Date().getFullYear()})</h2>
        <RevenueChart data={chartData} />
      </Card>
    </div>
  );
}
