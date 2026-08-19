import { Hero } from "@/components/landing/Hero";
import { TemplatesPreview } from "@/components/landing/TemplatesPreview";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TemplatesPreview />
      <HowItWorks />
      <Features />
    </>
  );
}
