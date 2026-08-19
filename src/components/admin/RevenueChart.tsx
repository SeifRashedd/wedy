"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface RevenueChartProps {
  data: { month: string; revenue: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD0" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8B7355" }} />
          <YAxis tick={{ fontSize: 12, fill: "#8B7355" }} />
          <Tooltip
            formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #E8DFD0",
              fontSize: "13px",
            }}
          />
          <Bar dataKey="revenue" fill="#C9A962" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
