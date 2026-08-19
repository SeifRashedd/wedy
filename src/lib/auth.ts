import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function verifyAdmin(): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    const cookieStore = await cookies();
    return Boolean(cookieStore.get("wedy_admin_demo"));
  }

  const supabase = await createClient();
  if (!supabase) return false;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return Boolean(user);
}
