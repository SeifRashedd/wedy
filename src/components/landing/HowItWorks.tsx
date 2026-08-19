import { Palette, Edit3, CreditCard, Link2 } from "lucide-react";

const steps = [
  {
    icon: Palette,
    title: "Choose your design",
    description: "Browse our collection of premium wedding invitation templates.",
  },
  {
    icon: Edit3,
    title: "Add your details",
    description: "Fill in your names, date, venue, photos, and personal story.",
  },
  {
    icon: CreditCard,
    title: "Complete payment",
    description: "Pay via InstaPay or Vodafone Cash and upload your receipt.",
  },
  {
    icon: Link2,
    title: "Receive your invitation",
    description: "Get your unique invitation link to share with all your guests.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-rose-dust text-sm tracking-[0.3em] uppercase mb-3">Simple Process</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-wedding-brown">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-rose-dust/20" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-rose-blush flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-7 h-7 text-rose-dust" />
              </div>
              <span className="text-champagne text-sm font-medium">Step {i + 1}</span>
              <h3 className="font-serif text-lg text-wedding-brown mt-2 mb-2">{step.title}</h3>
              <p className="text-wedding-muted text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
