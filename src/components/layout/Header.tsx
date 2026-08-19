"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-ivory/80 backdrop-blur-md border-b border-rose-dust/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-16 py-2 sm:py-0 sm:h-16 flex items-center justify-between gap-2 flex-wrap">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Heart className="w-5 h-5 text-rose-dust fill-rose-dust/20 group-hover:fill-rose-dust/40 transition-colors" />
          <span className="font-serif text-xl text-wedding-brown tracking-wide">Wedy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/templates"
            className="text-sm text-wedding-muted hover:text-wedding-brown transition-colors"
          >
            {t("nav.templates")}
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm text-wedding-muted hover:text-wedding-brown transition-colors"
          >
            {t("nav.howItWorks")}
          </Link>
          <Link
            href="/#features"
            className="text-sm text-wedding-muted hover:text-wedding-brown transition-colors"
          >
            {t("nav.features")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Link href="/login">
            <Button variant="outline" size="sm">
              {t("nav.admin")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
