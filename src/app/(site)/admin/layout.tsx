import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    const cookieStore = await cookies();
    const demoAdmin = cookieStore.get("wedy_admin_demo");
    if (!demoAdmin) redirect("/login");
  } else {
    const supabase = await createClient();
    if (!supabase) redirect("/login");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-cream/30 p-6 sm:p-8 overflow-auto">{children}</main>
    </div>
  );
}
