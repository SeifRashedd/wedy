"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  CheckCircle,
  Mail,
  Palette,
  BarChart3,
  LogOut,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/approvals", label: "Approvals", icon: CheckCircle },
  { href: "/admin/invitations", label: "Invitations", icon: Mail },
  { href: "/admin/templates", label: "Templates", icon: Palette },
  { href: "/admin/sales", label: "Sales", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (!isSupabaseConfigured()) {
      document.cookie = "wedy_admin_demo=; path=/; max-age=0";
    } else {
      const supabase = createClient();
      await supabase?.auth.signOut();
    }
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-wedding-brown text-ivory min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-ivory/10">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-champagne" />
          <span className="font-serif text-lg">Wedy Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors",
                isActive
                  ? "bg-champagne/20 text-champagne"
                  : "text-ivory/60 hover:text-ivory hover:bg-ivory/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-ivory/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-ivory/60 hover:text-ivory hover:bg-ivory/5 w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
