"use client";

import { useRouter } from "next/navigation";
import { getAllTemplates } from "@/templates/registry";

export function SalesFilters() {
  const router = useRouter();
  const templates = getAllTemplates();

  const handleChange = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/admin/sales?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <select
        onChange={(e) => handleChange("year", e.target.value)}
        className="px-4 py-2 rounded-xl border border-rose-dust/20 bg-white text-sm text-wedding-brown"
        defaultValue=""
      >
        <option value="">All Years</option>
        <option value="2026">2026</option>
        <option value="2025">2025</option>
      </select>

      <select
        onChange={(e) => handleChange("month", e.target.value)}
        className="px-4 py-2 rounded-xl border border-rose-dust/20 bg-white text-sm text-wedding-brown"
        defaultValue=""
      >
        <option value="">All Months</option>
        {[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].map((m, i) => (
          <option key={m} value={i.toString()}>
            {m}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => handleChange("paymentStatus", e.target.value)}
        className="px-4 py-2 rounded-xl border border-rose-dust/20 bg-white text-sm text-wedding-brown"
        defaultValue=""
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <select
        onChange={(e) => handleChange("templateId", e.target.value)}
        className="px-4 py-2 rounded-xl border border-rose-dust/20 bg-white text-sm text-wedding-brown"
        defaultValue=""
      >
        <option value="">All Templates</option>
        {templates.map(({ config }) => (
          <option key={config.id} value={config.id}>
            {config.name}
          </option>
        ))}
      </select>
    </div>
  );
}
