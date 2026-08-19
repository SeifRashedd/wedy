import {
  Smartphone,
  MapPin,
  Camera,
  Clock,
  MessageCircle,
  Heart,
  Sparkles,
} from "lucide-react";

const features = [
  { icon: Sparkles, title: "Beautiful Designs", description: "Premium templates crafted by designers" },
  { icon: Smartphone, title: "Mobile Friendly", description: "Perfect on every device and screen size" },
  { icon: Heart, title: "RSVP", description: "Let guests confirm their attendance easily" },
  { icon: MapPin, title: "Wedding Location", description: "Integrated maps and venue directions" },
  { icon: Camera, title: "Photo Gallery", description: "Showcase your favorite moments together" },
  { icon: Clock, title: "Countdown", description: "Build excitement with a live countdown timer" },
  { icon: MessageCircle, title: "Guest Wishes", description: "Collect heartfelt messages from loved ones" },
  { icon: Sparkles, title: "Unique Link", description: "Share a personalized URL with your guests" },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 bg-rose-blush/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-rose-dust text-sm tracking-[0.3em] uppercase mb-3">Everything Included</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-wedding-brown">Features</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-dust/10 hover:border-rose-dust/20 transition-colors"
            >
              <feature.icon className="w-8 h-8 text-champagne mb-4" />
              <h3 className="font-serif text-lg text-wedding-brown mb-2">{feature.title}</h3>
              <p className="text-wedding-muted text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
