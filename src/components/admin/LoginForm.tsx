"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function LoginForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isSupabaseConfigured()) {
      if (email === "admin@wedy.eg" && password === "admin123") {
        document.cookie = "wedy_admin_demo=true; path=/; max-age=86400";
        router.push("/admin");
        router.refresh();
      } else {
        setError(t("login.demoError"));
      }
      setLoading(false);
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase client unavailable");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <Card className="p-8 max-w-md w-full">
      <h1 className="font-serif text-2xl text-wedding-brown mb-2 text-center">{t("login.title")}</h1>
      <p className="text-wedding-muted text-sm text-center mb-6">{t("login.sub")}</p>

      {!isSupabaseConfigured() && (
        <div className="flex items-start gap-2 bg-champagne/10 rounded-xl p-3 mb-6 text-sm text-wedding-brown">
          <AlertCircle className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
          <span>
            {t("login.demo")} <strong>admin@wedy.eg</strong> / <strong>admin123</strong>
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          label={t("login.email")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@wedy.eg"
        />
        <Input
          id="password"
          label={t("login.password")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t("login.signing") : t("login.submit")}
        </Button>
      </form>
    </Card>
  );
}
