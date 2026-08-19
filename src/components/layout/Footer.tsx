"use client";

import Link from "next/link";
import { Share2, Globe, Mail, Heart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-wedding-brown text-ivory/90 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-champagne fill-champagne/20" />
              <span className="font-serif text-xl">Wedy</span>
            </div>
            <p className="text-ivory/60 text-sm leading-relaxed max-w-sm">{t("footer.blurb")}</p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-champagne">{t("footer.nav")}</h4>
            <ul className="space-y-2 text-sm text-ivory/60">
              <li>
                <Link href="/templates" className="hover:text-ivory transition-colors">
                  {t("nav.templates")}
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-ivory transition-colors">
                  {t("nav.howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-ivory transition-colors">
                  {t("nav.features")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-champagne">{t("footer.contact")}</h4>
            <ul className="space-y-2 text-sm text-ivory/60">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@wedy.eg
              </li>
              <li>+20 100 123 4567</li>
              <li className="flex items-center gap-3 mt-4">
                <Share2 className="w-5 h-5 hover:text-champagne cursor-pointer transition-colors" />
                <Globe className="w-5 h-5 hover:text-champagne cursor-pointer transition-colors" />
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/10 mt-12 pt-8 text-center text-sm text-ivory/40">
          © {new Date().getFullYear()} Wedy. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
