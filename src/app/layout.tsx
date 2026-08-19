import type { Metadata } from "next";
import { Playfair_Display, Lato, Cairo, Amiri } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { getRequestLocale } from "@/i18n/get-locale";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedy — دعوات فرح ديجيتال",
  description:
    "اعملوا دعوة فرح ديجيتال فخمة. اختاروا التصميم، اكتبوا بياناتكم، وشاركوا اللينك مع الضيوف.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getRequestLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale === "ar" ? "ar" : "en"}
      dir={dir}
      className={`${playfair.variable} ${lato.variable} ${cairo.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-wedding-brown">
        <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
