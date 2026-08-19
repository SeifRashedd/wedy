"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export function OrdersSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (value) params.set("search", value);
    router.push(`/admin/orders?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
      <Input
        id="search"
        placeholder="Search by name, email, phone..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="sm:w-64"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-rose-dust text-white rounded-xl hover:bg-rose-dust/90 transition-colors"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}
