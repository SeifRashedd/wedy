import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AlertCircle } from "lucide-react";

export function DemoModeBanner() {
  if (isSupabaseConfigured()) return null;

  return (
    <div className="bg-champagne/20 border-b border-champagne/30 px-4 py-2">
      <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-wedding-brown">
        <AlertCircle className="w-4 h-4 text-champagne shrink-0" />
        <span>
          <strong>Demo Mode:</strong> Supabase is not configured. Using local mock data. Copy{" "}
          <code className="bg-white/50 px-1 rounded text-xs">.env.example</code> to{" "}
          <code className="bg-white/50 px-1 rounded text-xs">.env.local</code> to connect Supabase.
        </span>
      </div>
    </div>
  );
}
