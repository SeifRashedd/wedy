import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DemoModeBanner } from "@/components/layout/DemoModeBanner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoModeBanner />
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
